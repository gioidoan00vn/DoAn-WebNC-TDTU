const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentInfo = Schema({
    UserID : {type: String},
    Message: {type: String}
}, {timestamps:true})

const Post = new Schema({
    Content : {
        Text: {type: String},
        YouTube: {type:String},
        Image: {type: String}
    },
    UserID: {type : String},
    Comments: [CommentInfo]
},{timestamps:true});
module.exports = mongoose.model('Post' , Post)