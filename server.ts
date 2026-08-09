import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// Medical Safety System Instruction for AI Assistant
const MEDICAL_SAFETY_SYSTEM_INSTRUCTION = `
You are the PRAVYA Recovery Assistant. You are a supportive, empathetic, and clear companion for a user undergoing physical rehabilitation and recovery based on an existing plan from a qualified healthcare professional.

CRITICAL MEDICAL SAFETY RULES:
1. You are NOT a doctor or medical professional.
2. NEVER diagnose conditions, symptoms, or injuries.
3. NEVER prescribe exercises, treatments, or modify professional rehabilitation plans.
4. NEVER calculate percentage healed or claim that the user is healed.
5. NEVER predict medical recovery timelines or outcomes.
6. ONLY organize, summarize, track, compare, explain existing instructions, and provide encouraging support for adherence to their professional plan.
7. If the user asks for a diagnosis, exercise prescription, or medical treatment recommendation, respond:
   "I cannot provide medical diagnoses, treatment plans, or exercise prescriptions. Please consult a qualified healthcare professional for appropriate guidance."
8. If the user mentions new, severe, or worsening symptoms (e.g., sharp pain, sudden swelling, numbness, fever), respond:
   "Please contact your healthcare professional immediately for appropriate guidance regarding new or worsening symptoms."
9. Maintain a calm, human, safe, clear, and supportive tone at all times.
`;

// API Route for AI Assistant
app.post("/api/assistant", async (req, res) => {
  try {
    const { prompt, history, planContext } = req.body;

    const ai = getGeminiClient();
    if (!ai) {
      // Fallback friendly response if no API key configured
      return res.json({
        text: "I am currently running in offline supportive mode. Please ensure you follow your healthcare professional's plan. Remember to track today's session and check in after completing your exercises!",
      });
    }

    const contextPrompt = planContext
      ? `User's Recovery Context:
Condition/Recovery: ${planContext.conditionName || "General Rehab"}
Category: ${planContext.category || "Rehabilitation"}
Goal: ${planContext.goal || "Restore mobility & strength"}

User Query: ${prompt}`
      : prompt;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: contextPrompt,
      config: {
        systemInstruction: MEDICAL_SAFETY_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    return res.json({
      text: response.text || "Thank you for sharing. Please keep following your professional plan.",
    });
  } catch (error: any) {
    console.error("Error calling Gemini API:", error);
    return res.status(500).json({
      error: "Failed to process request with AI assistant.",
      text: "I am unable to process that right now. Please continue adhering to your professional plan and consult your healthcare team for any concerns.",
    });
  }
});

// API Route for Weekly Recovery Story Generator
app.post("/api/weekly-story", async (req, res) => {
  try {
    const { weekData, planContext } = req.body;

    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        story: `This week you completed ${weekData?.recordedSessions || 0} sessions out of ${weekData?.plannedSessions || 0} planned sessions. Great dedication to your recovery journey!`,
      });
    }

    const storyPrompt = `
Generate a warm, encouraging 2-paragraph "Weekly Recovery Story" based ONLY on these factual adherence statistics:
- Condition: ${planContext?.conditionName || "Rehabilitation"}
- Planned sessions: ${weekData?.plannedSessions || 7}
- Recorded sessions: ${weekData?.recordedSessions || 5}
- Milestones reached: ${weekData?.milestonesReached || 1}
- Check-ins completed: ${weekData?.checkinsCompleted || 5}
- Active days: ${weekData?.activeDays || 4}

DO NOT claim the user is healed or make medical predictions. Strictly praise their consistency, adherence, and dedication to their healthcare professional's plan.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: storyPrompt,
      config: {
        systemInstruction: MEDICAL_SAFETY_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    return res.json({
      story: response.text,
    });
  } catch (error) {
    console.error("Error generating weekly story:", error);
    return res.json({
      story: "You showed great consistency this week in following your professional rehabilitation plan!",
    });
  }
});

// Serve frontend / Vite middleware
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`PRAVYA server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
