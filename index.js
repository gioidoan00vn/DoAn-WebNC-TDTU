
require('dotenv').config()
const express= require('express');
const app= express()

const passport = require('passport');

const cookieSession = require('cookie-session');

require('./passport-setup');

app.use(cookieSession({
    name:'tuto-session',
    keys:['key1', 'key2']
}))


app.set('view engine', 'ejs');
const isLoggedIn= (req,res, next) => {
    if(req.user){
        next();
    }
    else {
        res.sendStatus(401);
    }
}
app.get('/', (req,res) => {
    res.render('login_with_google')
})

app.get('/failed', (req, res) => {
    res.send('You Failed to login')
})

app.get('/success', isLoggedIn, (req, res) => {
    res.render('profile', {name:req.user.displayName, pic:req.user.photos[0].value, email: req.user.emails[0].value})
})
app.get('/google', passport.authenticate('google',{scope:['profile', 'email']}));

app.get('/google/callback', passport.authenticate('google', {failureRedirect:'/failed'}),
    function(req,res) {
        res.redirect('/success');
    }
);

app.get('/logout', (req, res) => {
    req.session= null;
    req.logout();
    res.redirect('/');
})

app.listen(3000, () => console.log(`web app listening on port ${3000}`))
