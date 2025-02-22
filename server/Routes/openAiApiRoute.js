const express = require("express");
const router = express.Router();
const OpenAI = require("openai");


/*

 Post route for getting ingredients from the client
 and sending them to the openAI API and then sending the response
 in the form of recipes back to the client

*/

router.post("/", async (req, res,next) => {
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
      next(error)
    }
  }

  main(ingredients);
})

module.exports = router