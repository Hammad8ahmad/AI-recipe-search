const { fetchNutritionalAnalysisFromOpenAI } = require("../Services/nutritionalAnalysis");



const getAnalysisfromAi = async(req,res,next) => {

    try {
    const recipe = req.body;
    const aiResponse = await fetchNutritionalAnalysisFromOpenAI(recipe)
    res.status(201).json(aiResponse)
        
    } catch (error) {
        next(error)
    }

}

module.exports = getAnalysisfromAi




