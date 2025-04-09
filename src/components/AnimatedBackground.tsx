
import React from "react";
import { Lock, Shield, Eye } from "lucide-react";

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-background animate-gradient-shift"></div>
      
      {/* Primary gradient blob */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float"></div>
      
      {/* Secondary gradient blobs */}
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-purple-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float animation-delay-2000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-blue-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float animation-delay-4000"></div>
      
      {/* Additional subtle blobs */}
      <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-pink-200/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-float animation-delay-3000"></div>
      <div className="absolute bottom-1/3 left-10 w-40 h-40 bg-indigo-200/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-float animation-delay-1000"></div>
      
      {/* Privacy icons floating around (very subtle) */}
      <div className="absolute top-[15%] right-[10%] text-primary/5 animate-float animation-delay-1500">
        <Shield className="w-24 h-24" />
      </div>
      <div className="absolute bottom-[20%] right-[20%] text-primary/5 animate-float animation-delay-3500">
        <Lock className="w-16 h-16" />
      </div>
      <div className="absolute top-[40%] left-[15%] text-primary/5 animate-float animation-delay-2500">
        <Eye className="w-20 h-20" />
      </div>
    </div>
  );
};

export default AnimatedBackground;
