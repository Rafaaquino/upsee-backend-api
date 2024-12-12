const mongoose = require("../../db/connect-db");
const { Schema } = mongoose;

const User = mongoose.model(
  "User",
  new Schema(
    {
      name: { type: String, required: true },
      email: { type: String, unique: true, required: true, lowercase: true },
      password: { type: String, required: true, select: false },
      company: { type: String, required: true },
      role: { type: String },
      passwordResetToken: { type: String, select: false },
      passwordResetExp: { type: Date, select: false },
    },
    { timestamps: true }
  )
);

module.exports = User;
