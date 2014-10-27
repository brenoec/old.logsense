var express = require('express');
var router = express.Router();

/* GET reports/locations. */
router.get('/locations', function(req, res) {
  res.render('reports/locations', { title: 'logsense', resource: 'Locations' });
});

/* GET reports/events. */
router.get('/events', function(req, res) {
  res.render('reports/events', { title: 'logsense' });
});

/* GET reports/interactions. */
router.get('/interactions', function(req, res) {
  res.render('reports/interactions', { title: 'logsense' });
});

module.exports = router;
