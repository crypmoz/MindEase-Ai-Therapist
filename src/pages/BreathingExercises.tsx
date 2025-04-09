
import React, { useState, useEffect, useRef } from "react";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CirclePlay, CirclePause, RefreshCw, SkipForward } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const exercises = [
  {
    id: "478",
    name: "4-7-8 Breathing",
    description: "Inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds",
    durations: { inhale: 4, hold: 7, exhale: 8 },
  },
  {
    id: "box",
    name: "Box Breathing",
    description: "Inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds, hold for 4 seconds",
    durations: { inhale: 4, hold: 4, exhale: 4, secondHold: 4 },
  },
  {
    id: "calm",
    name: "Calming Breath",
    description: "Inhale for 5 seconds, exhale for 7 seconds",
    durations: { inhale: 5, exhale: 7 },
  },
];

const BreathingExercises: React.FC = () => {
  const [selectedExercise, setSelectedExercise] = useState(exercises[0]);
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale" | "secondHold" | "ready">("ready");
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const animationRef = useRef<number>(0);
  const phaseStartTimeRef = useRef<number>(0);
  const phaseDurationRef = useRef<number>(0);

  const startBreathing = () => {
    if (isActive) return;
    setIsActive(true);
    setCycleCount(0);
    setPhase("inhale");
    phaseStartTimeRef.current = Date.now();
    phaseDurationRef.current = selectedExercise.durations.inhale * 1000;
    animationRef.current = requestAnimationFrame(updateProgress);
  };

  const stopBreathing = () => {
    setIsActive(false);
    setPhase("ready");
    setProgress(0);
    cancelAnimationFrame(animationRef.current);
  };

  const skipToNextPhase = () => {
    if (!isActive) return;
    moveToNextPhase();
  };

  const resetExercise = () => {
    stopBreathing();
    setCycleCount(0);
  };

  const getInstructionText = () => {
    switch (phase) {
      case "inhale": return "Breathe in...";
      case "hold": return "Hold...";
      case "exhale": return "Breathe out...";
      case "secondHold": return "Hold...";
      default: return "Get ready";
    }
  };

  const updateProgress = () => {
    const now = Date.now();
    const elapsed = now - phaseStartTimeRef.current;
    const newProgress = Math.min(100, (elapsed / phaseDurationRef.current) * 100);
    setProgress(newProgress);

    if (newProgress >= 100) {
      moveToNextPhase();
    } else if (isActive) {
      animationRef.current = requestAnimationFrame(updateProgress);
    }
  };

  const moveToNextPhase = () => {
    let nextPhase: "inhale" | "hold" | "exhale" | "secondHold";
    let nextDuration: number;

    switch (phase) {
      case "inhale":
        if ("hold" in selectedExercise.durations) {
          nextPhase = "hold";
          nextDuration = selectedExercise.durations.hold * 1000;
        } else {
          nextPhase = "exhale";
          nextDuration = selectedExercise.durations.exhale * 1000;
        }
        break;
      case "hold":
        nextPhase = "exhale";
        nextDuration = selectedExercise.durations.exhale * 1000;
        break;
      case "exhale":
        if ("secondHold" in selectedExercise.durations) {
          nextPhase = "secondHold";
          nextDuration = selectedExercise.durations.secondHold * 1000;
        } else {
          nextPhase = "inhale";
          nextDuration = selectedExercise.durations.inhale * 1000;
          setCycleCount(prev => prev + 1);
        }
        break;
      case "secondHold":
        nextPhase = "inhale";
        nextDuration = selectedExercise.durations.inhale * 1000;
        setCycleCount(prev => prev + 1);
        break;
      default:
        nextPhase = "inhale";
        nextDuration = selectedExercise.durations.inhale * 1000;
    }

    setPhase(nextPhase);
    setProgress(0);
    phaseStartTimeRef.current = Date.now();
    phaseDurationRef.current = nextDuration;
    animationRef.current = requestAnimationFrame(updateProgress);
  };

  useEffect(() => {
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  useEffect(() => {
    if (isActive) {
      stopBreathing();
    }
  }, [selectedExercise]);

  return (
    <PageLayout>
      <div className="max-w-xl mx-auto">
        <Card className="bg-card/80 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>Breathing Exercises</CardTitle>
            <CardDescription>
              Take a moment to breathe and relax with these guided exercises
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={selectedExercise.id}
              onValueChange={(value) => {
                const exercise = exercises.find(ex => ex.id === value);
                if (exercise) setSelectedExercise(exercise);
              }}
              className="mb-6"
            >
              {exercises.map((exercise) => (
                <div key={exercise.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={exercise.id} id={exercise.id} />
                  <Label htmlFor={exercise.id} className="font-medium cursor-pointer">
                    {exercise.name}
                    <p className="text-sm font-normal text-muted-foreground">{exercise.description}</p>
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex flex-col items-center py-6">
              <div 
                className={`w-48 h-48 rounded-full flex items-center justify-center mb-6 border-4 transition-all duration-300 text-3xl font-semibold ${
                  phase === "inhale" 
                    ? "border-blue-500 scale-110" 
                    : phase === "exhale" 
                    ? "border-green-500 scale-90" 
                    : "border-purple-500"
                }`}
              >
                {getInstructionText()}
              </div>
              
              <Progress value={progress} className="w-full h-2 mb-4" />
              
              <div className="text-center mb-6">
                <p className="text-2xl font-bold">{phase !== "ready" ? `${Math.ceil((phaseDurationRef.current - ((Date.now() - phaseStartTimeRef.current)))/1000)}s` : ""}</p>
                <p className="text-muted-foreground">Completed cycles: {cycleCount}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center gap-2">
            <Button 
              variant={isActive ? "outline" : "default"}
              onClick={isActive ? stopBreathing : startBreathing}
              size="lg"
            >
              {isActive ? (
                <>
                  <CirclePause className="mr-2 h-4 w-4" />
                  Stop
                </>
              ) : (
                <>
                  <CirclePlay className="mr-2 h-4 w-4" />
                  Start
                </>
              )}
            </Button>
            <Button 
              variant="outline" 
              onClick={resetExercise}
              disabled={!isActive && cycleCount === 0}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Reset
            </Button>
            <Button 
              variant="outline" 
              onClick={skipToNextPhase}
              disabled={!isActive}
            >
              <SkipForward className="mr-2 h-4 w-4" />
              Skip
            </Button>
          </CardFooter>
        </Card>
      </div>
    </PageLayout>
  );
};

export default BreathingExercises;
