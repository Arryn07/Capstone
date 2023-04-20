const User = require('../models/user')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
var expressJwt = require('express-jwt')
const bodyParser = require('body-parser')

exports.signup = (req, res) => {
const errors = validationResult(req)
    if (errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()[0].msg
        })
    }

    const user = new User(req.body)
    user.save((err, user) => {
        if(err) {
            return res.status(400).json({
                error: "Unable to add user"
            })
        }

        return res.json({
            message: "Success",
            user
        })
    })
}

exports.signin = (req, res) => {
    const email = req.body.email
    const password = req.body.password

    User.findOne({email}, (err, user) => {
        if(err || !email) {
            console.log('This is not a valid email')
        }

        //Authenticate
        if(user.authenticate(password)) {
            console.log('The password does not match')
        }

        const token = jwt.sign({_id: user._id}, process.env.SECRET)

        res.cookie('token', token, { expire: new Date() + 1})

        const { _id, name, email} = user
        return res.json({
            token,
            user: {
                _id,
                name,
                email
            }
        })
    })
}