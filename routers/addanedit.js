const express= require('express');
const Router = express.Router();
const mongoose= require('mongoose');
const User= mongoose.model('User')

Router.get('/edit', (req, res) => {
    res.render('updateanedit')
})
Router.post('/edit',(req,res) => {
    if(req.body._id == '')
    {
        insertRecord(req,res);
    }
    updateRecord(req, res)
})

function insertRecord(req,res){
    const student= new User();
    student.class= req.body.class;
    student.faculty= req.body.faculty;
    student.save((err,doc) => {
        if(!err){
            res.send('bạn đã lưu thành công')
        }
        else{
            res.send('error')
        }
    })
}

function updateRecord(req, res) {
    User.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err,doc) => {
        if(!err){
            res.send('bạn đã update thành công')
        }
        else
        {
            res.send('fail')
        }
    })
}
module.exports= Router;