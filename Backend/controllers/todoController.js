const Todo = require("../models/todo");

// Create a new to-do
const createTodo = async (req, res) => {
  const { task } = req.body;
  const user = req.user;
  // Validate task length
  if (task.length > 140) {
    return res.status(400).send("Task exceeds 140 characters");
  }

  try {
    // Create and save a new to-do item
    const newTodo = new Todo({ task, user: user.name });
    await newTodo.save();
    res.status(201).send(newTodo);
  } catch (err) {
    // Handle errors and respond accordingly
    res.status(500).send("Error creating task");
  }
};

// // Get all to-dos for the logged-in user
const getTodo = async (req, res) => {
  const user = req.user;
  try {
    const todo = await Todo.find({ user: user.name });
    res.send(todo);
  } catch (err) {
    // Handle errors and respond accordingly
    res.status(500).send("Error fetching tasks");
  }
};

// Update a to-do
const updateTodo = async (req, res) => {
  const { id, task } = req.body;
  // Validate task length
  if (task.length > 140) {
    return res.status(400).send("Task exceeds 140 characters");
  }
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { task },
      { new: true },
    );
    res.send(updatedTodo);
  } catch (err) {
    // Handle errors and respond accordingly
    res.status(500).send("Error updating task");
  }
};

// Delete a to-do
const deleteTodo = async (req, res) => {
  const { id } = req.body;
  // Delete the to-do item
  try {
    await Todo.findByIdAndDelete(id);
    res.send("Task deleted");
  } catch (err) {
    res.status(500).send("Error deleting task");
  }
};

module.exports = { createTodo, getTodo, updateTodo, deleteTodo };
