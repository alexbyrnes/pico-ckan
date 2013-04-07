var Manager;

var fields = [ 'source', 'format', 'license', 'tags' ];

var params = {
   facet: true,
   'facet.field': fields,
   'facet.limit': 8,
   'facet.mincount': 1,
   'f.topics.facet.limit': 50,
   'json.nl': 'map'
    };



(function ($) {

  $(function () {
    Manager = new AjaxSolr.Manager({
      solrUrl: 'http://localhost:8983/solr/collection1/'
    });

  Manager.addWidget(new AjaxSolr.PagerWidget({
      id: 'pager',
      target: '#pager',
      prevLabel: '&lt;',
      nextLabel: '&gt;',
      innerWindow: 1,
      renderHeader: function (perPage, offset, total) {
        // Not used yet.
        //$('#pager-header').html($('<span/>').text('displaying ' + Math.min(total, offset + 1) + ' to ' + Math.min(total, offset + perPage) + ' of ' + total));
      }
    }));

    /*
    // Not used yet.
    Manager.addWidget(new AjaxSolr.CurrentSearchWidget({
      id: 'currentsearch',
      target: '#selection'
    }));
    */

    Manager.addWidget(new AjaxSolr.AutocompleteWidget({
      id: 'text',
      target: '#search',
      fields: fields
    }));

    Manager.addWidget(new AjaxSolr.ResultWidget({
      id: 'result',
      target: '#docs'
    }));

    for (var i = 0, l = fields.length; i < l; i++) {


      $("aside.secondary").append(AjaxSolr.theme('facet_list', {'field' : fields[i]}));

      Manager.addWidget(new AjaxSolr.TagcloudWidget({
        id: fields[i],
        target: '#' + fields[i],
        field: fields[i],
        clickHandler: function (value) {
          var self = this, meth = this.multivalue ? 'add' : 'set';
          return function () {
          if (self[meth].call(self, value)) {
            self.doRequest();
          }
          return false;
          }
        },
        clearHandler: function (event) {

        Manager.widgets[event.data.field].clear();

        Manager.doRequest();
        return false;
      }
      }));
    }

    Manager.init();
    Manager.store.addByValue('q', '*:*');

    for (var name in params) {
      Manager.store.addByValue(name, params[name]);
    }
    Manager.doRequest();
  });

})(jQuery);

