
import React, { useState, useRef, useEffect } from "react";
import { SendIcon } from "lucide-react";

interface UserInputProps {
  onSendMessage: (message: string) => void;
  isTherapistTyping: boolean;
}

const UserInput: React.FC<UserInputProps> = ({ onSendMessage, isTherapistTyping }) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isTherapistTyping) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    adjustTextareaHeight();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex items-end bg-white dark:bg-secondary rounded-lg shadow-sm border">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Share what's on your mind..."
          className="flex-1 max-h-[150px] p-3 pr-10 bg-transparent border-0 resize-none focus:outline-none focus:ring-0"
          rows={1}
          disabled={isTherapistTyping}
        />
        <button
          type="submit"
          className={`absolute bottom-2 right-3 p-1 rounded-full ${
            message.trim() && !isTherapistTyping
              ? "text-primary hover:bg-primary/10"
              : "text-muted-foreground cursor-not-allowed"
          }`}
          disabled={!message.trim() || isTherapistTyping}
        >
          <SendIcon size={18} />
        </button>
      </div>
    </form>
  );
};

export default UserInput;
