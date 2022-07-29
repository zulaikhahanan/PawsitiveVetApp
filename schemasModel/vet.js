var mongoose = require('mongoose');
var Schema = mongoose.Schema;

  vetSchema = new Schema( {
	
	unique_id: Number,
	fullname: String,
    email: String,
	phonenumber: String,
    position: String,
	availability: String

}),
Vet = mongoose.model('Vet', vetSchema);

module.exports = Vet;