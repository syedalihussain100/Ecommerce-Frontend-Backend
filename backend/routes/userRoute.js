const express = require("express");
const { userRegisterCtl, userLoginCtl, forgetPassword, passwordReset, fetchuserCtl, userDetailsCtl } = require("../controller/authController");

const router = express.Router();

router.post("/register",userRegisterCtl)
router.route("/login").post(userLoginCtl);
router.route("/forgetpassword").post(forgetPassword);
router.route("/password/reset/:token").put(passwordReset);
router.route("/").get(fetchuserCtl);
router.route("/:id").get(userDetailsCtl);










module.exports = router;