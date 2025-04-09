
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
    return "[timer:120] As a specialist in trauma and anxiety, I recommend this grounding breathing technique. Inhale slowly through your nose for a count of four, feeling your diaphragm expand. Hold for a moment. Then exhale gently through your mouth for a count of six, releasing tension. This activates your parasympathetic nervous system, reducing stress hormones. Continue this cycle for the next two minutes, focusing only on your breath. How does your body feel as you practice this?";
  }
  
  // Detect greetings
  if (
    conversationHistory.length <= 2 &&
    (userMessageLower.includes("hello") ||
     userMessageLower.includes("hi") ||
     userMessageLower.includes("hey"))
  ) {
    return "Hello, I'm Dr. Clarke. I'm glad you're here. This is a safe space to explore your thoughts and feelings about trauma, ADHD challenges, or anxiety you might be experiencing. Everything shared here remains completely private. What specific concerns would you like to address today?";
  }
  
  // Detect if user is asking how the AI works
  if (
    userMessageLower.includes("how do you work") ||
    userMessageLower.includes("are you an ai") ||
    userMessageLower.includes("are you real") ||
    userMessageLower.includes("are you a bot")
  ) {
    return "I'm an AI designed to provide evidence-based therapeutic approaches for trauma, ADHD executive dysfunction, and anxiety. While I can offer reflections based on clinical expertise, I'm not a replacement for a human therapist. Our conversation is completely private and not stored. What specific challenges related to trauma or anxiety would you like to explore today?";
  }
  
  // Detect gratitude
  if (
    userMessageLower.includes("thank you") ||
    userMessageLower.includes("thanks") ||
    userMessageLower.includes("helpful")
  ) {
    return "You're welcome. Acknowledging your feelings and seeking support shows tremendous self-awareness. In my clinical experience with trauma and anxiety, this self-reflection is an important step. Is there a specific aspect of what we discussed that resonated with you, or would you like to explore another area?";
  }
  
  // Detect if user is asking about privacy
  if (
    userMessageLower.includes("privacy") ||
    userMessageLower.includes("data") ||
    userMessageLower.includes("store") ||
    userMessageLower.includes("save")
  ) {
    return "As a therapist specializing in trauma, I understand that privacy is fundamental to creating psychological safety. Our conversations aren't saved or stored anywhere. When you close or refresh this page, everything disappears completely. This creates a secure space for exploring sensitive trauma-related experiences or anxiety symptoms. What concerns would you like to discuss?";
  }
  
  // Detect if user wants to end conversation
  if (
    userMessageLower.includes("goodbye") ||
    userMessageLower.includes("bye") ||
    userMessageLower.includes("see you") ||
    userMessageLower.includes("that's all")
  ) {
    return "Thank you for sharing with me today. As you conclude our session, consider taking a moment to acknowledge any insights gained. Remember that healing from trauma and managing anxiety is a process, not a destination. Practice self-compassion as you move forward, and I'll be here when you need further support. Take good care of yourself.";
  }
  
  // Enhanced responses for trauma, ADHD, and anxiety
  if (
    userMessageLower.includes("trauma") ||
    userMessageLower.includes("ptsd") ||
    userMessageLower.includes("abuse") ||
    userMessageLower.includes("neglect")
  ) {
    return "In my work with trauma survivors, I've observed that our bodies and minds adapt to protect us. These responses were once necessary for survival but may now manifest as hypervigilance or emotional dysregulation. Many experience this - you're not alone. Could you share more about how these trauma responses are affecting your daily life? Understanding your specific experience helps us explore appropriate coping strategies.";
  }
  
  if (
    userMessageLower.includes("adhd") ||
    userMessageLower.includes("focus") ||
    userMessageLower.includes("distract") ||
    userMessageLower.includes("executive") ||
    userMessageLower.includes("procrastinate")
  ) {
    return "Executive dysfunction in ADHD can create significant challenges. As I work with my clients, I've found that traditional productivity advice often doesn't address the neurobiological differences at play. Your struggles aren't character flaws but reflect differences in how your brain processes information and manages tasks. What specific executive functioning challenges are most impacting your daily life right now?";
  }
  
  if (
    userMessageLower.includes("anxiety") ||
    userMessageLower.includes("anxious") ||
    userMessageLower.includes("worry") ||
    userMessageLower.includes("panic") ||
    userMessageLower.includes("stress")
  ) {
    return "As a specialist in anxiety disorders, I recognize how overwhelming persistent worry can become. Anxiety manifests both physically and emotionally, often creating a cycle where we become anxious about our anxiety. Your nervous system is trying to protect you, but it's become overactive. Could you tell me more about the specific situations that trigger your anxiety and how it typically manifests for you?";
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
