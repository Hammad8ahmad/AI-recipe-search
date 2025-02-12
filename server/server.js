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

  // Getting response from the OpenAi api

  const token = process.env["GITHUB_TOKEN"];
  async function main(ingredients) {
    console.log(
      "these are the ingredients inside the api function : ",
      ingredients
    );
    const client = new OpenAI({
      baseURL: "https://models.inference.ai.azure.com",
      apiKey: token,
    });

    // The actual try catch block for openai api that fetches the response from the model

    try {
      const response = await client.chat.completions.create({
        messages: [
          { role: "system", content: "" },
          {
            role: "user",
            content: `i have 3 ingredients tell me what sort of recipes can i make with them and also give instructions on how to make those ${ingredients[0]},${ingredients[1]} and ${ingredients[2]} also give only 3 recipes and return a json with the headings as properties and directly give me the json wihtout saying anything else and it should have an array of recipes objects each containing different recipes with ingredients and instructions as arrays and a recipe name as a property keep that same json structure everytime `,
          },
        ],
        model: "gpt-4o",
        temperature: 1,
        max_tokens: 4096,
        top_p: 1,
      });

      

      // Cleaning up the text and removing * and #

      const text = response.choices[0].message.content;
      console.log("raw text : ", text);
      const cleanUp = (text) => {
        return text.replace(/[#*-]/g, "");
      };
      
      const recipes = cleanUp(text);
      let cleanedResponse = recipes.replace(/^```json\n|\n```$/g, "").trim();

      console.log(cleanedResponse);
      const recipeObj = JSON.parse(cleanedResponse);

      res.status(201).json(recipeObj);
    } catch (error) {


      // Handling error response

      console.error("The sample encountered an error:", error);
      res.status(500).json({ error: "failed to get the recipe from the api" });
    }
  }
  main(ingredients);

  
});

app.listen(3000, () => {
  console.log("server started listening at 3000.");
});


