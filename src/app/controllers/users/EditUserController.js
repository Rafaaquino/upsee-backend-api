const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const getUserByToken = require("../../helpers/get-user-by-token");
const getToken = require("../../helpers/get-token");

module.exports = class EditUserController {
  static async editUser(req, res) {
    const { id } = req.params;
    const profile = req.body;

    console.log("data: ", profile);
    //check user exist
    const token = getToken(req);
    const user = await getUserByToken(token);

    if (!user) {
      return res.status(422).json({ message: "User not found" });
    }

    try {
      const updatedUser = await User.findOneAndUpdate({ _id: id }, profile, {
        new: true,
      });

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      console.log("updatedUser: ", updatedUser);

      return res
        .status(200)
        .json({ message: "Data updated successfully!", updatedUser });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error });
    }
  }
};
