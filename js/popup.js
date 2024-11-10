console.log("popup.js loaded");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("here in popup");

  if (message.type === "extractedText") {
    console.log("here in popup");
  }
});

function evaluateText(text) {
  let letterCount = 0;
  let sentenceCount = 0;
  let spacesCount = 0;

  const alphaNumericRegex = /((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i;
  const whiteSpaceRegex = new RegExp("/^s+$/");

  for (const character in text) {
    if (character.match(alphaNumericRegex)) {
      letterCount += 1;
    } else if (character.match(whiteSpaceRegex)) {
      spacesCount += 1;
    } else if (character === "." || character === "!" || character === ";") {
      sentenceCount += 1;
    }
  }

  const words = spacesCount + 1;
  const L = (letterCount * 100) / words;
  const S = (sentenceCount * 100) / words;

  const grade = Math.round(0.0588 * L - 0.296 * S - 15.8);
  const evaluation = document.querySelector("#evaluation");

  evaluation.textContent = `Words: ${words}, Letters: ${letterCount}, Sentence count: ${sentenceCount}, Grade: ${grade}`;
}

document.addEventListener("DOMContentLoaded", function () {
  const evaluateArticleBtn = document.getElementById("evaluateArticleBtn");

  evaluateArticleBtn.addEventListener("click", () => {
    evaluateText();
  });

  chrome.runtime.onMessage.addListener((message) => {
    console.log("here in evaluation");
    if (message.type === "showEvaluation") {
      document.getElementById("evaluation").innerText = message.evaluation;
    }
  });

  chrome.runtime.onMessage.addListener((message) => {
    console.log("here in summary");

    if (message.type === "showSummary") {
      document.getElementById("summary").innerText = message.summary;
    }
  });
});
