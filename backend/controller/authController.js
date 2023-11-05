const { UserModel } = require("../models/authModel");
const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const sendEmail = require("../utils/SendEmails");
const generateToken = require("../config/token/Token");
const { generateRefreshToken } = require("../config/token/RefreshToken");


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


// Forget Password


const forgetPassword = asyncHandler(async (req, res) => {
    // find the user by email

    const { email } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) throw new Error("User not Found");

    const resetToken = await user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `http://localhost:3000/password/reset/${resetToken}`;

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

// Reset Password

const resetPassword = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await UserModel.findOne({
        passwordRessetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
    });
    if (!user) throw new Error(" Token Expired, Please try again later");
    user.password = password;
    user.passwordRessetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    res.json(user);
});



// admin

const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // check if user exists or not
    const findAdmin = await UserModel.findOne({ email });
    if (findAdmin.role !== "admin") throw new Error("You are not Admin");
    if (findAdmin && (await findAdmin.isPasswordmatch(password))) {
        const refreshToken = await generateRefreshToken(findAdmin?._id);
        const updateuser = await UserModel.findByIdAndUpdate(
            findAdmin.id,
            {
                refreshToken: refreshToken,
            },
            { new: true }
        );
        res.json({
            _id: findAdmin?._id,
            name: findAdmin?.name,
            email: findAdmin?.email,
            token: generateToken(findAdmin?._id),
        });
    } else {
        throw new Error("Invalid Credentials");
    }
});


// Update a user

const updatedUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            _id,
            {
                name: req?.body?.name,
                email: req?.body?.email,
            },
            {
                new: true,
            }
        );
        res.json(updatedUser);
    } catch (error) {
        throw new Error(error);
    }
});


// logout functionality here



// delete user 

const deleteaUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const deleteaUser = await UserModel.findByIdAndDelete(id);
        res.json({
            deleteaUser,
        });
    } catch (error) {
        throw new Error(error);
    }
});




module.exports = { userRegisterCtl, userLoginCtl, fetchuserCtl, userDetailsCtl, forgetPassword, resetPassword, loginAdmin, updatedUser, deleteaUser }