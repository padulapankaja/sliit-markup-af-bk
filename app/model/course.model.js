const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Course = new Schema({
    tiite: {
        type: String
    },
    img: {
        type: String
    },
    description: {
        type: String
    },
    link: {
        type: String
    },
    content: {
        type: String
    },
    noOfStudents: {
        type: Number,
        default: 0
    },
    teacher_id: {
        type: Schema.ObjectId,
        ref: 'teachers',

    }
});


module.exports = mongoose.model('course', Course);
