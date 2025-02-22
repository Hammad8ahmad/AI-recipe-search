const express = require("express");
const router = express.Router();
const OpenAI = require("openai");
const { getRecipesFromOpenAiApi } = require("../controllers/apiController");

// Post route for getting ingredients and fetching recipes from OpenAI
router.post("/",getRecipesFromOpenAiApi);

module.exports = router;
