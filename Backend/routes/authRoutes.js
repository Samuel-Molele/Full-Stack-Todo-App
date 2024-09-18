const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");
const validateEmail = require("../middleware/validateEmail");
const validateContentType = require("../middleware/validateContentType");

router.post("/register", validateContentType, validateEmail, registerUser);
router.post("/login", validateContentType, loginUser);

module.exports = router;
