
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setApiKey, hasApiKey } from "@/utils/therapistAI";
import { Shield, Key, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ApiKeySetupProps {
  onApiKeySet: () => void;
}

const ApiKeySetup: React.FC<ApiKeySetupProps> = ({ onApiKeySet }) => {
  const [apiKey, setApiKeyValue] = useState("");
  const [showInput, setShowInput] = useState(false);
  const { toast } = useToast();
  
  // Call onApiKeySet on component mount since we have a default API key
  useEffect(() => {
    if (hasApiKey()) {
      onApiKeySet();
    }
  }, [onApiKeySet]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      setApiKey(apiKey.trim());
      onApiKeySet();
      toast({
        title: "API Key Connected",
        description: "Your Deepseek API key has been successfully connected.",
      });
      setShowInput(false);
    }
  };

  if (hasApiKey() && !showInput) {
    return (
      <div className="p-4 border rounded-lg bg-muted/40 mb-4">
        <div className="flex items-start space-x-4">
          <div className="bg-green-100 rounded-full p-2.5 mt-0.5">
            <Check className="w-5 h-5 text-green-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium mb-1">Deepseek AI Connected</h3>
            <p className="text-sm text-muted-foreground mb-3">
              MindEase is now using Deepseek AI to provide more personalized and thoughtful responses.
            </p>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowInput(true)}
              className="mt-2"
            >
              Change API Key
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-lg bg-muted/40 mb-4">
      <div className="flex items-start space-x-4">
        <div className="bg-secondary rounded-full p-2.5 mt-0.5">
          <Key className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium mb-1">Deepseek AI Connected</h3>
          <p className="text-sm text-muted-foreground mb-3">
            {showInput 
              ? "Enter a different Deepseek API key if you want to use your own." 
              : "MindEase is using Deepseek AI for more personalized responses."}
          </p>
          
          {!showInput ? (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowInput(true)}
              className="mt-2"
            >
              Change API Key
            </Button>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-2">
              <Input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKeyValue(e.target.value)}
                placeholder="Enter your Deepseek API key"
                className="w-full"
              />
              <div className="flex space-x-2">
                <Button type="submit" size="sm">
                  Connect
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowInput(false)}
                >
                  Cancel
                </Button>
              </div>
              <div className="flex items-center mt-2 text-xs text-muted-foreground">
                <Shield className="w-3 h-3 mr-1" />
                <span>Your API key is stored only in your browser's memory and never sent to our servers</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApiKeySetup;
