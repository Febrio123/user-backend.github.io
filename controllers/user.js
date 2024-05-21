const { User } = require('../models')

exports.getUser = async (req, res) => {
    User.findAll()
        .then(result => {
            res.status(200).json({
                status: "success",
                data: result
            })
        })
        .catch(err => {
            res.status(500).json({
                status: "failed",
                message: err
            })
        })


}

exports.addUser = (req, res) => {
    let { username, email, password, id_roles } = req.body
    User.create({
        username,
        email,
        password,
        id_roles
    }).then(result => {
        res.status(200).json({
            status: "success",
            data: result
        })
    })
        .catch(err => {
            res.status(500).json({
                status: "Failed",
                message: err
            })
        })
}