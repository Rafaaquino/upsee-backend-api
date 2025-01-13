const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const createUserToken = require("../../helpers/create-user-token");
const config = require("../../config/conf");

module.exports = class RegisterUserController {
  static async register(req, res) {
    const person = req.body;
    console.log("person: ", person.profile);

    if (!person.profile.firstName) {
      return res.status(422).json({ message: "First Name is required" });
    }

    if (!person.profile.lastName) {
      return res.status(422).json({ message: "Last Name is required" });
    }

    if (!person.profile.email) {
      return res.status(422).json({ message: "Email is required" });
    }

    if (!person.password) {
      return res.status(422).json({ message: "Password is required" });
    }

    if (!person.company) {
      return res.status(422).json({ message: "Company is required" });
    }

    const email = person.profile.email;
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      return res.status(422).json({ message: "Existing email" });
    }

    //cryptografia
    const salt = await bcrypt.genSalt(config.BCRYPTSALTS);
    const password = person.password;
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
      profile: {
        firstName: person.profile.firstName,
        lastName: person.profile.lastName,
        email: person.profile.email,
        dateOfBirth: person.profile.dateOfBirth,
        address: {
          street: person.profile.address.street,
          city: person.profile.address.city,
          state: person.profile.address.state,
          country: person.profile.address.country,
          postalCode: person.profile.address.postalCode,
        },
        contacts: {
          homePhone: person.profile.contacts.homePhone,
          mobilePhone: person.profile.contacts.mobilePhone,
          workPhone: person.profile.contacts.workPhone,
        },
      },
      password: passwordHash,
      company: person.company,
      role: person.role,
    });

    try {
      const newUser = await user.save();
      await createUserToken(newUser, req, res);
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  }
};
