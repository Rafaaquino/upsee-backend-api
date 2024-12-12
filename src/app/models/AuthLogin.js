const mongoose = require("../../db/connect-db");
const { Schema } = mongoose;

const Auth = mongoose.model(
  "User",
  new Schema({
    email: { type: String, require: true },
    password: { type: String, require: true },
  })
);

module.exports = Auth;
