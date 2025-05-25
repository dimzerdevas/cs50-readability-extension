import { EVALUATE_READABILITY_EVENT, LOCAL_STORAGE_KEY } from "./constants";
import type { ReadabilityData } from "./intefaces";

export const handleActionMessage = async ({ message, setReadingText }: {
    message: {
        action: string;
        text: string | null;
    };
    setReadingText: (string: ReadabilityData) => void;
}) => {
    if (message.action === EVALUATE_READABILITY_EVENT) {

        const {
            letterCount,
            sentenceCount,
            wordCount,
            grade,
        } = await evaluateReadability(message.text || "");

        const summary = await getPromptResponse(message.text || "");

        persistReadingData({
            letterCount,
            wordCount,
            sentenceCount,
            grade,
            summary,
        })

        setReadingText({
            letterCount: letterCount ?? 0,
            wordCount: wordCount ?? 0,
            sentenceCount: sentenceCount ?? 0,
            grade: grade ?? 0,
            summary: summary ?? "",
        });
    }
};

// Make reading data persistent
export const persistReadingData = ({
    letterCount,
    wordCount,
    sentenceCount,
    grade,
    summary,
}: ReadabilityData) => {
    localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({
            letterCount: letterCount ?? 0,
            wordCount: wordCount ?? 0,
            sentenceCount: sentenceCount ?? 0,
            grade: grade ?? 0,
            summary: summary ?? "",
        })
    );
}

// Utilize the Gemini API to get a response
export const getPromptResponse = async (text: string) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const prompt = `You are a helpful assistant. Your task is to explain the following text in a way that a 5-year-old can understand. The text is: ${text}`;

    const raw = JSON.stringify({
        contents: [
            {
                parts: [
                    {
                        text: prompt,
                    },
                ],
            },
        ],
    });

    const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    // Fetch the API key from the config file
    const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

    const GENERATE_CONTENT_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent`;
    const response = await fetch(
        `${GENERATE_CONTENT_URL}?key=${GOOGLE_API_KEY}`,
        requestOptions
    );

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    const [candidate] = await result.candidates;
    const [part] = await candidate.content.parts;

    return part.text;
};

// Utility Function to evaluate readability
export const evaluateReadability = async (text: string) => {
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

    // CS50's formula for readability:
    const wordCount = spacesCount + 1;
    const L = (letterCount * 100) / wordCount;
    const S = (sentenceCount * 100) / wordCount;

    const grade = Math.round(0.0588 * L - 0.296 * S - 15.8);

    return {
        letterCount,
        sentenceCount,
        wordCount,
        grade,
    };
};