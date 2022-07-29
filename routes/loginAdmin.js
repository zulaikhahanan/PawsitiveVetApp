var express = require('express');
var router = express.Router();
var Admin = require('../schemasModel/admin');

router.get('/', function (req, res, next) {
	return res.render('adminLogin.ejs');
});

router.get('/Acc', function (req, res, next) {
	return res.render('adminAccount.ejs');
});

router.get('/Settings', function (req, res, next) {
	return res.render('adminSettings.ejs');
});


router.post('/', function (req, res, next) {
	//console.log(req.body);
	Admin.findOne({username:req.body.username},function(err,data){
		if(data){
			
			if(data.password==req.body.password){
				//console.log("Done Login");
				req.session.adminId = data.unique_id;
				//console.log(req.session.adminId);
			
				return res.render('adminAccount.ejs');
				
			}else{
				return res.render('loginAdminError1.ejs');
			}
		}else{
			return res.render('loginAdminError2.ejs');
		}
	});
});


router.get('/profile/:adminId', function (req, res, next) {
	console.log("profile");
	User.findOne({unique_id:req.session.adminId},function(err,data){
		console.log("adminSettings");
		console.log(adminSettings);
		if(!data){
			res.redirect('/');
		}else{
			//console.log("found");
			return res.render('adminAccount.ejs', {"username":data.username,"email":data.email,"phonenumber":data.phonenumber,"unique_id":data.unique_id,"password":data.password});
		}
	});
});

router.get('/logout', function (req, res, next) {
	console.log("logout")
	if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
    	if (err) {
    		return next(err);
    	} else {
    		return res.redirect('/loginAdmin');
            
    	}
    });
}
});

module.exports = router;