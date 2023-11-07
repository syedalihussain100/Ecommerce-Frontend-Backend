// const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const {
    cloudinaryUploadImg,
    cloudinaryDeleteImg,
} = require("../utils/Cloudniary");
const fs = require("fs");
const { productModel } = require("../models/productModel");



const createProduct = asyncHandler(async (req, res) => {
    try {
        const uploader = (path) => cloudinaryUploadImg(path, 'images');
        const urls = [];
        const files = req.files;
        for (const file of files) {
            const { path } = file;
            const newpath = await uploader(path);
            console.log(newpath);
            urls.push(newpath);
            fs.unlinkSync(path);
        }

        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }

        const newProduct = await productModel({
            title: req.body.title,
            slug: req.body.slug,
            description: req.body.description,
            price: req.body.price,
            brand: req.body.brand,
            category: req.body.category,
            quantity: req.body.quantity,
            sold: req.body.sold,
            images: urls,
            tags: req.body.tags
        })

        await newProduct.save();

        res.status(200).json(newProduct);
    } catch (error) {
        throw new Error(error?.message);
    }
});


// get all products here
const AllProducts = asyncHandler(async (req, res) => {

    try {
        const getAllProducts = await productModel.find({});
        res.status(200).send(getAllProducts);
    } catch (error) {
        throw new Error(error)
    }
})


// per id product here

const IdProducts = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const getIdProducts = await productModel.findById(id);
        res.status(200).send(getIdProducts);
    } catch (error) {
        throw new Error(error)
    }
})



// update product here

const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const updatedProduct = await productModel.findOneAndUpdate({ _id: id }, req.body, {
            new: true,
        });

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


// deleteProduct

const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const deleteProduct = await productModel.findOneAndDelete({ _id: id });
        res.json(deleteProduct);
    } catch (error) {
        throw new Error(error);
    }
});





module.exports = { createProduct, AllProducts, IdProducts, updateProduct, deleteProduct }