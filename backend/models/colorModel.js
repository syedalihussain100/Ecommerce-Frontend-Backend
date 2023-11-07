const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var colorSchema = new mongoose.Schema(
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
const colorModel = mongoose.model("Color", colorSchema);
module.exports = { colorModel }