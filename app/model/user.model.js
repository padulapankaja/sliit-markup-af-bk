const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let User = new Schema({
    fname: {
        type: String
    },
    lname: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    role:{
        type:String,
        default:"student"
    }
});


module.exports = mongoose.model('Users', User);
