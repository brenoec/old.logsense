
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocationSchema = new Schema({

	// mandatory
	system: String,
	solution: String,

	// apps
	application: String,
	domain: String,         // namespace
	element: String,        // class
	routine: String,        // method

	// subsystem
	subsystem: String,
	type: String

	// aditional information

});

module.exports = mongoose.model('Location', LocationSchema);
