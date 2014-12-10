var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var Interaction = require('../models/Interaction');

var InteractionEngine = require('../engines/InteractionEngine');

var isRemoveCollectionEnabled = true;
var isRemoveDocumentEnabled = true;

function createLocationIdentifier(locations) {
  if (locations && locations.length > 0) {
    for (var i = 0, count = locations.length; i < count; i++) {
      locations[i]._id = mongoose.Types.ObjectId();
      createLocationIdentifier(locations[i].locations);
    }
  }
}

/* GET: return Locations */
router.get('/', function(req, res) {

  Interaction.find(function (err, interactions) {
    res.json(interactions);
  });
});

/* GET: return Interaction */
router.get('/:id', function(req, res) {

  var id = req.param("id");

  Interaction.findOne( { "_id" : id }, function (err, interaction) {
    res.json(interaction);
  });
});

/* POST: create a Interaction */
router.post('/', function(req, res) {
    try {
      var interaction = new Interaction(req.body.interaction);
      createLocationIdentifier(interaction.locations);

      interaction.save(function(err) {
        if (err) throw err;
        res.status(201);
  	  	res.json(interaction);
	    });
    } catch(err) {
      res.status(400);
      res.send('An error has occurred: ' + err);
    }
});

/* DELETE: delete Locations */
router.delete('/', function(req, res) {

  if (isRemoveCollectionEnabled) {

    Interaction.remove(function(err, interactions) {

  		res.json(interactions);
  	});

  } else {
    res.status(403);
    res.send('Delete action is disabled for this resource.');
  }
});

/* DELETE: delete a Interaction */
router.delete('/:id', function(req, res) {

  if (isRemoveDocumentEnabled) {

    var id = req.param("id");

    Interaction.remove( { "_id" : id }, function(err, interaction) {

  		res.json(interaction);
  	});

  } else {
    res.status(403);
    res.send('Delete action is disabled for this resource.');
  }
});

module.exports = router;
