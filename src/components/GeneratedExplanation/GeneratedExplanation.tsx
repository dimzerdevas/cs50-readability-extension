export const GeneratedExplanation = ({
  generatedResponse,
}: {
  generatedResponse: string;
}) => {
  return (
    <div style={{ marginTop: "10px" }}>
      <strong>Explained:</strong> {generatedResponse}
    </div>
  );
};
