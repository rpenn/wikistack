var express = require('express');
var router = express.Router();
var models = require('../models/');

/* GET home page. */
router.get('/:wikiPage', function(req, res, next) {
  models.Page.findOne({'url_name': req.params.wikiPage}, 'title content', function(err,doc)
  {
  	res.render('show.html', {doc: doc});
  })
});

module.exports = router;
