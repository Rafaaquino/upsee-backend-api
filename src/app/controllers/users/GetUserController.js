const User = require("../../models/User");
module.exports = class GetUserIDController {
  static async getUserID(req, res) {
    const id = req.params.id;
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    try {
      return res.status(200).json({ user });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error });
    }
  }
};
