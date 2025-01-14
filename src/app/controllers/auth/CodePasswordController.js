const User = require("../../models/User");
const createUserToken = require("../../helpers/create-user-token");

module.exports = class CodePasswordController {
  static async codeAuthPassword(req, res) {
    const { code, email } = req.body;

    console.log(code);

    if (!code) {
      return res.status(422).json({ message: "Code is required" });
    }

    try {
      const user = await User.findOne({ "profile.email": email }).select(
        "+passwordResetToken passwordResetExp"
      );

      if (user == null) {
        return res.status(401).json({
          message: "Invalid code! Enter the correct code or generate a new one",
        });
      }

      console.log("req: ", req.body);
      console.log("userExists: ", user);

      if (code !== user.passwordResetToken) {
        return res.status(400).json({ error: "Invalid code" });
      }

      const now = new Date();

      if (now > user.passwordResetExp) {
        return res
          .status(400)
          .json({ error: "Code expire, generate a new one" });
      }
      console.log("user antigo: ", user);

      await createUserToken(user, req, res);
      await User.findOneAndUpdate(
        { passwordResetToken: code }, // Condição de busca
        { $unset: { passwordResetToken: "", passwordResetExp: "" } }, // Remover os campos passwordResetToken e passwordResetExp
        { new: true } // Retorna o documento atualizado
      ).select("+passwordResetToken passwordResetExp"); //
    } catch (error) {
      res
        .status(500)
        .json({ message: "Cannot reset password", error: error.message });
    }
  }
};
