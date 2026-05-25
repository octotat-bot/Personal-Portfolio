import { GoogleGenAI } from '@google/genai';
import { aboutContent, skills, projects, contactInfo, timeline } from '../frontend/data/content.js';

// Initialize the Google Gen AI SDK
// Vercel automatically loads environment variables from your Vercel project settings or a local .env file
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Compile the system instruction from your existing data
const systemInstruction = `
You are an autonomous AI agent representing Mukund Mangla, built into his personal portfolio website. 
Your goal is to answer questions from visitors about Mukund's experience, skills, projects, and background. 
Be highly professional, knowledgeable, and slightly "agentic" in tone (as Mukund focuses on Agentic AI).
Do NOT make up facts. Only use the provided data below. If someone asks something outside this scope, politely decline or direct them to contact Mukund.

--- BACKGROUND ---
${aboutContent.intro}
${aboutContent.description}
Approach: ${aboutContent.approach}

--- SKILLS ---
${skills.map(s => `- ${s.category}: ${s.technologies.join(', ')}. ${s.description}`).join('\n')}

--- PROJECTS ---
${projects.map(p => `- ${p.title} (${p.category}): ${p.description} Tech stack: ${p.technologies.join(', ')}.`).join('\n')}

--- CONTACT ---
Email: ${contactInfo.email}
Location: ${contactInfo.location}
Availability: ${contactInfo.availability}
`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { messages } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid messages array' });
    }

    // Use Gemini 2.5 Flash for fast conversational responses
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: messages,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    res.status(200).json({ reply: response.text });
  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
}
