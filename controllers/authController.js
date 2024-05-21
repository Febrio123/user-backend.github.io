const { User, Profile } = require('../models')
//1. import json web token nya
const jwt = require('jsonwebtoken')

const signToken = id => {
    //menggabungkan token di user data
    //ambil di documentation
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}
//membuat Cookie send Token
const createSendToken = async (user, statusCode, res) => {
    const token = signToken(user.id)
    const cookieOption = {
        expire: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }
    res.cookie('jwt', token, cookieOption)
    user.password = undefined
    res.status(statusCode).json({
        status: "success",
        data: {
            user
        }
    })
}

exports.registerUser = async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        createSendToken(newUser, 201, res)
    } catch {
        return res.status(500).json({
            status: "Failed",
            message: error
        })
    }
    if (req.body.password != req.body.confirmPassword) {
        res.status(500).json({
            status: "Failed",
            message: "masukkan password dan confirm Password yang benar"
        })
    }
}

//2.buat fungsi login user
exports.loginUser = async (req, res) => {
    //3.fungsi validasi
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            status: "Failed",
            message: "Validation error",
            error: "please input email and password"
        })
    }
    //4.check jika user email yang di masukkan cocok 
    // dan sudah benar ada di database
    const userData = await User.findOne({
        where: { email: req.body.email }
    })
    if ((!userData.email) || !(await userData.correctPassword(req.body.password, userData.password))) {
        return res.status(400).json({
            status: "failed",
            message: "error login",
            error: "invalid email or password"
        })
    }
    // 5.tampilkan token di res pada login
    createSendToken(userData, 201, res)
}

exports.logoutUser = async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({
        message: "Logout berhasil"
    })
}

exports.getMyUser = async (req, res) => {
    const currentUser = await User.findOne({
        where: { id: req.user.id },
        include: [
            {
                model: Profile,
                required: true,
                attributes: { exclude: ["userId"] }
            },
        ],
        attributes: { exclude: ["password"] }
    })
    if (currentUser) {
        return res.status(200).json({
            data: currentUser
        })
    }
    else {
        return res.status(404).json({
            message: "user tidak ditemukan"
        })
    }

}