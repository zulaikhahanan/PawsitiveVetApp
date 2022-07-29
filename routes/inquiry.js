var express = require('express');
var router = express.Router();
var Contact = require('../schemasModel/contact');

//Display All the Contact List at manageContact.ejs

router.get('/', (req, res) => {
	Contact.find({}, function(err, contacts) {
		res.render('manageContact', {
			contacts: contacts
		})
	})
  })


  router.get('/addInquiry', function(req, res, next) {
	res.render('addInquiry.ejs');
  });

//Get All the Contact List From the Database

router.get('/inquiryList', function(req, res) {
	// Use Mongoose To Get All Contact In The Database
	Contact.find(function(err, contacts) {
		// if there is an error retrieving, send the error otherwise send data
		if (err)
			res.send(err)

		res.json(contacts); // Return All Contact In JSON format
	});
});

// Create Contact and Send Back All Contact After Creation for Website Page

router.post('/usercreate', function(req, res) {
	// create mongose method to create a new record into collection
	Contact.create({
		fullname : req.body.fullname,
		phonenumber: req.body.phonenumber,
		email: req.body.email,
		message: req.body.message

	}, function(err, contact) {
		if (err)
			res.send(err);

			res.redirect('/contact');
	});

});

// Create Contact and Send Back All Contact After Creation for Admin Page

router.post('/create', function(req, res) {
	// create mongose method to create a new record into collection
	Contact.create({
		fullname : req.body.fullname,
		phonenumber: req.body.phonenumber,
		email: req.body.email,
		message: req.body.message

	}, function(err, contact) {
		if (err)
			res.send(err);

		// Get and Return All the Contacts After Newly Created Contact record
		Contact.find(function(err, contacts) {
			if (err)
				res.send(err)
				res.redirect("/inquiries");
		});
	});

});
// Get the Contact Using a Specific Id

router.get('/show/:contact_id', function(req, res) {
	let id = req.params.contact_id;
	Contact.findById(id, function(err, contact) {
		if (err)
			res.send(err)

			res.render("../views/editInquiry", {contact: contact});
	});

});

// Delete the Contact By Id


router.post('/delete/:contact_id', function(req, res) {
	console.log(req.params.contact_id);
	let id = req.params.contact_id;
	Contact.remove({
		_id : id
	}, function(err) {
		if (err)
			res.send(err);
		else
		Contact.find({}, function(err, contacts) {
				res.render('manageContact', {
					contacts: contacts
				})
			})	
	});
});

// Update Contact

router.post('/update/:contact_id', function(req, res) {
	// create mongose method to update a existing record into collection
	let id = req.params.contact_id;
	var data = {
		fullname : req.body.fullname,
		phonenumber: req.body.phonenumber,
		email : req.body.email,
        message: req.body.message
	}

	// Save Contact

	Contact.findByIdAndUpdate(id, data, function(err, contact) {
	if (err) throw err;

	res.redirect("/inquiries");
	});
});

module.exports = router;