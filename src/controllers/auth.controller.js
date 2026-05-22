const authService = require("../services/auth.service");



// new user registration controller
async function userRegisterController(req, res) {
    try {
        const { user, token } = await authService.registerUser(req.body);

        res.cookie("token", token, {
            httpOnly: true,
        });

        res.status(201).json({
            user: {
                _id: user._id,
                email: user.email,
                userName: user.userName,
            },
            token,
        });

    } catch (err) {
        res.status(400).json({
            message: err.message,
        });

    }

}


// user login controller

async function userLoginController(req, res) {

    try {
        const { user, token } = await authService.loginUser(req.body);

        res.cookie("token", token, {
            httpOnly: true,
        });

        res.status(200).json({
            user: {
                _id: user._id,
                email: user.email,
                userName: user.userName,
            },
            token,
        });
    } catch (err) {
        res.status(401).json({
            message: err.message,
        });
    }


}


// user logout controller
async function userLogoutController(req, res) {
    try {
        
        res.clearCookie("token", {
            httpOnly: true,
        });

        return res.status(200).json({
            message: "Logged out successfully",
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
}



module.exports = {
    userRegisterController,
    userLoginController,
    userLogoutController
}