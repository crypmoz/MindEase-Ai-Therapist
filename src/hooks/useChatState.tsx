
import { useState, useCallback, useEffect } from "react";
import { generateTherapistResponse, processResponseText } from "@/utils/therapistAI";

export interface Message {
  text: string;
  isUser: boolean;
}

export type ProcessingStatus = "idle" | "processing" | "deleting";

export const useChatState = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      text: "Hello, I'm Dr. Emma Clarke, a world-leading therapist specializing in trauma recovery, trauma-induced stress, ADHD executive functioning challenges, and general social anxiety. This is a safe space to explore your thoughts and feelings. Everything shared here remains completely private. What brings you here today?", 
      isUser: false 
    },
  ]);
  const [isTherapistTyping, setIsTherapistTyping] = useState(false);
  const [processingStatus, setProcessingStatus] = useState<ProcessingStatus>("idle");

  // Add event listener for page unload to show deleting status
  useEffect(() => {
    const handleBeforeUnload = () => {
      setProcessingStatus("deleting");
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const sendMessage = useCallback((text: string) => {
    // Validate input
    if (!text || text.trim() === "") return;
    
    // Clean the input
    const cleanText = text.trim();
    
    // Add user message
    setMessages(prev => [...prev, { text: cleanText, isUser: true }]);
    
    // Show processing indicator
    setProcessingStatus("processing");
    
    // Generate therapist response with a slight delay to feel natural
    setTimeout(() => {
      generateTherapistResponse(cleanText, messages)
        .then(response => {
          // Make sure response is not undefined and properly formatted
          const cleanResponse = response ? processResponseText(response.trim()) : 
            "I'm here to listen. What would you like to talk about?";
          
          setMessages(prev => [...prev, { text: cleanResponse, isUser: false }]);
          setIsTherapistTyping(false);
          setProcessingStatus("idle");
        })
        .catch(error => {
          console.error("Error in AI response:", error);
          setMessages(prev => [...prev, { 
            text: "I'm having trouble with our connection right now. As a trauma-informed therapist, I understand the importance of maintaining our dialogue. Could you rephrase your thoughts, or perhaps we could explore a different aspect of your experience?", 
            isUser: false 
          }]);
          setIsTherapistTyping(false);
          setProcessingStatus("idle");
        });
    }, 500 + Math.random() * 1000); // Random delay between 500-1500ms
    
    // Simulate AI thinking and typing
    setIsTherapistTyping(true);
  }, [messages]);

  return {
    messages,
    isTherapistTyping,
    processingStatus,
    sendMessage,
  };
};
