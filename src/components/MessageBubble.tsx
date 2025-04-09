
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
  // Format displayed text to render paragraphs properly (for non-user messages)
  const formatDisplayText = (text: string) => {
    // Split by double line breaks to identify paragraphs
    return text.split('\n\n').map((paragraph, i) => (
      <p key={i} className="mb-2 last:mb-0">
        {paragraph.split('\n').map((line, j) => (
          <React.Fragment key={j}>
            {line}
            {j < paragraph.split('\n').length - 1 && <br />}
          </React.Fragment>
        ))}
      </p>
    ));
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
