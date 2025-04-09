
import React, { useState, useRef, useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Play, 
  Pause, 
  VolumeX, 
  Volume2, 
  RefreshCcw,
  Sparkles,
  Clock,
  Moon,
  Sun
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Meditation {
  id: string;
  title: string;
  description: string;
  duration: number;
  steps: string[];
}

const meditations: Meditation[] = [
  {
    id: "body-scan",
    title: "Body Scan Meditation",
    description: "A gradual scan of your body to release tension and promote relaxation",
    duration: 300, // 5 minutes in seconds
    steps: [
      "Find a comfortable position. You can lie down or sit in a chair.",
      "Take a few deep breaths, inhaling through your nose and exhaling through your mouth.",
      "Bring your awareness to your feet. Notice any sensations - warmth, coolness, pressure.",
      "Slowly move your attention up to your ankles, calves, and knees.",
      "Continue up through your thighs, hips, and lower back.",
      "Feel your abdomen rise and fall with each breath.",
      "Bring awareness to your chest, upper back, and shoulders. Release any tension.",
      "Move to your arms, down to your hands and fingers.",
      "Finally, bring attention to your neck, face, and head.",
      "Take a moment to feel your entire body as a whole.",
      "Notice how you feel different from when you started.",
      "When you're ready, gently open your eyes."
    ]
  },
  {
    id: "mindful-breathing",
    title: "Mindful Breathing",
    description: "Focus on your breath to anchor yourself in the present moment",
    duration: 180, // 3 minutes in seconds
    steps: [
      "Sit comfortably with your back straight and shoulders relaxed.",
      "Close your eyes or maintain a soft gaze.",
      "Take a deep breath in through your nose, filling your lungs completely.",
      "Exhale slowly through your mouth, releasing all the air.",
      "Return to natural breathing, focusing on the sensation of air entering and leaving your nostrils.",
      "Notice the rise and fall of your chest and abdomen.",
      "When your mind wanders, gently bring your focus back to your breath.",
      "Continue observing your breath without trying to change it.",
      "Just breathe and be present in this moment.",
      "When you're ready, gently open your eyes."
    ]
  },
  {
    id: "loving-kindness",
    title: "Loving Kindness Meditation",
    description: "Cultivate feelings of compassion for yourself and others",
    duration: 240, // 4 minutes in seconds
    steps: [
      "Find a comfortable seated position and close your eyes.",
      "Take a few deep breaths to center yourself.",
      "Bring to mind someone you care about deeply.",
      "Silently repeat: 'May you be happy. May you be healthy. May you be safe. May you live with ease.'",
      "Now direct these wishes toward yourself: 'May I be happy. May I be healthy. May I be safe. May I live with ease.'",
      "Extend these wishes to someone you have neutral feelings about.",
      "If you feel ready, extend these wishes to someone with whom you have difficulty.",
      "Finally, extend these wishes to all beings everywhere: 'May all beings be happy, healthy, safe, and live with ease.'",
      "Rest in the feeling of universal goodwill.",
      "When you're ready, gently open your eyes."
    ]
  }
];

const GuidedMeditation: React.FC = () => {
  const [selectedMeditation, setSelectedMeditation] = useState(meditations[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [backgroundSounds, setBackgroundSounds] = useState(true);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  
  const intervalRef = useRef<number | null>(null);
  const stepTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/ambient-meditation.mp3"); // This would be a real audio file in a production app
    audioRef.current.loop = true;
    audioRef.current.volume = volume / 100;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
      
      if (stepTimeoutRef.current) {
        clearTimeout(stepTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (backgroundSounds && isPlaying && audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio play error:", e));
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [backgroundSounds, isPlaying]);

  useEffect(() => {
    setCurrentTime(0);
    setCurrentStepIndex(0);
    setIsPlaying(false);
    
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    if (stepTimeoutRef.current) {
      clearTimeout(stepTimeoutRef.current);
      stepTimeoutRef.current = null;
    }
  }, [selectedMeditation]);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = window.setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= selectedMeditation.duration) {
            if (intervalRef.current) window.clearInterval(intervalRef.current);
            setIsPlaying(false);
            return selectedMeditation.duration;
          }
          return prev + 1;
        });
      }, 1000);
      
      // Schedule step changes
      const stepsCount = selectedMeditation.steps.length;
      const timePerStep = selectedMeditation.duration / stepsCount;
      
      for (let i = 1; i < stepsCount; i++) {
        stepTimeoutRef.current = setTimeout(() => {
          setCurrentStepIndex(i);
        }, timePerStep * i * 1000);
      }
    } else if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
      
      if (stepTimeoutRef.current) {
        clearTimeout(stepTimeoutRef.current);
        stepTimeoutRef.current = null;
      }
    }
    
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      if (stepTimeoutRef.current) clearTimeout(stepTimeoutRef.current);
    };
  }, [isPlaying, selectedMeditation]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const resetMeditation = () => {
    setCurrentTime(0);
    setCurrentStepIndex(0);
    setIsPlaying(false);
    
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    if (stepTimeoutRef.current) {
      clearTimeout(stepTimeoutRef.current);
      stepTimeoutRef.current = null;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto">
        <Tabs defaultValue={meditations[0].id}>
          <Card className="bg-card/80 backdrop-blur-sm border-border/50 mb-6">
            <CardHeader>
              <CardTitle>Guided Meditation</CardTitle>
              <CardDescription>
                Take a moment to pause, breathe, and reconnect with yourself through these guided meditations
              </CardDescription>
              <TabsList className="mt-2">
                {meditations.map((med) => (
                  <TabsTrigger 
                    key={med.id} 
                    value={med.id}
                    onClick={() => setSelectedMeditation(med)}
                  >
                    {med.title}
                  </TabsTrigger>
                ))}
              </TabsList>
            </CardHeader>
            
            {meditations.map((med) => (
              <TabsContent key={med.id} value={med.id} className="space-y-4">
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <div className="mb-6">
                        <h3 className="text-lg font-medium mb-2 flex items-center">
                          <Sparkles className="mr-2 h-5 w-5 text-primary" />
                          {med.title}
                        </h3>
                        <p className="text-muted-foreground">{med.description}</p>
                        <div className="flex items-center mt-2 text-sm">
                          <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{Math.floor(med.duration / 60)} minutes</span>
                        </div>
                      </div>
                      
                      <div className="mb-6 p-4 border rounded-lg bg-primary/5">
                        <h4 className="font-medium mb-2">Current Guidance:</h4>
                        <p className="text-lg">{med.steps[currentStepIndex]}</p>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{formatTime(currentTime)}</span>
                            <span>{formatTime(med.duration)}</span>
                          </div>
                          <Progress value={(currentTime / med.duration) * 100} />
                        </div>
                        
                        <div className="flex justify-center gap-4">
                          <Button onClick={togglePlay} size="lg" className="w-32">
                            {isPlaying ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
                            {isPlaying ? "Pause" : "Start"}
                          </Button>
                          <Button variant="outline" onClick={resetMeditation} disabled={currentTime === 0} size="lg">
                            <RefreshCcw className="mr-2 h-4 w-4" />
                            Reset
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-full md:w-64 space-y-6">
                      <div className="space-y-4">
                        <h4 className="font-medium">Audio Settings</h4>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button onClick={() => setIsMuted(!isMuted)} className="text-muted-foreground hover:text-foreground">
                              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                            </button>
                            <span className="text-sm">Volume</span>
                          </div>
                          <span className="text-sm font-medium">{volume}%</span>
                        </div>
                        <Slider 
                          value={[volume]} 
                          min={0} 
                          max={100} 
                          step={1}
                          onValueChange={(vals) => setVolume(vals[0])}
                          disabled={isMuted}
                        />
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="font-medium">Options</h4>
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id="background-sounds" 
                            checked={backgroundSounds}
                            onCheckedChange={setBackgroundSounds}
                          />
                          <Label htmlFor="background-sounds">Background sounds</Label>
                        </div>
                      </div>
                      
                      <div className="space-y-2 pt-4 border-t">
                        <p className="text-sm text-muted-foreground">
                          Find a quiet place free from distractions for the best experience.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </TabsContent>
            ))}
            
            <CardFooter className="text-xs text-muted-foreground">
              All meditations happen locally in your browser and no data is saved after your session ends.
            </CardFooter>
          </Card>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default GuidedMeditation;
