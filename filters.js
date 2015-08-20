// Setting custom filters on Swig
var marked = require('marked');
console.log(marked('I am using __markdown__.'));

module.exports = function(swig) {
  var page_link = function (doc) {
    var link_name;
    if (typeof doc.title !== "undefined" && doc.title !== "") {
      link_name = doc.title
    } else {
      link_name = "Page "+doc.url_name;
    }
    return "<a href='"+doc.full_url+"'>"+link_name+"</a>";
  };
  page_link.safe = true;

  var markedContent = function(unformattedTxt){
    return marked(unformattedTxt);
  }
  markedContent.safe = true;

  swig.setFilter('markedContent', markedContent);
  swig.setFilter('page_link', page_link);
};
