const asyncHandler = require("express-async-handler");
const fs = require("fs");
const { cloudinaryUploadImg } = require("../utils/Cloudniary");
const { blogModel } = require("../models/blogModel");


// create blog

const createBlog = asyncHandler(async (req, res) => {
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
        const newBlog = new blogModel({
            title: req.body.title,
            description: req.body.description,
            images: urls,
        });
        const savedBlog = await newBlog.save();
        res.json(savedBlog);
    } catch (error) {
        throw new Error(error);
    }
});


// all blog

const AllBlogs = asyncHandler(async (req, res) => {

    try {
        const getAllBlog = await blogModel.find({});
        res.status(200).send(getAllBlog);
    } catch (error) {
        throw new Error(error)
    }
})


// get per id blogs

const getIdBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const getBlog = await blogModel.findById(id);

        res.status(200).send(getBlog);
    } catch (error) {
        throw new Error(error)
    }
})


// update blog here

const updateBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const updateBlog = await blogModel.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.json(updateBlog);
    } catch (error) {
        throw new Error(error);
    }
});


// delete Blog here


const deleteBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBlog = await blogModel.findByIdAndDelete(id);
        res.json(deletedBlog);
    } catch (error) {
        throw new Error(error);
    }
});




module.exports = { createBlog, getIdBlog, AllBlogs, updateBlog, deleteBlog }