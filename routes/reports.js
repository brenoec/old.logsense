var express = require('express');
var router = express.Router();

var http = require('http');

var options = {
  host: 'logsense.herokuapp.com'
};

/* GET reports/locations. */
router.get('/locations/:id?', function(req, res) {
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
      res.end('data', chain.shift());
    },
    function(json) {
      res.render('reports/locations', { title: 'logsense', report: 'Locations', resources: JSON.parse(json) });
    }
  ];

  chain.shift()();
});

/* GET reports/locations. */
router.get('/interactions/:id?', function(req, res) {
  var id = req.param("id");

  var json = '';

  var chain = [
    function() {
      options.path = '/interactions';
      if (id) {
        options.path += '/#' + id;
      }
      http.get(options, function(res) {
        res.setEncoding('utf8');

        res.on('data', function(chunk) {
          json += chunk;
        });

        res.on('end', chain.shift());
      });
    },
    function() {
      console.log(json);
      res.render('reports/interactions', { title: 'logsense', report: 'Interactions', resources: JSON.parse(json) });
    }
  ];

  chain.shift()();
});

module.exports = router;
