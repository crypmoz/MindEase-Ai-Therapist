
import React from "react";
import { Button } from "@/components/ui/button";
import { Heart, Shield, Sparkles } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="w-full max-w-md mx-auto px-4 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-3 text-balance bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
          Welcome to Deep Thought Sanctuary
        </h1>
        <p className="text-muted-foreground">
          A safe space to explore your thoughts and feelings
        </p>
      </div>

      <div className="space-y-6 mb-8">
        <div className="flex items-start space-x-4">
          <div className="bg-secondary rounded-full p-2.5 mt-0.5">
            <Heart className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium mb-1">Compassionate Listening</h3>
            <p className="text-sm text-muted-foreground">
              Share your thoughts freely in a judgment-free environment.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="bg-secondary rounded-full p-2.5 mt-0.5">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium mb-1">Complete Privacy</h3>
            <p className="text-sm text-muted-foreground">
              Your conversations are never saved or stored. Refresh or close to delete everything.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="bg-secondary rounded-full p-2.5 mt-0.5">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium mb-1">Insightful Guidance</h3>
            <p className="text-sm text-muted-foreground">
              Explore your feelings deeper with thoughtful questions and perspectives.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Button 
          onClick={onStart}
          size="lg" 
          className="rounded-full px-8 font-medium"
        >
          Start Talking
        </Button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
