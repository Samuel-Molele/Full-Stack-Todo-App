const express = require("express");
const router = express.Router();
const {
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");
const validateContentType = require("../middleware/validateContentType");
const validateTaskLength = require("../middleware/validateTaskLength");
const jwt = require("jsonwebtoken");
// Middleware to authenticate requests using JWT
const authenticate = (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];

  if (!token) return res.status(403).send("No token provided");

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).send("Failed to authenticate token");
    req.user = decoded;
    next();
  });
};
// Route to create a new to-do
router.post(
  "/",
  authenticate,
  validateContentType,
  validateTaskLength,
  createTodo,
);
// Route to get all to-dos for the authenticated user
router.get("/", authenticate, getTodo);
// Route to update an existing to-do
router.put(
  "/",
  authenticate,
  validateContentType,
  validateTaskLength,
  updateTodo,
);
// Route to delete a to-do
router.delete("/", authenticate, validateContentType, deleteTodo);

module.exports = router;
