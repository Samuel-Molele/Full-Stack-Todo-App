// Middleware to validate the length of the task
const validateTaskLength = (req, res, next) => {
  const { task } = req.body;
  if (task && task.length > 140) {
    return res.status(400).send("Task exceeds 140 characters");
  }
  next();
};

module.exports = validateTaskLength;
