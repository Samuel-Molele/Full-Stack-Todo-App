const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/todoRoutes");
const validateContentType = require("./middleware/validateContentType");

const app = express();
const PORT = process.env.PORT || 5000;
// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(bodyParser.json()); // Ensure that bodyParser is set up
app.use(validateContentType); // Ensure this middleware is applied

app.use("/api", authRoutes); // Ensure the /api prefix is used
app.use("/api/todo/", todoRoutes); // Ensure the /api/todo prefix is used

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
