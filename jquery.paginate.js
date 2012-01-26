(function() {

  'A simple jQuery plugin to paginate items on a page written in CoffeeScript';

  var $;

  $ = jQuery;

  $.fn.paginate = function(opts) {
    var build_nav, hide_all, pages, show_paged_results, total_items;
    var _this = this;
    opts = $.extend({
      debug: false,
      page_items: 'li',
      items_per_page: 10,
      nav_container: '#paginate_nav_container'
    }, opts || {});
    total_items = this.children(opts.page_items).length;
    pages = Math.ceil(total_items / opts.items_per_page);
    hide_all = function() {
      var x, _i, _len, _ref, _results;
      _ref = _this.children(opts.page_items);
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        x = _ref[_i];
        _results.push($(x).hide());
      }
      return _results;
    };
    show_paged_results = function(active_page) {
      var end_item, start_item, this_page_items, x, _i, _len;
      if (active_page == null) active_page = 1;
      hide_all();
      start_item = (active_page - 1) * opts.items_per_page;
      end_item = (active_page * opts.items_per_page) - 1;
      this_page_items = _this.children(opts.page_items).slice(start_item, end_item + 1 || 9e9);
      for (_i = 0, _len = this_page_items.length; _i < _len; _i++) {
        x = this_page_items[_i];
        $(x).show();
      }
      return build_nav(active_page);
    };
    build_nav = function(active_page) {
      var nav_html, page_count, page_html;
      if (active_page == null) active_page = 1;
      page_count = 1;
      page_html = '';
      while (page_count < pages + 1) {
        if (parseInt(active_page) === page_count) {
          page_html += '<li class="paginate-active-page">' + page_count + '</li>';
        } else {
          page_html += '<li><a href="#paginate-anchor" class="paginate-click">' + page_count + '</a></li>';
        }
        page_count++;
      }
      if (active_page > 1) {
        page_html = '<li><a href="#paginate-anchor" class="prev-click">&laquo; prev</a></li>' + page_html;
      }
      if (pages - active_page >= 1) {
        page_html += '<li><a href="#paginate-anchor" class="next-click">next &raquo;</a></li>';
      }
      nav_html = '<ul>' + page_html + '</ul>';
      $(opts.nav_container).html(nav_html);
      $('.paginate-click').click(function() {
        build_nav($(this).html());
        return show_paged_results($(this).html());
      });
      $('.next-click').click(function() {
        return show_paged_results(parseInt($('.paginate-active-page').html()) + 1);
      });
      return $('.prev-click').click(function() {
        return show_paged_results(parseInt($('.paginate-active-page').html()) - 1);
      });
    };
    if (pages > 1) {
      $(this).prepend('<a name="paginate-anchor"></a>');
      return show_paged_results();
    }
  };

}).call(this);
