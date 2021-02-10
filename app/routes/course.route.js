const express = require('express');
const router = express.Router();
const checkAuth = require('../miiddlewares/auth.middleware')
//import user controller
const courseController = require('../contollers/courses.controller');


/*
*  POST
*  create cousr
*  @route_name : /api/course/create

*/
router.post('/create', courseController.validate("CREATE_COURSE"), courseController.create_course);

router.get('/all', courseController.get_all_courses);

router.get('/:id', courseController.get_single_course);

router.get('/byteacher/:id', courseController.get_courses_by_teacher);




//export router
module.exports = router


