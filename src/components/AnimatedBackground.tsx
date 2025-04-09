
import React from "react";

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-primary/10 to-background animate-gradient-shift"></div>
      
      {/* Primary gradient blob */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float"></div>
      
      {/* Secondary gradient blobs */}
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-purple-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float animation-delay-2000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-blue-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float animation-delay-4000"></div>
      
      {/* Additional subtle blobs */}
      <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-pink-200/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-float animation-delay-3000"></div>
      <div className="absolute bottom-1/3 left-10 w-40 h-40 bg-indigo-200/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-float animation-delay-1000"></div>
    </div>
  );
};

export default AnimatedBackground;
