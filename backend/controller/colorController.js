const asyncHandler = require("express-async-handler");
const { colorModel } = require("../models/colorModel");


// create color

const createColor = asyncHandler(async (req, res) => {
    try {
        const newColor = await colorModel.create(req.body);
        res.json(newColor);
    } catch (error) {
        throw new Error(error);
    }
});


// update color

const updateColor = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const updatedColor = await colorModel.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.json(updatedColor);
    } catch (error) {
        throw new Error(error);
    }
});

// delete color

const deleteColor = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const deletedColor = await colorModel.findByIdAndDelete(id);
        res.json(deletedColor);
    } catch (error) {
        throw new Error(error);
    }
});

// get color id


const getColor = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const getaColor = await colorModel.findById(id);
        res.json(getaColor);
    } catch (error) {
        throw new Error(error);
    }
});


// get all color

const getallColor = asyncHandler(async (req, res) => {
    try {
        const getallColor = await colorModel.find();
        res.json(getallColor);
    } catch (error) {
        throw new Error(error);
    }
});
module.exports = {
    createColor,
    updateColor,
    deleteColor,
    getColor,
    getallColor,
};