
import { useState, useCallback, useEffect } from "react";
import { generateTherapistResponse } from "@/utils/therapistAI";

export interface Message {
  text: string;
  isUser: boolean;
}

export const useChatState = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      text: "Hello, I'm here to provide a safe space for you to express your thoughts and feelings. What's on your mind today?", 
      isUser: false 
    },
  ]);
  const [isTherapistTyping, setIsTherapistTyping] = useState(false);

  const sendMessage = useCallback((text: string) => {
    // Add user message
    setMessages(prev => [...prev, { text, isUser: true }]);
    
    // Simulate AI thinking and typing
    setIsTherapistTyping(true);
    
    // Generate therapist response with a slight delay to feel natural
    setTimeout(() => {
      generateTherapistResponse(text, messages)
        .then(response => {
          // Make sure response is not undefined and properly spaced
          const cleanResponse = response ? response.trim() : 
            "I'm here to listen. What would you like to talk about?";
          
          setMessages(prev => [...prev, { text: cleanResponse, isUser: false }]);
          setIsTherapistTyping(false);
        })
        .catch(error => {
          console.error("Error in AI response:", error);
          setMessages(prev => [...prev, { 
            text: "I'm having trouble understanding right now. Could you try expressing that another way?", 
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
