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
  const [data, setData] = useState<ReadabilityData | null>(null);

  useEffect(() => {
    // chrome.devtools.panels.create(
    //   "CS50: Evaluate Readability",
    //   "assets/icons/icon16.png",
    //   "src/panel/index.html",
    //   (panel) => {
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
        setData({
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
    <div>
      <h1>CS50: Evaluate Readability</h1>
      {data ? (
        <div>
          <div>
            <strong>Letters:</strong> {data.letterCount}
          </div>
          <div>
            <strong>Words:</strong> {data.wordCount}
          </div>
          <div>
            <strong>Sentences:</strong> {data.sentenceCount}
          </div>
          <div>
            <strong>Grade:</strong> {data.grade}
          </div>
          <div>
            <strong>Summary:</strong> {data.summary}
          </div>
        </div>
      ) : (
        <div>No data yet. Select text and run the extension.</div>
      )}
    </div>
  );
}

export default App;
