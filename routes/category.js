const express = require('express')
const categoryRoute = express.Router()
const { addCategory } = require('../controllers/category')
const { authMiddleware, permissionUser } = require('../middleware/userMiddleware')


categoryRoute.post('/', authMiddleware, permissionUser("admin"), addCategory)

module.exports = categoryRoute