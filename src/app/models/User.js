const mongoose = require("../../db/connect-db");
const { Schema } = mongoose;

const User = mongoose.model(
  "User",
  new Schema(
    {
      client_id: { type: Number, required: true },
      password: { type: String, required: true, select: false },
      profile: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, unique: true, required: true, lowercase: true },
        dateOfBirth: { type: Date, required: false },
        address: {
          street: { type: String, required: false },
          complement: { type: String, required: false },
          city: { type: String, required: false },
          state: { type: String, required: false },
          country: { type: String, required: false },
          zip: { type: String, required: false },
        },
        contacts: {
          phone: { type: String, required: false },
          mobile: { type: String, required: false },
        },
      },
      company: { type: String, required: true },
      role: { type: String },
      passwordResetToken: { type: String, select: false },
      passwordResetExp: { type: Date, select: false },
    },
    { timestamps: true }
  )
);

module.exports = User;
