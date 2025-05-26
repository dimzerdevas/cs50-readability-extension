import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { GENERATE_CONTENT_URL, GOOGLE_API_KEY } from "../constants";

const getPrompt = (text: string) =>
  `Explain the following text in a way that a 5-year-old can understand. The text is: ${text}`;
const getRequestBody = (text: string) => ({
  contents: [
    {
      parts: [
        {
          text: getPrompt(text),
        },
      ],
    },
  ],
});

export const getPromptResponse = async (text: string) => {
  const response = await axios.post(
    `${GENERATE_CONTENT_URL}?key=${GOOGLE_API_KEY}`,
    getRequestBody(text),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.status !== 200) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.data;
};

export const useExplanation = ({ text }: { text: string }) => {
  const query = useQuery({
    queryKey: ["explanationQuery"],
    queryFn: () => getPromptResponse(text),
    refetchOnWindowFocus: false,
    enabled: false,
    select: (data) => data.candidates[0].content.parts[0].text,
  });

  const {
    data: explanation,
    isLoading: isLoadingExplanation,
    isError: isErrorExplanation,
    error: errorExplanation,
    refetch: refetchExplanation,
  } = query;

  return {
    explanation,
    isLoadingExplanation,
    isErrorExplanation,
    errorExplanation,
    refetchExplanation,
  };
};
