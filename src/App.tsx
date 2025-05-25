import { useEffect, useState } from "react";
import "./App.css";

type ReadabilityData = {
  letterCount: number;
  wordCount: number;
  sentenceCount: number;
  grade: number | string;
  summary: string;
};

function App() {
  const [readingText, setReadingText] = useState<ReadabilityData | null>(null);

  useEffect(() => {
    // chrome.devtools.panels.create(
    //   "CS50: Evaluate Readability",
    //   "",
    //   "/public/panel.html",
    //   function (panel) {
    //     console.log("panel created", panel);
    //   }
    // );

    // Listen for messages from the background script
    const handler = ({
      action,
      letterCount,
      wordCount,
      sentenceCount,
      grade,
      summary,
    }: {
      action: string;
      letterCount: number;
      wordCount: number;
      sentenceCount: number;
      grade: number;
      summary: string;
    }) => {
      if (action === "evaluateReadability") {
        setReadingText({
          letterCount,
          wordCount,
          sentenceCount,
          grade,
          summary,
        });
      }
    };
    chrome.runtime.onMessage.addListener(handler);
    return () => {
      chrome.runtime.onMessage.removeListener(handler);
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
          <div>
            <strong>Summary:</strong> {readingText.summary}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
