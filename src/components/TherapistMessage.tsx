
import React, { useState, useEffect } from "react";
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
  const [timerDuration, setTimerDuration] = useState(60); // Default 60 seconds
  const [timeRemaining, setTimeRemaining] = useState(60);

  useEffect(() => {
    if (!content) return;
    setIsTyping(true);
    setDisplayedText("");

    // Check for timer tag with optional duration [timer:duration]
    const timerMatch = content.match(/\[timer(?::(\d+))?\]/);
    const shouldShowTimer = timerMatch !== null;
    setShowTimer(shouldShowTimer);

    // Extract duration if specified, default to 60 seconds otherwise
    if (shouldShowTimer && timerMatch && timerMatch[1]) {
      const duration = parseInt(timerMatch[1], 10);
      setTimerDuration(duration);
      setTimeRemaining(duration);
    } else if (shouldShowTimer) {
      setTimerDuration(60);
      setTimeRemaining(60);
    }

    // Clean the content of any timer tags
    const cleanContent = content.replace(/\[timer(?::(\d+))?\]/, "").trim();
    
    let currentIndex = 0;
    const totalLength = cleanContent.length;
    
    const typingTimer = setInterval(() => {
      if (currentIndex < totalLength) {
        setDisplayedText(prevText => prevText + cleanContent[currentIndex]);
        setProgressValue(currentIndex / totalLength * 100);
        currentIndex++;
      } else {
        clearInterval(typingTimer);
        setIsTyping(false);
        setProgressValue(100);
      }
    }, typingDelay);
    
    return () => clearInterval(typingTimer);
  }, [content, typingDelay]);

  // Timer countdown only starts when typing is complete and timer is requested
  useEffect(() => {
    if (!isTyping && showTimer && timeRemaining > 0) {
      const countdownTimer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(countdownTimer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(countdownTimer);
    }
  }, [isTyping, showTimer, timeRemaining]);

  // Format time remaining as MM:SS
  const formatTimeRemaining = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Format displayed text to render paragraphs properly - completely rewritten
  const formatDisplayText = (text: string) => {
    // Safety check for empty text
    if (!text) return null;
    
    // Split by double line breaks to identify paragraphs
    const paragraphs = text.split('\n\n');
    
    return paragraphs.map((paragraph, pIndex) => {
      const lines = paragraph.split('\n');
      
      // Create paragraph elements with line breaks
      return (
        <p key={`p-${pIndex}`} className="mb-3 last:mb-0">
          {lines.map((line, lIndex) => {
            // For the last line in a paragraph, don't add a <br />
            const isLastLine = lIndex === lines.length - 1;
            
            return (
              <React.Fragment key={`line-${pIndex}-${lIndex}`}>
                {line}
                {!isLastLine && <br />}
              </React.Fragment>
            );
          })}
        </p>
      );
    });
  };

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
  
  return (
    <div className="max-w-[80%] mb-3 mr-auto message-transition">
      <div className="px-4 py-3 rounded-xl shadow-sm bg-secondary text-secondary-foreground rounded-bl-sm">
        <div className="text-sm whitespace-pre-line py-0 sm:text-base font-normal text-left px-[2px] mx-[3px] my-[13px] prose prose-sm dark:prose-invert">
          {formatDisplayText(displayedText)}
        </div>
        
        {/* Timer visualization - only shown when timer tag is present */}
        {showTimer && (
          <div className="mt-3 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-xs text-muted-foreground">
                  {timeRemaining > 0 ? "Time remaining:" : "Time's up!"}
                </span>
              </div>
              <span className="text-sm font-medium">
                {formatTimeRemaining(timeRemaining)}
              </span>
            </div>
            <Progress value={(timerDuration - timeRemaining) / timerDuration * 100} className="h-1.5" />
          </div>
        )}
      </div>
    </div>
  );
};

export default TherapistMessage;
