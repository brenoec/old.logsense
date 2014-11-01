var express = require('express');
var router = express.Router();

var http = require('http');

var options = null;

var localoptions = {
  host: 'localhost',
  port: '3000'
};

var remoteoptions = {
  host: 'logsense.herokuapp.com'
};

/* GET reports/locations. */
router.get('/locations/:id?', function(req, res) {
  if (req.app.get('env') === 'development') {
    options = localoptions;
    console.log('local options')
  } else {
    options = remoteoptions;
  }

  var id = req.param("id");

  var chain = [
    function() {
      options.path = '/locations';
      if (id) {
        options.path += '/#' + id;
      }
      http.get(options, chain.shift());
    },
    function(res) {
      res.setEncoding('utf8');
      res.on('data', chain.shift());
    },
    function(json) {
      res.render('reports/locations', { title: 'logsense', report: 'Locations', resources: JSON.parse(json) });
    }
  ];

  chain.shift()();
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
