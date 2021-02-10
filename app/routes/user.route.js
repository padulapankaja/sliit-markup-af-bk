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


//export router
module.exports = router


