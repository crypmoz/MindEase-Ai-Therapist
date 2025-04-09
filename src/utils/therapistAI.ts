
import type { Message } from "@/hooks/useChatState";

// Deepseek API integration for more sophisticated responses
export const generateTherapistResponse = async (
  userMessage: string,
  conversationHistory: Message[]
): Promise<string> => {
  try {
    // Create context from previous messages (limited to last few messages to avoid token limits)
    const recentMessages = conversationHistory.slice(-6);
    
    // Format conversation history for the AI
    const formattedMessages = [
      {
        role: "system",
        content: "You are a compassionate AI therapist named MindEase. Your purpose is to create a safe space where users can express their thoughts and feelings. Respond with empathy, ask thoughtful questions to help users explore their feelings deeper, and offer gentle guidance when appropriate. Keep responses concise (under 150 words). Never advise on medication or make diagnoses. If users express thoughts of self-harm, encourage them to contact professional help immediately. Remember that privacy is paramount - remind users that this conversation is completely private and not stored anywhere."
      },
      ...recentMessages.map(msg => ({
        role: msg.isUser ? "user" : "assistant",
        content: msg.text
      })),
      {
        role: "user",
        content: userMessage
      }
    ];

    // This is a fallback mechanism if the API call fails
    if (!apiKey) {
      console.log("Using fallback response mechanism - no API key configured");
      return generateFallbackResponse(userMessage, conversationHistory);
    }

    // Call the Deepseek API
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: formattedMessages,
        temperature: 0.7,
        max_tokens: 250
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", errorData);
      return generateFallbackResponse(userMessage, conversationHistory);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error generating AI response:", error);
    return generateFallbackResponse(userMessage, conversationHistory);
  }
};

// Fallback mechanism using the original local response generator
const generateFallbackResponse = (userMessage: string, conversationHistory: Message[]): string => {
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
  
  return `${acknowledgment}${therapeuticPrompt} ${followUp}`;
};

// Helper functions from the original code
const randomPick = <T>(items: T[]): T => {
  return items[Math.floor(Math.random() * items.length)];
};

// Original arrays of responses
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

// Set default API key to the provided one
let apiKey = "sk-1adb53a9c7a64b068a032b706f9f2cf2";

// Function to set API key
export const setApiKey = (key: string) => {
  apiKey = key;
};

// Function to check if API key is set
export const hasApiKey = () => {
  return !!apiKey;
};
