
import React from "react";
import Header from "@/components/Header";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Shield, Lock, Eye, AlertTriangle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedBackground />
      <Header />
      
      <main className="flex-1 flex items-start justify-center p-4 pt-8">
        <div className="w-full max-w-3xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm shadow-xl rounded-xl overflow-hidden border p-6 md:p-8">
          <div className="mb-6 flex items-center">
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-1">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-center flex-1 pr-8">Privacy Policy</h1>
          </div>
          
          <div className="space-y-8">
            <section>
              <div className="flex items-center gap-2 mb-3">
                <Shield className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold">Our Privacy Commitment</h2>
              </div>
              <p className="text-muted-foreground">
                MindEase is designed with privacy as the foundational principle. We believe that conversations with an AI therapist should be as private as those with a human therapist, which is why we've built this application to ensure your data remains completely private.
              </p>
            </section>
            
            <section>
              <div className="flex items-center gap-2 mb-3">
                <Eye className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold">What Data We Collect</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                <strong>Simply put: we collect nothing.</strong> MindEase does not collect, store, or transmit any of your conversations or personal information.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>No chat logs are stored on our servers</li>
                <li>No cookies are used to track your conversation history</li>
                <li>No account creation is required</li>
                <li>No personally identifiable information is collected</li>
              </ul>
            </section>
            
            <section>
              <div className="flex items-center gap-2 mb-3">
                <Lock className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold">Technical Implementation</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                Here's how we technically ensure your privacy:
              </p>
              <div className="space-y-4">
                <div className="p-4 border border-border rounded-lg">
                  <h3 className="font-medium mb-2">In-Memory Processing Only</h3>
                  <p className="text-sm text-muted-foreground">
                    All conversation data exists exclusively in your browser's RAM (React state). When you close or refresh the tab, this memory is immediately cleared.
                  </p>
                </div>
                
                <div className="p-4 border border-border rounded-lg">
                  <h3 className="font-medium mb-2">API Interactions</h3>
                  <p className="text-sm text-muted-foreground">
                    While we use the Deepseek API to generate responses, the data sent to this API is not stored beyond the processing of each individual request. The API key you provide remains in your browser and is not transmitted to our servers.
                  </p>
                </div>
                
                <div className="p-4 border border-border rounded-lg">
                  <h3 className="font-medium mb-2">No Backend Storage</h3>
                  <p className="text-sm text-muted-foreground">
                    MindEase is a client-side application. We intentionally designed it without a database or server-side storage mechanisms to ensure your conversations cannot be recorded.
                  </p>
                </div>
              </div>
            </section>
            
            <section>
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold">Important Considerations</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                While we've designed MindEase to be private, please be aware of the following:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>Your browser may temporarily cache web pages. We recommend using private/incognito browsing for even greater privacy.</li>
                <li>This application is not a replacement for professional mental health services, especially in crisis situations.</li>
                <li>For serious mental health concerns, please contact a licensed professional or a crisis helpline.</li>
              </ul>
            </section>
            
            <div className="mt-8 p-4 border border-green-200 dark:border-green-900 bg-green-50/30 dark:bg-green-950/20 rounded-lg">
              <p className="text-center font-medium">
                By using MindEase, you can be confident that your personal thoughts and feelings remain completely private.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
