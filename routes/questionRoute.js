const express = require("express");
const router = express.Router();

//questions controllers
const { askQuestion, allQuestions } = require("../controller/questionController");
//all questions routes
router.get("/all_questions", authMiddleware, allQuestions);

router.post("/askQuestion", askQuestion);

module.exports = router;
