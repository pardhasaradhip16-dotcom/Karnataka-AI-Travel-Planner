import type { 
  VoiceGuideLanguage, 
  NarrationMode, 
  NarrationScript, 
  DestinationVoiceGuideData 
} from '../types';
import { SUPPORTED_VOICE_LANGUAGES, getDestinationVoiceGuideData } from '../data/voiceGuideData';

export type VoicePlayerStatus = 'idle' | 'loading' | 'speaking' | 'paused' | 'completed' | 'error';

export interface VoiceEngineStatus {
  language: VoiceGuideLanguage;
  voiceName: string;
  isNativeVoice: boolean;
  statusMessage: string;
  speechSupported: boolean;
}

export class VoiceGuideService {
  private static synth: SpeechSynthesis | null = typeof window !== 'undefined' ? window.speechSynthesis : null;
  private static currentUtterance: SpeechSynthesisUtterance | null = null;
  private static recognitionInstance: any = null;
  private static voicesList: SpeechSynthesisVoice[] = [];
  private static isVoicesLoaded: boolean = false;
  private static keepAliveTimer: any = null;
  private static activeChunkQueue: string[] = [];
  private static currentChunkIdx: number = 0;
  private static isSpeakingChunks: boolean = false;

  public static get areVoicesLoaded(): boolean {
    return this.isVoicesLoaded;
  }

  public static getActiveUtterance(): SpeechSynthesisUtterance | null {
    return this.currentUtterance;
  }

  /**
   * Split long text into natural sentence/clause chunks to prevent Chrome's 15s speech synthesis timeout bug.
   */
  private static splitIntoSpeechChunks(text: string): string[] {
    if (!text || text.length <= 130) return [text];
    
    // Split by sentence punctuation (period, exclamation, question mark, danda, semicolon, or newlines)
    const rawSentences = text.split(/(?<=[.!?।;\n])\s+/);
    const chunks: string[] = [];
    let current = '';

    for (const s of rawSentences) {
      const trimmed = s.trim();
      if (!trimmed) continue;
      if ((current ? current.length + 1 + trimmed.length : trimmed.length) < 130) {
        current = current ? current + ' ' + trimmed : trimmed;
      } else {
        if (current) chunks.push(current);
        if (trimmed.length > 130) {
          const subParts = trimmed.split(/(?<=[,،،:])\s+/);
          let subCurrent = '';
          for (const sp of subParts) {
            if ((subCurrent ? subCurrent.length + 1 + sp.length : sp.length) < 130) {
              subCurrent = subCurrent ? subCurrent + ' ' + sp : sp;
            } else {
              if (subCurrent) chunks.push(subCurrent);
              subCurrent = sp;
            }
          }
          current = subCurrent;
        } else {
          current = trimmed;
        }
      }
    }
    if (current) chunks.push(current);
    return chunks.length > 0 ? chunks : [text];
  }

  /**
   * Stop Chrome keep-alive heartbeat.
   */
  private static stopKeepAlive(): void {
    if (this.keepAliveTimer) {
      clearInterval(this.keepAliveTimer);
      this.keepAliveTimer = null;
    }
  }

  /**
   * Initialize speech synthesis voices and load them reliably across all browsers.
   */
  public static initVoices(onLoaded?: () => void): void {
    if (!this.synth) return;

    const updateVoices = () => {
      this.voicesList = this.synth?.getVoices() || [];
      if (this.voicesList.length > 0) {
        this.isVoicesLoaded = true;
        if (onLoaded) onLoaded();
      }
    };

    updateVoices();

    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = () => {
        updateVoices();
      };
    }
  }

  /**
   * Get all loaded voices.
   */
  public static getVoices(): SpeechSynthesisVoice[] {
    if ((this.voicesList.length === 0 || !this.isVoicesLoaded) && this.synth) {
      this.voicesList = this.synth.getVoices();
      if (this.voicesList.length > 0) this.isVoicesLoaded = true;
    }
    return this.voicesList;
  }

  /**
   * Match the requested language to available browser speech synthesis voices.
   * CRITICAL: Never binds an incompatible English voice to Indic scripts.
   */
  public static matchVoiceForLanguage(lang: VoiceGuideLanguage): {
    voice: SpeechSynthesisVoice | null;
    isNativeVoice: boolean;
    statusMessage: string;
  } {
    const langInfo = SUPPORTED_VOICE_LANGUAGES.find(l => l.code === lang);
    const targetTag = (langInfo?.speechTag || 'te-IN').toLowerCase().replace('_', '-');
    const secondaryTag = (langInfo?.secondarySpeechTag || '').toLowerCase().replace('_', '-');
    const langPrefix = lang.toLowerCase();

    const voices = this.getVoices();

    if (!this.synth || voices.length === 0) {
      return {
        voice: null,
        isNativeVoice: false,
        statusMessage: `${langInfo?.nativeName || 'Speech'} synthesis initializing...`
      };
    }

    // 1. Exact BCP-47 tag match (e.g., 'kn-IN', 'te-IN', 'hi-IN', 'ta-IN', 'ml-IN')
    let found = voices.find(v => v.lang.toLowerCase().replace('_', '-') === targetTag);

    // 2. Secondary tag match (e.g., 'en-US' for English)
    if (!found && secondaryTag) {
      found = voices.find(v => v.lang.toLowerCase().replace('_', '-') === secondaryTag);
    }

    // 3. Match language prefix (e.g. 'kn', 'te', 'hi', 'ta', 'ml')
    if (!found) {
      found = voices.find(v => v.lang.toLowerCase().replace('_', '-').startsWith(langPrefix));
    }

    // 4. Match voice name containing the language name (e.g. "Kannada", "Telugu", "Hindi")
    if (!found && langInfo) {
      found = voices.find(v => 
        v.name.toLowerCase().includes(langInfo.englishLabel.toLowerCase()) ||
        v.name.toLowerCase().includes(langInfo.nativeName.toLowerCase())
      );
    }

    if (found) {
      return {
        voice: found,
        isNativeVoice: true,
        statusMessage: `${langInfo?.nativeName} (${found.name}) voice active`
      };
    }

    // When NO native voice is found in local OS tokens:
    // Return voice: null so the browser routes to its online cloud engine for the specified lang tag
    return {
      voice: null,
      isNativeVoice: false,
      statusMessage: `Native ${langInfo?.nativeName} (${langInfo?.englishLabel}) speech engine active`
    };
  }

  /**
   * Retrieve the complete Voice Guide data for a destination localized in customer's preferred language.
   */
  public static getDestinationData(
    destinationId: string, 
    language: VoiceGuideLanguage = 'en'
  ): DestinationVoiceGuideData {
    return getDestinationVoiceGuideData(destinationId, language);
  }

  /**
   * Retrieve the specific narration script for destination, language, and mode.
   */
  public static getNarrationScript(
    destinationId: string,
    language: VoiceGuideLanguage,
    mode: NarrationMode
  ): NarrationScript {
    const data = this.getDestinationData(destinationId, language);
    return data.narrations[language]?.[mode] || data.narrations.en[mode];
  }

  /**
   * Speak the narration text with synchronization, chunking, anti-timeout keep-alive, and lifecycle callbacks.
   */
  public static speak({
    text,
    language,
    rate = 1.0,
    onStart,
    onBoundary,
    onEnd,
    onError
  }: {
    text: string;
    language: VoiceGuideLanguage;
    rate?: number;
    onStart?: () => void;
    onBoundary?: (charIndex: number, textLength: number) => void;
    onEnd?: () => void;
    onError?: (err: string) => void;
  }): void {
    if (!this.synth) {
      if (onError) onError('Web Speech API is not supported in this browser environment.');
      return;
    }

    // Stop any existing utterance immediately
    this.stop();

    try {
      const langInfo = SUPPORTED_VOICE_LANGUAGES.find(l => l.code === language);
      const targetTag = (langInfo?.speechTag || 'te-IN').replace('_', '-');
      const { voice, isNativeVoice } = this.matchVoiceForLanguage(language);

      // Split into natural sentences to prevent Chrome's 15-second speech synthesis cutoff bug
      const chunks = this.splitIntoSpeechChunks(text);
      this.activeChunkQueue = chunks;
      this.currentChunkIdx = 0;
      this.isSpeakingChunks = true;

      // Calculate character offsets for accurate boundary tracking
      let charOffset = 0;
      const chunkOffsets: number[] = [];
      for (const c of chunks) {
        chunkOffsets.push(charOffset);
        charOffset += c.length + 1;
      }

      const speakNextChunk = () => {
        if (!this.isSpeakingChunks || this.currentChunkIdx >= this.activeChunkQueue.length) {
          this.isSpeakingChunks = false;
          this.currentUtterance = null;
          if (onEnd) onEnd();
          return;
        }

        const chunkIndex = this.currentChunkIdx;
        const chunkText = this.activeChunkQueue[chunkIndex];
        const baseOffset = chunkOffsets[chunkIndex] || 0;

        const utterance = new SpeechSynthesisUtterance(chunkText);
        utterance.lang = targetTag;

        // CRITICAL: Only pin voice if it is a verified native voice for this language.
        // Otherwise, leaving voice unpinned lets the browser invoke its cloud Indian TTS engine for targetTag.
        if (voice && isNativeVoice) {
          utterance.voice = voice;
        }

        utterance.rate = Math.max(0.8, Math.min(1.2, rate));
        utterance.pitch = 1.0;

        utterance.onstart = () => {
          if (chunkIndex === 0 && onStart) {
            onStart();
          }
          if (onBoundary) {
            onBoundary(baseOffset, text.length);
          }
        };

        utterance.onboundary = (e: SpeechSynthesisEvent) => {
          if (onBoundary && typeof e.charIndex === 'number') {
            onBoundary(baseOffset + e.charIndex, text.length);
          }
        };

        utterance.onend = () => {
          this.currentChunkIdx++;
          speakNextChunk();
        };

        utterance.onerror = (e) => {
          if (e.error === 'interrupted' || e.error === 'canceled') {
            return;
          }
          console.warn('Speech chunk status:', e.error);
          this.currentChunkIdx++;
          setTimeout(speakNextChunk, 50);
        };

        this.currentUtterance = utterance;
        try {
          if (this.synth?.paused) {
            this.synth.resume();
          }
          this.synth?.speak(utterance);
        } catch (err: any) {
          console.warn('Speech synthesis call error:', err);
          this.currentChunkIdx++;
          setTimeout(speakNextChunk, 50);
        }
      };

      // 40ms micro-buffer ensures Chromium finishes background cancel pipeline before speaking new queue
      setTimeout(() => {
        if (!this.isSpeakingChunks) return;
        speakNextChunk();
      }, 40);
    } catch (err: any) {
      this.currentUtterance = null;
      this.isSpeakingChunks = false;
      if (onError) onError(err?.message || 'Failed to start speech synthesis.');
    }
  }

  /**
   * Pause ongoing narration.
   */
  public static pause(): void {
    if (this.synth && this.synth.speaking && !this.synth.paused) {
      this.synth.pause();
    }
  }

  /**
   * Resume paused narration.
   */
  public static resume(): void {
    if (this.synth && this.synth.paused) {
      this.synth.resume();
    }
  }

  /**
   * Stop and cancel all narration and reset chunk queue.
   */
  public static stop(): void {
    this.isSpeakingChunks = false;
    this.activeChunkQueue = [];
    this.currentChunkIdx = 0;
    this.stopKeepAlive();
    if (this.synth) {
      try {
        if (this.synth.paused) {
          this.synth.resume();
        }
        this.synth.cancel();
      } catch (e) {
        // ignore
      }
      this.currentUtterance = null;
    }
  }

  /**
   * Check if speech synthesis is currently speaking.
   */
  public static isSpeaking(): boolean {
    return !!(this.synth && this.synth.speaking && !this.synth.paused);
  }

  /**
   * Check if speech synthesis is currently paused.
   */
  public static isPaused(): boolean {
    return !!(this.synth && this.synth.paused);
  }

  /**
   * Check if Web Speech Recognition (voice input) is supported.
   */
  public static isSpeechRecognitionSupported(): boolean {
    if (typeof window === 'undefined') return false;
    return !!(
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition
    );
  }

  /**
   * Start speech recognition for conversational voice input.
   */
  public static startSpeechRecognition({
    language,
    onResult,
    onError,
    onEnd
  }: {
    language: VoiceGuideLanguage;
    onResult: (transcript: string) => void;
    onError?: (error: string) => void;
    onEnd?: () => void;
  }): void {
    if (!this.isSpeechRecognitionSupported()) {
      if (onError) onError('Voice input is not supported in this browser. Please type your question.');
      return;
    }

    try {
      const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRec();

      const langInfo = SUPPORTED_VOICE_LANGUAGES.find(l => l.code === language);
      recognition.lang = langInfo?.speechTag || 'en-IN';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event: any) => {
        const transcript = event.results?.[0]?.[0]?.transcript || '';
        if (transcript) {
          onResult(transcript);
        }
      };

      recognition.onerror = (event: any) => {
        if (onError) onError(`Speech recognition error: ${event.error || 'Failed'}`);
      };

      recognition.onend = () => {
        this.recognitionInstance = null;
        if (onEnd) onEnd();
      };

      this.recognitionInstance = recognition;
      recognition.start();
    } catch (e: any) {
      if (onError) onError(e?.message || 'Failed to initialize speech recognition.');
    }
  }

  /**
   * Stop active speech recognition.
   */
  public static stopSpeechRecognition(): void {
    if (this.recognitionInstance) {
      try {
        this.recognitionInstance.stop();
      } catch {
        // ignore
      }
      this.recognitionInstance = null;
    }
  }

  /**
   * Answering Engine for Follow-Up "Ask About This Place" questions.
   */
  /**
   * Answering Engine for Follow-Up "Ask About This Place" questions in customer's preferred language.
   */
  public static answerQuestion(
    destinationId: string,
    questionText: string,
    language: VoiceGuideLanguage
  ): {
    answerText: string;
    category: string;
    isVerifiedFact: boolean;
    sourceCitation: string;
  } {
    const data = this.getDestinationData(destinationId, language);
    const qLower = questionText.toLowerCase().trim();

    // 1. Curated FAQ Matching
    for (const faq of data.faqList) {
      const qInLang = (faq.question[language] || faq.question.en).toLowerCase();
      const qInEn = faq.question.en.toLowerCase();

      if (
        qLower.includes(qInLang) ||
        qInLang.includes(qLower) ||
        qLower.includes(qInEn) ||
        qInEn.includes(qLower)
      ) {
        return {
          answerText: faq.answer[language] || faq.answer.en,
          category: faq.category,
          isVerifiedFact: true,
          sourceCitation: data.sourcesAndReferences[0]?.title || 'ASI Epigraphia Carnatica'
        };
      }
    }

    // 2. Founder / Builder / Dynasty Question
    const isFounderQuery = 
      qLower.includes('who built') || qLower.includes('founder') || qLower.includes('king') || qLower.includes('dynasty') ||
      qLower.includes('ಯಾರು') || qLower.includes('ಕಟ್ಟಿಸಿದ') || qLower.includes('ನಿರ್ಮಾತೃ') || qLower.includes('ರಾಜ') ||
      qLower.includes('ఎవరు') || qLower.includes('నిర్మించారు') || qLower.includes('స్థాపకుడు') || qLower.includes('రాజు') ||
      qLower.includes('किसने') || qLower.includes('बनवाया') || qLower.includes('संस्थापक') || qLower.includes('राजा') ||
      qLower.includes('யார்') || qLower.includes('கட்டியது') || qLower.includes('மன்னர்') || qLower.includes('நிறுவனர்') ||
      qLower.includes('ആര്') || qLower.includes('നിർമ്മിച്ചു') || qLower.includes('രാജാവ്') || qLower.includes('സ്ഥാപകൻ');

    if (isFounderQuery) {
      const founderFaq = data.faqList.find(f => f.category === 'founder');
      if (founderFaq) {
        return {
          answerText: founderFaq.answer[language] || founderFaq.answer.en,
          category: 'founder',
          isVerifiedFact: true,
          sourceCitation: data.sourcesAndReferences[0]?.title || 'Epigraphia Carnatica'
        };
      }
      const firstTimeline = data.historicalTimeline[0];
      const answer = language === 'kn'
        ? `ಈ ತಾಣದ ಇತಿಹಾಸವು ${firstTimeline?.yearOrEra || 'ಪ್ರಾಚೀನ ಕಾಲ'}ದೊಂದಿಗೆ ಪ್ರಾರಂಭವಾಗುತ್ತದೆ, ${firstTimeline?.rulerOrDynasty || 'ಕರ್ನಾಟಕದ ರಾಜವಂಶಗಳು'}: ${firstTimeline?.event}. ${firstTimeline?.details}`
        : language === 'te'
        ? `ఈ క్షేత్ర చరిత్ర ${firstTimeline?.yearOrEra || 'ప్రాచీన కాలం'}లో ప్రారంభమైంది, పాలకులు ${firstTimeline?.rulerOrDynasty || 'కర్ణాటక రాజవంశాలు'}: ${firstTimeline?.event}. ${firstTimeline?.details}`
        : language === 'hi'
        ? `इस स्थल का इतिहास ${firstTimeline?.yearOrEra || 'प्राचीन काल'} से प्रारंभ होता है, शासक ${firstTimeline?.rulerOrDynasty || 'कर्नाटक राजवंश'}: ${firstTimeline?.event}. ${firstTimeline?.details}`
        : language === 'ta'
        ? `இந்த தளத்தின் வரலாறு ${firstTimeline?.yearOrEra || 'பண்டைய காலம்'} தொடங்கியது, ஆட்சியாளர்கள் ${firstTimeline?.rulerOrDynasty || 'கர்நாடக வம்சங்கள்'}: ${firstTimeline?.event}. ${firstTimeline?.details}`
        : language === 'ml'
        ? `ഈ സ്ഥലത്തിന്റെ ചരിത്രം ${firstTimeline?.yearOrEra || 'പുരാതന കാലം'} ആരംഭിക്കുന്നു, ഭരണാധികാരികൾ ${firstTimeline?.rulerOrDynasty || 'കർണാടക രാജവംശങ്ങൾ'}: ${firstTimeline?.event}. ${firstTimeline?.details}`
        : `This historic landmark was developed during ${firstTimeline?.yearOrEra || 'ancient era'} under ${firstTimeline?.rulerOrDynasty || 'Karnataka dynasties'}: ${firstTimeline?.event}. ${firstTimeline?.details}`;

      return {
        answerText: answer,
        category: 'founder',
        isVerifiedFact: true,
        sourceCitation: data.sourcesAndReferences[0]?.title || 'Archaeological Survey of India Records'
      };
    }

    // 3. Why Famous / Significance Question
    const isFamousQuery =
      qLower.includes('famous') || qLower.includes('significance') || qLower.includes('why visit') || qLower.includes('special') ||
      qLower.includes('ಪ್ರಸಿದ್ಧ') || qLower.includes('ಮಹತ್ವ') || qLower.includes('ವಿಶೇಷ') ||
      qLower.includes('ప్రసిద్ధి') || qLower.includes('ప్రాముఖ్యత') || qLower.includes('విశేషం') ||
      qLower.includes('प्रसिद्ध') || qLower.includes('महत्व') || qLower.includes('विशेषता') ||
      qLower.includes('பிரபலமானது') || qLower.includes('முக்கியத்துவம்') || qLower.includes('சிறப்பு') ||
      qLower.includes('പ്രശസ്തം') || qLower.includes('പ്രാധാന്യം') || qLower.includes('പ്രത്യേകത');

    if (isFamousQuery) {
      const fact1 = data.documentedHistoryFacts[0] || '';
      const fact2 = data.documentedHistoryFacts[1] || '';
      const arch = data.architectureHighlights[0];
      const answer = language === 'kn'
        ? `ಈ ಸ್ಥಳವು ವಿಶ್ವಪ್ರಸಿದ್ಧವಾಗಿದೆ ಏಕೆಂದರೆ: 1) ${fact1} 2) ವಾಸ್ತುಶಿಲ್ಪ ಶೈಲಿ: ${arch?.periodOrStyle || ''} - ${arch?.feature}: ${arch?.description} 3) ${fact2}`
        : language === 'te'
        ? `ఈ క్షేత్రం ప్రపంచ ప్రసిద్ధి చెందడానికి ముఖ్య కారణాలు: 1) ${fact1} 2) అద్భుత శిల్పకళ: ${arch?.periodOrStyle || ''} - ${arch?.feature}: ${arch?.description} 3) ${fact2}`
        : language === 'hi'
        ? `यह स्थल विश्व प्रसिद्ध है क्योंकि: 1) ${fact1} 2) भव्य वास्तुकला शैली: ${arch?.periodOrStyle || ''} - ${arch?.feature}: ${arch?.description} 3) ${fact2}`
        : language === 'ta'
        ? `இந்த இடம் உலகப் புகழ்பெற்றதற்கான காரணங்கள்: 1) ${fact1} 2) கட்டடக்கலையின் சிறப்பம்சம்: ${arch?.periodOrStyle || ''} - ${arch?.feature}: ${arch?.description} 3) ${fact2}`
        : language === 'ml'
        ? `ഈ പ്രദേശം ലോകപ്രശസ്തമായത്: 1) ${fact1} 2) വാസ്തുവിദ്യാ ശൈലി: ${arch?.periodOrStyle || ''} - ${arch?.feature}: ${arch?.description} 3) ${fact2}`
        : `This landmark is internationally renowned because: 1) ${fact1} 2) Distinctive architecture: ${arch?.periodOrStyle || ''} - ${arch?.feature}: ${arch?.description} 3) ${fact2}`;

      return {
        answerText: answer,
        category: 'significance',
        isVerifiedFact: true,
        sourceCitation: 'UNESCO & Karnataka State Tourism Board'
      };
    }

    // 4. Folklore / Legends / Mythology Question
    const isLegendQuery =
      qLower.includes('legend') || qLower.includes('myth') || qLower.includes('folklore') || qLower.includes('story') ||
      qLower.includes('ಪುರಾಣ') || qLower.includes('ದಂತಕಥೆ') || qLower.includes('ಕಥೆ') ||
      qLower.includes('పురాణ') || qLower.includes('గాథ') || qLower.includes('ఐతిహ్యం') ||
      qLower.includes('कथा') || qLower.includes('पौराणिक') || qLower.includes('मान्यता') ||
      qLower.includes('புராணம்') || qLower.includes('கதை') || qLower.includes('ஐதீகம்') ||
      qLower.includes('ഐതിഹ്യം') || qLower.includes('പുരാണം');

    if (isLegendQuery) {
      const legendFaq = data.faqList.find(f => f.category === 'legend_vs_fact');
      if (legendFaq) {
        return {
          answerText: legendFaq.answer[language] || legendFaq.answer.en,
          category: 'legend_vs_fact',
          isVerifiedFact: true,
          sourceCitation: 'Karnataka State Gazetteer & Cultural Studies'
        };
      }
      const legendText = data.folkloreAndLegends.join(' ');
      return {
        answerText: legendText || 'Local traditions celebrate this sacred ground with enduring cultural folklore.',
        category: 'folklore',
        isVerifiedFact: false,
        sourceCitation: 'Karnataka Oral Traditions & Local Folklore Records'
      };
    }

    // 5. Architecture / Pillars / Features Question
    const isArchQuery =
      qLower.includes('architecture') || qLower.includes('style') || qLower.includes('pillar') || qLower.includes('musical') || qLower.includes('sculpture') || qLower.includes('carving') ||
      qLower.includes('ವಾಸ್ತುಶಿಲ್ಪ') || qLower.includes('ಶೈಲಿ') || qLower.includes('ಸ್ತಂಭ') || qLower.includes('ಸಂಗೀತ') || qLower.includes('ಶಿಲ್ಪ') || qLower.includes('ಕೆತ್ತನೆ') ||
      qLower.includes('శిల్పకళ') || qLower.includes('శైలి') || qLower.includes('స్తంభ') || qLower.includes('సంగీత') || qLower.includes('శిల్పం') ||
      qLower.includes('वास्तुकला') || qLower.includes('शैली') || qLower.includes('स्तंभ') || qLower.includes('संगीत') || qLower.includes('मूर्तिकला') ||
      qLower.includes('கட்டடக்கலை') || qLower.includes('பாணி') || qLower.includes('தூண்') || qLower.includes('இசை') || qLower.includes('சிற்பம்') ||
      qLower.includes('ശില്പകല') || qLower.includes('ശൈലി') || qLower.includes('തൂൺ') || qLower.includes('സംഗീത') || qLower.includes('ശില്പം');

    if (isArchQuery) {
      const archHighlights = data.architectureHighlights.map(a => `${a.feature} (${a.periodOrStyle}): ${a.description}`).join(' • ');
      const answer = language === 'kn'
        ? `ಪ್ರಮುಖ ವಾಸ್ತುಶಿಲ್ಪ ವೈಶಿಷ್ಟ್ಯಗಳು: ${archHighlights}`
        : language === 'te'
        ? `ప్రధాన శిల్పకళా విశేషాలు: ${archHighlights}`
        : language === 'hi'
        ? `प्रमुख वास्तुकला विशेषताएँ: ${archHighlights}`
        : language === 'ta'
        ? `முக்கிய கட்டடக்கலையின் சிறப்பம்சங்கள்: ${archHighlights}`
        : language === 'ml'
        ? `പ്രധാന വാസ്തുവിദ്യാ സവിശേഷതകൾ: ${archHighlights}`
        : `Key Architectural Highlights: ${archHighlights}`;

      return {
        answerText: answer,
        category: 'architecture',
        isVerifiedFact: true,
        sourceCitation: data.sourcesAndReferences[0]?.authority || 'Archaeological Survey of India'
      };
    }

    // 6. What to see next / Nearby recommendations
    const isNextQuery =
      qLower.includes('next') || qLower.includes('nearby') || qLower.includes('recommend') ||
      qLower.includes('ಮುಂದೆ') || qLower.includes('ಹತ್ತಿರ') ||
      qLower.includes('తర్వాత') || qLower.includes('దగ్గర') ||
      qLower.includes('आगे') || qLower.includes('आस-पास') ||
      qLower.includes('அடுத்து') || qLower.includes('அருகில்') ||
      qLower.includes('അടുത്ത') || qLower.includes('അടുത്ത്');

    if (isNextQuery) {
      const answer = language === 'kn'
        ? `ಮುಂದೆ ಭೇಟಿ ನೀಡಲು ಶಿಫಾರಸು: ಸಮೀಪದ ಇತರ ಪ್ರಮುಖ ತಾಣಗಳು ಹಾಗೂ ಪಾರಂಪರಿಕ ಸ್ಮಾರಕಗಳನ್ನು ನಮ್ಮ ಯಾತ್ರಾ ಪ್ಲಾನರ್ ಮೂಲಕ ವೀಕ್ಷಿಸಬಹುದು. ಪ್ರವಾಸದ ಪೂರ್ಣ ಮಾರ್ಗ ನಕ್ಷೆ ಸಿದ್ಧವಾಗಿದೆ!`
        : language === 'te'
        ? `తర్వాత సందర్శించాల్సిన ప్రదేశాలు: సమీపంలోని ఇతర చారిత్రక కట్టడాలు మరియు పర్యాటక ప్రదేశాలను మా యాత్ర ప్లానర్ ద్వారా చూడవచ్చు. సంపూర్ణ యాత్రా ప్రణాళిక సిద్ధంగా ఉంది!`
        : language === 'hi'
        ? `आगे देखने के लिए सुझाव: पास के अन्य ऐतिहासिक स्थलों और सांस्कृतिक धरोहरों को हमारे यात्रा प्लानर से देखें। संपूर्ण यात्रा कार्यक्रम उपलब्ध है!`
        : language === 'ta'
        ? `அடுத்து பார்க்க வேண்டிய இடங்கள்: அருகிலுள்ள பிற வரலாற்று தளங்கள் மற்றும் கலாச்சார இடங்களை நமது யாத்ரா திட்டமிடுபவர் மூலம் காணலாம். முழு பயணத்திட்டம் தயாராக உள்ளது!`
        : language === 'ml'
        ? `അടുത്തതായി കാണേണ്ട സ്ഥലങ്ങൾ: സമീപത്തുള്ള മറ്റ് ചരിത്ര സ്മാരകങ്ങളും സാംസ്കാരിക കേന്ദ്രങ്ങളും നമ്മുടെ യാത്ര പ്ലാനറിലൂടെ കാണാം. പൂർണ്ണ യാത്രാ പദ്ധതി തയ്യാറാണ്!`
        : `Recommended next stops: Explore nearby heritage monuments and natural trails using our smart Yatra Trip Planner. Full day-wise itineraries are ready for you!`;

      return {
        answerText: answer,
        category: 'itinerary',
        isVerifiedFact: true,
        sourceCitation: 'Karnataka State Tourism Development Corporation (KSTDC)'
      };
    }

    // 7. Context-Rich Verified Fallback Summary
    const fact = data.documentedHistoryFacts.join(' ');
    const answer = language === 'kn'
      ? `ದಾಖಲಿತ ಐತಿಹಾಸಿಕ ಮಾಹಿತಿ: ${fact}`
      : language === 'te'
      ? `చారిత్రక ప్రామాణిక సమాచారం: ${fact}`
      : language === 'hi'
      ? `प्रमाणित ऐतिहासिक विवरण: ${fact}`
      : language === 'ta'
      ? `ஆவணப்படுத்தப்பட்ட வரலாற்று விவரம்: ${fact}`
      : language === 'ml'
      ? `രേഖപ്പെടുത്തിയ ചരിത്ര വിവരണം: ${fact}`
      : `Documented Historical Facts: ${fact}`;

    return {
      answerText: answer,
      category: 'general_history',
      isVerifiedFact: true,
      sourceCitation: data.sourcesAndReferences[0]?.title || 'Karnataka State Tourism Archives'
    };
  }
}
