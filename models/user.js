let mongoose = require('mongoose');
let Schema= mongoose.Schema;

const UserSchema = new Schema({
    email:{
        type: String,
        // required: [true, 'email required'],
        // unique: [true, 'email already registered']
    },
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    class:{
        type:String,
    },
    faculty:{
        type:String,
    },
    image:{
        type:String,
    },
    role: {
        type:Number,
        default: 2,
    }
})

module.exports= mongoose.model('User', UserSchema);