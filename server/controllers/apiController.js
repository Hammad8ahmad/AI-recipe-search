
// Contoller for getting recipes from openai api

const { fetchingRecipesFromEdamam } = require("../Services/edamamApiService");
const { fetchYouTubeVideos } = require("../Services/fetchYoutubeVideos");
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
    const recipeLabels = recipes.map(recipe => recipe.recipe.label)

    const fetchYoutubeVideosForRecipes = async (recipeLabels) => {
      const videosPromises =  recipeLabels.map((labelName) => fetchYouTubeVideos(labelName))
      const videoResults = await Promise.all(videosPromises);
      return videoResults
    }
   const videos = await fetchYoutubeVideosForRecipes(recipeLabels)
   console.log("videos : ",videos)
   console.log(JSON.stringify(videos, null, 2));

   console.log("videos id : ", videos.id,"videos snippet : ",videos.snippet)
    // console.log("recipes" ,recipes.map(recipe => recipe.recipe.label))

 




    res.status(201).json({data : {recipes,videos}});
  } catch (error) {
    next(error);
  }
};

module.exports = {getRecipesFromOpenAiApi}