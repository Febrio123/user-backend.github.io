const express = require('express')
const rolesRoute = express.Router()
const { getRoles, addRoles } = require('../controllers/roles')

rolesRoute.get('/', getRoles)
rolesRoute.post('/', addRoles)

module.exports = rolesRoute