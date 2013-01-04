var Manager;

(function ($) {

  $(function () {
    Manager = new AjaxSolr.Manager({
      solrUrl: 'http://192.168.1.66:8983/solr/collection1/'
    });

    Manager.addWidget(new AjaxSolr.ResultWidget({
      id: 'result',
      target: '#docs'
    }));

    Manager.addWidget(new AjaxSolr.PagerWidget({
      id: 'pager',
      target: '#pager',
      prevLabel: '&lt;',
      nextLabel: '&gt;',
      innerWindow: 1,
      renderHeader: function (perPage, offset, total) {
        $('#pager-header').html($('<span/>').text('displaying ' + Math.min(total, offset + 1) + ' to ' + Math.min(total, offset + perPage) + ' of ' + total));
      }
    }));

    var fields = [ 'title', 'notes' ];
    for (var i = 0, l = fields.length; i < l; i++) {


      var facet_menu_container = $("aside.secondary");

      var facet_section = $('<section>');
      facet_section.addClass('module').addClass('module-narrow').addClass('module-shallow');


      // Add a header
      var facet_header = $('<h2>');
      var clear_all_button = $('<a>');
  
      // Add clear all click handler
      clear_all_button.text('Clear All').click({field:fields[i]}, function (event) {
 
        Manager.widgets[event.data.field].clear();

        Manager.doRequest();
        return false;
      });

   
      // Add clear all button
      facet_header.append(fields[i]);
      facet_header.append(clear_all_button.addClass('action'));

      // Style
      facet_header.addClass('module-heading');

      facet_section.append(facet_header);

      // Add list container
      var facet_container =  $('<ul>');

      // Style
      facet_container.addClass('unstyled').addClass('nav').addClass('nav-simple').addClass('nav-facet');

      // Link to ajax-solr
      facet_container.attr('id', fields[i]);

      facet_section.append(facet_container);

      facet_menu_container.append(facet_section);

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
        }
      }));
    }

    Manager.init();
    Manager.store.addByValue('q', '*:*');
    var params = {
      facet: true,
      'facet.field': fields,
      'facet.limit': 10,
      'facet.mincount': 2,
      'f.topics.facet.limit': 50,
      'json.nl': 'map'
    };

    for (var name in params) {
      Manager.store.addByValue(name, params[name]);
    }
    Manager.doRequest();
  });

})(jQuery);

