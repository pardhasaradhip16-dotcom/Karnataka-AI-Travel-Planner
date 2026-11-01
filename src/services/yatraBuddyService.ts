import type { 
  YatraBuddyAction, 
  YatraBuddyMessage, 
  YatraBuddyContext, 
  YatraBuddyLanguage
} from '../types';
import { DESTINATIONS } from '../data/destinations';
import { 
  getLocalizedDestination, 
  formatLocalizedDuration, 
  formatLocalizedBudget, 
  formatLocalizedSeason 
} from '../i18n/translations';

export class YatraBuddyService {
  /**
   * Primary entry point for asking Yatra Buddy.
   * Calls external LLM endpoint if configured, otherwise uses intelligent local rule-based fallback.
   */
  public static async askBuddy(
    question: string,
    context: YatraBuddyContext
  ): Promise<YatraBuddyMessage> {
    const apiUrl = import.meta.env.VITE_YATRA_BUDDY_API_URL;

    // 1. Try external backend LLM endpoint if configured
    if (apiUrl && typeof apiUrl === 'string' && apiUrl.startsWith('http')) {
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            question,
            language: context.currentLanguage,
            itinerary: context.itinerary ? {
              title: context.itinerary.title,
              totalDays: context.itinerary.totalDays,
              startingLocation: context.itinerary.startingLocation,
              destinations: context.itinerary.destinationsCovered.map(d => d.name),
              estimatedTotal: context.itinerary.estimatedCostTotal
            } : null,
            selectedDestination: context.selectedDestination?.name || null
          })
        });

        if (response.ok) {
          const data = await response.json();
          if (data && data.text) {
            return {
              id: `msg_${Date.now()}`,
              sender: 'buddy',
              text: data.text,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              suggestedDestinations: data.suggestedDestinations || [],
              actions: data.actions || [],
              isDemoFallback: false
            };
          }
        }
      } catch (e) {
        console.warn('External Yatra Buddy LLM endpoint unreachable, falling back to Local Intelligence Engine.', e);
      }
    }

    // 2. Local Intelligence & Rule-Based Fallback Engine
    // Simulate brief processing delay for realistic conversational UX
    await new Promise(resolve => setTimeout(resolve, 450));

    return this.generateLocalResponse(question, context);
  }

  /**
   * Rule-Based Intelligence Engine with authentic 6-language (en, kn, hi, te, ta, ml) support,
   * structured trip actions, budget optimizations, and destination matching.
   */
  private static generateLocalResponse(
    question: string,
    context: YatraBuddyContext
  ): YatraBuddyMessage {
    const qLower = question.toLowerCase().trim();
    const lang = context.currentLanguage;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // ----------------------------------------------------
    // INTENT 1: MAKE MY TRIP CHEAPER / బడ్జెట్ తగ్గించండి / बजट कम करें
    // ----------------------------------------------------
    if (
      qLower.includes('cheap') || 
      qLower.includes('budget') || 
      qLower.includes('save') || 
      qLower.includes('cost') || 
      qLower.includes('money') ||
      qLower.includes('ಕಡಿಮೆ') || 
      qLower.includes('ಬಜೆಟ್') || 
      qLower.includes('ಖರ್ಚು') ||
      qLower.includes('कम') ||
      qLower.includes('बजट') ||
      qLower.includes('తగ్గించండి') ||
      qLower.includes('బడ్జెట్') ||
      qLower.includes('ఖర్చు') ||
      qLower.includes('குறைக்க') ||
      qLower.includes('பட்ஜெட்') ||
      qLower.includes('കുറയ്ക്കുക') ||
      qLower.includes('ബജറ്റ്')
    ) {
      const actionLabels: Record<string, string> = {
        kn: '⚡ ಬಜೆಟ್ ಮೋಡ್ ಅನ್ವಯಿಸಿ (KSRTC & ಬಜೆಟ್ ತಂಗುದಾಣ)',
        hi: '⚡ बजट मोड लागू करें (KSRTC और बजट आवास)',
        te: '⚡ బడ్జెట్ మోడ్ వర్తింపజేయండి (KSRTC & బడ్జెట్ బస)',
        ta: '⚡ பட்ஜெட் முறையைப் பயன்படுத்துங்கள் (KSRTC & தங்குமிடம்)',
        ml: '⚡ ബജറ്റ് മോഡ് പ്രയോഗിക്കുക (KSRTC & ബജറ്റ് താമസം)',
        en: '⚡ Apply Budget Mode (KSRTC & Budget Stay)'
      };

      const actions: YatraBuddyAction[] = [
        {
          id: 'action_budget_mode',
          type: 'make_cheaper',
          label: actionLabels[lang] || actionLabels.en,
          payload: {
            budgetTier: 'budget',
            transportPreference: 'public_transit',
            accommodationPreference: 'budget_homestay'
          }
        }
      ];

      const responses: Record<string, string> = {
        kn: `ನಾನು ನಿಮ್ಮ ಪ್ರವಾಸದ ವೆಚ್ಚವನ್ನು ಸುಲಭವಾಗಿ ಕಡಿಮೆ ಮಾಡಬಲ್ಲೆ! 💡

**ಮುಖ್ಯ ಉಳಿತಾಯ ತಂತ್ರಗಳು:**
1. **ಸಾರಿಗೆ:** ಖಾಸಗಿ ಕ್ಯಾಬ್ ಬದಲಿಗೆ KSRTC ರಾಜಹಂಸ/ಐರಾವತ ಬಸ್ ಅಥವಾ ದಕ್ಷಿಣ ಪಶ್ಚಿಮ ರೈಲ್ವೆ ಬಳಸಿ (ಪ್ರತಿ ವ್ಯಕ್ತಿಗೆ ₹1,800 - ₹2,500 ಉಳಿತಾಯ).
2. **ವಸತಿ:** ಐಷಾರಾಮಿ ಹೋಟೆಲ್ ಬದಲಿಗೆ KSTDC ಮಯೂರ ಹೋಟೆಲ್ ಅಥವಾ ಸರ್ಕಾರ ಅನುಮೋದಿತ ಹೋಮ್‌ಸ್ಟೇ ಆಯ್ಕೆಮಾಡಿ (ಪ್ರತಿ ರಾತ್ರಿಗೆ ₹1,200 ಉಳಿತಾಯ).
3. **ಆಹಾರ:** ಹೈವೇ ಡಾಬಾ ಬದಲಿಗೆ ಸ್ಥಳೀಯ ಉಡುಪಿ/ಕನ್ನಡ ಹೋಟೆಲ್‌ಗಳಲ್ಲಿ ಬಿಸಿ ಮಸಾಲೆ ದೋಸೆ, ಅಕ್ಕಿ ರೊಟ್ಟಿ ಊಟ ಸವಿಯಿರಿ.

ಕೆಳಗಿನ ಬಟನ್ ಒತ್ತಿ ನಿಮ್ಮ ಪ್ರವಾಸವನ್ನು ತಕ್ಷಣ ಬಜೆಟ್ ಮೋಡ್‌ಗೆ ಬದಲಾಯಿಸಿ:`,
        hi: `मैंने आपकी कर्नाटक यात्रा के खर्चों को कम करने के लिए बेहतरीन उपाय तैयार किए हैं! 💡

**प्रमुख बचत रणनीतियाँ:**
1. **परिवहन:** निजी कैब के बजाय **KSRTC राजहंस / ऐरावत एक्सप्रेस** या दक्षिण पश्चिम रेलवे ट्रेनों का उपयोग करें (प्रति व्यक्ति ₹1,800–₹2,500 की बचत)।
2. **आवास:** महंगे होटलों के बजाय प्रमाणित **KSTDC मयूरा होटल** या स्थानीय होमस्टे चुनें (प्रति रात लगभग ₹1,200 की बचत)।
3. **खान-पान:** हाईवे ढाबों के बजाय स्थानीय उडुपी शाकाहारी भोजनालयों में गरम मसाला डोसा और जोलाड़ा रोटी थाली का आनंद लें।

अपनी यात्रा को तुरंत बजट मोड में बदलने के लिए नीचे दिए गए बटन पर टैप करें:`,
        te: `నేను మీ కర్ణాటక ప్రయాణ ఖర్చులను సులభంగా తగ్గించగలను! 💡

**ముఖ్యమైన పొదుపు మార్గాలు:**
1. **రవాణా:** ప్రైవేట్ క్యాబ్‌లకు బదులుగా **KSRTC రాజహంస / ఐరావత బస్సులు** లేదా సౌత్ వెస్ట్రన్ రైల్వేలను ఉపయోగించండి (ఒక్కొక్కరికి ₹1,800–₹2,500 వరకు ఆదా అవుతుంది).
2. **వసతి:** లగ్జరీ హోటళ్లకు బదులుగా ప్రభుత్వం ధృవీకరించిన **KSTDC మయూర హోటల్స్** లేదా స్థానిక హోమ్‌స్టేలను ఎంచుకోండి (రాత్రికి దాదాపు ₹1,200 ఆదా).
3. **ఆహారం:** హైవే దాబాలకు బదులుగా ఉడుపి శాఖాహార రెస్టారెంట్లు లేదా స్థానిక మెస్‌లలో వేడి మసాలా దోశ, అక్కి రొట్టె భోజనం ఆస్వాదించండి.

క్రింది బటన్‌పై నొక్కడం ద్వారా మీ పర్యటనను వెంటనే బడ్జెట్ మోడ్‌కు మార్చుకోండి:`,
        ta: `உங்கள் கர்நாடக பயணச் செலவைக் குறைக்க அருமையான வழிகள் இதோ! 💡

**முக்கிய சேமிப்பு வழிகள்:**
1. **போக்குவரத்து:** தனியார் கார்களுக்குப் பதிலாக **KSRTC ராஜஹம்சா / ஐராவத் பேருந்துகள்** அல்லது ரயில்களைப் பயன்படுத்துங்கள் (நபருக்கு ₹1,800–₹2,500 சேமிப்பு).
2. **தங்குமிடம்:** ஆடம்பர விடுதிகளுக்குப் பதிலாக அரசு அங்கீகாரம் பெற்ற **KSTDC மயூரா விடுதிகள்** அல்லது உள்ளூர் ஹோம்ஸ்டேக்களைத் தேர்வு செய்யவும் (இரவுக்கு ~₹1,200 சேமிப்பு).
3. **உணவு:** பாரம்பரிய உடுப்பி உணவகங்களில் சூடான நெய் ரோஸ்ட், தட்டே இட்லி போன்றவற்றை ருசிக்கவும்.

உங்கள் பயண திட்டத்தை பட்ஜெட் முறைக்கு மாற்ற கீழே உள்ள பொத்தானைத் தட்டவும்:`,
        ml: `നിങ്ങളുടെ കർണാടക യാത്രാ ചെലവ് സ്മാർട്ടായി കുറയ്ക്കാൻ ഞാൻ സഹായിക്കാം! 💡

**പ്രധാന സമ്പാദ്യ മാർഗ്ഗങ്ങൾ:**
1. **യാത്ര:** പ്രൈവറ്റ് ടാക്സിക്ക് പകരം **KSRTC രാജഹംസ / ഐരാവത് ബസുകൾ** അല്ലെങ്കിൽ സൗത്ത് വെസ്റ്റേൺ റെയിൽവേ ഉപയോഗിക്കുക (ഒരാൾക്ക് ₹1,800–₹2,500 ലാഭം).
2. **താമസം:** വലിയ റിസോർട്ടുകൾക്ക് പകരം അംഗീകൃത **KSTDC മയൂര ഹോട്ടലുകൾ** അല്ലെങ്കിൽ ഹോംസ്റ്റേകൾ തിരഞ്ഞെടുക്കുക (ഒരു രാത്രിക്ക് ~₹1,200 ലാഭം).
3. **ഭക്ഷണം:** ഹൈവേ ഹോട്ടലുകൾക്ക് പകരം പ്രാദേശിക ഉഡുപ്പി ഹോട്ടലുകളിൽ നിന്ന് നാടൻ ദോശയും ഊണും കഴിക്കുക.

യാത്രാ പദ്ധതി ഉടൻ ബജറ്റ് മോഡിലേക്ക് മാറ്റാൻ താഴെയുള്ള ബട്ടൺ ക്ലിക്ക് ചെയ്യുക:`,
        en: `I've analyzed your Karnataka trip to find smart cost-saving opportunities! 💡

**Top Budget Reductions:**
1. **Transport:** Switch from private cabs to **KSRTC Rajahamsa / Airavat Express** or South Western Railway trains (saves ₹1,800–₹2,500 per person).
2. **Stay:** Choose verified **KSTDC Hotel Mayura** or local certified homestays over commercial resorts (saves ~₹1,200 per night).
3. **Sightseeing:** Focus on low-cost/free ASI protected heritage sites (₹25 entry) and public scenic viewpoints.

Tap the button below to automatically apply these budget settings to your itinerary:`
      };

      return {
        id: `msg_${Date.now()}`,
        sender: 'buddy',
        text: responses[lang] || responses.en,
        timestamp,
        actions,
        isDemoFallback: true
      };
    }

    // ----------------------------------------------------
    // INTENT 2: FIND NATURE PLACES NEARBY / ప్రకృతి దృశ్యాలు / प्राकृतिक स्थल
    // ----------------------------------------------------
    if (
      qLower.includes('nature') || 
      qLower.includes('waterfall') || 
      qLower.includes('green') || 
      qLower.includes('hill') || 
      qLower.includes('wildlife') ||
      qLower.includes('ನಿಸರ್ಗ') || 
      qLower.includes('ಜಲಪಾತ') || 
      qLower.includes('ಕಾಡು') ||
      qLower.includes('प्राकृतिक') ||
      qLower.includes('झरना') ||
      qLower.includes('प्रकृति') ||
      qLower.includes('ప్రకృతి') ||
      qLower.includes('జలపాతం') ||
      qLower.includes('కొండలు') ||
      qLower.includes('இயற்கை') ||
      qLower.includes('நீர்வீழ்ச்சி') ||
      qLower.includes('പ്രകൃതി') ||
      qLower.includes('വെള്ളച്ചാട്ടം')
    ) {
      const natureDests = DESTINATIONS.filter(d => 
        d.category.includes('Nature') || 
        d.category.includes('Waterfalls') || 
        d.category.includes('Hill Stations') || 
        d.category.includes('Wildlife')
      ).slice(0, 3);

      const actions: YatraBuddyAction[] = natureDests.map(d => {
        const dLoc = getLocalizedDestination(d, lang);
        const addPrefix: Record<string, string> = {
          kn: '+ ಸೇರಿಸಿ',
          hi: '+ जोड़ें',
          te: '+ చేర్చండి',
          ta: '+ சேர்க்கவும்',
          ml: '+ ചേർക്കൂ',
          en: '+ Add to Trip'
        };
        return {
          id: `action_add_${d.id}`,
          type: 'add_destination',
          label: `${addPrefix[lang] || addPrefix.en}: ${dLoc.name}`,
          payload: d
        };
      });

      const responses: Record<string, string> = {
        kn: `ಕರ್ನಾಟಕದ ಪಶ್ಚಿಮ ಘಟ್ಟಗಳು ನಿಸರ್ಗ ಪ್ರಿಯರ ಸ್ವರ್ಗ! 🌿

ಇಲ್ಲಿವೆ ಅದ್ಭುತ ಪ್ರಕೃತಿ ತಾಣಗಳು:
• **ಕೂರ್ಗ್ (ಕೊಡಗು):** ಮಂಜು ಮುಸುಕಿದ ಕಾಫಿ ತೋಟಗಳು, ಅಬ್ಬೆ ಜಲಪಾತ ಮತ್ತು ರಾಜಾಸೀಟ್ ಸೂರ್ಯಾಸ್ತ.
• **ಚಿಕ್ಕಮಗಳೂರು:** ಕರ್ನಾಟಕದ ಅತ್ಯುನ್ನತ ಶಿಖರ ಮುಳ್ಳಯ್ಯನಗಿರಿ ಮತ್ತು ಸುಂದರ ಚಹಾ ತೋಟಗಳು.
• **ಜೋಗ ಜಲಪಾತ:** ಶರಾವತಿ ನದಿಯ 830 ಅಡಿ ಭವ್ಯ ರಾಜ-ರಾಣಿ-ರೋರರ್-ರಾಕೆಟ್ ಜಲಧಾರೆ.

ಯಾವುದಾದರೂ ತಾಣವನ್ನು ನಿಮ್ಮ ಪ್ರವಾಸಕ್ಕೆ ಸೇರಿಸಲು ಕೆಳಗೆ ಟ್ಯಾಪ್ ಮಾಡಿ:`,
        hi: `कर्नाटक के पश्चिमी घाट जैव विविधता के अद्भुत केंद्र और प्रकृति प्रेमियों के लिए स्वर्ग हैं! 🌿

**शीर्ष प्राकृतिक स्थल:**
• **कूर्ग (मडिकेरी):** बादलों से घिरे कॉफ़ी के बागान, अब्बी झरना और राजा सीट से घाटी का दृश्य।
• **चिकमगलूर:** कर्नाटक की सबसे ऊंची चोटी मुल्लायनगिरि (1,930 मीटर) और मनमोहक चाय के बागान।
• **जोग जलप्रपात:** शरावती नदी का 830 फीट की ऊंचाई से 4 धाराओं (राजा, रोअरर, रॉकेट, रानी) में गिरता भव्य झरना।

अपनी यात्रा में जोड़ने के लिए नीचे दिए गए किसी भी स्थल पर टैप करें:`,
        te: `కర్ణాటక పశ్చిమ కనుమలు ప్రకృతి ప్రేమికులకు నిజమైన స్వర్గధామం! 🌿

**అద్భుతమైన ప్రకృతి ప్రదేశాలు:**
• **కూర్గ్ (మడికేరి):** పొగమంచు కాఫీ తోటలు, అబ్బే జలపాతం మరియు రాజా సీట్ లోయల అందాలు.
• **చిక్కమగళూరు:** కర్ణాటకలోని అత్యున్నత శిఖరం ముళ్ళయ్యనగిరి (1,930 మీ) మరియు పచ్చని టీ తోటలు.
• **జోగ్ జలపాతం:** శరావతి నది 830 అడుగుల ఎత్తు నుండి 4 భాగాలుగా (రాజా, రోరర్, రాకెట్, రాణి) దూకే మహాద్భుత జలపాతం.

ఈ ప్రదేశాలలో దేనినైనా మీ యాత్రకు జోడించడానికి క్రింద నొక్కండి:`,
        ta: `கர்நாடகாவின் மேற்குத் தொடர்ச்சி மலைகள் இயற்கை ஆர்வலர்களின் சொர்க்கமாகும்! 🌿

**சிறந்த இயற்கை சுற்றுலா தலங்கள்:**
• **கூர்க் (மடிக்கேரி):** பனி படர்ந்த காபி தோட்டங்கள், அப்பே நீர்வீழ்ச்சி மற்றும் ராஜா சீட் காட்சி முனை.
• **சிக்கமகளூரு:** கர்நாடகாவின் மிக உயரமான முள்ளையனகிரி சிகரம் மற்றும் பசுமையான தேயிலைத் தோட்டங்கள்.
• **ஜோக் நீர்வீழ்ச்சி:** சராவதி நதியின் 830 அடி உயர பிரம்மாண்ட 4 அருவிக் காட்சிகள் (ராஜா, ரோரர், ராக்கெட், ராணி).

இடத்தை உங்கள் பயணத்தில் சேர்க்க கீழே தட்டவும்:`,
        ml: `കർണാടകയിലെ പശ്ചിമഘട്ടം പ്രകൃതിസ്നേഹികൾക്ക് ഒരു പറുദീസയാണ്! 🌿

**പ്രധാന പ്രകൃതിദത്ത സ്ഥലങ്ങൾ:**
• **കൂർഗ് (മടിക്കേരി):** കോടമഞ്ഞ് മൂടിയ കാപ്പിത്തോട്ടങ്ങൾ, ആബ്ബെ വെള്ളച്ചാട്ടം, രാജാസ് സീറ്റ്.
• **ചിക്കമംഗളൂരു:** കർണാടകയിലെ ഏറ്റവും ഉയർന്ന കൊടുമുടിയായ മുല്ലയ്യനഗിരിയും തേയിലത്തോട്ടങ്ങളും.
• **ജോഗ് ഫാൾസ്:** ശരാവതി നദി 830 അടി താഴ്ചയിലേക്ക് പതിക്കുന്ന അത്ഭുതകരമായ വെള്ളച്ചാട്ടം.

നിങ്ങളുടെ യാത്രയിലേക്ക് ചേർക്കാൻ താഴെ ക്ലിക്ക് ചെയ്യുക:`,
        en: `Karnataka's Western Ghats are a biodiversity hotspot and a nature lover's paradise! 🌿

**Top Nature Escapes:**
• **Coorg (Madikeri):** Misty coffee plantations, Abbey Falls, and Raja's Seat valley views.
• **Chikkamagaluru:** Trek Mullayanagiri (Karnataka's highest peak at 1,930m) and wander lush tea estates.
• **Jog Falls:** Witness the mighty Sharavathi river plunge 830 feet in 4 spectacular cascades (Raja, Roarer, Rocket, Rani).

Select any destination below to add it directly to your journey:`
      };

      return {
        id: `msg_${Date.now()}`,
        sender: 'buddy',
        text: responses[lang] || responses.en,
        timestamp,
        suggestedDestinations: natureDests,
        actions,
        isDemoFallback: true
      };
    }

    // ----------------------------------------------------
    // INTENT 3: PLAN A FAMILY TRIP / కుటుంబ యాత్ర / पारिवारिक यात्रा
    // ----------------------------------------------------
    if (
      qLower.includes('family') || 
      qLower.includes('kids') || 
      qLower.includes('children') || 
      qLower.includes('parents') ||
      qLower.includes('ಕುಟುಂಬ') || 
      qLower.includes('परिवार') || 
      qLower.includes('కుటుంబ') || 
      qLower.includes('குடும்ப') || 
      qLower.includes('കുടുംബ')
    ) {
      const familyActionLabels: Record<string, string> = {
        kn: '👨‍👩‍👧‍👦 3 ದಿನದ ಸುಲಭ ಕುಟುಂಬ ಪ್ರವಾಸ ರಚಿಸಿ',
        hi: '👨‍👩‍👧‍👦 3-दिवसीय पारिवारिक यात्रा प्लान करें',
        te: '👨‍👩‍👧‍👦 3-రోజుల సులభ కుటుంబ ప్రయాణాన్ని సృష్టించండి',
        ta: '👨‍👩‍👧‍👦 3 நாள் எளிய குடும்ப சுற்றுலா திட்டத்தை உருவாக்கவும்',
        ml: '👨‍👩‍👧‍👦 3 ദിവസത്തെ കുടുംബ യാത്രാ പദ്ധതി തയ്യാറാക്കുക',
        en: '👨‍👩‍👧‍👦 Plan 3-Day Relaxed Family Circuit'
      };

      const actions: YatraBuddyAction[] = [
        {
          id: 'action_family_circuit',
          type: 'plan_family',
          label: familyActionLabels[lang] || familyActionLabels.en,
          payload: {
            interests: ['heritage', 'wildlife', 'nature', 'culture'],
            duration: '2-3-days',
            travelerType: 'family',
            groupSize: 4,
            startingCity: 'bengaluru',
            transportPreference: 'cab_chauffeur',
            accommodationPreference: 'standard_hotel',
            pace: 'relaxed'
          }
        }
      ];

      const responses: Record<string, string> = {
        kn: `ಕುಟುಂಬದೊಂದಿಗೆ ಆನಂದಿಸಲು ನಾನು ಪರಿಪೂರ್ಣ ಪ್ರವಾಸ ಯೋಜಿಸಿದ್ದೇನೆ! 👨‍👩‍👧‍👦

**ಕುಟುಂಬ ಸ್ನೇಹಿ 3 ದಿನದ ಸರ್ಕ್ಯೂಟ್ (ಮೈಸೂರು & ರಂಗನತಿಟ್ಟು):**
• **ದಿನ 1: ಮೈಸೂರು ಅರಮನೆ & ಮೃಗಾಲಯ:** ಮಕ್ಕಳಿಗೆ ಇಷ್ಟವಾಗುವ ಮೈಸೂರು ಜೂ, ಸಂಜೆ ವಿದ್ಯುದ್ದೀಪಾಲಂಕೃತ ಅಂಬಾವಿಲಾಸ ಅರಮನೆ.
• **ದಿನ 2: ರಂಗನತಿಟ್ಟು ಪಕ್ಷಿಧಾಮ & ಶ್ರೀರಂಗಪಟ್ಟಣ:** ಕಾವೇರಿ ನದಿಯಲ್ಲಿ ಬೋಟಿಂಗ್, ವಲಸೆ ಹಕ್ಕಿಗಳ ವೀಕ್ಷಣೆ ಮತ್ತು ಟಿಪ್ಪು ಸುಲ್ತಾನ್ ಕೋಟೆ.
• **ದಿನ 3: ಬೃಂದಾವನ ಗಾರ್ಡನ್ಸ್ & ಶಾಪಿಂಗ್:** ಸಂಗೀತ ಕಾರಂಜಿ ಮತ್ತು ಪ್ರಸಿದ್ಧ ಮೈಸೂರು ರೇಷ್ಮೆ ಹಾಗೂ ಮೈಸೂರು ಪಾಕ್ ಶಾಪಿಂಗ್.

*ಈ ಯೋಜನೆಯು ಕಡಿದಾದ ನಡಿಗೆಯಿಲ್ಲದೆ ಆರಾಮದಾಯಕ ವೇಗವನ್ನು ಹೊಂದಿದೆ.*`,
        hi: `मैंने परिवारों, बच्चों और बुजुर्गों के लिए एक बेहद आरामदायक और यादगार यात्रा योजना तैयार की है! 👨‍👩‍👧‍👦

**पारिवारिक 3-दिवसीय सर्किट (मैसूरु और हेरिटेज वैली):**
• **दिन 1: मैसूर पैलेस और मैसूर चिड़ियाघर:** बच्चों का पसंदीदा विश्वस्तरीय चिड़ियाघर और शाम को दीपमालाओं से जगमगाता अंबा विलास पैलेस।
• **दिन 2: रंगनथिट्टू पक्षी अभयारण्य और श्रीरंगपट्टण:** कावेरी नदी में नौका विहार, विदेशी प्रवासी पक्षी और टीपू सुल्तान का ऐतिहासिक द्वीप किला।
• **दिन 3: वृंदावन गार्डन और सिल्क शॉपिंग:** संगीतमय फव्वारे और असली मैसूर सिल्क व ताज़ा मैसूर पाक की खरीदारी।

*यह यात्रा योजना थकान-मुक्त और आसान गति वाली है।*`,
        te: `కుటుంబ సభ్యులతో కలిసి ఆనందించడానికి సరైన యాత్రా ప్రణాళికను నేను సిద్ధం చేశాను! 👨‍👩‍👧‍👦

**సిఫార్సు చేయబడిన 3-రోజుల ఫ్యామిలీ ట్రిప్ (మైసూరు & శ్రీరంగపట్నం):**
• **రోజు 1: మైసూరు ప్యాలెస్ & జూ:** పిల్లలు ఎంతగానో ఇష్టపడే ప్రపంచ స్థాయి జూ, సాయంత్రం దీపాలతో వెలిగిపోయే అంబా విలాస్ రాజభవనం.
• **రోజు 2: రంగనతిట్టు పక్షుల అభయారణ్యం & శ్రీరంగపట్నం:** కావేరి నదిలో బోటింగ్, వలస పక్షుల దర్శనం మరియు టిప్పు సుల్తాన్ కోట.
• **రోజు 3: బృందావన్ గార్డెన్స్ & షాపింగ్:** మ్యూజికల్ ఫౌంటెన్, కావేరి డ్యామ్ వ్యూస్, స్వచ్ఛమైన మైసూరు సిల్క్ చీరలు & ఒరిజినల్ మైసూరు పాక్.

*ఈ ప్రణాళికలో నిటారైన కొండ నడకలు లేకుండా కుటుంబానికి సౌకర్యవంతంగా ఉంటుంది.*`,
        ta: `குடும்பத்துடன் மகிழ்ச்சியாக சென்றுவர சிறந்த பயணத் திட்டம் இதோ! 👨‍👩‍👧‍👦

**பரிந்துரைக்கப்பட்ட 3 நாள் குடும்ப சுற்றுலா (மைசூரு & ஸ்ரீரங்கப்பட்டினம்):**
• **நாள் 1: மைசூர் அரண்மனை & மிருகக்காட்சி சாலை:** குழந்தைகள் விரும்பும் மிருகக்காட்சி சாலை மற்றும் மாலையில் மின் விளக்குகளால் ஒளிரும் அரண்மனை.
• **நாள் 2: ரங்கன்திட்டு பறவைகள் சரணாலயம் & ஸ்ரீரங்கப்பட்டினம்:** காவேரி ஆற்றில் படகு சவாரி, வண்ணப் பறவைகள் மற்றும் திப்பு சுல்தானின் கோட்டை.
• **நாள் 3: பிருந்தாவன் கார்டன் & மைசூர் பாக்:** இசை நீரூற்று மற்றும் உலகப் புகழ்பெற்ற மைசூர் சில்க், சுவையான மைசூர் பாக்.

*இந்தத் திட்டம் எளிய நடைபயணமும் அதிக ஓய்வும் கொண்ட குடும்பப் பயணம் ஆகும்.*`,
        ml: `കുടുംബത്തോടൊപ്പം സുഖകരമായി യാത്ര ചെയ്യാൻ അനുയോജ്യമായ പദ്ധതി ഇതാ! 👨‍👩‍👧‍👦

**3 ദിവസത്തെ കുടുംബ യാത്രാ സർക്യൂട്ട് (മൈസൂരു & ശ്രീരംഗപട്ടണം):**
• **ദിവസം 1: മൈസൂർ കൊട്ടാരവും മൃഗശാലയും:** കുട്ടികൾക്ക് ഏറെ ഇഷ്ടപ്പെടുന്ന സൂ, വൈകുന്നേരം ദീപാലങ്കൃതമായ അംബാ വിലാസ് കൊട്ടാരം.
• **ദിവസം 2: രംഗനതിട്ടു പക്ഷിസങ്കേതവും ശ്രീരംഗപട്ടണവും:** കാവേരി നദിയിലൂടെയുള്ള ബോട്ടിംഗ്, പക്ഷികൾ, ടിപ്പു സുൽത്താന്റെ ദ്വീപ് കോട്ട.
• **ദിവസം 3: വൃന്ദാവൻ ഗാർഡൻസും ഷോപ്പിംഗും:** മ്യൂസിക്കൽ ഫൗണ്ടൻ, ഒറിജിനൽ മൈസൂർ സിൽക്ക്, മൈസൂർ പാക്ക്.

*കയറ്റങ്ങളോ ആയാസമോ ഇല്ലാതെ കുടുംബങ്ങൾക്ക് ആസ്വദിക്കാവുന്ന പ്ലാൻ.*`,
        en: `I've tailored the ideal Karnataka family journey designed for comfort, kids, and grandparents! 👨‍👩‍👧‍👦

**Recommended 3-Day Family Circuit (Mysuru & Heritage Valley):**
• **Day 1: Mysuru Palace & Mysore Zoo:** World-class walkthrough zoo loved by kids, followed by the illuminated Amba Vilas Palace.
• **Day 2: Ranganathittu Bird Sanctuary & Srirangapatna:** Gentle boat safari on the Cauvery river spotting pelicans & marsh crocodiles, followed by Tipu Sultan's island citadel.
• **Day 3: Brindavan Musical Gardens & Silk Shopping:** Relaxed fountains, Cauvery dam views, and picking up authentic GI-tagged Mysore Silk & warm Mysore Pak.

*This plan has minimal steep walking and balanced travel pacing.*`
      };

      return {
        id: `msg_${Date.now()}`,
        sender: 'buddy',
        text: responses[lang] || responses.en,
        timestamp,
        actions,
        isDemoFallback: true
      };
    }

    // ----------------------------------------------------
    // INTENT 4: I ONLY HAVE ONE DAY / ఒక రోజు / केवल 1 दिन
    // ----------------------------------------------------
    if (
      qLower.includes('one day') || 
      qLower.includes('1 day') || 
      qLower.includes('single day') || 
      qLower.includes('short trip') ||
      qLower.includes('ಒಂದೇ ದಿನ') || 
      qLower.includes('1 ದಿನ') ||
      qLower.includes('1 दिन') ||
      qLower.includes('ఒక రోజు') ||
      qLower.includes('1 நாள்') ||
      qLower.includes('1 ദിവസം')
    ) {
      const oneDayLabels: Record<string, string> = {
        kn: '📅 1 ದಿನದ ಎಕ್ಸ್‌ಪ್ರೆಸ್ ಪ್ರವಾಸ ರಚಿಸಿ',
        hi: '📅 1-दिवसीय एक्सप्रेस यात्रा बनाएं',
        te: '📅 1-రోజు ఎక్స్‌ప్రెస్ యాత్రా ప్లాన్ రూపొందించండి',
        ta: '📅 1 நாள் விரைவு பயணத் திட்டத்தை உருவாக்கவும்',
        ml: '📅 1 ദിവസത്തെ എക്സ്പ്രസ്സ് യാത്രാ പ്ലാൻ തയ്യാറാക്കുക',
        en: '📅 Generate 1-Day Express Itinerary'
      };

      const actions: YatraBuddyAction[] = [
        {
          id: 'action_one_day_trip',
          type: 'plan_one_day',
          label: oneDayLabels[lang] || oneDayLabels.en,
          payload: {
            duration: '1-day',
            customDays: 1,
            pace: 'packed',
            startingCity: 'bengaluru'
          }
        }
      ];

      const responses: Record<string, string> = {
        kn: `ಕೇವಲ ಒಂದು ದಿನವಿದ್ದರೂ ನೀವು ಅದ್ಭುತ ಅನುಭವ ಪಡೆಯಬಹುದು! ⏱️

**ಬೆಂಗಳೂರಿನಿಂದ 1 ದಿನದ ಪ್ರಮುಖ ಪ್ರವಾಸಗಳು:**
1. **ನಂದಿ ಬೆಟ್ಟ & ಭೋಗ ನಂದೀಶ್ವರ ದೇವಾಲಯ:** ಬೆಳಗಿನ ಸೂರ್ಯೋದಯ, ಮಂಜಿನ ಕಣಿವೆ, ಮತ್ತು 9ನೇ ಶತಮಾನದ ನೊಳಂಬ-ಚೋಳ ಶಿಲ್ಪಕಲೆ.
2. **ಶಿವಗಂಗೆ & ದೇವರಾಯನದುರ್ಗ:** ಐತಿಹಾಸಿಕ ಬೆಟ್ಟದ ಕೋಟೆಗಳು, ಸುಂದರ ಪ್ರಕೃತಿ ಮತ್ತು ನಮದ ಚಿಲುಮೆ ಜಿಂಕೆ ವನ.
3. **ಮೈಸೂರು ವಂದೇ ಭಾರತ್ 1 ದಿನದ ಎಕ್ಸ್‌ಪ್ರೆಸ್:** ಕೇವಲ 1.5 ಗಂಟೆಯಲ್ಲಿ ಮೈಸೂರಿಗೆ ತಲುಪಿ ಅರಮನೆ ಮತ್ತು ಚಾಮುಂಡಿ ಬೆಟ್ಟ ದರ್ಶನ.

ಕೆಳಗಿನ ಬಟನ್ ಒತ್ತಿ 1 ದಿನದ ಯೋಜನೆಯನ್ನು ಸಿದ್ಧಪಡಿಸಿ:`,
        hi: `यदि आपके पास केवल एक दिन है, तो भी आप कर्नाटक की खूबसूरत सैर कर सकते हैं! ⏱️

**बेंगलुरु से 1-दिवसीय सर्वश्रेष्ठ यात्राएं:**
1. **नंदी हिल्स और भोग नंदीश्वर मंदिर:** बादलों के समंदर के ऊपर सूर्योदय और तलहटी में 1,000 साल पुराना भव्य चोल वास्तुकला मंदिर।
2. **मैसूरु वंदे भारत एक्सप्रेस:** सुबह की तेज़ ट्रेन से 1.5 घंटे में पहुंचकर मैसूर पैलेस और चामुंडी हिल दर्शन करके रात तक वापसी।
3. **शिवगंगे और देवरायनदुर्ग:** सुरम्य पहाड़ी दृश्य, ऐतिहासिक गुफा मंदिर और प्राकृतिक वन क्षेत्र।

नीचे दिए गए बटन पर टैप करके 1-दिवसीय यात्रा योजना बनाएं:`,
        te: `కేవలం ఒక్క రోజు సమయం ఉన్నప్పటికీ, కర్ణాటకలో అద్భుతమైన యాత్రను అనుభవించవచ్చు! ⏱️

**బెంగళూరు నుండి 1-రోజు ఉత్తమ ప్రయాణాలు:**
1. **నంది హిల్స్ & భోగ నందీశ్వర ఆలయం:** మేఘాల పైనుంచి ఉదయించే సూర్యోదయం మరియు 1,000 ఏళ్ల నాటి ప్రాచీన చోళ-నొళంబ ఆలయ శిల్పకళ.
2. **మైసూరు వందే భారత్ ఎక్స్‌ప్రెస్:** ఉదయం రైలులో 1.5 గంటల్లో చేరుకుని అంబా విలాస్ ప్యాలెస్, చాముండేశ్వరి దర్శనం పూర్తిచేసి రాత్రికి తిరుగు ప్రయాణం.
3. **శివగంగె & దేవరాయనదుర్గ:** కొండ గుహాలయాలు మరియు సహజసిద్ధ నామద చిలుమె వన ప్రదేశాలు.

క్రింది బటన్‌పై క్లిక్ చేసి 1-రోజు ఎక్స్‌ప్రెస్ ప్లాన్‌ను రూపొందించండి:`,
        ta: `உங்களிடம் 1 நாள் மட்டுமே இருந்தாலும், அருமையான ஒரு நாள் பயணத்தை மேற்கொள்ளலாம்! ⏱️

**பெங்களூரிலிருந்து 1 நாள் சுற்றுலாக்கள்:**
1. **நந்தி ஹில்ஸ் & போக நந்தீஸ்வரர் கோவில்:** பனி மேகங்களுக்கு மேலே உதிக்கும் சூரியோதயம் மற்றும் 1,000 ஆண்டுகள் பழமையான கோவில்.
2. **மைசூரு வந்தே பாரத் எக்ஸ்பிரஸ்:** அதிவேக ரயிலில் சென்று மைசூர் அரண்மனை, சாமுண்டீஸ்வரி கோவில் தரிசித்து அன்றே திரும்பலாம்.
3. **சிவகங்கை & தேவராயனதுர்கா:** வரலாற்று சிறப்புமிக்க பாறைக் குன்றுகள் மற்றும் இயற்கை காட்சிகள்.

1 நாள் பயணத் திட்டத்தை உருவாக்க கீழே கிளிக் செய்யவும்:`,
        ml: `ഒരു ദിവസം മാത്രമേ ഉള്ളൂവെങ്കിലും കർണാടകയിൽ മികച്ച ഒരു യാത്ര സാധ്യമാണ്! ⏱️

**ബെംഗളൂരുവിൽ നിന്നുള്ള 1 ദിവസത്തെ യാത്രകൾ:**
1. **നന്ദി ഹിൽസ് & ഭോഗ നന്ദീശ്വര ക്ഷേത്രം:** മേഘക്കൂട്ടങ്ങൾക്ക് മുകളിലെ പ്രഭാതസൂര്യനും ആയിരം വർഷം പഴക്കമുള്ള ശില്പകലയും.
2. **മൈസൂരു വന്ദേ ഭാരത് എക്സ്പ്രസ്:** അതിവേഗ ട്രെയിനിൽ പോയി മൈസൂർ കൊട്ടാരവും ചാമുണ്ഡി ഹിൽസും കണ്ട് വൈകുന്നേരം മടങ്ങാം.
3. **ശിവഗംഗ & ദേവരായനദുർഗ്ഗ:** കുന്നിൻമുകളിലെ പുണ്യക്ഷേത്രങ്ങളും പ്രകൃതിഭംഗിയും.

1 ദിവസത്തെ പ്ലാൻ തയ്യാറാക്കാൻ താഴെ ക്ലിക്ക് ചെയ്യുക:`,
        en: `Even with just one day, Karnataka offers unforgettable quick getaways! ⏱️

**Best 1-Day Day-Trip Circuits from Bengaluru:**
1. **Nandi Hills & Bhoga Nandeeshwara (Heritage + Dawn):** Sunrise overlooking misty sea of clouds, followed by the stunning 1,000-year-old Nolamba temple at the foothills.
2. **Mysuru Vande Bharat Express:** Take the fast morning train (1h 40m), tour Amba Vilas Palace, lunch on Mylari Dosa, visit Chamundi Hill, and return by dinner.
3. **Shivagange & Devarayanadurga:** Sacred hillocks, panoramic rocky viewpoints, and fresh spring waters at Namada Chilume.

Tap below to switch your itinerary to a fast-paced 1-day plan:`
      };

      return {
        id: `msg_${Date.now()}`,
        sender: 'buddy',
        text: responses[lang] || responses.en,
        timestamp,
        actions,
        isDemoFallback: true
      };
    }

    // ----------------------------------------------------
    // INTENT 5: SUGGEST LOCAL FOOD / ఆహారం / स्थानीय भोजन
    // ----------------------------------------------------
    if (
      qLower.includes('food') || 
      qLower.includes('eat') || 
      qLower.includes('dish') || 
      qLower.includes('cuisine') || 
      qLower.includes('breakfast') || 
      qLower.includes('dosa') ||
      qLower.includes('ಆಹಾರ') || 
      qLower.includes('ತಿಂಡಿ') || 
      qLower.includes('భోజనం') ||
      qLower.includes('ఆహారం') ||
      qLower.includes('వంటకాలు') ||
      qLower.includes('भोजन') ||
      qLower.includes('व्यंजन') ||
      qLower.includes('உணவு') ||
      qLower.includes('ഭക്ഷണം')
    ) {
      const responses: Record<string, string> = {
        kn: `ಕರ್ನಾಟಕದ ಆಹಾರ ಸಂಸ್ಕೃತಿಯು ಅತ್ಯಂತ ಶ್ರೀಮಂತ ಮತ್ತು ವೈವಿಧ್ಯಮಯವಾಗಿದೆ! 🍲

**ಪ್ರತಿಯೊಂದು ಪ್ರದೇಶದ ವಿಶಿಷ್ಟ ರುಚಿಗಳು:**
• **ಮೈಸೂರು:** ತುಪ್ಪದಲ್ಲಿ ಕರಿದ ಸಾಂಪ್ರದಾಯಿಕ *ಮೈಸೂರು ಪಾಕ್* (ಗುರು ಸ್ವೀಟ್ಸ್), ಮತ್ತು ಬೆಣ್ಣೆ ತುಂಬಿದ *ಮೈಲಾರಿ ಮಸಾಲೆ ದೋಸೆ*.
• **ಕರಾವಳಿ (ಉಡುಪಿ/ಮಂಗಳೂರು):** ಮೃದುವಾದ *ನೀರ್ ದೋಸೆ*, ಬಾಳೆಹಣ್ಣಿನ *ಮಂಗಳೂರು ಬನ್ಸ್*, *ಕೊರಿ ರೊಟ್ಟಿ*, ಮತ್ತು ತುಪ್ಪದ ಸುವಾಸನೆಯ *ಘೀ ರೋಸ್ಟ್*.
• **ಮಲೆನಾಡು (ಕೂರ್ಗ್ & ಚಿಕ್ಕಮಗಳೂರು):** ಗರಿಗರಿಯಾದ *ಅಕ್ಕಿ ರೊಟ್ಟಿ*, *ಕೂರ್ಗ್ ಕಾಫಿ*, ಮತ್ತು ಸ್ಥಳೀಯ ಮಸಾಲೆ ಭಕ್ಷ್ಯಗಳು.
• **ಉತ್ತರ ಕರ್ನಾಟಕ:** ಪೌಷ್ಟಿಕ *ಜೋಳದ ರೊಟ್ಟಿ ಊಟ*, ಬದನೆಕಾಯಿ ಎಣ್ಣೆಗಾಯಿ, ಶೇಂಗಾ ಚಟ್ನಿ ಪುಡಿ ಮತ್ತು ಬಿಸಿ *ಧಾರವಾಡ ಪೇಡ*.
• **ಮಧ್ಯ ಕರ್ನಾಟಕ:** ಪ್ರಸಿದ್ಧ ಗರಿಗರಿ *ದಾವಣಗೆರೆ ಬೆಣ್ಣೆ ದೋಸೆ*.

ಯಾವುದೇ ಸ್ಥಳಕ್ಕೆ ಭೇಟಿ ನೀಡಿದಾಗ ಅಧಿಕೃತ ಸ್ಥಳೀಯ ಹೋಟೆಲ್‌ಗಳಲ್ಲಿ ಮಾತ್ರ ಊಟ ಸವಿಯಿರಿ!`,
        hi: `कर्नाटक की पाक कला (व्यंजन) अपनी समृद्ध विविधता और लाजवाब स्वाद के लिए पूरे भारत में प्रसिद्ध है! 🍲

**अवश्य चखने योग्य स्थानीय प्रसिद्ध व्यंजन:**
• **मैसूरु:** मुंह में घुल जाने वाला असली *मैसूर पाक* (ओरिजिनल गुरु स्वीट्स) और मक्खन से भरपूर *मैलारी मसाला डोसा*।
• **तटीय करावली (उडुपी व मंगलुरु):** रेशमी हल्का *नीर डोसा*, केले की स्वादिष्ट *मंगलुरु बन्स*, और देसी घी में बना सुगंधित *घी रोस्ट*।
• **मलनाड व कूर्ग:** कुरकुरी *अक्की रोट्टी* (चावल की रोटी), ताज़ा नारियल चटनी और खुशबूदार *अरेबिका फ़िल्टर कॉफ़ी*।
• **उत्तर कर्नाटक:** पौष्टिक *जोलड़ा रोट्टी थाली* (ज्वार की रोटी), बैंगन एन्नेगायी, मूंगफली चटनी पाउडर और विश्वप्रसिद्ध *धारवाड़ पेड़ा*।
• **मध्य कर्नाटक:** काठ के चूल्हे पर बनने वाला विश्वप्रसिद्ध *दावणगेरे बटर डोसा (बेन्ने डोसा)*।

*सुझाव: प्रामाणिक स्वाद के लिए हमेशा स्थानीय पारंपरिक भोजनालयों और उडुपी शुद्ध शाकाहारी होटलों में ही भोजन करें!*`,
        te: `కర్ణాటక ఆహార సంస్కృతి ఎంతో రుచికరమైనది మరియు వైవిధ్యభరితమైనది! 🍲

**తప్పక రుచి చూడవలసిన ప్రాంతీయ వంటకాలు:**
• **మైసూరు:** స్వచ్ఛమైన నెయ్యితో నోరూరించే *మైసూరు పాక్* (గురు స్వీట్స్) మరియు దూదిలాంటి మెత్తని *మైలారి మసాలా దోశ*.
• **తీరప్రాంతం (ఉడుపి/మంగళూరు):** తేలికపాటి *నీర్ దోశ*, తియ్యని *మంగళూరు బన్స్*, ఘుమఘుమలాడే *ఘీ రోస్ట్* మరియు కొబ్బరి వంటకాలు.
• **మల్నాడు & కూర్గ్:** కరకరలాడే *అక్కి రొట్టె*, అల్లం చట్నీ మరియు స్వచ్ఛమైన *అరబికా ఫిల్టర్ కాఫీ*.
• **ఉత్తర కర్ణాటక:** పౌష్టిక ఆహారమైన *జొన్న రొట్టె భోజనం (జోళద రొట్టి ఊట)*, గుత్తి వంకాయ (ఎన్నెగాయి), శనగపప్పు చట్నీ పొడి మరియు ప్రసిద్ధ *ధార్వాడ్ పేడా*.
• **మధ్య కర్ణాటక:** ప్రసిద్ధ *దావణగెరె వెన్న దోశ (బెన్నె దోశ)*.

*చిట్కా: నిజమైన అసలైన రుచుల కోసం స్థానిక పురాతన భోజనశాలలు మరియు ఉడుపి హోటళ్లలో మాత్రమే భోజనం చేయండి!*`,
        ta: `கர்நாடக உணவு வகைகள் அதன் சுவைக்கும் பாரம்பரியத்திற்கும் உலகப் புகழ்பெற்றவை! 🍲

**சுவைக்க வேண்டிய முக்கிய உணவுகள்:**
• **மைசூரு:** வாயில் கரையும் பாரம்பரிய *மைசூர் பாக்* (குரு ஸ்வீட்ஸ்) மற்றும் வெண்ணெய் மணக்கும் *மைலாரி மசாலா தோசை*.
• **கடலோர கர்நாடகா (உடுப்பி/மங்களூரு):** பஞ்சு போன்ற மிருதுவான *நீர் தோசை*, சுவையான *மங்களூர் பன்ஸ்*, மற்றும் மணமணக்கும் *நெய் ரோஸ்ட்*.
• **குடகு & மல்நாடு:** மொறுமொறுப்பான *அக்கி ரொட்டி*, இஞ்சி சட்னி மற்றும் சுவையான *ஃபில்டர் காபி*.
• **வட கர்நாடகா:** ஆரோக்கியமான *சோள ரொட்டி சாப்பாடு*, கத்திரிக்காய் மசால், மற்றும் பாரம்பரிய *தார்வாட் பேடா*.
• **மத்திய கர்நாடகா:** நாவில் கரையும் *தாவணகெரே வெண்ணெய் தோசை*.

*குறிப்பு: அசல் பாரம்பரிய சுவையை அறிய பாரம்பரிய உடுப்பி மற்றும் உள்ளூர் மெஸ்களில் உணவருந்துங்கள்!*`,
        ml: `കർണാടകയുടെ ഭക്ഷണ പാരമ്പര്യം വൈവിധ്യമാർന്ന രുചികളാൽ സമ്പന്നമാണ്! 🍲

**നിർബന്ധമായും രുചിക്കേണ്ട വിഭവങ്ങൾ:**
• **മൈസൂരു:** വായിൽ അലിയുന്ന *മൈസൂർ പാക്ക്* (ഗുരു സ്വീറ്റ്സ്) കൂടാതെ വെണ്ണ നിറഞ്ഞ *മൈലാരി മസാല ദോശ*.
• **തീരദേശ കർണാടക (ഉഡുപ്പി/മംഗലാപുരം):** പഞ്ഞിപോലെ മൃദുവായ *നീർ ദോശ*, പഴം കൊണ്ടുള്ള *മംഗലാപുരം ബൺസ്*, തനത് *നെയ് റോസ്റ്റ്*.
• **മലനാട് & കൂർഗ്:** മൊരിഞ്ഞ *അക്കി റൊട്ടി*, തേങ്ങാ ചമ്മന്തി, ഉന്മേഷം തരുന്ന *അറബിക്ക ഫിൽട്ടർ കോഫി*.
• **വടക്കൻ കർണാടക:** ആരോഗ്യകരമായ *ചോള റൊട്ടി ഊണ്*, വഴുതനങ്ങ കറി, പ്രസിദ്ധമായ *ധാർവാഡ് പേഡ*.
• **മധ്യ കർണാടക:** വെണ്ണമൊരിഞ്ഞ *ദാവൺഗരെ ബട്ടർ ദോശ*.

*ടിപ്പ്: തനത് രുചികൾക്കായി പരമ്പരാഗത ഉഡുപ്പി ഹോട്ടലുകൾ തിരഞ്ഞെടുക്കുക!*`,
        en: `Karnataka's cuisine is a mouth-watering journey across distinct geographical regions! 🍲

**Must-Try Regional Specialties:**
• **Mysuru:** Authentic melt-in-mouth *Mysore Pak* (from original Guru Sweet Mart) & cloud-soft *Mylari Masala Dosa*.
• **Coastal Karavali (Udupi & Mangaluru):** Feather-light *Neer Dosa*, golden *Mangalore Buns*, fiery *Ghee Roast*, and authentic coconut curries.
• **Malnad & Coorg:** *Akki Rotti* with ginger chutney, wild bamboo shoots, and fresh dark roast *Arabica filter coffee*.
• **North Karnataka:** Wholesome *Jolada Rotti Oota* with stuffed brinjal (Ennegayi), Shenga peanut chutney powder, and authentic *Dharwad Peda*.
• **Central Karnataka:** The iconic, wood-fired *Davangere Benne Dosa* (butter dosa).

*Tip: Always look for local heritage messes and certified Udupi vegetarian joints for the purest recipes!*`
      };

      return {
        id: `msg_${Date.now()}`,
        sender: 'buddy',
        text: responses[lang] || responses.en,
        timestamp,
        isDemoFallback: true
      };
    }

    // ----------------------------------------------------
    // INTENT 6: REPLACE THIS DESTINATION / మార్చండి / बदलें
    // ----------------------------------------------------
    if (
      qLower.includes('replace') || 
      qLower.includes('swap') || 
      qLower.includes('alternative') || 
      qLower.includes('instead') ||
      qLower.includes('ಬದಲಾಯಿಸಿ') || 
      qLower.includes('ಬೇರೆ') ||
      qLower.includes('बदलें') ||
      qLower.includes('మార్చండి') ||
      qLower.includes('వేరే') ||
      qLower.includes('மாற்றவும்') ||
      qLower.includes('മാറ്റുക')
    ) {
      const activeDest = context.selectedDestination || 
        (context.itinerary?.destinationsCovered[0]) || 
        DESTINATIONS[0];

      const alternatives = DESTINATIONS.filter(d => 
        d.id !== activeDest.id && 
        (d.region === activeDest.region || d.category.some(c => activeDest.category.includes(c)))
      ).slice(0, 2);

      const activeLoc = getLocalizedDestination(activeDest, lang);

      const actions: YatraBuddyAction[] = alternatives.map(alt => {
        const altLoc = getLocalizedDestination(alt, lang);
        const swapPrefix: Record<string, string> = {
          kn: `🔄 ${activeLoc.name} ಬದಲು ${altLoc.name} ಸೇರಿಸಿ`,
          hi: `🔄 ${activeLoc.name} के स्थान पर ${altLoc.name} जोड़ें`,
          te: `🔄 ${activeLoc.name} బదులుగా ${altLoc.name} జోడించండి`,
          ta: `🔄 ${activeLoc.name} பதிலாக ${altLoc.name} சேர்க்கவும்`,
          ml: `🔄 ${activeLoc.name}-ന് പകരം ${altLoc.name} ചേർക്കുക`,
          en: `🔄 Swap ${activeLoc.name} with ${altLoc.name}`
        };

        return {
          id: `action_swap_${activeDest.id}_${alt.id}`,
          type: 'replace_destination',
          label: swapPrefix[lang] || swapPrefix.en,
          payload: {
            oldDestId: activeDest.id,
            newDestId: alt.id
          }
        };
      });

      const altDetails = alternatives.map(a => {
        const aLoc = getLocalizedDestination(a, lang);
        const b = formatLocalizedBudget(a.estimatedBudget, lang);
        return `• **${aLoc.name} (${aLoc.district}):** ${aLoc.tagline} (${b})`;
      }).join('\n');

      const responses: Record<string, string> = {
        kn: `ಖಂಡಿತ, **${activeLoc.name}** ಬದಲಿಗೆ ನೀವು ಇವುಗಳನ್ನು ಪರಿಗಣಿಸಬಹುದು:\n\n${altDetails}\n\nತಕ್ಷಣ ಬದಲಾಯಿಸಲು ಕೆಳಗಿನ ಬಟನ್ ಒತ್ತಿ:`,
        hi: `ज़रूर! **${activeLoc.name}** के स्थान पर आप इन बेहतरीन विकल्पों पर विचार कर सकते हैं:\n\n${altDetails}\n\nसक्रिय यात्रा में तुरंत बदलने के लिए नीचे दिए गए बटन पर टैप करें:`,
        te: `ఖచ్చితంగా! **${activeLoc.name}** కు ప్రత్యామ్నాయంగా మీరు వీటిని ఎంచుకోవచ్చు:\n\n${altDetails}\n\nమీ ప్రయాణ ప్రణాళికలో వెంటనే మార్చడానికి క్రింది బటన్‌పై క్లిక్ చేయండి:`,
        ta: `நிச்சயமாக! **${activeLoc.name}** இடத்திற்கு பதிலாக இவற்றைக் கருத்தில் கொள்ளலாம்:\n\n${altDetails}\n\nபயண திட்டத்தில் உடனடியாக மாற்ற கீழே தட்டவும்:`,
        ml: `തീർച്ചയായും! **${activeLoc.name}**-ന് പകരം ഇവ തിരഞ്ഞെടുക്കാം:\n\n${altDetails}\n\nയാത്രാ പദ്ധതിയിൽ മാറ്റാൻ താഴെ ക്ലിക്ക് ചെയ്യുക:`,
        en: `Certainly! If you'd like to replace **${activeLoc.name}**, here are top alternative matches:\n\n${altDetails}\n\nTap below to swap instantly in your active itinerary:`
      };

      return {
        id: `msg_${Date.now()}`,
        sender: 'buddy',
        text: responses[lang] || responses.en,
        timestamp,
        suggestedDestinations: alternatives,
        actions,
        isDemoFallback: true
      };
    }

    // ----------------------------------------------------
    // INTENT 7: DESTINATION COMPARISON / సరిపోలిక / तुलना
    // ----------------------------------------------------
    if (qLower.includes('vs') || qLower.includes('compare') || qLower.includes('ಹೋಲಿಕೆ') || qLower.includes('तुलना') || qLower.includes('పోలిక')) {
      const d1 = DESTINATIONS.find(d => qLower.includes(d.name.toLowerCase()));
      const d2 = DESTINATIONS.find(d => d.id !== d1?.id && qLower.includes(d.name.toLowerCase()));

      if (d1 && d2) {
        const d1Loc = getLocalizedDestination(d1, lang);
        const d2Loc = getLocalizedDestination(d2, lang);
        const d1Stay = formatLocalizedDuration(d1.idealDays, lang);
        const d2Stay = formatLocalizedDuration(d2.idealDays, lang);
        const d1Budget = formatLocalizedBudget(d1.estimatedBudget, lang);
        const d2Budget = formatLocalizedBudget(d2.estimatedBudget, lang);

        const responses: Record<string, string> = {
          kn: `**${d1Loc.name} vs ${d2Loc.name} ಹೋಲಿಕೆ:** ⚖️\n\n• **${d1Loc.name}:** ${d1Loc.tagline}. ಸೂಕ್ತ ಸಮಯ: ${d1Stay}. ಬಜೆಟ್: ${d1Budget}.\n• **${d2Loc.name}:** ${d2Loc.tagline}. ಸೂಕ್ತ ಸಮಯ: ${d2Stay}. ಬಜೆಟ್: ${d2Budget}.\n\n*ಸಲಹೆ: ಐತಿಹಾಸಿಕ ಶಿಲ್ಪಕಲೆಗೆ ${d1Loc.name} ಮತ್ತು ನೈಸರ್ಗಿಕ ವಿಶ್ರಾಂತಿಗೆ ${d2Loc.name} ಹೆಚ್ಚು ಸೂಕ್ತ!*`,
          hi: `**तुलना: ${d1Loc.name} बनाम ${d2Loc.name}** ⚖️\n\n• **${d1Loc.name}:** ${d1Loc.tagline}। उपयुक्त समय: ${d1Stay}। बजट: ${d1Budget}।\n• **${d2Loc.name}:** ${d2Loc.tagline}। उपयुक्त समय: ${d2Stay}। बजट: ${d2Budget}।\n\n*सलाह: ऐतिहासिक धरोहर के लिए ${d1Loc.name} और प्रकृति के आनंद के लिए ${d2Loc.name} चुनें!*`,
          te: `**పోలిక: ${d1Loc.name} vs ${d2Loc.name}** ⚖️\n\n• **${d1Loc.name}:** ${d1Loc.tagline}. అనుకూల సమయం: ${d1Stay}. బడ్జెట్: ${d1Budget}.\n• **${d2Loc.name}:** ${d2Loc.tagline}. అనుకూల సమయం: ${d2Stay}. బడ్జెట్: ${d2Budget}.\n\n*సూచన: చారిత్రక కట్టడాల కోసం ${d1Loc.name} మరియు ప్రకృతి ఆహ్లాదం కోసం ${d2Loc.name} ఎంచుకోండి!*`,
          ta: `**ஒப்பீடு: ${d1Loc.name} vs ${d2Loc.name}** ⚖️\n\n• **${d1Loc.name}:** ${d1Loc.tagline}. உகந்த காலம்: ${d1Stay}. பட்ஜெட்: ${d1Budget}.\n• **${d2Loc.name}:** ${d2Loc.tagline}. உகந்த காலம்: ${d2Stay}. பட்ஜெட்: ${d2Budget}.\n\n*குறிப்பு: வரலாற்று இடங்களுக்கு ${d1Loc.name} மற்றும் இயற்கை காட்சிகளுக்கு ${d2Loc.name} சிறந்தது!*`,
          ml: `**താരതമ്യം: ${d1Loc.name} vs ${d2Loc.name}** ⚖️\n\n• **${d1Loc.name}:** ${d1Loc.tagline}. സമയം: ${d1Stay}. ബജറ്റ്: ${d1Budget}.\n• **${d2Loc.name}:** ${d2Loc.tagline}. സമയം: ${d2Stay}. ബജറ്റ്: ${d2Budget}.\n\n*നിർദ്ദേശം: ചരിത്ര പൈതൃകത്തിന് ${d1Loc.name}-ഉം പ്രകൃതിഭംഗിക്ക് ${d2Loc.name}-ഉം തിരഞ്ഞെടുക്കുക!*`,
          en: `**Comparison: ${d1Loc.name} vs ${d2Loc.name}** ⚖️\n\n• **${d1Loc.name} (${d1Loc.district}):** ${d1Loc.tagline}. Ideal stay: ${d1Stay}. Estimated cost: ${d1Budget}.\n• **${d2Loc.name} (${d2Loc.district}):** ${d2Loc.tagline}. Ideal stay: ${d2Stay}. Estimated cost: ${d2Budget}.\n\n*Traveler Tip: Choose ${d1Loc.name} for rich heritage and monuments, or ${d2Loc.name} for scenic landscape relaxation!*`
        };

        return {
          id: `msg_${Date.now()}`,
          sender: 'buddy',
          text: responses[lang] || responses.en,
          timestamp,
          suggestedDestinations: [d1, d2],
          isDemoFallback: true
        };
      }
    }

    // ----------------------------------------------------
    // MATCH SPECIFIC DESTINATION BY NAME
    // ----------------------------------------------------
    const matchedDest = DESTINATIONS.find(d => {
      const locObj = getLocalizedDestination(d, lang);
      return (
        qLower.includes(d.name.toLowerCase()) || 
        qLower.includes(d.id.toLowerCase()) ||
        qLower.includes(d.kannadaName.toLowerCase()) ||
        qLower.includes(locObj.name.toLowerCase()) ||
        qLower.includes(d.district.toLowerCase())
      );
    });

    if (matchedDest) {
      const mLoc = getLocalizedDestination(matchedDest, lang);
      const mDuration = formatLocalizedDuration(matchedDest.idealDays, lang);
      const mBudget = formatLocalizedBudget(matchedDest.estimatedBudget, lang);
      const mSeason = formatLocalizedSeason(matchedDest.bestTimeToVisit, lang);

      const actions: YatraBuddyAction[] = [
        {
          id: `view_${matchedDest.id}`,
          type: 'view_destination',
          label: lang === 'kn' ? `📖 ${mLoc.name} ವಿವರ ನೋಡಿ`
            : lang === 'hi' ? `📖 ${mLoc.name} विवरण देखें`
            : lang === 'te' ? `📖 ${mLoc.name} వివరాలు చూడండి`
            : lang === 'ta' ? `📖 ${mLoc.name} விவரங்களைக் காண்க`
            : lang === 'ml' ? `📖 ${mLoc.name} വിവരങ്ങൾ കാണുക`
            : `📖 View ${mLoc.name} Details`,
          payload: matchedDest
        },
        {
          id: `voice_${matchedDest.id}`,
          type: 'open_voice_guide',
          label: lang === 'kn' ? `🎙️ ಆಡಿಯೋ ಕಥೆ ಕೇಳಿ`
            : lang === 'hi' ? `🎙️ ऑडियो कहानी सुनें`
            : lang === 'te' ? `🎙️ ఆడియో కథ వినండి`
            : lang === 'ta' ? `🎙️ குரல் வழிகாட்டி கேட்கவும்`
            : lang === 'ml' ? `🎙️ ഓഡിയോ കഥ കേൾക്കൂ`
            : `🎙️ Listen to Voice Story`,
          payload: matchedDest
        }
      ];

      const responses: Record<string, string> = {
        kn: `**${mLoc.name}** (${mLoc.district} ಜಿಲ್ಲೆ): 🏛️\n\n${matchedDest.description}\n\n• **ಪ್ರಮುಖ ಆಕರ್ಷಣೆಗಳು:** ${matchedDest.topAttractions.slice(0, 3).map(a => a.name).join(', ')}.\n• **ಅನುಕೂಲಕರ ಸಮಯ:** ${mDuration} (${mSeason}).\n• **ಅಂದಾಜು ಬಜೆಟ್:** ${mBudget}.`,
        hi: `**${mLoc.name}** (${mLoc.district} ज़िला): 🏛️\n\n${matchedDest.description}\n\n• **प्रमुख आकर्षण:** ${matchedDest.topAttractions.slice(0, 3).map(a => a.name).join(', ')}।\n• **सुझाया गया समय:** ${mDuration} (सर्वोत्तम मौसम: ${mSeason})।\n• **औसत बजट:** ${mBudget}।`,
        te: `**${mLoc.name}** (${mLoc.district} జిల్లా): 🏛️\n\n${matchedDest.description}\n\n• **ప్రధాన ఆకర్షణలు:** ${matchedDest.topAttractions.slice(0, 3).map(a => a.name).join(', ')}.\n• **సిఫార్సు సమయం:** ${mDuration} (అనుకూల సీజన్: ${mSeason}).\n• **సగటు బడ్జెట్:** ${mBudget}.`,
        ta: `**${mLoc.name}** (${mLoc.district} மாவட்டம்): 🏛️\n\n${matchedDest.description}\n\n• **முக்கிய ஈர்ப்புகள்:** ${matchedDest.topAttractions.slice(0, 3).map(a => a.name).join(', ')}.\n• **பரிந்துரைக்கப்படும் காலம்:** ${mDuration} (சிறந்த பருவம்: ${mSeason}).\n• **சராசரி பட்ஜெட்:** ${mBudget}.`,
        ml: `**${mLoc.name}** (${mLoc.district} ജില്ല): 🏛️\n\n${matchedDest.description}\n\n• **പ്രധാന ആകർഷണങ്ങൾ:** ${matchedDest.topAttractions.slice(0, 3).map(a => a.name).join(', ')}.\n• **സമയം:** ${mDuration} (അനുയോജ്യമായ കാലം: ${mSeason}).\n• **ബജറ്റ്:** ${mBudget}.`,
        en: `**${mLoc.name}** (${mLoc.district} district): 🏛️\n\n${matchedDest.description}\n\n• **Key Attractions:** ${matchedDest.topAttractions.slice(0, 3).map(a => a.name).join(', ')}.\n• **Best Season:** ${mSeason} (Ideal Stay: ${mDuration}).\n• **Estimated Budget:** ${mBudget}.`
      };

      return {
        id: `msg_${Date.now()}`,
        sender: 'buddy',
        text: responses[lang] || responses.en,
        timestamp,
        suggestedDestinations: [matchedDest],
        actions,
        isDemoFallback: true
      };
    }

    // ----------------------------------------------------
    // DEFAULT FRIENDLY HELPFUL FALLBACK (All 6 Languages)
    // ----------------------------------------------------
    const fallbacks: Record<string, string> = {
      kn: `ನಮಸ್ಕಾರ! ಕರ್ನಾಟಕ ಪ್ರವಾಸದ ಕುರಿತು ನಾನು ನಿಮಗೆ ಸಂಪೂರ್ಣ ಮಾರ್ಗದರ್ಶನ ನೀಡಬಲ್ಲೆ. 🙏

ನೀವು ಕೆಳಗಿನ ವಿಷಯಗಳ ಬಗ್ಗೆ ಕೇಳಬಹುದು:
1. **"ಬಜೆಟ್ ಕಡಿಮೆ ಮಾಡಿ"** — ಸಾರಿಗೆ ಮತ್ತು ವಸತಿ ವೆಚ್ಚ ಉಳಿತಾಯ
2. **"ಹತ್ತಿರದ ನಿಸರ್ಗ ತಾಣಗಳು"** — ಜಲಪಾತಗಳು, ಪರ್ವತಗಳು, ವನ್ಯಜೀವಿಗಳು
3. **"ಕುಟುಂಬ ಪ್ರವಾಸ ಯೋಜನೆ"** — ಮಕ್ಕಳು ಮತ್ತು ಪೋಷಕರಿಗೆ ಸೂಕ್ತವಾದ ಆರಾಮದಾಯಕ ಸರ್ಕ್ಯೂಟ್
4. **"ಸ್ಥಳೀಯ ಆಹಾರ ಸಲಹೆ"** — ಮೈಸೂರು ಪಾಕ್, ಬೆಣ್ಣೆ ದೋಸೆ, ನೀರ್ ದೋಸೆ
5. **"ನನಗೆ ಒಂದೇ ದಿನ ಇದೆ"** — ತ್ವರಿತ 1 ದಿನದ ಪ್ರವಾಸಗಳು`,
      hi: `नमस्कार! मैं कर्नाटक की आपकी इस खूबसूरत यात्रा को यादगार बनाने के लिए यहाँ हूँ। 🙏

मुझसे आप पूछ सकते हैं:
1. **"ट्रिप का बजट कम करें"** — परिवहन और होटल के खर्च में बचत करने के लिए।
2. **"आस-पास के प्राकृतिक स्थल"** — झरने, हरियाली से भरे पहाड़ और वन्यजीव।
3. **"पारिवारिक यात्रा योजना"** — बच्चों और बुजुर्गों के अनुकूल आरामदायक हेरिटेज टूर।
4. **"स्थानीय प्रसिद्ध भोजन"** — मैसूर पाक, बेन्ने डोसा, नीर डोसा आदि।
5. **"मेरे पास केवल 1 दिन है"** — बेंगलुरु से 1-दिवसीय शानदार ट्रिप के लिए।`,
      te: `నమస్కారం! కర్ణాటకలోని అద్భుతమైన ప్రదేశాలను చూడటంలో మీకు సహాయం చేయడానికి నేను ఇక్కడ ఉన్నాను. 🙏

మీరు నన్ను ఇలా అడగవచ్చు:
1. **"ట్రిప్ బడ్జెట్ తగ్గించండి"** — రవాణా మరియు హోటల్ ఖర్చులను ఆదా చేయడానికి.
2. **"దగ్గరలోని ప్రకృతి దృశ్యాలు"** — జలపాతాలు, కొండలు మరియు వన్యప్రాణి ప్రదేశాలు.
3. **"కుటుంబ యాత్రా ప్లాన్"** — పిల్లలు మరియు పెద్దలకు అనువైన సులభమైన యాత్రలు.
4. **"స్థానిక ప్రసిద్ధ వంటకాలు"** — మైసూరు పాక్, బెన్నె దోశ, నీర్ దోశ తదితరాలు.
5. **"నాకు ఒక రోజు మాత్రమే ఉంది"** — 1-రోజు శీఘ్ర మరియు అందమైన ప్రయాణాలు.`,
      ta: `வணக்கம்! கர்நாடகாவின் சிறந்த இடங்களை அனுபவிக்க நான் உங்களுக்கு உதவ தயாராக உள்ளேன். 🙏

என்னிடம் நீங்கள் கேட்கலாம்:
1. **"பயண செலவை குறைக்கவும்"** — போக்குவரத்து மற்றும் தங்கும் செலவை குறைக்க.
2. **"அருகிலுள்ள இயற்கை இடங்கள்"** — அருவிகள், மலைகள் மற்றும் வனவிலங்கு தலங்கள்.
3. **"குடும்ப சுற்றுலா திட்டம்"** — குடும்பத்தினருடன் வசதியாக சென்று வர.
4. **"உள்ளூர் சிறப்பு உணவு"** — மைசூர் பாக், பென்னே தோசை, நீர் தோசை முதலியன.
5. **"எனக்கு 1 நாள் மட்டுமே உள்ளது"** — 1 நாள் சிறந்த சுற்றுலாக்கள்.`,
      ml: `നമസ്കാരം! കർണാടകയിലെ മികച്ച യാത്രാ അനുഭവങ്ങൾക്കായി ഞാൻ നിങ്ങളെ സഹായിക്കാം. 🙏

നിങ്ങൾക്ക് എന്നോട് ചോദിക്കാം:
1. **"യാത്രാ ചിലവ് കുറയ്ക്കുക"** — വാഹന, താമസ ചെലവുകൾ ലാഭിക്കാൻ.
2. **"പ്രകൃതിഭംഗിയുള്ള സ്ഥലങ്ങൾ"** — വെള്ളച്ചാട്ടങ്ങൾ, മലനിരകൾ, വന്യജീവി സങ്കേതങ്ങൾ.
3. **"കുടുംബ യാത്രാ പദ്ധതി"** — കുടുംബത്തോടൊപ്പം ആസ്വദിക്കാവുന്ന യാത്രാ വഴികൾ.
4. **"നാടൻ ഭക്ഷണങ്ങൾ"** — മൈസൂർ പാക്ക്, ദോശ വിഭവങ്ങൾ.
5. **"എനിക്ക് 1 ദിവസം മാത്രമേ ഉള്ളൂ"** — 1 ദിവസത്തെ ദ്രുത യാത്രകൾ.`,
      en: `Namaskara! I'm here to help you experience the very best of Karnataka. 🙏

Try asking me:
1. **"Make my trip cheaper"** — to optimize transport and lodging costs.
2. **"Find nature places nearby"** — for waterfalls, hills, and wildlife trails.
3. **"Plan a family trip"** — for relaxed, child-friendly heritage circuits.
4. **"Suggest local food"** — to discover regional GI-tagged delicacies.
5. **"I only have one day"** — for swift, high-impact day trips.`
    };

    return {
      id: `msg_${Date.now()}`,
      sender: 'buddy',
      text: fallbacks[lang] || fallbacks.en,
      timestamp,
      isDemoFallback: true
    };
  }

  /**
   * Browser Speech-To-Text microphone recording helper.
   * Uses Web Speech Recognition API with fallback handling.
   */
  public static startSpeechRecognition(
    language: YatraBuddyLanguage,
    onResult: (text: string) => void,
    onError: (errorMessage: string) => void
  ): { stop: () => void } {
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRec) {
      onError('Speech recognition is not supported in this browser. Please type your message.');
      return { stop: () => {} };
    }

    try {
      const recognition = new SpeechRec();
      recognition.continuous = false;
      recognition.interimResults = false;
      const langTagMap: Record<YatraBuddyLanguage, string> = {
        en: 'en-IN',
        kn: 'kn-IN',
        hi: 'hi-IN',
        te: 'te-IN',
        ta: 'ta-IN',
        ml: 'ml-IN'
      };
      recognition.lang = langTagMap[language] || 'en-IN';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          onResult(transcript);
        }
      };

      recognition.onerror = (event: any) => {
        if (event.error !== 'no-speech') {
          onError(`Microphone note: ${event.error || 'Speech not detected'}.`);
        }
      };

      recognition.start();

      return {
        stop: () => {
          try {
            recognition.stop();
          } catch {
            // Safe cleanup
          }
        }
      };
    } catch (err: any) {
      onError(err?.message || 'Could not start microphone.');
      return { stop: () => {} };
    }
  }
}
