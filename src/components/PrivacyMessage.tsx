
import React from "react";
import { Shield, Clock } from "lucide-react";

const PrivacyMessage: React.FC = () => {
  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <div className="glass rounded-xl p-4 text-sm text-muted-foreground">
        <div className="flex items-start space-x-3">
          <Shield className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <p className="font-medium text-foreground mb-1">Your privacy is our priority</p>
            <p>
              No chat history is saved. Your conversations are completely private and anonymous.
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-3 mt-3">
          <Clock className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <p>
              All messages are automatically deleted when you close or refresh this page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyMessage;
