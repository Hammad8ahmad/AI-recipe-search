const { fetchRecipesFromOpenAI } = require("../Services/openAiService");



const getResponseFromAi = async(req,res,next) => {

    try {
    const recipe = req.body;
    console.log("this is in the server",recipe)
    const aiResponse = await fetchRecipesFromOpenAI(recipe)
    console.log("//////////////////////");
    console.log("AI REPSONSE IN CONTROLER",aiResponse)
    console.log("//////////////////////");


    res.status(201).json(aiResponse)
        
    } catch (error) {
        next(error)
    }

}

module.exports = getResponseFromAi