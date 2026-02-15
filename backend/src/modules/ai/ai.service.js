import axios from "axios";

export const generatePlanFromGemini = async ({ topic, days }) => {
// const prompt = `
// Create a ${days}-day learning plan for "${topic}".
// Each day should include:
// - title
// - theory
// - practice
// - resources
// Return JSON only.
// `;

  // const response = await axios.post(
  //   process.env.GEMINI_API_URL,
  //   {
  //     contents: [{ parts: [{ text: prompt }] }]
  //   },
  //   {
  //     headers: {
  //       "Content-Type": "application/json",
  //       "x-goog-api-key": process.env.GEMINI_API_KEY
  //     }
  //   }
  // );

  // const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
  // return JSON.parse(text);
  
  console.log("⚠️ Using mock AI response");
  await new Promise((res) => setTimeout(res, 1500));
  const text = { 
    summary: `AI-generated response for: ${topic}`,
    steps: [
      "Step 1: Understand the problem",
      "Step 2: Break it down",
      "Step 3: Solve incrementally",
    ],
  };
  return text;
};
