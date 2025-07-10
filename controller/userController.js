let User = require("../model/userSchema")
let CustomError = require("../utils/customError")

module.exports.currentUser = (req, res, next) => {
    try {

        res.status(200).json({
            user: req.user,

        })
    } catch (error) {
        console.log(error)
        next(new CustomError(error, 500))
    }
}
module.exports.signup = async (req, res, next) => {
    try {
        let { username, email, password, isAdmin } = req.body
        let existingUser = await User.findOne({ email })
        if (existingUser) return next(new CustomError("User already exist", 400))
        let newUser = await User.create({
            username, email, password, isAdmin: true

        })
        await newUser.save()
        let token = await newUser.generateAuthToken()
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 5
        })
        res.status(201).json({
            message: "user created Successfully",
            token
        })
    } catch (error) {
        console.log(error)
        next(new CustomError(error, 500))
    }
}

module.exports.login = async (req, res, next) => {
    try {
        let { email, password } = req.body
        let existingUser = await User.findOne({ email })
        if (!existingUser) return next(new CustomError("User not Found", 400))


        let user = await User.authenticate(email, password)
        let token = user.generateAuthToken()
        res.cookie("token", token, {
            httpOnly: true,
            secure: true, // required for HTTPS in production
            sameSite: "none", // important for cross-origin cookies
            maxAge: 1000 * 60 * 60 * 5
        }).json({success:true,user})
        res.status(200).json({
            message: "Login Successful",
            token
        })
    } catch (error) {
        console.log(error)
        next(new CustomError(error, 500))
    }
}

module.exports.logout = async (req, res, next) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true
        })
        res.status(200).json({
            message: "Logout Successful"
        })
    } catch (error) {
        console.log(error)
        next(new CustomError(error, 500))
    }
}

module.exports.updateProfile = async (req, res, next) => {
    try {
        let { username, email, password } = req.body
        if (username) req.user.username = username
        if (email) req.user.email = email
        if (password) req.user.password = password
        await req.user.save()
        res.status(200).json({
            message: "User updated Successful",
            user: req.user
        })
    } catch (error) {
        console.log(error)
        next(new CustomError(error, 500))
    }
}

module.exports.checkAdmin = async (req, res, next) => {
    try {
        let admin = await User.findOne({ isAdmin: true })
        res.status(200).json({
            admin
        })
    } catch (error) {
        console.log(error)
        next(new CustomError(error.message, 500))
    }
}

