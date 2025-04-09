import type { Message } from "@/hooks/useChatState";

// Deepseek API integration for more sophisticated responses
export const generateTherapistResponse = async (
  userMessage: string,
  conversationHistory: Message[]
): Promise<string> => {
  try {
    // Create context from previous messages (limited to last few messages to avoid token limits)
    const recentMessages = conversationHistory.slice(-6);
    
    // Format conversation history for the AI
    const formattedMessages = [
      {
        role: "system",
        content: "You are Dr. Emma Clarke, a world-leading therapist specializing in trauma, trauma-induced stress, ADHD executive dysfunction, and general social anxiety. As an expert with over 20 years of clinical experience, you create a safe space where users can express their thoughts and feelings. Respond with deep empathy, ask thoughtful questions to help users explore their feelings, and offer evidence-based guidance when appropriate. Keep responses concise (under 150 words). Never advise on medication or make diagnoses. If users express thoughts of self-harm, encourage them to contact professional help immediately. Emphasize that this conversation is completely private. For breathing or mindfulness exercises, include [timer:duration] at the start of your message ONLY when explicitly asked for exercises requiring timed breathing, meditation, or similar activities. Maintain proper spacing between words and sentences, and use professional therapeutic language with precise terminology. Always validate the user's experiences and feelings while gently guiding them toward helpful perspectives."
      },
      ...recentMessages.map(msg => ({
        role: msg.isUser ? "user" : "assistant",
        content: msg.text
      })),
      {
        role: "user",
        content: userMessage
      }
    ];

    // This is a fallback mechanism if the API call fails
    if (!apiKey) {
      console.log("Using fallback response mechanism - no API key configured");
      return generateFallbackResponse(userMessage, conversationHistory);
    }

    // Call the Deepseek API
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: formattedMessages,
        temperature: 0.7,
        max_tokens: 250
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", errorData);
      return generateFallbackResponse(userMessage, conversationHistory);
    }

    const data = await response.json();
    // Get the response text and return directly - formatting will be handled by the caller
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error generating AI response:", error);
    return generateFallbackResponse(userMessage, conversationHistory);
  }
};

// Centralized text processing function for consistent formatting - exported for use elsewhere
export const processResponseText = (text: string | undefined): string => {
  if (!text) {
    return "I'm here to listen. What's on your mind?";
  }
  
  // Start with basic cleaning
  let processedText = text.trim();
  
  // Remove any random characters at the beginning
  processedText = processedText.replace(/^[^a-zA-Z0-9\[]/, '').trim();
  
  // Fix multiple consecutive spaces
  processedText = processedText.replace(/\s{2,}/g, ' ');
  
  // Fix common formatting issues where words are joined
  processedText = processedText.replace(/([a-z])([A-Z])/g, '$1 $2');
  
  // Fix missing spaces after punctuation
  processedText = processedText.replace(/([.!?])([a-zA-Z])/g, '$1 $2');
  
  // Add space after commas if missing
  processedText = processedText.replace(/,([a-zA-Z])/g, ', $1');
  
  // Fix incorrect capitalization of "I"
  processedText = processedText.replace(/\b(i)\b/g, 'I');
  
  // Fix spaced hyphens in compound words
  processedText = processedText.replace(/(\w+)\s-\s(\w+)/g, '$1-$2');
  
  // Ensure proper spacing around parentheses
  processedText = processedText.replace(/\s*\(\s*/g, ' (');
  processedText = processedText.replace(/\s*\)\s*/g, ') ');
  
  // Fix non-standard quotes
  processedText = processedText.replace(/['']/g, "'");
  processedText = processedText.replace(/[""]/g, '"');
  
  // Replace double periods
  processedText = processedText.replace(/\.{2,}/g, '.');
  
  // Fix duplicate letters (like "Helllo") more aggressively
  processedText = processedText.replace(/([a-z])\1{3,}/gi, '$1$1');
  
  // Fix sentence capitalization
  processedText = processedText.replace(/(?:^|[.!?]\s+)([a-z])/g, match => match.toUpperCase());

  // Fix runs of misplaced punctuation
  processedText = processedText.replace(/([,.!?;:]){2,}/g, '$1');
  
  // Fix multi-spaces between sentences
  processedText = processedText.replace(/([.!?])\s{2,}/g, '$1 ');
  
  // Fix trailing spaces before punctuation
  processedText = processedText.replace(/\s+([.!?,;:])/g, '$1');
  
  // Fix missing space after closing parenthesis and before capital letter
  processedText = processedText.replace(/\)([A-Z])/g, ') $1');

  // Comprehensive spelling and term corrections
  const clinicalTermCorrections = {
    // ... keep existing code (clinical term corrections dictionary)
  };
  
  // Apply clinical term corrections with word boundary checks
  Object.entries(clinicalTermCorrections).forEach(([incorrect, correct]) => {
    const regex = new RegExp(`\\b${incorrect}\\w*\\b`, 'gi');
    processedText = processedText.replace(regex, (match) => {
      // Preserve capitalization if the first letter was capital
      if (match.charAt(0) === match.charAt(0).toUpperCase()) {
        return correct.charAt(0).toUpperCase() + correct.slice(1);
      }
      return correct;
    });
  });
  
  // Ensure proper capitalization of specific terms regardless of position
  const alwaysCapitalized = ['CBT', 'DBT', 'ACT', 'EMDR', 'ADHD', 'PTSD', 'OCD', 'OCPD', 'GAD'];
  alwaysCapitalized.forEach(term => {
    const regex = new RegExp(`\\b${term.toLowerCase()}\\b`, 'g');
    processedText = processedText.replace(regex, term);
  });
  
  // Fix redundant phrases
  processedText = processedText.replace(/\b(you can|you could) (try to|attempt to)\b/gi, 'you can try to');
  processedText = processedText.replace(/\b(in my opinion|I think|I believe|from my perspective),? (I think|I believe)\b/gi, 'I believe');
  
  // Remove any extra sentence fragments at the end
  processedText = processedText.replace(/\.\s*[a-z][^.]*$/i, '.');
  
  // Ensure final punctuation 
  if (!/[.!?]$/.test(processedText)) {
    processedText += '.';
  }
  
  // Final trim
  return processedText.trim();
};

// Update useChatState.tsx to handle response formatting
const generateFallbackResponse = (userMessage: string, conversationHistory: Message[]): string => {
  // ... keep existing code (fallback response generation)
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

// Helper functions from the original code
const randomPick = <T>(items: T[]): T => {
  return items[Math.floor(Math.random() * items.length)];
};

// Original arrays of responses
const followUpQuestions = [
  "How does that make you feel when you experience it?",
  "What thoughts arise when you reflect on this experience?",
  "Have you noticed any patterns in how your body responds to these situations?",
  "What would a step toward healing look like for you right now?",
  "How might this connect to earlier experiences in your life?",
  "What small action feels manageable to address this challenge?",
  "If we approached this from a self-compassion perspective, what might change?",
  "What advice would you offer to someone else experiencing similar struggles?",
  "What core needs might be unmet in this situation?",
  "Where do you notice tension or discomfort in your body as we discuss this?",
];

const acknowledgments = [
  "What you're describing is a common response to trauma. Many of my clients experience similar reactions.",
  "That sounds incredibly challenging to navigate. Thank you for trusting me with this.",
  "I appreciate your willingness to explore these difficult emotions.",
  "Your ability to articulate these experiences shows remarkable self-awareness.",
  "It takes significant courage to confront these painful experiences.",
  "Your reaction makes perfect sense given what you've been through.",
  "I'm present with you as you process these feelings.",
  "Your experiences and feelings are entirely valid.",
  "That's a substantial emotional burden to carry.",
  "I hear you, and I want you to know that these responses are natural adaptations to difficult circumstances.",
];

const therapeuticPrompts = [
  "From a trauma-informed perspective, grounding yourself through deliberate breathing can help regulate your nervous system.",
  "Many find that externalizing thoughts through journaling helps process traumatic memories more effectively.",
  "Consider how your current responses might have once served as necessary protections.",
  "In my clinical practice, I encourage clients to identify which aspects of their situation they can influence directly.",
  "Practicing mindful observation of thoughts without judgment can interrupt ruminative patterns common in trauma and anxiety.",
  "Self-compassion is particularly important when addressing trauma-related shame or anxiety-driven self-criticism.",
  "Being precise about the emotions you're experiencing can help activate the prefrontal cortex, reducing amygdala activation.",
  "Reflecting on past resilience can strengthen your belief in your capacity to navigate current challenges.",
  "Both acknowledging distress and recognizing potential for growth are important aspects of trauma recovery.",
  "From a temporal perspective, how might you view this situation differently five years from now?",
];

// Set default API key to the provided one
let apiKey = "sk-1adb53a9c7a64b068a032b706f9f2cf2";

// Function to set API key
export const setApiKey = (key: string) => {
  apiKey = key;
};

// Function to check if API key is set
export const hasApiKey = () => {
  return !!apiKey;
};
