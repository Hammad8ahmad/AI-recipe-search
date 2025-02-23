// openai service to fetch data

const OpenAI = require("openai");

const fetchRecipesFromOpenAI = async (ingredients) => {
  const token = process.env["GITHUB_TOKEN"];

  const client = new OpenAI({
    baseURL: "https://models.inference.ai.azure.com",
    apiKey: token,
  });

  const response = await client.chat.completions.create({
    messages: [
      { role: "system", content: "" },
      {
        role: "user",
        content: `Given the ingredients: "${ingredients.join(
          ", "
        )}", generate a unique recipe in this JSON format:

{
  "recipes": [
    {
      "name": "Recipe Name",
      "ingredients": [array of ingredients],
      "instructions": [array of steps of instructions]
    }
  ]
}`},
    ],
    model: "gpt-4o",
    temperature: 1,
    max_tokens: 2048,
    top_p: 1,
  });

  const rawResponse = response.choices[0]?.message?.content || "";
  const cleanedResponse = rawResponse
    .replace(/^```json/, "")
    .replace(/```$/, "")
    .trim();

  return JSON.parse(cleanedResponse);
};

module.exports = { fetchRecipesFromOpenAI };
