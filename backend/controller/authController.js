const { UserModel } = require("../models/authModel");
const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const sendEmail = require("../utils/SendEmails");
const generateToken = require("../config/token/Token");


// register
const userRegisterCtl = asyncHandler(async (req, res) => {
    const userExit = await UserModel.findOne({ email: req?.body?.email });

    if (userExit) throw new Error("User already exists");

    try {
        const user = await UserModel.create({
            name: req?.body?.name,
            email: req?.body?.email,
            password: req?.body?.password,
        });

        res.status(201).send({ message: "User is Successfully Register", user });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});



// login

const userLoginCtl = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400);
            throw new Error("All Fields are Required");
        }

        const userFound = await UserModel.findOne({ email });


        if (userFound && (await userFound.isPasswordmatch(password))) {
            res.json({
                _id: userFound?._id,
                name: userFound?.name,
                email: userFound?.email,
                isAdmin: userFound?.isAdmin,
                token: generateToken(userFound?._id),
            });
        } else {
            res.status(401);
            throw new Error("Invalid Login Credentials");
        }
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});


// user Profiles

const fetchuserCtl = asyncHandler(async (req, res) => {
    try {
        let userProfile = await UserModel.find({});

        if (!userProfile) {
            res.status(400);
            throw new Error("Network Problem!");
        }

        res.status(200).send(userProfile);
    } catch (error) {
        res.status(400).send(error.message);
    }
});


const userDetailsCtl = asyncHandler(async (req, res) => {
    const { id } = req.params;
    // userValidId(id);
    try {
        const userDetails = await UserModel.findById(id);

        if (!userDetails) {
            throw new Error("Network Problem");
        }

        res.status(200).json({ userDetails });
    } catch (error) {
        res.status(400).send(error.message);
    }
});


// forget password functionality

const forgetPassword = asyncHandler(async (req, res) => {
    // find the user by email

    const { email } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) throw new Error("User not Found");

    const resetToken = await user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `http://localhost:4000/password/reset/${resetToken}`;

    const message = `Your Password reset token is :- \n\n  ${resetPasswordUrl} \n\n If you are not requested this email then, please ignore it.`;

    try {
        await sendEmail({
            email: user.email,
            subject: `Ecommerce Password Recovery`,
            message,
        });

        res.status(200).json(`Email sent to ${user.email} Successfully`);
    } catch (error) {
        user.passwordRessetToken = undefined;
        user.passwordResetExpires = undefined;

        res.status(500).send(error.message);
    }
});

const passwordReset = asyncHandler(async (req, res) => {
    // create token hash

    const ResetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await UserModel.findOne({
        ResetPasswordToken,
        passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
        res.status(400);
        throw new Error("Reset Password Token is inValid or has been expired");
    }

    if (req.body.password !== req.body.confirmPassword) {
        res.status(400);
        throw new Error("Password does not match");
    }

    user.password = req.body.password;
    user.passwordRessetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();
    res.status(200).send(user);
});

module.exports = { userRegisterCtl, userLoginCtl, fetchuserCtl, userDetailsCtl, forgetPassword, passwordReset }