
import React from "react";

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-background animate-gradient-shift"></div>
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float"></div>
      <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-purple-200/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float animation-delay-2000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-60 h-60 bg-blue-200/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float animation-delay-4000"></div>
    </div>
  );
};

export default AnimatedBackground;
