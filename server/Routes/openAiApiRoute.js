const express = require("express");
const router = express.Router();
const getResponseFromAi = require("../controllers/openAiController");

router.post("/",getResponseFromAi)

module.exports = router