const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const config = require("../../config/conf");

module.exports = class ResetPasswordController {
  static async resetPassword(req, res) {
    console.log(req.body);
    const { newPassword, mathPassword } = req.body;
    const email = req.body.email;

    if (!email) {
      return res.status(422).json({ message: "Email is required" });
    }

    if (!newPassword) {
      return res.status(422).json({ message: "password is required" });
    }

    if (newPassword !== mathPassword) {
      return res.status(422).json({ message: "Passwords do not match" });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(422).json({ message: "User does not exist" });
    }

    console.log("req: ", req.body);
    console.log("userExists: ", user);

    //cryptografia
    const salt = await bcrypt.genSalt(config.BCRYPTSALTS);
    const passwordHash = await bcrypt.hash(newPassword, salt);

    try {
      user.password = passwordHash;
      await user.save();
      res.status(200).json({ message: "Password updated successfully." });
    } catch (error) {
      res.status(500).json({ error: "Cannot reset password, try again." });
    }
  }
};
