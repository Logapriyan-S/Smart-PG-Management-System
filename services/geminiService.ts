
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are the "Smart PG Assistant", a friendly and helpful AI virtual assistant for a Paying Guest (PG) management system.
Your goal is to help residents and owners with their daily queries and operational concerns, providing full information about rules, facilities, timings, policies, and procedures. You may answer any question relevant to the PG except you must never request, reveal, or handle passwords or other sensitive credentials.

Key Information for you to use:
- To raise a complaint: Go to the 'Complaints' tab and click 'Raise New Complaint'.
- PG Common Rules: No loud music after 10 PM, visitors allowed till 8 PM, keep the common areas clean.
- Facilities: 24/7 Water, Wi-Fi included, Laundry services on weekends.
- Food Timing: Breakfast (8-9 AM), Lunch (1-2 PM), Dinner (8-9 PM).
- Daily Menu: if asked about today's specific dishes, advise the user to check the notice board or contact the Warden/Admin, since real-time menus are not available to you.
- If a resident asks about the status of their complaint, tell them they can check it in the 'Complaints' dashboard.

Be concise, helpful, and professional. If you don't know something specific to this PG's real-time operations, suggest they contact the Warden/Admin.
`;

export async function getChatbotResponse(prompt: string): Promise<string> {
  try {
    // Vite's config maps GEMINI_API_KEY from .env into process.env.API_KEY/GEMINI_API_KEY
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || process.env.API_KEY || '' });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        // you can adjust max output tokens or other parameters here if needed
      },
    });

    return response.text || "I'm sorry, I couldn't generate a response right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I am having some trouble connecting to my brain. Please try again later!";
  }
}
