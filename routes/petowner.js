//Declaration Variable
var express = require('express');
var router = express.Router();
var Petowner = require('../schemasModel/petowner');

//Display All the Pet Owner List at manageUser.ejs

router.get('/', (req, res) => {
	Petowner.find({}, function(err, petowners) {
		res.render('manageUser', {
			petowners: petowners
		})
	})
  })

  router.get('/addUser', function(req, res, next) {
	res.render('addUser.ejs');
  });



// Create Pet Owner and Send Back All Pet Owner After Creation

router.get('/ListPetowner', function(req, res) {
	// Create Mongose Method to Create a New Record Into 'petowners' Collection



		// Get and Return All the Pet Owners
		Petowner.find(function(err, petowners) {
			if (err)
				res.send(err)
			res.json(petowners);
		});


})


// Get the Pet Owner Using a Specific Id

router.get('/show/:petowner_id', function(req, res) {
	let id = req.params.petowner_id;
	Petowner.findById(id, function(err, petowner) {
		if (err)
			res.send(err)

			res.render("../views/editUser", {petowner: petowner});
	});

});

// Delete the Pet Owner By Id

router.post('/delete/:petowner_id', function(req, res) {
	console.log(req.params.petowner_id);
	let id = req.params.petowner_id;
	Petowner.remove({
		_id : id
	}, function(err) {
		if (err)
			res.send(err);
		else
		Petowner.find({}, function(err, petowners) {
			res.render('manageUser', {
				petowners: petowners
			})
		})	
	});
});

//Update Pet Owner

router.post('/update/:petowner_id', function(req, res) {
	// create mongose method to update a existing record into collection
	let id = req.params.petowner_id;
	var data = {
		unique_id:req.body.unique_id,
		username : req.body.username,
		email: req.body.email,
        phonenumber : req.body.phonenumber,
        password : req.body.password,
        passwordConf : req.body.passwordConf
	}

	// Save Pet Owner

	Petowner.findByIdAndUpdate(id, data, function(err, petowner) {
	if (err) throw err;

	res.redirect("/petowners");
	
	});
});

router.post('/addNewUser', function(req, res) {
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
					res.redirect("/petowners");
				}else{
					res.redirect("/petowners");
				}

			});
		}else{
			res.send({"Success":"Password Is Not Matched"});
		}
	}
});



module.exports = router;