const express = require("express");
const router = express.Router();
const getRecipeOptimizationfromAi = require("../controllers/recipeOptimizationController");

router.post("/",getRecipeOptimizationfromAi)

module.exports = router