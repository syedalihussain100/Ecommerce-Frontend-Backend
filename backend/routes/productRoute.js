const express = require("express");
const {
    createProduct,
    AllProducts,
    IdProducts,
    updateProduct,
    deleteProduct
} = require("../controller/productController");
const { isAdmin, authMiddleware } = require("../middleware/AuthMiddleware");
const { productImgResize, uploadPhoto } = require("../middleware/uploadImage");
const router = express.Router();






router.post("/", authMiddleware, isAdmin, uploadPhoto.array("images", 2), productImgResize, createProduct);
router.route("/").get(authMiddleware, AllProducts);
router.route("/:id").get(authMiddleware, IdProducts);
router.route("/:id").put(authMiddleware, isAdmin, updateProduct);
router.route("/:id").delete(authMiddleware, isAdmin, deleteProduct);





module.exports = router;