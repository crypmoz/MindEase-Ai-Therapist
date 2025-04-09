
import React from "react";
import { Button } from "@/components/ui/button";
import { Heart, Shield, Sparkles, ArrowRight, Lock, CloudOff, Eye, UserRound } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="w-full max-w-md mx-auto px-4 animate-fade-in">
      <div className="text-center mb-6">
        <div className="mb-4 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/90 to-purple-500 flex items-center justify-center shadow-lg shadow-primary/30 hover:shadow-primary/40 transition-all duration-300 hover:scale-105">
            <Lock className="w-10 h-10 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-3 text-balance bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
          Welcome to MindEase
        </h1>
        <p className="text-muted-foreground text-lg">
          Your <span className="font-semibold text-primary">completely private</span> space to explore thoughts and feelings
        </p>
      </div>

      <div className="space-y-4 mb-8">
        <Card className="overflow-hidden border-primary/20 shadow-md hover:shadow-lg hover:border-primary/30 transition-all duration-300 group">
          <CardContent className="p-0">
            <div className="flex items-center p-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="bg-gradient-to-br from-primary/20 to-pink-300/20 rounded-full p-3 mr-4 group-hover:scale-110 transition-transform duration-300">
                <Eye className="w-5 h-5 text-primary" />
              </div>
              <div className="z-10">
                <h3 className="font-medium mb-1">Complete Anonymity</h3>
                <p className="text-sm text-muted-foreground">
                  No account needed, no personal information collected.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden border-primary/20 shadow-md hover:shadow-lg hover:border-primary/30 transition-all duration-300 group">
          <CardContent className="p-0">
            <div className="flex items-center p-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="bg-gradient-to-br from-blue-300/20 to-primary/20 rounded-full p-3 mr-4 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div className="z-10">
                <h3 className="font-medium mb-1">Zero Data Storage</h3>
                <p className="text-sm text-muted-foreground">
                  Your conversations are never saved. Close or refresh to delete everything.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden border-primary/20 shadow-md hover:shadow-lg hover:border-primary/30 transition-all duration-300 group">
          <CardContent className="p-0">
            <div className="flex items-center p-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="bg-gradient-to-br from-purple-300/20 to-primary/20 rounded-full p-3 mr-4 group-hover:scale-110 transition-transform duration-300">
                <CloudOff className="w-5 h-5 text-primary" />
              </div>
              <div className="z-10">
                <h3 className="font-medium mb-1">No Cloud Storage</h3>
                <p className="text-sm text-muted-foreground">
                  Conversations happen only in your browser, never on our servers.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden border-primary/20 shadow-md hover:shadow-lg hover:border-primary/30 transition-all duration-300 group">
          <CardContent className="p-0">
            <div className="flex items-center p-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="bg-gradient-to-br from-indigo-300/20 to-primary/20 rounded-full p-3 mr-4 group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-5 h-5 text-primary" />
              </div>
              <div className="z-10">
                <h3 className="font-medium mb-1">Safe Space</h3>
                <p className="text-sm text-muted-foreground">
                  Share your thoughts freely in a judgment-free environment.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="relative my-8 py-4 px-6 border border-dashed border-primary/30 rounded-lg bg-primary/5">
        <div className="absolute -top-3 left-4 px-2 bg-background text-xs font-medium text-primary">PRIVACY GUARANTEE</div>
        <p className="text-sm text-center">
          Your privacy is our top priority. We've built this app with a <span className="font-semibold">zero-knowledge architecture</span> — we can't access your conversations even if we wanted to.
        </p>
      </div>

      <div className="flex justify-center">
        <Button 
          onClick={onStart}
          size="lg" 
          className="rounded-full px-8 py-6 font-medium group shadow-md hover:shadow-lg transition-all duration-300 text-white"
        >
          Start Private Conversation
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
