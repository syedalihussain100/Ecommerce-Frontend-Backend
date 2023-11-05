const express = require("express");
const { uploadImages } = require("../controller/uploadController");
const { uploadPhoto, blogImgResize } = require("../middleware/uploadImage");
const { authMiddleware, isAdmin } = require("../middleware/AuthMiddleware");
const router = express.Router();



router.post(
    "/",
    authMiddleware,
    isAdmin,
    uploadPhoto.array("images", 1),
    blogImgResize,
    uploadImages
);






module.exports = router;