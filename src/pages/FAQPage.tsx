
import React from "react";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Shield, Lock, Clock, Server, FileText, User, AlertTriangle, Code, Eye } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const FAQPage: React.FC = () => {
  const faqs = [
    {
      id: "data-stored",
      icon: <Server className="h-5 w-5 text-primary" />,
      question: "Is my data stored anywhere?",
      answer: "No, MindEase is built with a zero-storage architecture. All conversations and interactions exist only in your browser's temporary memory (RAM) and are completely erased when you close or refresh the page. We do not use cookies, local storage, or any form of persistent storage for your conversation data."
    },
    {
      id: "privacy",
      icon: <Shield className="h-5 w-5 text-primary" />,
      question: "How does MindEase ensure my privacy?",
      answer: "Privacy is our priority. MindEase operates entirely in your browser with no server-side processing of your conversations. While individual messages are sent to the AI API for processing, their privacy policy prevents storage of your conversations. The API key you provide is stored locally in your browser and is never transmitted to our servers."
    },
    {
      id: "anonymous",
      icon: <User className="h-5 w-5 text-primary" />,
      question: "Do I need to create an account?",
      answer: "No, MindEase is completely anonymous and does not require any account creation or personal information. You can start using it immediately without signing up or providing any identifying information."
    },
    {
      id: "technical",
      icon: <Code className="h-5 w-5 text-primary" />,
      question: "How does the zero-storage architecture work technically?",
      answer: "MindEase uses React's state management system to keep all data in your browser's volatile memory (RAM). When you have a conversation, your messages are stored temporarily in a React state, which exists only while the app is running in your browser tab. When you close or refresh the page, this state is cleared, removing all traces of your conversation. We never write data to persistent storage like cookies, localStorage, or IndexedDB."
    },
    {
      id: "ai-processing",
      icon: <Eye className="h-5 w-5 text-primary" />,
      question: "How is my data processed by the AI?",
      answer: "When you send a message, it's transmitted to the Deepseek AI API along with a limited conversation history to provide context. The API processes your message and returns a response, but does not permanently store your conversations per their privacy policy. Your conversations remain private and are not used to train AI models without explicit consent."
    },
    {
      id: "deletion",
      icon: <Clock className="h-5 w-5 text-primary" />,
      question: "When exactly is my data deleted?",
      answer: "Your data is automatically and completely deleted in the following scenarios: 1) When you close the browser tab or window, 2) When you refresh the page, 3) When you navigate away from the MindEase application, or 4) When your browser session ends. There is no way to recover the data after deletion as it was never stored permanently."
    },
    {
      id: "medical-advice",
      icon: <AlertTriangle className="h-5 w-5 text-primary" />,
      question: "Can I use MindEase for medical advice?",
      answer: "No, MindEase is not a substitute for professional medical advice, diagnosis, or treatment. It's designed as a supportive tool for emotional well-being, but should not be used to address serious mental health concerns. If you're experiencing a mental health crisis or need medical assistance, please contact a healthcare professional or emergency services immediately."
    },
    {
      id: "open-source",
      icon: <FileText className="h-5 w-5 text-primary" />,
      question: "Is MindEase open source?",
      answer: "Yes, MindEase is an open-source project. You can inspect the code to verify our privacy claims and see exactly how your data is handled. Our commitment to privacy and security is built into the core architecture of the application, and we welcome scrutiny of our methods."
    },
    {
      id: "api-key",
      icon: <Lock className="h-5 w-5 text-primary" />,
      question: "How is my API key handled?",
      answer: "If you choose to use your own API key, it is stored securely in your browser's local storage on your device only. It is never sent to our servers or shared with any third parties. The key is only used to authenticate with the AI service when you send messages."
    }
  ];

  return (
    <PageLayout>
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="max-w-3xl mx-auto">
          <Card className="bg-card/80 backdrop-blur-sm border-border/50 mb-6">
            <CardHeader>
              <CardTitle>Privacy & Security FAQ</CardTitle>
              <CardDescription>
                Detailed answers to your questions about how MindEase protects your privacy and data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger className="flex items-center">
                      <span className="flex items-center">
                        {faq.icon}
                        <span className="ml-2">{faq.question}</span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm border-border/50 mb-6">
            <CardHeader>
              <CardTitle>Privacy Commitment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>
                  At MindEase, we believe that mental wellness requires a foundation of trust and privacy. That's why we've designed our platform with a zero-knowledge, zero-storage architecture that ensures your most personal thoughts remain private.
                </p>
                <p>
                  Unlike traditional mental health apps that collect and store user data, MindEase operates entirely in your browser's temporary memory. When you close or refresh the page, all traces of your conversation are immediately and permanently erased.
                </p>
                <p>
                  Our commitment to privacy isn't just a feature—it's the core principle around which we've built our entire application. We believe that everyone deserves a safe space to explore their thoughts and feelings without fear of surveillance or data collection.
                </p>
                <p className="font-medium">
                  Your thoughts belong to you, and only you.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </PageLayout>
  );
};

export default FAQPage;
