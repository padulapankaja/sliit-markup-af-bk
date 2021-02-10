const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Teacher = new Schema({
    name: {
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


module.exports = mongoose.model('Teachers', Teacher);
