const { fetchRecipeOptimizationFromOpenAI } =  require("../Services/recipeOptimization")


const getRecipeOptimizationfromAi = async(req,res,next) => {

    try {
    const recipe = req.body;
    const aiResponse = await fetchRecipeOptimizationFromOpenAI(recipe)
    
    res.status(201).json(aiResponse)
        
    } catch (error) {
        next(error)
    }

}

module.exports = getRecipeOptimizationfromAi