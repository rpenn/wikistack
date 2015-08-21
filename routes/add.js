var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('addpage.html');
});

router.post('/submit', function(req, res) {
  var models = require('../models/');

  // STUDENT ASSIGNMENT:
  // add definitions of the `title`, `content` and `url_name` variables here
  var title = req.body.pageTitle;
  var content = req.body.pageContent;
	var tags = req.body.pageTags;
	var tagsArr = tags.split(",");
	tagsArr = tagsArr.map(function(tag){return tag.trim();})
  // var url = title.replace(/[^a-zA-Z\d\s:]/g, "");

	var generateUrlName = function(title) {
	  if (typeof title != "undefined" && title !== "") {
	    // Removes all non-alphanumeric characters from title
	    // And make spaces underscore
	    return title.replace(/\s/ig, '_').replace(/\W/ig,'');
	  } else {
	    // Generates random 5 letter string
	    return Math.random().toString(36).substring(2,7);
	  }
	};

  var url_name = generateUrlName(title);
  var page = new models.Page({ 'title': title, 'content': content, 'url_name': url_name, 'tags': tagsArr });
  page.save();
  res.redirect('/add');
});


module.exports = router;
