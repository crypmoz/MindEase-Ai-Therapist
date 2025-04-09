
import { clinicalTermCorrections, alwaysCapitalized } from './correctionDictionaries';

// Centralized text processing function for consistent formatting
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
  
  // Apply clinical term corrections with word boundary checks
  Object.entries(clinicalTermCorrections).forEach(([incorrect, correct]) => {
    const regex = new RegExp(`\\b${incorrect}\\w*\\b`, 'gi');
    processedText = processedText.replace(regex, (match) => {
      // Preserve capitalization if the first letter was capital
      if (typeof match === 'string' && match.length > 0) {
        if (match.charAt(0) === match.charAt(0).toUpperCase()) {
          return correct.charAt(0).toUpperCase() + correct.slice(1);
        }
      }
      return correct;
    });
  });
  
  // Ensure proper capitalization of specific terms regardless of position
  alwaysCapitalized.forEach(term => {
    const regex = new RegExp(`\\b${term.toLowerCase()}\\b`, 'g');
    processedText = processedText.replace(regex, term);
  });
  
  // Fix redundant phrases
  processedText = processedText.replace(/\b(you can|you could) (try to|attempt to)\b/gi, 'you can try to');
  processedText = processedText.replace(/\b(in my opinion|I think|I believe|from my perspective),? (I think|I believe)\b/gi, 'I believe');
  
  // Remove preachy phrases
  processedText = processedText.replace(/\b(you should|you must|you need to|it's important that you|I recommend that you|I suggest that you|you have to)\b/gi, 'you might consider');
  processedText = processedText.replace(/\b(always|never)\b/gi, 'sometimes');
  
  // Humanize text by making it more conversational
  processedText = processedText.replace(/\b(it is)\b/gi, "it's");
  processedText = processedText.replace(/\b(that is)\b/gi, "that's");
  processedText = processedText.replace(/\b(there is)\b/gi, "there's");
  processedText = processedText.replace(/\b(what is)\b/gi, "what's");
  processedText = processedText.replace(/\b(how is)\b/gi, "how's");
  processedText = processedText.replace(/\b(who is)\b/gi, "who's");
  processedText = processedText.replace(/\b(cannot)\b/gi, "can't");
  processedText = processedText.replace(/\b(do not)\b/gi, "don't");
  processedText = processedText.replace(/\b(did not)\b/gi, "didn't");
  processedText = processedText.replace(/\b(will not)\b/gi, "won't");
  processedText = processedText.replace(/\b(would not)\b/gi, "wouldn't");
  processedText = processedText.replace(/\b(could not)\b/gi, "couldn't");
  processedText = processedText.replace(/\b(should not)\b/gi, "shouldn't");
  
  // Replace formal transitions with conversational ones
  processedText = processedText.replace(/\b(furthermore|moreover|in addition)\b/gi, "also");
  processedText = processedText.replace(/\b(consequently|subsequently)\b/gi, "so");
  processedText = processedText.replace(/\b(therefore|thus|hence)\b/gi, "so");
  
  // Remove judgmental or authoritative language
  processedText = processedText.replace(/\b(clearly|obviously|certainly|undoubtedly|absolutely|definitely)\b/gi, "");
  processedText = processedText.replace(/\b(the fact is|the truth is|in reality|to be honest|honestly|frankly)\b/gi, "");
  
  // Break up very long sentences for better reading
  if (processedText.length > 100) {
    // Find natural breaking points (periods, question marks, exclamation marks)
    processedText = processedText.replace(/([.!?]) ([A-Z][a-z]+) ([a-z]+ [a-z]+ [a-z]+ [a-z]+) ([,.]) /g, "$1 $2 $3$4\n");
  }
  
  // Fix spacing after periods in abbreviations (e.g., "e.g." should not trigger a double space)
  processedText = processedText.replace(/(\b\w\.\w\.)\s{2,}/g, '$1 ');
  
  // Fix common grammar errors
  processedText = processedText.replace(/\b(doesnt|dont|isnt|arent|didnt|couldnt|wouldnt|shouldnt)\b/gi, 
    match => match.charAt(0) + "o" + match.slice(1, match.length-1) + "'" + match.slice(-1));
  
  // Fix "it's" vs "its" common errors
  processedText = processedText.replace(/\bits\s+(a|the|been|not|very|quite|really|so|too|just|only)\b/gi, "it's $1");
  
  // Fix double conjunctions
  processedText = processedText.replace(/\b(and|but|or|yet|so) (and|but|or|yet|so)\b/gi, '$1');
  
  // Fix "a" vs "an" for words starting with vowels
  processedText = processedText.replace(/\ba\s+([aeiou])/gi, 'an $1');
  
  // Fix spacing around dashes for better readability
  processedText = processedText.replace(/(\w)—(\w)/g, '$1 — $2');
  
  // Remove any extra sentence fragments at the end
  processedText = processedText.replace(/\.\s*[a-z][^.]*$/i, '.');
  
  // Ensure final punctuation 
  if (!/[.!?]$/.test(processedText)) {
    processedText += '.';
  }
  
  // Convert some periods to question marks for more engaging conversation
  if (!processedText.includes("?") && 
      (processedText.includes("what") || 
       processedText.includes("how") || 
       processedText.includes("when") || 
       processedText.includes("why") || 
       processedText.includes("where"))) {
    processedText = processedText.replace(/\.\s*$/, "?");
  }
  
  // Final clean-up: ensure consistent spacing throughout
  processedText = processedText.replace(/\s{2,}/g, ' ').trim();
  
  // Convert line breaks to proper spacing if present
  processedText = processedText.replace(/\n/g, ' ').trim();
  
  return processedText.trim();
};

// Helper function for random selection
export const randomPick = <T>(items: T[]): T => {
  return items[Math.floor(Math.random() * items.length)];
};
