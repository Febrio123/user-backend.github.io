const express = require('express')
const productRouter = express.Router()
const { getProduct, detailProduct, addProduct, deleteProduct, updateProduct } = require('../controllers/product')
const { authMiddleware, permissionUser } = require('../middleware/userMiddleware')
const { uploadOption } = require('../utils/fileUpload')



productRouter.get('/', authMiddleware, permissionUser("admin", "user"), getProduct)
productRouter.get('/:id', authMiddleware, permissionUser("admin", "user"), detailProduct)
productRouter.post('/', uploadOption.single("image"), authMiddleware, permissionUser("admin"), addProduct)
productRouter.put('/:id', authMiddleware, permissionUser("admin"), updateProduct)
productRouter.delete('/:id', authMiddleware, permissionUser("admin"), deleteProduct)


module.exports = productRouter;