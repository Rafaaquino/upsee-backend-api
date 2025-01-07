const router = require("express").Router();
const FetchDataController = require("../controllers/fetchData/FetchDataController");

// Middlewares
const verifyToken = require("../helpers/verify-token");

router.get("/", verifyToken, FetchDataController.fetchData);

module.exports = router;
