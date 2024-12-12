const jwt = require("jsonwebtoken");
const config = require("../config/conf");
const getToken = require("./get-token");

const checkToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Access denied" });
  }

  const token = getToken(req);

  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }

  try {
    const verified = jwt.verify(token, config.JWTSECRET);
    req.user = verified;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token", error: error });
  }
};

module.exports = checkToken;
