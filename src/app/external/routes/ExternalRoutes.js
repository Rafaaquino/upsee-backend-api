const router = require("express").Router();
const signinExternalController = require("../controllers/signin/signinExternal");

router.post("/signin", signinExternalController.signin);

module.exports = router;
