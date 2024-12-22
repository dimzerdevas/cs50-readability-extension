document.addEventListener("DOMContentLoaded", () => {
  // Create a devtool panel
  chrome.devtools.panels.create(
    "CS50: Evaluate Readability",
    "assets/icons/icon16.png",
    "src/panel/index.html",
    (panel) => {
      console.log("panel created", panel);
    }
  );

  // Listen for "evaluateReadability" message
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("runtime listener", request);
    if (request.action === "evaluateReadability") {
      const { wordCount, sentenceCount } = request;

      console.log("at event listener", wordCount, sentenceCount);
      // Assign value to HTML elements
      document.getElementById("word-count").textContent = wordCount;
      document.getElementById("sentence-count").textContent = sentenceCount;
    }
  });
});
