const express= require('express');
const app= express();
app.set('view engine', 'ejs');

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
app.listen(3000, () => console.log('http://localhost:3000'))
