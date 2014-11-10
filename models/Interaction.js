
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

  // location type
  special: [SpecialSchema],
	application: [ApplicationSchema],
	subsystem: [SubsystemSchema],

	// inputs and outputs:
	inputs: [ParameterSchema],
	outputs: [ParameterSchema],

	// locations
	locations: [LocationSchema]
});

var InteractionSchema = new Schema({
  name: String,
	description: String,
	status: String,

	locations: [LocationSchema]
});

module.exports = mongoose.model('Interaction', InteractionSchema);
