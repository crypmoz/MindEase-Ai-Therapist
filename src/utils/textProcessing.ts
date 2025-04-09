
import { clinicalTermCorrections, alwaysCapitalized } from './correctionDictionaries';

// Centralized text processing function for consistent formatting
export const processResponseText = (text: string | undefined): string => {
  if (!text) {
    return "I'm here to listen. What's on your mind?";
  }
  
  // Start with basic cleaning
  let processedText = text.trim();
  
  // Remove any random characters at the beginning more aggressively
  processedText = processedText.replace(/^[^\w\[]*/, '').trim();
  
  // Clean up undefined strings at the end (more aggressively)
  processedText = processedText.replace(/undefined[\s\S]*$/, '').trim();
  
  // Preserve paragraph breaks (double line breaks)
  processedText = processedText.replace(/\n{3,}/g, '\n\n'); // Normalize multiple line breaks
  
  // Fix multiple consecutive spaces within paragraphs
  processedText = processedText.replace(/(?<!\n)\s{2,}(?!\n)/g, ' ');
  
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
  
  // Humanize the text by making it less formal and more conversational
  processedText = processedText.replace(/\b(it is)\b/gi, "it's");
  processedText = processedText.replace(/\b(that is)\b/gi, "that's");
  processedText = processedText.replace(/\b(there is)\b/gi, "there's");
  processedText = processedText.replace(/\b(what is)\b/gi, "what's");
  processedText = processedText.replace(/\b(how is)\b/gi, "how's");
  processedText = processedText.replace(/\b(who is)\b/gi, "who's");
  processedText = processedText.replace(/\b(cannot)\b/gi, "can't");
  
  // Add more natural transitions
  processedText = processedText.replace(/\b(furthermore|moreover|in addition)\b/gi, "also");
  processedText = processedText.replace(/\b(consequently|subsequently)\b/gi, "so");
  processedText = processedText.replace(/\b(therefore|thus|hence)\b/gi, "so");
  
  // Create paragraph breaks for better readability
  processedText = processedText.replace(/(.{60,}?)(?:[.!?])\s+(?=[A-Z])/g, "$1.\n\n");
  
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
  
  // Ensure final punctuation 
  if (!/[.!?]$/.test(processedText)) {
    processedText += '.';
  }
  
  // Clean up any double newlines at the beginning or end
  processedText = processedText.replace(/^\n+|\n+$/g, '');
  
  // Ensure consistent paragraph spacing
  processedText = processedText.replace(/\n{3,}/g, '\n\n');
  
  return processedText.trim();
};

// Helper function for random selection
export const randomPick = <T>(items: T[]): T => {
  return items[Math.floor(Math.random() * items.length)];
};
