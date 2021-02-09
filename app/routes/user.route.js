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
router.post('/create', userController.validate("CREATE_USER"), userController.register);
/*
*  POST
*  sign in
*  @route_name : /api/users/singin

*/
router.post('/singin', userController.validate("LOGIN_USER"), userController.signin);


//export router
module.exports = router


