const asyncHandler = require("express-async-handler");
const { brandModel } = require("../models/brandModel");


// create brand

const createBrand = asyncHandler(async (req, res) => {
    try {
        const newBrand = await brandModel.create(req.body);
        res.json(newBrand);
    } catch (error) {
        throw new Error(error);
    }
});


// update brand

const updateBrand = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const updatedBrand = await brandModel.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.json(updatedBrand);
    } catch (error) {
        throw new Error(error);
    }
});

// delete brand


const deleteBrand = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBrand = await brandModel.findByIdAndDelete(id);
        res.json(deletedBrand);
    } catch (error) {
        throw new Error(error);
    }
});



// get brand

const getBrand = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const getaBrand = await brandModel.findById(id);
        res.json(getaBrand);
    } catch (error) {
        throw new Error(error);
    }
});


// get all brand

const getallBrand = asyncHandler(async (req, res) => {
    try {
        const getallBrand = await brandModel.find();
        res.json(getallBrand);
    } catch (error) {
        throw new Error(error);
    }
});
module.exports = {
    createBrand,
    updateBrand,
    deleteBrand,
    getBrand,
    getallBrand,
};