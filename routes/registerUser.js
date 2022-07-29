var express = require('express');
var router = express.Router();
var Petowner = require('../schemasModel/petowner');

//GET register user page
router.get('/', function (req, res, next) {
	return res.render('registerUser.ejs');
});


router.post('/', function(req, res, next) {
	console.log(req.body);
	var personInfo = req.body;


	if(!personInfo.email || !personInfo.username || !personInfo.phonenumber || !personInfo.password ||!personInfo.passwordConf){
		res.send();
	} else {
		if (personInfo.password == personInfo.passwordConf) {

			Petowner.findOne({email:personInfo.email},function(err,data){
				if(!data){
					var c;
					Petowner.findOne({},function(err,data){

						if (data) {
							console.log("if");
							c = data.unique_id + 1;
						}else{
							c=1;
						}

						var newPerson = new Petowner({
							unique_id:c,
							email:personInfo.email,
							username: personInfo.username,
							phonenumber: personInfo.phonenumber,
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
					return res.redirect('/loginUser');
				}else{
					return res.render('registerUserError1.ejs');
				}

			});
		}else{
			return res.render('registerUserError2.ejs');
		}
	}
});




module.exports = router;