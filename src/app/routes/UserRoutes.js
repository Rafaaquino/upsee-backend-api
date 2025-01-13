const router = require("express").Router();
const Auth = require("../controllers/auth/AuthController");
const RegisterUser = require("../controllers/users/RegisterUserController");
const ForgotPassword = require("../controllers/auth/ForgotPasswordController");
const ResetPassword = require("../controllers/auth/ResetPasswordController");
const CodePasswordController = require("../controllers/auth/CodePasswordController");
const EditUserController = require("../controllers/users/EditUserController");

// Middlewares
const verifyToken = require("../helpers/verify-token");

router.post("/register", RegisterUser.register);
router.post("/login", Auth.login);
router.post(
  "/code-auth-recovery-password",
  CodePasswordController.codeAuthPassword
);
router.post("/forgot-password", ForgotPassword.recovery);
router.post("/reset-password", verifyToken, ResetPassword.resetPassword);
router.patch("/edit/:id", verifyToken, EditUserController.editUser);
module.exports = router;
