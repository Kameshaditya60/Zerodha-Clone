const { Signup, Login } = require('../controllers/AuthController')
const { userVerification } = require('../Middlewares/AuthMiddler')
const router = require('express').Router()
router.post('/',userVerification)
router.post('/signup', Signup)
router.post('/login', Login)

module.exports = router