
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
        // Ensure match is a string before using string methods
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
  
  // Remove any extra sentence fragments at the end
  processedText = processedText.replace(/\.\s*[a-z][^.]*$/i, '.');
  
  // Ensure final punctuation 
  if (!/[.!?]$/.test(processedText)) {
    processedText += '.';
  }
  
  // Final trim
  return processedText.trim();
};

// Helper function for random selection
export const randomPick = <T>(items: T[]): T => {
  return items[Math.floor(Math.random() * items.length)];
};
