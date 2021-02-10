const express = require('express');
const router = express.Router();
const checkAuth = require('../miiddlewares/auth.middleware')
//import user controller
const userController = require('../contollers/user.controller');

//test router
router.get('/test', userController.test);

/*
*  POST
*  single user registation
*  @route_name : /api/users/create

*/
router.post('/create/student', userController.validate("CREATE_USER"), userController.register_student);
/*
*  POST
*  single user registation
*  @route_name : /api/users/create

*/
router.post('/create/teacher', userController.validate("CREATE_USER"), userController.register_teacher);
/*
*  POST
*  sign in
*  @route_name : /api/users/singin

*/
router.post('/singin/student', userController.validate("LOGIN_USER"), userController.signin_student);
/*
*  POST
*  sign in
*  @route_name : /api/users/singin

*/
router.post('/singin/teacher', userController.validate("LOGIN_USER"), userController.signin_teacher);

/*
*  POST
*  add course
*  @route_name : /api/users/add/course

*/
router.post('/add/course', userController.validate("ADD_COURSE"), userController.add_course_to_list);
/*
*  GET
*  get my courses
*  @route_name : /api/users/add/course

*/
router.get('/get/my', userController.get_my_courses);




//export router
module.exports = router


