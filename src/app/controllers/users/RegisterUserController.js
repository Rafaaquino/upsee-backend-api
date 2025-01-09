const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const createUserToken = require("../../helpers/create-user-token");
const config = require("../../config/conf");

module.exports = class RegisterUserController {
  static async register(req, res) {
    const { name, email, password, company, role } = req.body;

    if (!name) {
      return res.status(422).json({ message: "Name is required" });
    }

    if (!email) {
      return res.status(422).json({ message: "Email is required" });
    }

    if (!password) {
      return res.status(422).json({ message: "Password is required" });
    }

    if (!company) {
      return res.status(422).json({ message: "Company is required" });
    }

    const userExists = await User.findOne({ email: email });

    if (userExists) {
      return res.status(422).json({ message: "Existing email" });
    }

    //cryptografia
    const salt = await bcrypt.genSalt(config.BBCRYPTSALTS);
    const passwordHash = await bcrypt.hash(password, salt);

    //clienteID
    const generateUniqueId = (() => {
      let counter = 0; // Contador para o mesmo milissegundo

      return () => {
        const timestamp = Date.now(); // Obtem o timestamp atual em milissegundos
        const processId = process.pid; // ID do processo atual
        const uniqueId = `${timestamp}${processId}${counter++}`;

        // Reseta o contador para o próximo milissegundo
        if (counter > 9999) counter = 0;

        return Number(uniqueId); // Retorna como número
      };
    })();

    const clientID = generateUniqueId();

    // create user
    const user = new User({
      client_id: clientID,
      name,
      email,
      password: passwordHash,
      company,
      role,
    });

    try {
      const newUser = await user.save();
      await createUserToken(newUser, req, res);
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  }
};
