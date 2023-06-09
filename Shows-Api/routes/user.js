const express = require("express");

const UserController = require("../controllers/user");
const myTestMiddleware = require("../middleware/my-tests-middleware");

const router = express.Router();

router.post("/signup", myTestMiddleware, UserController.createUser);

router.post("/login", myTestMiddleware, UserController.userLogin);

router.post("/changepassword", myTestMiddleware, UserController.userChangePassword);

router.post("/forgotpassword", myTestMiddleware, UserController.userForgotPassword);

module.exports = router;
