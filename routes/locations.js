var express = require('express');
var router = express.Router();

var Location = require('../models/location');

var isClearCollectionEnabled = true;
var isClearEntityEnabled = true;

/* GET: return Locations */
router.get('/', function(req, res) {

  Location.find(function (err, locations) {
    if (err) {
      console.error(err);
      res.send(err);
    }

    res.json(locations);
  });
});

/* GET/summary: return Locations' summary */
router.get('/summary', function(req, res) {

  res.render('locations/summary',
    {
      title: 'logsense',
      isClearEnabled: isClearCollectionEnabled
    });
});

/* GET: return Locations */
router.get('/:id', function(req, res) {

  var id = req.param("id");

  Location.findOne( { "_id" : id }, function (err, location) {
    if (err) {
      console.error(err);
      res.send(err);
    }

    res.json(location);
  });
});

/* POST: create a Location */
router.post('/', function(req, res) {

  // TODO: validate inputs

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

/* DELETE: delete Locations */
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

/* DELETE: delete a Location */
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

module.exports = router;
