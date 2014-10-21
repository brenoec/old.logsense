var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SpecialSchema = new Schema({
  description: String,
  type: String
});

var ApplicationSchema = new Schema({
  name: String,
	module: String,         // namespace
	element: String,        // class
	routine: String         // method
});

var SubsystemSchema = new Schema({
  name: String,
  type: String
});

var LocationSchema = new Schema({

	// mandatory
	system: String,
	solution: String,

  // special
  special: [SpecialSchema],

	// apps
	application: [ApplicationSchema],

	// subsystem
	subsystem: [SubsystemSchema]

	// aditional information

});

var EventSchema = new Schema({

  // mandatory
	locations: [LocationSchema]

});

module.exports = mongoose.model('Event', EventSchema);
