const nodemailer = require("nodemailer");
const config = require("../config/conf");

const transporter = nodemailer.createTransport({
  name: "no-reply@upsee.com.br",
  host: config.HOST_SMTP,
  port: config.PORT_SMTP,
  secure: true,
  auth: {
    user: process.env.EMAIL, // Insira seu endereço de e-mail
    pass: process.env.EPASSWORD, // Insira sua senha
  },
});

module.exports = transporter;
