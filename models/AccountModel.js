const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AccountSchema = new Schema({
    email: {
        type:String,
        unique: true
    },
    password: String,
    role:{
        type:Number
    }
})

module.exports = mongoose.model('Account', AccountSchema)