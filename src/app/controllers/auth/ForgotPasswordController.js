const config = require("../../config/conf");
const crypto = require("crypto");
const transporter = require("../../helpers/mailer");
const getEmailHTML = require("../../../views/recovery-template");
const User = require("../../models/User");

module.exports = class ForgotPasswordController {
  static async recovery(req, res) {
    const { email } = req.body;

    if (!email) {
      return res.status(422).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email: email });
    console.log(user);

    if (!user) {
      return res
        .status(422)
        .json({ message: "Email does not exist in our database" });
    }

    //Códigos de autenticação
    const authCode = crypto.randomBytes(3).toString("hex");

    //Expire authCode
    const dateNow = new Date();
    dateNow.setHours(dateNow.getHours() + 1);

    await User.findByIdAndUpdate(user.id, {
      $set: {
        passwordResetToken: authCode,
        passwordResetExp: dateNow,
      },
    });

    const html = getEmailHTML(authCode, user.name);

    console.log("----: ", authCode, dateNow);

    // Configurar o e-mail
    const mailOptions = {
      from: config.EMAIL_RECOVERY,
      bcc: config.EMAIL_RECOVERY,
      to: email,
      subject: "Recuperar Senha",
      html: html,
    };

    console.log(mailOptions);

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        res.status(500).json({ message: "Error sending email", error });
      } else {
        res
          .status(200)
          .json({ message: "Email successfully sent", email: email });
      }
    });
  }
};
