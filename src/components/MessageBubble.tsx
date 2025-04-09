
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
        <p className="text-sm sm:text-base whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  );
};

export default MessageBubble;
