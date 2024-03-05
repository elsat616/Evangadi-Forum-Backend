const express = require("express");
const router = express.Router();
const authMiddleware =  require("../middleware/authMiddleware");

//questions controllers
const {
  askQuestion,
  getQuestion,
  singleQuestion
} = require("../controller/questionController");

//pull all questions
router.get("/allQuestion", authMiddleware, getQuestion);

//single question routes
router.get("/singleQuestion/:id", authMiddleware, singleQuestion);

//post a question
router.post("/askQuestion", authMiddleware, askQuestion);

module.exports = router;
