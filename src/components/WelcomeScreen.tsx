
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Lock, CloudOff } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="w-full max-w-md mx-auto px-4 animate-fade-in">
      <div className="text-center mb-8">
        <div className="mb-4 flex justify-center">
          <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-md">
            <Lock className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-2 text-foreground">
          Welcome to MindEase
        </h1>
        <p className="text-muted-foreground">
          Your private space to explore thoughts and feelings
        </p>
      </div>

      <div className="space-y-3 mb-8">
        <div className="flex items-center p-3 border border-border rounded-lg">
          <div className="bg-primary/10 rounded-full p-2 mr-3">
            <Shield className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-sm">
              Complete anonymity - no account needed, no data stored
            </p>
          </div>
        </div>
        
        <div className="flex items-center p-3 border border-border rounded-lg">
          <div className="bg-primary/10 rounded-full p-2 mr-3">
            <Lock className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-sm">
              Conversations never saved - refresh to delete everything
            </p>
          </div>
        </div>
        
        <div className="flex items-center p-3 border border-border rounded-lg">
          <div className="bg-primary/10 rounded-full p-2 mr-3">
            <CloudOff className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-sm">
              No cloud storage - everything stays in your browser
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8 p-3 border border-dashed border-primary/30 rounded-lg bg-primary/5">
        <p className="text-sm text-center">
          Your privacy is our priority. We've built this app with a zero-knowledge architecture.
        </p>
      </div>

      <div className="flex justify-center">
        <Button 
          onClick={onStart}
          size="lg" 
          className="rounded-full px-6 shadow-sm"
        >
          Start Private Conversation
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
