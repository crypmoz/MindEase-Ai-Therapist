
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setApiKey, hasApiKey } from "@/utils/therapistAI";
import { Shield, Key } from "lucide-react";

interface ApiKeySetupProps {
  onApiKeySet: () => void;
}

const ApiKeySetup: React.FC<ApiKeySetupProps> = ({ onApiKeySet }) => {
  const [apiKey, setApiKeyValue] = useState("");
  const [showInput, setShowInput] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      setApiKey(apiKey.trim());
      onApiKeySet();
    }
  };

  if (hasApiKey()) {
    return null;
  }

  return (
    <div className="p-4 border rounded-lg bg-muted/40 mb-4">
      <div className="flex items-start space-x-4">
        <div className="bg-secondary rounded-full p-2.5 mt-0.5">
          <Key className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium mb-1">Enhance Your Experience</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Connect your OpenAI API key for more personalized and thoughtful responses.
            Your key is only stored in browser memory and will be cleared when you close the tab.
          </p>
          
          {!showInput ? (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowInput(true)}
              className="mt-2"
            >
              Connect AI
            </Button>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-2">
              <Input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKeyValue(e.target.value)}
                placeholder="Enter your OpenAI API key"
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
