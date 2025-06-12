const { fetchRecipeOptimizationFromOpenAI } =  require("../Services/recipeOptimization")


const getRecipeOptimizationfromAi = async(req,res,next) => {
    try {
    const start = performance.now();
    const recipe = req.body;
    const aiResponse = await fetchRecipeOptimizationFromOpenAI(recipe)
    const end = performance.now();
    console.log(`Frontend fetch duration: ${(end - start) / 1000} seconds`);
    
    res.status(201).json(aiResponse)
        
    } catch (error) {
        next(error)
    }

}





module.exports = getRecipeOptimizationfromAi