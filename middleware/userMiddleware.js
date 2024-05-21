const { User, Roles } = require('../models')
const jwt = require('jsonwebtoken');


exports.authMiddleware = async (req, res, next) => {
    let token;
    token = req.cookies.jwt
    if (!token) {
        return next(res.status(401).json({
            status: "error",
            message: "anda belom login / register"
        }))
    }
    //console.log(token)
    //2.) decode / verifikasi token
    //ambil di documentation jwt
    let decoded;
    try {
        decoded = await jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        next(res.status(401).json({
            error: err,
            message: "token yang dimasukkan tidak ada"
        }))
    }
    //3.) ambil data user berdasarkan kondisi decodenya
    const currentUser = await User.findByPk(decoded.id)
    //untuk mengatasi user yang terhapus agar token tidak bisa digunakan kembali
    if (!currentUser) {
        return next(res.status(401).json({
            status: 401,
            message: "User not found"
        }))
    }
    req.user = currentUser
    next()
}
//4.) untuk menentukan roles apa saja yang di perbolehkan untuk mengakses halaman 
//yang ditentukan ('admin','user')
exports.permissionUser = (...roles) => {
    return async (req, res, next) => {
        const rolesData = await Roles.findByPk(req.user.roles_id)

        const roleName = rolesData.name

        if (!roles.includes(roleName)) {
            return next(res.status(403).json({
                status: 403,
                error: " Anda Tidak dapat mengakses halaman ini"
            }))
        }
        next()
    }

}