import { useEffect, useRef } from "react";
import {
  GeneratedExplanation,
  MissingReadingText,
  ReadabilityEvaluation,
} from "./components";
import { useExplanation, useReadingText } from "./hooks";
import { persistReadingData } from "./utils";
import { Container } from "./style";
import "./App.css";

function App() {
  const { readingText } = useReadingText();
  const { explanation, isLoadingExplanation, refetchExplanation } =
    useExplanation({
      text: readingText?.originalText || "",
    });

  // Track the last text we fetched for
  const lastFetchedText = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (
      readingText &&
      readingText.originalText &&
      lastFetchedText.current !== readingText.originalText
    ) {
      refetchExplanation();
      lastFetchedText.current = readingText.originalText;
    }
  }, [readingText, explanation, refetchExplanation]);

    useEffect(() => {
    if (readingText && explanation) {
      persistReadingData({
        ...readingText,
        generatedResponse: explanation,
      });
    }
  }, [readingText, explanation]);

  const { originalText, letterCount, wordCount, sentenceCount, grade } =
    readingText || {};

  if (!readingText) {
    return <MissingReadingText />;
  }

  return (
    <Container>
      <h2>CS50: Evaluate Readability</h2>
      <div>
        <ReadabilityEvaluation
          originalText={originalText}
          letterCount={letterCount}
          wordCount={wordCount}
          sentenceCount={sentenceCount}
          grade={Number(grade)}
        />
        {isLoadingExplanation && <p>Loading explanation...</p>}
        <GeneratedExplanation generatedResponse={explanation || ""} />
      </div>
    </Container>
  );
}

export default App;
