
import { GoogleGenAI, Type } from "@google/genai";
import type { FishData } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const fishIdSchema = {
  type: Type.OBJECT,
  properties: {
    isFish: {
      type: Type.BOOLEAN,
      description: "Is the creature in the image a fish? Must be true or false.",
    },
    commonName: {
      type: Type.STRING,
      description: "The common name of the fish. If it's not a fish, this should be an empty string.",
    },
    scientificName: {
      type: Type.STRING,
      description: "The scientific (Latin) name of the fish. If it's not a fish, this should be an empty string.",
    },
    description: {
      type: Type.STRING,
      description: "A detailed 2-3 sentence description of the fish, its appearance, and key characteristics. If it's not a fish, this should be an empty string.",
    },
    habitat: {
      type: Type.STRING,
      description: "The typical natural habitat of the fish (e.g., coral reefs, deep sea, freshwater rivers). If it's not a fish, this should be an empty string.",
    },
    diet: {
      type: Type.STRING,
      description: "The common diet of the fish. If it's not a fish, this should be an empty string.",
    },
  },
  required: ["isFish", "commonName", "scientificName", "description", "habitat", "diet"],
};


export const identifyFish = async (base64Image: string, mimeType: string): Promise<FishData | null> => {
  try {
    const textPart = {
      text: "You are an expert marine biologist. Identify the fish in this image. Provide the common name, scientific name, a detailed description, its typical habitat, and its common diet. If the image does not contain a fish, please set the 'isFish' property to false and leave the other fields empty."
    };
    
    const imagePart = {
      inlineData: {
        data: base64Image,
        mimeType: mimeType,
      },
    };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [textPart, imagePart] },
      config: {
        responseMimeType: "application/json",
        responseSchema: fishIdSchema,
      }
    });

    const jsonString = response.text.trim();
    const fishData: FishData = JSON.parse(jsonString);
    return fishData;

  } catch (error) {
    console.error("Error identifying fish:", error);
    return null;
  }
};
