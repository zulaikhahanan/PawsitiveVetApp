//Declaration Variable
var express = require('express');
var router = express.Router();
var Appointment = require('../schemasModel/appointment');



// GET home page
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/changePass', function (req, res, next) {
	return res.render('userForgetPass.ejs');
});

router.get('/changePass1', function (req, res, next) {
	return res.render('changePasswordError1.ejs');
});

router.get('/changePass2', function (req, res, next) {
	return res.render('changePasswordError2.ejs');
});

router.get('/changePass3', function (req, res, next) {
	return res.render('changePasswordError3.ejs');
});

router.get('/adminAcc', function(req, res, next) {
	res.render('adminAccount');
  });
  
  
  router.get('/userAcc', function(req, res, next) {
	res.render('userAccount');
  });

//GET service page
router.get('/service', function (req, res, next) {
	return res.render('service.ejs');
});

//GET contact or inquiry page
router.get('/contact', function (req, res, next) {
	return res.render('contact.ejs');
});

router.get('/registerUserAfter', function (req, res, next) {
	return res.render('registerUserAfter.ejs');
});

router.get('/bookAppointment', function (req, res, next) {
	return res.render('bookAppointment.ejs');
});

//GET user account page
router.get('/userAccount', function (req, res, next) {
	return res.render('userAccount.ejs');
});

router.get('/Settings', function (req, res, next) {
	return res.render('userSettings.ejs');
});

router.get('/adminAcc', function (req, res, next) {
	return res.render('adminAccount.ejs');
});

router.get('/Settings', function (req, res, next) {
	return res.render('adminSettings.ejs');
});


//Rendering all the pages in ejs form in admin authority

router.get('/adminLogin', function (req, res, next) {
	return res.render('adminLogin.ejs');
});


router.get('/adminSettings', function (req, res, next) {
	return res.render('adminSettings.ejs');
});


router.get('/registerAdmin', function(req, res, next) {
	res.render('registerAdmin.ejs');
  });
  
module.exports = router;
