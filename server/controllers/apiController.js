
// Contoller for getting recipes from openai api

const { fetchingRecipesFromEdamam } = require("../Services/edamamApiService");


const getRecipesFromEdamamApi = async (req, res, next) => {
  try {
    const item = req.body.items;
    console.log("this is the item going in edamam",item)

    // Validation
    if (!item) {
      throw Error("Please enter any ingredients.");
    }

    // Fetch recipes from the service layer
    const recipes = await fetchingRecipesFromEdamam(item)
    console.log()

    res.status(201).json(recipes);
  } catch (error) {
    next(error);
  }
};



module.exports = {getRecipesFromEdamamApi}



