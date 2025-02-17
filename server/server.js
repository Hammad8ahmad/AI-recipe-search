const express = require("express");
const cors = require("cors");
const app = express();
const OpenAI = require("openai");
const dotenv = require("dotenv");
const errorHandler = require("./errorMiddleware");
const pool = require("./db");
// const { default: errorHandler } = require("./errorMiddleware");

// Cors 
const corsOptions = {
  origin: ["http://localhost:5173"],
};

dotenv.config();
app.use(cors(corsOptions));
app.use(express.json());


// Test Route
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ message: "Connected to DB", time: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database connection failed" });
  }
});


// Post request for getting ingredients and then sending those to the api for a response
app.post("/recipe-search", async (req, res,next) => {
  const ingredients = req.body.items;

  if(!ingredients){

    const error = new Error("plz enter any ingredients")
    error.statusCode = 400;

    return next(error)
  }
  if(ingredients.length < 3){
    const error = new Error("plz enter at least 3 ingredients")
    error.statusCode = 401
    return next(error)
  }
  

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
          content: `Given the ingredients: "${ingredients.join(", ")}", generate a unique recipe everytime with the same ingredients too and dont say anything after the recipe just have it in this JSON format:

'{
  "recipes": [
    {
      "name": "Recipe Name",
      "ingredients": [array of ingredients],
      "instructions": [array of steps of instructions]
    },
  ]
}'`          },
        ],
        model: "gpt-4o",
        temperature: 1,
        max_tokens: 2048,
        top_p: 1,
      });

      console.log("ACTUAL RESPONSE COMING FROM THE API", response.choices[0].message.content);

      // Parse the raw response into a JSON object if it's a string
      const rawResponse = response.choices[0].message.content;
      const cleanedResponse = rawResponse.replace(/^```json/, "").replace(/```$/, "").trim();
      
      // If the response is a JSON string, we parse it to JSON
      try {
        const jsonResponse = JSON.parse(cleanedResponse);

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
      // res.status(500).json({ error: "Failed to get the recipe from the API" });
      next(error)
    }
  }

  main(ingredients);
});

// Post request for saving recipes
app.post("/recipe-search/save-recipe", async (req,res,next) => {

 const {name,ingredients,instructions} = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO recipes (name, ingredients, instructions) VALUES ($1, $2, $3) RETURNING *",
      [name, JSON.stringify(ingredients), JSON.stringify(instructions)]
    );

    res.status(201).json({ message: "Recipe saved", recipe: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }

})

// Attach error handling middleware
app.use(errorHandler);
app.listen(3000, () => {
  console.log("Server started listening at port 3000.");
});
