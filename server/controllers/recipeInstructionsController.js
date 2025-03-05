const {fetchRecipeInstructionsFromOpenAI} = require("../Services/recipeInstructions")

const getInstructionsFromAi = async(req,res,next) => {

    try {
    const recipe = req.body;
    const aiResponse = await fetchRecipeInstructionsFromOpenAI(recipe)


    res.status(201).json(aiResponse)
        
    } catch (error) {
        next(error)
    }

}

module.exports = getInstructionsFromAi