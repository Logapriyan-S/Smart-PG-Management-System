
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are the "Smart PG Assistant", a friendly and helpful AI virtual assistant for a Paying Guest (PG) management system.
Your goal is to help residents with their daily queries, PG rules, and operational help.

Key Information for you to use:
- To raise a complaint: Go to the 'Complaints' tab and click 'Raise New Complaint'.
- PG Common Rules: No loud music after 10 PM, visitors allowed till 8 PM, keep the common areas clean.
- Facilities: 24/7 Water, Wi-Fi included, Laundry services on weekends.
- Food Timing: Breakfast (8-9 AM), Lunch (1-2 PM), Dinner (8-9 PM).
- If a resident asks about the status of their complaint, tell them they can check it in the 'Complaints' dashboard.

Be concise, helpful, and professional. If you don't know something specific to this PG's real-time operations, suggest they contact the Warden/Admin.
`;

export async function getChatbotResponse(prompt: string): Promise<string> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    return response.text || "I'm sorry, I couldn't generate a response right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I am having some trouble connecting to my brain. Please try again later!";
  }
}
