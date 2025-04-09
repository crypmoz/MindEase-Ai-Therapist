
import type { Message } from "@/hooks/useChatState";
import { processResponseText } from './textProcessing';
import { generateFallbackResponse } from './fallbackResponses';
import { 
  callDeepseekAPI, 
  formatConversationForAPI, 
  setApiKey, 
  hasApiKey,
  setModel,
  getModel
} from './therapistAPI';

// Main function to generate therapist response
export const generateTherapistResponse = async (
  userMessage: string,
  conversationHistory: Message[]
): Promise<string> => {
  try {
    // Format the conversation for the API
    const formattedMessages = formatConversationForAPI(userMessage, conversationHistory);
    
    // Call the API or use fallback
    const responseText = await callDeepseekAPI(
      formattedMessages,
      () => generateFallbackResponse(userMessage, conversationHistory)
    );
    
    // Process the response text to improve formatting and readability
    const processedResponse = processResponseText(responseText);
    
    return processedResponse;
  } catch (error) {
    console.error("Error generating AI response:", error);
    return generateFallbackResponse(userMessage, conversationHistory);
  }
};

// Re-export necessary functions
export { 
  processResponseText, 
  setApiKey, 
  hasApiKey,
  setModel,
  getModel
};
