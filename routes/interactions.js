var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

var Event = require('../models/EventRepository');

/* GET: returns Locations */
router.get('/', function(req, res) {
  var event = new Event;

  event.locations.push({ system: 'a' });
  var subdoc = event.locations[0];
  console.log(subdoc);
});

module.exports = router;
