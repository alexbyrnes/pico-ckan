(function ($) {

AjaxSolr.theme.prototype.result = function (doc, snippet) {
  var output = '<div><h2>' + doc.title + '</h2>';
  output += '<p id="links_' + doc.id + '" class="links"></p>';
  output += '<p>' + snippet + '</p></div>';
  return output;
};

AjaxSolr.theme.prototype.snippet = function (doc) {
  var output = '';

  if (doc.url) {
    output += '<i class="icon-globe"></i> <a href="' + doc.url + '">' + doc.url + '</a><br/>';
  }

  if (doc.notes) {
    output += doc.notes;
  }
 
  if (doc.res_url) {

  output += '<div class="accordion" id="accordion">';
  output += '  <div class="accordion-group">';
  output += '    <div class="accordion-heading">';
  output += '<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#collapse_' + doc.id + '">';
  output += '<i class="icon-chevron-down"></i>';
  output += '</a></div>';
  output += '<div id="collapse_' + doc.id + '" class="accordion-body collapse"><div class="accordion-inner">';
  }
       
  for (var u in doc.res_url) {
    output += '<br/><a href="' + doc.res_url[u] + '">' + doc.res_url[u] + '</a>';
  }
 
  if (doc.res_url) {
    output += '</div></div></div></div>';
  }

  output += '<hr>';

  return output;
};

AjaxSolr.theme.prototype.tag = function (value, weight, handler) {
  var facet_val = $('<li>');
  facet_val.addClass('nav-item');


  var facet_val_link = $('<a href="#" />').text(value).click(handler);

  facet_val_link.append(' (' + weight + ')');
  facet_val.append(facet_val_link);

  //facet_val.attr('id', 'tag_' + value);
 
  return facet_val;
};

AjaxSolr.theme.prototype.facet_link = function (value, handler) {
  return $('<a href="#"/>').text(value).click(handler);
};

AjaxSolr.theme.prototype.no_items_found = function () {
  return 'no items found in current selection';
};

})(jQuery);
