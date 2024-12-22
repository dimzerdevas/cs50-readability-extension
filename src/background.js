// Create the context menu item (right click)
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "evaluateReadability",
    title: "CS50: Evaluate Readability",
    contexts: ["selection"],
  });
});

// Listen for clicks on the context menu
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "evaluateReadability") {
    console.log("HERE menu click: ", info.menuItemId);

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: evaluateReadability,
      args: [info.selectionText],
    });
  }
});

// Utility Function to evaluate readability
function evaluateReadability(selectedText) {
  const wordCount = selectedText
    .split(/\s+/)
    .filter((word) => word.length > 0).length;

  const sentenceCount = selectedText
    .split(/[.!?]+/)
    .filter((sentence) => sentence.trim().length > 0).length;

  console.log("evaluate func", wordCount, sentenceCount);

  chrome.runtime.sendMessage({
    action: "evaluateReadability",
    wordCount,
    sentenceCount,
  });
}
