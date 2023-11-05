const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/authModel");

const authMiddleware = expressAsyncHandler(async (req, res, next) => {
    let token;

    if (req?.headers?.authorization?.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];

            if (token) {
                const decoded = jwt.verify(token, process.env.JWT_TOKEN);

                // find the user by id
                const user = await UserModel.findById(decoded?.id).select("-password");

                // attach the user to the request
                req.user = user;

                next();
            } else {
                res.status(404);
                throw new Error("There is no token attached to the header");
            }
        } catch (error) {
            res.status(401);
            throw new Error("No authorized token expired, login again");
        }
    } else {
        throw new Error("There is no token attached to the header")
    }
});


// Admin Handle Logic


const isAdmin = expressAsyncHandler(async (req, res, next) => {
    const { email } = req.user;
    const adminUser = await UserModel.findOne({ email });

    if (adminUser.role !== "admin") {
        throw new Error("You are not admin ");
    } else {
        next();
    }
});


module.exports = { authMiddleware, isAdmin };