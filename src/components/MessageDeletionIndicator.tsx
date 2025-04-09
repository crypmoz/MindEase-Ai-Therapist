
import React, { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";

const MessageDeletionIndicator: React.FC = () => {
  const [showIndicator, setShowIndicator] = useState(false);
  
  // Show the indicator when the user is about to navigate away or refresh
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      setShowIndicator(true);
      // This is just for visual feedback before the page unloads
      // In a real scenario, the page would unload before this timeout completes
      setTimeout(() => setShowIndicator(false), 2000);
      
      // Standard behavior for beforeunload events
      e.preventDefault();
      e.returnValue = '';
      return '';
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  
  if (!showIndicator) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background rounded-lg p-6 flex flex-col items-center max-w-xs mx-auto text-center">
        <Trash2 className="h-12 w-12 text-red-500 animate-pulse mb-4" />
        <h3 className="text-lg font-semibold mb-2">Deleting All Messages</h3>
        <p className="text-sm text-muted-foreground">
          Your conversation is being permanently deleted from memory...
        </p>
      </div>
    </div>
  );
};

export default MessageDeletionIndicator;
