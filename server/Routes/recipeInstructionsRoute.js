const express = require("express");
const router = express.Router();
const getInstructionsFromAi = require("../controllers/recipeInstructionsController");
const { requireAuth } = require("../Middleware/requireAuth");

router.use(requireAuth)
router.post("/",getInstructionsFromAi)

module.exports = router