const { Product, Category } = require('../models')
const asyncHandle = require('../middleware/asyncHandle')


exports.detailProduct = asyncHandle(async (req, res) => {
    let id = req.params.id
    let detailProduct = await Product.findOne({
        where: {
            id: id
        },
        include: {
            model: Category,
            required: true,
            attributes: {
                exclude: ["id"]
            }
        }
    })
    try {
        res.status(200).json({
            status: 'success',
            data: detailProduct
        })
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: error
        })
    }
})

exports.getProduct = asyncHandle(async (req, res) => {
    let getProduct = await Product.findAll()
    try {
        res.status(200).json({
            status: 'success',
            data: getProduct
        })
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: error
        })
    }

})


exports.addProduct = asyncHandle(async (req, res) => {
    let { id, name, categoryId, price, description } = req.body
    const file = req.file
    if (!file) {
        res.status(400)
        throw new Error('tidak ada file image yang diinput ')
    }
    const fileName = file.filename
    const pathFile = `${req.protocol}://${req.get('host')}/public/uploads/${fileName}`

    let addProduct = await Product.create({
        id, name, categoryId, price, description, image: pathFile
    })
    if (!addProduct) {
        res.status(400)
        throw new Error("Data tidak boleh null")
    }
    return res.status(200).json({
        status: "success",
        data: addProduct
    })
})

exports.updateProduct = asyncHandle(async (req, res) => {
    let id = req.params.id
    await Product.update(req.body, {
        where: { id: id }
    })
    const newProduct = await Product.findByPk(id)
    if (!newProduct) {
        res.status(404)
        throw new Error("Product Id tidak ditemukan")
    }
    return res.status(200).json({
        status: "success",
        data: updateProduct
    })

})

exports.deleteProduct = asyncHandle(async (req, res) => {
    let id = req.params.id
    const deleteProduct = await Product.destroy({
        where: { id }
    })
    if (!deleteProduct) {
        res.status(404)
        throw new Error("id tidak ditemukan")
    }
    return res.status(200).json({
        status: 'success',
        data: deleteProduct
    })

})
