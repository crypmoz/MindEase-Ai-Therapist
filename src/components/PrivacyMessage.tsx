
import React from "react";
import { Link } from "react-router-dom";
import { Shield, Clock, Lock, Eye, AlertTriangle, ExternalLink, HelpCircle, Code } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface PrivacyMessageProps {
  onFAQClick?: () => void;
}

const PrivacyMessage: React.FC<PrivacyMessageProps> = ({ onFAQClick }) => {
  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <div className="glass rounded-xl p-4 text-sm text-muted-foreground border border-green-200 dark:border-green-900 bg-green-50/30 dark:bg-green-950/20">
        <div className="flex items-start space-x-3">
          <Shield className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
          <div>
            <p className="font-medium text-foreground mb-1">Your privacy is our priority</p>
            <p>
              No chat history is saved. Your conversations are completely private and anonymous.
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-3 mt-3">
          <Clock className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
          <div>
            <p>
              All messages are automatically deleted when you close or refresh this page.
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-3 mt-3">
          <Lock className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
          <div>
            <p>
              This conversation happens locally in your browser and is never transmitted to our servers.
            </p>
            
            <div className="flex flex-wrap mt-2 gap-x-2 gap-y-1">
              {/* Detailed Privacy Information Dialog */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="link" className="h-auto p-0 text-green-600 dark:text-green-400">
                    How it works
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Privacy Guarantee</DialogTitle>
                    <DialogDescription>
                      How we ensure your conversations remain private
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="flex items-start space-x-3">
                      <Eye className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-medium">No Data Storage</h3>
                        <p className="text-sm text-muted-foreground">
                          Your conversations are never stored on our servers. All conversation data
                          exists only in your browser's temporary memory and is completely erased when
                          you close or refresh the page.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-medium">API Interaction</h3>
                        <p className="text-sm text-muted-foreground">
                          While individual messages are sent to the Deepseek AI API for processing, their 
                          privacy policy prevents storage of your conversations. The API key you provide
                          is stored locally in your browser and is never transmitted to our servers.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Lock className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-medium">Technical Implementation</h3>
                        <p className="text-sm text-muted-foreground">
                          All conversation data is stored in React state, which means it only exists in 
                          your browser's RAM while you're using the app. This data is never written to 
                          persistent storage, cookies, or local storage.
                        </p>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              <span className="text-muted-foreground">•</span>
              
              {/* Link to Privacy Policy Page */}
              <Link to="/privacy">
                <Button variant="link" className="h-auto p-0 text-green-600 dark:text-green-400 flex items-center gap-1">
                  <span>Full privacy policy</span>
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </Link>
              
              <span className="text-muted-foreground">•</span>
              
              {/* Link to Technical Details */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="link" className="h-auto p-0 text-green-600 dark:text-green-400 flex items-center gap-1">
                    <span>Technical details</span>
                    <Code className="h-3 w-3" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="font-medium">Our Zero-Storage Architecture</h4>
                    <p className="text-xs text-muted-foreground">
                      This application is built using a client-side architecture with React state management. 
                      All data exists only in volatile memory (RAM) and is never persisted to storage:
                    </p>
                    <div className="text-xs bg-muted p-2 rounded-md text-muted-foreground font-mono">
                      • No database connections<br />
                      • No server-side storage<br />
                      • No cookies or localStorage<br />
                      • No session persistence<br />
                      • Memory cleared on page unload
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              
              <span className="text-muted-foreground">•</span>
              
              {/* FAQ Button */}
              <Button 
                variant="link" 
                className="h-auto p-0 text-green-600 dark:text-green-400 flex items-center gap-1"
                onClick={onFAQClick}
              >
                <span>Privacy FAQ</span>
                <HelpCircle className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyMessage;
