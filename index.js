require('dotenv').config()
const express = require('express')
const app = express()
const passport = require('passport');
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const request = require('request')
const flash = require("connect-flash");
require('./passport-setup');
require('./models/db.js')

const AccountRouter = require('./routers/AccountRouter');
const checkLogin = require('./auth/checkLogin');
const addandedit= require('./routers/addanedit')

app.use(flash());
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(bodyParser.json());

// For an actual app you should configure this with an experation time, better keys, proxy and secure
app.use(cookieSession({
    name: 'tuto-session',
    keys: ['key1', 'key2']
  }))

app.set('view engine','ejs')

// Auth middleware that checks if the user is logged in
const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}


// Initializes passport and passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Example protected and unprotected routes
app.get('/loginsv', (req, res) => res.render('login_with_google'))
app.get('/failed', (req, res) => res.redirect('login_with_google'))

// In this route you can see that if the user is logged in u can acess his info in: req.user
app.get('/good', isLoggedIn, (req, res) =>{
    //res.render("profile",{name:req.user.displayName,pic:req.user.photos[0].value,email:req.user.emails[0].value})
    res.send('ok')
})

// Auth Routes
app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));


app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/loginsv' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/good');
  }
);

app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})


// account router
app.use('/account', AccountRouter)
//add and edit student
app.use('/edit',addandedit)
// disable all link
app.all('*', (req, res) => res.json({code:101, message: 'Đường dẫn hoặc phương thức không được hỗ trợ'}))


app.listen(3000, () => console.log(`web app listening on port ${3000}!`))

