require('dotenv').config()


const express= require('express');
const app= express();

require('./passport-setup')
const passport = require('passport')

app.set('view engine', 'ejs');
app.use(passport.initialize())

app.use(passport.session())

app.use(express.static('public'))
app.get('/loginwithsv', (req, res) => {
    res.render('login_with_google')
})
app.get('/loginwithadmin',(req,res)=>{
	res.render('login_with_admin')
})
app.get('/main', (req,res) => {
    res.send('ok')
})
app.get('/success', (req, res) => {
    res.render('profile')
})
app.use('/google',  passport.authenticate('google',{scope:['profile', 'email'] }))
app.get('/google/callback', passport.authenticate('google',{failureRedirect:'/failed'}),
(req, res) => {
    res.redirect('/success')
});
app.listen(3000, () => console.log('http://localhost:3000'))
