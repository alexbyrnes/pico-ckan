(function ($) {

AjaxSolr.TagcloudWidget = AjaxSolr.AbstractFacetWidget.extend({
  afterRequest: function () {
    if (this.manager.response.facet_counts.facet_fields[this.field] === undefined) {
      $(this.target).html(AjaxSolr.theme('no_items_found'));
      return;
    }

    var maxCount = 0;
    var objectedItems = [];
    for (var facet in this.manager.response.facet_counts.facet_fields[this.field]) {
      var count = parseInt(this.manager.response.facet_counts.facet_fields[this.field][facet]);
      if (count > maxCount) {
        maxCount = count;
      }
      objectedItems.push({ facet: facet, count: count });
    }
    objectedItems.sort(function (a, b) {
      return a.count > b.count ? -1 : 1;
    });

    $(this.target).empty();

    for (var i = 0, l = objectedItems.length; i < l; i++) {
      var facet = objectedItems[i].facet;

      var selected_facets_searchable = [];
      var selected_facets = this.manager.store.get('fq');

      for (var s = 0; s < selected_facets.length; s++) {
        selected_facets_searchable.push(selected_facets[s].val());
      }

      var facet_value_menu_item = null; 


      if (selected_facets_searchable.indexOf(this.field + ':' + facet) > 0) {
        facet_value_menu_item = AjaxSolr.theme('tag', facet, parseInt(objectedItems[i].count), this.unclickHandler(facet));
        facet_value_menu_item.addClass('active');
      } else {
        facet_value_menu_item = AjaxSolr.theme('tag', facet, parseInt(objectedItems[i].count), this.clickHandler(facet));
      }

      $(this.target).append(facet_value_menu_item);

    }
  }
});

})(jQuery);
