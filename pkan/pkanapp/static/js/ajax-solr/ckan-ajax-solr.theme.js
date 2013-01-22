(function ($) {



AjaxSolr.theme.prototype.facet_list = function (doc) {

  var output = '';

  output += '<section class="module module-narrow module-shallow">';
  output += '<h2 class="module-heading"><i class="icon-filter"></i> ' + doc.field.charAt(0).toUpperCase() + doc.field.slice(1) + '<a class="action" id="clear_' + doc.field + '">Clear All</a></h2>';
  output += '<ul class="unstyled nav nav-simple nav-facet" id="' + doc.field + '"></ul></section>';
  return output;

};

// Search result theme
AjaxSolr.theme.prototype.result = function (doc, snippet) {
  var output = '<div><h2>' + doc.title + '</h2>';
  output += '<p id="links_' + doc.id + '" class="links"></p>';
  output += '<p>' + snippet + '</p></div>';
  return output;
};

// Resources theme
AjaxSolr.theme.prototype.snippet = function (doc) {
  var output = '';

  if (doc.notes) {
    output += doc.notes;
  }

 
  if (doc.res_url) {

  output += '<div class="accordion" id="accordion">';
  output += '  <div class="accordion-group">';
  output += '    <div class="accordion-heading">';
  output += '<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#collapse_' + doc.id + '">';
  output += '<i class="icon-chevron-down"></i><strong>Resources</strong>';
  output += '</a></div>';
  output += '<div id="collapse_' + doc.id + '" class="accordion-body collapse"><div class="accordion-inner">';
  }
 
  if (doc.url) {
    output += '<br/><i class="icon-globe"></i> <a href="' + doc.url + '">' + doc.url + '</a><br/>';
  }
  
  output += '<hr><table>';

  for (var u in doc.res_url) {

    var shorturl = doc.res_url[u].replace(/.*\/(.*$)/i, '$1');
    output += '<tr><td><a href="' + doc.res_url[u] + '">' + shorturl + '</a></td><td><a style="margin-bottom: 6px;margin-top: 6px;margin-left: 20px;" class="btn btn-small btn-success" href="/visualize/?id=' + doc._id + '&url=' + doc.res_url[u] + '&backend=dataproxy">Recline</a></td></tr>';
  }

  output += '</table>'; 

  if (doc.res_url) {

    output += '</div></div></div></div>';
  }

  return output;
};

// Facet menu elements theme
AjaxSolr.theme.prototype.tag = function (value, weight, handler) {
  var facet_val = $('<li>');
  facet_val.addClass('nav-item');


  var facet_val_link = $('<a href="#" />').text(value).click(handler);

  facet_val_link.append(' (' + weight + ')');
  facet_val.append(facet_val_link);

  //facet_val.attr('id', 'tag_' + value);
 
  return facet_val;
};

// Facet links theme
AjaxSolr.theme.prototype.facet_link = function (value, handler) {
  return $('<a href="#"/>').text(value).click(handler);
};

// No items found
AjaxSolr.theme.prototype.no_items_found = function () {
  return 'no items found in current selection';
};

})(jQuery);
