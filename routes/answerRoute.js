const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const { postAnswer, getAnswer } = require("../controller/answerController");

router.post("/postAnswer/:id", authMiddleware, postAnswer);

router.get("/allAnswers/:id", authMiddleware, getAnswer);

module.exports = router;
