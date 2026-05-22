const userModel = require("../models/user.model");
const { generateToken } = require("../utils/jwt");

async function registerUser({ email, password, userName }) {
    // check if user is already registered
    const isRegistered = await userModel.findOne({
        email: email
    })

    if (isRegistered) {
        throw new Error("User already exists");
    }

    const user = await userModel.create({
        email,
        password,
        userName,
    });

    const token = generateToken({
        id: user._id,
        email: user.email,
    });

    return { user, token };

}


async function loginUser({ email, password }) {
    const user = await userModel.findOne({ email }).select("+password")

    if (!user) {
        throw new Error("Invalid credentials");
    }

    const isValidPassword = await user.comparePassword(password)

    if (!isValidPassword) {
        throw new Error("Invalid credentials");
    }

    const token = generateToken({
        id: user._id,
        email: user.email,
    });

    return { user, token };

}

module.exports = {
    registerUser,
    loginUser,
};

