import type { 
  VoiceGuideLanguage, 
  SupportedLanguageInfo, 
  DestinationVoiceGuideData,
  NarrationScript,
  HistoricalMilestone,
  ArchitectureHighlight,
  HistoricalSourceReference
} from '../types';
import { DESTINATIONS } from './destinations';
import { DESTINATION_VOICE_DETAILS } from './destinationVoiceNarrations';

export const SUPPORTED_VOICE_LANGUAGES: SupportedLanguageInfo[] = [
  {
    code: 'en',
    nativeName: 'English',
    englishLabel: 'English',
    speechTag: 'en-IN',
    secondarySpeechTag: 'en-US',
    sampleGreeting: 'Namaskara! Welcome to Karnataka Yatra Voice Guide.'
  },
  {
    code: 'kn',
    nativeName: 'ಕನ್ನಡ',
    englishLabel: 'Kannada',
    speechTag: 'kn-IN',
    sampleGreeting: 'ನಮಸ್ಕಾರ! ಕರ್ನಾಟಕ ಯಾತ್ರಾ ಧ್ವನಿ ಮಾರ್ಗದರ್ಶಿಗೆ ಸುಸ್ವಾಗತ.'
  },
  {
    code: 'te',
    nativeName: 'తెలుగు',
    englishLabel: 'Telugu',
    speechTag: 'te-IN',
    sampleGreeting: 'నమస్కారం! కర్ణాటక యాత్రా వాయిస్ గైడ్‌కు స్వాగతం.'
  },
  {
    code: 'hi',
    nativeName: 'हिन्दी',
    englishLabel: 'Hindi',
    speechTag: 'hi-IN',
    sampleGreeting: 'नमस्ते! कर्नाटक यात्रा वॉयस गाइड में आपका स्वागत है.'
  },
  {
    code: 'ta',
    nativeName: 'தமிழ்',
    englishLabel: 'Tamil',
    speechTag: 'ta-IN',
    sampleGreeting: 'வணக்கம்! கர்நாடக யாத்ரா வாய்ஸ் கைடிற்கு நல்வரவு.'
  },
  {
    code: 'ml',
    nativeName: 'മലയാളം',
    englishLabel: 'Malayalam',
    speechTag: 'ml-IN',
    sampleGreeting: 'നമസ്കാരം! കർണാടക യാത്ര വോയ്സ് ഗൈഡിലേക്ക് സ്വാഗതം.'
  }
];

export const DESTINATION_VOICE_GUIDE_DATA: Record<string, DestinationVoiceGuideData> = {
  hampi: {
    destinationId: 'hampi',
    historicalTimeline: [
      {
        yearOrEra: '3rd Century BCE',
        event: 'Ashokan Rock Edicts at Nittur & Udegolam',
        rulerOrDynasty: 'Mauryan Empire (Emperor Ashoka)',
        details: 'Minor rock edicts of Emperor Ashoka establish that the Tungabhadra valley was part of the southern Mauryan province of Isila.',
        isDocumentedHistory: true
      },
      {
        yearOrEra: '1336 CE',
        event: 'Foundation of Vijayanagara Empire',
        rulerOrDynasty: 'Sangama Dynasty (Harihara I & Bukka Raya I)',
        details: 'Founded under the spiritual guidance of Sage Vidyaranya of the Sringeri Sharada Peetham to protect South Indian heritage.',
        isDocumentedHistory: true
      },
      {
        yearOrEra: '1509 – 1529 CE',
        event: 'Golden Age of Krishna Deva Raya',
        rulerOrDynasty: 'Tuluva Dynasty (Emperor Sri Krishna Deva Raya)',
        details: 'Construction of the iconic Stone Chariot, the massive outer gopuram of Virupaksha Temple, and the Krishna Temple complex celebrating Udayagiri victory.',
        isDocumentedHistory: true
      },
      {
        yearOrEra: '1565 CE',
        event: 'Battle of Talikota (Rakkasatangadi)',
        rulerOrDynasty: 'Deccan Sultanates Alliance vs Vijayanagara',
        details: 'The combined armies of the Bijapur, Golconda, Ahmednagar, and Bidar sultanates defeated the Vijayanagara forces; the capital was systematically ransacked over six months.',
        isDocumentedHistory: true
      },
      {
        yearOrEra: '1986 CE',
        event: 'Inscribed as UNESCO World Heritage Site',
        rulerOrDynasty: 'Republic of India / UNESCO',
        details: 'Recognized for over 1,600 surviving monuments across 41.8 square kilometers along the Tungabhadra riverbanks.',
        isDocumentedHistory: true
      }
    ],
    architectureHighlights: [
      {
        feature: 'Vijayanagara Dravidian Temple Architecture',
        description: 'Monumental stepped gopurams, sprawling open pillared mandapas (kalyana mandapas), and monolithic relief bas-reliefs on granite.',
        periodOrStyle: '14th–16th Century Vijayanagara Dravidian'
      },
      {
        feature: 'Musical Pillars of Vittala Temple',
        description: '56 monolithic resonant granite shafts that produce acoustic tones of Indian classical musical instruments when gently struck.',
        periodOrStyle: '16th Century Tuluva Period'
      },
      {
        feature: 'Monolithic Stone Chariot (Garuda Shrine)',
        description: 'One of three famous stone chariots in India, built on revolving stone wheels and intricately carved granite blocks.',
        periodOrStyle: '1513 CE (Reign of Krishna Deva Raya)'
      },
      {
        feature: 'Indo-Islamic Royal Enclosure (Lotus Mahal & Elephant Stables)',
        description: 'Multi-lobed cusped arches, vaulted domes, and stucco plasterwork reflecting respectful synthesis between Hindu and Islamic courtly architecture.',
        periodOrStyle: '15th–16th Century Indo-Islamic'
      }
    ],
    documentedHistoryFacts: [
      'In the early 16th century, Portuguese travelers Domingos Paes and Fernão Nunes recorded that Hampi was as large as Rome and the richest city in the world.',
      'Precious gemstones, rubies, and pearls were weighed and sold openly on the street bazaar paving stones of Pan Supari and Vittala Bazaar.',
      'Over 1,600 surviving monuments are protected across a 4,187-hectare archaeological park administered jointly by ASI and HWHAMA.'
    ],
    folkloreAndLegends: [
      'According to the Ramayana, Hampi was Kishkindha, the monkey kingdom of Vali and Sugriva. Anjanadri Hill across the river is venerated as the birthplace of Lord Hanuman.',
      'The sacred boulder-strewn landscape is said to be stones hurled by monkey warrior troops practicing for the march to Lanka.',
      'Virupaksha Temple’s inverted pinhole shadow of the main gopuram inside an inner dark chamber was used by ancient temple architects as a camera obscura.'
    ],
    sourcesAndReferences: [
      {
        title: 'Hampi: Monumental Legacy',
        authority: 'Archaeological Survey of India (ASI)',
        description: 'Official archaeological monograph detailing excavations, epigraphs, and architectural conservation.',
        url: 'https://asi.nic.in'
      },
      {
        title: 'Group of Monuments at Hampi (Ref 241)',
        authority: 'UNESCO World Heritage Centre',
        description: 'Universal Outstanding Value evaluation of Vijayanagara architecture and riverfront cultural landscape.',
        url: 'https://whc.unesco.org/en/list/241'
      },
      {
        title: 'A Forgotten Empire (Vijayanagar)',
        authority: 'Robert Sewell (Historian, Madras Civil Service)',
        description: 'English translation of chronicles of Portuguese chroniclers Domingos Paes and Fernão Nunes (1900).'
      }
    ],
    narrations: {
      en: {
        quick: {
          language: 'en',
          languageNativeName: 'English',
          estimatedDuration: '75 sec',
          fullText: 'Welcome to Hampi, the legendary capital of the 14th-century Vijayanagara Empire on the banks of the Tungabhadra River. In its golden era under Emperor Krishna Deva Raya, travelers from across the globe described this as the richest city in the world, where diamonds and pearls were sold in open street markets. Marvel at the iconic Stone Chariot and the musical pillars of the Vittala Temple, climb the sacred steps of Virupaksha Temple, and watch twilight bathe the monolithic boulder hills. Hampi is not just an open-air museum—it is the living soul of Karnataka’s heritage.',
          sections: [
            { title: 'The Golden Empire', text: 'Welcome to Hampi, capital of the mighty Vijayanagara Empire on the Tungabhadra River.', startPercent: 0 },
            { title: 'Gem Markets & Glory', text: 'Under Krishna Deva Raya, diamond and ruby bazaars spanned miles of paved stone colonnades.', startPercent: 35 },
            { title: 'Stone Chariot & Beyond', text: 'Admire the monolithic Stone Chariot, acoustic musical pillars, and sunset over boulder mountains.', startPercent: 70 }
          ]
        },
        standard: {
          language: 'en',
          languageNativeName: 'English',
          estimatedDuration: '3.5 min',
          fullText: 'Namaskara! Step into Hampi, where stone speaks and history breathes. Founded in 1336 by the Sangama brothers Harihara and Bukka Raya under the guidance of Sage Vidyaranya, Hampi grew into one of the largest metropolitan capitals of the medieval world. Spread over 41 square kilometers, this UNESCO World Heritage Site showcases the pinnacle of Vijayanagara architecture.\n\nAt the Vittala Temple complex, behold the world-famous Stone Chariot, a shrine dedicated to Garuda. Notice its miniature granite wheels and exquisite carvings. Inside the Ranga Mandapa stand 56 monolithic musical pillars, sculpted so precisely that tapping them produces distinct swaras of classical instruments.\n\nAcross the sacred landscape rises the 160-foot gopuram of Virupaksha Temple, an active sanctuary where worship has continued unbroken since the 7th century. Notice the unique pinhole optical effect in the temple chamber that projects an inverted shadow of the towering gopuram onto the wall.\n\nWhile folklore reveres this boulder country as Kishkindha from the Ramayana, documented inscriptions and Portuguese chronicles confirm Hampi as a center of immense wealth, international diplomacy, and religious tolerance. Please treat these fragile stone monuments with respect: walk barefoot on temple plinths, stay on marked trails, and immerse yourself in Karnataka’s greatest archaeological marvel.',
          sections: [
            { title: 'Origins & Royal Glory', text: 'Founded in 1336 by Harihara and Bukka Raya, Hampi blossomed into one of the wealthiest capitals of the medieval world.', startPercent: 0 },
            { title: 'Vittala Temple & Musical Pillars', text: 'The iconic Stone Chariot and 56 acoustic musical pillars represent the zenith of granite stone carving.', startPercent: 25 },
            { title: 'Virupaksha & Living Heritage', text: 'Virupaksha Temple has seen continuous daily worship since the 7th century, featuring an ancient optical pinhole effect.', startPercent: 50 },
            { title: 'History vs Legend & Responsible Tourism', text: 'While revered as Kishkindha in mythology, chronicles confirm its historical greatness. Please respect fragile stone monuments.', startPercent: 75 }
          ]
        },
        deep_history: {
          language: 'en',
          languageNativeName: 'English',
          estimatedDuration: '6 min',
          fullText: 'Welcome to this deep historical exploration of Hampi, officially known as the Group of Monuments at Hampi. Long before the Vijayanagara kings, this strategic river ford was inhabited since the Neolithic age. Ashokan edicts in nearby Nittur prove it was a southern outpost of the Mauryan Empire over 2,200 years ago.\n\nThe dramatic turning point came in 1336 CE. Harihara I and Bukka Raya I, inspired by Sage Vidyaranya of the Sringeri Sharada Peetham, established Vijayanagara to unify the Deccan against northern military incursions. Over the next two centuries, four great dynasties—Sangama, Saluva, Tuluva, and Aravidu—ruled from here.\n\nThe zenith arrived during Emperor Sri Krishna Deva Raya’s reign from 1509 to 1529. Portuguese envoys Domingos Paes and Duarte Barbosa marveled at the city, recording that its markets overflowed with diamonds from Golconda, silk from China, and horses from Arabia. Architectural patronage flourished: the Vittala Temple was expanded with its monolithic Stone Chariot and resonant musical pillars, and the magnificent 50-meter gopuram was erected at Virupaksha Temple.\n\nThe empire’s tragic climax occurred in January 1565 at the Battle of Talikota. A confederacy of the Deccan Sultanates defeated the imperial army under Rama Raya. The majestic capital was sacked and burned for six months, after which it lay silent among the granite boulders, forgotten by time until British surveyor Colin Mackenzie produced the first archaeological maps in 1799.\n\nToday, Hampi represents the greatest surviving treasure of South Indian monolithic stone art. As you explore these royal pavilions and boulder pathways, remember that you walk through centuries of human genius, resilience, and living devotion.',
          sections: [
            { title: 'Prehistoric & Mauryan Foundations', text: 'Neolithic rock art and 3rd century BCE Ashokan edicts reveal the antiquity of the Tungabhadra river valley.', startPercent: 0 },
            { title: 'The Rise of Vijayanagara (1336 CE)', text: 'Sage Vidyaranya guided the Sangama brothers to build a fortress capital uniting southern kingdoms.', startPercent: 20 },
            { title: 'The Golden Age of Krishna Deva Raya', text: 'Immense wealth from diamond trade, international diplomacy, and unparalleled artistic patronage.', startPercent: 40 },
            { title: 'The Fall of 1565 & Colin Mackenzie’s Rediscovery', text: 'The Battle of Talikota brought destruction, until 19th-century archaeology revived its glory.', startPercent: 65 },
            { title: 'Architectural Significance & Conservation', text: 'Today, over 1,600 monuments stand preserved under UNESCO and Archaeological Survey of India care.', startPercent: 85 }
          ]
        }
      },
      kn: {
        quick: {
          language: 'kn',
          languageNativeName: 'ಕನ್ನಡ',
          estimatedDuration: '75 sec',
          fullText: 'ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯದ ವಿಶ್ವವಿಖ್ಯಾತ ರಾಜಧಾನಿಯಾದ ಹಂಪಿಗೆ ಸುಸ್ವಾಗತ! ತುಂಗಭದ್ರಾ ನದಿಯ ತೀರದಲ್ಲಿರುವ ಈ ಕಲ್ಲಿನ ನಗರಿ, ಶ್ರೀ ಕೃಷ್ಣದೇವರಾಯರ ಕಾಲದಲ್ಲಿ ಜಗತ್ತಿನ ಅತ್ಯಂತ ಶ್ರೀಮಂತ ನಗರವಾಗಿತ್ತು. ಇಲ್ಲಿನ ಕಲ್ಲಿನ ರಥ, ವಿಜಯ ವಿಠ್ಠಲ ದೇವಾಲಯದ ಸಪ್ತಸ್ವರ ಮೊಳಗುವ ಸಂಗೀತ ಕಂಬಗಳು ಮತ್ತು 7ನೇ ಶತಮಾನದಿಂದ ನಿರಂತರ ಪೂಜೆ ನಡೆಯುತ್ತಿರುವ ವಿರೂಪಾಕ್ಷ ದೇವಾಲಯ ನಿಮ್ಮನ್ನು ಬೆರಗುಗೊಳಿಸುತ್ತವೆ. ಬನ್ನಿ, ನಮ್ಮ ಹೆಮ್ಮೆಯ ಕರ್ನಾಟಕದ ವಾಸ್ತುಶಿಲ್ಪ ವೈಭವವನ್ನು ಕಣ್ತುಂಬಿಕೊಳ್ಳಿ.',
          sections: [
            { title: 'ವಿಜಯನಗರದ ರಾಜವೈಭವ', text: 'ತುಂಗಭದ್ರಾ ನದಿಯ ತೀರದಲ್ಲಿ 1336 ರಲ್ಲಿ ಸ್ಥಾಪನೆಯಾದ ವಿಶ್ವಪ್ರಸಿದ್ಧ ರಾಜಧಾನಿ ಹಂಪಿ.', startPercent: 0 },
            { title: 'ಕಲ್ಲಿನ ರಥ ಮತ್ತು ಸಂಗೀತ ಕಂಬಗಳು', text: 'ವಿಜಯ ವಿಠ್ಠಲ ದೇಗುಲದ ಕಲ್ಲಿನ ರಥ ಮತ್ತು ಸ್ವರ ಹೊರಡಿಸುವ ಸಂಗೀತ ಸ್ತಂಭಗಳು.', startPercent: 40 },
            { title: 'ವಿರೂಪಾಕ್ಷ ಮತ್ತು ವಿಶ್ವ ಪರಂಪರೆ', text: '1600 ಕ್ಕೂ ಹೆಚ್ಚು ಸ್ಮಾರಕಗಳ ಯುನೆಸ್ಕೋ ವಿಶ್ವ ಪರಂಪರೆಯ ತಾಣ.', startPercent: 75 }
          ]
        },
        standard: {
          language: 'kn',
          languageNativeName: 'ಕನ್ನಡ',
          estimatedDuration: '3.5 min',
          fullText: 'ನಮಸ್ಕಾರ! ಇತಿಹಾಸ ಮತ್ತು ಶಿಲ್ಪಕಲೆಯ ತವರೂರಾದ ಹಂಪಿಗೆ ನಿಮ್ಮನ್ನು ಪ್ರೀತಿಯಿಂದ ಸ್ವಾಗತಿಸುತ್ತೇವೆ. ಕ್ರಿಸ್ತಶಕ 1336 ರಲ್ಲಿ ಶೃಂಗೇರಿಯ ವಿದ್ಯಾರಣ್ಯ ಸ್ವಾಮಿಗಳ ಮಾರ್ಗದರ್ಶನದಲ್ಲಿ ಹರಿಹರ ಮತ್ತು ಬುಕ್ಕರಾಯರು ಈ ಸಾಮ್ರಾಜ್ಯವನ್ನು ಸ್ಥಾಪಿಸಿದರು. ಕೃಷ್ಣದೇವರಾಯರ ಆಳ್ವಿಕೆಯಲ್ಲಿ ಹಂಪಿ ಜಗತ್ತಿನ ಶ್ರೇಷ್ಠ ನಗರಗಳಲ್ಲಿ ಒಂದಾಗಿ ಮೆರೆಯಿತು.\n\nವಿಜಯ ವಿಠ್ಠಲ ದೇವಾಲಯದ ಆವರಣದಲ್ಲಿರುವ ಏಕಶಿಲಾ ಕಲ್ಲಿನ ರಥವು ಭಾರತದ ಪ್ರಮುಖ ಶಿಲ್ಪಕಲಾ ವಿಸ್ಮಯಗಳಲ್ಲೊಂದಾಗಿದೆ. ರಂಗಮಂಟಪದಲ್ಲಿರುವ 56 ಸಂಗೀತ ಕಂಬಗಳನ್ನು ಮೆಲ್ಲನೆ ತಟ್ಟಿದರೆ ಭಾರತೀಯ ಶಾಸ್ತ್ರೀಯ ಸಂಗೀತದ ಸಪ್ತಸ್ವರಗಳು ಹೊರಹೊಮ್ಮುತ್ತವೆ. ವಿರೂಪಾಕ್ಷ ದೇವಾಲಯದಲ್ಲಿ 7ನೇ ಶತಮಾನದಿಂದ ಇಂದಿನವರೆಗೂ ನಿರಂತರವಾಗಿ ಪೂಜೆ ನಡೆಯುತ್ತಿದ್ದು, ದೇವಾಲಯದ ಗರ್ಭಗುಡಿಯ ಗೋಡೆಯ ಮೇಲೆ ಗೋಪುರದ ತಲೆಕೆಳಗಾದ ನೆರಳು ಮೂಡುವ ಅಪರೂಪದ ತಂತ್ರಜ್ಞಾನವಿದೆ.\n\nರಾಮಾಯಣದ ಕಿಷ್ಕಿಂಧಾ ಎಂದೇ ಪ್ರಸಿದ್ಧವಾಗಿರುವ ಈ ನೆಲದಲ್ಲಿ, ಅಂಜನಾದ್ರಿ ಬೆಟ್ಟವು ಹನುಮಂತನ ಜನ್ಮಸ್ಥಳವೆಂದು ನಂಬಲಾಗಿದೆ. ಹಂಪಿಯ ಈ ಪವಿತ್ರ ಸ್ಮಾರಕಗಳನ್ನು ಸಂರಕ್ಷಿಸುವುದು ನಮ್ಮೆಲ್ಲರ ಕರ್ತವ್ಯ. ಕಲ್ಲಿನ ಕೆತ್ತನೆಗಳನ್ನು ಮುಟ್ಟದೆ, ಪಾವಿತ್ರ್ಯತೆಯನ್ನು ಕಾಪಾಡಿ.',
          sections: [
            { title: 'ಸಾಮ್ರಾಜ್ಯದ ಉಗಮ ಮತ್ತು ಇತಿಹಾಸ', text: '1336 ರಲ್ಲಿ ವಿದ್ಯಾರಣ್ಯರ ಆಶೀರ್ವಾದದೊಂದಿಗೆ ಸ್ಥಾಪಿತವಾದ ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯ.', startPercent: 0 },
            { title: 'ವಿಠ್ಠಲ ದೇಗುಲದ ಸಂಗೀತ ವಿಸ್ಮಯ', text: 'ಕಲ್ಲಿನ ರಥ ಮತ್ತು ಶಾಸ್ತ್ರೀಯ ಸಂಗೀತದ ಸ್ವರಗಳನ್ನು ನುಡಿಸುವ ಶಿಲಾ ಸ್ತಂಭಗಳು.', startPercent: 30 },
            { title: 'ವಿರೂಪಾಕ್ಷ ದೇವಾಲಯದ ಅದ್ಭುತ ನೆರಳು', text: 'ಗರ್ಭಗುಡಿಯಲ್ಲಿ ಮೂಡುವ ಗೋಪುರದ ತಲೆಕೆಳಗಾದ ನೆರಳಿನ ವೈಜ್ಞಾನಿಕ ತಂತ್ರಜ್ಞಾನ.', startPercent: 60 },
            { title: 'ಪುರಾಣ, ಇತಿಹಾಸ ಮತ್ತು ಸಂರಕ್ಷಣೆ', text: 'ರಾಮಾಯಣದ ಕಿಷ್ಕಿಂಧಾ ಹಿನ್ನೆಲೆ ಮತ್ತು ಸ್ಮಾರಕಗಳ ಪಾವಿತ್ರ್ಯತೆಯ ರಕ್ಷಣೆ.', startPercent: 85 }
          ]
        },
        deep_history: {
          language: 'kn',
          languageNativeName: 'ಕನ್ನಡ',
          estimatedDuration: '6 min',
          fullText: 'ಹಂಪಿಯ ಸಮಗ್ರ ಐತಿಹಾಸಿಕ ಪಯಣಕ್ಕೆ ಸ್ವಾಗತ. ತುಂಗಭದ್ರೆಯ ಈ ಕಣಿವೆಯು ನವಶಿಲಾಯುಗದಿಂದಲೂ ಮಾನವ ವಾಸಸ್ಥಳವಾಗಿದ್ದು, ಸಮೀಪದ ನಿಟ್ಟೂರಿನಲ್ಲಿ ದೊರೆತ ಅಶೋಕನ ಶಿಲಾಶಾಸನಗಳು ಇಲ್ಲಿನ 2300 ವರ್ಷಗಳ ಪುರಾತನ ಇತಿಹಾಸವನ್ನು ದೃಢಪಡಿಸುತ್ತವೆ.\n\n1336 ರಲ್ಲಿ ಸಂಗಮ ವಂಶದ ಹರಿಹರ ಮತ್ತು ಬುಕ್ಕರಾಯರು ವಿದ್ಯಾರಣ್ಯರ ಪ್ರೇರಣೆಯಿಂದ ದಕ್ಷಿಣ ಭಾರತದ ಸಂಸ್ಕೃತಿಯನ್ನು ರಕ್ಷಿಸಲು ಈ ಸಾಮ್ರಾಜ್ಯವನ್ನು ಕಟ್ಟಿದರು. ಸಂಗಮ, ಸಾಳುವ, ತುಳುವ ಮತ್ತು ಅರವೀಡು ರಾಜವಂಶಗಳು ಈ ನೆಲವನ್ನು ಆಳಿದವು. 1509 ರಿಂದ 1529 ರವರೆಗಿನ ಶ್ರೀ ಕೃಷ್ಣದೇವರಾಯರ ಕಾಲವು ಸುವರ್ಣ ಯುಗವಾಗಿತ್ತು. ಪೋರ್ಚುಗೀಸ್ ಪ್ರವಾಸಿಗರಾದ ಡೊಮಿಂಗೊ ಪಯಾಸ್ ಮತ್ತು ಬಾರ್ಬೋಸಾ, ಹಂಪಿಯ ಬೀದಿಗಳಲ್ಲಿ ರತ್ನ-ಮುತ್ತುಗಳನ್ನು ಸೇರಿನಲ್ಲಿ ಅಳೆದು ಮಾರುತ್ತಿದ್ದ ವೈಭವವನ್ನು ಕೊಂಡಾಡಿದ್ದಾರೆ.\n\n1565 ರ ತಾಳಿಕೋಟೆ ಕದನದ ನಂತರ ಈ ವೈಭವದ ನಗರವು ನಾಶವಾಯಿತು. ಆದರೆ ಇಂದಿಗೂ ಉಳಿದಿರುವ 1,600 ಕ್ಕೂ ಹೆಚ್ಚು ಸ್ಮಾರಕಗಳು ನಮ್ಮ ಪೂರ್ವಜರ ಕಲೆಯ ಪರಾಕಾಷ್ಠೆಯನ್ನು ಸಾರುತ್ತವೆ. ಇದು ಕೇವಲ ಕಲ್ಲಿನ ನಗರವಲ್ಲ, ಕರ್ನಾಟಕದ ಹೆಮ್ಮೆಯ ಜೀವಂತ ಇತಿಹಾಸ.',
          sections: [
            { title: 'ಪ್ರಾಚೀನ ಇತಿಹಾಸ ಮತ್ತು ಮೌರ್ಯರ ಕಾಲ', text: 'ಅಶೋಕನ ಶಿಲಾಶಾಸನಗಳಿಂದ ದೃಢಪಟ್ಟಿರುವ ಹಂಪಿಯ ಪುರಾತನ ಬೇರುಗಳು.', startPercent: 0 },
            { title: 'ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯದ ಉದಯ', text: 'ವಿದ್ಯಾರಣ್ಯರ ಪ್ರೇರಣೆಯಿಂದ ದಕ್ಷಿಣದ ಧರ್ಮ ರಕ್ಷಣೆಗೆ ಕಟ್ಟಿದ ಸಾಮ್ರಾಜ್ಯ.', startPercent: 25 },
            { title: 'ಶ್ರೀ ಕೃಷ್ಣದೇವರಾಯರ ಸುವರ್ಣ ಕಾಲ', text: 'ರತ್ನ-ವೈಢೂರ್ಯಗಳ ವ್ಯಾಪಾರ ಮತ್ತು ಶಿಲ್ಪಕಲೆಯ ಮಹಾನ್ ಬೆಳವಣಿಗೆ.', startPercent: 50 },
            { title: 'ತಾಳಿಕೋಟೆ ಕದನ ಮತ್ತು ನಂತರದ ಅಧ್ಯಾಯ', text: '1565 ರ ಯುದ್ಧದ ನಂತರದ ಇತಿಹಾಸ ಮತ್ತು ಪುರಾತತ್ವ ಇಲಾಖೆಯ ಸಂಶೋಧನೆ.', startPercent: 75 }
          ]
        }
      },
      te: {
        quick: {
          language: 'te',
          languageNativeName: 'తెలుగు',
          estimatedDuration: '75 sec',
          fullText: 'విజయనగర సామ్రాజ్య చారిత్రక రాజధాని హంపికి స్వాగతం! తుంగభద్ర నదీ తీరాన వెలసిన ఈ అద్భుత నగరం శ్రీ కృష్ణదేవరాయల పాలనలో ప్రపంచంలోనే అత్యంత సంపన్న నగరంగా విలసిల్లింది. విఠ్ఠల ఆలయంలోని ప్రసిద్ధ రాతి రథం, సప్తస్వరాలు పలికే సంగీత స్తంభాలు, ఏడవ శతాబ్దం నుండి నిత్య పూజలు అందుకుంటున్న విరూపాక్ష ఆలయం హంపి యొక్క అసమాన శిల్పకళా వైభవానికి నిదర్శనాలు.',
          sections: [
            { title: 'విజయనగర వైభవం', text: '1336లో స్థాపించబడిన విజయనగర సామ్రాజ్య మహోన్నత రాజధాని హంపి.', startPercent: 0 },
            { title: 'రాతి రథం & సంగీత స్తంభాలు', text: 'సప్తస్వరాలు పలికే రాతి స్తంభాలు మరియు అద్భుత ఏకశిలా రాతి రథం.', startPercent: 40 },
            { title: 'విరూపాక్ష ఆలయ దర్శనం', text: 'శతాబ్దాల చరిత్ర కలిగిన సజీవ పూజా క్షేత్రం విరూపాక్ష దేవాలయం.', startPercent: 75 }
          ]
        },
        standard: {
          language: 'te',
          languageNativeName: 'తెలుగు',
          estimatedDuration: '3.5 min',
          fullText: 'నమస్కారం! రాతి శిల్పాలలో జీవం ఉట్టిపడే చారిత్రక హంపి నగరానికి స్వాగతం. 1336వ సంవత్సరంలో శృంగేరి విద్యాశంకరుల ఆశీస్సులతో హరిహర రాయలు, బుక్క రాయలు ఈ సామ్రాజ్యాన్ని స్థాపించారు. తెలుగు సాహిత్యాన్ని, సంస్కృతిని అమితంగా ప్రేమించిన శ్రీ కృష్ణదేవరాయల కాలంలో హంపి స్వర్ణయుగాన్ని చూసింది.\n\nవిజయ విఠ్ఠల దేవాలయంలోని రాతి రథం ప్రపంచ ప్రసిద్ధి చెందింది. రంగమండపంలోని 56 సంగీత స్తంభాలను మెల్లగా తడితే శాస్త్రీయ సంగీత స్వరాలు వినిపిస్తాయి. విరూపాక్ష దేవాలయంలోని గర్భగుడిలో ప్రధాన గోపురం యొక్క తలక్రిందుల నీడ గోడపై కనిపించే పురాతన ఆప్టికల్ విజ్ఞానం ఎంతో ఆశ్చర్యం కలిగిస్తుంది.\n\nరామాయణంలో పేర్కొన్న కిష్కింధ ప్రాంతమే ఈ హంపి అని భక్తుల విశ్వాసం. ఇక్కడి అంజనాద్రి కొండ హనుమంతుని జన్మస్థలంగా పూజించబడుతుంది. ఈ అమూల్యమైన వారసత్వ సంపదను పరిరక్షించడం మనందరి బాధ్యత.',
          sections: [
            { title: 'సామ్రాజ్య స్థాపన', text: '1336లో విద్యారణ్యుల మార్గదర్శకత్వంలో హరిహర, బుక్కరాయలచే స్థాపించబడిన సామ్రాజ్యం.', startPercent: 0 },
            { title: 'శ్రీకృష్ణదేవరాయల స్వర్ణయుగం', text: 'ఆంధ్రభోజుడు శ్రీకృష్ణదేవరాయల కాలంలో కళలు, శిల్పకళ మరియు సాహిత్యం యొక్క శిఖరాగ్రం.', startPercent: 30 },
            { title: 'రాతి రథం మరియు విరూపాక్ష ఆలయం', text: 'సంగీత స్తంభాలు మరియు ఆలయ గర్భగుడిలోని తలక్రిందుల నీడ వింత.', startPercent: 60 },
            { title: 'కిష్కింధ మరియు వారసత్వ పరిరక్షణ', text: 'రామాయణ ప్రాశస్త్యం మరియు యునెస్కో ప్రపంచ వారసత్వ సంపద.', startPercent: 85 }
          ]
        },
        deep_history: {
          language: 'te',
          languageNativeName: 'తెలుగు',
          estimatedDuration: '6 min',
          fullText: 'హంపి యొక్క సమగ్ర చారిత్రక విశేషాలకు స్వాగతం. తుంగభద్ర నదీ లోయలో అశోక చక్రవర్తి కాలం నాటి శిలాశాసనాలు లభించాయి, ఇది ఇక్కడి 2,300 సంవత్సరాల ప్రాచీనతను నిరూపిస్తుంది.\n\n1336లో ప్రారంభమైన విజయనగర సామ్రాజ్యాన్ని సంగమ, సాళువ, తుళువ, ఆరవీడు వంశాలు పాలించాయి. కృష్ణదేవరాయల కాలంలో పోర్చుగీస్ యాత్రికులు డొమింగో పేస్, బార్బోసాలు హంపిని రోమ్ నగరంతో సమానమైన మహానగరంగా వర్ణించారు. ఇక్కడి వీధులలో రత్నాలు, వజ్రాలు కుప్పలుగా పోసి అమ్మేవారంటే ఈ నగర సంపదను ఊహించవచ్చు.\n\n1565 తళ్లికోట యుద్ధం తర్వాత ఈ మహానగరం ధ్వంసమైనప్పటికీ, ఇప్పటికీ మిగిలిన 1,600 పైగా కట్టడాలు విజయనగర చక్రవర్తుల శిల్పకళా చాతుర్యాన్ని ఘనంగా చాటుతున్నాయి.',
          sections: [
            { title: 'ప్రాచీన మౌర్య యుగం', text: 'అశోకుని శిలాశాసనాలు మరియు ప్రాచీన నదీ లోయ నాగరికత.', startPercent: 0 },
            { title: 'సామ్రాజ్య నిర్మాణం', text: 'దక్షిణ భారత సంస్కృతి రక్షణకై స్థాపించబడిన విజయనగరం.', startPercent: 25 },
            { title: 'రత్నాల సంతల వైభవం', text: 'ప్రపంచ ప్రసిద్ధి చెందిన వజ్రాలు మరియు గుర్రాల అంతర్జాతీయ వాణిజ్యం.', startPercent: 50 },
            { title: 'తాళ్ళికోట యుద్ధం మరియు అవశేషాలు', text: '1565 నాటి చారిత్రక పరిణామాలు మరియు నేటి యునెస్కో రక్షణ.', startPercent: 75 }
          ]
        }
      },
      hi: {
        quick: {
          language: 'hi',
          languageNativeName: 'हिन्दी',
          estimatedDuration: '75 sec',
          fullText: '14वीं सदी के महान विजयनगर साम्राज्य की राजधानी हम्पी में आपका स्वागत है! तुंगभद्रा नदी के तट पर स्थित यह ऐतिहासिक स्थल सम्राट कृष्णदेवराय के काल में विश्व का सबसे समृद्ध नगर माना जाता था। यहाँ का विट्ठल मंदिर का प्रसिद्ध प्रस्तर रथ, संगीत की ध्वनि निकालने वाले संगीतमय खंभे और विरुपाक्ष मंदिर की भव्यता भारतीय वास्तुकला का अनुपम उदाहरण हैं।',
          sections: [
            { title: 'विजयनगर का गौरव', text: 'तुंगभद्रा के तट पर 1336 ईस्वी में स्थापित ऐतिहासिक राजधानी हम्पी।', startPercent: 0 },
            { title: 'प्रस्तर रथ और संगीतमय स्तंभ', text: 'विट्ठल मंदिर का भव्य रथ और संगीत स्वर बिखेरते पाषाण स्तंभ।', startPercent: 40 },
            { title: 'विरुपाक्ष मंदिर एवं धरोहर', text: 'यूनेस्को विश्व धरोहर स्थल में 1,600 से अधिक ऐतिहासिक स्मारक।', startPercent: 75 }
          ]
        },
        standard: {
          language: 'hi',
          languageNativeName: 'हिन्दी',
          estimatedDuration: '3.5 min',
          fullText: 'नमस्ते! पत्थरों की जीवंत नगरी हम्पी में आपका स्वागत है। सन 1336 में संत विद्यारण्य के मार्गदर्शन में हरिहर और बुक्का राय ने विजयनगर साम्राज्य की नींव रखी थी। सम्राट कृष्णदेवराय के शासनकाल में यह नगर वैभव और कला के शिखर पर पहुँचा।\n\nविजय विट्ठल मंदिर का एकाश्म पाषाण रथ भारत की सबसे सुंदर कलाकृतियों में से एक है। रंगमंडप के 56 स्तंभों को धीरे से थपथपाने पर भारतीय शास्त्रीय संगीत के सात स्वर गूंज उठते हैं। वहीं विरुपाक्ष मंदिर में 7वीं शताब्दी से आज तक निरंतर पूजा होती आ रही है। इसके गर्भगृह में मुख्य गोपुरम की उल्टी छाया दीवार पर दिखने का अनूठा दृश्य प्राचीन प्रकाशिकी विज्ञान का प्रमाण है।\n\nरामायण की किष्किंधा नगरी के रूप में प्रसिद्ध यह भूमि ऐतिहासिक तथ्यों और धार्मिक आस्था का संगम है। कृपया इन प्राचीन स्मारकों का सम्मान करें और स्वच्छता बनाए रखें।',
          sections: [
            { title: 'साम्राज्य की स्थापना', text: '1336 में ऋषि विद्यारण्य के आशीर्वाद से स्थापित महान हिंदू साम्राज्य।', startPercent: 0 },
            { title: 'विट्ठल मंदिर के संगीतमय खंभे', text: 'एकाश्म पत्थर का रथ और शास्त्रीय रागों के स्वर उत्पन्न करने वाले स्तंभ।', startPercent: 30 },
            { title: 'विरुपाक्ष मंदिर का वैज्ञानिक रहस्य', text: 'कैमरा ऑब्स्क्यूरा सिद्धांत पर दीवार पर बनने वाली गोपुरम की उल्टी छाया।', startPercent: 60 },
            { title: 'किष्किंधा आस्था और संरक्षण', text: 'रामायण कालीन संबंध और यूनेस्को स्मारकों की सुरक्षा।', startPercent: 85 }
          ]
        },
        deep_history: {
          language: 'hi',
          languageNativeName: 'हिन्दी',
          estimatedDuration: '6 min',
          fullText: 'हम्पी के गहन ऐतिहासिक अध्ययन में आपका स्वागत है। तुंगभद्रा नदी घाटी में प्रागैतिहासिक शैलचित्र और सम्राट अशोक के 2300 वर्ष पुराने शिलालेख इसके अति-प्राचीन महत्व को सिद्ध करते हैं।\n\n1336 में संगम बंधुओं द्वारा स्थापित विजयनगर साम्राज्य ने 230 वर्षों तक दक्षिण भारत की समृद्ध संस्कृति की रक्षा की। पुर्तगाली यात्री डोमिंगो पेस ने लिखा था कि हम्पी रोम से भी विशाल था और यहाँ की बाजारों में हीरे, माणिक और मोती खुलेआम तोलकर बेचे जाते थे।\n\n1565 के तालिकोटा युद्ध में दक्कन सल्तनतों द्वारा पराजय के बाद नगर को जला दिया गया। सन 1799 में कर्नल कॉलिन मैकेंज़ी ने पहली बार इसके मानचित्र तैयार किए। आज 1,600 से अधिक स्मारकों के साथ यह विश्व धरोहर भारत का मुकुटमणि है।',
          sections: [
            { title: 'प्राचीन मौर्य युगीन साक्ष्य', text: 'अशोक के शिलालेख और तुंगभद्रा घाटी की प्रागैतिहासिक धरोहर।', startPercent: 0 },
            { title: 'विजयनगर का स्वर्णकाल', text: 'कृष्णदेवराय का शासन और अंतरराष्ट्रीय व्यापार का प्रमुख केंद्र।', startPercent: 25 },
            { title: 'हीरे-जवाहरात के खुले बाजार', text: 'विदेशी यात्रियों के विवरण और अद्वितीय समृद्धि।', startPercent: 50 },
            { title: '1565 का विध्वंस और पुनर्खोज', text: 'तालिकोटा का युद्ध और आधुनिक पुरातत्व सर्वेक्षण।', startPercent: 75 }
          ]
        }
      },
      ta: {
        quick: {
          language: 'ta',
          languageNativeName: 'தமிழ்',
          estimatedDuration: '75 sec',
          fullText: '14 ஆம் நூற்றாண்டின் புகழ்பெற்ற விஜயநகர பேரரசின் தலைநகரான ஹம்பிக்கு நல்வரவு! துங்கபத்ரா நதிக்கரையில் அமைந்துள்ள இந்த பொன்னகரம், கிருஷ்ணதேவராயர் காலத்தில் உலகின் மிகப்பெரிய பணக்கார நகரமாக திகழ்ந்தது. விட்டலா கோவிலின் கல் தேர், சப்தஸ்வரங்களை எழுப்பும் இசை தூண்கள், 7ஆம் நூற்றாண்டிலிருந்து தொடரும் விருபாக்ஷர் ஆலயம் ஆகியவை இங்குள்ள கட்டடக்கலையின் சிகரங்களாகும்.',
          sections: [
            { title: 'விஜயநகரப் பேரரசு', text: '1336 இல் துங்கபத்ரா நதிக்கரையில் நிறுவப்பட்ட உலகப் புகழ்பெற்ற தலைநகரம்.', startPercent: 0 },
            { title: 'கல் தேர் மற்றும் இசைத் தூண்கள்', text: 'விட்டலா கோவிலின் ஒற்றைக்கல் தேர் மற்றும் இசை ஒலிக்கும் தூண்கள்.', startPercent: 40 },
            { title: 'விருபாக்ஷர் கோவில் மற்றும் யுனெஸ்கோ', text: '1,600 க்கும் மேற்பட்ட வரலாற்று சின்னங்கள் கொண்ட உலக பாரம்பரிய தளம்.', startPercent: 75 }
          ]
        },
        standard: {
          language: 'ta',
          languageNativeName: 'தமிழ்',
          estimatedDuration: '3.5 min',
          fullText: 'வணக்கம்! கற்கள் பேசும் வரலாற்று பூமியான ஹம்பிக்கு உங்களை அன்புடன் வரவேற்கிறோம். கி.பி 1336 ஆம் ஆண்டு வித்யாரண்யர் வழிகாட்டுதலில் ஹரிஹரர் மற்றும் புக்கர் இந்த பேரரசை நிறுவினர். கிருஷ்ணதேவராயரின் பொற்காலத்தில் ஹம்பி உலக அரங்கில் மிளிர்ந்தது.\n\nவிஜய விட்டலா கோவிலில் உள்ள கல் தேர் கருடனுக்கான பிரத்யேக சன்னதியாகும். இங்குள்ள 56 இசைத் தூண்களை மெதுவாக தட்டினால் கர்நாடக சங்கீதத்தின் சப்தஸ்வரங்கள் கேட்கும். விருபாக்ஷர் ஆலயத்தில் இன்றும் அன்றாட பூஜைகள் நடைபெறுகின்றன. கருவறையின் சுவரில் பிரதான கோபுரத்தின் தலைகீழ் நிழல் தெரியும் ஒளியியல் விந்தை நம் முன்னோர்களின் அறிவியல் அறிவுக்கு சான்றாகும்.\n\nஇராமாயணத்தில் வரும் கிஷ்கிந்தை இந்த ஹம்பியே என்பது நம்பிக்கை. நமது மாபெரும் பாரம்பரிய சின்னங்களை பாதுகாப்பது நம் அனைவரின் கடமையாகும்.',
          sections: [
            { title: 'வரலாற்றுத் தொடக்கம்', text: '1336 இல் நிறுவப்பட்டு பாரதத்தின் பெருமையை நிலைநிறுத்திய விஜயநகரம்.', startPercent: 0 },
            { title: 'இசைத் தூண்களின் அதிசயம்', text: 'விட்டலா ஆலயத்தில் இசை ஸ்வரங்களை ஒலிக்கும் நுட்பமான கல் தூண்கள்.', startPercent: 30 },
            { title: 'தலைகீழ் நிழல் விந்தை', text: 'விருபாக்ஷர் ஆலய கருவறையில் தோன்றும் கோபுரத்தின் தலைகீழ் நிழல்.', startPercent: 60 },
            { title: 'கிஷ்கிந்தை வரலாறு மற்றும் பாதுகாப்பு', text: 'இராமாயண தொடர்பு மற்றும் யுனெஸ்கோ பாரம்பரிய சின்னங்கள்.', startPercent: 85 }
          ]
        },
        deep_history: {
          language: 'ta',
          languageNativeName: 'தமிழ்',
          estimatedDuration: '6 min',
          fullText: 'ஹம்பியின் விரிவான வரலாற்றுப் பதிவுகளுக்கு நல்வரவு. துங்கபத்ரா பள்ளத்தாக்கில் உள்ள அசோகரின் பாறை கல்வெட்டுகள் 2,300 ஆண்டுகளுக்கு முந்தைய மௌரியர் ஆட்சியை பறைசாற்றுகின்றன.\n\n1336 முதல் 1565 வரை சங்கம, சாளுவ, துளுவ, ஆரவீடு வம்சங்கள் ஹம்பியை தலைநகராகக் கொண்டு ஆண்டன. போர்த்துகீசிய பயணியான டொமிங்கோ பயஸ், ஹம்பியின் தெருக்களில் வைரங்களும் முத்துக்களும் விற்கப்பட்டதாக வியந்து பதிவு செய்துள்ளார்.\n\n1565 தாலிகோட்டை போருக்குப் பின்னர் இந்நகரம் அழிவைச் சந்தித்தாலும், இன்றும் எஞ்சியுள்ள 1,600 க்கும் மேற்பட்ட கலைச்சின்னங்கள் நமது கலாச்சாரத்தின் அழியாத சாட்சிகளாக விளங்குகின்றன.',
          sections: [
            { title: 'பண்டைய மௌரிய வரலாறு', text: 'அசோகரின் கல்வெட்டுகள் மற்றும் தொல்பழங்கால நாகரிக வேர்கள்.', startPercent: 0 },
            { title: 'பேரரசின் பொற்காலம்', text: 'கிருஷ்ணதேவராயரின் ஆட்சி மற்றும் சர்வதேச வைர வர்த்தகம்.', startPercent: 30 },
            { title: 'தாலிகோட்டை யுத்தம்', text: '1565 போரின் முடிவு மற்றும் மெக்கன்ஸியின் மறுஆய்வு.', startPercent: 65 },
            { title: 'கலை நயமும் பாதுகாப்பும்', text: 'யுனெஸ்கோ மற்றும் இந்திய தொல்லியல் துறையின் பாதுகாப்பு.', startPercent: 85 }
          ]
        }
      },
      ml: {
        quick: {
          language: 'ml',
          languageNativeName: 'മലയാളം',
          estimatedDuration: '75 sec',
          fullText: 'പതിനാലാം നൂറ്റാണ്ടിലെ പ്രതാപശാലിയായ വിജയനഗര സാമ്രാജ്യത്തിന്റെ തലസ്ഥാനമായ ഹംപിയിലേക്ക് സ്വാഗതം! തുംഗഭദ്ര നദിയുടെ തീരത്തുള്ള ഈ ശിലാ നഗരം ശ്രീകൃഷ്ണദേവരായരുടെ കാലത്ത് ലോകത്തിലെ ഏറ്റവും സമ്പന്നമായ നഗരമായിരുന്നു. വിട്ടല ക്ഷേത്രത്തിലെ കൽരഥം, സംഗീതം പൊഴിക്കുന്ന തൂണുകൾ, വിരൂപാക്ഷ ക്ഷേത്രത്തിന്റെ ഗാംഭീര്യം എന്നിവ കർണാടകയുടെ ശില്പകലാവൈഭവത്തിന് മകുടോദാഹരണങ്ങളാണ്.',
          sections: [
            { title: 'വിജയനഗര വൈഭവം', text: '1336-ൽ തുംഗഭദ്ര തീരത്ത് സ്ഥാപിതമായ ഇതിഹാസ നഗരം ഹംപി.', startPercent: 0 },
            { title: 'കൽരഥവും സംഗീതത്തൂണുകളും', text: 'സപ്തസ്വരങ്ങൾ പൊഴിക്കുന്ന തൂണുകളും വിട്ടല ക്ഷേത്രത്തിലെ കൽരഥവും.', startPercent: 40 },
            { title: 'വിരൂപാക്ഷ ക്ഷേത്ര ദർശനം', text: 'യുനെസ്കോ ലോക പൈതൃക പട്ടികയിലുള്ള 1600-ലധികം സ്മാരകങ്ങൾ.', startPercent: 75 }
          ]
        },
        standard: {
          language: 'ml',
          languageNativeName: 'മലയാളം',
          estimatedDuration: '3.5 min',
          fullText: 'നമസ്കാരം! കല്ലുകളിൽ ചരിത്രം തുടിക്കുന്ന ഹംപിയിലേക്ക് സ്വാഗതം. എഡി 1336-ൽ വിദ്യാരണ്യ സ്വാമികളുടെ അനുഗ്രഹത്തോടെ ഹരിഹരനും ബുക്കരായനും ചേർന്നാണ് വിജയനഗര സാമ്രാജ്യം സ്ഥാപിച്ചത്. ശ്രീകൃഷ്ണദേവരായരുടെ ഭരണകാലത്ത് ഹംപി ലോകത്തിലെ തന്നെ ഏറ്റവും പ്രധാനപ്പെട്ട നഗരമായി മാറി.\n\nവിജയ വിട്ടല ക്ഷേത്ര സമുച്ചയത്തിലെ ശിലാരഥം ലോകപ്രശസ്തമാണ്. രംഗമണ്ഡപത്തിലെ 56 സംഗീതത്തൂണുകളിൽ തട്ടുമ്പോൾ ശാസ്ത്രീയ സംഗീതത്തിലെ സ്വരങ്ങൾ കേൾക്കാം. വിരൂപാക്ഷ ക്ഷേത്രത്തിലെ ശ്രീകോവിലിന്റെ ചുമരിൽ ഗോപുരത്തിന്റെ തലതിരിഞ്ഞ നിഴൽ പതിക്കുന്ന പ്രാചീന ഒപ്റ്റിക്കൽ ശാസ്ത്രം ഏറെ വിസ്മയകരമാണ്.\n\nരാമായണത്തിലെ കിഷ്കിന്ധയാണ് ഹംപി എന്നാണ് വിശ്വാസം. ഈ അമൂല്യമായ പുരാവസ്തു പൈതൃകം കാത്തുസൂക്ഷിക്കേണ്ടത് നമ്മുടെ കടമയാണ്.',
          sections: [
            { title: 'സാമ്രാജ്യ സ്ഥാപനം', text: '1336-ൽ സ്ഥാപിതമായ ദക്ഷിണേന്ത്യയിലെ മഹാ സാമ്രാജ്യം.', startPercent: 0 },
            { title: 'വിട്ടല ക്ഷേത്രത്തിലെ സംഗീത വിസ്മയം', text: 'സംഗീതം പൊഴിക്കുന്ന കൽത്തൂണുകളും പ്രശസ്തമായ കൽരഥവും.', startPercent: 30 },
            { title: 'വിരൂപാക്ഷ ക്ഷേത്രത്തിലെ നിഴൽ വിസ്മയം', text: 'ചുമരിൽ തെളിയുന്ന ഗോപുരത്തിന്റെ തലതിരിഞ്ഞ നിഴൽ.', startPercent: 60 },
            { title: 'കിഷ്കിന്ധയും പൈതൃക സംരക്ഷണവും', text: 'രാമായണ സ്മരണകളും യുനെസ്കോ പൈതൃക സംരക്ഷണവും.', startPercent: 85 }
          ]
        },
        deep_history: {
          language: 'ml',
          languageNativeName: 'മലയാളം',
          estimatedDuration: '6 min',
          fullText: 'ഹംപിയുടെ വിശദമായ ചരിത്രത്തിലേക്ക് സ്വാഗതം. തുംഗഭദ്ര നദീതടത്തിൽ കണ്ടെത്തിയ അശോക ചക്രവർത്തിയുടെ ശിലാശാസനങ്ങൾ 2300 വർഷത്തെ പഴക്കം സാക്ഷ്യപ്പെടുത്തുന്നു.\n\n1336 മുതൽ 1565 വരെ സംഗമ, സാളുവ, തുളുവ, അരവിടു രാജവംശങ്ങൾ ഹംപി ഭരിച്ചു. കൃഷ്ണദേവരായരുടെ കാലത്ത് പോർച്ചുഗീസ് സഞ്ചാരിയായ ഡൊമിംഗോ പയസ് ഹംപിയെ റോമിനേക്കാൾ വലിയ സമ്പന്ന നഗരമായി രേഖപ്പെടുത്തിയിട്ടുണ്ട്.\n\n1565-ലെ തളിക്കോട്ട യുദ്ധത്തിന് ശേഷം നഗരം കൊള്ളയടിക്കപ്പെട്ടെങ്കിലും, ഇന്നും അവശേഷിക്കുന്ന 1,600-ലധികം സ്മാരകങ്ങൾ ഭാരതീയ ശില്പകലയുടെ നിത്യസ്മാരകങ്ങളായി നിലകൊള്ളുന്നു.',
          sections: [
            { title: 'മൗര്യ കാലഘട്ടം', text: 'അശോകന്റെ ശിലാശാസനങ്ങളും പ്രാചീന നദീതട സംസ്കാരവും.', startPercent: 0 },
            { title: 'വിജയനഗരത്തിന്റെ സുവർണ്ണകാലം', text: 'കൃഷ്ണദേവരായരുടെ ഭരണവും രത്നവ്യാപാരവും.', startPercent: 30 },
            { title: 'തളിക്കോട്ട യുദ്ധവും വീണ്ടെടുപ്പും', text: '1565-ലെ യുദ്ധവും പുരാവസ്തു വകുപ്പിന്റെ സംരക്ഷണവും.', startPercent: 65 },
            { title: 'ശില്പകലയുടെ പൈതൃകം', text: 'യുനെസ്കോയുടെ ലോക പൈതൃക പട്ടികയിലെ പ്രാധാന്യം.', startPercent: 85 }
          ]
        }
      }
    },
    faqList: [
      {
        id: 'hampi-q1',
        category: 'founder',
        question: {
          en: 'Who founded Hampi and the Vijayanagara Empire?',
          kn: 'ಹಂಪಿ ಮತ್ತು ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯವನ್ನು ಸ್ಥಾಪಿಸಿದವರು ಯಾರು?',
          te: 'హంపి మరియు విజయనగర సామ్రాజ్యాన్ని ఎవరు స్థాపించారు?',
          hi: 'हम्पी और विजयनगर साम्राज्य की स्थापना किसने की थी?',
          ta: 'ஹம்பியையும் விஜயநகர பேரரசையும் நிறுவியவர் யார்?',
          ml: 'ഹംപിയും വിജയനഗര സാമ്രാജ്യവും സ്ഥാപിച്ചത് ആരാണ്?'
        },
        answer: {
          en: 'Historically documented inscriptions confirm that the Vijayanagara Empire was founded in 1336 CE by two brothers, Harihara I and Bukka Raya I of the Sangama dynasty, under the spiritual guidance of Sage Vidyaranya of the Sringeri Sharada Peetham.',
          kn: 'ಐತಿಹಾಸಿಕ ಶಾಸನಗಳ ಪ್ರಕಾರ, ಕ್ರಿಸ್ತಶಕ 1336 ರಲ್ಲಿ ಶೃಂಗೇರಿ ಶಾರದಾ ಪೀಠದ ಜಗದ್ಗುರು ಶ್ರೀ ವಿದ್ಯಾರಣ್ಯರ ಮಾರ್ಗದರ್ಶನದಲ್ಲಿ ಸಂಗಮ ವಂಶದ ಸಹೋದರರಾದ ಒಂದನೇ ಹರಿಹರ ಮತ್ತು ಬುಕ್ಕರಾಯರು ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯವನ್ನು ಸ್ಥಾಪಿಸಿದರು.',
          te: 'చారిత్రక శాసనాల ప్రకారం, 1336వ సంవత్సరంలో శృంగేరి శారదా పీఠానికి చెందిన విద్యాశంకర (విద్యారణ్య) స్వాముల మార్గదర్శకత్వంలో సంగమ వంశపు సోదరులు హరిహర రాయలు, బుక్క రాయలు విజయనగరాన్ని స్థాపించారు.',
          hi: 'ऐतिहासिक अभिलेखों के अनुसार, विजयनगर साम्राज्य की स्थापना 1336 ईस्वी में शृंगेरी शारदा पीठ के संत विद्यारण्य के मार्गदर्शन में संगम वंश के दो भाइयों, हरिहर प्रथम और बुक्का राय प्रथम ने की थी।',
          ta: 'வரலாற்று கல்வெட்டுகளின்படி, கி.பி 1336 இல் சிருங்கேரி சாரதா பீடத்தின் துறவி வித்யாரண்யரின் ஆன்மீக வழிகாட்டுதலின் கீழ் சங்கம வம்சத்தைச் சேர்ந்த ஹரிஹரர் மற்றும் புக்கர் என்ற சகோதரர்களால் விஜயநகரப் பேரரசு நிறுவப்பட்டது.',
          ml: 'ചരിത്രരേഖകൾ പ്രകാരം, എഡി 1336-ൽ ശൃംഗേരി ശാരദാ പീഠത്തിലെ വിദ്യാരണ്യ സ്വാമികളുടെ മാർഗ്ഗനിർദ്ദേശത്തിൽ സംഗമ വംശത്തിലെ സഹോദരന്മാരായ ഹരിഹരൻ ഒന്നാമനും ബുക്കരായൻ ഒന്നാമനും ചേർന്നാണ് വിജയനഗര സാമ്രാജ്യം സ്ഥാപിച്ചത്.'
        }
      },
      {
        id: 'hampi-q2',
        category: 'architecture',
        question: {
          en: 'How do the musical pillars in Vittala Temple work?',
          kn: 'ವಿಠ್ಠಲ ದೇಗುಲದ ಸಂಗೀತ ಕಂಬಗಳು ಹೇಗೆ ನಾದ ಹೊರಡಿಸುತ್ತವೆ?',
          te: 'విఠ్ఠల ఆలయంలోని సంగీత స్తంభాలు ఎలా శబ్దం చేస్తాయి?',
          hi: 'विट्ठल मंदिर के संगीतमय खंभे कैसे स्वर निकालते हैं?',
          ta: 'விட்டலா கோவிலின் இசைத் தூண்கள் எவ்வாறு ஒலி எழுப்புகின்றன?',
          ml: 'വിട്ടല ക്ഷേത്രത്തിലെ സംഗീതത്തൂണുകൾ എങ്ങനെയാണ് ശബ്ദമുണ്ടാക്കുന്നത്?'
        },
        answer: {
          en: 'The Ranga Mandapa of the Vittala Temple has 56 monolithic granite pillars. Geological and acoustic research by the ASI demonstrates that ancient sculptors varied the density, granite composition, and resonant shaft thickness to produce specific frequencies of the Indian classical saptaswara when tapped.',
          kn: 'ವಿಠ್ಠಲ ದೇವಾಲಯದ ರಂಗಮಂಟಪದಲ್ಲಿ 56 ಏಕಶಿಲಾ ಗ್ರಾನೈಟ್ ಕಂಬಗಳಿವೆ. ಪ್ರಾಚೀನ ಶಿಲ್ಪಿಗಳು ಕಲ್ಲಿನ ಸಾಂದ್ರತೆ, ಖನಿಜಾಂಶ ಮತ್ತು ಕಂಬದ ದಪ್ಪವನ್ನು ಅತ್ಯಂತ ನಿಖರವಾಗಿ ಕೊರೆದು, ತಟ್ಟಿದಾಗ ಭಾರತೀಯ ಶಾಸ್ತ್ರೀಯ ಸಂಗೀತದ ಸಪ್ತಸ್ವರಗಳು ಹೊರಹೊಮ್ಮುವಂತೆ ನಿರ್ಮಿಸಿದ್ದಾರೆ.',
          te: 'విఠ్ఠల ఆలయ రంగమండపంలో 56 ఏకశిలా గ్రానైట్ స్తంభాలు ఉన్నాయి. ప్రాచీన శిల్పులు గ్రానైట్ రాయి సాంద్రతను, మందాన్ని అత్యంత ఖచ్చితత్వంతో మలిచి, తట్టినప్పుడు సప్తస్వరాల శబ్దాలు వచ్చేలా అద్భుతంగా రూపొందించారు.',
          hi: 'विट्ठल मंदिर के रंगमंडप में 56 एकाश्म ग्रेनाइट खंभे हैं। प्राचीन मूर्तिकारों ने पत्थर के घनत्व और मोटाई को इतनी सूक्ष्मता से तराशा था कि हल्के से थपथपाने पर भारतीय शास्त्रीय संगीत के स्वर गूंजते हैं।',
          ta: 'விட்டலா கோவிலின் 56 கருங்கல் தூண்களும் ஒரே பாறையில் செதுக்கப்பட்டவை. பண்டைய சிற்பிகள் கல்லின் அடர்த்தியையும் தடிமனையும் துல்லியமாக செதுக்கி, தட்டும்போது சப்தஸ்வரங்களின் ஒலிகளை எழுப்பும் வகையில் உருவாக்கியுள்ளனர்.',
          ml: 'വിട്ടല ക്ഷേത്രത്തിലെ രംഗമണ്ഡപത്തിൽ 56 ഏകാശ്മ ഗ്രാനൈറ്റ് തൂണുകളുണ്ട്. പുരാതന ശില്പികൾ ഗ്രാനൈറ്റിന്റെ സാന്ദ്രതയും കനവും അതിസൂക്ഷ്മമായി കൊത്തിയെടുത്ത്, തട്ടുമ്പോൾ ശാസ്ത്രീയ സംഗീത സ്വരങ്ങൾ പ്രതിധ്വനിക്കുന്ന വിധത്തിലാണ് ഇവ നിർമ്മിച്ചത്.'
        }
      },
      {
        id: 'hampi-q3',
        category: 'legend_vs_fact',
        question: {
          en: 'What is the difference between documented history and legend at Hampi?',
          kn: 'ಹಂಪಿಯಲ್ಲಿ ಐತಿಹಾಸಿಕ ದಾಖಲೆಗಳು ಮತ್ತು ಸ್ಥಳೀಯ ಪುರಾಣಗಳ ನಡುವಿನ ವ್ಯತ್ಯಾಸವೇನು?',
          te: 'హంపిలో చారిత్రక ఆధారాలు మరియు స్థానిక పురాణాల మధ్య తేడా ఏమిటి?',
          hi: 'हम्पी में प्रामाणिक इतिहास और पौराणिक कथाओं में क्या अंतर है?',
          ta: 'ஹம்பியில் ஆவணப்படுத்தப்பட்ட வரலாற்றுக்கும் புராணக்கதைகளுக்கும் என்ன வித்தியாசம்?',
          ml: 'ഹംപിയിലെ ചരിത്രപരമായ തെളിവുകളും പുരാണങ്ങളും തമ്മിലുള്ള വ്യത്യാസം എന്താണ്?'
        },
        answer: {
          en: 'Documented history is proven by Ashokan edicts, temple inscriptions, coins, and foreign travelogues confirming the Vijayanagara capital (1336–1565 CE). In contrast, religious belief and folklore associate the landscape with Kishkindha from the Ramayana, venerating Anjanadri Hill as Hanuman’s birthplace.',
          kn: 'ದೃಢೀಕೃತ ಇತಿಹಾಸವು ಅಶೋಕನ ಶಿಲಾಶಾಸನಗಳು, ವಿಜಯನಗರದ ತಾಮ್ರ ಶಾಸನಗಳು, ನಾಣ್ಯಗಳು ಮತ್ತು ವಿದೇಶಿ ಪ್ರವಾಸಿಗರ ಬರಹಗಳಿಂದ 1336-1565 ರ ರಾಜಕೀಯ ಇತಿಹಾಸವನ್ನು ಸಾಬೀತುಪಡಿಸುತ್ತದೆ. ಆದರೆ ಪುರಾಣ ಹಾಗೂ ಜನಪದ ನಂಬಿಕೆಯ ಪ್ರಕಾರ ಇದು ರಾಮಾಯಣದ ಕಿಷ್ಕಿಂಧಾ ಕ್ಷೇತ್ರವಾಗಿದ್ದು, ಅಂಜನಾದ್ರಿಯು ಆಂಜನೇಯನ ಜನ್ಮಸ್ಥಳವೆಂದು ನಂಬಲಾಗಿದೆ.',
          te: 'చారిత్రక ఆధారాలు (అశోకుని శాసనాలు, విదేశీ యాత్రికుల రచనలు) విజయనగర రాజుల 1336–1565 పాలనను ధృవీకరిస్తాయి. ఇక పురాణాల ప్రకారం, ఈ రాతి ప్రాంతం రామాయణంలోని కిష్కింధ రాజ్యం అని, అంజనాద్రి కొండ హనుమంతుని జన్మస్థలమని భక్తుల విశ్వాసం.',
          hi: 'अशोक के अभिलेखों, मंदिर शिलालेखों और विदेशी यात्रियों के वृत्तांतों से 1336-1565 ईस्वी का विजयनगर साम्राज्य प्रमाणित इतिहास है। जबकि पौराणिक मान्यता के अनुसार यह रामायण कालीन किष्किंधा है और अंजनाद्रि पहाड़ी को भगवान हनुमान की जन्मस्थली माना जाता है।',
          ta: 'அசோகரின் கல்வெட்டுகள் மற்றும் வெளிநாட்டு பயணக் குறிப்புகள் மூலம் 1336 முதல் 1565 வரையிலான விஜயநகர ஆட்சி நிரூபிக்கப்பட்ட வரலாறு. ஆனால் புராண நம்பிக்கையின்படி, இப்பகுதி இராமாயணத்தின் கிஷ்கிந்தையாகவும், அஞ்சனாத்ரி அனுமனின் அவதார ஸ்தலமாகவும் போற்றப்படுகிறது.',
          ml: 'അശോകന്റെ ശിലാശാസനങ്ങളും വിദേശ സഞ്ചാരികളുടെ രേഖകളും 1336-1565 കാലഘട്ടത്തിലെ വിജയനഗര സാമ്രാജ്യത്തിന്റെ ചരിത്രം സാക്ഷ്യപ്പെടുത്തുന്നു. എന്നാൽ പുരാണ വിശ്വാസപ്രകാരം ഈ പ്രദേശം രാമായണത്തിലെ കിഷ്കിന്ധയായും അഞ്ജനാദ്രി ഹനുമാന്റെ ജന്മസ്ഥലമായും കണക്കാക്കപ്പെടുന്നു.'
        }
      }
    ]
  },

  mysuru: {
    destinationId: 'mysuru',
    historicalTimeline: [
      {
        yearOrEra: '1399 CE',
        event: 'Foundation of Yaduraya Wodeyar Dynasty',
        rulerOrDynasty: 'Wodeyar Dynasty (Yaduraya Wodeyar)',
        details: 'Founded by brothers Yaduraya and Krishnaraya who established a small principality under the suzerainty of Vijayanagara.',
        isDocumentedHistory: true
      },
      {
        yearOrEra: '1610 CE',
        event: 'First State Dasara Festival at Srirangapatna',
        rulerOrDynasty: 'Raja Wodeyar I',
        details: 'Instituted the state celebration of Navaratri Vijayanagara tradition on the throne of Mysore.',
        isDocumentedHistory: true
      },
      {
        yearOrEra: '1897 – 1912 CE',
        event: 'Reconstruction of Amba Vilas Palace',
        rulerOrDynasty: 'Maharani Kempananjammanni & Krishna Raja Wadiyar IV',
        details: 'After the old wooden palace burned down during a royal wedding in 1897, British architect Lord Henry Irwin was commissioned to build the modern Indo-Saracenic stone masterpiece.',
        isDocumentedHistory: true
      },
      {
        yearOrEra: '1902 – 1940 CE',
        event: 'Reign of Rajarshi Krishna Raja Wadiyar IV',
        rulerOrDynasty: 'Wodeyar Dynasty',
        details: 'Mysore was hailed by Mahatma Gandhi as "Rama Rajya" for establishing Asia’s first hydroelectric plant at Shivanasamudra, free primary education, and premier universities.',
        isDocumentedHistory: true
      }
    ],
    architectureHighlights: [
      {
        feature: 'Indo-Saracenic Architecture (Amba Vilas Palace)',
        description: 'Harmonious blend of Hindu, Rajput, Islamic Mughal, and Gothic styles built from fine grey granite with deep pink marble domes.',
        periodOrStyle: '1897–1912 by Lord Henry Irwin'
      },
      {
        feature: 'Kalyana Mandapa (Royal Wedding Pavilion)',
        description: 'Octagonal hall adorned with Scottish stained-glass ceiling depicting peacock motifs and Italian glazed tiled floor.',
        periodOrStyle: 'Early 20th Century'
      },
      {
        feature: 'Golden Howdah & Durbar Hall',
        description: 'Carved mahogany ceiling, gilded colonnades, and 750 kg pure gold elephant throne (Ambari) carried in Dasara procession.',
        periodOrStyle: '17th–20th Century Royal Regalia'
      }
    ],
    documentedHistoryFacts: [
      'The modern palace was built at a cost of approximately ₹41.4 lakh between 1897 and 1912.',
      'On Sundays and festive evenings, the palace exterior is lit by exactly 97,000 incandescent electric bulbs.',
      'Mysore State was the first in India to generate hydroelectric power (1902) to electrify the city and the Kolar Gold Fields.'
    ],
    folkloreAndLegends: [
      'Legend states the city was named "Mahishuru" after the slaying of demon king Mahishasura by Goddess Chamundeshwari atop Chamundi Hill.',
      'The Wodeyar family curse by Queen Alamelamma ("Talakadu Maralagi, Malangi Maduvagi, Mysuru Dhoregalige Makkallagade Hogali") is deeply rooted in local oral tradition.'
    ],
    sourcesAndReferences: [
      {
        title: 'Mysore Gazetteer (Volumes I-V)',
        authority: 'C. Hayavadana Rao (Mysore Government Press)',
        description: 'Comprehensive historical and cultural survey of the princely state of Mysore.',
        url: 'https://karnataka.gov.in'
      },
      {
        title: 'The Mysore Palace: An Architectural Appraisal',
        authority: 'Department of Archaeology, Museums and Heritage, Karnataka',
        description: 'Architectural documentation of Henry Irwin’s design and royal collections.'
      }
    ],
    narrations: {
      en: {
        quick: {
          language: 'en',
          languageNativeName: 'English',
          estimatedDuration: '75 sec',
          fullText: 'Welcome to Mysuru, the cultural capital of Karnataka and royal city of the Wodeyars. Stand before the majestic Amba Vilas Palace, an Indo-Saracenic wonder crowned by pink marble domes and illuminated by nearly one hundred thousand golden bulbs on festive evenings. Explore the century-old Devaraja bazaar scented with jasmine and sandalwood, ascend Chamundi Hill for panoramic views, and savor original melt-in-mouth Mysore Pak. Mysuru embodies the grace, dignity, and living heritage of royal Karnataka.',
          sections: [
            { title: 'The City of Palaces', text: 'Welcome to Mysuru, home to the 600-year legacy of the benevolent Wodeyar dynasty.', startPercent: 0 },
            { title: 'Amba Vilas Grandeur', text: 'Admire the stained glass ceilings, gilded durbar hall, and 97,000 golden evening bulbs.', startPercent: 35 },
            { title: 'Culture, Flavors & Heritage', text: 'Chamundi Hill, royal Mysore Pak, pure silk, and sandalwood aromas await you.', startPercent: 70 }
          ]
        },
        standard: {
          language: 'en',
          languageNativeName: 'English',
          estimatedDuration: '3.5 min',
          fullText: 'Namaskara and welcome to Mysuru, the cultural heartbeat of Karnataka. Governed by the Wodeyar dynasty from 1399 until Indian independence, Mysuru was celebrated across the world as a model princely state, admired by Mahatma Gandhi for its progressive welfare and artistic patronage.\n\nAt the center stands the magnificent Amba Vilas Palace, designed by British architect Lord Henry Irwin after an older wooden palace burned in 1897. Step inside to witness the grand Durbar Hall with its gilded pillars and sculpted ceilings. In the octagonal Kalyana Mandapa, look up at the stunning peacock-motif stained glass ceiling imported from Glasgow, Scotland.\n\nEvery autumn during Navaratri, Mysuru comes alive with its world-famous Dasara festival, continuing a 400-year royal tradition where the deity Goddess Chamundeshwari is carried through the city upon a 750-kilogram pure golden howdah atop a decorated tusker elephant.\n\nBeyond the palace gates, climb the 1,000 steps of Chamundi Hill to view the city below and greet the 16-foot monolithic Nandi bull carved in 1659. Savor authentic filter coffee and crispy Mylari dosas, and experience a city where royal history remains a living, breathing joy.',
          sections: [
            { title: 'The Royal Wodeyar Dynasty', text: 'From 1399 onwards, the visionary Wodeyar rulers transformed Mysuru into a cultural capital.', startPercent: 0 },
            { title: 'Amba Vilas Palace Marvels', text: 'Designed by Henry Irwin, featuring Scottish stained glass, Belgian mirrors, and pink marble domes.', startPercent: 25 },
            { title: 'The Grand Dasara Tradition', text: 'The 400-year-old festival features the 750 kg golden Ambari procession atop royal elephants.', startPercent: 55 },
            { title: 'Chamundi Hill & Culinary Heritage', text: 'Sacred monolithic Nandi, Chamundeshwari temple, and authentic Mysore Pak at Guru Sweets.', startPercent: 80 }
          ]
        },
        deep_history: {
          language: 'en',
          languageNativeName: 'English',
          estimatedDuration: '6 min',
          fullText: 'Welcome to the deep history of Mysuru. The documented story begins in 1399 CE when Yaduraya Wodeyar established the dynasty. Under Raja Wodeyar I in 1610, the seat of power was consolidated at Srirangapatna and the state Dasara festivities commenced.\n\nIn the late 18th century, Hyder Ali and his son Tipu Sultan ruled the kingdom as de facto sovereigns. Following Tipu’s defeat in 1799 at the Fourth Anglo-Mysore War, the British restored the five-year-old prince Mummadi Krishna Raja Wadiyar III, moving the royal capital back to Mysuru.\n\nA watershed moment occurred in February 1897 during Princess Jayalakshammanni’s wedding, when a fire destroyed the old wooden palace. The visionary regent Maharani Kempananjammanni commissioned Henry Irwin to construct a fireproof stone structure. Completed in 1912 under Krishna Raja Wadiyar IV, this masterpiece synthesized Hindu, Mughal, Rajput, and Gothic architectural schools.\n\nUnder Krishna Raja Wadiyar IV—hailed by the British as a philosopher king—Mysore pioneered industrialization, hydro-electric generation at Shivanasamudra in 1902, the establishment of IISc Bangalore, and the University of Mysore. Today, this royal capital remains India’s proud showcase of enlightened heritage.',
          sections: [
            { title: 'Dynastic Origins (1399–1799)', text: 'From Yaduraya Wodeyar through the Anglo-Mysore wars and the return of the capital in 1799.', startPercent: 0 },
            { title: 'The Great Fire of 1897', text: 'The destruction of the wooden palace and the commissioning of architect Henry Irwin.', startPercent: 25 },
            { title: 'Indo-Saracenic Masterpiece Construction', text: 'Completed in 1912 using grey granite, pink marble, Scottish cast-iron, and Belgian glass.', startPercent: 50 },
            { title: 'The Model State of Krishna Raja Wadiyar IV', text: 'First hydroelectric plant, industrial progress, and social reforms admired by Mahatma Gandhi.', startPercent: 75 }
          ]
        }
      },
      kn: {
        quick: {
          language: 'kn',
          languageNativeName: 'ಕನ್ನಡ',
          estimatedDuration: '75 sec',
          fullText: 'ಕರ್ನಾಟಕದ ಸಾಂಸ್ಕೃತಿಕ ರಾಜಧಾನಿ ಮತ್ತು ಅರಮನೆಗಳ ನಗರಿ ಮೈಸೂರಿಗೆ ಸುಸ್ವಾಗತ! ಒಡೆಯರ್ ಮಹಾರಾಜರ ಆಳ್ವಿಕೆಯ ಭವ್ಯತೆಯ ಸಂಕೇತವಾಗಿರುವ ಅಂಬಾವಿಲಾಸ ಅರಮನೆಯು ಇಂಡೋ-ಸಾರ್ಸೆನಿಕ್ ಶೈಲಿಯ ವಾಸ್ತುಶಿಲ್ಪದ ಮೇರುಕೃತಿ. ಭಾನುವಾರ ಸಂಜೆ ಬೆಳಗುವ 97 ಸಾವಿರ ವಿದ್ಯುತ್ ದೀಪಗಳ ಸೊಬಗು, ಚಾಮುಂಡಿ ಬೆಟ್ಟದ ವೈಭವ ಮತ್ತು ವಿಶ್ವವಿಖ್ಯಾತ ಮೈಸೂರು ಪಾಕ್ ನಿಮ್ಮ ಪ್ರವಾಸವನ್ನು ಮರೆಯಲಾಗದಂತೆ ಮಾಡುತ್ತವೆ.',
          sections: [
            { title: 'ಅರಮನೆಗಳ ನಗರಿ', text: '600 ವರ್ಷಗಳ ಒಡೆಯರ್ ರಾಜವಂಶದ ಸಾಂಸ್ಕೃತಿಕ ಪರಂಪರೆ.', startPercent: 0 },
            { title: 'ಅಂಬಾವಿಲಾಸ ಅರಮನೆಯ ದೀಪಾಲಂಕಾರ', text: '97,000 ವಿದ್ಯುತ್ ದೀಪಗಳಿಂದ ಕಂಗೊಳಿಸುವ ರಾಜಭವನ.', startPercent: 40 },
            { title: 'ಚಾಮುಂಡಿ ಬೆಟ್ಟ ಮತ್ತು ದಸರಾ', text: 'ನಾಡಹಬ್ಬ ದಸರಾ ಮತ್ತು ಚಿನ್ನದ ಅಂಬಾರಿಯ ವೈಭವ.', startPercent: 75 }
          ]
        },
        standard: {
          language: 'kn',
          languageNativeName: 'ಕನ್ನಡ',
          estimatedDuration: '3.5 min',
          fullText: 'ನಮಸ್ಕಾರ! ಕಲೆ, ಸಾಹಿತ್ಯ ಮತ್ತು ರಾಜಪರಂಪರೆಯ ತೊಟ್ಟಿಲಾದ ಮೈಸೂರಿಗೆ ಹಾರ್ದಿಕ ಸ್ವಾಗತ. 1399 ರಲ್ಲಿ ಯದುರಾಯರಿಂದ ಆರಂಭವಾದ ಒಡೆಯರ್ ವಂಶದ ಆಳ್ವಿಕೆಯಲ್ಲಿ ಮೈಸೂರು ಜಗತ್ತಿನ ಗಮನ ಸೆಳೆಯಿತು. ಮಹಾತ್ಮ ಗಾಂಧೀಜಿಯವರು ಈ ರಾಜ್ಯದ ಜನಪರ ಆಡಳಿತವನ್ನು ರಾಮರಾಜ್ಯ ಎಂದು ಶ್ಲಾಘಿಸಿದ್ದರು.\n\n1897 ರಲ್ಲಿ ಹಳೆಯ ಮರದ ಅರಮನೆ ಅಗ್ನಿದುರಂತಕ್ಕೆ ತುತ್ತಾದಾಗ, ಬ್ರಿಟಿಷ್ ವಾಸ್ತುಶಿಲ್ಪಿ ಲಾರ್ಡ್ ಹೆನ್ರಿ ಇರ್ವಿನ್ ಅವರ ವಿನ್ಯಾಸದಲ್ಲಿ ಇಂದಿನ ಕಲ್ಲಿನ ಅಂಬಾವಿಲಾಸ ಅರಮನೆಯನ್ನು ನಿರ್ಮಿಸಲಾಯಿತು. ಒಳಗೆ ಪ್ರವೇಶಿಸಿದರೆ ಕಲ್ಯಾಣ ಮಂಟಪದ ಗಾಜಿನ ಛಾವಣಿಯಲ್ಲಿ ಬಣ್ಣದ ನವಿಲುಗಳ ಕೆತ್ತನೆ, ದರ್ಬಾರ್ ಹಾಲ್‌ನ ಚಿನ್ನದ ಬಣ್ಣದ ಕಂಬಗಳು ಮೈನವಿರೇಳಿಸುತ್ತವೆ.\n\nಪ್ರತಿ ವರ್ಷ ನವರಾತ್ರಿಯ ವಿಜಯದಶಮಿಯಂದು ನಡೆಯುವ ಮೈಸೂರು ದಸರಾ ಜಂಬೂಸವಾರಿಯಲ್ಲಿ, 750 ಕೆಜಿ ತೂಕದ ಶುದ್ಧ ಚಿನ್ನದ ಅಂಬಾರಿಯಲ್ಲಿ ಶ್ರೀ ಚಾಮುಂಡೇಶ್ವರಿ ದೇವಿಯ ಮೆರವಣಿಗೆ ಸಾಗುತ್ತದೆ. ಚಾಮುಂಡಿ ಬೆಟ್ಟದ ಮೇಲಿನ 16 ಅಡಿ ಎತ್ತರದ ಏಕಶಿಲಾ ನಂದಿ ವಿಗ್ರಹವನ್ನು ನೋಡಿ, ಮೈಲಾರಿ ಮಸಾಲೆ ದೋಸೆ ಮತ್ತು ಮೈಸೂರು ಪಾಕ್ ಸವಿಯಿರಿ.',
          sections: [
            { title: 'ಒಡೆಯರ್ ರಾಜಪರಂಪರೆ', text: '1399 ರಿಂದ ಆರಂಭವಾದ ಪ್ರಜಾವತ್ಸಲ ಒಡೆಯರ್ ಮಹಾರಾಜರ ಆಳ್ವಿಕೆ.', startPercent: 0 },
            { title: 'ಅಂಬಾವಿಲಾಸ ಅರಮನೆಯ ವಾಸ್ತುಶಿಲ್ಪ', text: 'ಕಲ್ಲಿನ ಕಂಬಗಳು, ಗ್ಲಾಸ್ಗೋ ಸ್ಟೇನ್ಡ್ ಗ್ಲಾಸ್ ಮತ್ತು ಚಿನ್ನದ ದರ್ಬಾರ್ ಹಾಲ್.', startPercent: 30 },
            { title: 'ವಿಶ್ವವಿಖ್ಯಾತ ನಾಡಹಬ್ಬ ದಸರಾ', text: '750 ಕೆಜಿ ಚಿನ್ನದ ಅಂಬಾರಿಯ ಜಂಬೂಸವಾರಿ ಮೆರವಣಿಗೆ.', startPercent: 60 },
            { title: 'ಚಾಮುಂಡಿ ಬೆಟ್ಟ ಮತ್ತು ರುಚಿಗಳು', text: 'ಮೈಲಾರಿ ಬೆಣ್ಣೆ ದೋಸೆ, ಮೈಸೂರು ಪಾಕ್ ಮತ್ತು ನಂದಿ ವಿಗ್ರಹ.', startPercent: 85 }
          ]
        },
        deep_history: {
          language: 'kn',
          languageNativeName: 'ಕನ್ನಡ',
          estimatedDuration: '6 min',
          fullText: 'ಮೈಸೂರಿನ ಸಮಗ್ರ ಇತಿಹಾಸಕ್ಕೆ ಸ್ವಾಗತ. 1399 ರಲ್ಲಿ ವಿಜಯನಗರದ ಅಧೀನದಲ್ಲಿದ್ದ ಯದುರಾಯರು ಈ ಸಂಸ್ಥಾನವನ್ನು ಸ್ಥಾಪಿಸಿದರು. 1610 ರಲ್ಲಿ ರಾಜ ಒಡೆಯರು ಶ್ರೀರಂಗಪಟ್ಟಣದಲ್ಲಿ ದಸರಾ ಉತ್ಸವವನ್ನು ರಾಜ್ಯೋತ್ಸವವಾಗಿ ಆರಂಭಿಸಿದರು.\n\n18 ನೇ ಶತಮಾನದಲ್ಲಿ ಹೈದರಾಲಿ ಮತ್ತು ಟಿಪ್ಪು ಸುಲ್ತಾನರ ಆಳ್ವಿಕೆಯ ನಂತರ, 1799 ರಲ್ಲಿ ನಾಲ್ಕನೇ ಆಂಗ್ಲೋ-ಮೈಸೂರು ಯುದ್ಧದ ಬಳಿಕ ರಾಜಧಾನಿಯನ್ನು ಮೈಸೂರಿಗೆ ಮರಳಿ ತರಲಾಯಿತು. ನಾಲ್ವಡಿ ಕೃಷ್ಣರಾಜ ಒಡೆಯರ ಕಾಲದಲ್ಲಿ ಮೈಸೂರು ಭಾರತದಲ್ಲೇ ಪ್ರಪ್ರಥಮವಾಗಿ ಜಲವಿದ್ಯುತ್ ಉತ್ಪಾದನೆ ಆರಂಭಿಸಿ, ಏಷ್ಯಾದಲ್ಲೇ ಮೊದಲು ವಿದ್ಯುತ್ ದೀಪ ಪಡೆದ ನಗರವಾಯಿತು.\n\n1897 ರ ಬೆಂಕಿ ಆಕಸ್ಮಿಕದ ನಂತರ 1912 ರಲ್ಲಿ ಪೂರ್ಣಗೊಂಡ ಇಂದಿನ ಅರಮನೆಯು ಹಿಂದೂ, ಮುಸ್ಲಿಂ, ರಜಪೂತ ಮತ್ತು ಗೋಥಿಕ್ ಶೈಲಿಗಳ ಸುಂದರ ಸಂಗಮವಾಗಿದೆ.',
          sections: [
            { title: 'ರಾಜವಂಶದ ಉದಯ', text: '1399 ರಿಂದ 1799 ರವರೆಗಿನ ಐತಿಹಾಸಿಕ ಬೆಳವಣಿಗೆಗಳು.', startPercent: 0 },
            { title: 'ಅರಮನೆಯ ಪುನರ್ನಿರ್ಮಾಣ', text: 'ಹೆನ್ರಿ ಇರ್ವಿನ್ ವಿನ್ಯಾಸದಲ್ಲಿ 1912 ರಲ್ಲಿ ಪೂರ್ಣಗೊಂಡ ಕಲ್ಲಿನ ಅರಮನೆ.', startPercent: 30 },
            { title: 'ನಾಲ್ವಡಿ ಕೃಷ್ಣರಾಜ ಒಡೆಯರ ಸುವರ್ಣ ಕಾಲ', text: 'ಏಷ್ಯಾದ ಮೊದಲ ಜಲವಿದ್ಯುತ್ ಯೋಜನೆ ಮತ್ತು ವಿಶ್ವವಿದ್ಯಾಲಯಗಳ ಸ್ಥಾಪನೆ.', startPercent: 65 },
            { title: 'ಆಧುನಿಕ ಮೈಸೂರು ಪರಂಪರೆ', text: 'ರೇಷ್ಮೆ, ಶ್ರೀಗಂಧ ಮತ್ತು ದಸರಾ ಸಾಂಸ್ಕೃತಿಕ ಹಿರಿಮೆ.', startPercent: 85 }
          ]
        }
      },
      te: {
        quick: {
          language: 'te',
          languageNativeName: 'తెలుగు',
          estimatedDuration: '75 sec',
          fullText: 'కర్ణాటక సాంస్కృతిక రాజధాని, ప్యాలెస్‌ల నగరం మైసూరుకు స్వాగతం! ఒడయార్ రాజుల వైభవానికి ప్రతీకగా నిలిచే అంబా విలాస్ ప్యాలెస్ అద్భుతమైన ఇండో-సార్సెనిక్ శైలిలో నిర్మించబడింది. ఆదివారాల్లో దాదాపు లక్ష విద్యుత్ దీపాలతో వెలిగిపోయే ప్యాలెస్ అందాలు, చాముండేశ్వరి కొండ మరియు ప్రసిద్ధ మైసూరు పాక్ మీ పర్యటనను మధురంగా మారుస్తాయి.',
          sections: [
            { title: 'మైసూరు ప్యాలెస్ నగరం', text: '600 ఏళ్ల ఒడయార్ రాజవంశ ఘన వారసత్వం.', startPercent: 0 },
            { title: 'అంబా విలాస్ ప్యాలెస్ వెలుగులు', text: '97,000 విద్యుత్ బల్బులతో వెలిగిపోయే అద్భుతం.', startPercent: 40 },
            { title: 'చాముండేశ్వరి మరియు దసరా', text: 'బంగారు అంబారీ దసరా ఉత్సవ వైభవం.', startPercent: 75 }
          ]
        },
        standard: {
          language: 'te',
          languageNativeName: 'తెలుగు',
          estimatedDuration: '3.5 min',
          fullText: 'నమస్కారం! రాజసానికి, కళలకు నిలయమైన మైసూరు నగరానికి స్వాగతం. 1399లో యదురాయలచే ప్రారంభమైన ఒడయార్ రాజవంశం మైసూరును ఒక ఆదర్శ రాజ్యంగా తీర్చిదిద్దింది. గాంధీజీ ఈ రాజ్యాన్ని రామరాజ్యంగా అభివర్ణించారు.\n\n1897లో పాత చెక్క ప్యాలెస్ అగ్నిప్రమాదంలో కాలిన తర్వాత, ప్రసిద్ధ బ్రిటిష్ ఆర్కిటెక్ట్ హెన్రీ ఇర్విన్ ఆధ్వర్యంలో నేటి అంబా విలాస్ రాతి ప్యాలెస్ నిర్మించబడింది. లోపలి కళ్యాణ మండపంలో స్కాట్లాండ్ నుండి తెప్పించిన నెమలి బొమ్మల రంగుల అద్దాల పైకప్పు, దర్బార్ హాల్‌లోని బంగారు వర్ణపు స్తంభాలు చూపరులను ఆకట్టుకుంటాయి.\n\nప్రతి దసరాకు 750 కిలోల స్వచ్ఛమైన బంగారు అంబారీలో చాముండేశ్వరి దేవిని ఏనుగుపై ఊరేగించే సంప్రదాయం నలభై దశాబ్దాలుగా సాగుతోంది. చాముండి కొండపై కొలువుదీరిన చాముండేశ్వరి దేవిని, నంది విగ్రహాన్ని దర్శించి అసలైన మైసూరు పాక్ రుచి చూడండి.',
          sections: [
            { title: 'ఒడయార్ రాజవంశ చరిత్ర', text: 'మైసూరు సంస్థాన ప్రగతిశీల పాలన మరియు సంస్కృతి.', startPercent: 0 },
            { title: 'ప్యాలెస్ నిర్మాణ అద్భుతాలు', text: 'ఇండో-సార్సెనిక్ శైలి రాతి నిర్మాణం మరియు కళ్యాణ మండపం.', startPercent: 30 },
            { title: 'మైసూరు దసరా జంబూ సవారి', text: '750 కేజీల బంగారు అంబారీ వైభవ ఊరేగింపు.', startPercent: 60 },
            { title: 'చాముండి కొండ & ప్రసిద్ధ వంటకాలు', text: 'నంది విగ్రహం మరియు గురు స్వీట్స్ మైసూరు పాక్.', startPercent: 85 }
          ]
        },
        deep_history: {
          language: 'te',
          languageNativeName: 'తెలుగు',
          estimatedDuration: '6 min',
          fullText: 'మైసూరు యొక్క సమగ్ర చరిత్రను పరిశీలిస్తే, 1399లో ప్రారంభమైన ఒడయార్ వంశం కృష్ణరాజ ఒడయార్ IV కాలంలో స్వర్ణయుగాన్ని చవిచూసింది. 1902లో ఆసియాలోనే మొట్టమొదటి జలవిద్యుత్ కేంద్రాన్ని శివనసముద్రంలో స్థాపించి విద్యుదీకరణ సాధించిన ఘనత మైసూరుకే దక్కుతుంది.\n\n1912లో పూర్తికాబడిన ఆధునిక అంబా విలాస్ ప్యాలెస్ హిందూ, మొఘల్, రాజపుత్ర, గోతిక్ శైలుల అపూర్వ సంగమం. ఈ నగరపు పట్టుచీరలు, గంధపు చెక్కల సువాసనలు నేటికీ కర్ణాటక రాజసం యొక్క సజీవ నిదర్శనాలు.',
          sections: [
            { title: 'రాజవంశ ఆవిర్భావం', text: '1399 నుండి టిప్పు సుల్తాన్ యుగం వరకు చారిత్రక మలుపులు.', startPercent: 0 },
            { title: '1897 అగ్ని ప్రమాదం & పునర్నిర్మాణం', text: 'లార్డ్ హెన్రీ ఇర్విన్ చేతుల్లో రూపుదిద్దుకున్న రాతి సౌధం.', startPercent: 30 },
            { title: 'నాలుగో కృష్ణరాజ ఒడయార్ పాలన', text: 'భారతదేశంలోనే మొదటి జలవిద్యుత్ నగరం మరియు ఆధునిక విద్యాలయాలు.', startPercent: 65 },
            { title: 'వారసత్వ సంపద రక్షణ', text: 'మైసూరు సిల్క్, శాండల్‌వుడ్ మరియు సాంస్కృతిక విశిష్టత.', startPercent: 85 }
          ]
        }
      },
      hi: {
        quick: {
          language: 'hi',
          languageNativeName: 'हिन्दी',
          estimatedDuration: '75 sec',
          fullText: 'कर्नाटक की सांस्कृतिक राजधानी और महलों के शहर मैसूरु में आपका स्वागत है! वाडियार राजवंश के शाही ठाठ-बाट का प्रतीक अंबा विलास पैलेस इंडो-सरैसेनिक वास्तुकला का अनुपम उदाहरण है। रविवार की शाम को 97 हजार लाइटों से जगमगाता महल, चामुंडी पहाड़ी का विहंगम दृश्य और प्रसिद्ध मैसूर पाक आपकी यात्रा को यादगार बना देंगे।',
          sections: [
            { title: 'महलों का शहर', text: 'वाडियार राजवंश का 600 साल पुराना सांस्कृतिक इतिहास।', startPercent: 0 },
            { title: 'अंबा विलास पैलेस की रोशनी', text: '97,000 बल्बों से जगमगाता हुआ शाही महल।', startPercent: 40 },
            { title: 'चामुंडी पहाड़ी और मैसूर दशहरा', text: 'विश्व प्रसिद्ध दशहरा और 750 किलो की सोने की अंबारी।', startPercent: 75 }
          ]
        },
        standard: {
          language: 'hi',
          languageNativeName: 'हिन्दी',
          estimatedDuration: '3.5 min',
          fullText: 'नमस्ते! सांस्कृतिक वैभव के शहर मैसूर में आपका स्वागत है। सन 1399 में यदुराया द्वारा स्थापित वाडियार वंश ने मैसूर को भारत की सबसे प्रगतिशील रियासत बनाया, जिसकी प्रशंसा स्वयं महात्मा गांधी ने रामराज्य के रूप में की थी।\n\n1897 में लकड़ी के पुराने महल में आग लग जाने के बाद ब्रिटिश वास्तुकार लॉर्ड हेनरी इरविन के मार्गदर्शन में वर्तमान पाषाण महल का निर्माण कराया गया। इसके दरबार हॉल के सुनहरे नक्काशीदार खंभे और कल्याण मंडप की ग्लासगो से मंगाई गई मोर के पंखों वाली रंगीन कांच की छत अद्वितीय है।\n\nहर वर्ष नवरात्रि में होने वाला मैसूर दशहरा 400 वर्षों की अखंड परंपरा है, जिसमें 750 किलोग्राम शुद्ध सोने की अंबारी पर माता चामुंडेश्वरी की प्रतिमा को सुसज्जित हाथी पर विराजमान कर जुलूस निकाला जाता है। चामुंडी पहाड़ी पर माता के दर्शन करें और मूल मैसूर पाक का स्वाद अवश्य लें।',
          sections: [
            { title: 'वाडियार राजघराने का इतिहास', text: '1399 से स्वतंत्रता तक मैसूर रियासत का जनहितकारी शासन।', startPercent: 0 },
            { title: 'अंबा विलास पैलेस की वास्तुकला', text: 'हेनरी इरविन का इंडो-सरैसेनिक डिज़ाइन और रंगीन कांच की छतरी।', startPercent: 30 },
            { title: 'भव्य मैसूर दशहरा उत्सव', text: '750 किलो सोने की अंबारी पर चामुंडेश्वरी माता की सवारी।', startPercent: 60 },
            { title: 'चामुंडी हिल और मैसूर पाक', text: 'नंदी की प्रतिमा और गुरु स्वीट्स का पारंपरिक मैसूर पाक।', startPercent: 85 }
          ]
        },
        deep_history: {
          language: 'hi',
          languageNativeName: 'हिन्दी',
          estimatedDuration: '6 min',
          fullText: 'मैसूर का इतिहास 1399 ईस्वी से प्रारंभ होता है। राजा वाडियार प्रथम ने 1610 में दशहरे का राजकीय उत्सव प्रारंभ किया। हैदर अली और टीपू सुल्तान के दौर के बाद 1799 में अंग्रेजों ने पुनः वाडियार वंश को शासन सौंपा।\n\nकृष्णराज वाडियार चतुर्थ के काल में मैसूर राज्य ने अभूतपूर्व प्रगति की। 1902 में शिवनसमुद्र में एशिया का पहला जलविद्युत संयंत्र लगाया गया, जिससे बंगलुरु और मैसूर देश के पहले विद्युतीकृत नगर बने। 1912 में पूर्ण हुआ अंबा विलास पैलेस हिंदू, राजपूत, मुस्लिम और गोथिक वास्तुकला का अमर संगम है।',
          sections: [
            { title: 'राजवंश की स्थापना और विकास', text: 'यदुराया से लेकर टीपू सुल्तान के बाद 1799 की पुनःस्थापना।', startPercent: 0 },
            { title: '1897 का अग्निकांड और नया महल', text: '1912 में पूर्ण हुआ ग्रेनाइट पत्थरों का भव्य महल।', startPercent: 30 },
            { title: 'कृष्णराज वाडियार चतुर्थ का स्वर्णकाल', text: 'एशिया का पहला जलविद्युत संयंत्र और आधुनिक शिक्षा के केंद्र।', startPercent: 65 },
            { title: 'मैसूर की सांस्कृतिक विरासत', text: 'रेशम, चंदन और दशहरे की सदियों पुरानी गरिमा।', startPercent: 85 }
          ]
        }
      },
      ta: {
        quick: {
          language: 'ta',
          languageNativeName: 'தமிழ்',
          estimatedDuration: '75 sec',
          fullText: 'கர்நாடகத்தின் கலாச்சார தலைநகரான மைசூருக்கு நல்வரவு! உடையார் மன்னர்களின் அரச வாழ்க்கையை பறைசாற்றும் அம்பா விலாஸ் அரண்மனை இந்தோ-சாரசெனிக் கட்டடக்கலையின் உன்னத படைப்பாகும். வார இறுதி நாட்களில் 97 ஆயிரம் மின் விளக்குகளால் ஜொலிக்கும் அரண்மனை, சாமுண்டி மலை மற்றும் உலகப் புகழ்பெற்ற மைசூர் பாக் உங்களை மெய்சிலிர்க்க வைக்கும்.',
          sections: [
            { title: 'அரண்மனைகளின் நகரம்', text: '600 ஆண்டுகால உடையார் வம்சத்தின் உன்னத பாரம்பரியம்.', startPercent: 0 },
            { title: 'அரண்மனையின் ஒளி வெள்ளம்', text: '97,000 மின் விளக்குகளில் மின்னும் அம்பா விலாஸ் அரண்மனை.', startPercent: 40 },
            { title: 'சாமுண்டி மலையும் தசராவும்', text: '750 கிலோ தங்க அம்பாரி தசரா ஊர்வலம்.', startPercent: 75 }
          ]
        },
        standard: {
          language: 'ta',
          languageNativeName: 'தமிழ்',
          estimatedDuration: '3.5 min',
          fullText: 'வணக்கம்! கலை மற்றும் பண்பாட்டின் புகலிடமான மைசூருக்கு உங்களை வரவேற்கிறோம். 1399 இல் யதுராயரால் நிறுவப்பட்ட உடையார் வம்சம் மைசூரை இந்தியாவின் மிகச் சிறந்த சமஸ்தானமாக ஆட்சி செய்தது. மகாத்மா காந்தி இதனை ராமராஜ்யம் என்று பாராட்டினார்.\n\n1897 இல் பழைய மர அரண்மனை தீப்பிடித்த பின்னர், பிரிட்டிஷ் கட்டட கலைஞர் ஹென்றி இர்வின் வடிவமைப்பில் தற்போதைய பாறை அரண்மனை உருவாக்கப்பட்டது. உள்ளே உள்ள கல்யாண மண்டபத்தில் ஸ்காட்லாந்தின் கண்ணாடி கூரையும், தர்பார் மண்டபத்தின் தங்க தூண்களும் கண்கொள்ளாக் காட்சியாகும்.\n\nஒவ்வொரு தசராவிலும் 750 கிலோ எடையுள்ள தங்க அம்பாரியில் சாமுண்டீஸ்வரி அம்மன் யானை மீது பவனி வரும் பாரம்பரியம் 400 ஆண்டுகளாக தொடர்கிறது. சாமுண்டி மலைக்குச் சென்று 16 அடி உயர நந்தி சிலையை தரிசித்து, மைசூர் பாக்கின் சுவையை அனுபவியுங்கள்.',
          sections: [
            { title: 'உடையார் வம்ச வரலாறு', text: '1399 முதல் மைசூரை ஆண்ட மன்னர்களின் மக்கள் நல ஆட்சி.', startPercent: 0 },
            { title: 'அரண்மனை கட்டடக் கலை', text: 'இந்தோ-சாரசெனிக் பாணி கற்கோயில் போன்ற அரண்மனை கட்டமைப்பு.', startPercent: 30 },
            { title: 'மைசூர் தசரா ஜம்பூ சவாரி', text: '750 கிலோ தங்க அம்பாரியில் அம்மனின் அரச பவனி.', startPercent: 60 },
            { title: 'சாமுண்டி மலை மற்றும் மைசூர் பாக்', text: 'ஒற்றைக்கல் நந்தி மற்றும் சுவைமிக்க மைசூர் பாக்.', startPercent: 85 }
          ]
        },
        deep_history: {
          language: 'ta',
          languageNativeName: 'தமிழ்',
          estimatedDuration: '6 min',
          fullText: 'மைசூரின் ஆழமான வரலாற்றைப் பார்க்கும்போது, 1399 இல் உருவான சமஸ்தானம் கிருஷ்ணராஜ உடையார் IV காலத்தில் பொற்காலத்தை எட்டியது. 1902 இல் ஆசியாவின் முதல் நீர்மின் திட்டத்தை சிவசமுத்திரத்தில் துவங்கி மைசூரை ஒளிரச் செய்த பெருமை உடையார்களுக்கு உண்டு.\n\n1912 இல் நிறைவடைந்த தற்போதைய அரண்மனை இந்து, இஸ்லாமிய, ராஜபுத்திர, கோதிக் கட்டட கலைகளின் அழகிய சங்கமமாகும்.',
          sections: [
            { title: 'வம்சத்தின் தோற்றம்', text: '1399 முதல் திப்பு சுல்தான் காலத்திற்குப் பின் மீண்டெழுந்த வரலாறு.', startPercent: 0 },
            { title: '1897 தீ விபத்தும் மறுமலர்ச்சியும்', text: 'ஹென்றி இர்வினால் உருவாக்கப்பட்ட பாதுகாப்பான கல் அரண்மனை.', startPercent: 30 },
            { title: 'நான்காம் கிருஷ்ணராஜ உடையார் ஆட்சி', text: 'மின்சாரம், தொழிற்சாலைகள் மற்றும் பல்கலைக்கழகங்களை நிறுவிய விந்தை.', startPercent: 65 },
            { title: 'மைசூர் பட்டு மற்றும் சந்தனம்', text: 'பாரம்பரிய கலைகளும் தசரா திருவிழாவின் பெருமையும்.', startPercent: 85 }
          ]
        }
      },
      ml: {
        quick: {
          language: 'ml',
          languageNativeName: 'മലയാളം',
          estimatedDuration: '75 sec',
          fullText: 'കർണാടകയുടെ സാംസ്കാരിക തലസ്ഥാനമായ കൊട്ടാരങ്ങളുടെ നഗരം മൈസൂരിലേക്ക് സ്വാഗതം! വൊഡയാർ രാജവംശത്തിന്റെ രാജകീയ പ്രൗഢി വിളിച്ചോതുന്ന അംബാ വിലാസ് കൊട്ടാരം ഇൻഡോ-സാരസെനിക് ശില്പകലയുടെ അത്യപൂർവ്വ മാതൃകയാണ്. വാരാന്ത്യങ്ങളിൽ 97,000 ബൾബുകളാൽ പ്രകാശപൂരിതമാകുന്ന കൊട്ടാരക്കാഴ്ചയും ചാമുണ്ഡി മലനിരകളും വിശ്വപ്രസിദ്ധമായ മൈസൂർ പാക്കും നിങ്ങളുടെ യാത്ര അവിസ്മരണീയമാക്കും.',
          sections: [
            { title: 'കൊട്ടാരങ്ങളുടെ നഗരം', text: 'വൊഡയാർ രാജവംശത്തിന്റെ 600 വർഷത്തെ ചരിത്രം.', startPercent: 0 },
            { title: 'കൊട്ടാരത്തിലെ ദീപാലങ്കാരം', text: '97,000 ബൾബുകൾ തെളിയുന്ന അംബാ വിലാസ് കൊട്ടാരം.', startPercent: 40 },
            { title: 'ചാമുണ്ഡി ഹില്ലും ദസറയും', text: '750 കിലോ സ്വർണ്ണ അമ്പാരിയിലെ ദസറ ഘോഷയാത്ര.', startPercent: 75 }
          ]
        },
        standard: {
          language: 'ml',
          languageNativeName: 'മലയാളം',
          estimatedDuration: '3.5 min',
          fullText: 'നമസ്കാരം! സംസ്കാരത്തിന്റെയും കലയുടെയും നഗരമായ മൈസൂരിലേക്ക് സ്വാഗതം. എഡി 1399-ൽ സ്ഥാപിതമായ വൊഡയാർ രാജവംശം മൈസൂരിനെ ഇന്ത്യയിലെ തന്നെ ഏറ്റവും പുരോഗമനപരമായ രാജ്യമാക്കി മാറ്റി. മഹാത്മാഗാന്ധി ഇതിനെ രാമരാജ്യം എന്നാണ് വിശേഷിപ്പിച്ചത്.\n\n1897-ൽ പഴയ തടി കൊട്ടാരം കത്തിനശിച്ചപ്പോൾ, ബ്രിട്ടീഷ് ആർക്കിടെക്റ്റ് ഹെൻറി ഇർവിന്റെ മേൽനോട്ടത്തിൽ ഇന്നത്തെ കരിങ്കൽ കൊട്ടാരം പണികഴിപ്പിച്ചു. അകത്തെ കല്യാണ മണ്ഡപത്തിലെ വർണ്ണ ഗ്ലാസ് മേൽക്കൂരയും ദർബാർ ഹാളിലെ സ്വർണ്ണത്തൂണുകളും അത്ഭുതപ്പെടുത്തുന്നതാണ്.\n\nഎല്ലാ വർഷവും ദസറ മഹോത്സവത്തിൽ 750 കിലോഗ്രാം തങ്ക അമ്പാരിയിൽ ചാമുണ്ഡേശ്വരി ദേവിയെ ആനപ്പുറത്ത് എഴുന്നള്ളിക്കുന്ന ജംബൂ സവാരി കാണാൻ ലോകമെമ്പാടുമുള്ള സഞ്ചാരികൾ എത്താറുണ്ട്. ചാമുണ്ഡി മലയിലെ 16 അടി ഉയരമുള്ള നന്ദി പ്രതിമ കണ്ട് ഒറിജിനൽ മൈസൂർ പാക്കിന്റെ മധുരം ആസ്വദിക്കൂ.',
          sections: [
            { title: 'വൊഡയാർ രാജവംശ ചരിത്രം', text: '1399 മുതൽ മൈസൂർ ഭരിച്ച രാജാക്കന്മാരുടെ ക്ഷേമഭരണം.', startPercent: 0 },
            { title: 'അംബാ വിലാസ് ശില്പഭംഗി', text: 'ഹെൻറി ഇർവിൻ രൂപകൽപ്പന ചെയ്ത ഇൻഡോ-സാരസെനിക് കൊട്ടാരം.', startPercent: 30 },
            { title: 'മൈസൂർ ദസറ ജംബൂ സവാരി', text: '750 കിലോ സ്വർണ്ണ അമ്പാരിയിലെ ദേവിയുടെ എഴുന്നള്ളത്ത്.', startPercent: 60 },
            { title: 'ചാമുണ്ഡി മലയും മൈസൂർ പാക്കും', text: 'നന്ദി പ്രതിമയും ഗുരു സ്വീറ്റ്സിലെ മൈസൂർ പാക്കും.', startPercent: 85 }
          ]
        },
        deep_history: {
          language: 'ml',
          languageNativeName: 'മലയാളം',
          estimatedDuration: '6 min',
          fullText: 'മൈസൂരിന്റെ ചരിത്രം പരിശോധിച്ചാൽ കൃഷ്ണരാജ വൊഡയാർ നാലാമന്റെ കാലഘട്ടം സുവർണ്ണകാലമായിരുന്നു. 1902-ൽ ഏഷ്യയിലെ തന്നെ ആദ്യ ജലവൈദ്യുത പദ്ധതി ശിവനസമുദ്രത്തിൽ സ്ഥാപിച്ച് വൈദ്യുതി എത്തിച്ച നാടാണ് മൈസൂർ.\n\n1912-ൽ പണിപൂർത്തിയായ ഇന്നത്തെ കൊട്ടാരം ഹിന്ദു, ഇസ്ലാമിക്, രജപുത്, ഗോഥിക് ശൈലികളുടെ മനോഹരമായ സംഗമമാണ്. മൈസൂർ പട്ടും ചന്ദനവും ഈ നാടിന്റെ അഭിമാന പൈതൃകങ്ങളാണ്.',
          sections: [
            { title: 'രാജവംശ ഉത്ഭവം', text: '1399 മുതൽ ടിപ്പു സുൽത്താന് ശേഷമുള്ള അധികാരം തിരിച്ചുപിടിക്കൽ.', startPercent: 0 },
            { title: '1897-ലെ തീപിടുത്തവും പുനർനിർമ്മാണവും', text: 'തീപിടിക്കാത്ത കരിങ്കല്ലിൽ തീർത്ത പുതിയ കൊട്ടാരം.', startPercent: 30 },
            { title: 'നാലാം കൃഷ്ണരാജ വൊഡയാറുടെ ഭരണം', text: 'ആദ്യ ജലവൈദ്യുതിയും സർവകലാശാലകളും സ്ഥാപിച്ച പ്രബുദ്ധ ഭരണം.', startPercent: 65 },
            { title: 'മൈസൂർ പാരമ്പര്യം', text: 'ചന്ദനവും പട്ടും ദസറയുടെ ലോക പ്രശസ്തിയും.', startPercent: 85 }
          ]
        }
      }
    },
    faqList: [
      {
        id: 'mysuru-q1',
        category: 'founder',
        question: {
          en: 'Who built the current Mysore Palace and when?',
          kn: 'ಪ್ರಸ್ತುತ ಮೈಸೂರು ಅರಮನೆಯನ್ನು ಯಾರು ಮತ್ತು ಯಾವಾಗ ನಿರ್ಮಿಸಿದರು?',
          te: 'ప్రస్తుత మైసూరు ప్యాలెస్‌ను ఎవరు మరియు ఎప్పుడు నిర్మించారు?',
          hi: 'वर्तमान मैसूर महल का निर्माण किसने और कब कराया था?',
          ta: 'தற்போதைய மைசூர் அரண்மனையை யார், எப்போது கட்டினார்கள்?',
          ml: 'ഇന്നത്തെ മൈസൂർ കൊട്ടാരം നിർമ്മിച്ചത് ആരാണ്, എപ്പോഴാണ്?'
        },
        answer: {
          en: 'After the old wooden palace burned down in 1897, Regent Maharani Kempananjammanni commissioned renowned British architect Lord Henry Irwin. Construction started in 1897 and was completed in 1912 during the reign of Maharaja Krishna Raja Wadiyar IV.',
          kn: '1897 ರಲ್ಲಿ ಹಳೆಯ ಮರದ ಅರಮನೆ ಸುಟ್ಟುಹೋದ ನಂತರ, ಮಹಾರಾಣಿ ಕೆಂಪನಂಜಮ್ಮಣ್ಣಿಯವರು ಬ್ರಿಟಿಷ್ ವಾಸ್ತುಶಿಲ್ಪಿ ಲಾರ್ಡ್ ಹೆನ್ರಿ ಇರ್ವಿನ್ ಅವರಿಗೆ ಹೊಸ ಅರಮನೆ ವಿನ್ಯಾಸ ಮಾಡಲು ವಹಿಸಿದರು. ಇದು 1912 ರಲ್ಲಿ ನಾಲ್ವಡಿ ಕೃಷ್ಣರಾಜ ಒಡೆಯರ ಕಾಲದಲ್ಲಿ ಪೂರ್ಣಗೊಂಡಿತು.',
          te: '1897లో పాత చెక్క ప్యాలెస్ అగ్నిప్రమాదంలో కాలిపోయిన తరువాత, మహారాణి కెంపనంజమ్మణ్ణి బ్రిటిష్ ఆర్కిటెక్ట్ హెన్రీ ఇర్విన్‌కు నిర్మాణ బాధ్యత అప్పగించారు. ఈ ప్యాలెస్ 1912లో నాల్గవ కృష్ణరాజ ఒడయార్ పాలనలో పూర్తయింది.',
          hi: '1897 में पुराने लकड़ी के महल के जल जाने के बाद महारानी केंपनंजम्मण्णी ने ब्रिटिश वास्तुकार लॉर्ड हेनरी इरविन को इसका कार्य सौंपा। इसका निर्माण 1897 में शुरू हुआ और 1912 में महाराजा कृष्णराज वाडियार चतुर्थ के शासनकाल में पूरा हुआ।',
          ta: '1897 இல் பழைய மர அரண்மனை தீக்கிரையான பிறகு, மகாராணி கெம்பநஞ்சம்மண்ணி பிரிட்டிஷ் கட்டட கலைஞர் லார்ட் ஹென்றி இர்வினை நியமித்தார். 1912 இல் நான்காம் கிருஷ்ணராஜ உடையார் ஆட்சியில் இது கட்டி முடிக்கப்பட்டது.',
          ml: '1897-ൽ പഴയ തടി കൊട്ടാരം കത്തിനശിച്ചപ്പോൾ മഹാറാണി കെമ്പനഞ്ചമ്മണ്ണി ബ്രിട്ടീഷ് ആർക്കിടെക്റ്റ് ഹെൻറി ഇർവിനെ ചുമതലപ്പെടുത്തി. 1912-ൽ കൃഷ്ണരാജ വൊഡയാർ നാലാമന്റെ കാലത്താണ് നിർമ്മാണം പൂർത്തിയായത്.'
        }
      },
      {
        id: 'mysuru-q2',
        category: 'architecture',
        question: {
          en: 'What architectural style is the Mysore Palace built in?',
          kn: 'ಮೈಸೂರು ಅರಮನೆಯನ್ನು ಯಾವ ವಾಸ್ತುಶಿಲ್ಪ ಶೈಲಿಯಲ್ಲಿ ನಿರ್ಮಿಸಲಾಗಿದೆ?',
          te: 'మైసూరు ప్యాలెస్ ఏ వాస్తుశిల్ప శైలిలో నిర్మించబడింది?',
          hi: 'मैसूर पैलेस किस स्थापत्य शैली में निर्मित है?',
          ta: 'மைசூர் அரண்மனை எந்த கட்டடக்கலையின் பாணியில் கட்டப்பட்டது?',
          ml: 'മൈസൂർ കൊട്ടാരം ഏത് ശില്പകലാ ശൈലിയിലാണ് നിർമ്മിച്ചിരിക്കുന്നത്?'
        },
        answer: {
          en: 'The palace is built in the Indo-Saracenic architectural style, which blends Hindu Dravidian, Rajput, Islamic Mughal, and Gothic design elements, characterized by pink marble domes, granite archways, and Belgian stained glass.',
          kn: 'ಅರಮನೆಯನ್ನು ಇಂಡೋ-ಸಾರ್ಸೆನಿಕ್ ಶೈಲಿಯಲ್ಲಿ ನಿರ್ಮಿಸಲಾಗಿದ್ದು, ಇದರಲ್ಲಿ ಹಿಂದೂ, ರಜಪೂತ, ಇಸ್ಲಾಮಿಕ್ ಮೊಘಲ್ ಮತ್ತು ಗೋಥಿಕ್ ಶೈಲಿಗಳ ಸುಂದರ ಸಮ್ಮಿಶ್ರಣವಿದೆ.',
          te: 'ఈ ప్యాలెస్ ఇండో-సార్సెనిక్ శైలిలో నిర్మించబడింది. ఇందులో హిందూ, రాజపుత్ర, మొఘల్ మరియు గోతిక్ నిర్మాణ శైలుల అద్భుత సమ్మేళనం కనిపిస్తుంది.',
          hi: 'यह महल इंडो-सरैसेनिक शैली में निर्मित है, जो हिंदू, राजपूत, इस्लामिक और गोथिक वास्तुकला का सामंजस्यपूर्ण मिश्रण है।',
          ta: 'இந்த அரண்மனை இந்தோ-சாரசெனிக் பாணியில் கட்டப்பட்டது. இதில் இந்து, ராஜபுத்திர, முகலாய மற்றும் கோதிக் கட்டடக் கூறுகள் ஒருங்கிணைக்கப்பட்டுள்ளன.',
          ml: 'ഈ കൊട്ടാരം ഇൻഡോ-സാരസെനിക് ശൈലിയിലാണ് നിർമ്മിച്ചിരിക്കുന്നത്. ഹിന്ദു, രജപുത്, ഇസ്ലാമിക്, ഗോഥിക് ശില്പകലാ ഘടകങ്ങളുടെ സമന്വയമാണിത്.'
        }
      }
    ]
  }
};

// =========================================================================
// MULTILINGUAL DETAIL DATASETS (HAMPI & MYSURU)
// Providing authentic, verified historical timelines, architecture highlights,
// facts, and cultural lore across 6 languages (en, kn, te, hi, ta, ml).
// =========================================================================

const HAMPI_MULTILINGUAL_TIMELINE: Record<VoiceGuideLanguage, HistoricalMilestone[]> = {
  en: [
    {
      yearOrEra: '3rd Century BCE',
      event: 'Ashokan Rock Edicts at Nittur & Udegolam',
      rulerOrDynasty: 'Mauryan Empire (Emperor Ashoka)',
      details: 'Minor rock edicts of Emperor Ashoka establish that the Tungabhadra valley was part of the southern Mauryan province of Isila.',
      isDocumentedHistory: true
    },
    {
      yearOrEra: '1336 CE',
      event: 'Foundation of Vijayanagara Empire',
      rulerOrDynasty: 'Sangama Dynasty (Harihara I & Bukka Raya I)',
      details: 'Founded under the spiritual guidance of Sage Vidyaranya of the Sringeri Sharada Peetham to protect South Indian heritage.',
      isDocumentedHistory: true
    },
    {
      yearOrEra: '1509 – 1529 CE',
      event: 'Golden Age of Krishna Deva Raya',
      rulerOrDynasty: 'Tuluva Dynasty (Emperor Sri Krishna Deva Raya)',
      details: 'Construction of the iconic Stone Chariot, the massive outer gopuram of Virupaksha Temple, and the Krishna Temple complex celebrating Udayagiri victory.',
      isDocumentedHistory: true
    },
    {
      yearOrEra: '1565 CE',
      event: 'Battle of Talikota (Rakkasatangadi)',
      rulerOrDynasty: 'Deccan Sultanates Alliance vs Vijayanagara',
      details: 'The combined armies of the Bijapur, Golconda, Ahmednagar, and Bidar sultanates defeated the Vijayanagara forces; the capital was systematically ransacked over six months.',
      isDocumentedHistory: true
    },
    {
      yearOrEra: '1986 CE',
      event: 'Inscribed as UNESCO World Heritage Site',
      rulerOrDynasty: 'Republic of India / UNESCO',
      details: 'Recognized for over 1,600 surviving monuments across 41.8 square kilometers along the Tungabhadra riverbanks.',
      isDocumentedHistory: true
    }
  ],
  kn: [
    {
      yearOrEra: 'ಕ್ರಿ.ಪೂ. 3ನೇ ಶತಮಾನ',
      event: 'ನಿಟ್ಟೂರು & ಉದೇಗೋಳಂನಲ್ಲಿ ಅಶೋಕನ ಶಿಲಾಶಾಸನಗಳು',
      rulerOrDynasty: 'ಮೌರ್ಯ ಸಾಮ್ರಾಜ್ಯ (ಚಕ್ರವರ್ತಿ ಅಶೋಕ)',
      details: 'ಅಶೋಕ ಚಕ್ರವರ್ತಿಯ ಶಿಲಾಶಾಸನಗಳು ತುಂಗಭದ್ರಾ ಕಣಿವೆಯು ಮೌರ್ಯರ ದಕ್ಷಿಣ ಪ್ರಾಂತ್ಯವಾದ ಇಸಿಲಾದ ಪ್ರಮುಖ ಭಾಗವಾಗಿತ್ತೆಂದು ಸಾಬೀತುಪಡಿಸುತ್ತವೆ.',
      isDocumentedHistory: true
    },
    {
      yearOrEra: 'ಕ್ರಿ.ಶ. 1336',
      event: 'ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯದ ಸ್ಥಾಪನೆ',
      rulerOrDynasty: 'ಸಂಗಮ ರಾಜವಂಶ (ಹರಿಹರ I & ಬುಕ್ಕರಾಯ I)',
      details: 'ದಕ್ಷಿಣ ಭಾರತದ ಧರ್ಮ ಮತ್ತು ಸಂಸ್ಕೃತಿಯನ್ನು ರಕ್ಷಿಸಲು ಶೃಂಗೇರಿ ಶಾರದಾ ಪೀಠದ ಜಗದ್ಗುರು ಶ್ರೀ ವಿದ್ಯಾರಣ್ಯರ ಆಶೀರ್ವಾದ ಹಾಗೂ ಮಾರ್ಗದರ್ಶನದಲ್ಲಿ ಸ್ಥಾಪಿಸಲಾಯಿತು.',
      isDocumentedHistory: true
    },
    {
      yearOrEra: 'ಕ್ರಿ.ಶ. 1509 – 1529',
      event: 'ಶ್ರೀ ಕೃಷ್ಣದೇವರಾಯರ ಸುವರ್ಣ ಯುಗ',
      rulerOrDynasty: 'ತುಳುವ ರಾಜವಂಶ (ಶ್ರೀ ಕೃಷ್ಣದೇವರಾಯ)',
      details: 'ವಿಶ್ವವಿಖ್ಯಾತ ಏಕಶಿಲಾ ಕಲ್ಲಿನ ರಥ, ವಿಜಯ ವಿಠ್ಠಲ ದೇಗುಲದ ಸಪ್ತಸ್ವರ ಸಂಗೀತ ಕಂಬಗಳು ಮತ್ತು ವಿರೂಪಾಕ್ಷ ದೇವಾಲಯದ 160 ಅಡಿ ಎತ್ತರದ ರಾಜಗೋಪುರದ ನಿರ್ಮಾಣ.',
      isDocumentedHistory: true
    },
    {
      yearOrEra: 'ಕ್ರಿ.ಶ. 1565',
      event: 'ತಾಳಿಕೋಟೆ ಕದನ (ರಕ್ಕಸತಂಗಡಿ)',
      rulerOrDynasty: 'ದಖನ್ ಸುಲ್ತಾನರ ಒಕ್ಕೂಟ ವಿರುದ್ಧ ವಿಜಯನಗರ',
      details: 'ಸುಲ್ತಾನರ ಒಕ್ಕೂಟ ಸೈನ್ಯದ ಆಕ್ರಮಣದಿಂದ ವಿಜಯನಗರ ಸೈನ್ಯ ಪತನಗೊಂಡಿತು; ಆರು ತಿಂಗಳ ಕಾಲ ಭವ್ಯ ರಾಜಧಾನಿಯನ್ನು ಲೂಟಿ ಮಾಡಲಾಯಿತು.',
      isDocumentedHistory: true
    },
    {
      yearOrEra: 'ಕ್ರಿ.ಶ. 1986',
      event: 'ಯುನೆಸ್ಕೋ ವಿಶ್ವ ಪರಂಪರೆ ತಾಣವಾಗಿ ಘೋಷಣೆ',
      rulerOrDynasty: 'ಭಾರತ ಗಣರಾಜ್ಯ / ಯುನೆಸ್ಕೋ',
      details: 'ತುಂಗಭದ್ರಾ ನದಿಯ ತೀರದಲ್ಲಿ 41.8 ಚದರ ಕಿಲೋಮೀಟರ್ ವ್ಯಾಪ್ತಿಯಲ್ಲಿರುವ 1,600 ಕ್ಕೂ ಹೆಚ್ಚು ರಕ್ಷಿತ ಸ್ಮಾರಕಗಳ ಅಧಿಕೃತ ಯುನೆಸ್ಕೋ ಮಾನ್ಯತೆ.',
      isDocumentedHistory: true
    }
  ],
  te: [
    {
      yearOrEra: 'క్రీ.పూ. 3వ శతాబ్దం',
      event: 'నిట్టూరు & ఉదేగోళం అశోకుని రాతి శాసనాలు',
      rulerOrDynasty: 'మౌర్య సామ్రాజ్యం (అశోక చక్రవర్తి)',
      details: 'అశోక చక్రవర్తి లఘు శిలాశాసనాల ద్వారా తుంగభద్ర నదీ లోయ మౌర్యుల దక్షిణ ఇసిలా రాష్ట్రంలో అంతర్భాగంగా ఉండేదని తెలుస్తుంది.',
      isDocumentedHistory: true
    },
    {
      yearOrEra: 'క్రీ.శ. 1336',
      event: 'విజయనగర సామ్రాజ్య ఆవిర్భావం',
      rulerOrDynasty: 'సంగమ వంశం (మొదటి హరిహర రాయలు & మొదటి బుక్క రాయలు)',
      details: 'శృంగేరి శారదా పీఠాధిపతి విద్యారణ్య స్వాముల దివ్య మార్గదర్శకత్వంలో దక్షిణ భారతీయ సంస్కృతి రక్షణకై స్థాపించబడింది.',
      isDocumentedHistory: true
    },
    {
      yearOrEra: 'క్రీ.శ. 1509 – 1529',
      event: 'శ్రీకృష్ణదేవరాయల స్వర్ణయుగం',
      rulerOrDynasty: 'తుళువ వంశం (ఆంధ్రభోజ శ్రీకృష్ణదేవరాయలు)',
      details: 'విఠ్ఠల ఆలయంలోని ప్రసిద్ధ రాతి రథం, సప్తస్వరాలు పలికే సంగీత స్తంభాలు మరియు విరూపాక్ష దేవాలయ రాజగోపురం నిర్మాణం జరిగింది.',
      isDocumentedHistory: true
    },
    {
      yearOrEra: 'క్రీ.శ. 1565',
      event: 'తళ్ళికోట (రాక్షసతంగడి) యుద్ధం',
      rulerOrDynasty: 'దక్కన్ సుల్తానేట్ల కూటమి vs విజయనగరం',
      details: 'సుల్తానుల సంయుక్త బలగాలు విజయనగర సేనలను ఓడించాయి; ఈ రాజధాని నగరం ఆరు నెలల పాటు ధ్వంసానికి గురైంది.',
      isDocumentedHistory: true
    },
    {
      yearOrEra: 'క్రీ.శ. 1986',
      event: 'యునెస్కో ప్రపంచ వారసత్వ సంపద గుర్తింపు',
      rulerOrDynasty: 'భారత ప్రభుత్వం / యునెస్కో',
      details: 'తుంగభద్ర నదీ తీరాన 41.8 చదరపు కిలోమీటర్లలో విస్తరించిన 1,600 పైగా ప్రాచీన కట్టడాలను ప్రపంచ వారసత్వంగా గుర్తించారు.',
      isDocumentedHistory: true
    }
  ],
  hi: [
    {
      yearOrEra: 'तीसरी शताब्दी ईसा पूर्व',
      event: 'निट्टूर और उदेगोलम में अशोक के शैल अभिलेख',
      rulerOrDynasty: 'मौर्य साम्राज्य (सम्राट अशोक)',
      details: 'सम्राट अशोक के लघु शिलालेख सिद्ध करते हैं कि तुंगभद्रा नदी घाटी मौर्य साम्राज्य के दक्षिणी प्रांत इसिला का हिस्सा थी।',
      isDocumentedHistory: true
    },
    {
      yearOrEra: '1336 ईस्वी',
      event: 'विजयनगर साम्राज्य की स्थापना',
      rulerOrDynasty: 'संगम वंश (हरिहर प्रथम व बुक्का राय प्रथम)',
      details: 'शृंगेरी शारदा पीठ के संत विद्यारण्य के आध्यात्मिक मार्गदर्शन में दक्षिण भारतीय धर्म व संस्कृति की रक्षा हेतु स्थापित।',
      isDocumentedHistory: true
    },
    {
      yearOrEra: '1509 – 1529 ईस्वी',
      event: 'सम्राट कृष्णदेवराय का स्वर्ण युग',
      rulerOrDynasty: 'तुलुव वंश (सम्राट श्री कृष्णदेवराय)',
      details: 'प्रसिद्ध एकाश्म प्रस्तर रथ, विट्ठल मंदिर के संगीतमय पाषाण स्तंभ और विरुपाक्ष मंदिर के विशाल गोपुरम का निर्माण।',
      isDocumentedHistory: true
    },
    {
      yearOrEra: '1565 ईस्वी',
      event: 'तालिकोटा का ऐतिहासिक युद्ध',
      rulerOrDynasty: 'दक्कन सल्तनत गठबंधन बनाम विजयनगर',
      details: 'दक्कन की संयुक्त सल्तनतों द्वारा विजयनगर की पराजय; छह महीनों तक ऐतिहासिक राजधानी को योजनाबद्ध तरीके से नष्ट किया गया।',
      isDocumentedHistory: true
    },
    {
      yearOrEra: '1986 ईस्वी',
      event: 'यूनेस्को विश्व धरोहर स्थल घोषित',
      rulerOrDynasty: 'भारत गणराज्य / यूनेस्को',
      details: 'तुंगभद्रा के तट पर 41.8 वर्ग किलोमीटर क्षेत्र में 1,600 से अधिक जीवित स्मारकों को संरक्षित किया गया।',
      isDocumentedHistory: true
    }
  ],
  ta: [
    {
      yearOrEra: 'கி.மு. 3 ஆம் நூற்றாண்டு',
      event: 'நிட்டூர் & உதேகோளத்தில் அசோகரின் பாறைக் கல்வெட்டுகள்',
      rulerOrDynasty: 'மௌரியப் பேரரசு (பேரரசர் அசோகர்)',
      details: 'அசோகரின் சிறு பாறைக் கல்வெட்டுகள் துங்கபத்ரா பள்ளத்தாக்கு மௌரியர்களின் தெற்கு மாகாணமான இசிலாவின் பகுதி என்பதை உறுதிப்படுத்துகின்றன.',
      isDocumentedHistory: true
    },
    {
      yearOrEra: 'கி.பி. 1336',
      event: 'விஜயநகரப் பேரரசு உருவாக்கம்',
      rulerOrDynasty: 'சங்கம வம்சம் (ஹரிஹரர் I & புக்கர் I)',
      details: 'சிருங்கேரி சாரதா பீடத்தின் துறவி வித்யாரண்யரின் ஆன்மீக வழிகாட்டுதலின் கீழ் தென்னிந்தியப் பண்பாட்டைப் பாதுகாக்க நிறுவப்பட்டது.',
      isDocumentedHistory: true
    },
    {
      yearOrEra: 'கி.பி. 1509 – 1529',
      event: 'கிருஷ்ணதேவராயரின் பொற்காலம்',
      rulerOrDynasty: 'துளுவ வம்சம் (பேரரசர் கிருஷ்ணதேவராயர்)',
      details: 'ஒற்றைக்கல் தேர், விட்டலா கோவிலின் இசை எழுப்பும் தூண்கள் மற்றும் விருபாக்ஷர் ஆலயத்தின் பிரம்மாண்ட ராஜகோபுரம் அமைத்தல்.',
      isDocumentedHistory: true
    },
    {
      yearOrEra: 'கி.பி. 1565',
      event: 'தாலிகோட்டைப் போர் (ரக்கசதங்கடி)',
      rulerOrDynasty: 'தக்காண சுல்தான்கள் கூட்டணி vs விஜயநகரம்',
      details: 'சுல்தான்களின் கூட்டுப் படைகளால் விஜயநகரம் வீழ்த்தப்பட்டு, தலைநகரம் ஆறு மாதங்களாகச் சூறையாடப்பட்டது.',
      isDocumentedHistory: true
    },
    {
      yearOrEra: 'கி.பி. 1986',
      event: 'யுனெஸ்கோ உலக பாரம்பரியத் தளம்',
      rulerOrDynasty: 'இந்தியக் குடியரசு / யுனெஸ்கோ',
      details: 'துங்கபத்ரா நதிக்கரையில் 41.8 சதுர கிலோமீட்டரில் அமைந்துள்ள 1,600 க்கும் மேற்பட்ட நினைவுச் சின்னங்களின் பாதுகாப்பு அங்கீகாரம்.',
      isDocumentedHistory: true
    }
  ],
  ml: [
    {
      yearOrEra: 'ബി.സി. 3-ാം നൂറ്റാണ്ട്',
      event: 'നിട്ടൂരിലെയും ഉദേഗോളത്തിലെയും അശോക ശിലാശാസനങ്ങൾ',
      rulerOrDynasty: 'മൗര്യ സാമ്രാജ്യം (അശോക ചക്രവർത്തി)',
      details: 'തുംഗഭദ്ര നദീതടം മൗര്യ സാമ്രാജ്യത്തിന്റെ തെക്കൻ പ്രവിശ്യയായ ഇസിലയുടെ ഭാഗമായിരുന്നുവെന്ന് തെളിയിക്കുന്ന ശാസനങ്ങൾ.',
      isDocumentedHistory: true
    },
    {
      yearOrEra: 'എ.ഡി. 1336',
      event: 'വിജയനഗര സാമ്രാജ്യ സ്ഥാപനം',
      rulerOrDynasty: 'സംഗമ രാജവംശം (ഹരിഹരൻ I & ബുക്കരായൻ I)',
      details: 'ശൃംഗേരി ശാരദാ പീഠത്തിലെ വിദ്യാർത്ഥ ഗുരുവായ വിദ്യാരണ്യ സ്വാമികളുടെ അനുഗ്രഹത്തോടെ സ്ഥാപിതമായി.',
      isDocumentedHistory: true
    },
    {
      yearOrEra: 'എ.ഡി. 1509 – 1529',
      event: 'ശ്രീകൃഷ്ണദേവരായരുടെ സുവർണ്ണ കാലം',
      rulerOrDynasty: 'തുളുവ രാജവംശം (ശ്രീകൃഷ്ണദേവരായർ)',
      details: 'പ്രശസ്തമായ ശിലാരഥം, വിട്ടല ക്ഷേത്രത്തിലെ സംഗീതത്തൂണുകൾ, വിരൂപാക്ഷ രാജഗോപുരം എന്നിവയുടെ നിർമ്മാണം പൂർത്തിയായി.',
      isDocumentedHistory: true
    },
    {
      yearOrEra: 'എ.ഡി. 1565',
      event: 'തളിക്കോട്ട യുദ്ധം',
      rulerOrDynasty: 'ഡെക്കാൻ സുൽത്താനേറ്റ് സഖ്യം vs വിജയനഗരം',
      details: 'ഡെക്കാൻ സുൽത്താന്മാരുടെ സംയുക്ത സേന വിജയനഗരത്തെ തോൽപ്പിക്കുകയും നഗരം ആറുമാസത്തോളം കൊള്ളയടിക്കപ്പെടുകയും ചെയ്തു.',
      isDocumentedHistory: true
    },
    {
      yearOrEra: 'എ.ഡി. 1986',
      event: 'യുനെസ്കോ ലോക പൈതൃക പദവി',
      rulerOrDynasty: 'ഭാരത സർക്കാർ / യുനെസ്കോ',
      details: 'തുംഗഭദ്ര തീരത്തെ 41.8 ചതുരശ്ര കിലോമീറ്ററിലെ 1,600-ലധികം ചരിത്ര സ്മാരകങ്ങളുടെ സംരക്ഷണത്തിനായുള്ള അംഗീകാരം.',
      isDocumentedHistory: true
    }
  ]
};

const HAMPI_MULTILINGUAL_ARCHITECTURE: Record<VoiceGuideLanguage, ArchitectureHighlight[]> = {
  en: [
    {
      feature: 'Vijayanagara Dravidian Temple Architecture',
      description: 'Monumental stepped gopurams, sprawling open pillared mandapas (kalyana mandapas), and monolithic relief bas-reliefs on granite.',
      periodOrStyle: '14th–16th Century Vijayanagara Dravidian'
    },
    {
      feature: 'Musical Pillars of Vittala Temple',
      description: '56 monolithic resonant granite shafts that produce acoustic tones of Indian classical musical instruments when gently struck.',
      periodOrStyle: '16th Century Tuluva Period'
    },
    {
      feature: 'Monolithic Stone Chariot (Garuda Shrine)',
      description: 'One of three famous stone chariots in India, built on revolving stone wheels and intricately carved granite blocks.',
      periodOrStyle: '1513 CE (Reign of Krishna Deva Raya)'
    },
    {
      feature: 'Indo-Islamic Royal Enclosure (Lotus Mahal & Elephant Stables)',
      description: 'Multi-lobed cusped arches, vaulted domes, and stucco plasterwork reflecting respectful synthesis between Hindu and Islamic courtly architecture.',
      periodOrStyle: '15th–16th Century Indo-Islamic'
    }
  ],
  kn: [
    {
      feature: 'ವಿಜಯನಗರ ದ್ರಾವಿಡ ದೇವಾಲಯ ವಾಸ್ತುಶಿಲ್ಪ',
      description: 'ಭವ್ಯವಾದ ಹಂತ-ಹಂತದ ರಾಜಗೋಪುರಗಳು, ಕೆತ್ತನೆಗಳ ಸಾಲು ಕಂಬಗಳ ಕಲ್ಯಾಣ ಮಂಟಪಗಳು ಮತ್ತು ಗ್ರಾನೈಟ್ ಕಲ್ಲಿನ ಸೂಕ್ಷ್ಮ ಶಿಲ್ಪಕಲೆ.',
      periodOrStyle: '14-16ನೇ ಶತಮಾನದ ವಿಜಯನಗರ ದ್ರಾವಿಡ ಶೈಲಿ'
    },
    {
      feature: 'ವಿಜಯ ವಿಠ್ಠಲ ದೇಗುಲದ ಸಂಗೀತ ಕಂಬಗಳು',
      description: '56 ಏಕಶಿಲಾ ಗ್ರಾನೈಟ್ ಸ್ತಂಭಗಳು; ಇವುಗಳನ್ನು ಮೆಲ್ಲಗೆ ತಟ್ಟಿದರೆ ಶಾಸ್ತ್ರೀಯ ಸಂಗೀತ ವಾದ್ಯಗಳ ಸಪ್ತಸ್ವರಗಳು ನಾದ ಹೊರಡಿಸುತ್ತವೆ.',
      periodOrStyle: '16ನೇ ಶತಮಾನದ ತುಳುವ ಕಾಲ'
    },
    {
      feature: 'ಏಕಶಿಲಾ ಕಲ್ಲಿನ ರಥ (ಗರುಡ ಮಂಟಪ)',
      description: 'ಭಾರತದ ಮೂರು ಪ್ರಸಿದ್ಧ ಕಲ್ಲಿನ ರಥಗಳಲ್ಲೊಂದು; ತಿರುಗುವ ಕಲ್ಲಿನ ಚಕ್ರಗಳು ಮತ್ತು ಸೂಕ್ಷ್ಮ ಕೆತ್ತನೆಯ ಕಲ್ಲಿನ ತುಂಡುಗಳಿಂದ ನಿರ್ಮಿತ.',
      periodOrStyle: 'ಕ್ರಿ.ಶ. 1513 (ಶ್ರೀ ಕೃಷ್ಣದೇವರಾಯರ ಆಳ್ವಿಕೆ)'
    },
    {
      feature: 'ಇಂಡೋ-ಇಸ್ಲಾಮಿಕ್ ಕಮಲ ಮಹಲ್ ಮತ್ತು ಆನೆ ಲಾಯ',
      description: 'ಕಮಾನುಗಳು, ಗುಮ್ಮಟಗಳು ಮತ್ತು ಗಾರೆ ಕೆತ್ತನೆಯ ಕೆಲಸಗಳೊಂದಿಗೆ ಹಿಂದೂ-ಇಸ್ಲಾಮಿಕ್ ರಾಜಮನೆತನದ ಸಾಮರಸ್ಯದ ವಾಸ್ತುಶಿಲ್ಪ.',
      periodOrStyle: '15-16ನೇ ಶತಮಾನದ ಇಂಡೋ-ಇಸ್ಲಾಮಿಕ್ ಶೈಲಿ'
    }
  ],
  te: [
    {
      feature: 'విజయనగర ద్రావిడ దేవాలయ వాస్తుశిల్పం',
      description: 'గంభీరమైన మెట్ల రాజగోపురాలు, సుందర స్తంభాల కళ్యాణ మండపాలు మరియు గ్రానైట్ రాతిపై చెక్కిన సజీవ శిల్పాలు.',
      periodOrStyle: '14-16 శతాబ్దాల విజయనగర ద్రావిడ శైలి'
    },
    {
      feature: 'విఠ్ఠల ఆలయ సంగీత స్తంభాలు',
      description: '56 ఏకశిలా గ్రానైట్ స్తంభాలు; వీటిని మెల్లగా తాకితే శాస్త్రీయ సంగీత వాద్యాల సప్తస్వరాలు స్పష్టంగా వినిపిస్తాయి.',
      periodOrStyle: '16వ శతాబ్దపు తుళువ శైలి'
    },
    {
      feature: 'ఏకశిలా రాతి రథం (గరుడ సన్నిధి)',
      description: 'భారతదేశంలోని అత్యంత ప్రసిద్ధ రాతి రథాలలో ఒకటి; తిరిగే రాతి చక్రాలు మరియు అపురూప శిల్పకళతో కూడినది.',
      periodOrStyle: 'క్రీ.శ. 1513 (కృష్ణదేవరాయల పాలన)'
    },
    {
      feature: 'ఇండో-ఇస్లామిక్ లోటస్ మహల్ & గజశాల',
      description: 'కమాన్లు, గుమ్మటాలు మరియు సున్నపు పూత శిల్పాలతో హిందూ-ఇస్లామిక్ దర్బారు శైలుల అద్భుత సమ్మేళనం.',
      periodOrStyle: '15-16 శతాబ్దాల ఇండో-ఇస్లామిక్ శైలి'
    }
  ],
  hi: [
    {
      feature: 'विजयनगर द्रविड़ मंदिर वास्तुकला',
      description: 'विशाल सोपानयुक्त गोपुरम, नक्काशीदार स्तंभों वाले कल्याण मंडप और ग्रेनाइट पाषाण पर जीवंत उत्कीर्ण कला।',
      periodOrStyle: '14वीं–16वीं शताब्दी विजयनगर द्रविड़ शैली'
    },
    {
      feature: 'विट्ठल मंदिर के संगीतमय पाषाण स्तंभ',
      description: '56 एकाश्म ग्रेनाइट स्तंभ जिन्हें धीरे से थपथपाने पर भारतीय शास्त्रीय वाद्ययंत्रों के सात स्वर गूंजते हैं।',
      periodOrStyle: '16वीं सदी तुलुव काल'
    },
    {
      feature: 'एकाश्म प्रस्तर रथ (गरुड़ मंदिर)',
      description: 'भारत के तीन प्रसिद्ध पाषाण रथों में से एक; घूमने वाले पहियों और अलंकृत नक्काशीदार पत्थरों से निर्मित।',
      periodOrStyle: '1513 ईस्वी (कृष्णदेवराय शासनकाल)'
    },
    {
      feature: 'इंडो-इस्लामिक लोटस महल और हाथी अस्तबल',
      description: 'मेहराबदार गुंबदों और प्लास्टर नक्काशी के साथ हिंदू और इस्लामिक दरबारी वास्तुकला का अनुपम सामंजस्य।',
      periodOrStyle: '15वीं–16वीं सदी इंडो-इस्लामिक शैली'
    }
  ],
  ta: [
    {
      feature: 'விஜயநகர திராவிடக் கோவில் கட்டடக்கலை',
      description: 'பிரம்மாண்ட அடுக்குக் கோபுரங்கள், தூண்கள் நிறைந்த கல்யாண மண்டபங்கள் மற்றும் கருங்கல்லில் செதுக்கப்பட்ட உயிரோட்டமான சிற்பங்கள்.',
      periodOrStyle: '14–16 ஆம் நூற்றாண்டு விஜயநகர திராவிட பாணி'
    },
    {
      feature: 'விட்டலா ஆலயத்தின் இசைத் தூண்கள்',
      description: '56 ஒற்றைக்கல் தூண்கள்; மெதுவாகத் தட்டினால் பாரம்பரிய இசைக்கருவிகளின் சப்தஸ்வர ஒலிகளை எழுப்புகின்றன.',
      periodOrStyle: '16 ஆம் நூற்றாண்டு துளுவ காலம்'
    },
    {
      feature: 'ஒற்றைக்கல் தேர் (கருடன் சன்னதி)',
      description: 'இந்தியாவின் மூன்று புகழ்பெற்ற கல் தேர்களில் ஒன்று; சுழலும் கல் சக்கரங்கள் மற்றும் நுட்பமான வேலைப்பாடுகள் கொண்ட வடிவம்.',
      periodOrStyle: 'கி.பி. 1513 (கிருஷ்ணதேவராயர் காலம்)'
    },
    {
      feature: 'இந்தோ-இஸ்லாமிய லோட்டஸ் மஹால் & யானைக் கூடம்',
      description: 'வளைவுகளும் குவிமாடங்களும் கொண்ட இந்து மற்றும் இஸ்லாமிய அரச கட்டடக் கலையின் இணக்கமான சங்கமம்.',
      periodOrStyle: '15–16 ஆம் நூற்றாண்டு இந்தோ-இஸ்லாமிய பாணி'
    }
  ],
  ml: [
    {
      feature: 'വിജയനഗര ദ്രാവിഡ ക്ഷേത്ര വാസ്തുവിദ്യ',
      description: 'ഗംഭീരമായ തട്ടുകളുള്ള രാജഗോപുരങ്ങൾ, മനോഹരമായ കൽത്തൂൺ മണ്ഡപങ്ങൾ, കൃഷ്ണശിലയിലെ ജീവസ്സുറ്റ കൊത്തുപണികൾ.',
      periodOrStyle: '14–16 നൂറ്റാണ്ടിലെ വിജയനഗര ദ്രാവിഡ ശൈലി'
    },
    {
      feature: 'വിട്ടല ക്ഷേത്രത്തിലെ സംഗീതത്തൂണുകൾ',
      description: 'തട്ടുമ്പോൾ ശാസ്ത്രീയ സംഗീത ഉപകരണങ്ങളുടെ സ്വരങ്ങൾ പൊഴിക്കുന്ന 56 ഗ്രാനൈറ്റ് സംഗീതത്തൂണുകൾ.',
      periodOrStyle: '16-ാം നൂറ്റാണ്ടിലെ തുളുവ കാലഘട്ടം'
    },
    {
      feature: 'ഏകശിലാ ശിലാരഥം (ഗരുഡ മണ്ഡപം)',
      description: 'ഇന്ത്യയിലെ മൂന്ന് പ്രശസ്തമായ കൽരഥങ്ങളിൽ ഒന്ന്; തിരിയുന്ന കൽച്ചക്രങ്ങളും അതിസൂക്ഷ്മമായ ശില്പകലയും.',
      periodOrStyle: 'എ.ഡി. 1513 (കൃഷ്ണദേവരായരുടെ ഭരണകാലം)'
    },
    {
      feature: 'ഇൻഡോ-ഇസ്ലാമിക് ലോട്ടസ് മഹലും ആനപ്പന്തിയും',
      description: 'ഹിന്ദു-ഇസ്ലാമിക് വാസ്തുവിദ്യയുടെ മനോഹരമായ സമന്വയം പ്രതിഫലിപ്പിക്കുന്ന കമാനങ്ങളും താഴികക്കുടങ്ങളും.',
      periodOrStyle: '15–16 നൂറ്റാണ്ടിലെ ഇൻഡോ-ഇസ്ലാമിക് ശൈലി'
    }
  ]
};

const HAMPI_MULTILINGUAL_FACTS: Record<VoiceGuideLanguage, string[]> = {
  en: [
    'In the early 16th century, Portuguese travelers Domingos Paes and Fernão Nunes recorded that Hampi was as large as Rome and the richest city in the world.',
    'Precious gemstones, rubies, and pearls were weighed and sold openly on the street bazaar paving stones of Pan Supari and Vittala Bazaar.',
    'Over 1,600 surviving monuments are protected across a 4,187-hectare archaeological park administered jointly by ASI and HWHAMA.'
  ],
  kn: [
    '16ನೇ ಶತಮಾನದ ಆರಂಭದಲ್ಲಿ, ಪೋರ್ಚುಗೀಸ್ ಪ್ರವಾಸಿಗರಾದ ಡೊಮಿಂಗೊ ಪಯಾಸ್ ಮತ್ತು ಫರ್ನಾವೊ ನ್ಯೂನ್ಸ್ ಹಂಪಿಯು ರೋಮ್ ನಗರದಷ್ಟೇ ವಿಶಾಲ ಹಾಗೂ ಜಗತ್ತಿನ ಅತ್ಯಂತ ಶ್ರೀಮಂತ ನಗರವೆಂದು ದಾಖಲಿಸಿದ್ದಾರೆ.',
    'ಪಾನ್ ಸುಪಾರಿ ಮತ್ತು ವಿಠ್ಠಲ ಬಜಾರ್‌ನ ಬೀದಿಗಳಲ್ಲಿ ವಜ್ರ, ಮಾಣಿಕ್ಯ ಮತ್ತು ಮುತ್ತುಗಳನ್ನು ಸೇರಿನಲ್ಲಿ ಅಳೆದು ಮುಕ್ತವಾಗಿ ವ್ಯಾಪಾರ ಮಾಡಲಾಗುತ್ತಿತ್ತು.',
    '4,187 ಹೆಕ್ಟೇರ್ ಪುರಾತತ್ವ ಉದ್ಯಾನವನದ ವ್ಯಾಪ್ತಿಯಲ್ಲಿ 1,600 ಕ್ಕೂ ಹೆಚ್ಚು ಉಳಿದುಕೊಂಡಿರುವ ಸ್ಮಾರಕಗಳನ್ನು ಭಾರತೀಯ ಪುರಾತತ್ವ ಇಲಾಖೆ (ASI) ಮತ್ತು ಹಂಪಾ ಪ್ರಾಧಿಕಾರ ಜಂಟಿಯಾಗಿ ಸಂರಕ್ಷಿಸುತ್ತಿವೆ.'
  ],
  te: [
    '16వ శతాబ్దం ప్రారంభంలో పోర్చుగీస్ యాత్రికులు డొమింగో పేస్ మరియు ఫెర్నావో నూనెజ్ హంపి నగరం రోమ్ నగరమంత విశాలమైనదని, ప్రపంచంలోనే అత్యంత సంపన్న నగరమని నమోదు చేశారు.',
    'పాన్ సుపారీ మరియు విఠ్ఠల బజార్ రాతి వీధులలో వజ్రాలు, రత్నాలు, ముత్యాలు కుప్పలుగా పోసి తూచి అమ్మేవారు.',
    '4,187 హెక్టార్ల పురావస్తు పార్కు పరిధిలో 1,600 పైగా ప్రాచీన కట్టడాలను ఏఎస్ఐ (ASI) మరియు హంపి అభివృద్ధి ప్రాధికార సంస్థ పరిరక్షిస్తున్నాయి.'
  ],
  hi: [
    '16वीं सदी की शुरुआत में पुर्तगाली यात्रियों डोमिंगो पेस और फर्नाओ नून्स ने लिखा था कि हम्पी रोम जितना विशाल और विश्व का सबसे समृद्ध नगर था।',
    'पान सुपारी और विट्ठल बाज़ार की खुली सड़कों पर हीरे, माणिक और मोतियों को तराजू में तौलकर खुलेआम बेचा जाता था।',
    'भारतीय पुरातत्व सर्वेक्षण (ASI) और हम्पी प्राधिकरण द्वारा 4,187 हेक्टेयर में फैले 1,600 से अधिक स्मारकों का संयुक्त संरक्षण किया जाता है।'
  ],
  ta: [
    '16 ஆம் நூற்றாண்டின் தொடக்கத்தில் போர்த்துகீசிய பயணிகளான டொமிங்கோ பயஸ் மற்றும் பெர்னாவ் நுனஸ், ஹம்பி ரோம் நகரத்தைப் போல பெரியதாகவும் உலகின் பணக்கார நகரமாகவும் இருந்ததாகப் பதிவு செய்தனர்.',
    'பான் சுபாரி மற்றும் விட்டலா பஜார் தெருக்களில் வைரங்கள், மாணிக்கங்கள் மற்றும் முத்துக்கள் வெளிப்படையாக அளந்து விற்கப்பட்டன.',
    'இந்திய தொல்பொருள் ஆய்வுத்துறை (ASI) மற்றும் ஹம்பி ஆணையம் இணைந்து 4,187 ஹெக்டேர் பரப்பளவில் உள்ள 1,600-க்கும் மேற்பட்ட நினைவுச் சின்னங்களை பாதுகாக்கின்றன.'
  ],
  ml: [
    'പതിനാറാം നൂറ്റാണ്ടിന്റെ തുടക്കത്തിൽ പോർച്ചുഗീസ് സഞ്ചാരികളായ ഡൊമിംഗോ പയസും ഫെർണാവോ ന്യൂണസും ഹംപി റോമിനെപ്പോലെ വലുതും ലോകത്തിലെ ഏറ്റവും സമ്പന്നമായ നഗരവുമായിരുന്നുവെന്ന് രേഖപ്പെടുത്തി.',
    'പാൻ സുപാരി, വിട്ടല ബസാർ എന്നിവിടങ്ങളിലെ തുറന്ന ചന്തകളിൽ വജ്രങ്ങളും മാണിക്യങ്ങളും മുത്തുകളും പരസ്യമായി തൂക്കി വിറ്റിരുന്നു.',
    '4,187 ഹെക്ടർ വിസ്തൃതിയുള്ള പ്രദേശത്ത് അവശേഷിക്കുന്ന 1,600-ലധികം ചരിത്ര സ്മാരകങ്ങൾ പുരാവസ്തു വകുപ്പും ഹംപി അതോറിറ്റിയും സംരക്ഷിക്കുന്നു.'
  ]
};

const HAMPI_MULTILINGUAL_LEGENDS: Record<VoiceGuideLanguage, string[]> = {
  en: [
    'According to the Ramayana, Hampi was Kishkindha, the monkey kingdom of Vali and Sugriva. Anjanadri Hill across the river is venerated as the birthplace of Lord Hanuman.',
    'The sacred boulder-strewn landscape is said to be stones hurled by monkey warrior troops practicing for the march to Lanka.',
    'Virupaksha Temple’s inverted pinhole shadow of the main gopuram inside an inner dark chamber was used by ancient temple architects as a camera obscura.'
  ],
  kn: [
    'ರಾಮಾಯಣದ ಪ್ರಕಾರ ಹಂಪಿಯು ವಾಲಿ ಮತ್ತು ಸುಗ್ರೀವರ ವಾನರ ಸಾಮ್ರಾಜ್ಯ ಕಿಷ್ಕಿಂಧೆಯಾಗಿತ್ತು. ನದಿಯ ಆಚೆಗಿನ ಅಂಜನಾದ್ರಿ ಬೆಟ್ಟವನ್ನು ಹನುಮಂತನ ಜನ್ಮಸ್ಥಳವೆಂದು ಭಕ್ತಿಯಿಂದ ಪೂಜಿಸಲಾಗುತ್ತದೆ.',
    'ಇಲ್ಲಿನ ಬೃಹತ್ ಬಂಡೆಗಲ್ಲುಗಳ ಭೂಪ್ರದೇಶವು ಲಂಕಾ ಪಯಣದ ಸಿದ್ಧತೆಗಾಗಿ ವಾನರ ಸೇನೆ ಎಸೆದ ಬಂಡೆಗಳು ಎಂಬುದು ಜನಪದ ನಂಬಿಕೆ.',
    'ವಿರೂಪಾಕ್ಷ ದೇವಾಲಯದ ಒಳಗಿನ ಕತ್ತಲೆಯ ಕೋಣೆಯ ಗೋಡೆಯ ಮೇಲೆ ರಾಜಗೋಪುರದ ತಲೆಕೆಳಗಾದ ನೆರಳು ಮೂಡುವ ಅಪರೂಪದ ಆಪ್ಟಿಕಲ್ ತಂತ್ರಜ್ಞಾನವಿದೆ.'
  ],
  te: [
    'రామాయణం ప్రకారం హంపి వాలి, సుగ్రీవుల వానర రాజ్యం కిష్కింధ. తుంగభద్ర అవతలి అంజనాద్రి కొండను హనుమంతుని జన్మస్థలంగా కొలుస్తారు.',
    'ఇక్కడి బండరాళ్ల కొండలు లంకపై దాడి కోసం వానర సైన్యం సాధన చేస్తూ విసిరిన రాళ్ళని స్థానిక విశ్వాసం.',
    'విరూపాక్ష దేవాలయ అంతర్గత గది గోడపై ప్రధాన రాజగోపురం యొక్క తలక్రిందుల నీడ కనిపించే ప్రాచీన కెమెరా అబ్స్క్యూరా విజ్ఞానం ఉంది.'
  ],
  hi: [
    'रामायण के अनुसार हम्पी वानर राज बालि और सुग्रीव का किष्किंधा राज्य था। नदी पार स्थित अंजनाद्री पहाड़ी को भगवान हनुमान की जन्मस्थली माना जाता है।',
    'ऐसी जनश्रुति है कि यहाँ बिखरी विशाल शिलाएं लंका पर चढ़ाई के अभ्यास हेतु वानर सेना द्वारा फेंके गए पत्थर हैं।',
    'विरुपाक्ष मंदिर के गर्भगृह में मुख्य गोपुरम की उल्टी छाया दीवार पर दिखने का अनूठा प्राचीन कैमरा ऑब्स्क्यूरा प्रभाव है।'
  ],
  ta: [
    'இராமாயணத்தின்படி ஹம்பி வாலி மற்றும் சுக்ரீவனின் கிஷ்கிந்தா வானரப் பேரரசாகும். ஆற்றின் குறுக்கே உள்ள அஞ்சனாத்ரி மலை அனுமனின் அவதாரத் தலமாகப் போற்றப்படுகிறது.',
    'இங்குள்ள பிரம்மாண்ட பாறைக் குன்றுகள் இலங்கை நோக்கிச் செல்ல வானரப் படைகள் பயிற்சி செய்யும்போது எறிந்த கற்கள் என்பது நம்பிக்கை.',
    'விருபாக்ஷர் ஆலயத்தின் இருண்ட அறையின் சுவரில் பிரதான கோபுரத்தின் தலைகீழ் நிழல் தெரியும் உன்னத ஒளியியல் அதிசயம் உள்ளது.'
  ],
  ml: [
    'രാമായണ പ്രകാരം ഹംപി വാലിയുടെയും സുഗ്രീവന്റെയും വാനര രാജ്യമായ കിഷ്കിന്ധയായിരുന്നു. നദിക്കക്കരെയുള്ള അഞ്ജനാദ്രി മല ഹനുമാന്റെ ജന്മസ്ഥലമായി പൂജിക്കപ്പെടുന്നു.',
    'ലംകാ യാത്രയ്ക്ക് പരിശീലിച്ച വാനരസൈന്യം വലിച്ചെറിഞ്ഞ പാറക്കല്ലുകളാണ് ഇവിടെയുള്ള മലനിരകൾ എന്നാണ് ഐതിഹ്യം.',
    'വിരൂപാക്ഷ ക്ഷേത്രത്തിന്റെ ഉൾമുറിയിൽ പ്രധാന ഗോപുരത്തിന്റെ തലതിരിഞ്ഞ നിഴൽ ഭിത്തിയിൽ പതിക്കുന്ന പുരാതന ഒപ്റ്റിക്കൽ വിസ്മയം കാണാം.'
  ]
};

const MYSURU_MULTILINGUAL_TIMELINE: Record<VoiceGuideLanguage, HistoricalMilestone[]> = {
  en: [
    {
      yearOrEra: '1399 CE',
      event: 'Foundation of Yaduraya Wodeyar Dynasty',
      rulerOrDynasty: 'Wodeyar Dynasty (Yaduraya Wodeyar)',
      details: 'Founded by brothers Yaduraya and Krishnaraya who established a small principality under the suzerainty of Vijayanagara.',
      isDocumentedHistory: true
    },
    {
      yearOrEra: '1610 CE',
      event: 'First State Dasara Festival at Srirangapatna',
      rulerOrDynasty: 'Raja Wodeyar I',
      details: 'Instituted the state celebration of Navaratri Vijayanagara tradition on the throne of Mysore.',
      isDocumentedHistory: true
    },
    {
      yearOrEra: '1897 – 1912 CE',
      event: 'Reconstruction of Amba Vilas Palace',
      rulerOrDynasty: 'Maharani Kempananjammanni & Krishna Raja Wadiyar IV',
      details: 'After the old wooden palace burned down during a royal wedding in 1897, British architect Lord Henry Irwin was commissioned to build the modern Indo-Saracenic stone masterpiece.',
      isDocumentedHistory: true
    },
    {
      yearOrEra: '1902 – 1940 CE',
      event: 'Reign of Rajarshi Krishna Raja Wadiyar IV',
      rulerOrDynasty: 'Wodeyar Dynasty',
      details: 'Mysore was hailed by Mahatma Gandhi as "Rama Rajya" for establishing Asia’s first hydroelectric plant at Shivanasamudra, free primary education, and premier universities.',
      isDocumentedHistory: true
    }
  ],
  kn: [
    {
      yearOrEra: 'ಕ್ರಿ.ಶ. 1399',
      event: 'ಯದುರಾಯ ಒಡೆಯರ್ ರಾಜವಂಶದ ಸ್ಥಾಪನೆ',
      rulerOrDynasty: 'ಒಡೆಯರ್ ರಾಜವಂಶ (ಯದುರಾಯ ಒಡೆಯರ್)',
      details: 'ಯದುರಾಯ ಮತ್ತು ಕೃಷ್ಣರಾಯ ಸಹೋದರರು ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯದ ಆಶ್ರಯದಲ್ಲಿ ಮೈಸೂರು ಸಂಸ್ಥಾನದ ಅಡಿಪಾಯ ಹಾಕಿದರು.',
      isDocumentedHistory: true
    },
    {
      yearOrEra: 'ಕ್ರಿ.ಶ. 1610',
      event: 'ಶ್ರೀರಂಗಪಟ್ಟಣದಲ್ಲಿ ಮೊದಲ ರಾಜ್ಯ ದಸರಾ ಮಹೋತ್ಸವ',
      rulerOrDynasty: 'ರಾಜಾ ಒಡೆಯರ್ I',
      details: 'ವಿಜಯನಗರದ ನವರಾತ್ರಿ ಆಚರಣೆಯ ಸಂಪ್ರದಾಯವನ್ನು ಮೈಸೂರಿನ ಸಿಂಹಾಸನದ ಮೇಲೆ ವೈಭವೋಪೇತವಾಗಿ ಆರಂಭಿಸಲಾಯಿತು.',
      isDocumentedHistory: true
    },
    {
      yearOrEra: 'ಕ್ರಿ.ಶ. 1897 – 1912',
      event: 'ಅಂಬಾವಿಲಾಸ ಅರಮನೆಯ ಭವ್ಯ ಪುನರ್ನಿರ್ಮಾಣ',
      rulerOrDynasty: 'ಮಹಾರಾಣಿ ಕೆಂಪನಂಜಮ್ಮಣ್ಣಿ & ನಾಲ್ವಡಿ ಕೃಷ್ಣರಾಜ ಒಡೆಯರ್',
      details: '1897 ರಲ್ಲಿ ಮರದ ಹಳೆಯ ಅರಮನೆ ಅಗ್ನಿದುರಂತದಲ್ಲಿ ಸುಟ್ಟ ನಂತರ, ಬ್ರಿಟಿಷ್ ವಾಸ್ತುಶಿಲ್ಪಿ ಲಾರ್ಡ್ ಹೆನ್ರಿ ಇರ್ವಿನ್ ವಿನ್ಯಾಸದಲ್ಲಿ ಕಲ್ಲಿನ ಮೇರುಕೃತಿ ನಿರ್ಮಾಣವಾಯಿತು.',
      isDocumentedHistory: true
    },
    {
      yearOrEra: 'ಕ್ರಿ.ಶ. 1902 – 1940',
      event: 'ರಾಜರ್ಷಿ ನಾಲ್ವಡಿ ಕೃಷ್ಣರಾಜ ಒಡೆಯರ ಸುವರ್ಣ ಆಳ್ವಿಕೆ',
      rulerOrDynasty: 'ಒಡೆಯರ್ ರಾಜವಂಶ',
      details: 'ಶಿವನಸಮುದ್ರದಲ್ಲಿ ಏಷ್ಯಾದ ಮೊದಲ ಜಲವಿದ್ಯುತ್ ಯೋಜನೆ, ಉಚಿತ ಪ್ರಾಥಮಿಕ ಶಿಕ್ಷಣ ಮತ್ತು ವಿಶ್ವವಿದ್ಯಾಲಯಗಳನ್ನು ಸ್ಥಾಪಿಸಿ ಮಹಾತ್ಮ ಗಾಂಧಿಯವರಿಂದ "ರಾಮರಾಜ್ಯ" ಎಂದು ಪ್ರಶಂಸಿಸಲ್ಪಟ್ಟಿತು.',
      isDocumentedHistory: true
    }
  ],
  te: [
    {
      yearOrEra: 'క్రీ.శ. 1399',
      event: 'యదురాయ ఒడయార్ రాజవంశ స్థాపన',
      rulerOrDynasty: 'ఒడయార్ వంశం (యదురాయ ఒడయార్)',
      details: 'యదురాయ మరియు కృష్ణరాయ సోదరులు విజయనగర సామ్రాజ్యం ఆధ్వర్యంలో మైసూరు సంస్థానానికి పునాది వేశారు.',
      isDocumentedHistory: true
    },
    {
      yearOrEra: 'క్రీ.శ. 1610',
      event: 'శ్రీరంగపట్నంలో మొదటి దసరా వేడుకలు',
      rulerOrDynasty: 'మొదటి రాజా ఒడయార్',
      details: 'విజయనగర నవరాత్రి ఉత్సవ సంప్రదాయాన్ని మైసూరు సింహాసనంపై ఘనంగా ప్రారంభించారు.',
      isDocumentedHistory: true
    },
    {
      yearOrEra: 'క్రీ.శ. 1897 – 1912',
      event: 'అంబా విలాస్ ప్యాలెస్ పునర్నిర్మాణం',
      rulerOrDynasty: 'మహారాణి కెంపనంజమ్మణ్ణి & నాల్గవ కృష్ణరాజ ఒడయార్',
      details: '1897లో పాత చెక్క ప్యాలెస్ అగ్నిప్రమాదానికి గురైన తర్వాత బ్రిటిష్ ఆర్కిటెక్ట్ హెన్రీ ఇర్విన్ రూపొందించిన అద్భుత రాతి నిర్మాణం పూర్తయింది.',
      isDocumentedHistory: true
    },
    {
      yearOrEra: 'క్రీ.శ. 1902 – 1940',
      event: 'రాజర్షి నాల్గవ కృష్ణరాజ ఒడయార్ పాలన',
      rulerOrDynasty: 'ఒడయార్ వంశం',
      details: 'శివనసముద్రంలో ఆసియాలోనే మొదటి జలవిద్యుత్ కేంద్రం, ఉచిత ప్రాథమిక విద్యలను అందించి గాంధీజీచే "రామరాజ్యం"గా కొనియాడబడింది.',
      isDocumentedHistory: true
    }
  ],
  hi: [
    {
      yearOrEra: '1399 ईस्वी',
      event: 'यदुराय वाडियार राजवंश की स्थापना',
      rulerOrDynasty: 'वाडियार राजवंश (यदुराय वाडियार)',
      details: 'यदुराय और कृष्णराय भाइयों ने विजयनगर साम्राज्य की छत्रछाया में मैसूरु रियासत की नींव रखी।',
      isDocumentedHistory: true
    },
    {
      yearOrEra: '1610 ईस्वी',
      event: 'श्रीरंगपट्टण में प्रथम राजकीय दशहरा महोत्सव',
      rulerOrDynasty: 'राजा वाडियार प्रथम',
      details: 'विजयनगर की ऐतिहासिक नवरात्रि परंपरा को मैसूरु के राजसिंहासन पर राजकीय स्तर पर आरंभ किया गया।',
      isDocumentedHistory: true
    },
    {
      yearOrEra: '1897 – 1912 ईस्वी',
      event: 'अंबा विलास पैलेस का भव्य पुनर्निर्माण',
      rulerOrDynasty: 'महारानी केंपनंजम्मण्णी एवं कृष्णराज वाडियार चतुर्थ',
      details: '1897 में पुराने लकड़ी के महल के जल जाने के बाद ब्रिटिश वास्तुकार लॉर्ड हेनरी इरविन के मार्गदर्शन में पाषाण कृति का निर्माण हुआ।',
      isDocumentedHistory: true
    },
    {
      yearOrEra: '1902 – 1940 ईस्वी',
      event: 'राजर्षि कृष्णराज वाडियार चतुर्थ का स्वर्ण युग',
      rulerOrDynasty: 'वाडियार राजवंश',
      details: 'शिवनसमुद्र में एशिया का पहला जलविद्युत संयंत्र, निःशुल्क शिक्षा और उद्योगों की स्थापना कर गांधीजी द्वारा "रामराज्य" की उपाधि पाई।',
      isDocumentedHistory: true
    }
  ],
  ta: [
    {
      yearOrEra: 'கி.பி. 1399',
      event: 'யதுராய உடையார் வம்சத்தின் தோற்றம்',
      rulerOrDynasty: 'உடையார் வம்சம் (யதுராய உடையார்)',
      details: 'யதுராயர் மற்றும் கிருஷ்ணராயர் சகோதரர்கள் விஜயநகரப் பேரரசின் கீழ் மைசூர் சமஸ்தானத்தை உருவாக்கினர்.',
      isDocumentedHistory: true
    },
    {
      yearOrEra: 'கி.பி. 1610',
      event: 'ஸ்ரீரங்கப்பட்டினத்தில் முதல் அரசு தசரா திருவிழா',
      rulerOrDynasty: 'முதலாம் ராஜா உடையார்',
      details: 'விஜயநகர நவராத்திரி பாரம்பரியத்தை மைசூர் சிம்மாசனத்தில் தொடர்ந்து கொண்டாடும் முறையைத் துவக்கினார்.',
      isDocumentedHistory: true
    },
    {
      yearOrEra: 'கி.பி. 1897 – 1912',
      event: 'அம்பா விலாஸ் அரண்மனை மறுசீரமைப்பு',
      rulerOrDynasty: 'மகாராணி கெம்பநஞ்சம்மண்ணி & நான்காம் கிருஷ்ணராஜ உடையார்',
      details: 'பழைய மர அரண்மனை தீப்பிடித்த பிறகு, பிரிட்டிஷ் கட்டடக் கலைஞர் ஹென்றி இர்வின் வடிவமைத்த கல் கலைப்படைப்பு உருவாக்கப்பட்டது.',
      isDocumentedHistory: true
    },
    {
      yearOrEra: 'கி.பி. 1902 – 1940',
      event: 'ராஜரிஷி நான்காம் கிருஷ்ணராஜ உடையாரின் பொற்காலம்',
      rulerOrDynasty: 'உடையார் வம்சம்',
      details: 'சிவநசமுத்திரத்தில் ஆசியாவின் முதல் நீர்மின் திட்டம், இலவசக் கல்வி போன்ற சீர்திருத்தங்களால் மகாத்மா காந்தியால் "ராமராஜ்யம்" எனப் புகழப்பட்டது.',
      isDocumentedHistory: true
    }
  ],
  ml: [
    {
      yearOrEra: 'എ.ഡി. 1399',
      event: 'യദുരായ വൊഡയാർ രാജവംശ സ്ഥാപനം',
      rulerOrDynasty: 'വൊഡയാർ രാജവംശം (യദുരായ വൊഡയാർ)',
      details: 'യദുരായനും കൃഷ്ണരായനും ചേർന്നാണ് വിജയനഗര സാമ്രാജ്യത്തിന്റെ കീഴിൽ മൈസൂർ നാട്ടുരാജ്യം സ്ഥാപിച്ചത്.',
      isDocumentedHistory: true
    },
    {
      yearOrEra: 'എ.ഡി. 1610',
      event: 'ശ്രീരംഗപട്ടണത്തിൽ ആദ്യത്തെ സംസ്ഥാന ദസറ മഹോത്സവം',
      rulerOrDynasty: 'രാജാ വൊഡയാർ ഒന്നാമൻ',
      details: 'വിജയനഗര നവരാത്രി ആഘോഷ പാരമ്പര്യം മൈസൂർ സിംഹാസനത്തിൽ തുടക്കം കുറിച്ചു.',
      isDocumentedHistory: true
    },
    {
      yearOrEra: 'എ.ഡി. 1897 – 1912',
      event: 'അംബാ വിലാസ് കൊട്ടാര പുനർനിർമ്മാണം',
      rulerOrDynasty: 'മഹാറാണി കെമ്പനഞ്ചമ്മണ്ണിയും കൃഷ്ണരാജ വൊഡയാർ നാലാമനും',
      details: 'പഴയ തടി കൊട്ടാരം കത്തിനശിച്ചതിനെത്തുടർന്ന് ബ്രിട്ടീഷ് ശില്പി ഹെൻറി ഇർവിൻ ഇൻഡോ-സാരസെനിക് ശൈലിയിൽ കരിങ്കല്ലിൽ പണിതീർത്ത കൊട്ടാരം.',
      isDocumentedHistory: true
    },
    {
      yearOrEra: 'എ.ഡി. 1902 – 1940',
      event: 'രാജർഷി കൃഷ്ണരാജ വൊഡയാർ നാലാമന്റെ സുവർണ്ണ ഭരണം',
      rulerOrDynasty: 'വൊഡയാർ രാജവംശം',
      details: 'ശിവനസമുദ്രത്തിലെ ഏഷ്യയിലെ ആദ്യത്തെ ജലവൈദ്യുത പദ്ധതിയും സാമൂഹിക പുരോഗതിയും കണ്ട് ഗാന്ധിജി "രാമരാജ്യം" എന്ന് വിശേഷിപ്പിച്ചു.',
      isDocumentedHistory: true
    }
  ]
};

const MYSURU_MULTILINGUAL_ARCHITECTURE: Record<VoiceGuideLanguage, ArchitectureHighlight[]> = {
  en: [
    {
      feature: 'Indo-Saracenic Architecture (Amba Vilas Palace)',
      description: 'Harmonious blend of Hindu, Rajput, Islamic Mughal, and Gothic styles built from fine grey granite with deep pink marble domes.',
      periodOrStyle: '1897–1912 by Lord Henry Irwin'
    },
    {
      feature: 'Kalyana Mandapa (Royal Wedding Pavilion)',
      description: 'Octagonal hall adorned with Scottish stained-glass ceiling depicting peacock motifs and Italian glazed tiled floor.',
      periodOrStyle: 'Early 20th Century'
    },
    {
      feature: 'Golden Howdah & Durbar Hall',
      description: 'Carved mahogany ceiling, gilded colonnades, and 750 kg pure gold elephant throne (Ambari) carried in Dasara procession.',
      periodOrStyle: '17th–20th Century Royal Regalia'
    }
  ],
  kn: [
    {
      feature: 'ಇಂಡೋ-ಸಾರ್ಸೆನಿಕ್ ವಾಸ್ತುಶಿಲ್ಪ (ಅಂಬಾವಿಲಾಸ ಅರಮನೆ)',
      description: 'ಹಿಂದೂ, ರಜಪೂತ, ಇಸ್ಲಾಮಿಕ್ ಮೊಘಲ್ ಮತ್ತು ಗೋಥಿಕ್ ಶೈಲಿಗಳ ಅತ್ಯದ್ಭುತ ಸಮ್ಮಿಲನ; ಬೂದು ಗ್ರಾನೈಟ್ ಕಲ್ಲು ಮತ್ತು ಗುಲಾಬಿ ಅಮೃತಶಿಲೆಯ ಗುಮ್ಮಟಗಳು.',
      periodOrStyle: '1897–1912 (ಲಾರ್ಡ್ ಹೆನ್ರಿ ಇರ್ವಿನ್ ವಿನ್ಯಾಸ)'
    },
    {
      feature: 'ಕಲ್ಯಾಣ ಮಂಟಪ (ರಾಜಮನೆತನದ ವಿವಾಹ ಮಂಟಪ)',
      description: 'ಅಷ್ಟಭುಜಾಕೃತಿಯ ಸಭಾಂಗಣ; ನವಿಲು ಚಿತ್ತಾರದ ಸ್ಕಾಟಿಷ್ ಬಣ್ಣದ ಗಾಜಿನ ಸೀಲಿಂಗ್ ಮತ್ತು ಇಟಾಲಿಯನ್ ನೆಲಹಾಸಿನ ಸೊಬಗು.',
      periodOrStyle: '20ನೇ ಶತಮಾನದ ಆರಂಭ'
    },
    {
      feature: 'ಚಿನ್ನದ ಅಂಬಾರಿ & ದರ್ಬಾರ್ ಹಾಲ್',
      description: 'ಕೆತ್ತನೆಯ ಸೀಲಿಂಗ್, ಚಿನ್ನದ ಲೇಪನದ ಕಂಬಗಳು ಮತ್ತು ದಸರಾ ಮೆರವಣಿಗೆಯಲ್ಲಿ ಆನೆ ಹೊರುವ 750 ಕೆಜಿ ಶುದ್ಧ ಚಿನ್ನದ ಅಂಬಾರಿ.',
      periodOrStyle: '17-20ನೇ ಶತಮಾನದ ರಾಜಲಾಂಛನ'
    }
  ],
  te: [
    {
      feature: 'ఇండో-సార్సెనిక్ వాస్తుశిల్పం (అంబా విలాస్ ప్యాలెస్)',
      description: 'హిందూ, రాజపుత్ర, మొఘల్ మరియు గోతిక్ శైలుల అపురూప కలయిక; బూడిద రంగు గ్రానైట్ మరియు గులాబీ పాలరాతి గుమ్మటాలు.',
      periodOrStyle: '1897–1912 (లార్డ్ హెన్రీ ఇర్విన్)'
    },
    {
      feature: 'కళ్యాణ మండపం (వివాహ వేదిక)',
      description: 'నెమలి ఆకారాల స్కాట్లాండ్ రంగుల గాజు పైకప్పు మరియు ఇటాలియన్ టైల్స్ నేల కలిగిన అష్టభుజి హాలు.',
      periodOrStyle: '20వ శతాబ్దం ప్రారంభం'
    },
    {
      feature: 'బంగారు అంబారీ & దర్బార్ హాల్',
      description: 'బంగారు పూత స్తంభాలు మరియు దసరా ఉత్సవంలో ఏనుగు మోసే 750 కిలోల స్వచ్ఛమైన బంగారు అంబారీ.',
      periodOrStyle: '17-20 శతాబ్దాల రాజవైభవం'
    }
  ],
  hi: [
    {
      feature: 'इंडो-सरैसेनिक वास्तुकला (अंबा विलास महल)',
      description: 'हिंदू, राजपूत, मुगल और गोथिक शैलियों का भव्य समन्वय; स्लेटी ग्रेनाइट पत्थर और गुलाबी संगमरमर के गुंबद।',
      periodOrStyle: '1897–1912 (लॉर्ड हेनरी इरविन)'
    },
    {
      feature: 'कल्याण मंडप (शाही विवाह मंडप)',
      description: 'अष्टकोणीय विशाल कक्ष जिसमें मोर के रूपांकनों वाली स्कॉटिश रंगीन कांच की छत और इतालवी टाइलों का फर्श है।',
      periodOrStyle: '20वीं शताब्दी का आरंभ'
    },
    {
      feature: 'स्वर्ण हौदा और दरबार हॉल',
      description: 'स्वर्णमंडित खंभे और दशहरा जुलूस में गजराज द्वारा ले जाया जाने वाला 750 किलोग्राम शुद्ध सोने का हौदा (अंबारी)।',
      periodOrStyle: '17वीं–20वीं सदी का राजसी वैभव'
    }
  ],
  ta: [
    {
      feature: 'இந்தோ-சாரசெனிக் கட்டடக்கலை (அம்பா விலாஸ் அரண்மனை)',
      description: 'இந்து, ராஜபுத்திர, முகலாய மற்றும் கோதிக் பாணிகளின் சங்கமம்; சாம்பல் கருங்கல் மற்றும் இளஞ்சிவப்பு பளிங்கு குவிமாடங்கள்.',
      periodOrStyle: '1897–1912 (ஹென்றி இர்வின்)'
    },
    {
      feature: 'கல்யாண மண்டபம் (அரச திருமணக் கூடம்)',
      description: 'மயில் உருவம் பொறிக்கப்பட்ட ஸ்காட்டிஷ் வண்ணக் கண்ணாடி கூரை மற்றும் இத்தாலிய தரைத்தளம் கொண்ட எண்கோண மண்டபம்.',
      periodOrStyle: '20 ஆம் நூற்றாண்டின் தொடக்கம்'
    },
    {
      feature: 'தங்க அம்பாரி & தர்பார் கூடம்',
      description: 'தங்க முலாம் பூசப்பட்ட தூண்கள் மற்றும் தசரா ஊர்வலத்தில் யானை சுமக்கும் 750 கிலோ தூய தங்க அம்பாரி.',
      periodOrStyle: '17–20 ஆம் நூற்றாண்டு அரச சின்னங்கள்'
    }
  ],
  ml: [
    {
      feature: 'ഇൻഡോ-സാരസെനിക് വാസ്തുവിദ്യ (അംബാ വിലാസ് കൊട്ടാരം)',
      description: 'ഹിന്ദു, രജപുത്, മുഗൾ, ഗോഥിക് ശൈലികളുടെ സമന്വയം; ഗ്രാനൈറ്റ് കല്ലുകളും പിങ്ക് മാർബിൾ താഴികക്കുടങ്ങളും.',
      periodOrStyle: '1897–1912 (ഹെൻറി ഇർവിൻ)'
    },
    {
      feature: 'കല്യാണ മണ്ഡപം (രാജകീയ വിവാഹ വേദി)',
      description: 'മയിൽ ഡിസൈനുകളുള്ള സ്കോട്ടിഷ് ഗ്ലാസ് മേൽക്കൂരയും ഇറ്റാലിയൻ ടൈലുകളും ഉള്ള അഷ്ടഭുജ ഹാൾ.',
      periodOrStyle: '20-ാം നൂറ്റാണ്ടിന്റെ ആരംഭം'
    },
    {
      feature: 'സ്വർണ്ണ അമ്പാരിയും ദർബാർ ഹാളും',
      description: 'ദസറ ഘോഷയാത്രയിൽ ആനപ്പുറത്ത് വഹിക്കുന്ന 750 കിലോഗ്രാം ശുദ്ധമായ സ്വർണ്ണത്തിൽ തീർത്ത അമ്പാരിയും സ്വർണ്ണത്തൂണുകളും.',
      periodOrStyle: '17–20 നൂറ്റാണ്ടിലെ രാജകീയ പ്രൗഢി'
    }
  ]
};

const MYSURU_MULTILINGUAL_FACTS: Record<VoiceGuideLanguage, string[]> = {
  en: [
    'The modern palace was built at a cost of approximately ₹41.4 lakh between 1897 and 1912.',
    'On Sundays and festive evenings, the palace exterior is lit by exactly 97,000 incandescent electric bulbs.',
    'Mysore State was the first in India to generate hydroelectric power (1902) to electrify the city and the Kolar Gold Fields.'
  ],
  kn: [
    'ಅಂಬಾವಿಲಾಸ ಅರಮನೆಯನ್ನು 1897 ರಿಂದ 1912 ರ ಅವಧಿಯಲ್ಲಿ ಅಂದಾಜು 41.4 ಲಕ್ಷ ರೂಪಾಯಿ ವೆಚ್ಚದಲ್ಲಿ ನಿರ್ಮಿಸಲಾಯಿತು.',
    'ಪ್ರತಿ ಭಾನುವಾರ ಮತ್ತು ಹಬ್ಬದ ಸಂಜೆಗಳಲ್ಲಿ ಅರಮನೆಯ ಹೊರಭಾಗವು ನಿಖರವಾಗಿ 97,000 ವಿದ್ಯುತ್ ದೀಪಗಳಿಂದ ಕಂಗೊಳಿಸುತ್ತದೆ.',
    '1902 ರಲ್ಲಿ ಶಿವನಸಮುದ್ರದಲ್ಲಿ ಜಲವಿದ್ಯುತ್ ಉತ್ಪಾದಿಸಿ ನಗರ ಮತ್ತು ಕೋಲಾರ ಚಿನ್ನದ ಗಣಿಗೆ ವಿದ್ಯುತ್ ಒದಗಿಸಿದ ಭಾರತದ ಪ್ರಥಮ ಸಂಸ್ಥಾನ ಮೈಸೂರು.'
  ],
  te: [
    'ఆధునిక ప్యాలెస్‌ను 1897 మరియు 1912 మధ్య సుమారు ₹41.4 లక్షల వ్యయంతో నిర్మించారు.',
    'ఆదివారాలు మరియు పండుగల సాయంత్రాలలో ప్యాలెస్ వెలుపల సరిగ్గా 97,000 విద్యుత్ దీపాలతో దేదీప్యమానంగా వెలుగుతుంది.',
    '1902లో ఆసియాలోనే మొదటిసారిగా జలవిద్యుత్‌ను ఉత్పత్తి చేసి నగరానికి మరియు కోలార్ బంగారు గనులకు విద్యుత్ అందించిన మొదటి సంస్థానం మైసూరు.'
  ],
  hi: [
    'आधुनिक महल का निर्माण 1897 से 1912 के बीच लगभग ₹41.4 लाख की लागत से किया गया था।',
    'रविवार और उत्सव की शामों को महल के बाहरी हिस्से को ठीक 97,000 बिजली के बल्बों से जगमगाया जाता है।',
    'मैसूर रियासत 1902 में जलविद्युत उत्पन्न करने वाली और शहर तथा कोलार गोल्ड फील्ड्स को रोशन करने वाली भारत की पहली रियासत थी।'
  ],
  ta: [
    'நவீன அரண்மனை 1897 மற்றும் 1912 க்கு இடையில் சுமார் ₹41.4 லட்சம் செலவில் கட்டப்பட்டது.',
    'ஞாயிற்றுக்கிழமைகள் மற்றும் பண்டிகை மாலைகளில், அரண்மனை வெளிப்புறம் சரியாக 97,000 மின்விளக்குகளால் ஒளிரூட்டப்படுகிறது.',
    '1902 இல் நீர்மின்சாரத்தை உற்பத்தி செய்து நகரத்திற்கும் கோலார் தங்க வயலுக்கும் மின்சாரம் வழங்கிய இந்தியாவின் முதல் சமஸ்தானம் மைசூர்.'
  ],
  ml: [
    '1897 നും 1912 നും ഇടയിൽ ഏകദേശം 41.4 ലക്ഷം രൂപ ചെലവഴിച്ചാണ് ഈ ആധുനിക കൊട്ടാരം പണിതീർത്തത്.',
    'ഞായറാഴ്ചകളിലും വിശേഷ ദിവസങ്ങളിലും കൊട്ടാരം കൃത്യം 97,000 വൈദ്യുത ദീപങ്ങളാൽ പ്രകാശപൂരിതമാക്കുന്നു.',
    '1902-ൽ ജലവൈദ്യുതി ഉത്പാദിപ്പിച്ച് നഗരത്തിലും കോലാർ സ്വർണ്ണപ്പാടങ്ങളിലും വൈദ്യുതി എത്തിച്ച ഇന്ത്യയിലെ ആദ്യത്തെ നാട്ടുരാജ്യമാണ് മൈസൂർ.'
  ]
};

const MYSURU_MULTILINGUAL_LEGENDS: Record<VoiceGuideLanguage, string[]> = {
  en: [
    'Legend states the city was named "Mahishuru" after the slaying of demon king Mahishasura by Goddess Chamundeshwari atop Chamundi Hill.',
    'The Wodeyar family curse by Queen Alamelamma ("Talakadu Maralagi, Malangi Maduvagi, Mysuru Dhoregalige Makkallagade Hogali") is deeply rooted in local oral tradition.'
  ],
  kn: [
    'ಚಾಮುಂಡಿ ಬೆಟ್ಟದ ಮೇಲೆ ತಾಯಿ ಚಾಮುಂಡೇಶ್ವರಿಯು ಮಹಿಷಾಸುರನನ್ನು ಸಂಹರಿಸಿದ ನಂತರ ಈ ನಗರಕ್ಕೆ "ಮಹಿಷೂರು" (ಮೈಸೂರು) ಎಂಬ ಹೆಸರು ಬಂದಿತು ಎಂಬುದು ನಂಬಿಕೆ.',
    'ರಾಣಿ ಅಲಮೇಲಮ್ಮನವರ ಐತಿಹಾಸಿಕ ಶಾಪ ("ತಲಕಾಡು ಮರಳಾಗಿ, ಮಾಲಂಗಿ ಮಡುವಾಗಿ, ಮೈಸೂರು ದೊರೆಗಳಿಗೆ ಮಕ್ಕಳಾಗದೆ ಹೋಗಲಿ") ಸ್ಥಳೀಯ ಜನಪದ ಸಂಪ್ರದಾಯದಲ್ಲಿ ಆಳವಾಗಿ ಬೇರೂರಿದೆ.',
  ],
  te: [
    'చాముండి కొండపై చాముండేశ్వరి దేవి మహిషాసురుడిని సంహరించిన తర్వాత ఈ నగరానికి "మహిషూరు" (మైసూరు) అనే పేరు వచ్చిందని పురాణ ప్రతీతి.',
    'రాణి అలమేలమ్మ శాపం ("తలకాడు ఇసుక తిన్నెగా మారుగాక, మాలంగి సుడిగుండంగా మారుగాక, మైసూరు రాజులకు సంతానం కలగకుండుగాక") స్థానిక జానపదంలో ప్రముఖమైనది.'
  ],
  hi: [
    'पौराणिक मान्यता है कि चामुंडी पहाड़ी पर देवी चामुंडेश्वरी द्वारा महिषासुर के वध के बाद इस नगर का नाम "महिषूरु" (मैसूरु) पड़ा।',
    'रानी अलमेलम्मा का प्रसिद्ध शाप ("तलकाडु बालू बने, मालंगी भंवर बने, मैसूर के राजाओं को संतान न हो") स्थानीय लोकगाथाओं में गहराई से जुड़ा है।'
  ],
  ta: [
    'சாமுண்டி மலையில் சாமுண்டேஸ்வரி அம்மன் மகிஷாசுரனை வதம் செய்த பிறகு இந்நகரத்திற்கு "மகிஷூரு" (மைசூரு) என்று பெயர் வந்ததாகப் புராணம் கூறுகிறது.',
    'ராணி அலமேலம்மாவின் சாபம் ("தலக்காடு மணலாகட்டும், மாலங்கி சுழலாகட்டும், மைசூர் மன்னர்களுக்கு சந்ததி இல்லாமல் போகட்டும்") உள்ளூர் பாரம்பரியத்தில் பிரபலமானது.'
  ],
  ml: [
    'ചാമുണ്ഡി മലയിൽ വച്ച് ചാമുണ്ഡേശ്വരി ദേവി മഹിഷാസുരനെ വധിച്ചതിനാലാണ് ഈ നഗരത്തിന് "മഹിഷൂരു" (മൈസൂരു) എന്ന പേര് ലഭിച്ചതെന്ന് ഐതിഹ്യം.',
    'അലമേലമ്മ രാജ്ഞിയുടെ ചരിത്രപ്രസിദ്ധമായ ശാപം ("തലക്കാട് മണലാകട്ടെ, മാലംഗി കയമാകട്ടെ, മൈസൂർ രാജാക്കന്മാർക്ക് സന്തതിയില്ലാതാകട്ടെ") നാടോടി പാരമ്പര്യത്തിൽ പ്രശസ്തമാണ്.'
  ]
};

/**
 * Universal Voice Guide Data Provider:
 * Returns rich curated data in the customer's preferred language (en, kn, te, hi, ta, ml).
 */
export function getDestinationVoiceGuideData(
  destinationId: string, 
  language: VoiceGuideLanguage = 'en'
): DestinationVoiceGuideData {
  if (destinationId === 'hampi' && DESTINATION_VOICE_GUIDE_DATA['hampi']) {
    const base = DESTINATION_VOICE_GUIDE_DATA['hampi'];
    return {
      ...base,
      historicalTimeline: HAMPI_MULTILINGUAL_TIMELINE[language] || HAMPI_MULTILINGUAL_TIMELINE.en,
      architectureHighlights: HAMPI_MULTILINGUAL_ARCHITECTURE[language] || HAMPI_MULTILINGUAL_ARCHITECTURE.en,
      documentedHistoryFacts: HAMPI_MULTILINGUAL_FACTS[language] || HAMPI_MULTILINGUAL_FACTS.en,
      folkloreAndLegends: HAMPI_MULTILINGUAL_LEGENDS[language] || HAMPI_MULTILINGUAL_LEGENDS.en
    };
  }

  if (destinationId === 'mysuru' && DESTINATION_VOICE_GUIDE_DATA['mysuru']) {
    const base = DESTINATION_VOICE_GUIDE_DATA['mysuru'];
    return {
      ...base,
      historicalTimeline: MYSURU_MULTILINGUAL_TIMELINE[language] || MYSURU_MULTILINGUAL_TIMELINE.en,
      architectureHighlights: MYSURU_MULTILINGUAL_ARCHITECTURE[language] || MYSURU_MULTILINGUAL_ARCHITECTURE.en,
      documentedHistoryFacts: MYSURU_MULTILINGUAL_FACTS[language] || MYSURU_MULTILINGUAL_FACTS.en,
      folkloreAndLegends: MYSURU_MULTILINGUAL_LEGENDS[language] || MYSURU_MULTILINGUAL_LEGENDS.en
    };
  }

  const detailed = DESTINATION_VOICE_DETAILS[destinationId];
  if (detailed) {
    const dest = DESTINATIONS.find(d => d.id === destinationId) || DESTINATIONS[0];
    return {
      destinationId,
      historicalTimeline: detailed.timelines[language] || detailed.timelines.en || [],
      architectureHighlights: detailed.architectures[language] || detailed.architectures.en || [],
      documentedHistoryFacts: detailed.facts[language] || detailed.facts.en || [],
      folkloreAndLegends: detailed.folklore[language] || detailed.folklore.en || [],
      sourcesAndReferences: detailed.references || [
        {
          title: `${dest.name} Archaeological & Tourism Registry`,
          authority: dest.verifiedAuthority || 'Department of Tourism, Government of Karnataka',
          description: `Official tourism and cultural heritage profile for ${dest.name} in ${dest.district}.`
        }
      ],
      narrations: detailed.narrations,
      faqList: [
        {
          id: `${destinationId}-faq-1`,
          category: 'history',
          question: {
            en: `What is the historical significance of ${dest.name}?`,
            kn: `${dest.kannadaName || dest.name} ನ ಐತಿಹಾಸಿಕ ಮಹತ್ವವೇನು?`,
            te: `${dest.name} యొక్క చారిత్రక ప్రాముఖ్యత ఏమిటి?`,
            hi: `${dest.name} का ऐतिहासिक महत्व क्या है?`,
            ta: `${dest.name} இன் வரலாற்று முக்கியத்துவம் என்ன?`,
            ml: `${dest.name} ന്റെ ചരിത്രപരമായ പ്രാധാന്യം എന്താണ്?`
          },
          answer: {
            en: `${dest.name} in ${dest.district} is celebrated for: ${dest.significance}. It offers an ideal ${dest.idealDays} exploration timeline.`,
            kn: `${dest.district} ಜಿಲ್ಲೆಯ ${dest.kannadaName || dest.name}: ${dest.significance}`,
            te: `${dest.district} జిల్లాలోని ${dest.name}: ${dest.significance}`,
            hi: `${dest.district} जिले में स्थित ${dest.name}: ${dest.significance}`,
            ta: `${dest.district} மாவட்டத்தில் உள்ள ${dest.name}: ${dest.significance}`,
            ml: `${dest.district} ജില്ലയിലെ ${dest.name}: ${dest.significance}`
          }
        },
        {
          id: `${destinationId}-faq-2`,
          category: 'tips',
          question: {
            en: `What are the top attractions and culinary specialties in ${dest.name}?`,
            kn: `${dest.kannadaName || dest.name} ನಲ್ಲಿ ನೋಡಬೇಕಾದ ಪ್ರಮುಖ ಸ್ಥಳಗಳು ಮತ್ತು ತಿಂಡಿಗಳು ಯಾವುವು?`,
            te: `${dest.name} లో చూడవలసిన ముఖ్య ప్రదేశాలు మరియు ఆహారాలు ఏమిటి?`,
            hi: `${dest.name} में देखने योग्य प्रमुख स्थल और स्थानीय व्यंजन कौन से हैं?`,
            ta: `${dest.name} இல் பார்க்க வேண்டிய முக்கிய இடங்கள் மற்றும் உணவுகள் யாவை?`,
            ml: `${dest.name} ൽ കാണേണ്ട പ്രധാന സ്ഥലങ്ങളും ഭക്ഷണങ്ങളും ഏതെല്ലാമാണ്?`
          },
          answer: {
            en: `Key attractions include ${dest.topAttractions.map((a: any) => a.name).join(', ')}. Must-try local foods include ${dest.localDelicacies.join(', ')}.`,
            kn: `ಪ್ರಮುಖ ಆಕರ್ಷಣೆಗಳು: ${dest.topAttractions.map((a: any) => a.name).join(', ')}. ಪ್ರಮುಖ ತಿನಿಸುಗಳು: ${dest.localDelicacies.join(', ')}.`,
            te: `ముఖ్యమైన ప్రదేశాలు: ${dest.topAttractions.map((a: any) => a.name).join(', ')}. ప్రసిద్ధ వంటకాలు: ${dest.localDelicacies.join(', ')}.`,
            hi: `प्रमुख आकर्षण: ${dest.topAttractions.map((a: any) => a.name).join(', ')}. प्रसिद्ध स्थानीय व्यंजन: ${dest.localDelicacies.join(', ')}.`,
            ta: `முக்கிய இடங்கள்: ${dest.topAttractions.map((a: any) => a.name).join(', ')}. பாரம்பரிய உணவுகள்: ${dest.localDelicacies.join(', ')}.`,
            ml: `പ്രധാന ആകർഷണങ്ങൾ: ${dest.topAttractions.map((a: any) => a.name).join(', ')}. പ്രാദേശിക വിഭവങ്ങൾ: ${dest.localDelicacies.join(', ')}.`
          }
        }
      ]
    };
  }

  const dest = DESTINATIONS.find(d => d.id === destinationId) || DESTINATIONS[0];
  return createSynthesizedVoiceData(dest, language);
}

function createSynthesizedVoiceData(dest: any, lang: VoiceGuideLanguage = 'en'): DestinationVoiceGuideData {
  const name = lang === 'kn' ? (dest.kannadaName || dest.name) : dest.name;
  const dist = dest.district;
  const reg = dest.region;

  let timeline: HistoricalMilestone[];
  let architecture: ArchitectureHighlight[];
  let facts: string[];
  let folklore: string[];
  let references: HistoricalSourceReference[];

  if (lang === 'kn') {
    timeline = [
      {
        yearOrEra: 'ಪ್ರಾಚೀನ & ಮಧ್ಯಕಾಲೀನ ಯುಗ',
        event: `${name} ನ ಐತಿಹಾಸಿಕ ಮತ್ತು ಸಾಂಸ್ಕೃತಿಕ ಪರಂಪರೆ`,
        rulerOrDynasty: `${dist} ಪ್ರಾಂತ್ಯದ ರಾಜವಂಶಗಳು`,
        details: dest.significance,
        isDocumentedHistory: true
      },
      {
        yearOrEra: 'ಆಧುನಿಕ ಯುಗ',
        event: 'ಪರಂಪರೆ ಸಂರಕ್ಷಣೆ ಮತ್ತು ಅಧಿಕೃತ ಪ್ರವಾಸೋದ್ಯಮ ನೋಂದಣಿ',
        rulerOrDynasty: dest.verifiedAuthority || 'ಕರ್ನಾಟಕ ಪ್ರವಾಸೋದ್ಯಮ ಮತ್ತು ಪುರಾತತ್ವ ಇಲಾಖೆ',
        details: `${dest.verifiedAuthority || 'ಕರ್ನಾಟಕ ಪ್ರವಾಸೋದ್ಯಮ ಮತ್ತು ಭಾರತೀಯ ಪುರಾತತ್ವ ಇಲಾಖೆ'} ರಕ್ಷಣೆಯಲ್ಲಿ ಅಧಿಕೃತವಾಗಿ ನಿರ್ವಹಿಸಲಾಗುತ್ತಿದೆ.`,
        isDocumentedHistory: true
      }
    ];
    architecture = dest.topAttractions.slice(0, 3).map((attr: any) => ({
      feature: attr.name,
      description: attr.description,
      periodOrStyle: `${reg} ಸಾಂಪ್ರದಾಯಿಕ ವಾಸ್ತುಶಿಲ್ಪ`
    }));
    facts = [
      `${dist} ಜಿಲ್ಲೆಯಲ್ಲಿರುವ ${name} ಕರ್ನಾಟಕದ ಹೆಮ್ಮೆಯ ಸಾಂಸ್ಕೃತಿಕ ತಾಣವಾಗಿದೆ (${dest.coordinatesNote}).`,
      dest.description,
      `ಅಧಿಕೃತ ಮಾಹಿತಿ ಮೂಲ: ${dest.verifiedAuthority || 'ಕರ್ನಾಟಕ ಪ್ರವಾಸೋದ್ಯಮ ಇಲಾಖೆ'}.`
    ];
    folklore = [
      `${name} ಕುರಿತು ಸ್ಥಳೀಯ ಜನಪದ ಕಥೆಗಳು ಮತ್ತು ಪಾರಂಪರಿಕ ಸಂಸ್ಕೃತಿ ತಲೆಮಾರುಗಳಿಂದ ಜೀವಂತವಾಗಿದೆ.`,
      dest.whyVisitSummary || 'ತಲೆಮಾರುಗಳಿಂದ ಪ್ರವಾಸಿಗರನ್ನು ಆಕರ್ಷಿಸುತ್ತಿರುವ ಕರ್ನಾಟಕದ ಸುಂದರ ತಾಣ.'
    ];
    references = [
      {
        title: `${name} ಅಧಿಕೃತ ಪ್ರವಾಸೋದ್ಯಮ ಮತ್ತು ಪರಂಪರೆ ದಾಖಲೆಗಳು`,
        authority: dest.verifiedAuthority || 'ಕರ್ನಾಟಕ ಸರ್ಕಾರ ಪ್ರವಾಸೋದ್ಯಮ ಇಲಾಖೆ',
        description: `${dist} ಜಿಲ್ಲೆಯ ಅಧಿಕೃತ ಪ್ರವಾಸಿ ಮಾರ್ಗದರ್ಶಿ ಮತ್ತು ಸಾಂಸ್ಕೃತಿಕ ಅವಲೋಕನ.`
      }
    ];
  } else if (lang === 'te') {
    timeline = [
      {
        yearOrEra: 'ప్రాచీన & మధ్యయుగ కాలం',
        event: `${name} యొక్క చారిత్రక మరియు సాంస్కృతిక వైభవం`,
        rulerOrDynasty: `${dist} చారిత్రక పాలకులు & స్థానిక రాజవంశాలు`,
        details: dest.significance,
        isDocumentedHistory: true
      },
      {
        yearOrEra: 'ఆధునిక కాలం',
        event: 'వారసత్వ పరిరక్షణ & పర్యాటక గుర్తింపు',
        rulerOrDynasty: dest.verifiedAuthority || 'కర్ణాటక పర్యాటక మరియు పురావస్తు శాఖ',
        details: `${dest.verifiedAuthority || 'కర్ణాటక టూరిజం శాఖ & ఏఎస్ఐ'} ఆధ్వర్యంలో పరిరక్షించబడుతోంది.`,
        isDocumentedHistory: true
      }
    ];
    architecture = dest.topAttractions.slice(0, 3).map((attr: any) => ({
      feature: attr.name,
      description: attr.description,
      periodOrStyle: `${reg} శిల్పకళా శైలి`
    }));
    facts = [
      `${dist} జిల్లాలోని ${name} కర్ణాటక రాష్ట్రపు ముఖ్య పర్యాటక మరియు సాంస్కృతిక కేంద్రం.`,
      dest.description,
      `అధికారిక ఆధారాలు: ${dest.verifiedAuthority || 'కర్ణాటక టూరిజం డిపార్ట్‌మెంట్ & ఏఎస్ఐ'}.`
    ];
    folklore = [
      `${name} గురించి స్థానిక జానపద గాథలు మరియు సాంప్రదాయిక విశ్వాసాలు ప్రాచుర్యంలో ఉన్నాయి.`,
      dest.whyVisitSummary || 'తరతరాలుగా సందర్శకులను ఆకట్టుకుంటున్న ప్రసిద్ధ పర్యాటక ప్రాంతం.'
    ];
    references = [
      {
        title: `${name} అధికారిక టూరిజం మరియు చారిత్రక పత్రాలు`,
        authority: dest.verifiedAuthority || 'కర్ణాటక ప్రభుత్వ పర్యాటక శాఖ',
        description: `${dist} జిల్లా సమగ్ర పర్యాటక వివరాలు మరియు చారిత్రక సమాచారం.`
      }
    ];
  } else if (lang === 'hi') {
    timeline = [
      {
        yearOrEra: 'प्राचीन एवं मध्यकालीन इतिहास',
        event: `${name} की ऐतिहासिक धरोहर एवं सांस्कृतिक उद्भव`,
        rulerOrDynasty: `${dist} क्षेत्र के ऐतिहासिक राजवंश`,
        details: dest.significance,
        isDocumentedHistory: true
      },
      {
        yearOrEra: 'आधुनिक काल',
        event: 'धरोहर संरक्षण एवं सांस्कृतिक पर्यटन नामांकन',
        rulerOrDynasty: dest.verifiedAuthority || 'कर्नाटक पुरातत्व एवं पर्यटन विभाग',
        details: `${dest.verifiedAuthority || 'कर्नाटक पर्यटन विभाग एवं भारतीय पुरातत्व सर्वेक्षण'} द्वारा संरक्षित एवं प्रबंधित।`,
        isDocumentedHistory: true
      }
    ];
    architecture = dest.topAttractions.slice(0, 3).map((attr: any) => ({
      feature: attr.name,
      description: attr.description,
      periodOrStyle: `${reg} स्थापत्य शैली`
    }));
    facts = [
      `${dist} जिले में स्थित ${name} कर्नाटक की समृद्ध सांस्कृतिक धरोहर का प्रमुख केंद्र है।`,
      dest.description,
      `आधिकारिक स्रोत: ${dest.verifiedAuthority || 'कर्नाटक पर्यटन विभाग एवं भारतीय पुरातत्व सर्वेक्षण'}।`
    ];
    folklore = [
      `${name} के विषय में स्थानीय जनश्रुतियां और लोक परंपराएं अत्यंत समृद्ध हैं।`,
      dest.whyVisitSummary || 'पीढ़ियों से यात्रियों को आकर्षित करने वाला कर्नाटक का अनुपम स्थल।'
    ];
    references = [
      {
        title: `${name} आधिकारिक पर्यटन एवं सांस्कृतिक दस्तावेज`,
        authority: dest.verifiedAuthority || 'कर्नाटक सरकार पर्यटन विभाग',
        description: `${dist} जिले का आधिकारिक यात्रा विवरण एवं ऐतिहासिक दस्तावेज।`
      }
    ];
  } else if (lang === 'ta') {
    timeline = [
      {
        yearOrEra: 'பண்டைய மற்றும் இடைக்கால வரலாறு',
        event: `${name} இன் வரலாற்றுப் பாரம்பரியம் மற்றும் தோற்றம்`,
        rulerOrDynasty: `${dist} பகுதியை ஆண்ட வரலாற்று வம்சங்கள்`,
        details: dest.significance,
        isDocumentedHistory: true
      },
      {
        yearOrEra: 'நவீன காலம்',
        event: 'பாரம்பரியப் பாதுகாப்பு மற்றும் சுற்றுலா அங்கீகாரம்',
        rulerOrDynasty: dest.verifiedAuthority || 'கர்நாடக சுற்றுலா மற்றும் தொல்லியல் துறை',
        details: `${dest.verifiedAuthority || 'கர்நாடக சுற்றுலாத்துறை மற்றும் இந்திய தொல்பொருள் ஆய்வுத்துறை'} மூலம் பாதுகாக்கப்படுகிறது.`,
        isDocumentedHistory: true
      }
    ];
    architecture = dest.topAttractions.slice(0, 3).map((attr: any) => ({
      feature: attr.name,
      description: attr.description,
      periodOrStyle: `${reg} பாரம்பரிய கட்டடக்கலை`
    }));
    facts = [
      `${dist} மாவட்டத்தில் அமைந்துள்ள ${name} கர்நாடகாவின் புகழ்பெற்ற பண்பாட்டுத் தலமாகும்.`,
      dest.description,
      `அதிகாரப்பூர்வ தகவல் ஆதாரம்: ${dest.verifiedAuthority || 'கர்நாடக சுற்றுலாத்துறை'}。`
    ];
    folklore = [
      `${name} குறித்து பல பாரம்பரிய வாய்மொழிக் கதைகளும் பண்பாட்டு நம்பிக்கைகளும் நிலவுகின்றன.`,
      dest.whyVisitSummary || 'தலைமுறை தலைமுறையாக சுற்றுலாப் பயணிகளைக் கவரும் கர்நாடகாவின் அற்புத இடம்.'
    ];
    references = [
      {
        title: `${name} அதிகாரப்பூர்வ சுற்றுலா மற்றும் கலாச்சார ஆவணங்கள்`,
        authority: dest.verifiedAuthority || 'கர்நாடக அரசு சுற்றுலாத்துறை',
        description: `${dist} மாவட்டத்தின் அதிகாரப்பூர்வ வழிகாட்டுதல் மற்றும் வரலாற்றுப் பதிவுகள்.`
      }
    ];
  } else if (lang === 'ml') {
    timeline = [
      {
        yearOrEra: 'പ്രാചീന, മധ്യകാല ചരിത്രം',
        event: `${name} ന്റെ പൈതൃകവും ചരിത്രപരമായ പ്രാധാന്യവും`,
        rulerOrDynasty: `${dist} ലെ പുരാതന രാജവംശങ്ങൾ`,
        details: dest.significance,
        isDocumentedHistory: true
      },
      {
        yearOrEra: 'ആധുനിക കാലഘട്ടം',
        event: 'പൈതൃക സംരക്ഷണവും വിനോദസഞ്ചാര പദവിയും',
        rulerOrDynasty: dest.verifiedAuthority || 'കർണാടക ടൂറിസം, പുരാവസ്തു വകുപ്പ്',
        details: `${dest.verifiedAuthority || 'കർണാടക ടൂറിസം വകുപ്പ്, പുരാവസ്തു വകുപ്പ്'} സംരക്ഷണയിൽ നിലകൊള്ളുന്നു.`,
        isDocumentedHistory: true
      }
    ];
    architecture = dest.topAttractions.slice(0, 3).map((attr: any) => ({
      feature: attr.name,
      description: attr.description,
      periodOrStyle: `${reg} പൈതൃക വാസ്തുവിദ്യ`
    }));
    facts = [
      `${dist} ജില്ലയിലെ ${name} കർണാടകയുടെ സാംസ്കാരിക ഭൂപടത്തിലെ പ്രധാന കേന്ദ്രമാണ്.`,
      dest.description,
      `ഔദ്യോഗിക സ്രോതസ്സ്: ${dest.verifiedAuthority || 'കർണാടക ടൂറിസം വകുപ്പ്'}。`
    ];
    folklore = [
      `${name} നെക്കുറിച്ച് അനവധി നാടൻ കഥകളും പാരമ്പര്യ വിശ്വാസങ്ങളും നിലവിലുണ്ട്.`,
      dest.whyVisitSummary || 'തലമുറകളായി സഞ്ചാരികളെ ആകർഷിക്കുന്ന കർണാടകയിലെ മനോഹരമായ കേന്ദ്രം.'
    ];
    references = [
      {
        title: `${name} ഔദ്യോഗിക ടൂറിസം, ചരിത്ര രേഖകൾ`,
        authority: dest.verifiedAuthority || 'കർണാടക സർക്കാർ ടൂറിസം വകുപ്പ്',
        description: `${dist} ജില്ലയിലെ ഔദ്യോഗിക യാത്രാ വിവരങ്ങളും സാംസ്കാരിക അവലോകനവും.`
      }
    ];
  } else {
    // English default
    timeline = [
      {
        yearOrEra: 'Ancient & Medieval Era',
        event: `Establishment & Heritage of ${dest.name}`,
        rulerOrDynasty: `${dest.district} Historical Rulers & Dynasties`,
        details: dest.significance,
        isDocumentedHistory: true
      },
      {
        yearOrEra: 'Modern Period',
        event: 'Conservation & Cultural Tourism Inscription',
        rulerOrDynasty: dest.verifiedAuthority || 'State Heritage Administration',
        details: `Protected and curated under the authority of ${dest.verifiedAuthority || 'Archaeological Survey of India & Karnataka Tourism'}.`,
        isDocumentedHistory: true
      }
    ];
    architecture = dest.topAttractions.slice(0, 3).map((attr: any) => ({
      feature: attr.name,
      description: attr.description,
      periodOrStyle: `${dest.region} Heritage Architecture`
    }));
    facts = [
      `${dest.name} in ${dest.district} district is an authenticated cultural highlight of Karnataka (${dest.coordinatesNote}).`,
      dest.description,
      `Authority Source: ${dest.verifiedAuthority || 'Karnataka Department of Tourism & ASI'}.`
    ];
    folklore = [
      `Local traditions and oral folk narratives celebrate the cultural spirit and natural wonders of ${dest.name}.`,
      dest.whyVisitSummary || `Cherished by travelers across generations for its unique heritage and local warmth.`
    ];
    references = [
      {
        title: `${dest.name} Tourism & Heritage Documentation`,
        authority: dest.verifiedAuthority || 'Department of Tourism, Government of Karnataka',
        description: `Official verified tourism records, visitor guidelines, and cultural overview for ${dest.district} district.`
      },
      {
        title: 'Karnataka State Gazetteer & ASI Monuments Directory',
        authority: 'Gazetteer Department, Government of Karnataka',
        description: 'Comprehensive historical, geographical, and cultural survey records.'
      }
    ];
  }

  return {
    destinationId: dest.id,
    historicalTimeline: timeline,
    architectureHighlights: architecture,
    documentedHistoryFacts: facts,
    folkloreAndLegends: folklore,
    sourcesAndReferences: references,
    narrations: {
      en: createSynthesizedNarrations(dest, 'en'),
      kn: createSynthesizedNarrations(dest, 'kn'),
      te: createSynthesizedNarrations(dest, 'te'),
      hi: createSynthesizedNarrations(dest, 'hi'),
      ta: createSynthesizedNarrations(dest, 'ta'),
      ml: createSynthesizedNarrations(dest, 'ml')
    },
    faqList: [
      {
        id: `${dest.id}-faq-1`,
        category: 'history',
        question: {
          en: `Why is ${dest.name} historically significant?`,
          kn: `${dest.name} ನ ಐತಿಹಾಸಿಕ ಮಹತ್ವವೇನು?`,
          te: `${dest.name} యొక్క చారిత్రక ప్రాముఖ్యత ఏమిటి?`,
          hi: `${dest.name} का ऐतिहासिक महत्व क्या है?`,
          ta: `${dest.name} இன் வரலாற்று முக்கியத்துவம் என்ன?`,
          ml: `${dest.name} ന്റെ ചരിത്രപരമായ പ്രാധാന്യം എന്താണ്?`
        },
        answer: {
          en: `${dest.name} in ${dest.district} is celebrated for: ${dest.significance}. It offers an ideal ${dest.idealDays} exploration timeline.`,
          kn: `${dest.district} ಜಿಲ್ಲೆಯ ${dest.name} ಯು: ${dest.significance} ಗೆ ಹೆಸರುವಾಸಿಯಾಗಿದೆ.`,
          te: `${dest.district} జిల్లాలోని ${dest.name}: ${dest.significance} కు ఎంతో ప్రసిద్ధి చెందింది.`,
          hi: `${dest.district} जिले में स्थित ${dest.name}: ${dest.significance} के लिए प्रसिद्ध है।`,
          ta: `${dest.district} மாவட்டத்தில் உள்ள ${dest.name}: ${dest.significance} க்கு புகழ்பெற்றது.`,
          ml: `${dest.district} ജില്ലയിലെ ${dest.name}: ${dest.significance} എന്നതിന് പ്രസിദ്ധമാണ്.`
        }
      },
      {
        id: `${dest.id}-faq-2`,
        category: 'tips',
        question: {
          en: `What are the top things to see and eat in ${dest.name}?`,
          kn: `${dest.name} ನಲ್ಲಿ ನೋಡಬೇಕಾದ ಪ್ರಮುಖ ಸ್ಥಳಗಳು ಮತ್ತು ತಿಂಡಿಗಳು ಯಾವುವು?`,
          te: `${dest.name} లో చూడవలసిన ముఖ్య ప్రదేశాలు మరియు ఆహారాలు ఏమిటి?`,
          hi: `${dest.name} में देखने योग्य प्रमुख स्थल और स्थानीय व्यंजन कौन से हैं?`,
          ta: `${dest.name} இல் பார்க்க வேண்டிய முக்கிய இடங்கள் மற்றும் உணவுகள் யாவை?`,
          ml: `${dest.name} ൽ കാണേണ്ട പ്രധാന സ്ഥലങ്ങളും ഭക്ഷണങ്ങളും ഏതെല്ലാമാണ്?`
        },
        answer: {
          en: `Key attractions include ${dest.topAttractions.map((a: any) => a.name).join(', ')}. Must-try local foods include ${dest.localDelicacies.join(', ')}.`,
          kn: `ಪ್ರಮುಖ ಆಕರ್ಷಣೆಗಳು: ${dest.topAttractions.map((a: any) => a.name).join(', ')}. ಪ್ರಮುಖ ತಿನಿಸುಗಳು: ${dest.localDelicacies.join(', ')}.`,
          te: `ముఖ్యమైన ప్రదేశాలు: ${dest.topAttractions.map((a: any) => a.name).join(', ')}. ప్రసిద్ధ వంటకాలు: ${dest.localDelicacies.join(', ')}.`,
          hi: `प्रमुख आकर्षण: ${dest.topAttractions.map((a: any) => a.name).join(', ')}. प्रसिद्ध स्थानीय व्यंजन: ${dest.localDelicacies.join(', ')}.`,
          ta: `முக்கிய இடங்கள்: ${dest.topAttractions.map((a: any) => a.name).join(', ')}. பாரம்பரிய உணவுகள்: ${dest.localDelicacies.join(', ')}.`,
          ml: `പ്രധാന ആകർഷണങ്ങൾ: ${dest.topAttractions.map((a: any) => a.name).join(', ')}. പ്രാദേശിക വിഭവങ്ങൾ: ${dest.localDelicacies.join(', ')}.`
        }
      }
    ]
  };
}

function createSynthesizedNarrations(dest: any, lang: VoiceGuideLanguage): Record<'quick' | 'standard' | 'deep_history', NarrationScript> {
  const name = lang === 'kn' ? dest.kannadaName : dest.name;

  if (lang === 'kn') {
    return {
      quick: {
        language: 'kn',
        languageNativeName: 'ಕನ್ನಡ',
        estimatedDuration: '75 sec',
        fullText: `${name} ಗೆ ಆತ್ಮೀಯ ಸುಸ್ವಾಗತ! ${dest.district} ಜಿಲ್ಲೆಯಲ್ಲಿರುವ ಈ ತಾಣವು ${dest.tagline} ಎಂದು ಪ್ರಸಿದ್ಧಿ ಪಡೆದಿದೆ. ಇಲ್ಲಿನ ಪ್ರಮುಖ ಆಕರ್ಷಣೆಗಳೆಂದರೆ ${dest.topAttractions.map((a: any) => a.name).slice(0, 3).join(', ')}. ಈ ಸ್ಥಳದ ಭೇಟಿಯು ನಿಮ್ಮ ಮನಸ್ಸಿಗೆ ಅಪಾರ ನೆಮ್ಮದಿ ಮತ್ತು ಜ್ಞಾನವನ್ನು ನೀಡುತ್ತದೆ.`,
        sections: [
          { title: `${name} ಪರಿಚಯ`, text: `${dest.district} ಜಿಲ್ಲೆಯ ಸುಂದರ ತಾಣ ${name}.`, startPercent: 0 },
          { title: 'ಪ್ರಮುಖ ಆಕರ್ಷಣೆಗಳು', text: `${dest.topAttractions.map((a: any) => a.name).slice(0, 3).join(', ')}.`, startPercent: 40 },
          { title: 'ಪ್ರವಾಸದ ಅನುಭವ', text: `${dest.bestTimeToVisit} ಭೇಟಿಗೆ ಅತ್ಯುತ್ತಮ ಸಮಯವಾಗಿದೆ.`, startPercent: 75 }
        ]
      },
      standard: {
        language: 'kn',
        languageNativeName: 'ಕನ್ನಡ',
        estimatedDuration: '3 min',
        fullText: `ನಮಸ್ಕಾರ! ${dest.district} ಜಿಲ್ಲೆಯ ಪ್ರಸಿದ್ಧ ತಾಣವಾದ ${name} ಗೆ ಸ್ವಾಗತ. ${dest.description}\n\nಇಲ್ಲಿನ ಐತಿಹಾಸಿಕ ಮಹತ್ವ: ${dest.significance}. ಭೇಟಿ ನೀಡುವಾಗ ಪ್ರಮುಖವಾಗಿ ನೋಡಬೇಕಾದ ಸ್ಥಳಗಳೆಂದರೆ ${dest.topAttractions.map((a: any) => a.name).join(', ')}. ಸ್ಥಳೀಯ ತಿನಿಸುಗಳಾದ ${dest.localDelicacies.slice(0, 3).join(', ')} ಸವಿಯುವುದನ್ನು ಮರೆಯದಿರಿ. ಪ್ರಕೃತಿ ಮತ್ತು ಪರಂಪರೆಯನ್ನು ಗೌರವಿಸಿ ಪ್ರವಾಸವನ್ನು ಆನಂದಿಸಿ.`,
        sections: [
          { title: 'ಹಿನ್ನೆಲೆ ಮತ್ತು ಇತಿಹಾಸ', text: `${dest.significance}`, startPercent: 0 },
          { title: 'ಪ್ರಮುಖ ಸ್ಥಳಗಳ ದರ್ಶನ', text: `${dest.topAttractions.map((a: any) => a.name).join(', ')}`, startPercent: 35 },
          { title: 'ಆಹಾರ ಮತ್ತು ಜವಾಬ್ದಾರಿಯುತ ಪ್ರವಾಸ', text: `${dest.localDelicacies.join(', ')} ಮತ್ತು ನಿಯಮಗಳ ಪಾಲನೆ.`, startPercent: 70 }
        ]
      },
      deep_history: {
        language: 'kn',
        languageNativeName: 'ಕನ್ನಡ',
        estimatedDuration: '5.5 min',
        fullText: `${name} ನ ಸಮಗ್ರ ಮಾರ್ಗದರ್ಶಿಗೆ ಸ್ವಾಗತ. ${dest.district} ಜಿಲ್ಲೆಯ ಈ ಪ್ರದೇಶವು ಕರ್ನಾಟಕದ ಸಾಂಸ್ಕೃತಿಕ ನಕ್ಷೆಯಲ್ಲಿ ವಿಶಿಷ್ಟ ಸ್ಥಾನ ಪಡೆದಿದೆ. ${dest.description}\n\nಇಲ್ಲಿನ ದಾಖಲಿತ ಇತಿಹಾಸ ಮತ್ತು ಮಹತ್ವ: ${dest.significance}. ಈ ತಾಣವು ${dest.accessibilityRating} ತರಹದ ಭೂಪ್ರದೇಶವನ್ನು ಹೊಂದಿದ್ದು, ${dest.bestTimeToVisit} ತಿಂಗಳುಗಳು ಪ್ರವಾಸಕ್ಕೆ ಸೂಕ್ತವಾಗಿವೆ. ಅಧಿಕೃತ ಸಂಸ್ಥೆ: ${dest.verifiedAuthority || 'ಕರ್ನಾಟಕ ಪ್ರವಾಸೋದ್ಯಮ ಇಲಾಖೆ'}.`,
        sections: [
          { title: 'ಪ್ರಾಚೀನ ಇತಿಹಾಸ', text: `${dest.significance}`, startPercent: 0 },
          { title: 'ವಾಸ್ತುಶಿಲ್ಪ ಮತ್ತು ವೈಶಿಷ್ಟ್ಯ', text: `${dest.topAttractions.map((a: any) => `${a.name}: ${a.description}`).slice(0, 3).join(' ')}`, startPercent: 30 },
          { title: 'ಸ್ಥಳೀಯ ಸಂಸ್ಕೃತಿ ಮತ್ತು ಆಹಾರ', text: `${dest.localDelicacies.join(', ')}`, startPercent: 65 },
          { title: 'ಸಂರಕ್ಷಣೆ ಮತ್ತು ನಿಯಮಗಳು', text: `ಪರಿಸರ ಸಂರಕ್ಷಣೆ ಮತ್ತು ಜವಾಬ್ದಾರಿಯುತ ಪ್ರವಾಸ.`, startPercent: 85 }
        ]
      }
    };
  }

  if (lang === 'te') {
    return {
      quick: {
        language: 'te',
        languageNativeName: 'తెలుగు',
        estimatedDuration: '75 sec',
        fullText: `${name} కు సుస్వాగతం! ${dest.district} జిల్లాలో వెలసిన ఈ సుందర ప్రదేశం "${dest.tagline}" గా ఖ్యాతి గడించింది. ఇక్కడి ముఖ్య దర్శనీయ స్థలాలు ${dest.topAttractions.map((a: any) => a.name).slice(0, 3).join(', ')}. కర్ణాటక పర్యటనలో తప్పక దర్శించవలసిన అద్భుత ప్రదేశం ఇది.`,
        sections: [
          { title: `${name} పరిచయం`, text: `${dest.district} జిల్లాలోని ప్రసిద్ధ క్షేత్రం ${name}.`, startPercent: 0 },
          { title: 'ముఖ్య ఆకర్షణలు', text: `${dest.topAttractions.map((a: any) => a.name).slice(0, 3).join(', ')}.`, startPercent: 40 },
          { title: 'సందర్శన సమయం', text: `${dest.bestTimeToVisit} సందర్శనకు అత్యుత్తమ కాలం.`, startPercent: 75 }
        ]
      },
      standard: {
        language: 'te',
        languageNativeName: 'తెలుగు',
        estimatedDuration: '3 min',
        fullText: `నమస్కారం! ${dest.district} జిల్లాలోని ప్రసిద్ధ పర్యాటక ప్రాంతమైన ${name} కు స్వాగతం. ${dest.description}\n\nఈ ప్రాంత చారిత్రక ప్రాముఖ్యత: ${dest.significance}. ఇక్కడ ముఖ్యంగా చూడవలసినవి: ${dest.topAttractions.map((a: any) => a.name).join(', ')}. స్థానిక వంటకాలు ${dest.localDelicacies.slice(0, 3).join(', ')} ఎంతో రుచికరమైనవి. నిబంధనలను పాటిస్తూ ఆనందంగా పర్యటించండి.`,
        sections: [
          { title: 'చారిత్రక నేపథ్యం', text: `${dest.significance}`, startPercent: 0 },
          { title: 'ముఖ్య స్థలాల దర్శనం', text: `${dest.topAttractions.map((a: any) => a.name).join(', ')}`, startPercent: 35 },
          { title: 'రుచులు మరియు పర్యాటక నియమాలు', text: `${dest.localDelicacies.join(', ')}.`, startPercent: 70 }
        ]
      },
      deep_history: {
        language: 'te',
        languageNativeName: 'తెలుగు',
        estimatedDuration: '5.5 min',
        fullText: `${name} యొక్క సమగ్ర వాయిస్ గైడ్‌కు స్వాగతం. ${dest.district} జిల్లాలో ఉన్న ఈ ప్రాంతం ఎంతో ప్రాచీనమైనది. ${dest.description}\n\nచారిత్రక ఆధారాలు: ${dest.significance}. శిల్పకళా విశేషాలు మరియు పర్యాటక నియమాలను తెలుసుకుంటూ కర్ణాటక సంస్కృతిని అనుభూతి చెందండి.`,
        sections: [
          { title: 'ప్రాచీన చరిత్ర', text: `${dest.significance}`, startPercent: 0 },
          { title: 'శిల్పకళ మరియు విశేషాలు', text: `${dest.topAttractions.map((a: any) => a.name).join(', ')}`, startPercent: 30 },
          { title: 'స్థానిక సంస్కృతి', text: `${dest.localDelicacies.join(', ')}`, startPercent: 65 },
          { title: 'పరిరక్షణ మరియు పర్యాటకం', text: `బాధ్యతాయుత పర్యాటక మార్గదర్శకాలు.`, startPercent: 85 }
        ]
      }
    };
  }

  if (lang === 'hi') {
    return {
      quick: {
        language: 'hi',
        languageNativeName: 'हिन्दी',
        estimatedDuration: '75 sec',
        fullText: `${name} में आपका हार्दिक स्वागत है! ${dest.district} जिले में स्थित यह स्थल "${dest.tagline}" के रूप में प्रसिद्ध है। यहाँ के प्रमुख आकर्षण हैं ${dest.topAttractions.map((a: any) => a.name).slice(0, 3).join(', ')}। कर्नाटक यात्रा का यह एक अत्यंत मनमोहक अनुभव है।`,
        sections: [
          { title: `${name} परिचय`, text: `${dest.district} का प्रसिद्ध पर्यटन स्थल ${name}।`, startPercent: 0 },
          { title: 'प्रमुख दर्शनीय स्थल', text: `${dest.topAttractions.map((a: any) => a.name).slice(0, 3).join(', ')}।`, startPercent: 40 },
          { title: 'उत्तम मौसम', text: `${dest.bestTimeToVisit} यहाँ घूमने का सर्वोत्तम समय है।`, startPercent: 75 }
        ]
      },
      standard: {
        language: 'hi',
        languageNativeName: 'हिन्दी',
        estimatedDuration: '3 min',
        fullText: `नमस्ते! ${dest.district} जिले के प्रसिद्ध स्थल ${name} में आपका स्वागत है। ${dest.description}\n\nइसका ऐतिहासिक महत्व: ${dest.significance}। यहाँ के प्रमुख आकर्षण हैं: ${dest.topAttractions.map((a: any) => a.name).join(', ')}। स्थानीय व्यंजनों ${dest.localDelicacies.slice(0, 3).join(', ')} का स्वाद अवश्य लें। जिम्मेदार पर्यटन का पालन करते हुए यात्रा का आनंद लें।`,
        sections: [
          { title: 'ऐतिहासिक पृष्ठभूमि', text: `${dest.significance}`, startPercent: 0 },
          { title: 'दर्शनीय स्थल', text: `${dest.topAttractions.map((a: any) => a.name).join(', ')}`, startPercent: 35 },
          { title: 'खान-पान और दिशानिर्देश', text: `${dest.localDelicacies.join(', ')}।`, startPercent: 70 }
        ]
      },
      deep_history: {
        language: 'hi',
        languageNativeName: 'हिन्दी',
        estimatedDuration: '5.5 min',
        fullText: `${name} के विस्तृत ऐतिहासिक विवरण में आपका स्वागत है। ${dest.district} जिले का यह क्षेत्र कर्नाटक के मानचित्र पर विशिष्ट स्थान रखता है। ${dest.description}\n\nप्रमाणित इतिहास: ${dest.significance}। इस धरोहर का आदर करें और स्वच्छता बनाए रखें।`,
        sections: [
          { title: 'प्राचीन इतिहास', text: `${dest.significance}`, startPercent: 0 },
          { title: 'वास्तुकला एवं विशेषताएं', text: `${dest.topAttractions.map((a: any) => a.name).join(', ')}`, startPercent: 30 },
          { title: 'स्थानीय परंपरा और खानपान', text: `${dest.localDelicacies.join(', ')}`, startPercent: 65 },
          { title: 'जिम्मेदार पर्यटन', text: `धरोहर संरक्षण के नियम।`, startPercent: 85 }
        ]
      }
    };
  }

  if (lang === 'ta') {
    return {
      quick: {
        language: 'ta',
        languageNativeName: 'தமிழ்',
        estimatedDuration: '75 sec',
        fullText: `${name} க்கு நல்வரவு! ${dest.district} மாவட்டத்தில் அமைந்துள்ள இந்த திருத்தலம் "${dest.tagline}" என்று அழைக்கப்படுகிறது. இங்குள்ள முக்கிய இடங்கள்: ${dest.topAttractions.map((a: any) => a.name).slice(0, 3).join(', ')}. உங்கள் கர்நாடகப் பயணம் மறக்க முடியாததாக அமைய வாழ்த்துகள்.`,
        sections: [
          { title: `${name} அறிமுகம்`, text: `${dest.district} மாவட்டத்தின் வரலாற்றுத் தலம்.`, startPercent: 0 },
          { title: 'முக்கிய இடங்கள்', text: `${dest.topAttractions.map((a: any) => a.name).slice(0, 3).join(', ')}.`, startPercent: 40 },
          { title: 'பயணக் காலம்', text: `${dest.bestTimeToVisit} வருகைக்கு ஏற்ற காலம்.`, startPercent: 75 }
        ]
      },
      standard: {
        language: 'ta',
        languageNativeName: 'தமிழ்',
        estimatedDuration: '3 min',
        fullText: `வணக்கம்! ${dest.district} மாவட்டத்தில் அமைந்துள்ள ${name} க்கு உங்களை வரவேற்கிறோம். ${dest.description}\n\nவரலாற்றுச் சிறப்பு: ${dest.significance}. பார்க்க வேண்டிய இடங்கள்: ${dest.topAttractions.map((a: any) => a.name).join(', ')}. பாரம்பரிய உணவுகளான ${dest.localDelicacies.slice(0, 3).join(', ')} சுவைக்க மறக்காதீர்கள்.`,
        sections: [
          { title: 'வரலாற்றுப் பின்னணி', text: `${dest.significance}`, startPercent: 0 },
          { title: 'காணவேண்டிய இடங்கள்', text: `${dest.topAttractions.map((a: any) => a.name).join(', ')}`, startPercent: 35 },
          { title: 'உணவு மற்றும் வழிகாட்டுதல்', text: `${dest.localDelicacies.join(', ')}.`, startPercent: 70 }
        ]
      },
      deep_history: {
        language: 'ta',
        languageNativeName: 'தமிழ்',
        estimatedDuration: '5.5 min',
        fullText: `${name} இன் ஆழமான வரலாற்று விவரங்களுக்கு நல்வரவு. ${dest.description}\n\nவரலாற்று முக்கியத்துவம்: ${dest.significance}. கலைநயம் மற்றும் பண்பாட்டை போற்றி பாதுகாப்பது நமது கடமையாகும்.`,
        sections: [
          { title: 'பண்டைய வரலாறு', text: `${dest.significance}`, startPercent: 0 },
          { title: 'கட்டடக்கலை', text: `${dest.topAttractions.map((a: any) => a.name).join(', ')}`, startPercent: 30 },
          { title: 'கலாச்சாரம் மற்றும் உணவு', text: `${dest.localDelicacies.join(', ')}`, startPercent: 65 },
          { title: 'பாதுகாப்பு நெறிமுறைகள்', text: `பொறுப்புள்ள சுற்றுலா விதிகள்.`, startPercent: 85 }
        ]
      }
    };
  }

  if (lang === 'ml') {
    return {
      quick: {
        language: 'ml',
        languageNativeName: 'മലയാളം',
        estimatedDuration: '75 sec',
        fullText: `${name} ലേക്ക് ഹൃദ്യമായ സ്വാഗതം! ${dest.district} ജില്ലയിലുള്ള ഈ സ്ഥലം "${dest.tagline}" എന്ന പേരിൽ പ്രസിദ്ധമാണ്. ഇവിടുത്തെ പ്രധാന ആകർഷണങ്ങളാണ് ${dest.topAttractions.map((a: any) => a.name).slice(0, 3).join(', ')}. കർണാടക യാത്രയിൽ മറക്കാനാവാത്ത അനുഭവമാണിത്.`,
        sections: [
          { title: `${name} ആമുഖം`, text: `${dest.district} ലെ പ്രധാന വിനോദസഞ്ചാര കേന്ദ്രം.`, startPercent: 0 },
          { title: 'പ്രധാന കാഴ്ചകൾ', text: `${dest.topAttractions.map((a: any) => a.name).slice(0, 3).join(', ')}.`, startPercent: 40 },
          { title: 'സന്ദർശന സമയം', text: `${dest.bestTimeToVisit} ഏറ്റവും അനുയോജ്യമായ സമയം.`, startPercent: 75 }
        ]
      },
      standard: {
        language: 'ml',
        languageNativeName: 'മലയാളം',
        estimatedDuration: '3 min',
        fullText: `നമസ്കാരം! ${dest.district} ലെ പ്രശസ്ത കേന്ദ്രമായ ${name} ലേക്ക് സ്വാഗതം. ${dest.description}\n\nചരിത്ര പ്രാധാന്യം: ${dest.significance}. പ്രധാന കാഴ്ചകൾ: ${dest.topAttractions.map((a: any) => a.name).join(', ')}. തനത് വിഭവങ്ങളായ ${dest.localDelicacies.slice(0, 3).join(', ')} ആസ്വദിക്കൂ. ഉത്തരവാദിത്തമുള്ള വിനോദസഞ്ചാര രീതികൾ പാലിക്കുക.`,
        sections: [
          { title: 'ചരിത്ര പശ്ചാത്തലം', text: `${dest.significance}`, startPercent: 0 },
          { title: 'കാഴ്ചകൾ', text: `${dest.topAttractions.map((a: any) => a.name).join(', ')}`, startPercent: 35 },
          { title: 'രുചികളും നിർദ്ദേശങ്ങളും', text: `${dest.localDelicacies.join(', ')}.`, startPercent: 70 }
        ]
      },
      deep_history: {
        language: 'ml',
        languageNativeName: 'മലയാളം',
        estimatedDuration: '5.5 min',
        fullText: `${name} ന്റെ സമഗ്ര ചരിത്രത്തിലേക്ക് സ്വാഗതം. ${dest.description}\n\nചരിത്രപരമായ തെളിവുകൾ: ${dest.significance}. കർണാടകയുടെ ശില്പകലാവൈഭവവും പ്രകൃതിഭംഗിയും ഉത്തരവാദിത്തത്തോടെ ആസ്വദിക്കൂ.`,
        sections: [
          { title: 'പ്രാചീന ചരിത്രം', text: `${dest.significance}`, startPercent: 0 },
          { title: 'ശില്പകലയും പ്രത്യേകതകളും', text: `${dest.topAttractions.map((a: any) => a.name).join(', ')}`, startPercent: 30 },
          { title: 'പാരമ്പര്യവും ഭക്ഷണവും', text: `${dest.localDelicacies.join(', ')}`, startPercent: 65 },
          { title: 'പൈതൃക സംരക്ഷണം', text: `ഉത്തരവാദിത്ത ടൂറിസം നിർദ്ദേശങ്ങൾ.`, startPercent: 85 }
        ]
      }
    };
  }

  // English fallback
  return {
    quick: {
      language: 'en',
      languageNativeName: 'English',
      estimatedDuration: '75 sec',
      fullText: `Welcome to ${dest.name}, located in ${dest.district} district. Known as "${dest.tagline}", this destination features ${dest.topAttractions.map((a: any) => a.name).slice(0, 3).join(', ')}. Experience the cultural grandeur and natural landscapes of Karnataka.`,
      sections: [
        { title: `Welcome to ${dest.name}`, text: `Located in ${dest.district} district, ${dest.tagline}.`, startPercent: 0 },
        { title: 'Highlights', text: `${dest.topAttractions.map((a: any) => a.name).slice(0, 3).join(', ')}.`, startPercent: 40 },
        { title: 'Visitor Tips', text: `Best visited between ${dest.bestTimeToVisit}.`, startPercent: 75 }
      ]
    },
    standard: {
      language: 'en',
      languageNativeName: 'English',
      estimatedDuration: '3 min',
      fullText: `Namaskara and welcome to ${dest.name}. ${dest.description}\n\nHistorical & Cultural Significance: ${dest.significance}\n\nTop Attractions: ${dest.topAttractions.map((a: any) => `${a.name} (${a.description})`).join('; ')}.\n\nLocal Delicacies: Do not miss ${dest.localDelicacies.join(', ')}. Please practice responsible tourism by leaving no waste and respecting local customs.`,
      sections: [
        { title: 'Historical Overview', text: `${dest.significance}`, startPercent: 0 },
        { title: 'Top Sights & Architecture', text: `${dest.topAttractions.map((a: any) => a.name).join(', ')}`, startPercent: 35 },
        { title: 'Local Delicacies & Guidelines', text: `${dest.localDelicacies.join(', ')}`, startPercent: 70 }
      ]
    },
    deep_history: {
      language: 'en',
      languageNativeName: 'English',
      estimatedDuration: '5.5 min',
      fullText: `Welcome to the in-depth heritage exploration of ${dest.name} in ${dest.district} district, Karnataka.\n\nHistorical Context: ${dest.significance}\n\nArchitectural & Geographical Highlights: ${dest.description}\n\nVerified Authority: Documented by ${dest.verifiedAuthority || 'Archaeological Survey of India & Karnataka Tourism'}. The site offers an ideal ${dest.idealDays} exploration timeline with ${dest.accessibilityRating} terrain accessibility.\n\nResponsible Tourism: Please abide by seasonal notices (${dest.seasonalNotice || 'Plan around seasonal weather'}) and preserve this sacred heritage for future generations.`,
      sections: [
        { title: 'Historical Context & Inscriptions', text: `${dest.significance}`, startPercent: 0 },
        { title: 'Architectural Heritage', text: `${dest.topAttractions.map((a: any) => `${a.name}: ${a.description}`).join(' ')}`, startPercent: 30 },
        { title: 'Cultural Traditions & Cuisine', text: `${dest.localDelicacies.join(', ')}`, startPercent: 65 },
        { title: 'Conservation & Responsible Tourism', text: `Preserved under ${dest.verifiedAuthority || 'State Heritage Guidelines'}.`, startPercent: 85 }
      ]
    }
  };
}
