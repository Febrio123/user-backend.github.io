const { Roles } = require('../models')

exports.getRoles = (req, res) => {
    Roles.findAll()
        .then(result => {
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

exports.addRoles = (req, res) => {
    let { id, name } = req.body
    Roles.create({
        id,
        name
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