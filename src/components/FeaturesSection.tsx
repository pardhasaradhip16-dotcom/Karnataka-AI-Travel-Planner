import React from 'react';
import { 
  Sparkles, 
  IndianRupee, 
  HeartHandshake, 
  Users, 
  Navigation,
  CheckCircle
} from 'lucide-react';

interface FeaturesSectionProps {
  currentLanguage?: string;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ currentLanguage = 'en' }) => {
  const isKn = currentLanguage === 'kn';
  const isTe = currentLanguage === 'te';
  const isHi = currentLanguage === 'hi';
  const isTa = currentLanguage === 'ta';
  const isMl = currentLanguage === 'ml';

  const features = [
    {
      id: 'personalized',
      title: isKn ? 'ವೈಯಕ್ತಿಕಗೊಳಿಸಿದ ಶಿಫಾರಸುಗಳು' :
             isTe ? 'వ్యక్తిగతీకరించిన సిఫార్సులు' :
             isHi ? 'व्यक्तिगत सिफारिशें' :
             isTa ? 'தனிப்பயனாக்கப்பட்ட பரிந்துரைகள்' :
             isMl ? 'വ്യക്തിഗത നിർദ്ദേശങ്ങൾ' :
             'Personalized Recommendations',
      nativeSubtitle: isKn ? 'ನಿಮ್ಮ ಜೀವನಶೈಲಿಗೆ ತಕ್ಕಂತೆ' :
                      isTe ? 'మీ ప్రాధాన్యతలకు తగినట్లుగా' :
                      isHi ? 'आपकी जीवनशैली के अनुसार' :
                      isTa ? 'உங்கள் விருப்பத்திற்கேற்ப' :
                      isMl ? 'നിങ്ങളുടെ രീതിക്ക് അനുസരിച്ച്' :
                      'Tailored for your lifestyle',
      description: isKn ? 'ವಯಸ್ಸಾದ ಪೋಷಕರೊಂದಿಗೆ ಸುಲಭ ಪ್ರವೇಶದ ದೇವಾಲಯ ಪ್ರವಾಸವಿರಲಿ, ಕೂರ್ಗಿನ ಮಂಜಿನ ಪ್ರವಾಸವಿರಲಿ ಅಥವಾ ಗೋಕರ್ಣದ ಕಡಲತೀರ ಸಾಹಸವಿರಲಿ — AI ಎಲ್ಲವನ್ನೂ ನಿಖರವಾಗಿ ಯೋಜಿಸುತ್ತದೆ.' :
                   isTe ? 'వృద్ధ తల్లిదండ్రులతో సులభంగా వెళ్లే దేవాలయ పర్యటనలైనా, కూర్గ్ పొగమంచు విహారయాత్రలైనా లేదా గోకర్ణ క్లిఫ్ బీచ్ ట్రెక్కింగ్ అయినా — AI ప్రతి నిమిషాన్ని మీకు తగినట్లుగా రూపొందిస్తుంది.' :
                   isHi ? 'बुजुर्ग माता-पिता के साथ आसान मंदिर यात्रा हो, कूर्ग की धुंध भरी पहाड़ियां हों या गोकर्ण का समुद्र तट — AI आपके अनुसार हर पल की योजना बनाता है।' :
                   isTa ? 'வயதான பெற்றோருடன் எளிதான கோயில் தரிசனம், கூர்க்கின் அழகிய மலைப்பயணம் அல்லது கோகர்ண கடற்கரை உலா என அனைத்தையும் AI உங்களுக்காக திட்டமிடுகிறது.' :
                   isMl ? 'പ്രായമായ മാതാപിതാക്കളുമൊത്തുള്ള ക്ഷേത്ര ദർശനം, കൂർഗ് യാത്ര അല്ലെങ്കിൽ ഗോകർണം ബീച്ച് ട്രെക്കിംഗ് എന്നിവ AI കൃത്യമായി പ്ലാൻ ചെയ്യുന്നു.' :
                   'Whether you are traveling with elderly parents who require easy-access temple ramps, taking a romantic misty Coorg escape, or backpacking the cliff trails of Gokarna, the AI tailors every minute to your lifestyle.',
      icon: Users,
      badge: isKn ? 'ನಿಮಗಾಗಿ ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ' :
             isTe ? 'మీ కోసం ప్రత్యేకంగా' :
             isHi ? 'आपके लिए विशेष' :
             isTa ? 'உங்களுக்காக பிரத்யேகமானது' :
             isMl ? 'നിങ്ങൾക്കായി പ്രത്യേകം' :
             'Tailored for You',
      iconBg: 'bg-emerald-600 text-white',
      bulletPoints: isKn ? [
        'ಕುಟುಂಬ ಮತ್ತು ಹಿರಿಯರಿಗೆ ಸುಲಭ ಪ್ರವೇಶದ ಸೌಲಭ್ಯಗಳು',
        'ಆರಾಮದಾಯಕ ನಡಿಗೆಯಿಂದ ಹಿಡಿದು ಸಾಹಸಮಯ ಟ್ರೆಕ್ವರೆಗಿನ ವೇಗ',
        'ಆಹಾರ ಆದ್ಯತೆಗಳ ಕಾಳಜಿ (ಶುದ್ಧ ಸಸ್ಯಾಹಾರ, ಸಾತ್ವಿಕ ಅಥವಾ ಸ್ಥಳೀಯ ಖಾದ್ಯಗಳು)'
      ] : isTe ? [
        'కుటుంబం & వృద్ధులకు అనువైన ప్రత్యేక సౌకర్యాలు',
        'ప్రశాంత నడక నుండి సాహసయాత్రల వరకు అనుకూల వేగం',
        'ఆహార ప్రాధాన్యతలు (శుద్ధ శాఖాహారం, సాత్విక భోజనం లేదా స్థానిక రుచులు)'
      ] : isHi ? [
        'परिवार और वरिष्ठ नागरिकों के लिए अनुकूल सुविधाएं',
        'आरामदायक सैर से लेकर साहसिक ट्रेक तक अनुकूल गति',
        'खान-पान की प्राथमिकताओं का ध्यान (शुद्ध शाकाहारी, सात्विक या स्थानीय व्यंजन)'
      ] : isTa ? [
        'குடும்பம் மற்றும் மூத்த குடிமக்களுக்கான எளிய வசதிகள்',
        'அமைதியான நடைப்பயணம் முதல் சாகச மலையேற்றம் வரையிலான வேகம்',
        'உணவு விருப்பங்கள் (தூய சைவம், சாத்விக அல்லது பாரம்பரிய உணவுகள்)'
      ] : isMl ? [
        'കുടുംബത്തിനും മുതിർന്നവർക്കും അനുയോജ്യമായ സൗകര്യങ്ങൾ',
        'ശാന്തമായ നടത്തം മുതൽ സാഹസിക ട്രെക്കിംഗ് വരെയുള്ള വേഗത',
        'ഭക്ഷണ മുൻഗണനകൾ (ശുദ്ധ സസ്യാഹാരം, സാത്വിക അല്ലെങ്കിൽ നാടൻ വിഭവങ്ങൾ)'
      ] : [
        'Family & senior-friendly accessibility tags',
        'Custom pace: from leisurely morning strolls to action-packed treks',
        'Catering to dietary preferences (pure veg, sattvic, Jain, or coastal seafood)'
      ]
    },
    {
      id: 'budget',
      title: isKn ? 'ಪಾರದರ್ಶಕ ಬಜೆಟ್ ಯೋಜನೆ' :
             isTe ? 'పారదర్శక బడ్జెట్ ప్రణాళిక' :
             isHi ? 'पारदर्शी बजट योजना' :
             isTa ? 'வெளிப்படையான பட்ஜெட் திட்டம்' :
             isMl ? 'സുതാര്യമായ ബജറ്റ് പ്ലാനിംഗ്' :
             'Transparent Budget Awareness',
      nativeSubtitle: isKn ? 'ಯಾವುದೇ ಗುಪ್ತ ಶುಲ್ಕಗಳಿಲ್ಲ' :
                      isTe ? 'దాచిన అదనపు ఖర్చులు లేవు' :
                      isHi ? 'कोई छिपा हुआ शुल्क नहीं' :
                      isTa ? 'மறைமுக கட்டணங்கள் இல்லை' :
                      isMl ? 'മറഞ്ഞിരിക്കുന്ന നിരക്കുകളില്ല' :
                      'Zero Hidden Costs',
      description: isKn ? 'ಯಾವುದೇ ಅನಿರೀಕ್ಷಿತ ವೆಚ್ಚಗಳಿಲ್ಲ. KSTDC ಸಾರಿಗೆ, KSRTC ಐರಾವತ ಐಷಾರಾಮಿ ಬಸ್ಸುಗಳು, ಪರಿಶೀಲಿಸಿದ ಹೋಂಸ್ಟೇಗಳು ಮತ್ತು ಸ್ಥಳೀಯ ಆಹಾರದ ನೈಜ ವೆಚ್ಚಗಳ ವಿವರಣೆ.' :
                   isTe ? 'ఎటువంటి ఆశ్చర్యకరమైన దాచిన ఛార్జీలు లేవు. KSTDC రవాణా, KSRTC ఐరావత్ బస్సులు, ధృవీకరించబడిన హోమ్‌స్టేలు మరియు భోజన ఖర్చుల స్పష్టమైన వివరాలు.' :
                   isHi ? 'कोई छिपा हुआ खर्च नहीं। KSTDC परिवहन, KSRTC ऐरावत बसें, सत्यापित होमस्टे और भोजन की सटीक वास्तविक लागत का ब्योरा।' :
                   isTa ? 'மறைமுக கட்டணங்கள் ஏதுமில்லை. KSTDC போக்குவரத்து, KSRTC பேருந்துகள், அங்கீகரிக்கப்பட்ட தங்குமிடங்கள் மற்றும் உணவு செலவுகளின் நேரடி விவரம்.' :
                   isMl ? 'മറഞ്ഞിരിക്കുന്ന ചിലവുകളില്ല. KSTDC വാഹനം, KSRTC ഐരാവത് ബസുകൾ, ഹോംസ്റ്റേകൾ, ഭക്ഷണം എന്നിവയുടെ കൃത്യമായ ചിലവ് വിവരങ്ങൾ.' :
                   'Zero hidden surprises. Real-time cost breakdowns covering certified KSTDC transport, KSRTC Airavat luxury coaches, verified heritage homestays, temple sevas, and authentic local meals.',
      icon: IndianRupee,
      badge: isKn ? '100% ಪಾರದರ್ಶಕತೆ' :
             isTe ? '100% పారదర్శకత' :
             isHi ? '100% पारदर्शिता' :
             isTa ? '100% வெளிப்படைத்தன்மை' :
             isMl ? '100% സുതാര്യത' :
             'Zero Hidden Costs',
      iconBg: 'bg-amber-500 text-slate-950',
      bulletPoints: isKn ? [
        'ಆಹಾರ, ವಾಸ್ತವ್ಯ ಮತ್ತು ಸಾರಿಗೆಯ ದೈನಂದಿನ ನಿಖರ ವೆಚ್ಚ',
        'KSRTC / ವಂದೇ ಭಾರತ್ ರೈಲು ದರಗಳ ಏಕೀಕರಣ',
        'ಸರ್ಕಾರ ಅನುಮೋದಿತ ಪರಿಶೀಲಿಸಿದ ಹೋಂಸ್ಟೇಗಳ ನೇರ ಸಂಪರ್ಕ'
      ] : isTe ? [
        'ఆహారం, బస మరియు రవాణా కోసం ఖచ్చితమైన రోజువారీ విభజన',
        'KSRTC / వందే భారత్ రైలు ఛార్జీల సమాచారం',
        'ప్రభుత్వ గుర్తింపు పొందిన హోమ్‌స్టేలకు ప్రత్యక్ష కనెక్షన్'
      ] : isHi ? [
        'भोजन, ठहरने और परिवहन का सटीक दैनिक विवरण',
        'KSRTC / वंदे भारत ट्रेन किरायों का एकीकरण',
        'सरकारी मान्यता प्राप्त सत्यापित होमस्टे से सीधा जुड़ाव'
      ] : isTa ? [
        'உணவு, தங்குமிடம் மற்றும் பயணத்திற்கான துல்லியமான செலவு கணக்கு',
        'KSRTC / வந்தே பாரத் ரயில் கட்டண இணைப்பு',
        'அரசு அங்கீகாரம் பெற்ற தங்குமிடங்களுடன் நேரடி தொடர்பு'
      ] : isMl ? [
        'ഭക്ഷണം, താമസം, യാത്ര എന്നിവയുടെ കൃത്യമായ പ്രതിദിന കണക്കുകൾ',
        'KSRTC / വന്ദേ ഭാരത് ട്രെയിൻ നിരക്കുകളുടെ വിവരങ്ങൾ',
        'സർക്കാർ അംഗീകൃത ഹോംസ്റ്റേകളുമായി നേരിട്ടുള്ള കണക്ഷൻ'
      ] : [
        'Exact daily breakdown for food, stay, and transport',
        'KSRTC / Vande Bharat train fare integration',
        'Direct connection to government-approved certified homestays'
      ]
    },
    {
      id: 'routes',
      title: isKn ? 'ಉತ್ತಮಗೊಳಿಸಿದ ಮಾರ್ಗಗಳು' :
             isTe ? 'సరైన ప్రయాణ మార్గాలు' :
             isHi ? 'सर्वोत्तम यात्रा मार्ग' :
             isTa ? 'மேம்படுத்தப்பட்ட வழித்தடங்கள்' :
             isMl ? 'മികച്ച യാത്രാ റൂട്ടുകൾ' :
             'Topography-Optimized Routes',
      nativeSubtitle: isKn ? 'ಘಟ್ಟ ಮಾರ್ಗಗಳ ನೈಜ ಲೆಕ್ಕಾಚಾರ' :
                      isTe ? 'ఘాట్ రోడ్ల ఖచ్చితమైన లెక్కింపు' :
                      isHi ? 'घाट मार्गों की सटीक गणना' :
                      isTa ? 'மலைப்பாதை நேர கணக்கீடு' :
                      isMl ? 'ചുരം റൂട്ടുകളുടെ സമയം' :
                      'Smart Route Sequencing',
      description: isKn ? 'ಕರ್ನಾಟಕದ ಭೂಪ್ರದೇಶವು ಸಹ್ಯಾದ್ರಿ ಪರ್ವತಗಳು, ದಖ್ಖನ್ ಪ್ರಸ್ಥಭೂಮಿ ಮತ್ತು ಅರಬ್ಬಿ ಸಮುದ್ರ ತೀರಗಳನ್ನು ಒಳಗೊಂಡಿದೆ. ಘಾಟ್ ರಸ್ತೆಗಳು ಮತ್ತು ದರ್ಶನ ಸಮಯಗಳನ್ನು AI ಲೆಕ್ಕಹಾಕುತ್ತದೆ.' :
                   isTe ? 'కర్ణాటక భూభాగం పశ్చిమ కనుమలు, దక్కన్ పీఠభూమి మరియు అరేబియా తీరాన్ని కలిగి ఉంది. మా రూటింగ్ ఇంజిన్ ఘాట్ రోడ్ల మలుపులు మరియు దర్శన సమయాలను లెక్కిస్తుంది.' :
                   isHi ? 'कर्नाटक का भूभाग सह्याद्रि पहाड़ियों, दक्कन के पठार और अरब सागर तट तक फैला है। हमारा रूटिंग इंजन वास्तविक घाट मोड़ों और दर्शन समय की गणना करता है।' :
                   isTa ? 'மேற்கு தொடர்ச்சி மலைகள், தக்காண பீடபூமி மற்றும் கடற்கரையை உள்ளடக்கிய கர்நாடகாவின் மலைப்பாதை மற்றும் கோயில் தரிசன நேரங்களை AI துல்லியமாக கணக்கிடுகிறது.' :
                   isMl ? 'സഹ്യാദ്രി മലനിരകൾ, ഡെക്കാൻ പീഠഭൂമി, തീരദേശം എന്നിവ ഉൾക്കൊള്ളുന്ന കർണാടകയിലെ ചുരം റൂട്ടുകളും ക്ഷേത്ര ദർശന സമയവും AI കൃത്യമായി കണക്കാക്കുന്നു.' :
                   'Karnataka’s terrain spans Sahyadri mountain ghats, Deccan boulder plains, and Arabian coastlines. Our routing engine calculates actual ghat road curves, monsoon closures, and temple darshan timings.',
      icon: Navigation,
      badge: isKn ? 'ಸ್ಮಾರ್ಟ್ ಮಾರ್ಗ ಯೋಜನೆ' :
             isTe ? 'స్మార్ట్ మార్గ ప్లానింగ్' :
             isHi ? 'स्मार्ट रूट योजना' :
             isTa ? 'ஸ்மார்ட் வழித்தடம்' :
             isMl ? 'സ്മാർട്ട് റൂട്ടിംഗ്' :
             'Smart Route Sequencing',
      iconBg: 'bg-teal-600 text-white',
      bulletPoints: isKn ? [
        'ಶಿರಾಡಿ, ಚಾರ್ಮಾಡಿ & ಆಗುಂಬೆ ಘಾಟ್ ರಸ್ತೆಗಳ ನೈಜ ಸ್ಥಿತಿಗತಿ',
        'ಬೆಳಿಗ್ಗೆ ಮತ್ತು ಸಂಜೆಯ ಮಹಾಮಂಗಳಾರತಿ ಸಮಯಕ್ಕೆ ಹೊಂದಾಣಿಕೆ',
        'ದಣಿವು ಉಂಟುಮಾಡುವ ಅನಗತ್ಯ ಅಲೆದಾಟವನ್ನು ತಡೆಯುತ್ತದೆ'
      ] : isTe ? [
        'శిరాడి, చార్మాడి & ఆగంబే ఘాట్ రోడ్ల పరిస్థితుల పరిగణన',
        'ఉదయం & సాయంత్రం హారతి సమయాలకు అనుగుణంగా ఆలయ దర్శనాలు',
        'అనవసరమైన ప్రయాణపు అలసటను నివారిస్తుంది'
      ] : isHi ? [
        'शिराडी, चारमाडी और अगुम्बे घाट सड़क की स्थितियों का ध्यान',
        'सुबह और शाम की आरती के समय के अनुसार मंदिर दर्शन',
        'थका देने वाली अनावश्यक यात्रा से बचाव'
      ] : isTa ? [
        'சிராடி, சார்மாடி மற்றும் அகும்பே மலைப்பாதை நிலைமைகளை கணக்கிடுகிறது',
        'காலை மற்றும் மாலை பூஜை நேரங்களுக்கு ஏற்ப கோயில் தரிசனம்',
        'களைப்பூட்டும் தேவையற்ற பயணங்களை தவிர்க்கிறது'
      ] : isMl ? [
        'ശിരാടി, ചാർമാടി, ആഗുംബെ ചുരം റോഡുകളുടെ അവസ്ഥ പരിഗണിക്കുന്നു',
        'രാവിലെയും വൈകുന്നേരവുമുള്ള പൂജാ സമയത്തിനനുസരിച്ച് ദർശനം',
        'ക്ഷീണിപ്പിക്കുന്ന അനാവശ്യ യാത്രകൾ ഒഴിവാക്കുന്നു'
      ] : [
        'Factors in Shiradi, Charmadi & Agumbe Ghat road conditions',
        'Aligns temple visits with morning & evening Aarti timings',
        'Prevents tiring multi-hour back-and-forth transit'
      ]
    },
    {
      id: 'local',
      title: isKn ? 'ಅಧಿಕೃತ ಸ್ಥಳೀಯ ಅನುಭವಗಳು' :
             isTe ? 'నిజమైన స్థానిక అనుభవాలు' :
             isHi ? 'प्रामाणिक स्थानीय अनुभव' :
             isTa ? 'உண்மையான உள்ளூர் அனுபவங்கள்' :
             isMl ? 'തനത് പ്രാദേശിക അനുഭവങ്ങൾ' :
             'Authentic Local Experiences',
      nativeSubtitle: isKn ? 'ಕನ್ನಡ ಸಂಸ್ಕೃತಿಯ ಸವಿಯನ್ನು ಅನುಭವಿಸಿ' :
                      isTe ? 'కన్నడ సంస్కృతి మరియు రుచుల అనుభవం' :
                      isHi ? 'कन्नड़ संस्कृति का वास्तविक अनुभव' :
                      isTa ? 'பாரம்பரிய கன்னட கலாச்சாரம்' :
                      isMl ? 'യഥാർത്ഥ കന്നഡ സംസ്കാരം' :
                      'Real Cultural Roots',
      description: isKn ? 'ಇಳಕಲ್ ಸಾಂಪ್ರದಾಯಿಕ ಕೈಮಗ್ಗ ನೇಕಾರರು, ಯಕ್ಷಗಾನ ನೃತ್ಯ ನಾಟಕಗಳು, ಕೊಡಗಿನ ಕಾಫಿ ತೋಟಗಳು ಮತ್ತು ಅಪ್ಪಟ ಬಾಳೆ ಎಲೆ ಊಟದ ಸವಿಯನ್ನು ಸವಿಯಿರಿ.' :
                   isTe ? 'ఇళకల్ చేనేత కార్మికులు, రాత్రిపూట యక్షగాన నృత్య ప్రదర్శనలు, కూర్గ్ కాఫీ తయారీ మరియు అరిటాకు భోజనాల నిజమైన అనుభూతిని పొందండి.' :
                   isHi ? 'इलकल के पारंपरिक हथकरघा बुनकरों, यक्षगान नृत्य नाटकों, कोडागु के कॉफ़ी बागानों और प्रामाणिक केले के पत्ते पर भोजन का आनंद लें।' :
                   isTa ? 'இல்கல் கைத்தறி நெசவாளர்கள், யக்ஷகான நாட்டிய நாடகங்கள், குடகு காபி தோட்டங்கள் மற்றும் பாரம்பரிய வாழை இலை விருந்துகளை அனுபவியுங்கள்.' :
                   isMl ? 'ഇൽക്കൽ പരമ്പരാഗത നെയ്ത്തുകാർ, യക്ഷഗാന നൃത്ത നാടകങ്ങൾ, കുടക് കാപ്പിത്തോട്ടങ്ങൾ, വാഴയില സദ്യ എന്നിവ ആസ്വദിക്കൂ.' :
                   'Immerse in true Kannada culture. Witness traditional handloom weavers in Ilkal, attend midnight Yakshagana coastal dance plays, learn bean-to-cup coffee processing in Kodagu, and relish authentic banana-leaf feasts.',
      icon: HeartHandshake,
      badge: isKn ? 'ಅಪ್ಪಟ ಸಾಂಸ್ಕೃತಿಕ ತಾಣ' :
             isTe ? 'నిజమైన సాంస్కృతిక వేళ్ళు' :
             isHi ? 'प्रामाणिक सांस्कृतिक धरोहर' :
             isTa ? 'உண்மையான கலாச்சாரம்' :
             isMl ? 'തനത് പാരമ്പര്യം' :
             'Real Cultural Roots',
      iconBg: 'bg-orange-600 text-white',
      bulletPoints: isKn ? [
        'GI-ಟ್ಯಾಗ್ ಪಡೆದ ಸ್ಥಳೀಯ ಕುಶಲಕರ್ಮಿಗಳು ಮತ್ತು ನೇಕಾರರೊಂದಿಗೆ ನೇರ ಸಂಪರ್ಕ',
        'ಮೈಲಾರಿ ದೋಸೆ, ಧಾರವಾಡ ಪೇಡ, ಕರಾವಳಿ ಖಾದ್ಯಗಳ ಮಾರ್ಗದರ್ಶಿ',
        'ಪ್ರಾಚೀನ ದೇವಾಲಯಗಳ ಸಾಂಸ್ಕೃತಿಕ ಶಿಷ್ಟಾಚಾರದ ಮಾರ್ಗದರ್ಶನ'
      ] : isTe ? [
        'GI-ట్యాగ్ కలిగిన స్థానిక చేతివృత్తుల కళాకారులతో అనుసంధానం',
        'మైలారి దోశ, ధార్వాడ్ పేడా, కరవళి సాంప్రదాయ వంటకాల సమాచారం',
        'పురాతన దేవాలయాల సాంస్కృతిక మర్యాదల మార్గదర్శనం'
      ] : isHi ? [
        'GI-टैग प्राप्त स्थानीय कारीगरों और बुनकरों से सीधा संपर्क',
        'मैसूरु मैलारी डोसा, धारवाड़ पेड़ा, तटीय व्यंजनों की गाइड',
        'प्राचीन मंदिरों के लिए सांस्कृतिक शिष्टाचार मार्गदर्शन'
      ] : isTa ? [
        'புவிசார் குறியீடு பெற்ற கைவினைஞர்களுடன் நேரடி தொடர்பு',
        'மைலாரி தோசை, தார்வாட் பேடா, காரவளி பாரம்பரிய உணவுகள் வழிகாட்டி',
        'புராதன கோயில்களுக்கான கலாச்சார மரியாதை வழிகாட்டுதல்'
      ] : isMl ? [
        'ഭൗമസൂചിക പദവി ലഭിച്ച പ്രാദേശിക കരകൗശല വിദഗ്ദ്ധരുമായി ബന്ധം',
        'മൈലാരി ദോശ, ധാർവാഡ് പേഡ, കരാവലി നാടൻ വിഭവങ്ങൾ',
        'പുരാതന ക്ഷേത്രങ്ങളിലെ സാംസ്കാരിക മര്യാദകൾ'
      ] : [
        'Curated connections with local GI-tagged artisans & weavers',
        'Heirloom culinary guides (Mylari, Dharwad Peda, Karavali dishes)',
        'Respectful cultural etiquette guide for ancient shrines'
      ]
    }
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#FCFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>
              {isKn ? 'ಕರ್ನಾಟಕ ಯಾತ್ರೆ AI ಏಕೆ?' :
               isTe ? 'కర్ణాటక యాత్ర AI ఎందుకు?' :
               isHi ? 'कर्नाटक यात्रा AI क्यों?' :
               isTa ? 'கர்நாடகா யாத்ரா AI ஏன்?' :
               isMl ? 'എന്തുകൊണ്ട് കർണാടക യാത്ര AI?' :
               'Why Karnataka Yatra AI'}
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#062A20] font-royal tracking-tight">
            {isKn ? 'ಪ್ರತಿಯೊಬ್ಬ ಪ್ರವಾಸಿಯ ಅಗತ್ಯಕ್ಕೆ ತಕ್ಕಂತೆ ರೂಪಿಸಲಾಗಿದೆ' :
             isTe ? 'ప్రతి ప్రయాణీకుడి కోసం ప్రత్యేకంగా రూపొందించబడింది' :
             isHi ? 'हर यात्री की आवश्यकता के अनुसार तैयार' :
             isTa ? 'ஒவ்வொரு பயணியின் தேவைக்கும் ஏற்ப வடிவமைக்கப்பட்டது' :
             isMl ? 'ഓരോ സഞ്ചാരിയുടെയും ആവശ്യങ്ങൾക്കായി രൂപകൽപ്പന ചെയ്തത്' :
             'Crafted with Care for Every Traveller'}
          </h2>

          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            {isKn ? 'ಕರ್ನಾಟಕದ ವೈವಿಧ್ಯಮಯ ಭೂಪ್ರದೇಶ ಮತ್ತು ಸಂಸ್ಕೃತಿಯನ್ನು ಸರಳವಾಗಿ ಅನ್ವೇಷಿಸಲು ನಿರ್ಮಿಸಲಾಗಿದೆ.' :
             isTe ? 'కర్ణాటకలోని విభిన్న ప్రాంతాలు మరియు సంస్కృతిని సులభంగా ఆస్వాదించడానికి తయారు చేయబడింది.' :
             isHi ? 'कर्नाटक के विविध भूभाग और संस्कृति को सहजता से अनुभव करने के लिए निर्मित।' :
             isTa ? 'கர்நாடகாவின் பல்வேறு நிலப்பரப்பு மற்றும் கலாச்சாரத்தை எளிதாக அறிய உருவாக்கப்பட்டது.' :
             isMl ? 'കർണാടകയുടെ വൈവിധ്യമാർന്ന ഭൂപ്രകൃതിയും സംസ്കാരവും ആയാസരഹിതമായി അനുഭവിക്കാൻ രൂപകൽപ്പന ചെയ്തത്.' :
             "Built from the ground up to solve the real-world friction of traveling across Karnataka's diverse terrain and culture."}
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {features.map((feat) => {
            const Icon = feat.icon;

            return (
              <div
                key={feat.id}
                className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar with Icon & Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-md ${feat.iconBg}`}>
                      <Icon className="w-7 h-7" />
                    </div>

                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {feat.badge}
                    </span>
                  </div>

                  {/* Title & Native subtitle */}
                  <h3 className="text-2xl font-bold text-slate-900 font-royal">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-emerald-800 font-semibold mt-0.5">
                    {feat.nativeSubtitle}
                  </p>

                  <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                    {feat.description}
                  </p>

                  {/* Bullet points for clarity */}
                  <div className="mt-5 space-y-2.5 pt-4 border-t border-slate-100">
                    {feat.bulletPoints.map((point, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-700">
                        <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Trust Tag */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span>
                    {isKn ? 'ಕರ್ನಾಟಕ ಪ್ರವಾಸೋದ್ಯಮಕ್ಕಾಗಿ ಪ್ರಮಾಣೀಕೃತ' :
                     isTe ? 'కర్ణాటక పర్యాటక శాఖ ద్వారా ధృవీకరించబడింది' :
                     isHi ? 'कर्नाटक पर्यटन के लिए प्रमाणित' :
                     isTa ? 'கர்நாடக சுற்றுலாத்துறை சான்றளிக்கப்பட்டது' :
                     isMl ? 'കർണാടക ടൂറിസത്തിനായി സാക്ഷ്യപ്പെടുത്തിയത്' :
                     'Certified for Karnataka Tourism'}
                  </span>
                  <span className="text-emerald-700 font-bold">
                    {isKn ? '100% ಉಚಿತ AI ನೆರವು' :
                     isTe ? '100% ఉచిత AI సహాయం' :
                     isHi ? '100% मुफ्त AI सहायता' :
                     isTa ? '100% இலவச AI உதவி' :
                     isMl ? '100% സൗജന്യ AI സഹായം' :
                     '100% Free AI Assistance'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
