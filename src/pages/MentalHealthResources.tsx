
import React from "react";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Phone, Globe, BookOpen, Headphones, MessageCircle, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const ResourceCard: React.FC<{
  title: string;
  description: string;
  link: string;
  icon: React.ReactNode;
}> = ({ title, description, link, icon }) => (
  <Card className="overflow-hidden hover:shadow-md transition-shadow">
    <CardHeader className="bg-primary/10 py-3">
      <CardTitle className="flex items-center text-lg font-medium">
        {icon}
        <span className="ml-2">{title}</span>
      </CardTitle>
    </CardHeader>
    <CardContent className="p-4">
      <CardDescription className="mb-4">{description}</CardDescription>
      <Button 
        variant="outline" 
        className="w-full"
        onClick={() => window.open(link, '_blank')}
      >
        Visit Resource
        <ExternalLink className="h-4 w-4 ml-2" />
      </Button>
    </CardContent>
  </Card>
);

const MentalHealthResources: React.FC = () => {
  const resources = [
    {
      title: "National Suicide Prevention Lifeline",
      description: "24/7, free and confidential support for people in distress, prevention and crisis resources.",
      link: "https://suicidepreventionlifeline.org/",
      icon: <Phone className="h-5 w-5 text-primary" />,
    },
    {
      title: "Mental Health America",
      description: "The nation's leading community-based nonprofit dedicated to addressing the needs of those living with mental illness.",
      link: "https://www.mhanational.org/",
      icon: <Heart className="h-5 w-5 text-primary" />,
    },
    {
      title: "Crisis Text Line",
      description: "Text HOME to 741741 to connect with a Crisis Counselor. Free 24/7 support.",
      link: "https://www.crisistextline.org/",
      icon: <MessageCircle className="h-5 w-5 text-primary" />,
    },
    {
      title: "NIMH - National Institute of Mental Health",
      description: "The lead federal agency for research on mental disorders, providing information on various mental health topics.",
      link: "https://www.nimh.nih.gov/",
      icon: <BookOpen className="h-5 w-5 text-primary" />,
    },
    {
      title: "Calm App",
      description: "Meditation and sleep stories to help you relax, focus, and sleep better.",
      link: "https://www.calm.com/",
      icon: <Headphones className="h-5 w-5 text-primary" />,
    },
    {
      title: "7 Cups",
      description: "Online therapy and free support. Connect to caring listeners for emotional support.",
      link: "https://www.7cups.com/",
      icon: <Globe className="h-5 w-5 text-primary" />,
    },
  ];

  return (
    <PageLayout>
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="max-w-4xl mx-auto p-4">
          <Card className="mb-6 bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle>Mental Health Resources</CardTitle>
              <CardDescription>
                External resources and support networks available to help you on your mental health journey.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Below are trusted resources where you can find additional support. Remember, seeking help is a sign of strength, not weakness.
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {resources.map((resource, index) => (
              <ResourceCard key={index} {...resource} />
            ))}
          </div>

          <Card className="mt-6 bg-card/80 backdrop-blur-sm border-border/50">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">
                <strong>Disclaimer:</strong> The resources listed here are provided for informational purposes only. MindEase is not affiliated with these organizations and does not endorse any specific external service. If you're experiencing a medical emergency, please dial your local emergency number immediately.
              </p>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </PageLayout>
  );
};

export default MentalHealthResources;
