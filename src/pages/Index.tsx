
import React, { useState } from "react";
import Header from "@/components/Header";
import WelcomeScreen from "@/components/WelcomeScreen";
import ChatInterface from "@/components/ChatInterface";
import AnimatedBackground from "@/components/AnimatedBackground";

const Index: React.FC = () => {
  const [showChat, setShowChat] = useState(false);

  const handleStart = () => {
    setShowChat(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedBackground />
      <Header />
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl h-[calc(100vh-theme(space.20))] flex flex-col bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm shadow-xl rounded-xl overflow-hidden border">
          {!showChat ? (
            <div className="flex-1 flex items-center justify-center p-4">
              <WelcomeScreen onStart={handleStart} />
            </div>
          ) : (
            <ChatInterface />
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
