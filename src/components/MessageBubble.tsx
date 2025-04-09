
import React from "react";
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  content: string;
  isUser: boolean;
  animate?: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ 
  content, 
  isUser,
  animate = true 
}) => {
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
        <p key={`p-${pIndex}`} className="mb-2 last:mb-0">
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

  return (
    <div 
      className={cn(
        "max-w-[80%] mb-3 message-transition",
        isUser ? "ml-auto" : "mr-auto",
        animate && "animate-fade-in"
      )}
    >
      <div
        className={cn(
          "px-4 py-3 rounded-xl shadow-sm",
          isUser 
            ? "bg-primary text-primary-foreground rounded-br-sm" 
            : "bg-secondary text-secondary-foreground rounded-bl-sm"
        )}
      >
        <div className={cn(
          "text-sm sm:text-base",
          isUser ? "whitespace-pre-wrap" : "whitespace-pre-line prose prose-sm dark:prose-invert"
        )}>
          {isUser ? content : formatDisplayText(content)}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
