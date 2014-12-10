
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ParameterSchema = new Schema({
  name: String,
  type: String,
  value: String
});

var LocationSchema = new Schema({
	// mandatory
	system: String,
	solution: String,
	component: String,

  type: String,

	// mandatory for outer and special locations
	description: String,

	// if inner location
	section: String,         // namespace
	element: String,        // class
	routine: String,         // method

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
