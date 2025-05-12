const express = require("express");
const router = express.Router();
const getInstructionsFromAi = require("../controllers/recipeInstructionsController");

router.post("/",getInstructionsFromAi)

module.exports = router