var express = require('express');
var router = express.Router();
var Vet = require('../schemasModel/vet');


//Display All the Vet List at manageVet.ejs

router.get('/', (req, res) => {
	Vet.find({}, function(err, vets) {
		res.render('manageVet', {
			vets: vets
		})
	})
  })

  router.get('/addVet', function(req, res, next) {
	res.render('addVet.ejs');
  });

// Create Vet and Send Back All Vet After Creation

router.post('/createVet', function(req, res) {
	// create mongose method to create a new record into collection
	Vet.create({
		fullname : req.body.fullname,
		email : req.body.email,
		phonenumber: req.body.phonenumber,
		position: req.body.position,
		availability: req.body.availability
	}, function(err, vet) {
		if (err)
			res.send(err);

		// Get and Return All the Vets After Newly Created Vet record
		Vet.find(function(err, vets) {
			if (err)
				res.send(err)
				res.redirect("/vets");

	});
	});

});



// Get the Vet Using a Specific Id

router.get('/show/:vet_id', function(req, res) {
	let id = req.params.vet_id;
	Vet.findById(id, function(err, vet) {
		if (err)
			res.send(err)

			res.render("../views/editVet", {vet: vet});
	});

});

// Delete the Vet By Id

router.post('/delete/:vet_id', function(req, res) {
	console.log(req.params.vet_id);
	let id = req.params.vet_id;
	Vet.remove({
		_id : id
	}, function(err) {
		if (err)
			res.send(err);
		else
		Vet.find({}, function(err, vets) {
			res.render('manageVet', {
				vets: vets
			})
		})
	});
});

// Update Vet

router.post('/update/:vet_id', function(req, res) {
	// create mongose method to update a existing record into collection
	let id = req.params.vet_id;
	var data = {
		fullname : req.body.fullname,
		email: req.body.email,
		position : req.body.position,
        phonenumber : req.body.phonenumber,
        availability : req.body.availability
	}

	// Save the Vet

	Vet.findByIdAndUpdate(id, data, function(err, vet) {
	if (err) throw err;

	res.redirect("/vets");
	});
});




module.exports = router;[]