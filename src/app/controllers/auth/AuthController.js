const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const createUserToken = require("../../helpers/create-user-token");

module.exports = class AuthController {
  static async login(req, res) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(422).json({ message: "Email is required" });
    }

    if (!password) {
      return res.status(422).json({ message: "Password is required" });
    }

    // Verifica se usuario existe
    const user = await User.findOne({ email: email }).select("+password");

    if (!user) {
      return res
        .status(422)
        .json({ message: "There is no registered user with this email" });
    }

    //Bcrypt
    const checkpassword = await bcrypt.compare(password, user.password);

    if (!checkpassword) {
      return res.status(422).json({ message: "Invalid password" });
    }

    await createUserToken(user, req, res);
  }
};
