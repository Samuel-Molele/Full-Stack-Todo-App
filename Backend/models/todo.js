const mongoose = require("mongoose");
// Define the schema for the Todo model
const todoSchema = new mongoose.Schema({
  task: { type: String, required: true },
  user: { type: String, required: true },
});

module.exports = mongoose.model("Todo", todoSchema);
