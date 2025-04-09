
import React from "react";
import { Activity, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface DataProcessingIndicatorProps {
  status: "idle" | "processing" | "deleting";
  className?: string;
}

const DataProcessingIndicator: React.FC<DataProcessingIndicatorProps> = ({ 
  status,
  className
}) => {
  if (status === "idle") return null;
  
  return (
    <div className={cn(
      "fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium shadow-md",
      status === "processing" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300" : 
      "bg-red-100 text-red-800 dark:bg-red-900/60 dark:text-red-300",
      className
    )}>
      {status === "processing" ? (
        <>
          <Activity className="h-3.5 w-3.5 animate-pulse" />
          <span>Processing locally...</span>
        </>
      ) : (
        <>
          <CheckCircle className="h-3.5 w-3.5" />
          <span>Clearing data...</span>
        </>
      )}
    </div>
  );
};

export default DataProcessingIndicator;
