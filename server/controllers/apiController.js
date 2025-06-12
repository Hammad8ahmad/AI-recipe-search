
// Contoller for getting recipes from openai api

const { fetchingRecipesFromEdamam } = require("../Services/edamamApiService");


const getRecipesFromEdamamApi = async (req, res, next) => {
  try {
    const item = req.body.items;

    // Validation
    if (!item) {
      throw createError(400, "Please enter any ingredients.");
    }

    // Fetch recipes from the service layer
    const recipes = await fetchingRecipesFromEdamam(item)

    res.status(201).json(recipes);
  } catch (error) {
    next(error);
  }
};


module.exports = {getRecipesFromEdamamApi}