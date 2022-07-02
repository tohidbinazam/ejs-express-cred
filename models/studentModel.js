const mongoose = require('mongoose')

// student schema
const studentModal = mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Name is required'],
        trim : true
    },
    email : {
        type : String,
        required : [true, 'E-mail is required'],
        unique : true,
        uppercase : [false, 'Uppercase nor allow'],
        trim : true
    },
    username : {
        type : String,
        required : [true, 'Username is required'],
        unique : true,
        maxLength : 10,
        minLength : 6,
        trim : true
    },
    cell : {
        type : String,
        required : [true, 'Phone number is required'],
        unique : [true, 'Invalid mobile number'],
        trim : true
    },
    location : {
        type : String,
        default : 'Dhaka'
    },
    photo : {
        type : String,
        default : 'avatar.jpg'
    },
    password : {
        type : String,
        required : [true, 'Username is required'],
        trim : true
    }

},{ timestamps : true })


// Model export
module.exports = mongoose.model('Student', studentModal)