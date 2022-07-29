var mongoose = require('mongoose');
var Schema = mongoose.Schema;

adminSchema = new Schema( {
	
	unique_id: Number,
	username: String,
    phonenumber: String,
	email: String,
    position: String,
	password: String,
	passwordConf: String
}),
Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;