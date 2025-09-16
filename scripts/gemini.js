import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";
const modelName = "gemini-2.5-pro";
var genAI;
var model;
var API_KEY;

export async function callGemini(prompt) {
    try {
        console.log("Received request, sending ...");
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        return text;
    } catch (error) {
        console.error("An error occurred while calling gemini:", error);
        throw error;
    }
}

export async function listModels() {
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const modelNames = data.models.map((model) => model.name);
        return modelNames;
    } catch (error) {
        console.error("An error occurred while listing models:", error);
        throw error;
    }
}

export function setAPIKey(key) {
    API_KEY = key;
    genAI = new GoogleGenerativeAI(API_KEY);
    model = genAI.getGenerativeModel({ model: modelName });
}

export function getAPIKey() {
    if (API_KEY) return API_KEY;
    return undefined;
}
