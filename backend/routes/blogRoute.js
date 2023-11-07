const express = require("express");
const { createBlog, getIdBlog, AllBlogs, deleteBlog, updateBlog } = require("../controller/blogController");
const { authMiddleware, isAdmin } = require("../middleware/AuthMiddleware");
const { blogImgResize, uploadPhoto } = require("../middleware/uploadImage");
const router = express.Router();


router.route("/").post(authMiddleware, isAdmin, uploadPhoto.array("images", 1), blogImgResize, createBlog);
router.route("/:id").get(authMiddleware, getIdBlog);
router.route("/").get(authMiddleware, AllBlogs);
router.route("/updateblog/:id").put(authMiddleware, isAdmin, updateBlog);
router.route("/deleteblog").delete(authMiddleware, isAdmin, deleteBlog);



module.exports = router;