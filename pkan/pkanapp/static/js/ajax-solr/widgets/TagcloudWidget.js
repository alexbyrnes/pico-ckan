(function ($) {

AjaxSolr.TagcloudWidget = AjaxSolr.AbstractFacetWidget.extend({
  afterRequest: function () {
    if (this.manager.response.facet_counts.facet_fields[this.field] === undefined) {
      $(this.target).html(AjaxSolr.theme('no_items_found'));
      return;
    }
    
    // Add clear handler to 'clear all' button
    $('#clear_' + this.field).click({field:this.field}, this.clearHandler);


    // Make a searchable array of the currently selected facets
    var selected_facets_searchable = [];
    var selected_facets = this.manager.store.get('fq');

    for (var s = 0; s < selected_facets.length; s++) {
      selected_facets_searchable.push(selected_facets[s].val());
    }

    var maxCount = 0;
    var objectedItems = [];
    var selected = false;

    // Make a sortable array of all facets 
    for (var facet in this.manager.response.facet_counts.facet_fields[this.field]) {

      selected = false;

      var count = parseInt(this.manager.response.facet_counts.facet_fields[this.field][facet]);
      if (count > maxCount) {
        maxCount = count;
      }

      // Facets with spaces are in quotes from solr
      var quoted_facet = facet

      if (facet.indexOf(' ') > 0) {
        quoted_facet = '"' + facet + '"';
      }

      if (selected_facets_searchable.indexOf(this.field + ':' + quoted_facet) > 0) {
          selected = true;
      }

      objectedItems.push({ facet: facet, count: count, selected: selected });
    }


    objectedItems.sort(function (a, b) {
       return a.facet < b.facet ? -1 : 1;
    });

    $(this.target).empty();

    for (var i = 0, l = objectedItems.length; i < l; i++) {

      var item = objectedItems[i];
 
      var facet_value_menu_item = null; 

      if (item.selected) {
        facet_value_menu_item = AjaxSolr.theme('tag', item.facet, parseInt(item.count), this.unclickHandler(item.facet));
        facet_value_menu_item.addClass('active');
      } else {
        facet_value_menu_item = AjaxSolr.theme('tag', item.facet, parseInt(item.count), this.clickHandler(item.facet));
      }

      $(this.target).append(facet_value_menu_item);

    }
  }
});

})(jQuery);
