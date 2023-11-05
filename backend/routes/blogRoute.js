const express = require("express");
const { createBlog } = require("../controller/blogController");
const { authMiddleware, isAdmin } = require("../middleware/AuthMiddleware");
const { blogImgResize, uploadPhoto } = require("../middleware/uploadImage");
const router = express.Router();


router.route("/").post(authMiddleware, isAdmin, uploadPhoto.array("images",1), blogImgResize, createBlog);
// router.put(
//     "/upload/:id",
//     authMiddleware,
//     isAdmin,
//     uploadPhoto.array("images", 1),
//     blogImgResize,
//     uploadImages
// );




module.exports = router;