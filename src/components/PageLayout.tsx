
import React from "react";
import Navigation from "./Navigation";
import AnimatedBackground from "./AnimatedBackground";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <AnimatedBackground />
      <Navigation />
      <main className="flex-1 p-4 md:p-8 overflow-auto">{children}</main>
    </div>
  );
};

export default PageLayout;
