const express = require("express");
const {StudentCreation,TeacherRegistration} = require('../controllers/auth/register')
const {StudentLogin,TeacherLogin} = require('../controllers/auth/login')
const {RoleCheck} = require('../middlewares/validate')
const {Authentication,VerifyTokenHandler} = require('../middlewares/jwt')

// initialize router
const router = express.Router();

router.route('/StudentRegister').post(StudentCreation)
router.route('/StudentLogin').get(RoleCheck(),StudentLogin)
 
router.route('/TeacherRegistration').post(TeacherRegistration)
router.route('/TeacherLogin').get(RoleCheck(),TeacherLogin)

router.route('/VerifyToken').get(Authentication,VerifyTokenHandler)

module.exports = router;
