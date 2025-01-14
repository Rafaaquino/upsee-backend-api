const router = require("express").Router();
const EditUserController = require("../controllers/users/EditUserController");
const GetUserIDController = require("../controllers/users/GetUserController");

// Middlewares
const verifyToken = require("../helpers/verify-token");

//User
router.get("/:id", verifyToken, GetUserIDController.getUserID);
router.patch("/edit/:id", verifyToken, EditUserController.editUser);
module.exports = router;
