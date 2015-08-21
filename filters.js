// Setting custom filters on Swig
var marked = require('marked');

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

  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
  });

  var markedContent = function(unformattedTxt){
    return marked(unformattedTxt);
  }
  markedContent.safe = true;

  swig.setFilter('markedContent', markedContent);
  swig.setFilter('page_link', page_link);
};
