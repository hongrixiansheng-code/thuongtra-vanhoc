/**
 * Checks if the user's answer matches any of the possible meanings of a word.
 * This function supports multiple meanings separated by commas.
 * 
 * @param userAnswer The answer input by the user.
 * @param correctMeaning The correct meaning string from the database (e.g., "quả chuối, trái chuối")
 * @returns true if the answer matches one of the meanings, false otherwise.
 */
export function checkAnswerMatch(userAnswer: string, correctMeaning: string): boolean {
  if (!userAnswer || !correctMeaning) return false;

  const userNorm = userAnswer.trim().toLowerCase();
  const meanings = correctMeaning.split(/[,\/]/).map(m => m.trim().toLowerCase()).filter(Boolean);

  return meanings.some(meaning => {
      if (meaning === userNorm) return true;
      const meaningWords = meaning.split(/\s+/);
      const userWords = userNorm.split(/\s+/);
      if (meaningWords.length === 1) return meaning === userNorm;
      
      const minWords = Math.ceil(meaningWords.length * 0.6);
      if (userWords.length < minWords) return false;
      
      const meaningStr = meaningWords.join(' ');
      const userStr = userWords.join(' ');
      return meaningStr.startsWith(userStr) || meaningStr.endsWith(userStr) || meaningStr === userStr;
  });
}

/**
 * Gets the primary meaning of a word for display purposes.
 * Always returns the first meaning before any comma.
 */
export function getPrimaryMeaning(meaning: string): string {
  if (!meaning) return "";
  return meaning.split(/[,\/]/)[0].trim();
}

