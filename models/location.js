
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocationSchema = new Schema({
	system: String
});

module.exports = mongoose.model('Location', LocationSchema);
