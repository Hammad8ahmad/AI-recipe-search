const OpenAI = require("openai");

const fetchNutritionalAnalysisFromOpenAI = async (recipe) => {
  console.log("this is inside the service",recipe.recipe.ingredients)
  const token = process.env["GITHUB_TOKEN"]; // Use OpenAI API key

  const client = new OpenAI({
    baseURL: "https://models.inference.ai.azure.com",
    apiKey: token,
  });

  const response = await client.chat.completions.create({
    messages: [
      { role: "system", content: "You are a nutrition expert providing accurate nutritional insights for recipes." },
      {
        role: "user",
        content: `Analyze the nutritional value of the following recipe and return the data in JSON format:

Recipe Name: ${recipe.recipe.label}
Ingredients: ${recipe.recipe.ingredients.map((ing) => ing.text).join(", ")}

Provide insights in this format:

{
  "recipe": "Recipe Name",
  "calories": "Total calories",
  "macros": {
    "carbohydrates": "Grams",
    "protein": "Grams",
    "fat": "Grams"
  },
  "micronutrients": {
    "vitamins": ["List of key vitamins"],
    "minerals": ["List of key minerals"]
  },
  "health_benefits": ["List some health benefits of this recipe"]
}
important : Dont say anything else just give me the pure json  
`
      },
    ],
    model: "gpt-3.5-turbo",
    temperature: 0.7,
    max_tokens: 1024,
    top_p: 1,
  });

  const rawResponse = response.choices[0]?.message?.content || "";
  console.log("RAW RESPONSE : ",rawResponse)
  const cleanedResponse = rawResponse
    .replace(/^```json/, "")
    .replace(/```$/, "")
    .trim();
    console.log(cleanedResponse)

  return JSON.parse(cleanedResponse);
};

module.exports = { fetchNutritionalAnalysisFromOpenAI};
