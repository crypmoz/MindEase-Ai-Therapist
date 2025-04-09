
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Check, Cpu, Settings } from "lucide-react";
import { setApiKey, hasApiKey, setModel, getModel } from "@/utils/therapistAI";
import { useToast } from "@/hooks/use-toast";

interface ModelSelectionBannerProps {
  onApiKeySet: () => void;
}

const ModelSelectionBanner: React.FC<ModelSelectionBannerProps> = ({ onApiKeySet }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKeyValue] = useState("");
  const [selectedModel, setSelectedModel] = useState(getModel());
  const { toast } = useToast();

  const models = [
    { id: "deepseek-chat", name: "Deepseek Chat" },
    { id: "deepseek-coder", name: "Deepseek Coder" },
    { id: "deepseek-lite", name: "Deepseek Lite" },
    { id: "custom", name: "Custom Model" }
  ];

  const handleApiKeySubmit = () => {
    if (apiKey.trim()) {
      setApiKey(apiKey.trim());
      onApiKeySet();
      toast({
        title: "API Key Connected",
        description: "Your API key has been successfully connected.",
      });
      setShowSettings(false);
    }
  };

  const handleModelChange = (value: string) => {
    setSelectedModel(value);
    setModel(value);
    toast({
      title: "Model Updated",
      description: `Now using ${models.find(m => m.id === value)?.name || value}.`,
    });
  };

  return (
    <div className="border-b px-3 py-1.5 bg-muted/20 flex items-center justify-between">
      <div className="flex items-center text-xs text-muted-foreground gap-1.5">
        <Cpu className="w-3 h-3" />
        <span>AI Assistant</span>
        {hasApiKey() && <Check className="w-3 h-3 text-green-500" />}
      </div>
      
      <div className="flex items-center gap-2">
        {showSettings ? (
          <>
            <div className="flex items-center gap-2">
              <Select defaultValue={selectedModel} onValueChange={handleModelChange}>
                <SelectTrigger className="h-7 w-32 text-xs">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  {models.map((model) => (
                    <SelectItem key={model.id} value={model.id} className="text-xs">
                      {model.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {selectedModel === 'custom' && (
                <Input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKeyValue(e.target.value)}
                  placeholder="Enter API key"
                  className="h-7 w-36 text-xs"
                />
              )}
              
              {selectedModel === 'custom' && (
                <Button size="sm" variant="outline" className="h-7 text-xs px-2" onClick={handleApiKeySubmit}>
                  Set
                </Button>
              )}
              
              <Button size="sm" variant="ghost" className="h-7 text-xs p-0 w-7" onClick={() => setShowSettings(false)}>
                <Check className="h-3.5 w-3.5" />
              </Button>
            </div>
          </>
        ) : (
          <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={() => setShowSettings(true)}>
            <Settings className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ModelSelectionBanner;
