const express = require("express");
const router = express.Router();
const getAnalysisFromAi = require("../controllers/nutritionalAnalysisController");

router.post("/",getAnalysisFromAi)

module.exports = router