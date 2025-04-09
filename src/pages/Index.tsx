
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import WelcomeScreen from "@/components/WelcomeScreen";
import ChatInterface from "@/components/ChatInterface";
import AnimatedBackground from "@/components/AnimatedBackground";
import PrivacyMessage from "@/components/PrivacyMessage";
import PrivacyFAQ from "@/components/PrivacyFAQ";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, HelpCircle } from "lucide-react";

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}> = ({ icon, title, description, link }) => (
  <Link to={link} className="block">
    <Card className="h-full hover:shadow-md transition-all border-border/50 bg-card/70 backdrop-blur-sm hover:bg-card/90">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            {icon}
          </div>
          <h3 className="font-medium text-lg mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </CardContent>
    </Card>
  </Link>
);

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
        <div className="w-full max-w-xl flex flex-col bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg rounded-lg overflow-hidden border border-white/30 dark:border-gray-800/30">
          {!showChat ? (
            <ScrollArea className="flex-1 h-[calc(100vh-10rem)]">
              <div className="flex-1 flex flex-col items-center justify-center p-4">
                <WelcomeScreen onStart={handleStart} />
                
                {/* Features grid */}
                <div className="w-full mt-8">
                  <h2 className="text-center text-lg font-medium mb-4">Explore Our Features</h2>
                  <div className="grid grid-cols-2 gap-3">
                    <FeatureCard
                      icon={<Heart className="h-6 w-6 text-primary" />}
                      title="Resources"
                      description="Mental health resources"
                      link="/resources"
                    />
                    <FeatureCard
                      icon={<HelpCircle className="h-6 w-6 text-primary" />}
                      title="Privacy FAQ"
                      description="How we protect your data"
                      link="/faq"
                    />
                  </div>
                </div>
                
                <div className="mt-6 w-full">
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
