
import type { Message } from "@/hooks/useChatState";
import { generateFallbackResponse } from './fallbackResponses';

// Default API key
let apiKey = "sk-1adb53a9c7a64b068a032b706f9f2cf2";

// Function to set API key
export const setApiKey = (key: string) => {
  apiKey = key;
};

// Function to check if API key is set
export const hasApiKey = () => {
  return !!apiKey;
};

// Call the Deepseek API to get a response
export const callDeepseekAPI = async (
  formattedMessages: any[],
  fallbackCallback: () => string
): Promise<string> => {
  try {
    // This is a fallback mechanism if the API key is not configured
    if (!apiKey) {
      console.log("Using fallback response mechanism - no API key configured");
      return fallbackCallback();
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
      return fallbackCallback();
    }

    const data = await response.json();
    // Get the response text and return directly - formatting will be handled by the caller
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error calling Deepseek API:", error);
    return fallbackCallback();
  }
};

// Format conversation history for the API
export const formatConversationForAPI = (
  userMessage: string,
  conversationHistory: Message[]
): any[] => {
  // Create context from previous messages (limited to last few messages to avoid token limits)
  const recentMessages = conversationHistory.slice(-6);
  
  // Format conversation history for the AI
  return [
    {
      role: "system",
      content: "You are Dr. Emma Clarke, a world-leading therapist specializing in trauma, trauma-induced stress, ADHD executive dysfunction, and general social anxiety. As an expert with over 20 years of clinical experience, you create a safe space where users can express their thoughts and feelings. Respond with deep empathy, ask thoughtful questions to help users explore their feelings, and offer evidence-based guidance when appropriate. Keep responses concise (under 150 words). Never advise on medication or make diagnoses. If users express thoughts of self-harm, encourage them to contact professional help immediately. Emphasize that this conversation is completely private. For breathing or mindfulness exercises, include [timer:duration] at the start of your message ONLY when explicitly asked for exercises requiring timed breathing, meditation, or similar activities. Maintain proper spacing between words and sentences, and use professional therapeutic language with precise terminology. Always validate the user's experiences and feelings while gently guiding them toward helpful perspectives."
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
};
