const router = require('express').Router()
const { register, login } = require('../controller/admin')

router.post('/register', register)
router.post('/login', login)

module.exports = router
