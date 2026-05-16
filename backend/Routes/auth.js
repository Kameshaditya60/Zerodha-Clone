const express = require('express');
const router = express.Router();

const {CompleteRegistration, NumberSignup, NumberLogin, SendOTP, VerifyOTP, ResendOTP } = require('../controllers/AuthController')
// const { userVerification } = require('../Middlewares/AuthMiddler')
// router.post('/',userVerification)


// login with number route
router.post('/number-signup', NumberSignup);
router.post('/number-login', NumberLogin);

// OTP routes
router.post('/send-otp', SendOTP);
router.post('/verify-otp', VerifyOTP);
router.post('/resend-otp', ResendOTP);


// complete registration 
// Registration route
router.post('/complete-registration', CompleteRegistration);

module.exports = router;
