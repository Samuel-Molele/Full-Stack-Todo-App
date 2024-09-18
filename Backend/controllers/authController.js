const jwt = require("jsonwebtoken");
const User = require("../models/user");

// User Registration
const registerUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Create a new user and save it to the database
    const user = new User({ username, password });
    await user.save();
    res.status(201).send("User registered");
  } catch (err) {
    // Handle errors and respond accordingly
    res.status(500).send("Error registering user");
  }
};

// User Login
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  // Find the user with the provided credentials
  const user = await User.findOne({ username, password });

  if (!user) {
    return res.status(401).send("Incorrect user credentials");
  }
  // Create a JWT token for the user
  const token = jwt.sign(
    { name: username, admin: false },
    process.env.JWT_SECRET,
    { algorithm: "HS256" },
  );
  res.send({ message: `Welcome back ${username}`, token });
};

module.exports = { registerUser, loginUser };
