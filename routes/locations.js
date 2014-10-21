var express = require('express');
var router = express.Router();

var Location = require('../models/LocationRepository');
var LocationEngine = require('../engines/LocationEngine');

var isRemoveCollectionEnabled = true;
var isRemoveDocumentEnabled = true;

/* GET: return Locations */
router.get('/', function(req, res) {

  Location.find(function (err, locations) {
    res.json(locations);
  });
});

/* GET: return Location */
router.get('/:id', function(req, res) {

  var id = req.param("id");

  Location.findOne( { "_id" : id }, function (err, location) {
    res.json(location);
  });
});

/* POST: create a Location */
router.post('/', function(req, res) {

  try {

    LocationEngine.validate(req.body.location);

    var location = new Location(req.body.location);

    location.save(function(err) {
      res.status(201);
	  	res.json(location);
	  });

  } catch(err) {
    res.status(400);
    res.send('An error has occurred: ' + err);
  }
});

/* DELETE: delete Locations */
router.delete('/', function(req, res) {

  if (isRemoveCollectionEnabled) {

    Location.remove(function(err, locations) {

  		res.json(locations);
  	});

  } else {

    res.status(403);
    res.send('Delete action is disabled for this resource.');
  }
});

/* DELETE: delete a Location */
router.delete('/:id', function(req, res) {

  if (isRemoveDocumentEnabled) {

    var id = req.param("id");

    Location.remove( { "_id" : id }, function(err, location) {

  		res.json(location);
  	});

  } else {

    res.status(403);
    res.send('Delete action is disabled for this resource.');
  }
});

module.exports = router;
