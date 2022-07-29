var express = require('express');
var router = express.Router();
var Admin = require('../schemasModel/admin');


router.post('/', function(req, res, next) {
	console.log(req.body);
	var personInfo = req.body;


	if(!personInfo.email || !personInfo.username || !personInfo.phonenumber || !personInfo.position|| !personInfo.password ||!personInfo.passwordConf){
		res.send();
	} else {
		if (personInfo.password == personInfo.passwordConf) {

			Admin.findOne({email:personInfo.email},function(err,data){
				if(!data){
					var c;
					Admin.findOne({},function(err,data){

						if (data) {
							console.log("if");
							c = data.unique_id + 1;
						}else{
							c=1;
						}

						var newPerson = new Admin({
							unique_id:c,
							email:personInfo.email,
							username: personInfo.username,
							phonenumber: personInfo.phonenumber,
                            position:personInfo.position,
							password: personInfo.password,
							passwordConf: personInfo.passwordConf
						});

						newPerson.save(function(err, Person){
							if(err)
								console.log(err);
							else
								console.log('Success');
						});

					}).sort({_id: -1}).limit(1);

					return res.redirect('/admins');
					
				}else{
					return res.render('adminRegisterError1.ejs');
				}

			});
		}else{
			return res.render('adminRegisterError2.ejs');
		}
	}
});




module.exports = router;