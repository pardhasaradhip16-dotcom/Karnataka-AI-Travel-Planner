import type { 
  VoiceGuideLanguage, 
  NarrationScript,
  HistoricalMilestone,
  ArchitectureHighlight,
  HistoricalSourceReference
} from '../types';

export interface DestinationVoiceDetail {
  id: string;
  timelines: Record<VoiceGuideLanguage, HistoricalMilestone[]>;
  architectures: Record<VoiceGuideLanguage, ArchitectureHighlight[]>;
  facts: Record<VoiceGuideLanguage, string[]>;
  folklore: Record<VoiceGuideLanguage, string[]>;
  references: HistoricalSourceReference[];
  narrations: Record<VoiceGuideLanguage, Record<'quick' | 'standard' | 'deep_history', NarrationScript>>;
}

export const DESTINATION_VOICE_DETAILS: Record<string, DestinationVoiceDetail> = {
  coorg: {
    id: 'coorg',
    timelines: {
      te: [
        {
          yearOrEra: '9వ - 11వ శతాబ్దం',
          event: 'గంగ మరియు చోళుల పాలనలో కొడగు ప్రాభవం',
          rulerOrDynasty: 'పశ్చిమ గంగ & చోళ సామ్రాజ్యాలు',
          details: 'తలకావేరిలో కావేరి నది ఆవిర్భావ ప్రాంతంగా ఆధ్యాత్మిక మరియు వాణిజ్య రక్షణ కేంద్రంగా గుర్తింపు పొందింది.',
          isDocumentedHistory: true
        },
        {
          yearOrEra: '1600 - 1834 CE',
          event: 'హాలేరి రాజవంశ పాలన మరియు కొడవ యోధ సంస్కృతి',
          rulerOrDynasty: 'హాలేరి రాజులు (వీరరాజేంద్ర, ముద్దురాజ)',
          details: 'మడికేరి రాజధానిగా కోట నిర్మాణం, రాజాస్ సీట్ ఉద్యానవనం మరియు బ్రిటిష్ వారితో మైత్రి-యుద్ధ పరిణామాలు.',
          isDocumentedHistory: true
        },
        {
          yearOrEra: '1854 CE నుండి నేటివరకు',
          event: 'భారత కాఫీ రాజధానిగా ఆవిర్భావం',
          rulerOrDynasty: 'బ్రిటిష్ పాలన & ఆధునిక కర్ణాటక',
          details: 'అరేబికా మరియు రోబస్టా కాఫీ తోటల విస్తరణతో భారతదేశంలో అత్యధిక కాఫీ ఉత్పత్తి చేసే ప్రముఖ హిల్ స్టేషన్‌గా గుర్తింపు.',
          isDocumentedHistory: true
        }
      ],
      kn: [
        {
          yearOrEra: '9ನೇ - 11ನೇ ಶತಮಾನ',
          event: 'ಗಂಗ ಮತ್ತು ಚೋಳರ ಆಳ್ವಿಕೆಯಲ್ಲಿ ಕೊಡಗಿನ ಉಗಮ',
          rulerOrDynasty: 'ಪಶ್ಚಿಮ ಗಂಗ ಮತ್ತು ಚೋಳ ಸಾಮ್ರಾಜ್ಯ',
          details: 'ತಲಕಾವೇರಿಯಲ್ಲಿ ಪವಿತ್ರ ಕಾವೇರಿ ನದಿಯ ಉಗಮ ಸ್ಥಾನವಾಗಿ ಧಾರ್ಮಿಕ ಮತ್ತು ಸಾಂಸ್ಕೃತಿಕ ಮಹತ್ವ ಪಡೆಯಿತು.',
          isDocumentedHistory: true
        },
        {
          yearOrEra: '1600 - 1834 CE',
          event: 'ಹಾಲೆರಿ ಅರಸರ ಆಡಳಿತ ಮತ್ತು ಕೊಡವ ವೀರ ಪರಂಪರೆ',
          rulerOrDynasty: 'ಹಾಲೆರಿ ರಾಜವಂಶ',
          details: 'ಮಡಿಕೇರಿ ಕೋಟೆಯ ನಿರ್ಮಾಣ, ರಾಜಾಸೀಟ್ ಉದ್ಯಾನವನ ಮತ್ತು ಕೊಡಗಿನ ವಿಶಿಷ್ಟ ಸಮರ ಕಲೆಗಳ ಸುವರ್ಣ ಕಾಲ.',
          isDocumentedHistory: true
        },
        {
          yearOrEra: '1854 CE ನಂತರ',
          event: 'ಕಾಫಿ ತೋಟಗಳ ವಿಸ್ತರಣೆ ಮತ್ತು ಪ್ರವಾಸೋದ್ಯಮ',
          rulerOrDynasty: 'ಕರ್ನಾಟಕ ಸರ್ಕಾರ ಮತ್ತು ಕೊಡಗು ಪರಂಪರೆ',
          details: 'ಭಾರತದ ಕಾಫಿ ತೊಟ್ಟಿಲು ಎಂದು ಹೆಸರುವಾಸಿ ಪಡೆದು ಯುನೆಸ್ಕೋ ಪಶ್ಚಿಮ ಘಟ್ಟಗಳ ಜೀವವೈವಿಧ್ಯ ತಾಣವಾಗಿ ಬೆಳೆಯಿತು.',
          isDocumentedHistory: true
        }
      ],
      hi: [
        {
          yearOrEra: '9वीं - 11वीं सदी',
          event: 'गंगा एवं चोल साम्राज्य के अधीन कोडागु',
          rulerOrDynasty: 'पश्चिमी गंग एवं चोल राजवंश',
          details: 'तलकावेरी में पवित्र कावेरी नदी के उद्गम स्थल के रूप में आध्यात्मिक मान्यता प्राप्त हुई।',
          isDocumentedHistory: true
        },
        {
          yearOrEra: '1600 - 1834 ईस्वी',
          event: 'हालेरी राजवंश और कोडवा योद्धा संस्कृति',
          rulerOrDynasty: 'हालेरी राजा',
          details: 'मडिकेरी किले का निर्माण, राजा की सीट मंडप और विशिष्ट कोडवा मार्शल परंपराओं का विकास।',
          isDocumentedHistory: true
        },
        {
          yearOrEra: 'आधुनिक काल',
          event: 'भारत की कॉफी राजधानी और जैव विविधता हॉटस्पॉट',
          rulerOrDynasty: 'कर्नाटक पर्यटन एवं वन विभाग',
          details: 'विश्व के 8 प्रमुख जैव विविधता हॉटस्पॉट में शामिल तथा भारत का सर्वोच्च कॉफी उत्पादक जिला।',
          isDocumentedHistory: true
        }
      ],
      ta: [
        {
          yearOrEra: '9ஆம் - 11ஆம் நூற்றாண்டு',
          event: 'கங்கர் மற்றும் சோழர் ஆட்சியில் குடகு',
          rulerOrDynasty: 'மேலை கங்கர் & சோழ பேரரசு',
          details: 'தலக்காவிரியில் புனித காவிரி நதி தோன்றும் ஆன்மீக பூமியாக போற்றப்பட்டது.',
          isDocumentedHistory: true
        },
        {
          yearOrEra: '1600 - 1834 CE',
          event: 'ஹாலேரி அரசர்கள் மற்றும் கொடவா பாரம்பரியம்',
          rulerOrDynasty: 'ஹாலேரி மன்னர்கள்',
          details: 'மடிக்கேரி கோட்டை மற்றும் ராஜாவின் இருக்கை அமைக்கப்பட்ட வரலாற்று காலம்.',
          isDocumentedHistory: true
        }
      ],
      ml: [
        {
          yearOrEra: '9 - 11 നൂറ്റാണ്ട്',
          event: 'ഗംഗ, ചോള ഭരണകാലത്തെ കുടക് പാരമ്പര്യം',
          rulerOrDynasty: 'പശ്ചിമ ഗംഗ & ചോള രാജവംശങ്ങൾ',
          details: 'തലക്കാവേരിയിലെ കാവേരി നദിയുടെ ഉത്ഭവസ്ഥാനമായി പ്രസിദ്ധമായി.',
          isDocumentedHistory: true
        },
        {
          yearOrEra: '1600 - 1834 CE',
          event: 'ഹാലേരി രാജവംശവും കൊടവ പാരമ്പര്യവും',
          rulerOrDynasty: 'ഹാലേരി രാജാക്കന്മാർ',
          details: 'മടിക്കേരി കോട്ടയും രാജാസ് സീറ്റും നിർമ്മിക്കപ്പെട്ട കാലഘട്ടം.',
          isDocumentedHistory: true
        }
      ],
      en: [
        {
          yearOrEra: '9th – 11th Century CE',
          event: 'Early Rule under Gangas and Cholas',
          rulerOrDynasty: 'Western Ganga & Imperial Chola Dynasties',
          details: 'Sanctified as the cradle of River Kaveri at Talakaveri, establishing early forest fortresses and trade routes.',
          isDocumentedHistory: true
        },
        {
          yearOrEra: '1600 – 1834 CE',
          event: 'Haleri Dynasty Reign & Martial Kodava Culture',
          rulerOrDynasty: 'Haleri Kings (Mudduraja, Veerarajendra)',
          details: 'Mudduraja founded Madikeri (Muddu-raja-keri) in 1681, constructing the laterite fort and the panoramic Raja’s Seat pavilion.',
          isDocumentedHistory: true
        },
        {
          yearOrEra: '1854 CE – Present',
          event: 'Cradle of Indian Coffee & UNESCO Biosphere',
          rulerOrDynasty: 'Modern Era / Karnataka Forest Dept',
          details: 'Transformed into India’s premier Arabica and Robusta coffee heartland within the UN-inscribed Western Ghats biodiversity hotspot.',
          isDocumentedHistory: true
        }
      ]
    },
    architectures: {
      te: [
        {
          feature: 'మడికేరి మట్టి-రాతి కోట మరియు ప్యాలెస్',
          description: '17వ శతాబ్దపు హాలేరి రాజులచే నిర్మించబడి, టిప్పు సుల్తాన్ మరియు బ్రిటిష్ వారిచే పునర్నిర్మించబడిన రెండు అంతస్తుల వారసత్వ భవనం.',
          periodOrStyle: '17వ శతాబ్దపు ఇండో-యూరోపియన్ మిశ్రమ శైలి'
        },
        {
          feature: 'రాజాస్ సీట్ సూర్యాస్తమయ మండపం',
          description: 'కొడగు పాలకుల సాయంకాల విశ్రాంతి వేదిక; పశ్చిమ కనుమల పచ్చటి లోయలపై అద్భుతమైన సూర్యాస్తమయ దృశ్యాలను వీక్షించవచ్చు.',
          periodOrStyle: 'హాలేరి రాజ శైలి'
        },
        {
          feature: 'నంబ్రోలింగ్ గోల్డెన్ టెంపుల్ (బైలకుప్పె)',
          description: 'భారతదేశంలో రెండవ అతిపెద్ద టిబెటన్ నివాస ప్రాంతం; 40 అడుగుల ఎత్తైన మూడు బంగారు పూత పూసిన బుద్ధ విగ్రహాలు మరియు వర్ణచిత్రాలు.',
          periodOrStyle: 'టిబెటన్ బౌద్ధ సాంప్రదాయ శైలి'
        }
      ],
      kn: [
        {
          feature: 'ಮಡಿಕೇರಿ ಕೋಟೆ ಮತ್ತು ಅರಮನೆ',
          description: '17ನೇ ಶತಮಾನದಲ್ಲಿ ಮುದ್ದುರಾಜ ಕಟ್ಟಿಸಿದ ಸುಂದರ ಇಟ್ಟಿಗೆ-ಕಲ್ಲಿನ ಕೋಟೆ ಮತ್ತು ರಾಜಮನೆತನದ ಭವನ.',
          periodOrStyle: 'ಹಾಲೆರಿ ಮತ್ತು ವಸಾಹತುಶಾಹಿ ವಾಸ್ತುಶಿಲ್ಪ'
        },
        {
          feature: 'ರಾಜಾಸೀಟ್ ವೀಕ್ಷಣಾ ಗೋಪುರ',
          description: 'ಸೂರ್ಯಾಸ್ತ ಮತ್ತು ಮಂಜಿನ ಕಣಿವೆಗಳನ್ನು ನೋಡಲು ಕೊಡಗಿನ ರಾಜರು ಬಳಸುತ್ತಿದ್ದ ಐತಿಹಾಸಿಕ ತಾಣ.',
          periodOrStyle: 'ಹಾಲೆರಿ ಕಾಲ'
        },
        {
          feature: 'ಬೈಲಕುಪ್ಪೆ ಬೌದ್ಧ ಸ್ವರ್ಣ ಮಂದಿರ',
          description: '40 ಅಡಿ ಎತ್ತರದ ಭವ್ಯ ಚಿನ್ನದ ಲೇಪನದ ಬುದ್ಧನ ಮೂರ್ತಿಗಳು ಮತ್ತು ಸುಂದರ ಟಿಬೆಟಿಯನ್ ಭಿತ್ತಿಚಿತ್ರಗಳು.',
          periodOrStyle: 'ಟಿಬೆಟಿಯನ್ ಬೌದ್ಧ ಶೈಲಿ'
        }
      ],
      hi: [
        {
          feature: 'मडिकेरी किला एवं राजमहल',
          description: '17वीं सदी में हालेरी राजाओं द्वारा निर्मित मजबूत किला एवं ऐतिहासिक महल।',
          periodOrStyle: 'हालेरी एवं ब्रिटिश स्थापत्य'
        },
        {
          feature: 'राजा की सीट (Raja’s Seat)',
          description: 'कोडागु के राजाओं का प्रिय सूर्यास्त मंडप जहाँ से हरी-भरी घाटियों का मनोरम दृश्य दिखता है।',
          periodOrStyle: '17वीं सदी'
        },
        {
          feature: 'नामद्रोलिंग बौद्ध स्वर्ण मंदिर',
          description: 'बैलकुप्पे में स्थित 40 फीट ऊंची तीन भव्य स्वर्ण प्रतिमाओं वाला एशिया प्रसिद्ध बौद्ध मठ।',
          periodOrStyle: 'पारंपरिक तिब्बती शैली'
        }
      ],
      ta: [
        {
          feature: 'மடிக்கேரி கோட்டை மற்றும் அரண்மனை',
          description: '17ஆம் நூற்றாண்டில் ஹாเลரி மன்னர்களால் செதுக்கப்பட்ட வரலாற்று கோட்டை.',
          periodOrStyle: 'பண்டைய கர்நாடக கட்டடக்கலை'
        }
      ],
      ml: [
        {
          feature: 'മടിക്കേരി കോട്ടയും കൊട്ടാരവും',
          description: 'പതിനേഴാം നൂറ്റാണ്ടിലെ ചരിത്രപ്രസിദ്ധമായ കോട്ടയും രാജകൊട്ടാരവും.',
          periodOrStyle: 'ഹാലേരി പാരമ്പര്യം'
        }
      ],
      en: [
        {
          feature: 'Madikeri Fort & Palace Complex',
          description: 'Originally constructed in mud by Mudduraja in the late 17th century, rebuilt in stone by Tipu Sultan, and later redesigned with English clock towers.',
          periodOrStyle: '17th Century Haleri & British Colonial'
        },
        {
          feature: 'Raja’s Seat Sunset Pavilion',
          description: 'A brick and mortar arched pavilion perched on a high ridge overlooking deep mist-filled amphitheater valleys where Kodagu royals watched twilight.',
          periodOrStyle: '18th Century Royal Pavilion'
        },
        {
          feature: 'Namdroling Golden Temple (Bylakuppe)',
          description: 'Second largest Tibetan settlement in exile, featuring three 40-foot gilded statues of Padmasambhava, Buddha Shakyamuni, and Amitayus.',
          periodOrStyle: 'Tibetan Buddhist Monastic'
        }
      ]
    },
    facts: {
      te: [
        'భారతదేశంలో ఉత్పత్తి అయ్యే మొత్తం కాఫీలో 40 శాతానికి పైగా కూర్గ్ (కొడగు) లోనే సాగవుతుంది.',
        'దక్షిణ భారతదేశానికి జీవనాడి అయిన పవిత్ర కావేరి నది కూర్గ్‌లోని బ్రహ్మగిరి పర్వతాలలో తలకావేరి వద్ద పుడుతుంది.',
        'కొడవ ప్రజలు భారతదేశంలో తుపాకీ లైసెన్స్ లేకుండా తుపాకీని ఆచారబద్ధంగా ధరించే విశిష్ట రాజ్యాంగ హక్కు కలిగిన ఏకైక సమాజం.',
        'యునెస్కో పశ్చిమ కనుమలలోని 8 అతిపెద్ద జీవవైవిధ్య కేంద్రాలలో కూర్గ్ అటవీ ప్రాంతం అత్యంత కీలకమైనది.'
      ],
      kn: [
        'ಭಾರತದ ಒಟ್ಟು ಕಾಫಿ ಉತ್ಪಾದನೆಯ ಶೇಕಡಾ 40ಕ್ಕೂ ಹೆಚ್ಚು ಪಾಲು ಕೊಡಗು ಜಿಲ್ಲೆಯಿಂದಲೇ ಬರುತ್ತದೆ.',
        'ದಕ್ಷಿಣ ಭಾರತದ ಜೀವನಾಡಿ ಪವಿತ್ರ ಕಾವೇರಿ ನದಿಯು ಬ್ರಹ್ಮಗಿರಿ ಬೆಟ್ಟದ ತಲಕಾವೇರಿಯಲ್ಲಿ ಉದ್ಭವಿಸುತ್ತದೆ.',
        'ಕೊಡವ ಜನಾಂಗವು ಭಾರತದಲ್ಲಿ ಪರವಾನಗಿ ರಹಿತ ಬಂದೂಕು ಹೊಂದುವ ವಿಶೇಷ ಸಾಂಪ್ರದಾಯಿಕ ಹಕ್ಕು ಪಡೆದಿರುವ ಏಕೈಕ ವೀರ ಸಮುದಾಯವಾಗಿದೆ.',
        'ಯುನೆಸ್ಕೋ ವಿಶ್ವ ಜೀವವೈವಿಧ್ಯ ತಾಣಗಳ ಪಟ್ಟಿಯಲ್ಲಿ ಕೊಡಗಿನ ಪಶ್ಚಿಮ ಘಟ್ಟಗಳು ಅಗ್ರಸ್ಥಾನದಲ್ಲಿವೆ.'
      ],
      hi: [
        'भारत के कुल कॉफी उत्पादन का 40% से अधिक हिस्सा अकेले कोडागु (कूर्ग) से प्राप्त होता है।',
        'दक्षिण भारत की जीवनदायिनी पवित्र कावेरी नदी कूर्ग की ब्रह्मगिरि पहाड़ियों में स्थित तलकावेरी से निकलती है।',
        'कोडवा समुदाय भारत का एकमात्र ऐसा समुदाय है जिसे बिना लाइसेंस के पारंपरिक हथियार रखने की कानूनी छूट प्राप्त है।'
      ],
      ta: [
        'இந்தியாவின் 40 சதவீதத்திற்கும் அதிகமான காபி உற்பத்தி கூர்க் பகுதியில் இருந்து கிடைக்கிறது.',
        'புனித காவிரி ஆறு குடகின் பிரம்மகிரி மலையில் உள்ள தலக்காவிரியில் உற்பத்தியாகிறது.'
      ],
      ml: [
        'ഇന്ത്യയിലെ കാപ്പി ഉൽപാദനത്തിന്റെ 40 ശതമാനത്തിലധികവും കുടകിലാണ് നടക്കുന്നത്.',
        'പവിത്രമായ കാവേരി നദി ഉത്ഭവിക്കുന്നത് കുടകിലെ തലക്കാവേരിയിൽ നിന്നാണ്.'
      ],
      en: [
        'Kodagu accounts for over 40% of India’s total coffee production, blanketed with shade-grown Arabica and Robusta estates.',
        'River Kaveri, the lifeline of southern India, originates at Talakaveri at an altitude of 1,276 meters on the Brahmagiri hills.',
        'The martial Kodava community is historically exempted from the Indian Arms Act, carrying ancestral firearms as cultural heritage.',
        'Kodagu is part of the UN-inscribed Western Ghats, containing one of the world’s eight hottest biodiversity hotspots.'
      ]
    },
    folklore: {
      te: [
        'స్థానిక పురాణం ప్రకారం, అగస్త్య మహర్షి కమండలంలో ఉన్న కావేరి జలాలను వినాయకుడు కాకి రూపంలో వచ్చి ఒలకబోయడంతో పవిత్ర కావేరి నది ఉద్భవించిందని విశ్వసిస్తారు.',
        'కొడవ వివాహాలలో పూజారులు ఉండరు; కుటుంబ పెద్దల ఆశీర్వాదాలు మరియు సంప్రదాయ కొడవ ఖడ్గంతో అరటి స్తంభాలను నరకడం వారి వీరత్వాన్ని సూచిస్తుంది.'
      ],
      kn: [
        'ಅಗಸ್ತ್ಯ ಮುನಿಗಳ ಕಮಂಡಲದಲ್ಲಿದ್ದ ನೀರನ್ನು ಗಣೇಶನು ಕಾಗೆಯ ರೂಪದಲ್ಲಿ ಬಂದು ಚೆಲ್ಲಿದಾಗ ಪವಿತ್ರ ಕಾವೇರಿ ನದಿಯಾಗಿ ಹರಿಯಿತು ಎಂಬುದು ಜನಪ್ರಿಯ ಪೌರಾಣಿಕ ಕಥೆ.',
        'ಕೊಡವ ಮದುವೆಗಳಲ್ಲಿ ಬ್ರಾಹ್ಮಣ ಪುರೋಹಿತರಿರುವುದಿಲ್ಲ; ಹಿರಿಯರ ಆಶೀರ್ವಾದ ಮತ್ತು ಬಾಳೆಕಂಬ ಕಡಿಯುವ ವೀರ ಸಂಪ್ರದಾಯವೇ ಮುಖ್ಯ ವಿಧಿ.'
      ],
      hi: [
        'पौराणिक मान्यता है कि ऋषि अगस्त्य के कमंडल से जब भगवान गणेश ने कौवे का रूप धरकर जल छलकाया, तब पावन कावेरी नदी का जन्म हुआ।',
        'कोडवा शादियों में पुजारी के बिना बुजुर्गों के आशीर्वाद और पारंपरिक तलवार से केले के तने काटने की अनूठी रस्म होती है।'
      ],
      ta: [
        'அகத்திய முனிவரின் கமண்டலத்திலிருந்து விநாயகர் காக வடிவில் வந்து நீரை கவிழ்த்தபோது காவிரி ஆறு தோன்றியதாக ஐதீகம்.'
      ],
      ml: [
        'അഗസ്ത്യ മുനിയുടെ കമണ്ഡലത്തിൽ നിന്ന് കാക്കയുടെ രൂപത്തിൽ വന്ന ഗണപതി വെള്ളം ഒഴുക്കിയപ്പോഴാണ് കാവേരി നദി ഉണ്ടായതെന്ന് ഐതിഹ്യം.'
      ],
      en: [
        'According to legend, Sage Agastya kept River Kaveri in his kamandalu; Lord Ganesha assumed the form of a crow, tipped the vessel, and unleashed the holy river.',
        'Kodava weddings are solemnized without priests; the ceremony centers on ancestral blessings and the groom cleaving banana trunks with a traditional odikathi blade.'
      ]
    },
    references: [
      {
        title: 'Gazetteer of Coorg (Rev. G. Richter, 1870)',
        authority: 'British Mysore & Coorg Administration',
        description: 'Comprehensive historical, anthropological, and botanical documentation of Kodagu.'
      },
      {
        title: 'Western Ghats Ecology & Kaveri Watershed',
        authority: 'Karnataka Forest Department & UNESCO World Heritage Centre',
        description: 'Biodiversity evaluation and protected reserve boundaries of Brahmagiri and Pushpagiri.'
      }
    ],
    narrations: {
      te: {
        quick: {
          language: 'te',
          languageNativeName: 'తెలుగు',
          estimatedDuration: '75 sec',
          fullText: 'భారతదేశపు స్కాట్లాండ్‌గా పిలవబడే పచ్చని కొడగు లేదా కూర్గ్‌కు ఆత్మీయ సుస్వాగతం! పశ్చిమ కనుమల ఒడిలో విస్తరించిన ఈ సుందర ప్రాంతం ఘుమఘుమలాడే కాఫీ తోటలు, సుగంధ ద్రవ్యాలు మరియు చల్లని పొగమంచు కొండలకు పెట్టింది పేరు. ఇక్కడ పవిత్ర కావేరి నది పుట్టిన తలకావేరి, అబ్బీ జలపాతం, రాజాస్ సీట్ సూర్యాస్తమయం మరియు బైలకుప్పెలోని స్వర్ణ బౌద్ధ దేవాలయం ప్రధాన ఆకర్షణలు. ధైర్యసాహసాలకు మారుపేరైన కొడవ ప్రజల ఆతిథ్యం మీ ప్రయాణాన్ని చిరస్మరణీయం చేస్తుంది.',
          sections: [
            { title: 'కూర్గ్ పరిచయం & కాఫీ తోటలు', text: 'పశ్చిమ కనుమలలోని కాఫీ మరియు సుగంధ ద్రవ్యాల సుందర నిలయం కూర్గ్.', startPercent: 0 },
            { title: 'ముఖ్య ఆకర్షణలు', text: 'తలకావేరి, అబ్బీ జలపాతం, రాజాస్ సీట్ మరియు బైలకుప్పె గోల్డెన్ టెంపుల్.', startPercent: 40 },
            { title: 'కొడవ సంస్కృతి & అనుభూతి', text: 'రుచికరమైన స్థానిక వంటకాలు మరియు ఆహ్లాదకరమైన వాతావరణం.', startPercent: 75 }
          ]
        },
        standard: {
          language: 'te',
          languageNativeName: 'తెలుగు',
          estimatedDuration: '3.5 min',
          fullText: 'నమస్కారం! పశ్చిమ కనుమల పచ్చని ఒడిలో వెలసిన అద్భుత గిరిధామం కొడగు (కూర్గ్) కు స్వాగతం. భారతదేశంలోనే అత్యధిక కాఫీని పండించే ఈ ప్రాంతం తన అద్భుత ప్రకృతి అందాలతో "ఇండియా స్కాట్లాండ్" గా ప్రపంచ ప్రసిద్ధి చెందింది.\n\nకూర్గ్ పర్యటనలో మొట్టమొదట దర్శించవలసినది పవిత్ర కావేరి నది జన్మస్థలమైన తలకావేరి. బ్రహ్మగిరి పర్వత శ్రేణులలో సముద్ర మట్టానికి దాదాపు 1276 మీటర్ల ఎత్తులో ఉన్న ఈ పవిత్ర తీర్థం నుండి ఉద్భవించిన కావేరి నది కర్ణాటక మరియు తమిళనాడు రాష్ట్రాలకు జీవనాడి. సమీపంలోని భాగమండలలో కావేరి, కన్నక మరియు అంతర్వాహిని సుజ్యోతి నదుల త్రివేణి సంగమం ఉంది.\n\nప్రకృతి ప్రేమికులను విశేషంగా ఆకట్టుకునే అబ్బీ ఫాల్స్ మరియు ఇరుప్పు జలపాతాలు దట్టమైన వర్షారణ్యాల మధ్య పాలధారల్లా పరవళ్లు తొక్కుతాయి. సాయంత్రం వేళ మడికేరిలోని "రాజాస్ సీట్" కు చేరుకుంటే, అంతులేని ఆకుపచ్చటి లోయలపై సూర్యుడు అస్తమించే రమణీయ దృశ్యం కనువిందు చేస్తుంది. ఇక్కడి రాజులు సాయం సమయాలలో ప్రకృతి అందాలను ఆస్వాదించడానికి ఈ మండపాన్ని ఉపయోగించేవారు.\n\nకూర్గ్ కేవలం ప్రకృతి మాత్రమే కాదు, విశిష్టమైన కొడవ యోధ సంస్కృతికి నిలయం. బైలకుప్పెలోని నామ్‌డ్రోలింగ్ మొనాస్టరీలో 40 అడుగుల ఎత్తైన మూడు స్వర్ణ బుద్ధ విగ్రహాలు టిబెటన్ కళా వైభవాన్ని చాటుతాయి. స్థానిక కదంబట్టు, వెదురు చిగుళ్ల కూర మరియు తాజా ఎస్టేట్ కాఫీని రుచి చూడటం మరచిపోకండి. ప్లాస్టిక్ రహితంగా పర్యటిస్తూ ఈ సున్నితమైన పర్యావరణాన్ని కాపాడండి.',
          sections: [
            { title: 'కాఫీ రాజధాని & తలకావేరి ప్రాశస్త్యం', text: 'కావేరి నది జన్మస్థానమైన తలకావేరి మరియు పశ్చిమ కనుమల కాఫీ తోటలు.', startPercent: 0 },
            { title: 'జలపాతాలు మరియు రాజాస్ సీట్', text: 'అబ్బీ ఫాల్స్, ఇరుప్పు జలపాతం మరియు రాజాస్ సీట్ సూర్యాస్తమయ దృశ్యాలు.', startPercent: 30 },
            { title: 'బైలకుప్పె గోల్డెన్ టెంపుల్', text: 'టిబెటన్ శిల్పకళా వైభవంతో అలరారే 40 అడుగుల స్వర్ణ బుద్ధ విగ్రహాలు.', startPercent: 60 },
            { title: 'కొడవ రుచులు & పర్యావరణ సంరక్షణ', text: 'కదంబట్టు, తాజా ఫిల్టర్ కాఫీ మరియు బాధ్యతాయుత పర్యాటకం.', startPercent: 85 }
          ]
        },
        deep_history: {
          language: 'te',
          languageNativeName: 'తెలుగు',
          estimatedDuration: '5.5 min',
          fullText: 'కొడగు యొక్క సమగ్ర చారిత్రక మరియు పర్యావరణ విశ్లేషణకు స్వాగతం. శతాబ్దాల తరబడి బాహ్య ప్రపంచపు దండయాత్రలకు లొంగని స్వతంత్ర రాజ్యంగా కొడగు చరిత్రలో ప్రత్యేక స్థానాన్ని నిలుపుకుంది. 9వ శతాబ్దంలో గంగ మరియు చోళుల శాసనాలలో పేర్కొనబడిన ఈ ప్రాంతం, 1600 నుండి హాలేరి రాజవంశం చేతుల్లోకి వచ్చింది.\n\nహాలేరి రాజు ముద్దురాజ 1681 లో మడికేరిని తన రాజధానిగా ఎంచుకుని మట్టి కోటను నిర్మించాడు. తర్వాతి కాలంలో టిప్పు సుల్తాన్ ఈ కోటను రాతితో పటిష్టం చేయగా, 1834 లో కొడగును స్వాధీనం చేసుకున్న బ్రిటిష్ వారు ఇందులో ఆంగ్లేయ గడియార స్తంభాన్ని, చర్చిని నిర్మించారు. భారతదేశంలో తుపాకీ చట్టం నుండి మినహాయింపు పొందిన ఏకైక సమాజం కొడవ ప్రజలు మాత్రమే. వారి ఆచారాలలో కత్తి మరియు తుపాకీ పవిత్రమైన రక్షణ సాధనాలుగా భావింపబడతాయి.\n\n1854 లో ఈ కొండలపై బ్రిటిష్ వారు మొదటిసారిగా కాఫీ తోటలను నాటారు. నేడు కొడగులో పండే అరేబికా మరియు రోబస్టా కాఫీ అంతర్జాతీయ మార్కెట్లో అత్యున్నత నాణ్యత కలిగినవిగా గుర్తింపు పొందాయి. యునెస్కో ప్రపంచ వారసత్వ సంపదగా గుర్తించిన పశ్చిమ కనుమల జీవవైవిధ్యంలో కూర్గ్ అతి ముఖ్యమైన భాగం. అంతరించిపోతున్న సింహపుతోక కోతులు, అడవి ఏనుగులు మరియు అరుదైన పక్షి జాతులకు ఈ అడవులు ఆవాసం.\n\nపుష్పగిరి మరియు బ్రహ్మగిరి అభయారణ్యాలు పర్యావరణవేత్తలకు స్వర్గధామం వంటివి. చారిత్రక రాజసం, వీర కొడవ యోధుల వారసత్వం మరియు సతతహరిత వనాల సమ్మేళనమైన కూర్గ్ కర్ణాటక పర్యాటక రంగంలో కలికితురాయి.',
          sections: [
            { title: 'హాలేరి రాజవంశం & మడికేరి కోట', text: '1600 నుండి సాగిన స్వతంత్ర హాలేరి పాలన మరియు మడికేరి కోట నిర్మాణం.', startPercent: 0 },
            { title: 'కొడవ యోధుల ప్రత్యేక హక్కులు', text: 'సాయుధ చట్టం నుండి మినహాయింపు పొందిన కొడవ సంప్రదాయాలు మరియు వీరత్వం.', startPercent: 25 },
            { title: 'కాఫీ తోటల చరిత్ర & ఆర్థిక వ్యవస్థ', text: '1854 నుండి విస్తరించిన కాఫీ మరియు సుగంధ ద్రవ్యాల తోటలు.', startPercent: 50 },
            { title: 'యునెస్కో పశ్చిమ కనుమల జీవవైవిధ్యం', text: 'బ్రహ్మగిరి అభయారణ్యం, అరుదైన వన్యప్రాణులు మరియు పర్యావరణ పరిరక్షణ.', startPercent: 75 }
          ]
        }
      },
      kn: {
        quick: {
          language: 'kn',
          languageNativeName: 'ಕನ್ನಡ',
          estimatedDuration: '75 sec',
          fullText: 'ಭಾರತದ ಸ್ಕಾಟ್‌ಲ್ಯಾಂಡ್ ಎಂದೇ ಖ್ಯಾತಿ ಪಡೆದಿರುವ ಕೊಡಗು ಜಿಲ್ಲೆಗೆ ಆತ್ಮೀಯ ಸುಸ್ವಾಗತ! ಪಶ್ಚಿಮ ಘಟ್ಟಗಳ ಮಡಿಲಲ್ಲಿರುವ ಈ ಸುಂದರ ತಾಣವು ಕಾಫಿ ತೋಟಗಳು, ಏಲಕ್ಕಿ ಸುವಾಸನೆ ಮತ್ತು ಮಂಜು ಮುಸುಕಿದ ಬೆಟ್ಟಗಳಿಗೆ ಜಗತ್ಪ್ರಸಿದ್ಧವಾಗಿದೆ. ಪವಿತ್ರ ಕಾವೇರಿ ನದಿಯ ಉಗಮ ಸ್ಥಾನ ತಲಕಾವೇರಿ, ಅಬ್ಬಿ ಜಲಪಾತ, ರಾಜಾಸೀಟ್ ಮತ್ತು ಬೈಲಕುಪ್ಪೆಯ ಸ್ವರ್ಣ ಬೌದ್ಧ ಮಂದಿರ ಇಲ್ಲಿನ ಪ್ರಮುಖ ಆಕರ್ಷಣೆಗಳು. ಕೊಡವ ನಾಡಿನ ವೀರ ಪರಂಪರೆ ಮತ್ತು ಅದ್ಭುತ ಆತಿಥ್ಯ ನಿಮ್ಮ ಪ್ರವಾಸವನ್ನು ಮರೆಯಲಾಗದಂತೆ ಮಾಡುತ್ತದೆ.',
          sections: [
            { title: 'ಕೊಡಗಿನ ಪರಿಚಯ', text: 'ಕಾಫಿ ತೋಟಗಳು ಮತ್ತು ಮಂಜಿನ ನಗರಿ ಕೊಡಗು.', startPercent: 0 },
            { title: 'ಪ್ರಮುಖ ತಾಣಗಳು', text: 'ತಲಕಾವೇರಿ, ಅಬ್ಬಿ ಫಾಲ್ಸ್, ರಾಜಾಸೀಟ್ ಮತ್ತು ಬೈಲಕುಪ್ಪೆ.', startPercent: 40 },
            { title: 'ಸಂಸ್ಕೃತಿ ಮತ್ತು ಪ್ರವಾಸ', text: 'ವಿಶಿಷ್ಟ ಕೊಡವ ಆತಿಥ್ಯ ಮತ್ತು ನಿಸರ್ಗ ಸೌಂದರ್ಯ.', startPercent: 75 }
          ]
        },
        standard: {
          language: 'kn',
          languageNativeName: 'ಕನ್ನಡ',
          estimatedDuration: '3.5 min',
          fullText: 'ನಮಸ್ಕಾರ! ಹಸಿರು ಗಿರಿಶಿಖರಗಳ ತವರೂರಾದ ಕೊಡಗು ನಾಡಿಗೆ ನಿಮಗೆ ಆದರದ ಸ್ವಾಗತ. ಭಾರತದ ಕಾಫಿ ತೊಟ್ಟಿಲು ಎಂದೇ ಕರೆಯಲ್ಪಡುವ ಈ ಸುಂದರ ಜಿಲ್ಲೆಯು ನೈಸರ್ಗಿಕ ಸೌಂದರ್ಯ ಮತ್ತು ಸಾಂಸ್ಕೃತಿಕ ಶ್ರೀಮಂತಿಕೆಗೆ ಹೆಸರುವಾಸಿಯಾಗಿದೆ.\n\nಕೊಡಗಿನ ಪ್ರವಾಸದಲ್ಲಿ ಅತ್ಯಂತ ಪವಿತ್ರ ತಾಣವೆಂದರೆ ಕಾವೇರಿ ಮಾತೆಯ ಉಗಮ ಸ್ಥಳವಾದ ತಲಕಾವೇರಿ. ಬ್ರಹ್ಮಗಿರಿ ಬೆಟ್ಟದ ತಪ್ಪಲಿನಲ್ಲಿರುವ ಈ ಪವಿತ್ರ ಕುಂಡಿಕೆಯಿಂದ ಹರಿಯುವ ಕಾವೇರಿಯು ಕರ್ನಾಟಕದ ಜೀವನಾಡಿಯಾಗಿದೆ. ಕಾವೇರಿ, ಕನ್ನಿಕೆ ಮತ್ತು ಸುಜ್ಯೋತಿ ನದಿಗಳು ಸಂಗಮಿಸುವ ತ್ರಿವೇಣಿ ಸಂಗಮ ಭಾಗಮಂಡಲದಲ್ಲಿದೆ.\n\nಮಡಿಕೇರಿಯ ಹೃದಯಭಾಗದಲ್ಲಿರುವ ರಾಜಾಸೀಟ್ ವೀಕ್ಷಣಾ ತಾಣವು ಸೂರ್ಯಾಸ್ತದ ರಮಣೀಯ ದೃಶ್ಯಕ್ಕೆ ಹೆಸರುವಾಸಿಯಾಗಿದೆ. ಕೊಡಗಿನ ರಾಜರು ಸಂಜೆಯ ವೇಳೆ ಇಲ್ಲಿ ಕುಳಿತು ನಿಸರ್ಗ ಸೌಂದರ್ಯವನ್ನು ಆಸ್ವಾದಿಸುತ್ತಿದ್ದರು. ಸಮೀಪದ ಅಬ್ಬಿ ಜಲಪಾತ ಮತ್ತು ಇರುಪ್ಪು ಜಲಪಾತಗಳು ಕಾಡಿನ ನಡುವೆ ಭೋರ್ಗರೆಯುತ್ತಾ ಧುಮ್ಮಿಕ್ಕುವ ದೃಶ್ಯ ಮನಸ್ಸಿಗೆ ಮುದ ನೀಡುತ್ತದೆ.\n\nಇನ್ನು ಬೈಲಕುಪ್ಪೆಯಲ್ಲಿರುವ ನಾಮ್‌ಡ್ರೋಲಿಂಗ್ ಬೌದ್ಧ ಮಂದಿರವು 40 ಅಡಿ ಎತ್ತರದ ಭವ್ಯ ಚಿನ್ನದ ಲೇಪನದ ಬುದ್ಧನ ಮೂರ್ತಿಗಳೊಂದಿಗೆ ಟಿಬೆಟಿಯನ್ ಕಲೆಯನ್ನು ಕಣ್ಮುಂದೆ ತರುತ್ತದೆ. ಸ್ಥಳೀಯ ಕಡಂಬಟ್ಟು, ಪಾಂಡಿಕರಿ ಅಥವಾ ಮಶ್ರೂಮ್ ಕರಿ ಮತ್ತು ತಾಜಾ ಫಿಲ್ಟರ್ ಕಾಫಿಯ ರುಚಿಯನ್ನು ಸವಿಯಲು ಮರೆಯದಿರಿ.',
          sections: [
            { title: 'ಪವಿತ್ರ ತಲಕಾವೇರಿ ಮತ್ತು ಭಾಗಮಂಡಲ', text: 'ಕಾವೇರಿ ನದಿಯ ಉಗಮ ಸ್ಥಾನ ಮತ್ತು ತ್ರಿವೇಣಿ ಸಂಗಮ.', startPercent: 0 },
            { title: 'ಜಲಪಾತಗಳು ಮತ್ತು ರಾಜಾಸೀಟ್', text: 'ಅಬ್ಬಿ ಫಾಲ್ಸ್ ಮತ್ತು ರಾಜಾಸೀಟ್ ಸೂರ್ಯಾಸ್ತ ವಿಸ್ಮಯ.', startPercent: 30 },
            { title: 'ಬೈಲಕುಪ್ಪೆ ಸ್ವರ್ಣ ಮಂದಿರ', text: 'ಏಷ್ಯಾದ ಪ್ರಸಿದ್ಧ ಟಿಬೆಟಿಯನ್ ಬೌದ್ಧ ವಿಹಾರ.', startPercent: 60 },
            { title: 'ಕೊಡವ ಊಟೋಪಚಾರ ಮತ್ತು ನಿಯಮಗಳು', text: 'ಸ್ಥಳೀಯ ಆಹಾರ ಪದ್ಧತಿ ಮತ್ತು ಪರಿಸರ ಸ್ನೇಹಿ ಪ್ರವಾಸ.', startPercent: 85 }
          ]
        },
        deep_history: {
          language: 'kn',
          languageNativeName: 'ಕನ್ನಡ',
          estimatedDuration: '5.5 min',
          fullText: 'ಕೊಡಗಿನ ಸಮಗ್ರ ಐತಿಹಾಸಿಕ ಮತ್ತು ಭೌಗೋಳಿಕ ಪರಂಪರೆಗೆ ಸ್ವಾಗತ. ಪಶ್ಚಿಮ ಘಟ್ಟಗಳ ಸಾಲಿನಲ್ಲಿರುವ ಕೊಡಗು ಪ್ರಾಚೀನ ಕಾಲದಿಂದಲೂ ಸ್ವತಂತ್ರ ಅಸ್ತಿತ್ವವನ್ನು ಕಾಪಾಡಿಕೊಂಡು ಬಂದ ಭೂಮಿಯಾಗಿದೆ. 1600 ರಿಂದ 1834 ರವರೆಗೆ ಆಳಿದ ಹಾಲೆರಿ ರಾಜವಂಶವು ಮಡಿಕೇರಿಯನ್ನು ರಾಜಧಾನಿಯನ್ನಾಗಿ ಮಾಡಿಕೊಂಡಿತು.\n\nಮುದ್ದುರಾಜ ನಿರ್ಮಿಸಿದ ಮಡಿಕೇರಿ ಕೋಟೆಯು ನಂತರ ಟಿಪ್ಪು ಸುಲ್ತಾನನಿಂದ ಕಲ್ಲಿನ ಕೋಟೆಯಾಗಿ ಮಾರ್ಪಟ್ಟು, ನಂತರ ಬ್ರಿಟಿಷರ ಆಡಳಿತ ಕೇಂದ್ರವಾಯಿತು. ಭಾರತದಲ್ಲಿ ಬಂದೂಕು ಪರವಾನಗಿ ಇಲ್ಲದೆ ಶಸ್ತ್ರಾಸ್ತ್ರ ಹೊಂದುವ ವಿಶಿಷ್ಟ ಹಕ್ಕನ್ನು ಹೊಂದಿರುವ ಏಕೈಕ ಸಮುದಾಯ ಕೊಡವರು. ಇವರ ಕೈಲ್ಮುಹೂರ್ತ ಮತ್ತು ಹುತ್ತರಿ ಹಬ್ಬಗಳು ಪ್ರಕೃತಿ ಮತ್ತು ಶಸ್ತ್ರಾಸ್ತ್ರಗಳ ಪೂಜೆಗೆ ಸಾಕ್ಷಿಯಾಗಿವೆ.\n\n1850 ರ ದಶಕದಲ್ಲಿ ಬ್ರಿಟಿಷರು ಪ್ರಾರಂಭಿಸಿದ ಕಾಫಿ ಕೃಷಿಯು ಇಂದು ಜಿಲ್ಲೆಯ ಆರ್ಥಿಕತೆಯ ಬೆನ್ನೆಲುಬಾಗಿದೆ. ಯುನೆಸ್ಕೋ ಪಶ್ಚಿಮ ಘಟ್ಟಗಳ ಪಟ್ಟಿಯಲ್ಲಿರುವ ಕೊಡಗಿನ ಅರಣ್ಯಗಳು ಸಿಂಹಬಾಲದ ಕೋತಿ, ಕಾಡಾನೆಗಳು ಮತ್ತು ಗ್ರೇಟ್ ಇಂಡಿಯನ್ ಹಾರ್ನ್‌ಬಿಲ್ ಪಕ್ಷಿಗಳಿಗೆ ಸುರಕ್ಷಿತ ತಾಣವಾಗಿವೆ. ಈ ಸುಂದರ ಪರಿಸರವನ್ನು ಉಳಿಸಿ ಬೆಳೆಸುವುದು ನಮ್ಮೆಲ್ಲರ ಜವಾಬ್ದಾರಿಯಾಗಿದೆ.',
          sections: [
            { title: 'ಹಾಲೆರಿ ಅರಸರು ಮತ್ತು ಕೋಟೆಯ ಇತಿಹಾಸ', text: 'ಮಡಿಕೇರಿ ಕೋಟೆ ಮತ್ತು ಹಾಲೆರಿ ರಾಜವಂಶದ ಆಡಳಿತ.', startPercent: 0 },
            { title: 'ಕೊಡವ ಸಮರ ಕಲೆ ಮತ್ತು ಹಬ್ಬಗಳು', text: 'ಕೈಲ್ಮುಹೂರ್ತ, ಹುತ್ತರಿ ಮತ್ತು ಶಸ್ತ್ರಾಸ್ತ್ರಗಳ ಪೂಜಾ ಪರಂಪರೆ.', startPercent: 25 },
            { title: 'ಕಾಫಿ ಕೃಷಿಯ ಉಗಮ', text: '1850 ರಿಂದ ಇಂದಿನವರೆಗಿನ ಕಾಫಿ ತೋಟಗಳ ಇತಿಹಾಸ.', startPercent: 50 },
            { title: 'ಯುನೆಸ್ಕೋ ಜೀವವೈವಿಧ್ಯ ಸಂರಕ್ಷಣೆ', text: 'ಪಶ್ಚಿಮ ಘಟ್ಟಗಳ ವನ್ಯಜೀವಿ ಸಂಪತ್ತು ಮತ್ತು ಪರಿಸರ ಜಾಗೃತಿ.', startPercent: 75 }
          ]
        }
      },
      hi: {
        quick: {
          language: 'hi',
          languageNativeName: 'हिन्दी',
          estimatedDuration: '75 sec',
          fullText: 'भारत के स्कॉटलैंड कहे जाने वाले सुरम्य कोडागु (कूर्ग) में आपका स्वागत है! पश्चिमी घाट की हरी-भरी वादियों में बसा यह जिला अपनी खुशबूदार कॉफी, मसालों और धुंध भरी पहाड़ियों के लिए प्रसिद्ध है। पवित्र कावेरी नदी का उद्गम स्थल तलकावेरी, एब्बे फॉल्स, राजा की सीट और बैलकुप्पे का स्वर्ण मंदिर यहाँ के प्रमुख आकर्षण हैं। वीर कोडवा संस्कृति का यह अनुभव अविस्मरणीय है।',
          sections: [
            { title: 'कूर्ग परिचय', text: 'भारत की कॉफी राजधानी और हरी-भरी वादियां।', startPercent: 0 },
            { title: 'प्रमुख आकर्षण', text: 'तलकावेरी, एब्बे फॉल्स, राजा की सीट और बौद्ध मंदिर।', startPercent: 40 },
            { title: 'कोडवा संस्कृति', text: 'अनोखी मार्शल परंपराएं और स्थानीय आतिथ्य।', startPercent: 75 }
          ]
        },
        standard: {
          language: 'hi',
          languageNativeName: 'हिन्दी',
          estimatedDuration: '3.5 min',
          fullText: 'नमस्ते! पश्चिमी घाट की हरी-भरी वादियों में बसे कोडागु (कूर्ग) में आपका स्वागत है। भारत में सबसे अधिक कॉफी उत्पादन करने वाला यह खूबसूरत पर्वतीय स्थल अपनी प्राकृतिक सुंदरता के कारण "भारत का स्कॉटलैंड" कहलाता है।\n\nयहाँ का सबसे पवित्र स्थल तलकावेरी है, जहाँ ब्रह्मगिरि पर्वत की गोद से पवित्र कावेरी नदी निकलती है। पास ही भागमंडला में कावेरी, कन्निका और सुज्योति नदियों का त्रिवेणी संगम स्थित है।\n\nप्रकृति प्रेमियों के लिए एब्बे फॉल्स और इरुप्पु फॉल्स घने जंगलों में दूधिया जलप्रपात का अद्भुत दृश्य प्रस्तुत करते हैं। मडिकेरी में स्थित "राजा की सीट" सूर्यास्त देखने का मनमोहक मंडप है, जहाँ कोडागु के राजा शाम की सैर का आनंद लेते थे।\n\nबैलकुप्पे का नामद्रोलिंग बौद्ध मठ भारत का दूसरा सबसे बड़ा तिब्बती ठिकाना है, जहाँ 40 फीट ऊंची तीन स्वर्णिम बुद्ध प्रतिमाएं मन को असीम शांति प्रदान करती हैं। कोडवा व्यंजनों और ताजा कूर्ग कॉफी का आनंद अवश्य लें।',
          sections: [
            { title: 'तलकावेरी और कावेरी उद्गम', text: 'पवित्र कावेरी नदी का उद्गम और त्रिवेणी संगम।', startPercent: 0 },
            { title: 'जलप्रपात और राजा की सीट', text: 'एब्बे फॉल्स और घाटी के सूर्यास्त दृश्य।', startPercent: 30 },
            { title: 'स्वर्ण बौद्ध मंदिर', text: 'बैलकुप्पे का विख्यात तिब्बती मठ।', startPercent: 60 },
            { title: 'संस्कृति और दिशानिर्देश', text: 'कोडवा आतिथ्य और पर्यावरण संरक्षण।', startPercent: 85 }
          ]
        },
        deep_history: {
          language: 'hi',
          languageNativeName: 'हिन्दी',
          estimatedDuration: '5.5 min',
          fullText: 'कोडागु के समृद्ध इतिहास और जैव विविधता में आपका स्वागत है। 1600 से 1834 तक यहाँ हालेरी राजवंश का शासन रहा। राजा मुद्दूराजा ने 1681 में मडिकेरी को राजधानी बनाकर मिट्टी के किले का निर्माण कराया, जिसे बाद में टीपू सुल्तान और अंग्रेजों ने मजबूत पत्थरों से पुनर्निर्मित किया।\n\nकोडवा समुदाय भारत का एकमात्र ऐसा समुदाय है जिसे शस्त्र कानून से छूट प्राप्त है। इनके उत्सव जैसे कैलमुहूर्त और हुत्तारी हथियारों और प्रकृति पूजा के प्रतीक हैं। 1850 के दशक में अंग्रेजों ने यहाँ कॉफी बागानों की शुरुआत की। आज कूर्ग यूनेस्को विश्व धरोहर पश्चिमी घाट का एक महत्वपूर्ण हिस्सा है।',
          sections: [
            { title: 'हालेरी वंश और मडिकेरी किला', text: '17वीं सदी का इतिहास और किले का निर्माण।', startPercent: 0 },
            { title: 'कोडवा योद्धा परंपराएं', text: 'पारंपरिक शस्त्र अधिकार और सांस्कृतिक उत्सव।', startPercent: 30 },
            { title: 'कॉफी बागान और अर्थव्यवस्था', text: '1850 से कॉफी उत्पादन का इतिहास।', startPercent: 60 },
            { title: 'यूनेस्को जैव विविधता', text: 'पश्चिमी घाट के दुर्लभ वन्यजीवों का संरक्षण।', startPercent: 85 }
          ]
        }
      },
      ta: {
        quick: {
          language: 'ta',
          languageNativeName: 'தமிழ்',
          estimatedDuration: '75 sec',
          fullText: 'இந்தியாவின் ஸ்காட்லாந்து என்று அழைக்கப்படும் குடகு (கூர்க்) பகுதிக்கு நல்வரவு! மேற்குத் தொடர்ச்சி மலையின் காபி தோட்டங்கள், புனித காவிரி உற்பத்தியாகும் தலக்காவிரி, அப்பே நீர்வீழ்ச்சி மற்றும் ராஜா இருக்கை ஆகியவை இங்குள்ள முக்கிய இடங்களாகும்.',
          sections: [
            { title: 'கூர்க் அறிமுகம்', text: 'காபி தோட்டங்கள் நிறைந்த பசுமை பூமி கூர்க்.', startPercent: 0 },
            { title: 'முக்கிய இடங்கள்', text: 'தலக்காவிரி மற்றும் அப்பே நீர்வீழ்ச்சி.', startPercent: 50 }
          ]
        },
        standard: {
          language: 'ta',
          languageNativeName: 'தமிழ்',
          estimatedDuration: '3.5 min',
          fullText: 'வணக்கம்! மேற்குத் தொடர்ச்சி மலையில் அமைந்துள்ள குடகு பகுதிக்கு உங்களை அன்புடன் வரவேற்கிறோம். புனித காவிரி நதி தோன்றும் தலக்காவிரி, இயற்கை எழில் கொஞ்சும் அப்பே நீர்வீழ்ச்சி மற்றும் மடிக்கேரி கோட்டை இங்கு புகழ்பெற்றவை.',
          sections: [
            { title: 'தலக்காவிரி சிறப்பு', text: 'காவிரி உற்பத்தியாகும் புண்ணிய பூமி.', startPercent: 0 },
            { title: 'சுற்றுலா தலங்கள்', text: 'அப்பே அருவி மற்றும் ராஜா சீட்.', startPercent: 50 }
          ]
        },
        deep_history: {
          language: 'ta',
          languageNativeName: 'தமிழ்',
          estimatedDuration: '5.5 min',
          fullText: 'குடகின் வரலாற்று சுவடுகளுக்கு நல்வரவு. 1600 முதல் 1834 வரை ஆண்ட ஹாலேரி மன்னர்கள் மடிக்கேரி கோட்டையைக் கட்டினர். கொடவா மக்களின் வீர பாரம்பரியமும் காபி தோட்டங்களும் இப்பகுதியின் அடையாளங்களாகும்.',
          sections: [
            { title: 'வரலாற்று பின்னணி', text: 'ஹாலேரி மன்னர்களின் ஆட்சி மற்றும் கலாச்சாரம்.', startPercent: 0 }
          ]
        }
      },
      ml: {
        quick: {
          language: 'ml',
          languageNativeName: 'മലയാളം',
          estimatedDuration: '75 sec',
          fullText: 'ഇന്ത്യയുടെ സ്കോട്ട്ലൻഡ് എന്നറിയപ്പെടുന്ന കൂർഗിലേക്ക് (കുടക്) സ്വാഗതം! പശ്ചിമഘട്ടത്തിന്റെ മടിത്തട്ടിലുള്ള കാപ്പിത്തോട്ടങ്ങളും കാവേരി നദിയുടെ ഉത്ഭവസ്ഥാനമായ തലക്കാവേരിയും ഇവിടുത്തെ പ്രധാന ആകർഷണങ്ങളാണ്.',
          sections: [
            { title: 'കൂർഗ് ആമുഖം', text: 'കാപ്പിത്തോട്ടങ്ങളും കോടമഞ്ഞും നിറഞ്ഞ കുടക്.', startPercent: 0 }
          ]
        },
        standard: {
          language: 'ml',
          languageNativeName: 'മലയാളം',
          estimatedDuration: '3.5 min',
          fullText: 'നമസ്കാരം! പശ്ചിമഘട്ടത്തിലെ പ്രകൃതിരമണീയമായ കുടകിലേക്ക് സ്വാഗതം. കാവേരി നദി ഉത്ഭവിക്കുന്ന തലക്കാവേരി, അബ്ബേ വെള്ളച്ചാട്ടം, രാജാസ് സീറ്റ്, ബൈലക്കുപ്പെ ടിബറ്റൻ സുവർണ്ണ ക്ഷേത്രം എന്നിവ കണ്ടറിയേണ്ട കാഴ്ചകളാണ്.',
          sections: [
            { title: 'തലക്കാവേരിയും കാഴ്ചകളും', text: 'കാവേരിയുടെ ഉത്ഭവവും പ്രധാന ആകർഷണങ്ങളും.', startPercent: 0 }
          ]
        },
        deep_history: {
          language: 'ml',
          languageNativeName: 'മലയാളം',
          estimatedDuration: '5.5 min',
          fullText: 'കുടകിന്റെ ചരിത്രത്തിലേക്ക് സ്വാഗതം. പതിനേഴാം നൂറ്റാണ്ടിലെ ഹാലേരി രാജാക്കന്മാരുടെ മടിക്കേരി കോട്ടയും കൊടവ ജനതയുടെ വീര പാരമ്പര്യവും കാപ്പിത്തോട്ടങ്ങളുടെ ചരിത്രവും ഇവിടെ ഒത്തുചേരുന്നു.',
          sections: [
            { title: 'ചരിത്ര പശ്ചാത്തലം', text: 'ഹാലേരി രാജവംശവും കൊടവ സംസ്കാരവും.', startPercent: 0 }
          ]
        }
      },
      en: {
        quick: {
          language: 'en',
          languageNativeName: 'English',
          estimatedDuration: '75 sec',
          fullText: 'Welcome to Kodagu (Coorg), celebrated as the "Scotland of India" nestled in the lush Western Ghats. Famed for emerald coffee estates, aromatic pepper vines, and rolling misty hills, Coorg is where the sacred River Kaveri is born at Talakaveri. Marvel at the roaring cascades of Abbey and Iruppu Falls, gaze at fiery valley sunsets from Raja’s Seat, and experience spiritual tranquility at the Golden Temple in Bylakuppe. The warm hospitality and martial heritage of the proud Kodava people make this journey truly unforgettable.',
          sections: [
            { title: 'The Coffee Heartland', text: 'Nestled in the Western Ghats, Coorg is India’s premier coffee paradise.', startPercent: 0 },
            { title: 'Landmarks & Waterfalls', text: 'Talakaveri, Abbey Falls, Raja’s Seat, and Bylakuppe Golden Temple.', startPercent: 40 },
            { title: 'Kodava Warmth & Flavors', text: 'Authentic homestay hospitality and world-famous estate coffees.', startPercent: 75 }
          ]
        },
        standard: {
          language: 'en',
          languageNativeName: 'English',
          estimatedDuration: '3.5 min',
          fullText: 'Namaskara! Step into Kodagu, the emerald crown of the Western Ghats. Producing over 40% of India’s coffee, this tranquil hill district balances breathtaking biodiversity with an unbroken martial heritage.\n\nYour journey begins at Talakaveri, the sacred cradle of River Kaveri atop the Brahmagiri Hills at 1,276 meters. Revered as the mother river of southern India, Kaveri flows from a perennial freshwater spring, cascading down to Bhagamandala where it merges with the Kannike and the mythical Sujyothi rivers at the holy Triveni Sangama.\n\nNature lovers will delight in Abbey Falls and Iruppu Falls, where crystalline mountain torrents crash over jagged granite boulders into deep rainforest gorges. As evening approaches, head to Raja’s Seat in Madikeri. Here, perched atop high ramparts, the Rajas of Kodagu once watched the sun dip into undulating valleys wrapped in lilac fog.\n\nDown in the plains of Bylakuppe stands the Namdroling Monastery, India’s second largest Tibetan settlement, housing three magnificent 40-foot golden Buddha statues. Savor authentic Kodava delicacies like kadamputtu, wild bamboo shoot stew, and freshly roasted estate filter coffee while practicing responsible ecotourism in this fragile biosphere.',
          sections: [
            { title: 'Sacred Talakaveri & River Origins', text: 'The holy source of River Kaveri and Triveni Sangama at Bhagamandala.', startPercent: 0 },
            { title: 'Abbey Falls & Raja’s Seat Sunset', text: 'Roaring waterfalls and panoramic twilight over amphitheater valleys.', startPercent: 30 },
            { title: 'Bylakuppe Golden Temple', text: 'Majestic 40-foot golden Tibetan statues and peaceful monasteries.', startPercent: 60 },
            { title: 'Kodava Gastronomy & Conservation', text: 'Local delicacies, estate coffees, and responsible eco-travel.', startPercent: 85 }
          ]
        },
        deep_history: {
          language: 'en',
          languageNativeName: 'English',
          estimatedDuration: '5.5 min',
          fullText: 'Welcome to this comprehensive historical exploration of Kodagu. Sheltered by impenetrable rainforest valleys, Kodagu remained an independent sovereign kingdom for centuries. First mentioned in 9th-century Ganga and Chola epigraphs, the region consolidated under the Haleri dynasty from 1600 to 1834.\n\nKing Mudduraja founded Madikeri (Muddu-raja-keri) in 1681, erecting a strategic mud fort that Tipu Sultan later reinforced with granite. Following British annexation in 1834, the fort was remodeled with a Victorian clock tower and Anglican church. The martial Kodavas are historically unique: under an imperial decree preserved in modern Indian law, Kodavas are exempted from the Indian Arms Act, carrying ancestral firearms and odikathi swords as sacred symbols of honor and protection.\n\nIn 1854, British botanists and planters introduced Arabica and Robusta coffee seedlings to these shaded mountain slopes, transforming Coorg into an international coffee powerhouse. Inscribed on the UNESCO World Heritage list, the forests of Brahmagiri and Pushpagiri harbor endangered lion-tailed macaques, Asian elephants, and over 300 bird species. Preserving this ecological treasure ensures that the cradle of Kaveri endures for generations to come.',
          sections: [
            { title: 'Haleri Kings & Madikeri Fort', text: 'The 17th-century sovereign kingdom and fort construction.', startPercent: 0 },
            { title: 'The Martial Kodava Heritage', text: 'Unique ancestral firearms rights and sacred warrior traditions.', startPercent: 25 },
            { title: 'Rise of the Coffee Economy', text: '19th-century plantation history and global Arabica trade.', startPercent: 50 },
            { title: 'UNESCO Western Ghats Biosphere', text: 'Protected wildlife sanctuaries and sustainable conservation.', startPercent: 75 }
          ]
        }
      }
    }
  }
};

import { NATURE_VOICE_DETAILS } from './narrationsNature';
import { NATURE_VOICE_DETAILS_PART2 } from './narrationsNatureGroup2';
import { NATURE_VOICE_DETAILS_PART3 } from './narrationsNatureGroup3';
import { NATURE_VOICE_DETAILS_PART4 } from './narrationsNatureGroup4';
import { NATURE_VOICE_DETAILS_PART5 } from './narrationsNatureGroup5';
import { NATURE_VOICE_DETAILS_PART6 } from './narrationsNatureGroup6';
import { NATURE_VOICE_DETAILS_PART7 } from './narrationsNatureGroup7';
import { HERITAGE_VOICE_DETAILS_PART1 } from './narrationsHeritageGroup1';
import { HERITAGE_VOICE_DETAILS_PART2 } from './narrationsHeritageGroup2';
import { HERITAGE_VOICE_DETAILS_PART3 } from './narrationsHeritageGroup3';
import { HERITAGE_VOICE_DETAILS_PART4 } from './narrationsHeritageGroup4';
import { HERITAGE_VOICE_DETAILS_PART5 } from './narrationsHeritageGroup5';

Object.assign(
  DESTINATION_VOICE_DETAILS,
  NATURE_VOICE_DETAILS,
  NATURE_VOICE_DETAILS_PART2,
  NATURE_VOICE_DETAILS_PART3,
  NATURE_VOICE_DETAILS_PART4,
  NATURE_VOICE_DETAILS_PART5,
  NATURE_VOICE_DETAILS_PART6,
  NATURE_VOICE_DETAILS_PART7,
  HERITAGE_VOICE_DETAILS_PART1,
  HERITAGE_VOICE_DETAILS_PART2,
  HERITAGE_VOICE_DETAILS_PART3,
  HERITAGE_VOICE_DETAILS_PART4,
  HERITAGE_VOICE_DETAILS_PART5
);

// Match potential ID variations
DESTINATION_VOICE_DETAILS['jog_falls'] = DESTINATION_VOICE_DETAILS['jogfalls'];
DESTINATION_VOICE_DETAILS['belur_halebidu'] = DESTINATION_VOICE_DETAILS['belur_halebeedu'];
DESTINATION_VOICE_DETAILS['pattadakal'] = DESTINATION_VOICE_DETAILS['pattadakal_aihole'];
DESTINATION_VOICE_DETAILS['aihole'] = DESTINATION_VOICE_DETAILS['pattadakal_aihole'];

