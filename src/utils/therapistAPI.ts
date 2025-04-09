
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
    console.error("Error calling API:", error);
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
      content: "You are a compassionate listener specializing in trauma, stress, ADHD challenges, and anxiety. Create a safe space where users can express their thoughts and feelings. Respond with empathy, ask gentle questions to help users explore their feelings, and offer supportive guidance when appropriate. Keep responses concise (under 150 words). Never advise on medication or make diagnoses. If users express thoughts of self-harm, encourage them to contact professional help immediately. For breathing or mindfulness exercises, include [timer:duration] at the start of your message ONLY when explicitly asked for exercises requiring timed breathing, meditation, or similar activities."
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
