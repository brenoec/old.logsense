var express = require('express');
var router = express.Router();

var Location = require('../models/location');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'logsense' });
});

/* POST home page. */
router.post('/', function(req, res) {
  
  var location = new Location();
  location.application = req.body.application;

  location.save(function(err) {
		if (err) {
			res.send(err);
		}

		res.json({ message: 'location created' });
	});
});

module.exports = router;
