
import React, { useState, useEffect } from "react";
import MessageBubble from "./MessageBubble";

interface TherapistMessageProps {
  content: string;
  typingDelay?: number;
}

const TherapistMessage: React.FC<TherapistMessageProps> = ({ 
  content,
  typingDelay = 30 
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (!content) return;
    
    setIsTyping(true);
    setDisplayedText("");
    
    let currentIndex = 0;
    const timer = setInterval(() => {
      if (currentIndex < content.length) {
        setDisplayedText(prevText => prevText + content[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(timer);
        setIsTyping(false);
      }
    }, typingDelay);

    return () => clearInterval(timer);
  }, [content, typingDelay]);

  if (!content) {
    return (
      <div className="max-w-[80%] mb-3 mr-auto">
        <div className="px-4 py-3 rounded-xl shadow-sm bg-secondary text-secondary-foreground rounded-bl-sm">
          <div className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    );
  }

  return <MessageBubble content={displayedText} isUser={false} animate={false} />;
};

export default TherapistMessage;
