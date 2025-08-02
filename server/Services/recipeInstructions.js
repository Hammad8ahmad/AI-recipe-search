const OpenAI = require("openai");

const fetchRecipeInstructionsFromOpenAI = async (recipe) => {
  console.log("Rewriting instructions for recipe:", recipe.recipe.label);

  const token = process.env["GITHUB_TOKEN"]; // Use OpenAI API key

  const client = new OpenAI({
    baseURL: "https://models.inference.ai.azure.com",
    apiKey: token,
  });

  const response = await client.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a professional chef specializing in writing clear, concise, and easy-to-follow cooking instructions.",
      },
      {
        role: "user",
        content: `Rewrite the cooking instructions for the following recipe. Make the steps simple, clear, and beginner-friendly. Return the data in JSON format:

Recipe Name: ${recipe.recipe.label}
Ingredients: ${recipe.recipe.ingredients.map((ing) => ing.text).join(", ")}

Provide instructions in this format:

{
  "recipe": "Recipe Name",
  "simplified_instructions": ["List of instructions],
  "cooking_tips": ["Extra tips for better results"],
  "time_estimate": "Estimated time to prepare and cook"
}
important : Dont say anything else just give me the pure json  
`,
      },
    ],
    model: "gpt-4o",
    temperature: 0.3,
    max_tokens: 1024,
    top_p: 1,
  });

  const rawResponse = response.choices[0]?.message?.content || "";
  console.log("RAW RESPONSE:", rawResponse);

  const cleanedResponse = rawResponse
    .replace(/^```json/, "")
    .replace(/```$/, "")
    .trim();

  return JSON.parse(cleanedResponse);
};

module.exports = { fetchRecipeInstructionsFromOpenAI };




