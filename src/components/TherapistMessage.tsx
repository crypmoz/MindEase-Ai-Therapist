
import React, { useState, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import { Clock } from "lucide-react";
import { Progress } from "./ui/progress";

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
  const [progressValue, setProgressValue] = useState(0);
  const [showTimer, setShowTimer] = useState(false);
  
  useEffect(() => {
    if (!content) return;
    
    setIsTyping(true);
    setDisplayedText("");
    
    // Determine if we should show a timer based on content
    const shouldShowTimer = content.includes("[timer]");
    setShowTimer(shouldShowTimer);
    
    // Clean the content of any timer tags
    const cleanContent = content.replace("[timer]", "").trim();
    
    let currentIndex = 0;
    const totalLength = cleanContent.length;
    
    const timer = setInterval(() => {
      if (currentIndex < totalLength) {
        setDisplayedText(prevText => prevText + cleanContent[currentIndex]);
        // Update progress for visual feedback
        setProgressValue((currentIndex / totalLength) * 100);
        currentIndex++;
      } else {
        clearInterval(timer);
        setIsTyping(false);
        setProgressValue(100);
      }
    }, typingDelay);

    return () => clearInterval(timer);
  }, [content, typingDelay]);

  // Show typing indicator when no content is available
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

  const messageContent = (
    <>
      <p className="text-sm sm:text-base whitespace-pre-wrap">{displayedText}</p>
      
      {/* Timer visualization */}
      {showTimer && (
        <div className="mt-3 space-y-2">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span className="text-xs text-muted-foreground">Take a moment...</span>
          </div>
          <Progress value={progressValue} className="h-1.5" />
        </div>
      )}
    </>
  );

  return (
    <div className="max-w-[80%] mb-3 mr-auto message-transition">
      <div className="px-4 py-3 rounded-xl shadow-sm bg-secondary text-secondary-foreground rounded-bl-sm">
        {messageContent}
      </div>
    </div>
  );
};

export default TherapistMessage;
