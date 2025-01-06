const User = require("../../../models/User");
const bcrypt = require("bcryptjs");
const createUserToken = require("../../../helpers/create-user-token");

module.exports = class signinController {
  static async signin(req, res) {
    const { client_id, email, password } = req.body;

    if (!email) {
      return res.status(422).json({ message: "Email is required" });
    }

    if (!client_id) {
      return res.status(422).json({ message: "Client ID is required" });
    }

    if (!password) {
      return res.status(422).json({ message: "Password is required" });
    }

    // Verifica se usuario existe

    const user = await User.findOne({
      email: email,
      client_id: client_id,
    }).select("+password");

    if (!user) {
      return res
        .status(422)
        .json({
          message: "There is no registered user with this clientID or email",
        });
    }

    //Bcrypt
    const checkpassword = await bcrypt.compare(password, user.password);

    if (!checkpassword) {
      return res.status(422).json({ message: "Invalid password" });
    }

    await createUserToken(user, req, res);
  }
};
