
import React from "react";

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-background"></div>
      
      {/* Primary gradient blob */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
      
      {/* Secondary gradient blob */}
      <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-purple-200/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
    </div>
  );
};

export default AnimatedBackground;
