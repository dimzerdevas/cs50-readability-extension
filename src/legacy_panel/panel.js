document.addEventListener("DOMContentLoaded", () => {
  // Create a devtool panel
  chrome.devtools.panels.create(
    "CS50: Evaluate Readability",
    "assets/icons/icon16.png",
    "src/panel/index.html",
    (panel) => {
      console.log("panel created");
    }
  );

  // Select elements
  const letterCountElement = document.getElementById("letter-count");
  const wordCountElement = document.getElementById("word-count");
  const sentenceCountElement = document.getElementById("sentence-count");
  const gradeElement = document.getElementById("grade");
  const summaryElement = document.getElementById("summary");

  const elements = [
    letterCountElement,
    wordCountElement,
    sentenceCountElement,
    gradeElement,
    summaryElement,
  ];

  // Listen for "evaluateReadability" message
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "evaluateReadability") {
      const { letterCount, sentenceCount, grade, wordCount, summary } = request;

      // Assign value to HTML elements
      letterCountElement.textContent = letterCount;
      wordCountElement.textContent = wordCount;
      sentenceCountElement.textContent = sentenceCount;
      gradeElement.textContent = grade;
      summaryElement.textContent = summary;
    }
  });
});
