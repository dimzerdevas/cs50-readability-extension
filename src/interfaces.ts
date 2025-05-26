export type ReadabilityData = {
    letterCount: number;
    wordCount: number;
    sentenceCount: number;
    grade: number | string;
    originalText: string;
};

export interface PersistentReadabilityData extends ReadabilityData {
    generatedResponse: string;
}