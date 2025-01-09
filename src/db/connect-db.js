const mongoose = require("mongoose");

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log(`conectou ao banco!`);
}

main().catch((err) => console.log(err));

module.exports = mongoose;
