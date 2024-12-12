const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const config = require("../../config/conf");
const createUserToken = require("../../helpers/create-user-token");

module.exports = class RegisterUserController {
  static async register(req, res) {
    const { name, email, password, company, role } = req.body;

    if (!name) {
      return res.status(422).json({ message: "Name is required" });
    }

    if (!email) {
      return res.status(422).json({ message: "Email is required" });
    }

    if (!password) {
      return res.status(422).json({ message: "Password is required" });
    }

    if (!company) {
      return res.status(422).json({ message: "Company is required" });
    }

    const userExists = await User.findOne({ email: email });

    if (userExists) {
      return res.status(422).json({ message: "Existing email" });
    }

    //cryptografia
    const salt = await bcrypt.genSalt(config.BCRYPTSALTS);
    const passwordHash = await bcrypt.hash(password, salt);

    // create user
    const user = new User({
      name,
      email,
      password: passwordHash,
      company,
      role,
    });

    try {
      const newUser = await user.save();
      await createUserToken(newUser, req, res);
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  }
};
