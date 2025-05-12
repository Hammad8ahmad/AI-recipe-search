const express = require("express");
const router = express.Router();
const { getRecipesFromEdamamApi } = require("../controllers/apiController");

// Post route for getting ingredients and fetching recipes from Edamam
router.post("/",getRecipesFromEdamamApi);

module.exports = router;
