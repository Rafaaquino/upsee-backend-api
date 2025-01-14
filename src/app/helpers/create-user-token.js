const jwt = require("jsonwebtoken");
const config = require("../config/conf");

const createUserToken = async (user, req, res) => {
  console.log("user: ", user);
  const token = jwt.sign(
    {
      id: user._id,
      client_id: user.client_id,
      profile: user.profile,
      company: user.company,
      role: user.role,
    },
    process.env.JWTSECRET,
    { expiresIn: config.EXPJWT }
  );

  res.status(200).json({
    message: "Authenticated",
    token: token,
    client_id: user.client_id,
    userId: user._id,
  });
};

module.exports = createUserToken;
