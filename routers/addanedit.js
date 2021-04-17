const express= require('express');
const Router = express.Router();
const mongoose= require('mongoose');
const User= mongoose.model('User')

Router.get('/', (req, res) => {
    console.log(req.user._id);
    res.render('updateanedit')
})
Router.post('/',(req,res) => {
    if(req.body._id == '')
    {
        insertRecord(req,res);
    }
    updateRecord(req, res)
})

// function insertRecord(req,res){
//     const student= new User();
//     student.class= req.body.class;
//     student.faculty= req.body.faculty;
//     student.save((err,doc) => {
//         if(!err){
//             //const obj = JSON.parse(JSON.stringify(req.body))
//             console.log('work1')
//             res.send('bạn đã lưu thành công')
//         }
//         else{
//             res.send('error')
//         }
//     })
// }

function updateRecord(req, res) {
    
    User.findByIdAndUpdate({_id: req.user._id}, {
        class: req.body.class,
        faculty: req.body.faculty
    }, {new: true}, (err,doc) => {
        if(!err){
            res.send('bạn đã update thành công')
            const obj = JSON.parse(JSON.stringify(req.body))
            console.log(obj)
        }
        else
        {
            res.send('fail')
        }
    })
}
Router.get('/:id', (req,res) => {
    User.findById(req.params.id, (err,doc) => {
        if(!err){
            res.render("updateanedit", {
                viewTitle: "Update Student",
                student:doc
            })
        }
    })
})
module.exports= Router;