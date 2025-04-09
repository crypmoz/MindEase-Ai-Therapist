
import { useState, useCallback, useEffect } from "react";
import { generateTherapistResponse } from "@/utils/therapistAI";

export interface Message {
  text: string;
  isUser: boolean;
}

export const useChatState = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      text: "Hello, I'm Dr. Emma Clarke, a world-leading therapist specializing in trauma recovery, trauma-induced stress, ADHD executive functioning challenges, and general social anxiety. This is a safe space to explore your thoughts and feelings. Everything shared here remains completely private. What brings you here today?", 
      isUser: false 
    },
  ]);
  const [isTherapistTyping, setIsTherapistTyping] = useState(false);

  const sendMessage = useCallback((text: string) => {
    // Validate input
    if (!text || text.trim() === "") return;
    
    // Clean the input
    const cleanText = text.trim();
    
    // Add user message
    setMessages(prev => [...prev, { text: cleanText, isUser: true }]);
    
    // Simulate AI thinking and typing
    setIsTherapistTyping(true);
    
    // Generate therapist response with a slight delay to feel natural
    setTimeout(() => {
      generateTherapistResponse(cleanText, messages)
        .then(response => {
          // Make sure response is not undefined and properly formatted
          const cleanResponse = response ? response.trim() : 
            "I'm here to listen. What would you like to talk about?";
          
          // Enhanced formatting check with more comprehensive text processing
          // All formatting is now centralized in the therapistAI.ts file
          // to ensure consistency across all responses
          
          setMessages(prev => [...prev, { text: cleanResponse, isUser: false }]);
          setIsTherapistTyping(false);
        })
        .catch(error => {
          console.error("Error in AI response:", error);
          setMessages(prev => [...prev, { 
            text: "I'm having trouble with our connection right now. As a trauma-informed therapist, I understand the importance of maintaining our dialogue. Could you rephrase your thoughts, or perhaps we could explore a different aspect of your experience?", 
            isUser: false 
          }]);
          setIsTherapistTyping(false);
        });
    }, 500 + Math.random() * 1000); // Random delay between 500-1500ms
  }, [messages]);

  return {
    messages,
    isTherapistTyping,
    sendMessage,
  };
};
