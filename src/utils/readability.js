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
