const express = require('express')
const { signup, signin } = require('../controllers/user')
const { check} = require('express-validator')
const router = express.Router()

router.post('../views/register', [
    check('name', 'Name should be at least 3 characters').isLength({min: 3}),
    check('email', 'Email should be valid').isEmail(),
    check('password', "Password should have at least 6 characters").isLength({min: 6}),
], signup)

router.post('../views/login', signin)

module.exports = router