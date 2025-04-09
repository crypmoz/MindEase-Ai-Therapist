
import React, { useState, useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Smile, Frown, Meh, TrendingUp, Save, BarChart4 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface MoodRecord {
  mood: "happy" | "neutral" | "sad";
  timestamp: number;
  note: string;
}

const MoodTracker: React.FC = () => {
  const [moods, setMoods] = useState<MoodRecord[]>([]);
  const [currentMood, setCurrentMood] = useState<"happy" | "neutral" | "sad" | null>(null);
  const [note, setNote] = useState("");

  const handleMoodSelect = (mood: "happy" | "neutral" | "sad") => {
    setCurrentMood(mood);
  };

  const saveMood = () => {
    if (!currentMood) {
      toast({
        title: "No mood selected",
        description: "Please select a mood before saving",
        variant: "destructive",
      });
      return;
    }

    const newMood: MoodRecord = {
      mood: currentMood,
      timestamp: Date.now(),
      note: note.trim(),
    };

    setMoods((prev) => [...prev, newMood]);
    setCurrentMood(null);
    setNote("");

    toast({
      title: "Mood recorded",
      description: "Your mood has been recorded for this session",
    });
  };

  const getMoodIcon = (mood: "happy" | "neutral" | "sad") => {
    switch (mood) {
      case "happy":
        return <Smile className="h-6 w-6 text-green-500" />;
      case "neutral":
        return <Meh className="h-6 w-6 text-amber-500" />;
      case "sad":
        return <Frown className="h-6 w-6 text-red-500" />;
    }
  };

  const getMoodText = (mood: "happy" | "neutral" | "sad") => {
    switch (mood) {
      case "happy":
        return "Happy";
      case "neutral":
        return "Neutral";
      case "sad":
        return "Sad";
    }
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <PageLayout>
      <div className="max-w-3xl mx-auto">
        <Card className="bg-card/80 backdrop-blur-sm border-border/50 mb-6">
          <CardHeader>
            <CardTitle>Mood Tracker</CardTitle>
            <CardDescription>
              Track your mood over this session to help identify patterns and triggers.
              Remember, this data is not saved beyond your current session.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center gap-4 mb-6">
              <Button
                variant={currentMood === "happy" ? "default" : "outline"}
                className={`flex flex-col items-center p-6 h-auto ${
                  currentMood === "happy" ? "ring-2 ring-green-500" : ""
                }`}
                onClick={() => handleMoodSelect("happy")}
              >
                <Smile className="h-12 w-12 mb-2" />
                <span>Happy</span>
              </Button>
              <Button
                variant={currentMood === "neutral" ? "default" : "outline"}
                className={`flex flex-col items-center p-6 h-auto ${
                  currentMood === "neutral" ? "ring-2 ring-amber-500" : ""
                }`}
                onClick={() => handleMoodSelect("neutral")}
              >
                <Meh className="h-12 w-12 mb-2" />
                <span>Neutral</span>
              </Button>
              <Button
                variant={currentMood === "sad" ? "default" : "outline"}
                className={`flex flex-col items-center p-6 h-auto ${
                  currentMood === "sad" ? "ring-2 ring-red-500" : ""
                }`}
                onClick={() => handleMoodSelect("sad")}
              >
                <Frown className="h-12 w-12 mb-2" />
                <span>Sad</span>
              </Button>
            </div>
            <div className="space-y-4">
              <Textarea
                placeholder="What's contributing to your mood right now? (optional)"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="resize-none min-h-[100px]"
              />
              <Button onClick={saveMood} className="w-full">
                <Save className="mr-2 h-4 w-4" />
                Record Mood
              </Button>
            </div>
          </CardContent>
        </Card>

        {moods.length > 0 && (
          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Your Mood Timeline</CardTitle>
                <div className="flex items-center gap-1 text-sm">
                  <BarChart4 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{moods.length} entries</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative pl-6 border-l-2 border-border space-y-4 max-h-[300px] overflow-y-auto pr-2">
                {moods.map((record, index) => (
                  <div 
                    key={index} 
                    className="relative pb-4"
                  >
                    <div 
                      className="absolute -left-[1.15rem] p-1 rounded-full bg-background border-2 border-border"
                    >
                      {getMoodIcon(record.mood)}
                    </div>
                    <div className="ml-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{formatTime(record.timestamp)}</span>
                        <span className="text-sm text-muted-foreground">{getMoodText(record.mood)}</span>
                      </div>
                      {record.note && (
                        <p className="text-sm mt-1 text-muted-foreground">{record.note}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-xs text-muted-foreground">
                Remember, this data is only stored temporarily in your browser's memory and will be erased when you close or refresh the page.
              </p>
            </CardFooter>
          </Card>
        )}
      </div>
    </PageLayout>
  );
};

export default MoodTracker;
