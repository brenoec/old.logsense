var express = require('express');
var router = express.Router();

var Event = require('../models/event');
var Interaction = require('../models/interaction');
var Location = require('../models/location');

var isClearCollectionEnabled = true;
var isClearEntityEnabled = true;

/* GET: returns Locations */
router.get('/', function(req, res) {

  Event.find(function (err, events) {
    if (err) {
      console.error(err);
      res.send(err);
    }

    res.json(events);
  });
});

/* GET: returns Locations */
router.get('/:id', function(req, res) {

  var id = req.param("id");

  Event.findOne( { "_id" : id }, function (err, event) {
    if (err) {
      console.error(err);
      res.send(err);
    }

    res.json(event);
  });
});

/* POST: creates a Location */
router.post('/', function(req, res) {

  var event = new Event();

  // locations
  event.locations;

  var query;
  var chain = [
    function() {
      query = { _id : req.body.locations.previous };
      Location.findOne(query, chain.shift());
    },
    function(err, location) {
      event.locations.push( { previous: location } );
      query = { _id : req.body.locations.at };
      Location.findOne(query, chain.shift());
    }, function(err, location) {
      event.locations.push( { at: location } );
      query = { _id : req.body.locations.target };
      Location.findOne(query, chain.shift());
    }, function(err, location) {
      event.locations.push( { target: location } );
      event.save(chain.shift());
    },
    function(err) {
      if (err) {
  		  console.error(err);
  			res.send(err);
  		}

  	  res.json(event);
    }
  ];

  chain.shift()();
});

/* DELETE: clears Locations */
router.delete('/', function(req, res) {

  if (isClearCollectionEnabled) {

    Event.remove(function(err, events) {
  		if (err) {
  		  console.error(err);
  			res.send(err);
  		}

  		res.json(events);
  	});
  } else {

    res.status(403);
    res.send('Clear action is disabled for this resource.');
  }
});

/* DELETE: clears a Location */
router.delete('/:id', function(req, res) {

  if (isClearEntityEnabled) {

    var id = req.param("id");

    Event.remove( { "_id" : id }, function(err, event) {
  		if (err) {
  		  console.error(err);
  			res.send(err);
  		}

  		res.json(event);
  	});
  } else {

    res.status(403);
    res.send('Clear action is disabled for this resource.');
  }
});

module.exports = router;
