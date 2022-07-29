var mongoose = require('mongoose');
var Schema = mongoose.Schema;

petSchema = new Schema( {
	
	
	name: String,
    breed: String,
	age: String,
    type: String,
	vaccination: String,
	DOB: String,
    sex: String
}),
Pet= mongoose.model('Pet', petSchema);

module.exports = Pet;