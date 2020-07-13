const router = require('express').Router()
const { register, login, getAdmin } = require('../controller/admin')

const { authentication } = require('../middleware')

router.get('/', authentication, getAdmin)
router.post('/register', register)
router.post('/login', login)

module.exports = router
