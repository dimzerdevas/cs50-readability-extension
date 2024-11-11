chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "evaluateText",
    title: "CS50 Evaluate Readability",
    contexts: ["all"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "evaluateText") {
    chrome.runtime.sendMessage({ action: "evaluateText", selectedText: info.selectionText });

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: () => console.log("hello world", info, tab),
    });
  }
});
