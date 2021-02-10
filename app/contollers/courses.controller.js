
const { oneOf, body, validationResult } = require('express-validator');
const format_response = require('../util/format.util')
const errors_format = require('../util/error_format.util')
const HTTP_RESPONSE = require('../util/http_response.json')
const CourseModel = require('../model/course.model')
const TeacherModel = require('../model/teacher.model')
const dotenv = require('dotenv');
dotenv.config();


exports.create_course = async (req, res) => {
    //check errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HTTP_RESPONSE.FAILS_WITH_ERRORS)
            .json(format_response(null, false, "failed with errors", errors_format(errors.array())));
    }

    try {
        const new_course = {
            tiite: req.body.tiite,
            img: req.body.img,
            description: req.body.description,
            link: req.body.link,
            content: req.body.content,
            teacher_id: req.body.teacher_id,
        }
        const result = await CourseModel.create(new_course)
        return res.status(HTTP_RESPONSE.CREATED).json(format_response(result, true, "Successfully Created"));

    } catch (error) {
        return res.status(HTTP_RESPONSE.FAILS_WITH_ERRORS).json(format_response(error, false, "Error Happen"));
    }
}
exports.get_all_courses = async (req, res) => {

    try {

        const result = await CourseModel.find({})
        return res.status(HTTP_RESPONSE.CREATED).json(format_response(result, true, "Successfully retrive"));

    } catch (error) {
        return res.status(HTTP_RESPONSE.FAILS_WITH_ERRORS).json(format_response(error, false, "Error Happen"));
    }
}
exports.get_single_course = async (req, res) => {

    try {
        console.log(req.params.id );
        const result = await CourseModel.findOne({ _id: req.params.id })
        if (result == null) {
            return res.status(HTTP_RESPONSE.NOT_FOUND).json(format_response(error, false, "Not found"));
        }
        return res.status(HTTP_RESPONSE.CREATED).json(format_response(result, true, "Successfully retrive"));

    } catch (error) {
        return res.status(HTTP_RESPONSE.FAILS_WITH_ERRORS).json(format_response(error, false, "Error Happen"));
    }
}
exports.get_courses_by_teacher = async (req, res) => {

    try {
        console.log(req.params.id );
        const result = await CourseModel.findOne({ teacher_id: req.params.id })
        if (result == null) {
            return res.status(HTTP_RESPONSE.NOT_FOUND).json(format_response(error, false, "Not found"));
        }
        return res.status(HTTP_RESPONSE.CREATED).json(format_response(result, true, "Successfully retrive"));

    } catch (error) {
        return res.status(HTTP_RESPONSE.FAILS_WITH_ERRORS).json(format_response(error, false, "Error Happen"));
    }
}

//validator method
exports.validate = (method) => {
    switch (method) {
        case "CREATE_COURSE": {
            return [
                body('title', "title doesn't exists").exists(),
                body('img', "img doesn't exists").exists(),
                body('link', "link doesn't exists").exists(),
                body('description', "description doesn't exists").exists(),
                body('content', "content doesn't exists").exists(),
                body('teacher_id', "teacher_id doesn't exists").exists(),
            ]
        }
    }
}