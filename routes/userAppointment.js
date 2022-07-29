//CRUD PART FOR APPOINTMENT 

var express = require('express');
var router = express.Router();
var Appointment = require('../schemasModel/appointment');

// Get the User Manage Appointment Page

router.get('/', (req, res) => {
	Appointment.find({}, function(err, appointments) {
		res.render('userApp', {
			appointments: appointments
		})
	})
  })

  router.get('/addApp', function(req, res, next) {
	res.render('userAddApp.ejs');
  });

  router.get('/receiptApp', function(req, res, next) {
	res.render('receiptAppointment.ejs');
  });

  // Get the Appointment Using a Specific Id

router.get('/show/:appointment_id', function(req, res) {
	let id = req.params.appointment_id;
	Appointment.findById(id, function(err, appointment) {
		if (err)
			res.send(err)

			res.render("../views/userUpdateApp", {appointment: appointment});
	});

});
  // Get the Appointment for Receipt Using a Specific Id

  router.get('/showReceipt/:appointment_id', function(req, res) {
	let id = req.params.appointment_id;
	Appointment.findById(id, function(err, appointment) {
		if (err)
			res.send(err)

			res.render("../views/receiptAppointment", {appointment: appointment});
	});

});
  router.get('/updateApp', function(req, res, next) {
	res.render('userUpdateApp.ejs');
  });

  router.post('/create', function(req, res) {
	// create mongose method to create a new record into collection
	Appointment.create({
		username : req.body.username,
		petname : req.body.petname,
		date: req.body.date,
		time: req.body.time,
		type:req.body.type,
		categoryAppointment: req.body.categoryAppointment
	}, function(err, appointment) {
		if (err)
			res.send(err);

		// Get and Return All the Appointments After Newly Created Appointment record
		Appointment.find(function(err, appointments) {
			if (err)
				res.send(err)
				res.redirect("/userApp");
		});
	});

});

// Delete the Appointment By Id

router.post('/delete/:appointment_id', function(req, res) {
	console.log(req.params.appointment_id);
	let id = req.params.appointment_id;
	Appointment.remove({
		_id : id
	}, function(err) {
		if (err)
			res.send(err);
		else
		Appointment.find({}, function(err, appointments) {
			res.redirect("/userApp");
		})	
	});
});

// Update Appointment

router.post('/update/:appointment_id', function(req, res) {
	// create mongose method to update a existing record into collection
	let id = req.params.appointment_id;
	var data = {
		id:req.body.id,
		username : req.body.username,
		petname: req.body.petname,
		date : req.body.date,
        time : req.body.time,
		type : req.body.type,
        categoryAppointment : req.body.categoryAppointment
	}

	// Save Appointment

	Appointment.findByIdAndUpdate(id, data, function(err, appointment) {
	if (err) throw err;

	res.redirect("/userApp");
	});
});

module.exports = router;