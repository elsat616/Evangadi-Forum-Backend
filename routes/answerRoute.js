const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const { postAnswer, getAnswer} = require("../controller/answerController");

router.post("/postAnswer", authMiddleware, postAnswer);

router.get("/allAnswers", authMiddleware, getAnswer);

module.exports = router;
