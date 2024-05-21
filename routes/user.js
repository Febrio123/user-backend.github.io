const express = require('express')
const userRoute = express.Router()
const { getUser, addUser } = require('../controllers/user')


userRoute.get('/', getUser)
userRoute.post('/', addUser)


module.exports = userRoute