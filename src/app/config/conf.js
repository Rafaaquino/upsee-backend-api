require("dotenv").config({
  path: process.env.NODE_ENV === "dev" ? ".env.dev" : ".env",
});

module.exports = {
  MONGODB_URI: process.env.MONGODB_URI,
  MONGODB_URI_LOCAL: process.env.MONGODB_URI_LOCAL,
  MONGO_PASS: process.env.MONGO_PASS,
  EMAIL: process.env.EMAIL,
  EPASSWORD: process.env.EPASSWORD,
  EMAIL_RECOVERY: process.env.EMAIL_RECOVERY,
  EPASSWORD_RECOVERY: process.env.EPASSWORD_RECOVERY,
  EMAIL_SUPPORT: process.env.EMAIL_SUPPORT,
  EPASSWORD_SUPPORT: process.env.EPASSWORD_SUPPORT,
  JWTSECRET: process.env.JWTSECRET,

  BCRYPTSALTS: 12,
  EXPJWT: 36000,
  API: "/api/v1",
  PORT_SMTP: 465,
  HOST_SMTP: "mail.upsee.com.br",
  HOST_FRONT: "https://www.upsee.com.br",
  HOST_FRONT_DASH: "https://www.upsee.app.br",
  HOST_DEV: "http://localhost:4200",
  HOST_DEV_DASH: "http://localhost:4201",
};
