
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Location = require('./location');
var Interaction = require('./interaction');

var EventSchema = new Schema({

	locations: [Schema.Types.Mixed]

});

module.exports = mongoose.model('Event', EventSchema);
