const mongoose = require("mongoose");
const config = require("../app/config/conf");

async function main() {
  await mongoose.connect(config.MONGODB_URI_LOCAL);
  console.log(`conectou ao banco!`);
}

main().catch((err) => console.log(err));

module.exports = mongoose;
