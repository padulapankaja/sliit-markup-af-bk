
const { oneOf, body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const format_response = require('../util/format.util')
const errors_format = require('../util/error_format.util')
const HTTP_RESPONSE = require('../util/http_response.json')
const bcrypt = require('bcryptjs');
const UserModel = require('../model/user.model')
const TeacherModel = require('../model/teacher.model')
const dotenv = require('dotenv');
dotenv.config();
exports.test = (req, res) => {
    return res.status(HTTP_RESPONSE.OK).json(format_response(null, true, "Success"));

}

exports.signin_student = async (req, res) => {
    //check errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HTTP_RESPONSE.FAILS_WITH_ERRORS)
            .json(format_response(null, false, "failed with errors", errors_format(errors.array())));
    }
    const { email, password } = req.body
    
    let user_details = await UserModel.findOne({email : email})
    if (user_details == null) {
        return res.status(HTTP_RESPONSE.NOT_ACCEPTABLE).json(format_response(null, false, "Invalid  Email"));
    } else {
        const is_equal = bcrypt.compareSync(password, user_details.password);
        if (!is_equal) {
            return res.status(HTTP_RESPONSE.NOT_ACCEPTABLE).json(format_response(null, false, "Invalid Password"));
        } else {
            delete user_details.password;
            const token = jwt.sign({ email: user_details.email}, process.env.JWT_SCREAT);
            const data = { token, user_details }
            return res.status(HTTP_RESPONSE.OK).json(format_response(data, true, "Success"));
        }
    }
}
exports.signin_teacher = async (req, res) => {
    //check errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HTTP_RESPONSE.FAILS_WITH_ERRORS)
            .json(format_response(null, false, "failed with errors", errors_format(errors.array())));
    }
    const { email, password } = req.body
    
    let user_details = await TeacherModel.findOne({email : email})
    if (user_details == null) {
        return res.status(HTTP_RESPONSE.NOT_ACCEPTABLE).json(format_response(null, false, "Invalid  Email"));
    } else {
        const is_equal = bcrypt.compareSync(password, user_details.password);
        if (!is_equal) {
            return res.status(HTTP_RESPONSE.NOT_ACCEPTABLE).json(format_response(null, false, "Invalid Password"));
        } else {
            delete user_details.password;
            const token = jwt.sign({ email: user_details.email }, process.env.JWT_SCREAT);
            const data = { token, user_details }
            return res.status(HTTP_RESPONSE.OK).json(format_response(data, true, "Success"));
        }
    }
}



exports.register_student = async (req, res) => {
    //check errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HTTP_RESPONSE.FAILS_WITH_ERRORS)
            .json(format_response(null, false, "failed with errors", errors_format(errors.array())));
    }

    try {
        // check already have unique data
        const check_user = await UserModel.findOne({ email: req.body.email })
        if (check_user != null) {
            return res.status(HTTP_RESPONSE.NOT_ACCEPTABLE)
                .json(format_response(null, false, '',
                    'User details already exist !'));
        }
        var salt = bcrypt.genSaltSync(10);
        // var password = req.body.password
        var password = req.body.password
        var hash_password = bcrypt.hashSync(password, salt);

        const new_user = {
            name: req.body.name,
            email: req.body.email,
            password: hash_password,
            role:"student"
        }
        const result = await UserModel.create(new_user)
        return res.status(HTTP_RESPONSE.CREATED).json(format_response(result, true, "Successfully Created"));

    } catch (error) {
        return res.status(HTTP_RESPONSE.FAILS_WITH_ERRORS).json(format_response(error, false, "Error Happen"));
    }
}
exports.register_teacher = async (req, res) => {
    //check errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HTTP_RESPONSE.FAILS_WITH_ERRORS)
            .json(format_response(null, false, "failed with errors", errors_format(errors.array())));
    }

    try {
        // check already have unique data
        const check_user = await TeacherModel.findOne({ email: req.body.email })
        if (check_user != null) {
            return res.status(HTTP_RESPONSE.NOT_ACCEPTABLE)
                .json(format_response(null, false, '',
                    'User details already exist !'));
        }
        var salt = bcrypt.genSaltSync(10);
        // var password = req.body.password
        var password = req.body.password
        var hash_password = bcrypt.hashSync(password, salt);

        const new_user = {
            name: req.body.name,
            email: req.body.email,
            password: hash_password,
            role:"teacher"
        }
        const result = await TeacherModel.create(new_user)
        return res.status(HTTP_RESPONSE.CREATED).json(format_response(result, true, "Successfully Created"));

    } catch (error) {
        return res.status(HTTP_RESPONSE.FAILS_WITH_ERRORS).json(format_response(error, false, "Error Happen"));
    }
}

//validator method
exports.validate = (method) => {
    switch (method) {
        case "CREATE_USER": {
            return [
                body('name', "name doesn't exists").exists(),
                body('email', "nic doesn't exists").exists(),
                body('email', "nic doesn't exists").isEmail(),
                body('password', "phone doesn't exists").exists(),
            ]
        }
        case "LOGIN_USER": {
            return [
                body('email', "email doesn't exists").exists(),
                body('email', "email doesn't exists").isEmail(),
                body('password', "password doesn't exists").exists(),
            ]
        }
    }
}