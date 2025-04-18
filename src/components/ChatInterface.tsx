
import React, { useRef, useEffect, useState } from "react";
import MessageBubble from "./MessageBubble";
import TherapistMessage from "./TherapistMessage";
import UserInput from "./UserInput";
import PrivacyMessage from "./PrivacyMessage";
import ApiKeySetup from "./ApiKeySetup";
import DataProcessingIndicator from "./DataProcessingIndicator";
import PrivacyFAQ from "./PrivacyFAQ";
import ModelSelectionBanner from "./ModelSelectionBanner";
import { useChatState } from "@/hooks/useChatState";

const ChatInterface: React.FC = () => {
  const { 
    messages, 
    isTherapistTyping,
    processingStatus,
    sendMessage 
  } = useChatState();
  
  const [apiKeySet, setApiKeySet] = useState(false);
  const [showPrivacyFAQ, setShowPrivacyFAQ] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTherapistTyping]);

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto">
      <ModelSelectionBanner onApiKeySet={() => setApiKeySet(true)} />
      
      <div className="flex-1 overflow-y-auto p-4 scrollbar-none">
        <PrivacyMessage onFAQClick={() => setShowPrivacyFAQ(true)} />
        
        <div className="space-y-1 pb-4">
          {messages.map((msg, index) => (
            msg.isUser ? (
              <MessageBubble 
                key={index} 
                content={msg.text} 
                isUser={true} 
              />
            ) : (
              <TherapistMessage 
                key={index} 
                content={msg.text} 
              />
            )
          ))}
          
          {isTherapistTyping && (
            <TherapistMessage content="" />
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="border-t p-4">
        <UserInput 
          onSendMessage={sendMessage} 
          isTherapistTyping={isTherapistTyping} 
        />
      </div>
      
      {/* Privacy FAQ modal */}
      {showPrivacyFAQ && (
        <PrivacyFAQ onClose={() => setShowPrivacyFAQ(false)} />
      )}
      
      {/* Processing status indicator */}
      <DataProcessingIndicator status={processingStatus} />
    </div>
  );
};

export default ChatInterface;
