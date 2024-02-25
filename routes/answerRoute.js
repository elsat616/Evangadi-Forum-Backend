const express = require("express");
const router = express.Router();

const { postAnswer } = require("../controller/answerController");

router.post("/:questionid/postAnswer", postAnswer);

module.exports = router;
