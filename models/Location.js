var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SpecialSchema = new Schema({
  description: String,
  type: String
});

var ApplicationSchema = new Schema({
  name: String,
	domain: String,         // namespace
	element: String,        // class
	routine: String         // method
});

var SubsystemSchema = new Schema({
  name: String,
  type: String,
  description: String
});

var ParameterSchema = new Schema({
  name: String,
  type: String,
  value: String
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
	subsystem: [SubsystemSchema],

	// inputs and outputs:
	inputs: [ParameterSchema],
	outputs: [ParameterSchema]

	// aditional information

});

module.exports = mongoose.model('Location', LocationSchema);
