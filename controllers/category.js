const { Category } = require('../models')
const asyncHandle = require('../middleware/asyncHandle')


exports.addCategory = asyncHandle(async (req, res) => {
    const { id, name } = req.body
    const addCategory = await Category.create({
        id,
        name
    })
    try {
        return res.status(200).json({
            status: "success",
            message: addCategory
        })
    }
    catch (err) {
        return res.status(400).json({
            status: 400,
            message: "failed"
        })
    }
})

