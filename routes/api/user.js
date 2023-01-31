const express = require('express')

const { tryCatch} = require('../../utils/tryCatch')
const { middleware } = require('../../middleware/middlewareValidate')
const { validSchemaPostUser } = require('../../utils/validSchema.js')
const { auth } = require('../../middleware/token')
const {
    addUser,
    loginUser,
    logoutUser,
    currentUser
    } = require('../../controller/controllerUsers');

const router = express.Router()

router.post('/signup', middleware(validSchemaPostUser, 'query'), tryCatch(addUser))
    .post('/login', middleware(validSchemaPostUser, 'query'), tryCatch(loginUser))
    .get('/logout', auth, tryCatch(logoutUser))
    .get('/current', auth, tryCatch(currentUser))

module.exports = router
