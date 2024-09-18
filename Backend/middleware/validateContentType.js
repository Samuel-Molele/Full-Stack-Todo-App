const validateContentType = (req, res, next) => {
  if (
    ["POST", "PUT", "DELETE"].includes(req.method) &&
    req.headers["content-type"] !== "application/json"
  ) {
    return res.status(400).send("Content-Type must be application/json");
  }
  next();
};

module.exports = validateContentType;
