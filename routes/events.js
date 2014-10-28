var express = require('express');
var router = express.Router();

var Event = require('../models/Event');

var LocationEngine = require('../engines/LocationEngine');
var EventEngine = require('../engines/EventEngine');

var isRemoveCollectionEnabled = true;
var isRemoveDocumentEnabled = true;

/* GET: return Events */
router.get('/', function(req, res) {

  Event.find(function (err, events) {
    res.json(events);
  });
});

/* GET: return Event */
router.get('/:id', function(req, res) {

  var id = req.param("id");

  Event.findOne( { "_id" : id }, function (err, event) {
    res.json(event);
  });
});

/* POST: create a Event */
router.post('/', function(req, res) {

  try {

    LocationEngine.validate(req.body.event);

    var event = new Event(req.body.event);

    event.save(function(err) {
      res.status(201);
	  	res.json(event);
	  });

  } catch(err) {
    res.status(400);
    res.send('An error has occurred: ' + err);
  }
});

/* DELETE: delete Events */
router.delete('/', function(req, res) {

  if (isRemoveCollectionEnabled) {

    Event.remove(function(err, events) {

  		res.json(events);
  	});

  } else {
    res.status(403);
    res.send('Delete action is disabled for this resource.');
  }
});

/* DELETE: delete a Event */
router.delete('/:id', function(req, res) {

  if (isRemoveDocumentEnabled) {

    var id = req.param("id");

    Event.remove( { "_id" : id }, function(err, event) {

  		res.json(event);
  	});

  } else {
    res.status(403);
    res.send('Delete action is disabled for this resource.');
  }
});

module.exports = router;
