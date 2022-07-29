//CRUD PART FOR APPOINTMENT 

var express = require('express');
var router = express.Router();
var Appointment = require('../schemasModel/appointment');


//Display All the Appointment List at manageAppointment.ejs

router.get('/', (req, res) => {
	Appointment.find({}, function(err, appointments) {
		res.render('manageAppointment', {
			appointments: appointments
		})
	})
  })

  //Display All the Appointment Booked By The Pet Owner at userManageAppointment.ejs

router.get('/userManageAppointment', (req, res) => {
	Appointment.find({}, function(err, appointments) {
		res.render('userManageAppointment', {
			appointments: appointments
		})
	})
  })

//Show the Add Appointment Page

  router.get('/addAppointment', function(req, res, next) {
	res.render('addAppointment.ejs');
  });

// Create Appointment and Send Back All Appointment After Creation



// Create Appointment and Send Back All Appointment After Creation

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
				res.redirect("/appointments");
		});
	});

});

// Get the Appointment Using a Specific Id

router.get('/show/:appointment_id', function(req, res) {
	let id = req.params.appointment_id;
	Appointment.findById(id, function(err, appointment) {
		if (err)
			res.send(err)

			res.render("../views/editAppointment", {appointment: appointment});
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
			res.render('manageAppointment', {
				appointments: appointments
			})
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

	res.redirect("/appointments");
	});
});

module.exports = router;