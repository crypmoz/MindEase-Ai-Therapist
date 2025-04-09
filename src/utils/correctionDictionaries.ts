
// Clinical term corrections dictionary for consistent terminology
export const clinicalTermCorrections: Record<string, string> = {
  "anxitey": "anxiety",
  "anxietyy": "anxiety",
  "depresion": "depression",
  "depresssion": "depression",
  "depresed": "depressed",
  "depressedd": "depressed",
  "traumaa": "trauma",
  "adhdd": "ADHD",
  "ocdd": "OCD",
  "therapyy": "therapy",
  "therapistt": "therapist",
  "cbt": "CBT",
  "dbt": "DBT",
  "emdr": "EMDR",
  "executivee": "executive",
  "funtioning": "functioning",
  "funtional": "functional",
  "functining": "functioning",
  "functinal": "functional",
  "functoning": "functioning",
  "functonal": "functional",
  "functionning": "functioning",
  "functionnal": "functional",
  "functiononing": "functioning",
  "functiononal": "functional",
  "functiioning": "functioning",
  "functiional": "functional",
  "fuctioning": "functioning",
  "fuctional": "functional",
  "fuinctioning": "functioning",
  "fuinctional": "functional"
};

// Terms that should always be capitalized regardless of position
export const alwaysCapitalized = [
  'CBT', 'DBT', 'ACT', 'EMDR', 'ADHD', 'PTSD', 'OCD', 'OCPD', 'GAD'
];

// Response templates for different scenarios
export const acknowledgments = [
  "What you're describing is a common response to trauma. Many of my clients experience similar reactions.",
  "That sounds incredibly challenging to navigate. Thank you for trusting me with this.",
  "I appreciate your willingness to explore these difficult emotions.",
  "Your ability to articulate these experiences shows remarkable self-awareness.",
  "It takes significant courage to confront these painful experiences.",
  "Your reaction makes perfect sense given what you've been through.",
  "I'm present with you as you process these feelings.",
  "Your experiences and feelings are entirely valid.",
  "That's a substantial emotional burden to carry.",
  "I hear you, and I want you to know that these responses are natural adaptations to difficult circumstances.",
];

export const followUpQuestions = [
  "How does that make you feel when you experience it?",
  "What thoughts arise when you reflect on this experience?",
  "Have you noticed any patterns in how your body responds to these situations?",
  "What would a step toward healing look like for you right now?",
  "How might this connect to earlier experiences in your life?",
  "What small action feels manageable to address this challenge?",
  "If we approached this from a self-compassion perspective, what might change?",
  "What advice would you offer to someone else experiencing similar struggles?",
  "What core needs might be unmet in this situation?",
  "Where do you notice tension or discomfort in your body as we discuss this?",
];

export const therapeuticPrompts = [
  "From a trauma-informed perspective, grounding yourself through deliberate breathing can help regulate your nervous system.",
  "Many find that externalizing thoughts through journaling helps process traumatic memories more effectively.",
  "Consider how your current responses might have once served as necessary protections.",
  "In my clinical practice, I encourage clients to identify which aspects of their situation they can influence directly.",
  "Practicing mindful observation of thoughts without judgment can interrupt ruminative patterns common in trauma and anxiety.",
  "Self-compassion is particularly important when addressing trauma-related shame or anxiety-driven self-criticism.",
  "Being precise about the emotions you're experiencing can help activate the prefrontal cortex, reducing amygdala activation.",
  "Reflecting on past resilience can strengthen your belief in your capacity to navigate current challenges.",
  "Both acknowledging distress and recognizing potential for growth are important aspects of trauma recovery.",
  "From a temporal perspective, how might you view this situation differently five years from now?",
];
