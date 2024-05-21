const express = require('express')
const authRouter = express.Router()
const { registerUser, loginUser, logoutUser, getMyUser } = require('../controllers/authController')
const { authMiddleware } = require('../middleware/userMiddleware')


authRouter.post('/register', registerUser)
authRouter.post('/login', loginUser)
authRouter.post('/logout', authMiddleware, logoutUser)
authRouter.get('/me', authMiddleware, getMyUser)


module.exports = authRouter