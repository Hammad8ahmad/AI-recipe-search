const express = require("express");
const router = express.Router();
const getAnalysisFromAi = require("../controllers/nutritionalAnalysisController");
const { requireAuth } = require("../Middleware/requireAuth");

router.use(requireAuth)
router.post("/",getAnalysisFromAi)

module.exports = router

