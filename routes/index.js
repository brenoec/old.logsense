var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  console.log(express.get('mongo'));
  res.render('index', { title: 'logsense' });
});

module.exports = router;
