const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var brandSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
    },
    {
        timestamps: true,
    }
);

//Export the model

const brandModel = mongoose.model("Brand", brandSchema)

module.exports = { brandModel };