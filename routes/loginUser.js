var express = require('express');
var router = express.Router();
var Petowner = require('../schemasModel/petowner');

router.get('/', function (req, res, next) {
	return res.render('loginUser.ejs');
});

router.get('/Acc', function (req, res, next) {
	return res.render('userAccount.ejs');
});

router.get('/Settings', function (req, res, next) {
	return res.render('userSettings.ejs');
});

router.get('/changePass', function (req, res, next) {
	return res.render('userForgetPass.ejs');
});

router.post('/', function (req, res, next) {
	//console.log(req.body);
	Petowner.findOne({username:req.body.username},function(err,data){
		if(data){
			
			if(data.password==req.body.password){
				//console.log("Done Login");
				req.session.petownerId = data.unique_id;
				//console.log(req.session.userId);
				//return res.render('userAccount.ejs');
				return res.render('userAccount.ejs', {"username":data.username,"email":data.email});
				
				
			}else{
				return res.render('loginPageError1.ejs');
				
			}
		}else{
			return res.render('loginPageError2.ejs');
		}
	});
});


router.post('/changePass', function (req, res, next) {
	//console.log('req.body');
	//console.log(req.body);
	Petowner.findOne({email:req.body.email},function(err,data){
		console.log(data);
		if(!data){
			return res.redirect("/changePass1");
		}else{
			// res.send({"Success":"Success!"});
			if (req.body.password==req.body.passwordConf) {
			data.password=req.body.password;
			data.passwordConf=req.body.passwordConf;

			data.save(function(err, Person){
				if(err)
					console.log(err);
				else
					console.log('Success');
					return res.redirect("/changePass2");
			});
		}else{
			return res.redirect("/changePass3");
		}
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
    		return res.redirect('/loginUser');
            
    	}
    });
}
});



module.exports = router;