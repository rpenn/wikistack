var express = require('express');
var router = express.Router();
var models = require('../models/');

/* GET home page. */
router.get('/', function(req, res, next) {
  models.Page.find({tags: {$exists: true, $not: {$size: 0}} }}, 'tags', function(err,docs)
  {
    var finalTags = [];
    for(var obj in docs)
    {
      finalTags.concat(obj.tags);
    }
    // use array.sort to sort and remove duplicates
  	// res.render('index.html', {title: "All pages with tags " + req.params.tag, docs: docs});
  })
});

router.get('/:tag', function(req, res, next) {
  models.Page.find({tags: req.params.tag}, 'title url_name', function(err,docs)
  {
  	res.render('index.html', {title: "All pages with tags " + req.params.tag, docs: docs});
  })
});

module.exports = router;
