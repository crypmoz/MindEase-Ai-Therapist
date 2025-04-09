
import type { Message } from "@/hooks/useChatState";
import { randomPick } from './textProcessing';
import { acknowledgments, followUpQuestions, therapeuticPrompts } from './correctionDictionaries';

export const generateFallbackResponse = (userMessage: string, conversationHistory: Message[]): string => {
  const userMessageLower = userMessage.toLowerCase();
  
  // ONLY add timer when explicitly asked for breathing/mindfulness exercises
  const needsBreathingExercise = 
    userMessageLower.includes("breathing exercise") || 
    userMessageLower.includes("breathe with me") || 
    userMessageLower.includes("meditation timer") || 
    userMessageLower.includes("mindfulness exercise") ||
    userMessageLower.includes("timer") ||
    userMessageLower.includes("timed exercise") ||
    userMessageLower.includes("count down") ||
    userMessageLower.includes("countdown");
  
  if (needsBreathingExercise) {
    return "[timer:120] Let's try a simple breathing exercise. Breathe in slowly through your nose for 4 counts, then exhale gently through your mouth for 6 counts. Continue this pattern for the next two minutes, focusing on your breath.";
  }
  
  // Detect greetings
  if (
    conversationHistory.length <= 2 &&
    (userMessageLower.includes("hello") ||
     userMessageLower.includes("hi") ||
     userMessageLower.includes("hey"))
  ) {
    return "Hi there! What's on your mind today?";
  }
  
  // Detect if user is asking how the AI works
  if (
    userMessageLower.includes("how do you work") ||
    userMessageLower.includes("are you an ai") ||
    userMessageLower.includes("are you real") ||
    userMessageLower.includes("are you a bot")
  ) {
    return "I'm an AI designed to be a supportive listener. While I can offer a space to reflect on your thoughts and feelings, I'm not a replacement for a human therapist. What's been on your mind lately?";
  }
  
  // Detect gratitude
  if (
    userMessageLower.includes("thank you") ||
    userMessageLower.includes("thanks") ||
    userMessageLower.includes("helpful")
  ) {
    return "You're welcome. Is there something specific you'd like to talk about next?";
  }
  
  // Detect if user is asking about privacy
  if (
    userMessageLower.includes("privacy") ||
    userMessageLower.includes("data") ||
    userMessageLower.includes("store") ||
    userMessageLower.includes("save")
  ) {
    return "Your privacy is important. Our conversations aren't saved or stored. When you close this page, everything disappears completely. What's been on your mind?";
  }
  
  // Detect if user wants to end conversation
  if (
    userMessageLower.includes("goodbye") ||
    userMessageLower.includes("bye") ||
    userMessageLower.includes("see you") ||
    userMessageLower.includes("that's all")
  ) {
    return "Thanks for talking today. Take care.";
  }
  
  // Topic-specific responses with less preachy tone
  if (
    userMessageLower.includes("trauma") ||
    userMessageLower.includes("ptsd") ||
    userMessageLower.includes("abuse") ||
    userMessageLower.includes("neglect")
  ) {
    return "Those experiences can have a real impact. How have you been coping with this lately?";
  }
  
  if (
    userMessageLower.includes("adhd") ||
    userMessageLower.includes("focus") ||
    userMessageLower.includes("distract") ||
    userMessageLower.includes("executive") ||
    userMessageLower.includes("procrastinate")
  ) {
    return "Focus and attention challenges can be really frustrating. What specific difficulties have you been experiencing?";
  }
  
  if (
    userMessageLower.includes("anxiety") ||
    userMessageLower.includes("anxious") ||
    userMessageLower.includes("worry") ||
    userMessageLower.includes("panic") ||
    userMessageLower.includes("stress")
  ) {
    return "Anxiety can feel overwhelming. When do you notice these feelings coming up?";
  }
  
  // Response for depression-related queries
  if (
    userMessageLower.includes("depress") ||
    userMessageLower.includes("sad") ||
    userMessageLower.includes("hopeless") ||
    userMessageLower.includes("worthless") ||
    userMessageLower.includes("empty")
  ) {
    return "Those feelings can be really heavy to carry. What has your mood been like lately?";
  }
  
  // Response for relationship issues
  if (
    userMessageLower.includes("relationship") ||
    userMessageLower.includes("partner") ||
    userMessageLower.includes("boyfriend") ||
    userMessageLower.includes("girlfriend") ||
    userMessageLower.includes("husband") ||
    userMessageLower.includes("wife") ||
    userMessageLower.includes("marriage") ||
    userMessageLower.includes("dating")
  ) {
    return "Relationships can bring up a lot of feelings. What's been happening that's on your mind?";
  }
  
  // General response for most messages
  // Combine an acknowledgment with a follow-up question
  const acknowledgment = randomPick(acknowledgments);
  
  // Occasionally add a therapeutic prompt (20% chance) - reduced from 30%
  const includeTherapeuticPrompt = Math.random() < 0.2;
  const therapeuticPrompt = includeTherapeuticPrompt 
    ? " " + randomPick(therapeuticPrompts)
    : "";
  
  const followUp = randomPick(followUpQuestions);
  
  return `${acknowledgment}${therapeuticPrompt} ${followUp}`;
};
