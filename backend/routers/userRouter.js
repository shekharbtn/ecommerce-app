const router = require("express").Router();
const userController = require("../api/controllers/userController");
const jwt = require("../middleware/jwtValidation");

router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;
