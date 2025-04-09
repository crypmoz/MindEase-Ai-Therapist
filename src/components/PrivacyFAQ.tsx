
import React from "react";
import { X, Shield, Lock, Server, Database, RefreshCw } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";

interface PrivacyFAQProps {
  onClose: () => void;
}

const PrivacyFAQ: React.FC<PrivacyFAQProps> = ({ onClose }) => {
  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              Privacy & Data Handling FAQ
            </DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription>
            Detailed information about how your data is handled in this application
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="general" className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="technical">Technical</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Is my conversation really private?</h3>
                <p className="text-muted-foreground">
                  Yes, absolutely. Your entire conversation happens solely in your browser's memory. 
                  No chat history is stored on any servers, and all data is cleared when you close 
                  or refresh the page.
                </p>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Do you collect my personal information?</h3>
                <p className="text-muted-foreground">
                  We collect nothing. No personal information, no account creation, no tracking cookies.
                  This application is designed to protect your privacy at all costs.
                </p>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Can my therapist access my conversations?</h3>
                <p className="text-muted-foreground">
                  Dr. Emma Clarke is not a real therapist but an AI assistant. No human therapist 
                  or any other person can access your conversations. The data never leaves your device 
                  except for direct API calls to generate responses, which are not stored.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="technical" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="border rounded-lg p-4 space-y-2">
                <div className="flex items-start gap-3">
                  <Server className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Client-Side Architecture</h3>
                    <p className="text-muted-foreground">
                      This application uses a client-side architecture, meaning all processing happens in your 
                      browser. Your conversation data is stored only in your device's temporary memory (RAM) 
                      through React state management and is never persisted.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4 space-y-2">
                <div className="flex items-start gap-3">
                  <Database className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">No Database Integration</h3>
                    <p className="text-muted-foreground">
                      Unlike most applications, we have intentionally designed this without any database 
                      integration. This architectural choice means your conversation data cannot be 
                      stored anywhere other than in your browser's temporary memory.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4 space-y-2">
                <div className="flex items-start gap-3">
                  <RefreshCw className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Memory Clearing Process</h3>
                    <p className="text-muted-foreground">
                      When you close or refresh the page, all memory is immediately cleared through the 
                      browser's natural memory management process. We also actively set all data to null 
                      on page unload, ensuring complete data removal.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">How are my messages processed?</h3>
                <p className="text-muted-foreground">
                  Your messages are sent directly to the AI provider's API to generate responses. This is 
                  necessary for the AI to function. However, the API does not store your conversation history, 
                  and each message is processed independently. The API key you provide remains in your browser 
                  and is not transmitted to our servers.
                </p>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Is the connection secure?</h3>
                <p className="text-muted-foreground">
                  Yes, all communication with the AI API uses encrypted HTTPS connections, ensuring 
                  that your messages cannot be intercepted during transmission.
                </p>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">What additional steps can I take for privacy?</h3>
                <p className="text-muted-foreground">
                  For maximum privacy, consider using incognito/private browsing mode, which clears 
                  all local data when the window is closed. You can also manually clear your browser 
                  cache after using the application.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="pt-4 border-t mt-4">
          <p className="text-sm text-muted-foreground text-center">
            By using MindEase, you can be confident that your personal thoughts and feelings 
            remain completely private and secure.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PrivacyFAQ;
