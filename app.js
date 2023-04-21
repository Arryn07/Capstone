if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}


// imports
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const port = 3000
const session = require('express-session')
const passport = require('passport')
const flash = require('express-flash')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config();
const User = require('./models/user')
const jwt = require('jsonwebtoken')

// DB Connection
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = 'mongodb+srv://erinkb1996:EKBru1219@capstonecluster.lwleqsb.mongodb.net/capstone?retryWrites=true&w=majority'
mongoose.connect(uri)

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log('Pinged your deployment. You successfully connected to MongoDB!');
    } finally {
        await client.close();
    }
}
run().catch(console.dir);

// Use parsing middleware
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

// static files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

//Import routes
//const userRoutes = require('./routes/user')

//Using routes
//app.use('/api', userRoutes)

// set views
app.set('views', './views')
app.set('view-engine', 'ejs')

app.get('', (req, res) => {
    res.render('index.ejs', { name: 'user' })
})

app.get('/login', (req, res) => {
    res.render('login.ejs')
})

app.get('/register', (req, res) => {
    res.render('register.ejs')
})

//register
app.post('/register', (req, res) => {
    const user = new User({ 
        name: req.body.name, 
        email: req.body.email, 
        password: req.body.password 
    })
    user.save (user, 'capstone')
        .then(() => {
            console.log('Success! User was added to database: ', user)
            res.redirect('./login')
        })
        .catch(() => {
        console.log("Unable to add user")
        res.redirect('/register')
    })
})

//login
app.post('/login', (req, res) => {
    const email = req.body.email
    const password = req.body.password

    User.findOne({email: email}).then(user => {
        // if(!email) {
        //     console.log('This is not a valid email')
        //     res.redirect('/login')
        //     alert('Email is not valid')
        // }

        //Authenticate
        if(!user.authenticate(password)) {
            console.log('The password does not match')
        }

        const token = jwt.sign({_id: user._id}, process.env.SECRET)

        res.cookie('token', token, { expire: new Date() + 1})

        const { _id, name, email} = user
        console.log(res.json);
        return res.json({
            token,
            user: {
                _id,
                name,
                email
            }
        })
       })

    // User.findOne({email}, (user)).then(() => {
    //     if(!email) {
    //         console.log('Email was not found')
    //     }

        
    // })
})

// listen on port 3000
app.listen(port, () => console.info(`Listening on port ${port}`))