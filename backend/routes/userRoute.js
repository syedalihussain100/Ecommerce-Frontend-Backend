const express = require("express");
const { userRegisterCtl, userLoginCtl, forgetPassword, resetPassword, fetchuserCtl, userDetailsCtl, loginAdmin, updatedUser,deleteaUser } = require("../controller/authController");
const { authMiddleware, isAdmin } = require("../middleware/AuthMiddleware");

const router = express.Router();

router.post("/register", userRegisterCtl)
router.route("/login").post(userLoginCtl);
//admin login here
router.route("/admin").post(loginAdmin)
router.route("/forgetpassword").post(forgetPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/").get(fetchuserCtl);
router.route("/:id").get(userDetailsCtl);
router.route("deleteuser/:id").delete(deleteaUser);
router.route("/updateuser").put(authMiddleware, updatedUser);










module.exports = router;