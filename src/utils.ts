import { EVALUATE_READABILITY_EVENT, LOCAL_STORAGE_KEY } from "./constants";
import type { PersistentReadabilityData, ReadabilityData } from "./interfaces";

export const handleActionMessage = async ({
  message,
  setReadingText,
}: {
  message: {
    action: string;
    text: string | null;
  };
  setReadingText: (string: ReadabilityData) => void;
}) => {
  if (message.action === EVALUATE_READABILITY_EVENT) {
    const { letterCount, sentenceCount, wordCount, grade } =
      evaluateReadability(message.text || "");

    setReadingText({
      originalText: message.text || "",
      letterCount: letterCount ?? 0,
      wordCount: wordCount ?? 0,
      sentenceCount: sentenceCount ?? 0,
      grade: grade ?? 0,
    });
  }
};

// Make reading data persistent
export const persistReadingData = ({
  letterCount,
  wordCount,
  sentenceCount,
  grade,
  originalText,
  generatedResponse,
}: PersistentReadabilityData) => {
  localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify({
      originalText,
      letterCount: letterCount,
      wordCount: wordCount,
      sentenceCount: sentenceCount,
      grade: grade,
      generatedResponse: generatedResponse,
    })
  );
};

// Utility Function to evaluate readability
export const evaluateReadability = (text: string) => {
  let letterCount = 0;
  let sentenceCount = 0;
  let spacesCount = 0;

  const alphaNumericRegex = /[a-z0-9\u0370-\u03FF\u1F00-\u1FFF]/i;
  const whiteSpaceRegex = /^\s+$/;

  for (const character of text) {
    if (character.match(alphaNumericRegex)) {
      letterCount += 1;
    } else if (character.match(whiteSpaceRegex)) {
      spacesCount += 1;
    } else if (character === "." || character === "!" || character === ";") {
      sentenceCount += 1;
    }
  }

  // CS50's formula for readability:
  const wordCount = spacesCount + 1;
  const L = (letterCount * 100) / wordCount;
  const S = (sentenceCount * 100) / wordCount;

  const grade = Math.round(0.0588 * L - 0.296 * S - 15.8);

  return {
    letterCount,
    sentenceCount,
    wordCount,
    grade,
  };
};
