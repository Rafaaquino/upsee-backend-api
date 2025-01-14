const User = require("../../../models/User");
module.exports = class signinController {
  static async signin(req, res) {
    const { client_id } = req.body;

    if (!client_id) {
      return res.status(422).json({ message: "Client ID is required" });
    }

    // Verifica se usuario existe

    const user = await User.findOne({
      client_id: client_id,
    }).select("+password");

    if (!user) {
      return res.status(422).json({
        message: "There is no registered user with this clientID",
      });
    }

    try {
      return res.status(200).json({ user: true });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error });
    }
  }
};
