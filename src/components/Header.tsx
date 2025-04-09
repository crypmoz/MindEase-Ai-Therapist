
import React from "react";
import { Brain } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="w-full py-4 px-6 flex items-center justify-center sm:justify-start">
      <div className="flex items-center space-x-2">
        <Brain className="w-8 h-8 text-primary" />
        <h1 className="text-2xl font-semibold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
          Deep Thought Sanctuary
        </h1>
      </div>
    </header>
  );
};

export default Header;
