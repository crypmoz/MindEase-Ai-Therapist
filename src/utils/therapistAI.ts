
import type { Message } from "@/hooks/useChatState";

// This simulates AI responses for our application
// In a real application, this would connect to an API

// Helper function to pick a random item from an array
const randomPick = <T>(items: T[]): T => {
  return items[Math.floor(Math.random() * items.length)];
};

// Deep follow-up questions to encourage reflection
const followUpQuestions = [
  "How does that make you feel?",
  "What thoughts come up when you think about that?",
  "Have you noticed any patterns in how you respond to this situation?",
  "What would your ideal outcome look like?",
  "How do you think this relates to other areas of your life?",
  "What's one small step you could take to address this?",
  "What would happen if you looked at this from a different perspective?",
  "What advice would you give to a friend in your situation?",
  "What needs might you be trying to meet through this?",
  "How does your body physically feel when you think about this?",
];

// Empathetic acknowledgments to show understanding
const acknowledgments = [
  "I can understand why you'd feel that way.",
  "That sounds really challenging.",
  "Thank you for sharing that with me.",
  "I appreciate your openness.",
  "It takes courage to express these feelings.",
  "It makes sense that you would feel this way given what you've shared.",
  "I'm here with you in this moment.",
  "Your feelings are completely valid.",
  "That's a lot to carry with you.",
  "I'm listening and I hear you.",
];

// Therapeutic techniques to suggest
const therapeuticPrompts = [
  "It might help to take a moment to breathe deeply while we explore this further.",
  "Sometimes writing down our thoughts can help us see patterns more clearly.",
  "Consider how this situation aligns with your core values and what matters to you.",
  "It can be helpful to identify what aspects of this situation are within your control.",
  "Trying to observe your thoughts without judgment might offer some clarity.",
  "What would self-compassion look like in this situation?",
  "Sometimes naming our emotions specifically can help us understand them better.",
  "What strengths have helped you navigate difficult situations in the past?",
  "It's okay to acknowledge both the challenges and any opportunities for growth here.",
  "How might your future self look back on this moment?",
];

export const generateTherapistResponse = async (
  userMessage: string,
  conversationHistory: Message[]
): Promise<string> => {
  // This function simulates generating a response
  // In a real app, this would call an API endpoint
  
  const userMessageLower = userMessage.toLowerCase();
  
  // Detect greetings
  if (
    conversationHistory.length <= 2 &&
    (userMessageLower.includes("hello") ||
     userMessageLower.includes("hi") ||
     userMessageLower.includes("hey"))
  ) {
    return "Hello! I'm glad you're here. This is a safe space to share whatever's on your mind. What would you like to talk about today?";
  }
  
  // Detect if user is asking how the AI works
  if (
    userMessageLower.includes("how do you work") ||
    userMessageLower.includes("are you an ai") ||
    userMessageLower.includes("are you real") ||
    userMessageLower.includes("are you a bot")
  ) {
    return "I'm an AI designed to provide a space for reflection. I don't store our conversations, and I'm here to listen and ask questions that might help you explore your thoughts. While I'm not a replacement for a human therapist, I aim to offer helpful perspectives. What's been on your mind lately?";
  }
  
  // Detect gratitude
  if (
    userMessageLower.includes("thank you") ||
    userMessageLower.includes("thanks") ||
    userMessageLower.includes("helpful")
  ) {
    return "You're welcome. It's a privilege to be part of your journey of reflection. Is there anything else you'd like to explore today?";
  }
  
  // Detect if user is asking about privacy
  if (
    userMessageLower.includes("privacy") ||
    userMessageLower.includes("data") ||
    userMessageLower.includes("store") ||
    userMessageLower.includes("save")
  ) {
    return "Your privacy is extremely important. Our conversations aren't saved or stored anywhere. When you close or refresh this page, the entire conversation disappears. This provides a completely private space for you to explore your thoughts. What's on your mind that you'd like to discuss?";
  }
  
  // Detect if user wants to end conversation
  if (
    userMessageLower.includes("goodbye") ||
    userMessageLower.includes("bye") ||
    userMessageLower.includes("see you") ||
    userMessageLower.includes("that's all")
  ) {
    return "Thank you for sharing with me today. Remember that you can return anytime you need a space to reflect. Take care of yourself, and I'll be here when you need me again.";
  }
  
  // General response for most messages
  // Combine an acknowledgment with a follow-up question
  const acknowledgment = randomPick(acknowledgments);
  const followUp = randomPick(followUpQuestions);
  
  // Occasionally add a therapeutic prompt (30% chance)
  const includeTherapeuticPrompt = Math.random() < 0.3;
  const therapeuticPrompt = includeTherapeuticPrompt 
    ? " " + randomPick(therapeuticPrompts)
    : "";
  
  return `${acknowledgment} ${therapeuticPrompt} ${followUp}`;
};
