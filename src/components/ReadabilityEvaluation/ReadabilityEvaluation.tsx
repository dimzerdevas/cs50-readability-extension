export const ReadabilityEvaluation = ({
  originalText,
  letterCount,
  wordCount,
  sentenceCount,
  grade,
}: {
  originalText?: string;
  letterCount?: number;
  wordCount?: number;
  sentenceCount?: number;
  grade?: number;
}) => {
  return (
    <>
      <div>
        <strong>Original text:</strong> {originalText || "No text provided"}
      </div>
      <div>
        <strong>Letters:</strong> {letterCount || 0}
      </div>
      <div>
        <strong>Words:</strong> {wordCount || 0}
      </div>
      <div>
        <strong>Sentences:</strong> {sentenceCount || 0}
      </div>
      <div>
        <strong>Grade:</strong> {grade || "N/A"}
      </div>
    </>
  );
};
