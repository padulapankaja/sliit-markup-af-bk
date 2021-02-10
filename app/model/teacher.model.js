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
    courses:{
        type: Schema.ObjectId,
        ref: 'course'
    },
    role:{
        type:String,
        default:"teacher"
    }
});


module.exports = mongoose.model('Teachers', Teacher);
