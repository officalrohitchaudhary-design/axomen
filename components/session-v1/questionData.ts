export interface V1Question {
  id: string;
  category: string;
  title: string;
  hindiTitle?: string;
  options: string[];
}

export const V1_QUESTIONS_PART_1: V1Question[] = [
  // Q1: Impact
  {
    id: "q1",
    category: "Porn & Recovery",
    title: "Is porn affecting your life?",
    hindiTitle: "क्या पोर्न आपकी ज़िंदगी को affect कर रहा है?",
    options: ["Yes", "No", "I'm not sure"],
  },
  // Q2: Frequency (Clean 4 options)
  {
    id: "q2",
    category: "Porn & Recovery",
    title: "How often do you watch porn?",
    hindiTitle: "आप कितनी बार पोर्न देखते हैं?",
    options: [
      "Less than once a week",
      "1–2 times a week",
      "3–5 times a week",
      "Almost every day",
    ],
  },
  // Gender (Exact 3 options as requested: Male, Female, Other - removed prefer not to say)
  {
    id: "q_gender",
    category: "Profile & Demographics",
    title: "What is your gender?",
    hindiTitle: "आपका gender क्या है?",
    options: ["Male", "Female", "Other"],
  },
  // Age (Exact options as requested: Under 18, 20s, 30s, 40s, 50s)
  {
    id: "q_age",
    category: "Profile & Demographics",
    title: "What is your age?",
    hindiTitle: "आपकी उम्र कितनी है?",
    options: ["Under 18", "20s", "30s", "40s", "50s"],
  },
  // Q3: First started (Removed after 22 as requested)
  {
    id: "q3",
    category: "History & Patterns",
    title: "When did you first start watching porn?",
    hindiTitle: "आपने पहली बार पोर्न कब देखना शुरू किया था?",
    options: ["Before 13", "13–15", "16–18", "19–22"],
  },
  // Q4: Duration (Streamlined to 4 clean options)
  {
    id: "q4",
    category: "History & Patterns",
    title: "How long have you been watching porn?",
    hindiTitle: "आप कितने समय से पोर्न देख रहे हैं?",
    options: [
      "Less than 1 year",
      "1–3 years",
      "3–5 years",
      "More than 5 years",
    ],
  },
  // Q5: Last watched (Streamlined to 4 clean options)
  {
    id: "q5",
    category: "History & Patterns",
    title: "When did you last watch porn?",
    hindiTitle: "आपने आखिरी बार पोर्न कब देखा था?",
    options: [
      "Today",
      "Yesterday",
      "2–3 days ago",
      "More than a week ago",
    ],
  },
];

export const V1_QUESTIONS_PART_2: V1Question[] = [
  // Q6: Masturbation
  {
    id: "q6",
    category: "Triggers & Habits",
    title: "Do you masturbate when you watch porn?",
    hindiTitle: "क्या पोर्न देखते समय आप masturbation भी करते हैं?",
    options: ["Yes, almost every time", "Yes, sometimes", "Rarely", "No"],
  },
  // Q7: Triggers (Streamlined to 4 most core triggers)
  {
    id: "q7",
    category: "Triggers & Habits",
    title: "What usually makes you want to watch porn?",
    hindiTitle: "आमतौर पर आपको पोर्न देखने का मन किस वजह से करता है?",
    options: [
      "Sexual urge",
      "Stress or tension",
      "Boredom or loneliness",
      "Habitual routine",
    ],
  },
  // Q8: Automatic reflex
  {
    id: "q8",
    category: "Triggers & Habits",
    title: "Do you sometimes open porn without planning to?",
    hindiTitle: "क्या कभी आप बिना plan किए पोर्न खोल लेते हैं?",
    options: ["Yes", "Sometimes", "No"],
  },
  // Q9: Quit attempts
  {
    id: "q9",
    category: "Urges & Control",
    title: "Have you ever tried to stop or reduce porn?",
    hindiTitle: "क्या आपने कभी पोर्न छोड़ने या कम करने की कोशिश की है?",
    options: ["Yes", "No"],
  },
];

export const V1_QUESTION_9A: V1Question = {
  id: "q9a",
  category: "Urges & Control",
  title: "How many times have you tried?",
  hindiTitle: "आपने कितनी बार कोशिश की है?",
  options: ["Once", "2–3 times", "4–5 times", "More than 5 times"],
};

export const V1_QUESTIONS_PART_3: V1Question[] = [
  // Q10: Urge intensity (Streamlined to 4 clean options)
  {
    id: "q10",
    category: "Urges & Control",
    title: "When you try to stop, how difficult is it to control the urge?",
    hindiTitle: "जब आप पोर्न छोड़ने की कोशिश करते हैं, तो urge को control करना कितना मुश्किल होता है?",
    options: [
      "Not difficult",
      "A little difficult",
      "Very difficult",
      "I usually give in",
    ],
  },
  // Q11: Emotional feelings (Streamlined to 4 clean options)
  {
    id: "q11",
    category: "Focus & Impact",
    title: "What do you usually feel while watching porn?",
    hindiTitle: "पोर्न देखते समय आपको आमतौर पर कैसा महसूस होता है?",
    options: [
      "Sexual excitement",
      "Temporary relief",
      "Escape from stress",
      "A mix of these",
    ],
  },
  // Q12: Life impact
  {
    id: "q12",
    category: "Focus & Impact",
    title: "Do you feel porn is taking time or focus away from important things in your life?",
    hindiTitle: "क्या आपको लगता है कि पोर्न आपकी ज़िंदगी की ज़रूरी चीज़ों से time या focus ले रहा है?",
    options: ["Yes, a lot", "Yes, somewhat", "A little", "No"],
  },
];
