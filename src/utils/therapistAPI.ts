
import type { Message } from "@/hooks/useChatState";
import { generateFallbackResponse } from './fallbackResponses';

// Default API key
let apiKey = "sk-1adb53a9c7a64b068a032b706f9f2cf2";

// Default model
let currentModel = "deepseek-chat";

// Function to set API key
export const setApiKey = (key: string) => {
  apiKey = key;
};

// Function to check if API key is set
export const hasApiKey = () => {
  return !!apiKey;
};

// Function to set model
export const setModel = (model: string) => {
  currentModel = model;
  localStorage.setItem('mindease-model', model);
};

// Function to get current model
export const getModel = () => {
  const savedModel = localStorage.getItem('mindease-model');
  if (savedModel) {
    currentModel = savedModel;
  }
  return currentModel;
};

// Model configuration mapping
const MODEL_CONFIG = {
  "deepseek-chat": {
    endpoint: "https://api.deepseek.com/v1/chat/completions",
    model: "deepseek-chat",
    temperature: 0.7
  },
  "deepseek-coder": {
    endpoint: "https://api.deepseek.com/v1/chat/completions",
    model: "deepseek-coder",
    temperature: 0.6
  },
  "deepseek-lite": {
    endpoint: "https://api.deepseek.com/v1/chat/completions",
    model: "deepseek-lite",
    temperature: 0.7
  },
  "custom": {
    endpoint: "https://api.deepseek.com/v1/chat/completions",
    model: "deepseek-chat",
    temperature: 0.7
  }
};

// Call the API to get a response
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

    // Get model configuration
    const modelConfig = MODEL_CONFIG[currentModel as keyof typeof MODEL_CONFIG] || MODEL_CONFIG["deepseek-chat"];

    // Call the API
    const response = await fetch(modelConfig.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: modelConfig.model,
        messages: formattedMessages,
        temperature: modelConfig.temperature,
        max_tokens: 350, // Increased max tokens for more detailed responses
        top_p: 0.9       // Added top_p parameter for more creative responses
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
    console.error("Error calling API:", error);
    return fallbackCallback();
  }
};

// Format conversation history for the API
export const formatConversationForAPI = (
  userMessage: string,
  conversationHistory: Message[]
): any[] => {
  // Create context from previous messages (limited to last 8 messages for better context)
  const recentMessages = conversationHistory.slice(-8);
  
  // Format conversation history for the AI
  return [
    {
      role: "system",
      content: "You are a supportive and attentive listener focusing on trauma, stress, ADHD, and anxiety. Create a conversational space where users can share their thoughts. Keep responses concise (under 200 words) and casual - use contractions like 'you're' and 'I'm'. Avoid being preachy or giving unsolicited advice. Listen more than you advise. Never suggest medications or make diagnoses. If users mention self-harm, gently encourage them to seek professional help. Only include [timer:duration] at the beginning when specifically asked for timed breathing or meditation exercises."
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
