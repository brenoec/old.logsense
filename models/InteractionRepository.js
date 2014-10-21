
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InteractionSchema = new Schema({

	description: String

});

module.exports = mongoose.model('Interaction', InteractionSchema);
