var mongoose = require('mongoose');
var Schema = mongoose.Schema;

categorySchema = new Schema( {
	
	unique_id: Number,
	serviceType: String
}),
Category = mongoose.model('Category', categorySchema);

module.exports = Category;