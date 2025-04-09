
import React, { useState } from "react";
import Header from "@/components/Header";
import WelcomeScreen from "@/components/WelcomeScreen";
import ChatInterface from "@/components/ChatInterface";
import AnimatedBackground from "@/components/AnimatedBackground";
import PrivacyMessage from "@/components/PrivacyMessage";
import PrivacyFAQ from "@/components/PrivacyFAQ";
import { ScrollArea } from "@/components/ui/scroll-area";

const Index: React.FC = () => {
  const [showChat, setShowChat] = useState(false);
  const [showPrivacyFAQ, setShowPrivacyFAQ] = useState(false);

  const handleStart = () => {
    setShowChat(true);
  };

  const handleFAQClick = () => {
    setShowPrivacyFAQ(true);
  };

  const handleFAQClose = () => {
    setShowPrivacyFAQ(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedBackground />
      <Header />
      
      <main className="flex-1 flex items-center justify-center p-4 overflow-hidden">
        <div className="w-full max-w-2xl h-[calc(100vh-theme(space.20))] flex flex-col bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-2xl rounded-xl overflow-hidden border border-white/30 dark:border-gray-800/30 transition-all duration-300">
          {!showChat ? (
            <ScrollArea className="flex-1">
              <div className="flex-1 flex flex-col items-center justify-center p-4">
                <WelcomeScreen onStart={handleStart} />
                <div className="mt-4 w-full">
                  <PrivacyMessage onFAQClick={handleFAQClick} />
                </div>
              </div>
            </ScrollArea>
          ) : (
            <ChatInterface />
          )}
        </div>
      </main>
      
      {showPrivacyFAQ && <PrivacyFAQ onClose={handleFAQClose} />}
    </div>
  );
};

export default Index;
