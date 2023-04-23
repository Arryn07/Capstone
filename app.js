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
const Stats = require('./models/stats')
const jwt = require('jsonwebtoken')
const path = require('path')

// DB Connection
const { MongoClient, ServerApiVersion } = require('mongodb');
const user = require('./models/user')
const { error } = require('console')
const { stringify } = require('querystring')
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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, 'public')));

// set views
app.set('views', './views')
app.set('view-engine', 'ejs')

app.get('', (req, res) => {
    res.render('index.ejs', { name: 'user'})
})

app.get('/login', (req, res) => {
    res.render('login.ejs')
})

app.get('/register', (req, res) => {
    res.render('register.ejs')
})

app.get('/about', (req, res) => {
    res.render('about.ejs')
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
        if(user === null) {
            console.log('This is not a valid email')
            res.redirect('/login')
            
            //Authenticate
        } else if (!user.authenticate(password)) {
            console.log('The password does not match')
            res.redirect('/login')
        } else if (user.authenticate(password)) {
            console.log('Success!')
            req.session.user = user.email
            res.redirect('/')
        }
        })
})

// Send form data to database
app.post('/post-stats', (req, res) => {
    const stats = new Stats({ 
        _id: req.body.year, 
        email: req.session.user,
        games: req.body.games, 
        atBats: req.body.atBats,
        runs: req.body.runs,
        hits: req.body.hits,
        singles: req.body.singles,
        doubles: req.body.doubles,
        triples: req.body.triples,
        hr: req.body.hr,
        rbi: req.body.rbi,
        bb: req.body.bb,
        so: req.body.so,
        sb: req.body.sb
    })
    stats.save(stats, 'capstone')
        .then(() => {
            console.log('Success! Stats were added to database: ', stats)
        })
        .catch(() => {
        console.log(error)
        console.log("Unable to add stats")
    })
});

// Pull year from database
app.post('/get-stats', (req, res) => {
    const id = req.body.findYear
    const statsPull = Stats.findOne({email: req.session.user, _id: id})
    .then(sentStats => {console.log({sentStats})})
})


// listen on port 3000
app.listen(port, () => console.info(`Listening on port ${port}`))