var express = require('express');
var router = express.Router();

var Location = require('../models/location');

var isClearCollectionEnabled = true;
var isClearEntityEnabled = true;

/* GET: returns Locations */
router.get('/', function(req, res) {

  Location.find(function (err, locations) {
    if (err) {
      console.error(err);
      res.send(err);
    }

    res.json(locations);
  });
});

/* GET: returns Locations */
router.get('/:id', function(req, res) {

  var id = req.param("id");

  Location.find( { "_id" : id }, function (err, locations) {
    if (err) {
      console.error(err);
      res.send(err);
    }

    res.json(locations);
  });
});

/* POST: creates a Location */
router.post('/', function(req, res) {

  var location = new Location();
  location.system = req.body.system;

  location.save(function(err) {
		if (err) {
		  console.error(err);
			res.send(err);
		}

		console.log(req.body);

		res.json(location);
	});
});

/* DELETE: clears Locations */
router.delete('/', function(req, res) {

  if (isClearCollectionEnabled) {

    Location.remove(function(err, locations) {
  		if (err) {
  		  console.error(err);
  			res.send(err);
  		}

  		res.json(locations);
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

    Location.remove( { "_id" : id }, function(err, location) {
  		if (err) {
  		  console.error(err);
  			res.send(err);
  		}

  		res.json(location);
  	});
  } else {

    res.status(403);
    res.send('Clear action is disabled for this resource.');
  }
});

/* GET: returns Locations' summary */
router.get('/summary', function(req, res) {

  res.render('locations/summary',
    {
      title: 'logsense',
      isClearEnabled: isClearEnabled
    });
});

module.exports = router;
