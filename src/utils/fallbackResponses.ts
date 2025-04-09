
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
    return "[timer:120] Let's try a simple breathing exercise together. Breathe in slowly through your nose for 4 counts. Hold for a moment. Then exhale gently through your mouth for 6 counts. This helps calm your nervous system. Continue this pattern for the next two minutes, focusing on your breath.";
  }
  
  // Detect greetings
  if (
    conversationHistory.length <= 2 &&
    (userMessageLower.includes("hello") ||
     userMessageLower.includes("hi") ||
     userMessageLower.includes("hey"))
  ) {
    return "Hi there! It's good to meet you. This is a safe space where you can share whatever's on your mind. What would you like to talk about today?";
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
    return "You're welcome. Taking time to reflect on your feelings shows real self-awareness. Is there something specific that resonated with you?";
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
    return "Thank you for sharing with me today. Take a moment to acknowledge any insights you've gained. Remember to be gentle with yourself as you move forward.";
  }
  
  // Enhanced responses for trauma, ADHD, and anxiety
  if (
    userMessageLower.includes("trauma") ||
    userMessageLower.includes("ptsd") ||
    userMessageLower.includes("abuse") ||
    userMessageLower.includes("neglect")
  ) {
    return "Our minds and bodies find ways to protect us from difficult experiences. These responses make sense, even if they're challenging now. Would you like to share more about how these experiences are affecting you?";
  }
  
  if (
    userMessageLower.includes("adhd") ||
    userMessageLower.includes("focus") ||
    userMessageLower.includes("distract") ||
    userMessageLower.includes("executive") ||
    userMessageLower.includes("procrastinate")
  ) {
    return "Focus and attention challenges can be really frustrating. These aren't character flaws but reflect differences in how your brain processes information. What specific difficulties are you experiencing?";
  }
  
  if (
    userMessageLower.includes("anxiety") ||
    userMessageLower.includes("anxious") ||
    userMessageLower.includes("worry") ||
    userMessageLower.includes("panic") ||
    userMessageLower.includes("stress")
  ) {
    return "Anxiety can feel overwhelming, both in your mind and body. Your nervous system is trying to protect you, but it might be working overtime. When do you notice these feelings coming up?";
  }
  
  // General response for most messages
  // Combine an acknowledgment with a follow-up question
  const acknowledgment = randomPick(acknowledgments);
  const followUp = randomPick(followUpQuestions);
  
  // Occasionally add a therapeutic prompt (30% chance)
  const includeTherapeuticPrompt = Math.random() < 0.3;
  const therapeuticPrompt = includeTherapeuticPrompt 
    ? " " + randomPick(therapeuticPrompts)
    : "";
  
  return `${acknowledgment}${therapeuticPrompt} ${followUp}`;
};
