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
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: evaluateReadability,
      args: [info.selectionText],
    });
  }
});

// Utility Function to evaluate readability
async function evaluateReadability(text) {
  async function summarize(text) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: `Explain this like I am 5 years old: ${text}. `,
            },
          ],
        },
      ],
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const GOOGLE_API_KEY = process.env.GEMINI_API_KEY;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GOOGLE_API_KEY}`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    const [candidate] = await result.candidates;
    const [part] = await candidate.content.parts;

    return part.text;
  }

  let letterCount = 0;
  let sentenceCount = 0;
  let spacesCount = 0;

  const alphaNumericRegex = /[a-z0-9\u0370-\u03FF\u1F00-\u1FFF]/i;
  const whiteSpaceRegex = /^\s+$/;

  for (const character of text) {
    if (character.match(alphaNumericRegex)) {
      letterCount += 1;
    } else if (character.match(whiteSpaceRegex)) {
      spacesCount += 1;
    } else if (character === "." || character === "!" || character === ";") {
      sentenceCount += 1;
    }
  }

  const wordCount = spacesCount + 1;
  const L = (letterCount * 100) / wordCount;
  const S = (sentenceCount * 100) / wordCount;

  const grade = Math.round(0.0588 * L - 0.296 * S - 15.8);

  const summary = await summarize(text);

  chrome.runtime.sendMessage({
    action: "evaluateReadability",
    letterCount,
    sentenceCount,
    grade: grade > 0 ? grade : "Something went wrong",
    wordCount,
    summary,
  });
}
