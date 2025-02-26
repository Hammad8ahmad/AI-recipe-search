const { fetchRecipeOptimizationFromOpenAI } =  require("../Services/recipeOptimization")


const getRecipeOptimizationfromAi = async(req,res,next) => {

    try {
    const recipe = req.body;
    console.log("this is in the server",recipe)
    const aiResponse = await fetchRecipeOptimizationFromOpenAI(recipe)
    console.log("//////////////////////");
    console.log("AI REPSONSE IN CONTROLER",aiResponse)
    console.log("//////////////////////");


    res.status(201).json(aiResponse)
        
    } catch (error) {
        next(error)
    }

}

module.exports = getRecipeOptimizationfromAi