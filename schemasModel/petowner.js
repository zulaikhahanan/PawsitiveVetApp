var mongoose = require('mongoose');
var Schema = mongoose.Schema;

petownerSchema = new Schema( {
	
	unique_id: Number,
	email: String,
    phonenumber: String,
	username: String,
	password: String,
	passwordConf: String
}),
Petowner = mongoose.model('Petowner', petownerSchema);

module.exports = Petowner;