import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { BrandIdentity, ImageSize } from "../types";

const MODEL_TEXT = "gemini-3.1-pro-preview";
const MODEL_IMAGE = "gemini-3-pro-image-preview";

export const generateBrandStrategy = async (mission: string): Promise<Partial<BrandIdentity>> => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
  
  const response = await ai.models.generateContent({
    model: MODEL_TEXT,
    contents: `Generate a brand identity strategy for a company with this mission: "${mission}". 
    Provide a brand name, a catchy tagline, a 5-color hex palette with names and usage notes, and a Google Font pairing (one for headers, one for body) with a rationale.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          brandName: { type: Type.STRING },
          tagline: { type: Type.STRING },
          palette: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                hex: { type: Type.STRING, description: "Hex code including #" },
                name: { type: Type.STRING },
                usage: { type: Type.STRING, description: "How to use this color in the brand" }
              },
              required: ["hex", "name", "usage"]
            }
          },
          fonts: {
            type: Type.OBJECT,
            properties: {
              headerFont: { type: Type.STRING, description: "Name of a popular Google Font for headers" },
              bodyFont: { type: Type.STRING, description: "Name of a popular Google Font for body text" },
              rationale: { type: Type.STRING }
            },
            required: ["headerFont", "bodyFont", "rationale"]
          }
        },
        required: ["brandName", "tagline", "palette", "fonts"]
      }
    }
  });

  return JSON.parse(response.text || "{}");
};

export const generateBrandImage = async (prompt: string, size: ImageSize): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
  
  const response = await ai.models.generateContent({
    model: MODEL_IMAGE,
    contents: {
      parts: [{ text: prompt }]
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1",
        imageSize: size
      }
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  
  throw new Error("No image generated");
};

export const chatWithGemini = async (history: { role: string, text: string }[], message: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
  const chat = ai.chats.create({
    model: MODEL_TEXT,
    config: {
      systemInstruction: "You are a world-class brand consultant. Help the user refine their brand identity, answer questions about design choices, and provide creative advice.",
    }
  });

  // We don't use history directly in create, we send messages. 
  // For simplicity in this demo, we'll just send the current message context if needed, 
  // but sendMessage handles the chat session.
  
  const response = await chat.sendMessage({ message });
  return response.text;
};
