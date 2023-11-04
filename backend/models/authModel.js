const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: ["Admin", "user"],
    },
    passwordChangeAt: Date,
    passwordRessetToken: String,
    passwordResetExpires: Date,
},
    {
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true,
        },
        timestamps: true,
    })




// hashing password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
});


// match password
userSchema.methods.isPasswordmatch = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// reset password

userSchema.methods.getResetPasswordToken = function () {
    // Generating token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hashing and adding Schema

    this.passwordRessetToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.passwordResetExpires = Date.now() + 15 * 60 * 1000;

    return resetToken;
};


const UserModel = mongoose.model("User", userSchema);

module.exports = { UserModel };