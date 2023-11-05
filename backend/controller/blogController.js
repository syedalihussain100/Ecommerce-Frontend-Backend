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



// upload images with cloudniary

async function uploadImages(req, res, next) {
    try {
        const { id } = req.params;

        const uploader = async (path) => {
            try {
                const newpath = await cloudinaryUploadImg(path, "images");
                return newpath;
            } catch (error) {
                throw new Error("Image upload failed");
            }
        };

        const urls = [];
        const files = req.files;

        for (const file of files) {
            const { path } = file;
            const newpath = await uploader(path);
            console.log(newpath);
            urls.push(newpath);
            fs.unlinkSync(path);
        }

        const findBlog = await blogModel.findByIdAndUpdate(
            id,
            {
                images: urls.map((file) => {
                    return file;
                }),
            },
            {
                new: true,
            }
        );

        res.json(findBlog);
    } catch (error) {
        res.status(400).send(error.message);
    }
}




module.exports = { createBlog, uploadImages }