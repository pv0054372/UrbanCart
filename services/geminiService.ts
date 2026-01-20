import { GoogleGenAI } from "@google/genai";
import { Product } from '../types';

let client: GoogleGenAI | null = null;

const getClient = () => {
  if (!client && process.env.API_KEY) {
    client = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return client;
};

export const askProductAI = async (product: Product, question: string): Promise<string> => {
  const ai = getClient();
  if (!ai) return "AI services are currently unavailable. Please check your API configuration.";

  try {
    const prompt = `
      You are an expert shopping assistant for the e-commerce store "Urban Cart".
      A customer is asking a question about the following product:
      
      Title: ${product.title}
      Description: ${product.description}
      Price: $${product.price}
      Category: ${product.category}
      Specs: ${JSON.stringify(product.specifications)}

      Customer Question: "${question}"

      Provide a helpful, sales-oriented, yet honest answer. Keep it concise (under 80 words).
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "I couldn't generate an answer at this moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble connecting to the product knowledge base.";
  }
};

export const getSmartShoppingAdvice = async (query: string): Promise<string> => {
  const ai = getClient();
  if (!ai) return "AI services unavailable.";

  try {
    const prompt = `
      You are "UrbanBot", a helpful shopping assistant on Urban Cart.
      The user says: "${query}"
      
      Provide a friendly response helping them find products or understand shopping trends.
      Keep it brief and engaging.
    `;
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    
    return response.text || "I didn't catch that, could you rephrase?";
  } catch (error) {
    return "I'm offline right now.";
  }
};
