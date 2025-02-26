const OpenAI = require("openai");

const fetchRecipeOptimizationFromOpenAI = async (recipe) => {
  console.log("Optimizing recipe:", recipe.recipe.label);

  const token = process.env["GITHUB_TOKEN"]; // Use OpenAI API key

  const client = new OpenAI({
    baseURL: "https://models.inference.ai.azure.com",
    apiKey: token,
  });

  const response = await client.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a culinary expert focused on optimizing recipes for better taste, nutrition, and simplicity.",
      },
      {
        role: "user",
        content: `Optimize the following recipe by improving its flavor, making it healthier, and suggesting cooking tips. Return the data in JSON format:

Recipe Name: ${recipe.recipe.label}
Ingredients: ${recipe.recipe.ingredients.map((ing) => ing.text).join(", ")}

Provide suggestions in this format:

{
  "recipe": "Recipe Name",
  "optimized_ingredients": ["List of improved ingredients"],
  "cooking_tips": ["Suggestions to enhance taste or simplify cooking"],
  "health_tips": ["Ways to make the recipe healthier"],
  "flavor_profile": "Brief summary of the optimized flavor profile"
}
important : Dont say anything else just give me the pure json  
`,
      },
    ],
    model: "gpt-4o",
    temperature: 0.7,
    max_tokens: 1024,
    top_p: 1,
  });

  const rawResponse = response.choices[0]?.message?.content || "";
  console.log("RAW RESPONSE :", rawResponse);

  const cleanedResponse = rawResponse
    .replace(/^```json/, "")
    .replace(/```$/, "")
    .trim();

  return JSON.parse(cleanedResponse);
};

module.exports = { fetchRecipeOptimizationFromOpenAI };
