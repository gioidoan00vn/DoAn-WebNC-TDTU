require('dotenv').config()


const express= require('express');
const app= express();

require('./passport-setup')
const passport = require('passport')

app.set('view engine', 'ejs');

app.use(express.static('public'))
app.get('/loginwithsv', (req, res) => {
    res.render('login_with_google')
})
app.get('/main', (req,res) => {
    res.send('ok')
})
app.use('/google',  passport.authenticate('google',{scope:['profile', 'email'] }))

app.listen(3000, () => console.log('http://localhost:3000'))
