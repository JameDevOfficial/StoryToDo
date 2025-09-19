import { GoogleGenAI } from "https://cdn.jsdelivr.net/npm/@google/genai@1.20.0/+esm";

const modelName = "gemini-2.5-pro";
const imageModelName = "gemini-2.0-flash";

var genAI;
var API_KEY;

export async function callGemini(prompt) {
    try {
        console.log("Received request, sending ...");
        const response = await genAI.models.generateContent({
            model: modelName,
            contents: prompt,
        });
        const text = response.text;
        return text;
    } catch (error) {
        console.error("An error occurred while calling gemini:", error);
        throw error;
    }
}

export async function genImage(prompt) {
    var response;
    try {
        console.log(genAI.models.list());
        console.log("Received image request, sending ...");
        response = await genAI.models.generateContent({
            model: imageModelName,
            contents: prompt,
        });
    } catch (error) {
        console.error(
            "An error occurred while calling gemini for image:",
            error,
        );
        throw error;
    }
    var genImg;
    for (const part of response.candidates[0].content.parts) {
        if (part.text) {
            console.log(part.text);
        } else if (part.inlineData) {
            const imageData = part.inlineData.data;
            const buffer = Buffer.from(imageData, "base64");
            genImg = buffer;
            console.log("Image returned");
        }
    }
    return genImg;
}

export function setAPIKey(key) {
    if (!key) {
        console.error("API Key is missing. Cannot initialize GoogleGenAI.");
        return;
    }
    API_KEY = key;
    genAI = new GoogleGenAI({ apiKey: API_KEY });
}

export function getAPIKey() {
    if (API_KEY) return API_KEY;
    return undefined;
}
