const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

// new user registration controller
async function userRegisterController(req, res) {
    const {email , password, userName} = req.body;

    // check if user is already registered
    const isRegistered = await userModel.findOne({
        email: email
    })

    if(isRegistered) {
        return res.status(422).json({
            message: "User already exists with email.",
            status: "failed"
        })
    }

    // create new user
    const user = await userModel.create({
        email, password, userName
    })

    // jwt token
    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: "3d"});

    // make a cookie
    res.cookie("token", token);
 
    res.status(200).json({
        user: {
            _id: user._id,
            email: user.email,
            userName: user.userNameame
        },
        token
    });

}


// user login controller

async function userLoginController(req,res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password")

    if (!user) {
        return res.status(401).json({
            message: "Email or password is INVALID"
        })
    }

    // method in user.model
    const isValidPassword = await user.comparePassword(password)

    if (!isValidPassword) {
        return res.status(401).json({
            message: "Email or password is INVALID"
        })
    }


    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "3d" })
    
    // make cookie
    res.cookie("token", token)

    res.status(200).json({
        user: {
            _id: user._id,
            email: user.email,
            userName: user.userName
        },
        token
    })


}


// user logout controller
async function userLogoutController(req, res) {
    // 
    const token = req.cookies.token || req.headers.authorization?.split(" ")[ 1 ]

    if(!token) {
        return res.status(200).json({
            message: "User logged out successfully"
        })
    }

    // need to make another cookkie
    // make a token blacklist if tokens dont expire for many days/sensitve app like banking

    res.clearCookie("token")

    res.status(200).json({
        message: "User logged out successfully"
    })
}



module.exports = {
    userRegisterController,
    userLoginController,
    userLogoutController
}