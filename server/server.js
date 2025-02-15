const express = require("express");
const cors = require("cors");
const app = express();
const OpenAI = require("openai");
const dotenv = require("dotenv");

// Cors 
const corsOptions = {
  origin: ["http://localhost:5173"],
};

dotenv.config();
app.use(cors(corsOptions));
app.use(express.json());

// Post request for getting ingredients and then sending those to the api for a response
app.post("/recipe-search", async (req, res) => {
  const ingredients = req.body.items;

  console.log("THESE ARE ALL THE INGREDIENTS BEFORE API CALL", ingredients);

  // Getting response from the OpenAi API
  const token = process.env["GITHUB_TOKEN"];

  async function main(ingredients) {
    console.log("these are the ingredients inside the api function : ", ingredients);
    
    const client = new OpenAI({
      baseURL: "https://models.inference.ai.azure.com",
      apiKey: token,
    });

    try {
      const response = await client.chat.completions.create({
        messages: [
          { role: "system", content: "" },
          {
            role: "user",
            content: `Given the ingredients: "${ingredients[0]}, ${ingredients[1]}, ${ingredients[2]}", please provide exactly 1 recipe with the following structure:
{
  "recipes": [
    {
      "name": "Recipe Name",
      "ingredients": [array of ingredients],
      "instructions": [array of steps of instructions]
    },
    {
      "name": "Recipe Name",
      "ingredients": [array of ingredients],
      "instructions": [array of steps of instructions]
    },
    {
      "name": "Recipe Name",
      "ingredients": [array of ingredients],
      "instructions": [array of steps of instructions]
    }
  ]
}

Ensure the response is valid js object without any extraneous text or formatting, just the js object as shown above.`
          },
        ],
        model: "gpt-4o",
        temperature: 1,
        max_tokens: 2048,
        top_p: 1,
      });

      console.log("ACTUAL RESPONSE COMING FROM THE API", response.choices[0].message.content);

      // Parse the raw response into a JSON object if it's a string
      const rawResponse = response.choices[0].message.content;
      
      // If the response is a JSON string, we parse it to JSON
      try {
        const jsonResponse = JSON.parse(rawResponse);

        // Send the parsed JSON response back to the frontend
        res.status(201).json(jsonResponse);
      } catch (error) {
        // If parsing fails, handle the error and send a proper response
        console.error("Error parsing JSON from OpenAI API:", error);
        res.status(500).json({ error: "Failed to parse the OpenAI API response" });
      }
      
    } catch (error) {
      // Handle API request error
      console.error("The sample encountered an error:", error);
      res.status(500).json({ error: "Failed to get the recipe from the API" });
    }
  }

  main(ingredients);
});

app.listen(3000, () => {
  console.log("Server started listening at port 3000.");
});
