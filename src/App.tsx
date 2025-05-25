import { useEffect, useState } from "react";
import "./App.css";
import type { ReadabilityData } from "./intefaces";
import { handleActionMessage } from "./utils";
import { LOCAL_STORAGE_KEY } from "./constants";

function App() {
  const [readingText, setReadingText] = useState<ReadabilityData | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      setReadingText(JSON.parse(stored));
    }

    chrome.runtime.onMessage.addListener((message) =>
      handleActionMessage({ message, setReadingText })
    );

    return () => {
      chrome.runtime.onMessage.removeListener(handleActionMessage);
    };
  }, []);

  return (
    <>
      <h3>CS50: Evaluate Readability</h3>
      {!readingText ? (
        <div>No data yet. Select text and run the extension.</div>
      ) : (
        <div>
          <div>
            <strong>Letters:</strong> {readingText.letterCount}
          </div>
          <div>
            <strong>Words:</strong> {readingText.wordCount}
          </div>
          <div>
            <strong>Sentences:</strong> {readingText.sentenceCount}
          </div>
          <div>
            <strong>Grade:</strong> {readingText.grade}
          </div>
          <div style={{ marginTop: "10px" }}>
            <strong>Summary:</strong> {readingText.summary}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
