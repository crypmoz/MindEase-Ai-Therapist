
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

// Improved acknowledgments with less preachy tone
export const acknowledgments = [
  "That sounds tough to deal with.",
  "Thanks for sharing that with me.",
  "I can see why that would be difficult.",
  "Sounds like you've been going through a lot.",
  "I appreciate you opening up about this.",
  "That makes a lot of sense given what you described.",
  "I'm here to listen.",
  "That's a really insightful observation.",
  "I hear you.",
  "That's a lot to handle.",
  "I can understand why you'd feel that way.",
  "Thanks for trusting me with this.",
  "Seems like you've been thinking about this a lot.",
  "That's not easy to talk about.",
  "I'm glad you brought this up.",
];

// Less preachy follow-up questions
export const followUpQuestions = [
  "How are you feeling about it now?",
  "What's been on your mind about this lately?",
  "Have you noticed when this tends to happen?",
  "What's helped you with this before?",
  "What do you think might help?",
  "Is there anything specific about this that's bothering you?",
  "What would feel good right now?",
  "How would you like things to be different?",
  "What part of this is hardest for you?",
  "Is there something specific you want to focus on?",
  "How has this been affecting you?",
  "What are your thoughts on it?",
  "Is there anyone else you've talked to about this?",
  "What are you hoping might change?",
  "What would make this situation better for you?",
];

// Less directive therapeutic prompts
export const therapeuticPrompts = [
  "Sometimes just noticing our breathing can help when things feel overwhelming.",
  "Some people find writing helps sort through complicated feelings.",
  "It's interesting how our past experiences shape how we react now.",
  "It can help to consider what parts of the situation you can influence.",
  "Noticing thoughts without judging them is something many find useful.",
  "Being kind to yourself matters, especially during tough times.",
  "Putting a name to feelings can sometimes make them less intense.",
  "You've gotten through difficult things before.",
  "Both acknowledging challenges and possibilities can be helpful.",
  "I wonder how you might view this situation a year from now?",
  "Small moments of calm can make a difference.",
  "Some find that boundaries help protect their energy.",
  "Feelings often have important information for us.",
  "Connecting with supportive people can sometimes shift our perspective.",
  "Progress tends to have ups and downs.",
];
