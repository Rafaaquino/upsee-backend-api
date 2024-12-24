const jwt = require("jsonwebtoken");
const conf = require("../config/conf");

const createUserToken = async (user, req, res) => {
  const token = jwt.sign(
    {
      id: user._id,
      client_id: user.client_id,
      name: user.name,
      email: user.email,
      company: user.company,
      role: user.role,
    },
    conf.JWTSECRET,
    { expiresIn: conf.EXPJWT }
  );

  res
    .status(200)
    .json({ message: "Authenticated", token: token, userId: user._id });
};

module.exports = createUserToken;
