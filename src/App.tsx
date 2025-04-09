
import * as React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import MessageDeletionIndicator from "./components/MessageDeletionIndicator";
import Journal from "./pages/Journal";
import MentalHealthResources from "./pages/MentalHealthResources";
import BreathingExercises from "./pages/BreathingExercises";
import MoodTracker from "./pages/MoodTracker";
import GuidedMeditation from "./pages/GuidedMeditation";
import FAQPage from "./pages/FAQPage";
import { ThemeProvider } from "./components/ThemeProvider";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <MessageDeletionIndicator />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/resources" element={<MentalHealthResources />} />
              <Route path="/breathing" element={<BreathingExercises />} />
              <Route path="/mood" element={<MoodTracker />} />
              <Route path="/meditation" element={<GuidedMeditation />} />
              <Route path="/faq" element={<FAQPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
