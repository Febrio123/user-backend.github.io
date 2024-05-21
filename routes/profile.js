const express = require('express')
const profileRoute = express.Router()
const { updateOrCreateProfile } = require('../controllers/Profile')
const { authMiddleware } = require('../middleware/userMiddleware')

profileRoute.post('/me', authMiddleware, updateOrCreateProfile)

module.exports = profileRoute