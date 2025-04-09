
import { useState, useCallback, useEffect } from "react";
import { generateTherapistResponse } from "@/utils/therapistAI";

export interface Message {
  text: string;
  isUser: boolean;
}

export const useChatState = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      text: "Hello, I'm Dr. Emma Clarke, a specialist in trauma recovery, ADHD executive functioning, and anxiety management. This is a safe space to explore your thoughts and feelings. Everything shared here remains completely private. What brings you here today?", 
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
          const finalResponse = cleanResponse
            // Remove any random characters or markdown artifacts at the beginning
            .replace(/^[^a-zA-Z0-9\[]/g, '')
            // Ensure proper spacing after punctuation
            .replace(/([.!?])([a-zA-Z])/g, '$1 $2')
            // Fix multiple consecutive spaces
            .replace(/\s{2,}/g, ' ')
            // Fix duplicate letters (like "Helllo") more aggressively
            .replace(/([a-z])\1{2,}/gi, '$1$1')
            // Fix incorrect capitalization
            .replace(/\b(i)\b/g, 'I')
            // Proper capitalization for clinical terms
            .replace(/\b(adhd|ptsd|cbt|dbt)\b/gi, match => match.toUpperCase())
            // Fix spaced hyphens in compound words
            .replace(/(\w+)\s-\s(\w+)/g, '$1-$2')
            // Ensure proper spacing around parentheses
            .replace(/\s*\(\s*/g, ' (')
            .replace(/\s*\)\s*/g, ') ')
            // Fix non-standard quotes
            .replace(/['']/g, "'")
            .replace(/[""]/g, '"')
            // Replace double periods
            .replace(/\.{2,}/g, '.')
            // Add space after commas if missing
            .replace(/,([a-zA-Z])/g, ', $1')
            .trim();
          
          setMessages(prev => [...prev, { text: finalResponse, isUser: false }]);
          setIsTherapistTyping(false);
        })
        .catch(error => {
          console.error("Error in AI response:", error);
          setMessages(prev => [...prev, { 
            text: "I'm having trouble with our connection right now. As a therapist, I know how important it is to maintain dialogue. Could you rephrase your thoughts or perhaps we could explore a different aspect of your experience?", 
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
