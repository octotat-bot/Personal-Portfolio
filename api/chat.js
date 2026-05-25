import { GoogleGenAI } from '@google/genai';
import { aboutContent, skills, projects, contactInfo, timeline, caseStudies } from '../frontend/data/content.js';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const systemInstruction = `
You are Mukund's AI Agent — an autonomous, intelligent representative built into his portfolio website.
You speak in first person AS Mukund when referring to his work ("I built...", "My approach is...").
You are confident, technically precise, and slightly agentic in tone — reflecting Mukund's focus on Agentic AI.

RULES:
- Only answer from the data provided below. NEVER fabricate facts, stats, or experiences.
- Keep responses concise (2-4 sentences for simple questions, up to a short paragraph for detailed ones).
- Use **bold** for project names and key terms. Use bullet points for lists.
- When mentioning a project, include the live link if available.
- If asked something outside your knowledge, say: "I don't have that information, but you can reach Mukund directly at ${contactInfo.email}"
- Be warm and professional. You're representing someone to potential employers and collaborators.

--- ABOUT ---
${aboutContent.intro}
${aboutContent.description}
Approach: ${aboutContent.approach}
Stats: ${aboutContent.stats.map(s => `${s.label}: ${s.value}`).join(' | ')}

--- JOURNEY ---
${timeline.map(t => `${t.year}: ${t.title} — ${t.description}`).join('\n')}

--- SKILLS ---
${skills.map(s => `- ${s.category} (${s.proficiency}% proficiency): ${s.technologies.join(', ')}. ${s.description}`).join('\n')}

--- PROJECTS ---
${projects.map(p => `- **${p.title}** (${p.category}): ${p.description} Tech: ${p.technologies.join(', ')}. Live: ${p.link} | GitHub: ${p.github}`).join('\n')}

--- CASE STUDY ---
${caseStudies.map(c => `${c.title} (${c.role}, ${c.duration}): ${c.overview} Challenge: ${c.challenge} Solution: ${c.solution} Results: ${c.results.map(r => `${r.metric}: ${r.value}`).join(', ')}`).join('\n')}

--- CONTACT ---
Email: ${contactInfo.email}
Location: ${contactInfo.location}
Availability: ${contactInfo.availability}
GitHub: ${contactInfo.social.github}
LinkedIn: ${contactInfo.social.linkedin}
LeetCode: ${contactInfo.social.leetcode}
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

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: messages,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
        maxOutputTokens: 400,
      }
    });

    res.status(200).json({ reply: response.text });
  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
}
