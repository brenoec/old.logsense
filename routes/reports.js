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

/* GET reports/locations. */
router.get('/interactions/:id?', function(req, res) {
  if (req.app.get('env') === 'development') {
    options = localoptions;
  } else {
    options = remoteoptions;
  }

  var id = req.param("id");

  var chain = [
    function() {
      options.path = '/interactions';
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
      res.render('reports/interactions', { title: 'logsense', report: 'Interactions', resources: JSON.parse(json) });
    }
  ];

  chain.shift()();
});

module.exports = router;
