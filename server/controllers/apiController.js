
// Contoller for getting recipes from openai api

const { fetchingRecipesFromEdamam } = require("../Services/edamamApiService");
// const { fetchRecipesFromOpenAI } = require("../Services/openAiService");

const getRecipesFromOpenAiApi = async (req, res, next) => {
  try {
    const item = req.body.items;

    // Validation
    if (!item) {
      throw createError(400, "Please enter any ingredients.");
    }


    console.log("Item before API call:", item);
    



    // Fetch recipes from the service layer
    // const recipes = await fetchRecipesFromOpenAI(ingredients);
    const recipes = await fetchingRecipesFromEdamam(item)




    res.status(201).json(recipes);
  } catch (error) {
    next(error);
  }
};

module.exports = {getRecipesFromOpenAiApi}