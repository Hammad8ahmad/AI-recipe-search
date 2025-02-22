
// Contoller for getting recipes from openai api

const { fetchRecipesFromOpenAI } = require("../Services/openAiService");

const getRecipesFromOpenAiApi = async (req, res, next) => {
  try {
    const ingredients = req.body.items;

    // Validation
    if (!ingredients) {
      throw createError(400, "Please enter any ingredients.");
    }

    if (ingredients.length < 3) {
      throw createError(401, "Please enter at least 3 ingredients.");
    }

    console.log("Ingredients before API call:", ingredients);

    // Fetch recipes from the service layer
    const recipes = await fetchRecipesFromOpenAI(ingredients);
    res.status(201).json(recipes);
  } catch (error) {
    next(error);
  }
};

module.exports = {getRecipesFromOpenAiApi}