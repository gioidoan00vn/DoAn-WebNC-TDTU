const express= require('express');
const app= express();
app.set('view engine', 'ejs');

app.use(express.static('public'))
app.get('/', (req, res) => {
    res.render('login_with_google')
})

app.listen(3000, () => console.log('http://localhost:3000'))
