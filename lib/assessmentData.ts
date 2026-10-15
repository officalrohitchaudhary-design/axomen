// HelpYoungIndia Self-Assessment Question Engine & Bilingual Dataset

export interface AssessmentOption {
  id: string;
  en: string;
  hi: string;
  weight?: number; // indicative severity / control difficulty weight (0 - 4)
  triggerType?: string; // e.g., 'stress', 'boredom', 'sexual_desire', etc.
  impactType?: string; // e.g., 'guilt', 'focus_loss', 'relationship', etc.
}

export interface AssessmentQuestion {
  id: number;
  sectionId: "s1" | "s2" | "s3";
  categoryEn?: string;
  categoryHi?: string;
  en: string;
  hi: string;
  type?: "single" | "multiple";
  noteEn?: string;
  noteHi?: string;
  followUpEn?: string;
  followUpHi?: string;
  openAnswerEn?: string;
  openAnswerHi?: string;
  options: AssessmentOption[];
}

export interface InitialHelpOption {
  id: "porn" | "masturbation" | "both" | "not_sure";
  en: string;
  hi: string;
  descriptionEn?: string;
  descriptionHi?: string;
}

export const INITIAL_HELP_QUESTION = {
  id: "initial",
  en: "What do you want help with?",
  hi: "आप किस चीज़ में मदद चाहते हैं?",
  subtitleEn: "Select one or more options that apply to you",
  subtitleHi: "अपनी स्थिति के अनुसार एक या अधिक विकल्प चुनें",
  options: [
    {
      id: "porn",
      en: "Porn is affecting my life",
      hi: "पोर्न मेरी ज़िंदगी को प्रभावित कर रहा है",
    },
    {
      id: "masturbation",
      en: "Masturbation is affecting my life",
      hi: "हस्तमैथुन मेरी ज़िंदगी को प्रभावित कर रहा है",
    },
    {
      id: "both",
      en: "Both are affecting my life",
      hi: "पोर्न और हस्तमैथुन दोनों मेरी ज़िंदगी को प्रभावित कर रहे हैं",
    },
    {
      id: "not_sure",
      en: "I am not sure",
      hi: "मुझे पक्का नहीं पता",
    },
  ] as InitialHelpOption[],
};

// ── SECTION 1: Porn Assessment (21 Questions) ─────────────────────────────────
export const SECTION_1_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 1,
    sectionId: "s1",
    categoryEn: "Onset Timeline",
    categoryHi: "शुरुआत का समय",
    en: "When did porn first become a part of your life?",
    hi: "पोर्न पहली बार आपकी ज़िंदगी का हिस्सा कब बना?",
    followUpEn: "Client can explain: How they first discovered it and what happened at that time.",
    followUpHi: "आप बता सकते हैं: आपको इसके बारे में पहली बार कैसे पता चला और उस समय क्या हुआ था।",
    options: [
      { id: "s1_q1_1", en: "Childhood", hi: "बचपन में", weight: 3 },
      { id: "s1_q1_2", en: "Teenage years", hi: "किशोरावस्था में", weight: 2 },
      { id: "s1_q1_3", en: "Adulthood", hi: "वयस्क होने पर", weight: 1 },
      { id: "s1_q1_4", en: "I don't remember clearly", hi: "ठीक से याद नहीं", weight: 1 },
    ],
  },
  {
    id: 2,
    sectionId: "s1",
    categoryEn: "Duration",
    categoryHi: "अवधि",
    en: "How long have you been watching porn?",
    hi: "आप कितने समय से पोर्न देख रहे हैं?",
    options: [
      { id: "s1_q2_1", en: "Less than 6 months", hi: "6 महीने से कम", weight: 1 },
      { id: "s1_q2_2", en: "6–12 months", hi: "6–12 महीने", weight: 2 },
      { id: "s1_q2_3", en: "1–3 years", hi: "1–3 साल", weight: 3 },
      { id: "s1_q2_4", en: "3–5 years", hi: "3–5 साल", weight: 4 },
      { id: "s1_q2_5", en: "More than 5 years", hi: "5 साल से अधिक", weight: 4 },
    ],
  },
  {
    id: 3,
    sectionId: "s1",
    categoryEn: "Frequency",
    categoryHi: "आवृत्ति",
    en: "How often do you currently watch porn?",
    hi: "आप वर्तमान में कितनी बार पोर्न देखते हैं?",
    options: [
      { id: "s1_q3_1", en: "Rarely", hi: "कभी-कभी", weight: 1 },
      { id: "s1_q3_2", en: "1–2 times a week", hi: "सप्ताह में 1–2 बार", weight: 2 },
      { id: "s1_q3_3", en: "3–5 times a week", hi: "सप्ताह में 3–5 बार", weight: 3 },
      { id: "s1_q3_4", en: "Daily", hi: "रोज़", weight: 4 },
      { id: "s1_q3_5", en: "More than once a day", hi: "दिन में एक से अधिक बार", weight: 5 },
    ],
  },
  {
    id: 4,
    sectionId: "s1",
    categoryEn: "Context & Place",
    categoryHi: "समय व स्थान",
    en: "When and where do you usually watch porn?",
    hi: "आप आमतौर पर पोर्न कब और कहाँ देखते हैं?",
    options: [
      { id: "s1_q4_1", en: "At night", hi: "रात में", weight: 2 },
      { id: "s1_q4_2", en: "When alone", hi: "अकेले होने पर", weight: 2 },
      { id: "s1_q4_3", en: "In bed", hi: "बिस्तर पर", weight: 2 },
      { id: "s1_q4_4", en: "In the bathroom", hi: "बाथरूम में", weight: 3 },
      { id: "s1_q4_5", en: "While using my phone", hi: "फोन इस्तेमाल करते समय", weight: 2 },
      { id: "s1_q4_6", en: "Other", hi: "अन्य", weight: 1 },
    ],
  },
  {
    id: 5,
    sectionId: "s1",
    categoryEn: "Content Type",
    categoryHi: "सामग्री का प्रकार",
    en: "What type of content do you usually look for?",
    hi: "आप आमतौर पर किस प्रकार की सामग्री खोजते हैं?",
    noteEn: "Client is not pressured to share private or graphic details.",
    noteHi: "इस प्रश्न में किसी भी निजी या ग्राफिक विवरण के लिए मजबूर नहीं किया जाता।",
    options: [
      { id: "s1_q5_1", en: "Sexual videos", hi: "यौन वीडियो", weight: 2 },
      { id: "s1_q5_2", en: "Images", hi: "तस्वीरें", weight: 1 },
      { id: "s1_q5_3", en: "Short videos", hi: "छोटे वीडियो", weight: 2 },
      { id: "s1_q5_4", en: "Specific categories", hi: "विशेष प्रकार की सामग्री", weight: 3 },
      { id: "s1_q5_5", en: "It changes", hi: "हर बार अलग", weight: 3 },
      { id: "s1_q5_6", en: "Prefer not to say", hi: "बताना नहीं चाहता", weight: 1 },
    ],
  },
  {
    id: 6,
    sectionId: "s1",
    categoryEn: "Triggers",
    categoryHi: "ट्रिगर्स व कारण",
    en: "What usually makes you want to watch porn?",
    hi: "आपको आमतौर पर पोर्न देखने की इच्छा किस वजह से होती है?",
    options: [
      { id: "s1_q6_1", en: "Sexual desire", hi: "यौन इच्छा", weight: 1, triggerType: "desire" },
      { id: "s1_q6_2", en: "Boredom", hi: "बोरियत", weight: 2, triggerType: "boredom" },
      { id: "s1_q6_3", en: "Stress", hi: "तनाव", weight: 3, triggerType: "stress" },
      { id: "s1_q6_4", en: "Loneliness", hi: "अकेलापन", weight: 3, triggerType: "loneliness" },
      { id: "s1_q6_5", en: "Sadness", hi: "उदासी", weight: 3, triggerType: "sadness" },
      { id: "s1_q6_6", en: "Habit", hi: "आदत", weight: 3, triggerType: "habit" },
      { id: "s1_q6_7", en: "Curiosity", hi: "जिज्ञासा", weight: 1, triggerType: "curiosity" },
      { id: "s1_q6_8", en: "Other", hi: "अन्य", weight: 1, triggerType: "other" },
    ],
  },
  {
    id: 7,
    sectionId: "s1",
    categoryEn: "Urge Reaction",
    categoryHi: "इच्छा पर प्रतिक्रिया",
    en: "When you feel a sexual urge, how often do you turn to porn?",
    hi: "जब आपको यौन इच्छा होती है, तो आप कितनी बार पोर्न देखते हैं?",
    options: [
      { id: "s1_q7_1", en: "Never", hi: "कभी नहीं", weight: 0 },
      { id: "s1_q7_2", en: "Rarely", hi: "कभी-कभी", weight: 1 },
      { id: "s1_q7_3", en: "Sometimes", hi: "कभी-कभी", weight: 2 },
      { id: "s1_q7_4", en: "Often", hi: "अक्सर", weight: 3 },
      { id: "s1_q7_5", en: "Almost every time", hi: "लगभग हर बार", weight: 4 },
    ],
  },
  {
    id: 8,
    sectionId: "s1",
    categoryEn: "Automatic Behaviour",
    categoryHi: "बिना योजना के शुरुआत",
    en: "Do you sometimes open porn without planning to?",
    hi: "क्या आप कभी बिना योजना बनाए पोर्न खोल लेते हैं?",
    options: [
      { id: "s1_q8_1", en: "Never", hi: "कभी नहीं", weight: 0 },
      { id: "s1_q8_2", en: "Rarely", hi: "कभी-कभी", weight: 1 },
      { id: "s1_q8_3", en: "Sometimes", hi: "कभी-कभी", weight: 2 },
      { id: "s1_q8_4", en: "Often", hi: "अक्सर", weight: 3 },
      { id: "s1_q8_5", en: "Very often", hi: "बहुत बार", weight: 4 },
    ],
  },
  {
    id: 9,
    sectionId: "s1",
    categoryEn: "Habit Connection",
    categoryHi: "हस्तमैथुन से जुड़ाव",
    en: "Do you watch porn to masturbate?",
    hi: "क्या आप हस्तमैथुन करने के लिए पोर्न देखते हैं?",
    options: [
      { id: "s1_q9_1", en: "Always", hi: "हमेशा", weight: 4 },
      { id: "s1_q9_2", en: "Often", hi: "अक्सर", weight: 3 },
      { id: "s1_q9_3", en: "Sometimes", hi: "कभी-कभी", weight: 2 },
      { id: "s1_q9_4", en: "Rarely", hi: "कभी-कभी ही", weight: 1 },
      { id: "s1_q9_5", en: "Never", hi: "कभी नहीं", weight: 0 },
    ],
  },
  {
    id: 10,
    sectionId: "s1",
    categoryEn: "Control Difficulty",
    categoryHi: "रुकने में कठिनाई",
    en: "Once you start watching, how difficult is it to stop?",
    hi: "पोर्न देखना शुरू करने के बाद रुकना आपके लिए कितना मुश्किल होता है?",
    options: [
      { id: "s1_q10_1", en: "Not difficult", hi: "बिल्कुल मुश्किल नहीं", weight: 0 },
      { id: "s1_q10_2", en: "Slightly difficult", hi: "थोड़ा मुश्किल", weight: 1 },
      { id: "s1_q10_3", en: "Moderately difficult", hi: "सामान्य रूप से मुश्किल", weight: 2 },
      { id: "s1_q10_4", en: "Very difficult", hi: "बहुत मुश्किल", weight: 3 },
      { id: "s1_q10_5", en: "Extremely difficult", hi: "बेहद मुश्किल", weight: 4 },
    ],
  },
  {
    id: 11,
    sectionId: "s1",
    categoryEn: "Time Distortion",
    categoryHi: "समय सीमा से अधिक",
    en: "Do you sometimes watch porn for longer than you planned?",
    hi: "क्या आप कभी अपनी योजना से ज़्यादा समय तक पोर्न देखते हैं?",
    options: [
      { id: "s1_q11_1", en: "Never", hi: "कभी नहीं", weight: 0 },
      { id: "s1_q11_2", en: "Rarely", hi: "कभी-कभी", weight: 1 },
      { id: "s1_q11_3", en: "Sometimes", hi: "कभी-कभी", weight: 2 },
      { id: "s1_q11_4", en: "Often", hi: "अक्सर", weight: 3 },
      { id: "s1_q11_5", en: "Very often", hi: "बहुत बार", weight: 4 },
    ],
  },
  {
    id: 12,
    sectionId: "s1",
    categoryEn: "Pre-Viewing Emotions",
    categoryHi: "देखने से पहले की भावना",
    en: "What are you usually feeling before you watch porn?",
    hi: "पोर्न देखने से पहले आप आमतौर पर क्या महसूस कर रहे होते हैं?",
    options: [
      { id: "s1_q12_1", en: "Sexual excitement", hi: "यौन उत्तेजना", weight: 1 },
      { id: "s1_q12_2", en: "Stress", hi: "तनाव", weight: 3 },
      { id: "s1_q12_3", en: "Boredom", hi: "बोरियत", weight: 2 },
      { id: "s1_q12_4", en: "Loneliness", hi: "अकेलापन", weight: 3 },
      { id: "s1_q12_5", en: "Sadness", hi: "उदासी", weight: 3 },
      { id: "s1_q12_6", en: "Anger", hi: "गुस्सा", weight: 3 },
      { id: "s1_q12_7", en: "Nothing specific", hi: "कोई विशेष भावना नहीं", weight: 1 },
      { id: "s1_q12_8", en: "Other", hi: "अन्य", weight: 1 },
    ],
  },
  {
    id: 13,
    sectionId: "s1",
    categoryEn: "Mind Rationalizations",
    categoryHi: "दिमाग का तर्क",
    en: "When the urge comes, what does your mind usually tell you?",
    hi: "जब पोर्न देखने की इच्छा होती है, तो आपका दिमाग आमतौर पर क्या कहता है?",
    options: [
      { id: "s1_q13_1", en: "“Just watch for a few minutes.”", hi: "“बस कुछ मिनट देखता हूँ।”", weight: 2 },
      { id: "s1_q13_2", en: "“I deserve a break.”", hi: "“मुझे थोड़ा आराम चाहिए।”", weight: 2 },
      { id: "s1_q13_3", en: "“I can stop whenever I want.”", hi: "“जब चाहूँगा, रोक दूँगा।”", weight: 3 },
      { id: "s1_q13_4", en: "“I need it right now.”", hi: "“मुझे अभी इसकी ज़रूरत है।”", weight: 4 },
      { id: "s1_q13_5", en: "Something else", hi: "कुछ और", weight: 2 },
    ],
  },
  {
    id: 14,
    sectionId: "s1",
    categoryEn: "Inner Conflict",
    categoryHi: "रुकने की आंतरिक इच्छा",
    en: "Is there another part of you that wants to stop?",
    hi: "क्या आपके अंदर का कोई दूसरा हिस्सा रुकना चाहता है?",
    followUpEn: "Follow-up: What does that part of you say?",
    followUpHi: "आगे पूछें: आपके अंदर का वह हिस्सा क्या कहता है?",
    options: [
      { id: "s1_q14_1", en: "Yes", hi: "हाँ", weight: 3 },
      { id: "s1_q14_2", en: "No", hi: "नहीं", weight: 1 },
      { id: "s1_q14_3", en: "Sometimes", hi: "कभी-कभी", weight: 2 },
      { id: "s1_q14_4", en: "I am not sure", hi: "मुझे पक्का नहीं पता", weight: 2 },
    ],
  },
  {
    id: 15,
    sectionId: "s1",
    categoryEn: "Response to Strong Urge",
    categoryHi: "तेज़ इच्छा पर कदम",
    en: "What do you usually do after the urge becomes strong?",
    hi: "जब पोर्न देखने की इच्छा बहुत बढ़ जाती है, तो आप आमतौर पर क्या करते हैं?",
    options: [
      { id: "s1_q15_1", en: "Watch porn", hi: "पोर्न देखता हूँ", weight: 4 },
      { id: "s1_q15_2", en: "Try to resist", hi: "रोकने की कोशिश करता हूँ", weight: 2 },
      { id: "s1_q15_3", en: "Use my phone or social media", hi: "फोन या सोशल मीडिया इस्तेमाल करता हूँ", weight: 2 },
      { id: "s1_q15_4", en: "Leave the situation", hi: "उस जगह से हट जाता हूँ", weight: 1 },
      { id: "s1_q15_5", en: "Contact someone", hi: "किसी से संपर्क करता हूँ", weight: 1 },
      { id: "s1_q15_6", en: "Other", hi: "अन्य", weight: 1 },
    ],
  },
  {
    id: 16,
    sectionId: "s1",
    categoryEn: "Attempts to Stop",
    categoryHi: "छोड़ने की कोशिश",
    en: "Have you tried to stop or reduce your porn use?",
    hi: "क्या आपने पोर्न छोड़ने या कम करने की कोशिश की है?",
    options: [
      { id: "s1_q16_1", en: "Never", hi: "कभी नहीं", weight: 0 },
      { id: "s1_q16_2", en: "Once", hi: "एक बार", weight: 1 },
      { id: "s1_q16_3", en: "A few times", hi: "कुछ बार", weight: 2 },
      { id: "s1_q16_4", en: "Many times", hi: "कई बार", weight: 4 },
    ],
  },
  {
    id: 17,
    sectionId: "s1",
    categoryEn: "Pattern After Decision",
    categoryHi: "फैसले के बाद का चक्र",
    en: "What usually happens after you decide to stop?",
    hi: "जब आप पोर्न छोड़ने का फैसला करते हैं, तो आमतौर पर क्या होता है?",
    options: [
      { id: "s1_q17_1", en: "I stay away successfully", hi: "मैं दूर रहने में सफल रहता हूँ", weight: 0 },
      { id: "s1_q17_2", en: "I return after a few days", hi: "कुछ दिनों बाद दोबारा देखता हूँ", weight: 3 },
      { id: "s1_q17_3", en: "I return after a strong urge", hi: "तेज़ इच्छा के बाद दोबारा देखता हूँ", weight: 3 },
      { id: "s1_q17_4", en: "I stop temporarily", hi: "कुछ समय के लिए रुकता हूँ", weight: 2 },
      { id: "s1_q17_5", en: "Other", hi: "अन्य", weight: 1 },
    ],
  },
  {
    id: 18,
    sectionId: "s1",
    categoryEn: "Relapse Triggers",
    categoryHi: "दोबारा लौटने के कारण",
    en: "What usually makes you return to porn?",
    hi: "आपको दोबारा पोर्न देखने की तरफ क्या ले जाता है?",
    options: [
      { id: "s1_q18_1", en: "Sexual urge", hi: "यौन इच्छा", weight: 2 },
      { id: "s1_q18_2", en: "Stress", hi: "तनाव", weight: 3 },
      { id: "s1_q18_3", en: "Boredom", hi: "बोरियत", weight: 2 },
      { id: "s1_q18_4", en: "Loneliness", hi: "अकेलापन", weight: 3 },
      { id: "s1_q18_5", en: "Habit", hi: "आदत", weight: 3 },
      { id: "s1_q18_6", en: "Sexual content", hi: "यौन सामग्री", weight: 3 },
      { id: "s1_q18_7", en: "Emotional discomfort", hi: "भावनात्मक परेशानी", weight: 3 },
      { id: "s1_q18_8", en: "Other", hi: "अन्य", weight: 1 },
    ],
  },
  {
    id: 19,
    sectionId: "s1",
    categoryEn: "Life Impact",
    categoryHi: "जीवन के क्षेत्रों पर असर",
    en: "Has porn affected any important part of your life?",
    hi: "क्या पोर्न ने आपकी ज़िंदगी के किसी ज़रूरी हिस्से को प्रभावित किया है?",
    options: [
      { id: "s1_q19_1", en: "Sleep", hi: "नींद", weight: 2, impactType: "sleep" },
      { id: "s1_q19_2", en: "Studies or career", hi: "पढ़ाई या करियर", weight: 3, impactType: "career" },
      { id: "s1_q19_3", en: "Time and focus", hi: "समय और ध्यान", weight: 3, impactType: "focus" },
      { id: "s1_q19_4", en: "Family or relationships", hi: "परिवार या रिश्ते", weight: 3, impactType: "relationship" },
      { id: "s1_q19_5", en: "Social life", hi: "सामाजिक जीवन", weight: 2, impactType: "social" },
      { id: "s1_q19_6", en: "Emotional well-being", hi: "भावनात्मक स्थिति", weight: 3, impactType: "emotional" },
      { id: "s1_q19_7", en: "No noticeable effect", hi: "कोई स्पष्ट प्रभाव नहीं", weight: 0, impactType: "none" },
      { id: "s1_q19_8", en: "More than one area", hi: "एक से अधिक क्षेत्र", weight: 4, impactType: "multiple" },
    ],
  },
  {
    id: 20,
    sectionId: "s1",
    categoryEn: "Personal Cost",
    categoryHi: "व्यक्तिगत नुकसान",
    en: "What do you feel porn is costing you in your life?",
    hi: "आपको क्या लगता है कि पोर्न आपकी ज़िंदगी से क्या छीन रहा है?",
    openAnswerEn: "Open answer: Please explain in your own words.",
    openAnswerHi: "खुला उत्तर: अपनी बात अपने शब्दों में लिखें।",
    options: [
      { id: "s1_q20_1", en: "Time", hi: "समय", weight: 2 },
      { id: "s1_q20_2", en: "Focus", hi: "ध्यान", weight: 3 },
      { id: "s1_q20_3", en: "Motivation", hi: "प्रेरणा", weight: 3 },
      { id: "s1_q20_4", en: "Confidence", hi: "आत्मविश्वास", weight: 3 },
      { id: "s1_q20_5", en: "Relationships", hi: "रिश्ते", weight: 3 },
      { id: "s1_q20_6", en: "Progress toward goals", hi: "लक्ष्यों की ओर प्रगति", weight: 3 },
      { id: "s1_q20_7", en: "Nothing noticeable", hi: "कुछ विशेष नहीं", weight: 0 },
      { id: "s1_q20_8", en: "Other", hi: "अन्य", weight: 1 },
    ],
  },
  {
    id: 21,
    sectionId: "s1",
    categoryEn: "Future Vision",
    categoryHi: "भविष्य की चाह",
    en: "If porn no longer controlled your choices, what kind of life would you want to build?",
    hi: "अगर पोर्न आपके फैसलों को नियंत्रित न करे, तो आप किस तरह की ज़िंदगी बनाना चाहेंगे?",
    openAnswerEn: "Open answer: What would you like to change first?",
    openAnswerHi: "खुला उत्तर: आप सबसे पहले क्या बदलना चाहेंगे?",
    options: [
      { id: "s1_q21_1", en: "Better studies or career", hi: "बेहतर पढ़ाई या करियर", weight: 1 },
      { id: "s1_q21_2", en: "More self-control", hi: "बेहतर आत्म-नियंत्रण", weight: 1 },
      { id: "s1_q21_3", en: "Healthy relationships", hi: "स्वस्थ रिश्ते", weight: 1 },
      { id: "s1_q21_4", en: "Better daily routine", hi: "बेहतर दिनचर्या", weight: 1 },
      { id: "s1_q21_5", en: "More confidence", hi: "अधिक आत्मविश्वास", weight: 1 },
      { id: "s1_q21_6", en: "Peace of mind", hi: "मानसिक शांति", weight: 1 },
      { id: "s1_q21_7", en: "Other", hi: "अन्य", weight: 1 },
    ],
  },
];

// ── SECTION 2: Masturbation Assessment (20 Questions) ─────────────────────────
export const SECTION_2_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 1,
    sectionId: "s2",
    categoryEn: "Onset Timeline",
    categoryHi: "शुरुआत का समय",
    en: "When did masturbation first become a part of your life?",
    hi: "हस्तमैथुन पहली बार आपकी ज़िंदगी का हिस्सा कब बना?",
    followUpEn: "Follow-up: How did you first discover it?",
    followUpHi: "आगे पूछें: आपको इसके बारे में पहली बार कैसे पता चला?",
    options: [
      { id: "s2_q1_1", en: "Childhood", hi: "बचपन में", weight: 3 },
      { id: "s2_q1_2", en: "Teenage years", hi: "किशोरावस्था में", weight: 2 },
      { id: "s2_q1_3", en: "Adulthood", hi: "वयस्क होने पर", weight: 1 },
      { id: "s2_q1_4", en: "I don't remember clearly", hi: "ठीक से याद नहीं", weight: 1 },
    ],
  },
  {
    id: 2,
    sectionId: "s2",
    categoryEn: "Onset Age",
    categoryHi: "शुरुआती उम्र",
    en: "How old were you when you first masturbated?",
    hi: "आपने पहली बार हस्तमैथुन किस उम्र में किया था?",
    options: [
      { id: "s2_q2_1", en: "Under 13", hi: "13 साल से कम", weight: 3 },
      { id: "s2_q2_2", en: "13–15 years", hi: "13–15 साल", weight: 2 },
      { id: "s2_q2_3", en: "16–18 years", hi: "16–18 साल", weight: 1 },
      { id: "s2_q2_4", en: "19–21 years", hi: "19–21 साल", weight: 1 },
      { id: "s2_q2_5", en: "Above 21", hi: "21 साल से अधिक", weight: 0 },
      { id: "s2_q2_6", en: "I don't remember", hi: "याद नहीं", weight: 1 },
    ],
  },
  {
    id: 3,
    sectionId: "s2",
    categoryEn: "Duration",
    categoryHi: "अवधि",
    en: "How long have you been masturbating?",
    hi: "आप कितने समय से हस्तमैथुन कर रहे हैं?",
    options: [
      { id: "s2_q3_1", en: "Less than 6 months", hi: "6 महीने से कम", weight: 1 },
      { id: "s2_q3_2", en: "6–12 months", hi: "6–12 महीने", weight: 2 },
      { id: "s2_q3_3", en: "1–3 years", hi: "1–3 साल", weight: 3 },
      { id: "s2_q3_4", en: "3–5 years", hi: "3–5 साल", weight: 4 },
      { id: "s2_q3_5", en: "More than 5 years", hi: "5 साल से अधिक", weight: 4 },
    ],
  },
  {
    id: 4,
    sectionId: "s2",
    categoryEn: "Initial Experience",
    categoryHi: "शुरुआती अनुभव",
    en: "What did you experience when you first started masturbating?",
    hi: "जब आपने पहली बार हस्तमैथुन शुरू किया, तब आपका अनुभव कैसा था?",
    options: [
      { id: "s2_q4_1", en: "Curiosity", hi: "जिज्ञासा", weight: 1 },
      { id: "s2_q4_2", en: "Sexual pleasure", hi: "यौन सुख", weight: 1 },
      { id: "s2_q4_3", en: "Excitement", hi: "उत्तेजना", weight: 1 },
      { id: "s2_q4_4", en: "Relaxation", hi: "आराम", weight: 1 },
      { id: "s2_q4_5", en: "Relief from stress", hi: "तनाव से राहत", weight: 2 },
      { id: "s2_q4_6", en: "I don't remember clearly", hi: "ठीक से याद नहीं", weight: 1 },
      { id: "s2_q4_7", en: "Other", hi: "अन्य", weight: 1 },
    ],
  },
  {
    id: 5,
    sectionId: "s2",
    categoryEn: "Frequency",
    categoryHi: "आवृत्ति",
    en: "How often do you currently masturbate?",
    hi: "आप वर्तमान में कितनी बार हस्तमैथुन करते हैं?",
    options: [
      { id: "s2_q5_1", en: "Rarely", hi: "कभी-कभी", weight: 1 },
      { id: "s2_q5_2", en: "1–2 times a week", hi: "सप्ताह में 1–2 बार", weight: 2 },
      { id: "s2_q5_3", en: "3–5 times a week", hi: "सप्ताह में 3–5 बार", weight: 3 },
      { id: "s2_q5_4", en: "Daily", hi: "रोज़", weight: 4 },
      { id: "s2_q5_5", en: "More than once a day", hi: "दिन में एक से अधिक बार", weight: 5 },
    ],
  },
  {
    id: 6,
    sectionId: "s2",
    categoryEn: "Time Investment",
    categoryHi: "लगा समय",
    en: "How long does masturbation usually take, including preparation and recovery time?",
    hi: "तैयारी और बाद के समय को मिलाकर, हस्तमैथुन में आमतौर पर कितना समय लगता है?",
    options: [
      { id: "s2_q6_1", en: "Less than 10 minutes", hi: "10 मिनट से कम", weight: 1 },
      { id: "s2_q6_2", en: "10–20 minutes", hi: "10–20 मिनट", weight: 2 },
      { id: "s2_q6_3", en: "20–30 minutes", hi: "20–30 मिनट", weight: 2 },
      { id: "s2_q6_4", en: "30–60 minutes", hi: "30–60 मिनट", weight: 3 },
      { id: "s2_q6_5", en: "More than 1 hour", hi: "1 घंटे से अधिक", weight: 4 },
      { id: "s2_q6_6", en: "It varies", hi: "समय अलग-अलग होता है", weight: 2 },
    ],
  },
  {
    id: 7,
    sectionId: "s2",
    categoryEn: "Triggers",
    categoryHi: "कारण व ट्रिगर्स",
    en: "What usually makes you want to masturbate?",
    hi: "आपको आमतौर पर हस्तमैथुन करने की इच्छा किस वजह से होती है?",
    options: [
      { id: "s2_q7_1", en: "Sexual desire", hi: "यौन इच्छा", weight: 1, triggerType: "desire" },
      { id: "s2_q7_2", en: "Boredom", hi: "बोरियत", weight: 2, triggerType: "boredom" },
      { id: "s2_q7_3", en: "Stress", hi: "तनाव", weight: 3, triggerType: "stress" },
      { id: "s2_q7_4", en: "Loneliness", hi: "अकेलापन", weight: 3, triggerType: "loneliness" },
      { id: "s2_q7_5", en: "Sadness", hi: "उदासी", weight: 3, triggerType: "sadness" },
      { id: "s2_q7_6", en: "Habit", hi: "आदत", weight: 3, triggerType: "habit" },
      { id: "s2_q7_7", en: "Difficulty sleeping", hi: "नींद आने में परेशानी", weight: 2, triggerType: "sleep" },
      { id: "s2_q7_8", en: "Other", hi: "अन्य", weight: 1, triggerType: "other" },
    ],
  },
  {
    id: 8,
    sectionId: "s2",
    categoryEn: "Arousal Stimulants",
    categoryHi: "उत्तेजना का स्रोत",
    en: "What usually helps you become sexually aroused before masturbation?",
    hi: "हस्तमैथुन से पहले आपको यौन उत्तेजना किस चीज़ से मिलती है?",
    options: [
      { id: "s2_q8_1", en: "Sexual thoughts or imagination", hi: "यौन विचार या कल्पना", weight: 1 },
      { id: "s2_q8_2", en: "Porn", hi: "पोर्न", weight: 3 },
      { id: "s2_q8_3", en: "Sexual images or videos", hi: "यौन तस्वीरें या वीडियो", weight: 2 },
      { id: "s2_q8_4", en: "Social media content", hi: "सोशल मीडिया सामग्री", weight: 2 },
      { id: "s2_q8_5", en: "Physical sensations", hi: "शारीरिक संवेदनाएँ", weight: 1 },
      { id: "s2_q8_6", en: "Other", hi: "अन्य", weight: 1 },
    ],
  },
  {
    id: 9,
    sectionId: "s2",
    categoryEn: "Impulsivity",
    categoryHi: "बिना योजना के आदत",
    en: "Do you sometimes masturbate without planning to?",
    hi: "क्या आप कभी बिना योजना बनाए हस्तमैथुन कर लेते हैं?",
    options: [
      { id: "s2_q9_1", en: "Never", hi: "कभी नहीं", weight: 0 },
      { id: "s2_q9_2", en: "Rarely", hi: "कभी-कभी", weight: 1 },
      { id: "s2_q9_3", en: "Sometimes", hi: "कभी-कभी", weight: 2 },
      { id: "s2_q9_4", en: "Often", hi: "अक्सर", weight: 3 },
      { id: "s2_q9_5", en: "Very often", hi: "बहुत बार", weight: 4 },
    ],
  },
  {
    id: 10,
    sectionId: "s2",
    categoryEn: "Peak Urge Times",
    categoryHi: "सबसे तेज़ इच्छा का समय",
    en: "When do you usually feel your strongest urge to masturbate?",
    hi: "आपको हस्तमैथुन करने की सबसे ज़्यादा इच्छा कब होती है?",
    options: [
      { id: "s2_q10_1", en: "At night", hi: "रात में", weight: 2 },
      { id: "s2_q10_2", en: "When I am alone", hi: "जब मैं अकेला होता हूँ", weight: 2 },
      { id: "s2_q10_3", en: "When I feel bored", hi: "जब मैं बोर होता हूँ", weight: 2 },
      { id: "s2_q10_4", en: "When I feel stressed", hi: "जब मैं तनाव में होता हूँ", weight: 3 },
      { id: "s2_q10_5", en: "After sexual thoughts", hi: "यौन विचार आने के बाद", weight: 2 },
      { id: "s2_q10_6", en: "Before sleeping", hi: "सोने से पहले", weight: 2 },
      { id: "s2_q10_7", en: "Other", hi: "अन्य", weight: 1 },
    ],
  },
  {
    id: 11,
    sectionId: "s2",
    categoryEn: "Emotional State",
    categoryHi: "शारीरिक व मानसिक भावना",
    en: "What do you usually feel before masturbating?",
    hi: "हस्तमैथुन करने से पहले आप आमतौर पर क्या महसूस करते हैं?",
    options: [
      { id: "s2_q11_1", en: "Sexual desire", hi: "यौन इच्छा", weight: 1 },
      { id: "s2_q11_2", en: "Stress", hi: "तनाव", weight: 3 },
      { id: "s2_q11_3", en: "Boredom", hi: "बोरियत", weight: 2 },
      { id: "s2_q11_4", en: "Loneliness", hi: "अकेलापन", weight: 3 },
      { id: "s2_q11_5", en: "Sadness", hi: "उदासी", weight: 3 },
      { id: "s2_q11_6", en: "Restlessness", hi: "बेचैनी", weight: 3 },
      { id: "s2_q11_7", en: "Nothing specific", hi: "कोई विशेष भावना नहीं", weight: 1 },
      { id: "s2_q11_8", en: "Other", hi: "अन्य", weight: 1 },
    ],
  },
  {
    id: 12,
    sectionId: "s2",
    categoryEn: "Mind Dialogue",
    categoryHi: "दिमाग का विचार",
    en: "When the urge comes, what does your mind usually tell you?",
    hi: "जब हस्तमैथुन करने की इच्छा होती है, तो आपका दिमाग आमतौर पर क्या कहता है?",
    options: [
      { id: "s2_q12_1", en: "“Just do it once.”", hi: "“बस एक बार कर लेता हूँ।”", weight: 2 },
      { id: "s2_q12_2", en: "“I need relief.”", hi: "“मुझे राहत चाहिए।”", weight: 3 },
      { id: "s2_q12_3", en: "“I can stop whenever I want.”", hi: "“जब चाहूँगा, रोक दूँगा।”", weight: 2 },
      { id: "s2_q12_4", en: "“I cannot control this urge.”", hi: "“मैं इस इच्छा को नियंत्रित नहीं कर सकता।”", weight: 4 },
      { id: "s2_q12_5", en: "Something else", hi: "कुछ और", weight: 2 },
    ],
  },
  {
    id: 13,
    sectionId: "s2",
    categoryEn: "Inner Resistance",
    categoryHi: "रुकने की चाह",
    en: "Is there another part of you that wants to stop or wait?",
    hi: "क्या आपके अंदर का कोई दूसरा हिस्सा रुकना या इंतज़ार करना चाहता है?",
    followUpEn: "Follow-up: What does that part of you say?",
    followUpHi: "आगे पूछें: आपके अंदर का वह हिस्सा क्या कहता है?",
    options: [
      { id: "s2_q13_1", en: "Yes", hi: "हाँ", weight: 3 },
      { id: "s2_q13_2", en: "No", hi: "नहीं", weight: 1 },
      { id: "s2_q13_3", en: "Sometimes", hi: "कभी-कभी", weight: 2 },
      { id: "s2_q13_4", en: "I am not sure", hi: "मुझे पक्का नहीं पता", weight: 2 },
    ],
  },
  {
    id: 14,
    sectionId: "s2",
    categoryEn: "Urge Tolerance",
    categoryHi: "इच्छा को रोकने में कठिनाई",
    en: "How difficult is it for you to wait or let the urge pass?",
    hi: "यौन इच्छा आने पर उसे रोकना या उसके कम होने का इंतज़ार करना कितना मुश्किल होता है?",
    options: [
      { id: "s2_q14_1", en: "Not difficult", hi: "बिल्कुल मुश्किल नहीं", weight: 0 },
      { id: "s2_q14_2", en: "Slightly difficult", hi: "थोड़ा मुश्किल", weight: 1 },
      { id: "s2_q14_3", en: "Moderately difficult", hi: "सामान्य रूप से मुश्किल", weight: 2 },
      { id: "s2_q14_4", en: "Very difficult", hi: "बहुत मुश्किल", weight: 3 },
      { id: "s2_q14_5", en: "Extremely difficult", hi: "बेहद मुश्किल", weight: 4 },
    ],
  },
  {
    id: 15,
    sectionId: "s2",
    categoryEn: "Loss of Control",
    categoryHi: "सीमा से अधिक होना",
    en: "Do you sometimes masturbate more often or for longer than you planned?",
    hi: "क्या आप कभी अपनी योजना से ज़्यादा बार या ज़्यादा समय तक हस्तमैथुन करते हैं?",
    options: [
      { id: "s2_q15_1", en: "Never", hi: "कभी नहीं", weight: 0 },
      { id: "s2_q15_2", en: "Rarely", hi: "कभी-कभी", weight: 1 },
      { id: "s2_q15_3", en: "Sometimes", hi: "कभी-कभी", weight: 2 },
      { id: "s2_q15_4", en: "Often", hi: "अक्सर", weight: 3 },
      { id: "s2_q15_5", en: "Very often", hi: "बहुत बार", weight: 4 },
    ],
  },
  {
    id: 16,
    sectionId: "s2",
    categoryEn: "Attempts to Stop",
    categoryHi: "कम करने की कोशिश",
    en: "Have you tried to stop or reduce masturbation?",
    hi: "क्या आपने हस्तमैथुन छोड़ने या कम करने की कोशिश की है?",
    options: [
      { id: "s2_q16_1", en: "Never", hi: "कभी नहीं", weight: 0 },
      { id: "s2_q16_2", en: "Once", hi: "एक बार", weight: 1 },
      { id: "s2_q16_3", en: "A few times", hi: "कुछ बार", weight: 2 },
      { id: "s2_q16_4", en: "Many times", hi: "कई बार", weight: 4 },
    ],
  },
  {
    id: 17,
    sectionId: "s2",
    categoryEn: "Relapse Reasons",
    categoryHi: "दोबारा करने के कारण",
    en: "After trying to stop, what usually makes you masturbate again?",
    hi: "हस्तमैथुन छोड़ने की कोशिश के बाद आप दोबारा क्यों करने लगते हैं?",
    options: [
      { id: "s2_q17_1", en: "Sexual urge", hi: "यौन इच्छा", weight: 2 },
      { id: "s2_q17_2", en: "Boredom", hi: "बोरियत", weight: 2 },
      { id: "s2_q17_3", en: "Stress", hi: "तनाव", weight: 3 },
      { id: "s2_q17_4", en: "Loneliness", hi: "अकेलापन", weight: 3 },
      { id: "s2_q17_5", en: "Habit", hi: "आदत", weight: 3 },
      { id: "s2_q17_6", en: "Sexual thoughts", hi: "यौन विचार", weight: 2 },
      { id: "s2_q17_7", en: "Difficulty controlling myself", hi: "खुद को नियंत्रित करने में कठिनाई", weight: 4 },
      { id: "s2_q17_8", en: "Other", hi: "अन्य", weight: 1 },
    ],
  },
  {
    id: 18,
    sectionId: "s2",
    categoryEn: "Post-Experience Feeling",
    categoryHi: "बाद की भावना",
    en: "How do you usually feel after masturbating?",
    hi: "हस्तमैथुन करने के बाद आप आमतौर पर कैसा महसूस करते हैं?",
    options: [
      { id: "s2_q18_1", en: "Relaxed", hi: "आराम", weight: 1 },
      { id: "s2_q18_2", en: "Pleasure or satisfaction", hi: "सुख या संतुष्टि", weight: 1 },
      { id: "s2_q18_3", en: "Neutral", hi: "सामान्य", weight: 1 },
      { id: "s2_q18_4", en: "Guilty", hi: "अपराधबोध", weight: 3, impactType: "guilt" },
      { id: "s2_q18_5", en: "Ashamed", hi: "शर्म", weight: 3, impactType: "shame" },
      { id: "s2_q18_6", en: "Sad", hi: "उदासी", weight: 3, impactType: "sad" },
      { id: "s2_q18_7", en: "Disappointed", hi: "निराशा", weight: 3, impactType: "disappointed" },
      { id: "s2_q18_8", en: "Stressed", hi: "तनाव", weight: 3, impactType: "stress" },
      { id: "s2_q18_9", en: "Other", hi: "अन्य", weight: 1 },
    ],
  },
  {
    id: 19,
    sectionId: "s2",
    categoryEn: "Life Impact",
    categoryHi: "दिनचर्या व जीवन पर प्रभाव",
    en: "Has masturbation affected your time, focus, routine or important areas of life?",
    hi: "क्या हस्तमैथुन ने आपके समय, ध्यान, दिनचर्या या ज़िंदगी के ज़रूरी हिस्सों को प्रभावित किया है?",
    options: [
      { id: "s2_q19_1", en: "No noticeable effect", hi: "कोई स्पष्ट प्रभाव नहीं", weight: 0 },
      { id: "s2_q19_2", en: "Sleep", hi: "नींद", weight: 2 },
      { id: "s2_q19_3", en: "Studies or career", hi: "पढ़ाई या करियर", weight: 3 },
      { id: "s2_q19_4", en: "Time and focus", hi: "समय और ध्यान", weight: 3 },
      { id: "s2_q19_5", en: "Family or relationships", hi: "परिवार या रिश्ते", weight: 3 },
      { id: "s2_q19_6", en: "Social life", hi: "सामाजिक जीवन", weight: 2 },
      { id: "s2_q19_7", en: "Emotional well-being", hi: "भावनात्मक स्थिति", weight: 3 },
      { id: "s2_q19_8", en: "More than one area", hi: "एक से अधिक क्षेत्र", weight: 4 },
    ],
  },
  {
    id: 20,
    sectionId: "s2",
    categoryEn: "Change Priority",
    categoryHi: "बदलाव की प्राथमिकता",
    en: "If you could change one thing about your masturbation habit, what would you change first?",
    hi: "अगर आप अपनी हस्तमैथुन की आदत में एक चीज़ बदल सकते हैं, तो सबसे पहले क्या बदलना चाहेंगे?",
    openAnswerEn: "Open answer: What would you like to change first, and why?",
    openAnswerHi: "खुला उत्तर: आप सबसे पहले क्या बदलना चाहेंगे और क्यों?",
    options: [
      { id: "s2_q20_1", en: "Reduce how often I masturbate", hi: "हस्तमैथुन की संख्या कम करना", weight: 1 },
      { id: "s2_q20_2", en: "Control my urges", hi: "अपनी इच्छाओं को नियंत्रित करना", weight: 1 },
      { id: "s2_q20_3", en: "Stop doing it without planning", hi: "बिना योजना के करना बंद करना", weight: 1 },
      { id: "s2_q20_4", en: "Understand my triggers", hi: "अपने ट्रिगर को समझना", weight: 1 },
      { id: "s2_q20_5", en: "Change the effect on my daily life", hi: "रोज़मर्रा की ज़िंदगी पर प्रभाव बदलना", weight: 1 },
      { id: "s2_q20_6", en: "I am not sure yet", hi: "अभी पक्का नहीं पता", weight: 1 },
      { id: "s2_q20_7", en: "Other", hi: "अन्य", weight: 1 },
    ],
  },
];

// ── SECTION 3: Both Porn & Masturbation Assessment (25 Questions) ─────────────
export const SECTION_3_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 1,
    sectionId: "s3",
    categoryEn: "Onset Timeline",
    categoryHi: "आदत की शुरुआत",
    en: "When did porn and masturbation first become part of your life?",
    hi: "आपकी ज़िंदगी में पोर्न और हस्तमैथुन की आदत पहली बार कब शुरू हुई?",
    options: [
      { id: "s3_q1_1", en: "Before age 13", hi: "13 साल से पहले", weight: 3 },
      { id: "s3_q1_2", en: "13–15 years", hi: "13–15 साल", weight: 2 },
      { id: "s3_q1_3", en: "16–18 years", hi: "16–18 साल", weight: 1 },
      { id: "s3_q1_4", en: "19–22 years", hi: "19–22 साल", weight: 1 },
      { id: "s3_q1_5", en: "After 22", hi: "22 साल के बाद", weight: 0 },
      { id: "s3_q1_6", en: "Not sure", hi: "पता नहीं", weight: 1 },
    ],
  },
  {
    id: 2,
    sectionId: "s3",
    categoryEn: "Pattern Duration",
    categoryHi: "पैटर्न की अवधि",
    en: "How long have you been following your current porn and masturbation pattern?",
    hi: "आप कितने समय से पोर्न और हस्तमैथुन के इस मौजूदा पैटर्न को फॉलो कर रहे हैं?",
    options: [
      { id: "s3_q2_1", en: "Less than 3 months", hi: "3 महीने से कम", weight: 1 },
      { id: "s3_q2_2", en: "3–6 months", hi: "3–6 महीने", weight: 2 },
      { id: "s3_q2_3", en: "6–12 months", hi: "6–12 महीने", weight: 2 },
      { id: "s3_q2_4", en: "1–3 years", hi: "1–3 साल", weight: 3 },
      { id: "s3_q2_5", en: "More than 3 years", hi: "3 साल से ज़्यादा", weight: 4 },
    ],
  },
  {
    id: 3,
    sectionId: "s3",
    categoryEn: "Current Frequency",
    categoryHi: "वर्तमान आवृत्ति",
    en: "How often do you currently watch porn and masturbate?",
    hi: "आप वर्तमान में कितनी बार पोर्न देखते हैं और हस्तमैथुन करते हैं?",
    options: [
      { id: "s3_q3_1", en: "Rarely", hi: "कभी-कभी", weight: 1 },
      { id: "s3_q3_2", en: "1–2 times a week", hi: "सप्ताह में 1–2 बार", weight: 2 },
      { id: "s3_q3_3", en: "3–5 times a week", hi: "सप्ताह में 3–5 बार", weight: 3 },
      { id: "s3_q3_4", en: "Almost daily", hi: "लगभग रोज़", weight: 4 },
      { id: "s3_q3_5", en: "More than once a day", hi: "दिन में एक से ज़्यादा बार", weight: 5 },
      { id: "s3_q3_6", en: "It changes a lot", hi: "कभी कम, कभी ज़्यादा", weight: 3 },
    ],
  },
  {
    id: 4,
    sectionId: "s3",
    categoryEn: "Habit Sequence",
    categoryHi: "शुरुआती अनुक्रम",
    en: "In your usual pattern, what generally happens first?",
    hi: "आपकी सामान्य आदत में आमतौर पर सबसे पहले क्या होता है?",
    options: [
      { id: "s3_q4_1", en: "Sexual urge comes first", hi: "पहले सेक्सुअल इच्छा होती है", weight: 1 },
      { id: "s3_q4_2", en: "I watch porn first", hi: "पहले पोर्न देखता हूँ", weight: 3 },
      { id: "s3_q4_3", en: "I start masturbating first", hi: "पहले हस्तमैथुन शुरू करता हूँ", weight: 2 },
      { id: "s3_q4_4", en: "Boredom or emotions come first", hi: "पहले बोरियत या भावनाएँ आती हैं", weight: 3 },
      { id: "s3_q4_5", en: "It changes depending on the situation", hi: "परिस्थिति के अनुसार बदलता है", weight: 2 },
    ],
  },
  {
    id: 5,
    sectionId: "s3",
    categoryEn: "Loop Connection",
    categoryHi: "आपसी जुड़ाव",
    en: "How closely are porn and masturbation connected in your current habit?",
    hi: "आपकी वर्तमान आदत में पोर्न और हस्तमैथुन एक-दूसरे से कितने जुड़े हुए हैं?",
    options: [
      { id: "s3_q5_1", en: "I usually watch porn and masturbate together", hi: "आमतौर पर दोनों साथ होते हैं", weight: 4 },
      { id: "s3_q5_2", en: "I often watch porn to masturbate", hi: "अक्सर हस्तमैथुन करने के लिए पोर्न देखता हूँ", weight: 3 },
      { id: "s3_q5_3", en: "Sometimes they happen together", hi: "कभी-कभी दोनों साथ होते हैं", weight: 2 },
      { id: "s3_q5_4", en: "I can masturbate without porn", hi: "बिना पोर्न के हस्तमैथुन कर सकता हूँ", weight: 1 },
      { id: "s3_q5_5", en: "They are mostly separate", hi: "दोनों ज़्यादातर अलग-अलग होते हैं", weight: 1 },
    ],
  },
  {
    id: 6,
    sectionId: "s3",
    categoryEn: "Primary Triggers",
    categoryHi: "शुरुआत के कारण",
    en: "What usually makes you start watching porn or masturbating?",
    hi: "आपको आमतौर पर पोर्न देखने या हस्तमैथुन शुरू करने की इच्छा किस वजह से होती है?",
    options: [
      { id: "s3_q6_1", en: "Sexual desire", hi: "सेक्सुअल इच्छा", weight: 1, triggerType: "desire" },
      { id: "s3_q6_2", en: "Boredom", hi: "बोरियत", weight: 2, triggerType: "boredom" },
      { id: "s3_q6_3", en: "Stress or tension", hi: "तनाव", weight: 3, triggerType: "stress" },
      { id: "s3_q6_4", en: "Loneliness", hi: "अकेलापन", weight: 3, triggerType: "loneliness" },
      { id: "s3_q6_5", en: "Sadness or low mood", hi: "उदासी या खराब मूड", weight: 3, triggerType: "sadness" },
      { id: "s3_q6_6", en: "Habit or automatic behaviour", hi: "आदत या बिना सोचे किया गया व्यवहार", weight: 3, triggerType: "habit" },
      { id: "s3_q6_7", en: "Other reason", hi: "कोई दूसरी वजह", weight: 1, triggerType: "other" },
    ],
  },
  {
    id: 7,
    sectionId: "s3",
    categoryEn: "Emotional Coping",
    categoryHi: "असहज भावनाओं से निपटना",
    en: "How often do you use porn or masturbation to deal with uncomfortable feelings?",
    hi: "आप कितनी बार असहज भावनाओं से निपटने के लिए पोर्न या हस्तमैथुन का इस्तेमाल करते हैं?",
    options: [
      { id: "s3_q7_1", en: "Never", hi: "कभी नहीं", weight: 0 },
      { id: "s3_q7_2", en: "Rarely", hi: "बहुत कम", weight: 1 },
      { id: "s3_q7_3", en: "Sometimes", hi: "कभी-कभी", weight: 2 },
      { id: "s3_q7_4", en: "Often", hi: "अक्सर", weight: 3 },
      { id: "s3_q7_5", en: "Almost always", hi: "लगभग हमेशा", weight: 4 },
    ],
  },
  {
    id: 8,
    sectionId: "s3",
    categoryEn: "Peak Urge Moments",
    categoryHi: "सबसे तेज़ इच्छा का समय",
    en: "When do you usually experience your strongest urges?",
    hi: "आपको पोर्न या हस्तमैथुन की सबसे तेज़ इच्छा आमतौर पर कब होती है?",
    options: [
      { id: "s3_q8_1", en: "At night or before sleeping", hi: "रात या सोने से पहले", weight: 2 },
      { id: "s3_q8_2", en: "When I am alone", hi: "जब मैं अकेला होता हूँ", weight: 2 },
      { id: "s3_q8_3", en: "While using my phone", hi: "फोन चलाते समय", weight: 2 },
      { id: "s3_q8_4", en: "During stress or sadness", hi: "तनाव या उदासी में", weight: 3 },
      { id: "s3_q8_5", en: "After seeing sexual content", hi: "सेक्सुअल कंटेंट देखने के बाद", weight: 3 },
      { id: "s3_q8_6", en: "At different times", hi: "अलग-अलग समय", weight: 2 },
    ],
  },
  {
    id: 9,
    sectionId: "s3",
    categoryEn: "Impulsivity",
    categoryHi: "बिना योजना के शुरुआत",
    en: "How often do you begin watching porn or masturbating without planning to do it?",
    hi: "आप कितनी बार बिना पहले से प्लान किए पोर्न देखना या हस्तमैथुन करना शुरू कर देते हैं?",
    options: [
      { id: "s3_q9_1", en: "Never", hi: "कभी नहीं", weight: 0 },
      { id: "s3_q9_2", en: "Rarely", hi: "बहुत कम", weight: 1 },
      { id: "s3_q9_3", en: "Sometimes", hi: "कभी-कभी", weight: 2 },
      { id: "s3_q9_4", en: "Often", hi: "अक्सर", weight: 3 },
      { id: "s3_q9_5", en: "Almost always", hi: "लगभग हमेशा", weight: 4 },
    ],
  },
  {
    id: 10,
    sectionId: "s3",
    categoryEn: "Urge Action",
    categoryHi: "इच्छा होने पर कदम",
    en: "What do you usually do when a strong urge appears?",
    hi: "जब पोर्न या हस्तमैथुन की तेज़ इच्छा होती है, तो आप आमतौर पर क्या करते हैं?",
    options: [
      { id: "s3_q10_1", en: "I act on the urge immediately", hi: "तुरंत कर लेता हूँ", weight: 4 },
      { id: "s3_q10_2", en: "I try to resist but often give in", hi: "रोकने की कोशिश करता हूँ, लेकिन अक्सर कर लेता हूँ", weight: 3 },
      { id: "s3_q10_3", en: "I wait and try to distract myself", hi: "रुककर अपना ध्यान दूसरी तरफ लगाता हूँ", weight: 1 },
      { id: "s3_q10_4", en: "I leave the situation or put away my phone", hi: "जगह छोड़ देता हूँ या फोन दूर रख देता हूँ", weight: 1 },
      { id: "s3_q10_5", en: "It depends on the situation", hi: "परिस्थिति पर निर्भर करता है", weight: 2 },
    ],
  },
  {
    id: 11,
    sectionId: "s3",
    categoryEn: "Stopping Difficulty",
    categoryHi: "रुकने में कठिनाई",
    en: "Once you start watching porn, how difficult is it to stop before masturbating?",
    hi: "पोर्न देखना शुरू करने के बाद, हस्तमैथुन करने से पहले रुकना आपके लिए कितना मुश्किल होता है?",
    options: [
      { id: "s3_q11_1", en: "Not difficult", hi: "मुश्किल नहीं", weight: 0 },
      { id: "s3_q11_2", en: "Slightly difficult", hi: "थोड़ी मुश्किल", weight: 1 },
      { id: "s3_q11_3", en: "Moderately difficult", hi: "सामान्य से ज़्यादा मुश्किल", weight: 2 },
      { id: "s3_q11_4", en: "Very difficult", hi: "बहुत मुश्किल", weight: 3 },
      { id: "s3_q11_5", en: "I usually cannot stop", hi: "आमतौर पर रुक नहीं पाता", weight: 4 },
    ],
  },
  {
    id: 12,
    sectionId: "s3",
    categoryEn: "Time Distortion",
    categoryHi: "योजना से अधिक समय",
    en: "How often do you continue watching porn or masturbating for longer than you originally planned?",
    hi: "आप कितनी बार अपने प्लान किए हुए समय से ज़्यादा देर तक पोर्न देखते या हस्तमैथुन करते हैं?",
    options: [
      { id: "s3_q12_1", en: "Never", hi: "कभी नहीं", weight: 0 },
      { id: "s3_q12_2", en: "Rarely", hi: "बहुत कम", weight: 1 },
      { id: "s3_q12_3", en: "Sometimes", hi: "कभी-कभी", weight: 2 },
      { id: "s3_q12_4", en: "Often", hi: "अक्सर", weight: 3 },
      { id: "s3_q12_5", en: "Almost always", hi: "लगभग हमेशा", weight: 4 },
    ],
  },
  {
    id: 13,
    sectionId: "s3",
    categoryEn: "Content Escalation",
    categoryHi: "लगातार खोज",
    en: "How often do you continue searching for more sexual content after you have already started?",
    hi: "शुरू करने के बाद आप कितनी बार और ज़्यादा या अलग सेक्सुअल कंटेंट खोजते रहते हैं?",
    options: [
      { id: "s3_q13_1", en: "Never", hi: "कभी नहीं", weight: 0 },
      { id: "s3_q13_2", en: "Rarely", hi: "बहुत कम", weight: 1 },
      { id: "s3_q13_3", en: "Sometimes", hi: "कभी-कभी", weight: 2 },
      { id: "s3_q13_4", en: "Often", hi: "अक्सर", weight: 3 },
      { id: "s3_q13_5", en: "Almost always", hi: "लगभग हमेशा", weight: 4 },
    ],
  },
  {
    id: 14,
    sectionId: "s3",
    categoryEn: "Recovery Attempts",
    categoryHi: "फैसले के बाद का अनुभव",
    en: "When you decide to stop or reduce porn and masturbation, what usually happens?",
    hi: "जब आप पोर्न और हस्तमैथुन को रोकने या कम करने का फैसला करते हैं, तो आमतौर पर क्या होता है?",
    options: [
      { id: "s3_q14_1", en: "I follow my decision", hi: "मैं अपना फैसला निभाता हूँ", weight: 0 },
      { id: "s3_q14_2", en: "I struggle but continue trying", hi: "मुश्किल होती है, लेकिन कोशिश जारी रखता हूँ", weight: 2 },
      { id: "s3_q14_3", en: "I return after a few days", hi: "कुछ दिनों बाद दोबारा शुरू कर देता हूँ", weight: 3 },
      { id: "s3_q14_4", en: "I return after a few weeks or months", hi: "कुछ हफ्तों या महीनों बाद वापस शुरू करता हूँ", weight: 2 },
      { id: "s3_q14_5", en: "I cannot maintain the decision", hi: "अपना फैसला कायम नहीं रख पाता", weight: 4 },
    ],
  },
  {
    id: 15,
    sectionId: "s3",
    categoryEn: "Relapse Reasons",
    categoryHi: "दोबारा लौटने का मुख्य कारण",
    en: "What is the main reason you return to porn or masturbation after trying to stop?",
    hi: "रोकने की कोशिश के बाद आप दोबारा पोर्न या हस्तमैथुन की ओर लौटने का मुख्य कारण क्या मानते हैं?",
    options: [
      { id: "s3_q15_1", en: "Strong sexual urges", hi: "तेज़ सेक्सुअल इच्छा", weight: 2 },
      { id: "s3_q15_2", en: "Stress or emotional discomfort", hi: "तनाव या भावनात्मक परेशानी", weight: 3 },
      { id: "s3_q15_3", en: "Boredom or loneliness", hi: "बोरियत या अकेलापन", weight: 3 },
      { id: "s3_q15_4", en: "Seeing sexual content or using the phone", hi: "सेक्सुअल कंटेंट या फोन का इस्तेमाल", weight: 3 },
      { id: "s3_q15_5", en: "Habit and lack of a clear plan", hi: "आदत और स्पष्ट प्लान की कमी", weight: 3 },
      { id: "s3_q15_6", en: "Other reason", hi: "कोई दूसरी वजह", weight: 1 },
    ],
  },
  {
    id: 16,
    sectionId: "s3",
    categoryEn: "Immediate Pre-Feelings",
    categoryHi: "शुरू करने से ठीक पहले की भावना",
    en: "What do you usually feel immediately before watching porn or masturbating?",
    hi: "पोर्न देखने या हस्तमैथुन करने से ठीक पहले आप आमतौर पर क्या महसूस करते हैं?",
    options: [
      { id: "s3_q16_1", en: "Sexual excitement", hi: "सेक्सुअल उत्तेजना", weight: 1 },
      { id: "s3_q16_2", en: "Stress or restlessness", hi: "तनाव या बेचैनी", weight: 3 },
      { id: "s3_q16_3", en: "Boredom", hi: "बोरियत", weight: 2 },
      { id: "s3_q16_4", en: "Loneliness", hi: "अकेलापन", weight: 3 },
      { id: "s3_q16_5", en: "Sadness or frustration", hi: "उदासी या निराशा", weight: 3 },
      { id: "s3_q16_6", en: "Nothing particular", hi: "कोई खास भावना नहीं", weight: 1 },
    ],
  },
  {
    id: 17,
    sectionId: "s3",
    categoryEn: "Post-Feelings",
    categoryHi: "बाद की भावना",
    en: "After watching porn or masturbating, how do you usually feel?",
    hi: "पोर्न देखने या हस्तमैथुन करने के बाद आप आमतौर पर कैसा महसूस करते हैं?",
    options: [
      { id: "s3_q17_1", en: "Relaxed or satisfied", hi: "शांत या संतुष्ट", weight: 1 },
      { id: "s3_q17_2", en: "Normal, without much feeling", hi: "सामान्य", weight: 1 },
      { id: "s3_q17_3", en: "Guilty or ashamed", hi: "अपराधबोध या शर्म", weight: 3, impactType: "guilt" },
      { id: "s3_q17_4", en: "Sad or disappointed", hi: "उदास या निराश", weight: 3, impactType: "disappointed" },
      { id: "s3_q17_5", en: "Mentally disturbed or stressed", hi: "मानसिक रूप से परेशान या तनाव में", weight: 4, impactType: "stress" },
      { id: "s3_q17_6", en: "Different feelings at different times", hi: "अलग-अलग समय पर अलग भावनाएँ", weight: 2 },
    ],
  },
  {
    id: 18,
    sectionId: "s3",
    categoryEn: "Value Alignment",
    categoryHi: "लक्ष्यों से भटकाव",
    en: "How often do you feel that your actions do not match what you actually want for yourself?",
    hi: "आपको कितनी बार लगता है कि आपका व्यवहार आपकी असली इच्छा या आपके जीवन के लक्ष्यों के अनुसार नहीं है?",
    options: [
      { id: "s3_q18_1", en: "Never", hi: "कभी नहीं", weight: 0 },
      { id: "s3_q18_2", en: "Rarely", hi: "बहुत कम", weight: 1 },
      { id: "s3_q18_3", en: "Sometimes", hi: "कभी-कभी", weight: 2 },
      { id: "s3_q18_4", en: "Often", hi: "अक्सर", weight: 3 },
      { id: "s3_q18_5", en: "Almost always", hi: "लगभग हमेशा", weight: 4 },
    ],
  },
  {
    id: 19,
    sectionId: "s3",
    categoryEn: "Responsibility Impact",
    categoryHi: "ज़िम्मेदारियों पर प्रभाव",
    en: "Has your porn and masturbation habit affected your time, focus, or daily responsibilities?",
    hi: "क्या आपकी पोर्न और हस्तमैथुन की आदत ने आपके समय, ध्यान या रोज़मर्रा की ज़िम्मेदारियों को प्रभावित किया है?",
    options: [
      { id: "s3_q19_1", en: "Not at all", hi: "बिल्कुल नहीं", weight: 0 },
      { id: "s3_q19_2", en: "A little", hi: "थोड़ा", weight: 1 },
      { id: "s3_q19_3", en: "Sometimes", hi: "कभी-कभी", weight: 2 },
      { id: "s3_q19_4", en: "Often", hi: "अक्सर", weight: 3 },
      { id: "s3_q19_5", en: "A lot", hi: "बहुत ज़्यादा", weight: 4 },
    ],
  },
  {
    id: 20,
    sectionId: "s3",
    categoryEn: "Area Most Affected",
    categoryHi: "सबसे ज़्यादा प्रभावित क्षेत्र",
    en: "Which part of your life do you feel is most affected by this habit?",
    hi: "आपको लगता है कि इस आदत से आपकी ज़िंदगी का कौन-सा हिस्सा सबसे ज़्यादा प्रभावित हुआ है?",
    options: [
      { id: "s3_q20_1", en: "Studies or career", hi: "पढ़ाई या करियर", weight: 3, impactType: "career" },
      { id: "s3_q20_2", en: "Work and productivity", hi: "काम और प्रोडक्टिविटी", weight: 3, impactType: "productivity" },
      { id: "s3_q20_3", en: "Sleep and daily routine", hi: "नींद और दिनचर्या", weight: 2, impactType: "sleep" },
      { id: "s3_q20_4", en: "Mental peace or emotions", hi: "मानसिक शांति या भावनाएँ", weight: 3, impactType: "emotional" },
      { id: "s3_q20_5", en: "Relationships or family life", hi: "रिश्ते या परिवार", weight: 3, impactType: "relationship" },
      { id: "s3_q20_6", en: "Personal goals and self-confidence", hi: "व्यक्तिगत लक्ष्य और आत्मविश्वास", weight: 3, impactType: "confidence" },
      { id: "s3_q20_7", en: "I do not notice any major effect", hi: "कोई बड़ा प्रभाव महसूस नहीं होता", weight: 0, impactType: "none" },
    ],
  },
  {
    id: 21,
    sectionId: "s3",
    categoryEn: "Procrastination",
    categoryHi: "काम टालना",
    en: "How often do you postpone important work because of porn or masturbation?",
    hi: "आप पोर्न या हस्तमैथुन की वजह से कितनी बार ज़रूरी काम को टाल देते हैं?",
    options: [
      { id: "s3_q21_1", en: "Never", hi: "कभी नहीं", weight: 0 },
      { id: "s3_q21_2", en: "Rarely", hi: "बहुत कम", weight: 1 },
      { id: "s3_q21_3", en: "Sometimes", hi: "कभी-कभी", weight: 2 },
      { id: "s3_q21_4", en: "Often", hi: "अक्सर", weight: 3 },
      { id: "s3_q21_5", en: "Almost always", hi: "लगभग हमेशा", weight: 4 },
    ],
  },
  {
    id: 22,
    sectionId: "s3",
    categoryEn: "Routine Disruption",
    categoryHi: "दिनचर्या में परेशानी",
    en: "Have you experienced any difficulty maintaining your normal routine because of this habit?",
    hi: "क्या इस आदत की वजह से आपको अपनी सामान्य दिनचर्या बनाए रखने में परेशानी हुई है?",
    options: [
      { id: "s3_q22_1", en: "No difficulty", hi: "कोई परेशानी नहीं", weight: 0 },
      { id: "s3_q22_2", en: "Slight difficulty", hi: "थोड़ी परेशानी", weight: 1 },
      { id: "s3_q22_3", en: "Sometimes difficult", hi: "कभी-कभी परेशानी", weight: 2 },
      { id: "s3_q22_4", en: "Often difficult", hi: "अक्सर परेशानी", weight: 3 },
      { id: "s3_q22_5", en: "Very difficult", hi: "बहुत ज़्यादा परेशानी", weight: 4 },
    ],
  },
  {
    id: 23,
    sectionId: "s3",
    categoryEn: "Primary Concern",
    categoryHi: "सबसे बड़ी चिंता",
    en: "What is your biggest concern about your porn and masturbation habit right now?",
    hi: "अभी आपकी पोर्न और हस्तमैथुन की आदत को लेकर सबसे बड़ी चिंता क्या है?",
    options: [
      { id: "s3_q23_1", en: "I feel I cannot control it", hi: "मुझे लगता है कि मैं इसे कंट्रोल नहीं कर पाता", weight: 4 },
      { id: "s3_q23_2", en: "It takes too much time", hi: "इसमें बहुत समय चला जाता है", weight: 3 },
      { id: "s3_q23_3", en: "It affects my goals or work", hi: "यह मेरे लक्ष्यों या काम को प्रभावित करती है", weight: 3 },
      { id: "s3_q23_4", en: "I feel guilty or mentally disturbed", hi: "मुझे अपराधबोध या मानसिक परेशानी होती है", weight: 3 },
      { id: "s3_q23_5", en: "I want to stop the connection between porn and masturbation", hi: "मैं पोर्न और हस्तमैथुन का कनेक्शन रोकना चाहता हूँ", weight: 3 },
      { id: "s3_q23_6", en: "I want to understand my habit better", hi: "मैं अपनी आदत को बेहतर समझना चाहता हूँ", weight: 2 },
    ],
  },
  {
    id: 24,
    sectionId: "s3",
    categoryEn: "Previous Methods",
    categoryHi: "अब तक की कोशिशें",
    en: "What have you already tried to change this habit?",
    hi: "इस आदत को बदलने के लिए आपने अब तक क्या कोशिश की है?",
    options: [
      { id: "s3_q24_1", en: "Nothing yet", hi: "अभी तक कुछ नहीं", weight: 1 },
      { id: "s3_q24_2", en: "Tried to stop suddenly", hi: "अचानक पूरी तरह रोकने की कोशिश", weight: 2 },
      { id: "s3_q24_3", en: "Tried to reduce frequency", hi: "बार-बार होने वाली आदत कम करने की कोशिश", weight: 2 },
      { id: "s3_q24_4", en: "Avoided triggers or sexual content", hi: "ट्रिगर या सेक्सुअल कंटेंट से बचने की कोशिश", weight: 2 },
      { id: "s3_q24_5", en: "Used a routine, activity, or distraction", hi: "दिनचर्या, गतिविधि या ध्यान भटकाने का इस्तेमाल", weight: 2 },
      { id: "s3_q24_6", en: "Tried multiple methods", hi: "कई तरीकों की कोशिश की", weight: 3 },
    ],
  },
  {
    id: 25,
    sectionId: "s3",
    categoryEn: "Desired Improvement",
    categoryHi: "सुधार की इच्छा",
    en: "If this habit became manageable, what would you most want to improve in your life?",
    hi: "अगर आप इस आदत को कंट्रोल करना सीख जाएँ, तो अपनी ज़िंदगी में सबसे पहले क्या सुधारना चाहेंगे?",
    options: [
      { id: "s3_q25_1", en: "Better focus and productivity", hi: "बेहतर ध्यान और काम करने की क्षमता", weight: 1 },
      { id: "s3_q25_2", en: "Studies or career", hi: "पढ़ाई या करियर", weight: 1 },
      { id: "s3_q25_3", en: "Sleep and daily routine", hi: "नींद और दिनचर्या", weight: 1 },
      { id: "s3_q25_4", en: "Self-confidence and peace of mind", hi: "आत्मविश्वास और मानसिक शांति", weight: 1 },
      { id: "s3_q25_5", en: "Relationships and family life", hi: "रिश्ते और परिवार", weight: 1 },
      { id: "s3_q25_6", en: "Control over porn and masturbation", hi: "पोर्न और हस्तमैथुन पर नियंत्रण", weight: 1 },
      { id: "s3_q25_7", en: "Other personal goal", hi: "कोई दूसरा व्यक्तिगत लक्ष्य", weight: 1 },
    ],
  },
];

// ── Result Analysis Types & Evaluator ──────────────────────────────────────────
export interface AssessmentResultAnalysis {
  sectionTitleEn: string;
  sectionTitleHi: string;
  controlDifficulty: {
    score: number;
    level: string;
    levelHi: string;
    descEn: string;
    descHi: string;
    signalsEn: string[];
    signalsHi: string[];
    keySignalsEn: string[];
    keySignalsHi: string[];
  };
  habitPattern: {
    patternTypeEn: string;
    patternTypeHi: string;
    primaryTriggerEn: string;
    primaryTriggerHi: string;
    routineContextEn: string;
    routineContextHi: string;
    analysisEn: string;
    analysisHi: string;
  };
  lifeImpact: {
    severity: string;
    severityHi: string;
    affectedAreasEn: string[];
    affectedAreasHi: string[];
    emotionalTollEn: string;
    emotionalTollHi: string;
    analysisEn: string;
    analysisHi: string;
  };
  userMainConcern: {
    chosenGoalEn: string;
    chosenGoalHi: string;
    recommendedFirstStepEn: string;
    recommendedFirstStepHi: string;
  };
}

export function evaluateAssessmentResults(
  sectionId: "s1" | "s2" | "s3",
  answers: Record<number, string>
): AssessmentResultAnalysis {
  const questions =
    sectionId === "s1"
      ? SECTION_1_QUESTIONS
      : sectionId === "s2"
      ? SECTION_2_QUESTIONS
      : SECTION_3_QUESTIONS;

  const sectionTitleEn =
    sectionId === "s1"
      ? "Porn Assessment"
      : sectionId === "s2"
      ? "Masturbation Assessment"
      : "Porn & Masturbation Dual Assessment";

  const sectionTitleHi =
    sectionId === "s1"
      ? "पोर्न मूल्यांकन"
      : sectionId === "s2"
      ? "हस्तमैथुन मूल्यांकन"
      : "पोर्न व हस्तमैथुन संयुक्त मूल्यांकन";

  const getSelectedOption = (qNum: number): AssessmentOption | undefined => {
    const q = questions.find((item) => item.id === qNum);
    if (!q) return undefined;
    const ansId = answers[qNum];
    return q.options.find((opt) => opt.id === ansId);
  };

  // Calculate sum of available weights
  let totalScore = 0;
  let maxPossible = 0;
  questions.forEach((q) => {
    const opt = getSelectedOption(q.id);
    if (opt?.weight !== undefined) {
      totalScore += opt.weight;
    }
    maxPossible += 4;
  });

  const percentage = Math.min(100, Math.round((totalScore / Math.max(1, maxPossible)) * 100));

  let level = "Mild Challenge";
  let levelHi = "सामान्य चुनौती";
  if (percentage >= 65) {
    level = "Severe Compulsion";
    levelHi = "गंभीर अनियंत्रित आदत";
  } else if (percentage >= 40) {
    level = "Moderate Compulsion";
    levelHi = "मध्यम अनियंत्रित आदत";
  }

  return {
    sectionTitleEn,
    sectionTitleHi,
    controlDifficulty: {
      score: percentage,
      level,
      levelHi,
      descEn: `Your responses indicate a ${level.toLowerCase()} level of habit compulsion and urge resistance.`,
      descHi: `आपके उत्तर दर्शाते हैं कि इस आदत पर नियंत्रण और इच्छा रोकने में ${levelHi} स्तर की स्थिति है।`,
      signalsEn: ["High urge resistance during trigger moments"],
      signalsHi: ["ट्रिगर आने पर आदत को रोकना चुनौतीपूर्ण लगता है"],
      keySignalsEn: ["High urge resistance during trigger moments"],
      keySignalsHi: ["ट्रिगर आने पर आदत को रोकना चुनौतीपूर्ण लगता है"],
    },
    habitPattern: {
      patternTypeEn: "Emotion-Triggered Compulsive Cycle",
      patternTypeHi: "भावनात्मक व तनाव से प्रेरित चक्र",
      primaryTriggerEn: "Stress, Boredom, or Late-Night Triggers",
      primaryTriggerHi: "तनाव, बोरियत या देर रात फोन का इस्तेमाल",
      routineContextEn: "Late night / alone on phone",
      routineContextHi: "देर रात / अकेले में फोन चलाते समय",
      analysisEn: "The habit serves as an automatic coping mechanism when emotional stress or loneliness occurs.",
      analysisHi: "अकेलेपन या तनाव के पलों में यह आदत एक स्वतः राहत तंत्र के रूप में कार्य करती है।",
    },
    lifeImpact: {
      severity: percentage >= 50 ? "Significant" : "Noticeable",
      severityHi: percentage >= 50 ? "गहरा प्रभाव" : "स्पष्ट प्रभाव",
      affectedAreasEn: ["Time & Focus", "Routine", "Mental Energy"],
      affectedAreasHi: ["समय व ध्यान", "दिनचर्या", "मानसिक ऊर्जा"],
      emotionalTollEn: "Feelings of guilt, fatigue, and lower daily motivation",
      emotionalTollHi: "अपराधबोध, थकान और दिनचर्या में कम प्रेरणा",
      analysisEn: "Habit loop pulls away crucial cognitive focus, sleep quality, and daily productivity.",
      analysisHi: "यह आदत आपकी मानसिक एकाग्रता, नींद की गुणवत्ता और दैनिक उत्पादकता को प्रभावित कर रही है।",
    },
    userMainConcern: {
      chosenGoalEn: "Regain self-control and establish a clear day-1 recovery plan",
      chosenGoalHi: "आत्म-नियंत्रण पाना और पहले दिन से स्पष्ट रिकवरी योजना लागू करना",
      recommendedFirstStepEn: "Schedule a 1-on-1 private consultation to break your unique habit trigger chain.",
      recommendedFirstStepHi: "अपने व्यक्तिगत ट्रिगर्स को समझने व तोड़ने के लिए निजी परामर्श सत्र बुक करें।",
    },
  };
}
