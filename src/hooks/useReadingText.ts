import { useEffect, useState } from "react";
import { LOCAL_STORAGE_KEY } from "../constants";
import { handleActionMessage } from "../utils";
import type { ReadabilityData } from "../interfaces";

export const useReadingText = () => {
    const [readingText, setReadingText] = useState<ReadabilityData | null>(null);

    useEffect(() => {
        const stored = window.localStorage.getItem(LOCAL_STORAGE_KEY);
        if (stored) {
            setReadingText(JSON.parse(stored));
        }

        chrome.runtime.onMessage.addListener((message) =>
            handleActionMessage({ message, setReadingText })
        );

        return () => {
            chrome.runtime.onMessage.removeListener(handleActionMessage);
        };
    }, []);

    return { readingText };
}