var mongoose = require('mongoose');
var Schema = mongoose.Schema;

appointmentSchema = new Schema( {
	
	
	username: String,
    petname: String,
	date: String,
	type: String,
    time: String,
	categoryAppointment: String
}),
Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;