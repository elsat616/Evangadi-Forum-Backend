const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const { postProfile } = require("../controller/profileController");

router.post("/postProfile", authMiddleware, postProfile);


module.exports = router;
