const express = require("express");
const router = express.Router();
const { postRecipe, getRecipes, deleteRecipe } = require("../controllers/recipeController");
const { requireAuth } = require("../Middleware/requireAuth");



router.use(requireAuth)
// Post router for inserting recipes

router.post("/",postRecipe)

// Get router for getting all the recipes stored in the db

router.get("/",getRecipes)

// Delete router for deleting recipes from the db

router.delete("/:id",deleteRecipe)


module.exports = router