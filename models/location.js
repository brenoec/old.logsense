
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocationSchema = new Schema({
	application: String
});

module.exports = mongoose.model('Location', LocationSchema);
