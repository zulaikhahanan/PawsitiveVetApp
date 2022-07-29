//Declaration Variable
var express = require('express');
var router = express.Router();
var Pet = require('../schemasModel/pet');

//Display All the Pet List at managePetPatient.ejs

router.get('/', (req, res) => {
	Pet.find({}, function(err, pets) {
		res.render('managePetPatient', {
			pets: pets
		})
	})
  })



  router.get('/addPet', function(req, res, next) {
	res.render('addPet.ejs');
  });

// Create Pet and Send Back All Pet After Creation

router.post('/create', function(req, res) {
	// create mongose method to create a new record into collection
	Pet.create({
		name : req.body.name,
		breed : req.body.breed,
		age: req.body.age,
		type: req.body.type,
		vaccination: req.body.vaccination,
        DOB: req.body.DOB,
        sex: req.body.sex
	}, function(err, pet) {
		if (err)
			res.send(err);

		// Get and Return All the Pets After Newly Created Vet record
		Vet.find(function(err, pets) {
			if (err)
				res.send(err)
			
		res.redirect("/pets");
		});
	});

});


// Get the Pet Using a Specific Id

router.get('/show/:pet_id', function(req, res) {
	let id = req.params.pet_id;
	Pet.findById(id, function(err, pet) {
		if (err)
			res.send(err)

			res.render("../views/editPet", {pet: pet});
	});

});

// Delete the Pet By Id

router.post('/delete/:pet_id', function(req, res) {
	console.log(req.params.pet_id);
	let id = req.params.pet_id;
	Pet.remove({
		_id : id
	}, function(err) {
		if (err)
			res.send(err);
		else
		res.redirect("/pets");
	});
});

// Update Pet

router.post('/update/:pet_id', function(req, res) {
	// create mongoose method to update a existing record into collection
	let id = req.params.pet_id;
	var data = {
		name : req.body.name,
		breed: req.body.breed,
		age : req.body.age,
        type : req.body.type,
        vaccination: req.body.vaccination,
        DOB : req.body.DOB,
        sex : req.body.sex
	}

	// Save Pet
	
	Pet.findByIdAndUpdate(id, data, function(err, pet) {
	if (err) throw err;

	res.redirect("/pets");
	});
});






module.exports = router;