import axios from "axios";

export const generatePlanFromGemini = async ({ topic, days }) => {
  const prompt = `
Create a ${days}-day learning plan for "${topic}".
Each day should include:
- title
- theory
- practice
- resources
Return JSON only.
`;

  const response = await axios.post(
    process.env.GEMINI_API_URL,
    {
      contents: [{ parts: [{ text: prompt }] }]
    },
    {
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": process.env.GEMINI_API_KEY
      }
    }
  );

  const text =
    response.data.candidates?.[0]?.content?.parts?.[0]?.text;

  return JSON.parse(text);
};
