// Middleware to ensure the username ends with '@gmail.com'
const validateEmail = (req, res, next) => {
  const { username } = req.body;
  if (!username.endsWith("@gmail.com")) {
    return res.status(403).send("Username must end with @gmail.com");
  }
  next();
};

module.exports = validateEmail;
