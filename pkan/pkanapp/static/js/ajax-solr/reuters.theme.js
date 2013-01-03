(function ($) {

AjaxSolr.theme.prototype.result = function (doc, snippet) {
  var output = '<div><h2>' + doc.title + '</h2>';
  output += '<p id="links_' + doc.id + '" class="links"></p>';
  output += '<p>' + snippet + '</p></div>';
  return output;
};

AjaxSolr.theme.prototype.snippet = function (doc) {
  var output = '';
  output += doc.url + "<br/>" + doc.notes;
  return output;
};

AjaxSolr.theme.prototype.tag = function (value, weight, handler) {
  var facet_val = $('<li>');
  facet_val.addClass('nav-item');


  var facet_val_link = $('<a href="#" class="tagcloud_item"/>').text(value).click(handler);

  facet_val_link.append(' (' + weight + ')');
  facet_val.append(facet_val_link);

  facet_val.attr('id', 'tag_' + value);
 
  return facet_val.addClass('tagcloud_item');
};

AjaxSolr.theme.prototype.facet_link = function (value, handler) {
  return $('<a href="#"/>').text(value).click(handler);
};

AjaxSolr.theme.prototype.no_items_found = function () {
  return 'no items found in current selection';
};

})(jQuery);
