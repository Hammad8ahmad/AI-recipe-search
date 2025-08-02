const express = require("express");
const router = express.Router();
const getRecipeOptimizationfromAi = require("../controllers/recipeOptimizationController");
const { requireAuth } = require("../Middleware/requireAuth");

router.use(requireAuth)
router.post("/",getRecipeOptimizationfromAi)

module.exports = router

