
//CRUD PART FOR ADMIN

//Declaration Variable
var express = require('express');
var router = express.Router();
var Admin = require('../schemasModel/admin');

//Display All the Admin List At manageAdmin.ejs

router.get('/', (req, res) => {
	Admin.find({}, function(err, admins) {
		res.render('manageAdmin', {
			admins: admins
		})
	})
  })




//Get the Admin Using a Specific Id

router.get('/show/:admin_id', function(req, res) {
	let id = req.params.admin_id;
	Admin.findById(id, function(err, admin) {
		if (err)
			res.send(err)

		 res.render("../views/editAdmin", {admin: admin});
	});
});

//Delete the Admin By Id

router.post('/delete/:admin_id', function(req, res) {
	console.log(req.params.admin_id);
	let id = req.params.admin_id;
	Admin.remove({
		_id : id
	}, function(err) {
		if (err)
			res.send(err);
		else
		//	res.send('Successfully! Admin Deleted From the System.');	
		Admin.find({}, function(err, admins) {
			res.render('manageAdmin', {
				admins: admins
			})
		})
	});
});

//Update Admin

router.post('/update/:admin_id', function(req, res) {
	// Create Mongose Method to Update a Existing Record Into Collection

	let id = req.params.admin_id;
	
	var data = {
		unique_id:req.body.unique_id,
		username : req.body.username,
		email: req.body.email,
		position : req.body.position,
        phonenumber : req.body.phonenumber,
        password : req.body.password,
	}

	// Save Admin

	Admin.findByIdAndUpdate(id, data, function(err, admin) {
	if (err) throw err;

	res.redirect("/admins");
	});

});




module.exports = router;