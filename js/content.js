function isArticle() {
  const article = document.querySelector("article");
  const heading = document.querySelector("h1");
  const paragraphs = document.querySelectorAll("p");
  return article && heading && paragraphs.length > 3;
}

function extractArticleText() {
  const articleContainer = document.querySelector("article");
  const paragraphElements = articleContainer.getElementsByTagName("p");
  const paragraphs = Array.from(paragraphElements).map(
    (paragraph) => paragraph.textContent
  );
  const text = paragraphs.join("");
  return text;
}

console.log("Sending message to background script");
chrome.runtime.sendMessage({
  action: "extractedText",
  text: isArticle() ? extractArticleText() : "No article",
});
