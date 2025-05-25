const EVALUATE_READABILITY_EVENT = "evaluateReadability";
const EVALUATE_READABILITY_ACTION_TEXT = "CS50: Evaluate Readability";

// Create the context menu item (right click)
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: EVALUATE_READABILITY_EVENT,
    title: EVALUATE_READABILITY_ACTION_TEXT,
    contexts: ["selection"],
  });
});

// Listen for clicks on the context menu
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === EVALUATE_READABILITY_EVENT) {
    handleReadingText(info.selectionText);
  }
});

const handleReadingText = async (text) => {
  // Send the results back to the react app
  chrome.runtime.sendMessage({
    action: EVALUATE_READABILITY_EVENT,
    text,
  });
};
