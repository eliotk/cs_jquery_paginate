'''
A simple jQuery plugin to paginate items on a page written in CoffeeScript
'''

$ = jQuery
$.fn.paginate = (opts) -> 
	opts = $.extend
		debug: false # turn on debug - does not do anything right now
		page_items: 'li' #items to be paginated that live within targeted element
		items_per_page: 10 # how many items on each page
		nav_container: '#paginate_nav_container' # pagination navgiation inserted into this element
	, opts or {}
	total_items = this.children(opts.page_items).length
	pages = Math.ceil total_items/opts.items_per_page	

	hide_all = =>
		for x in this.children(opts.page_items)
			$(x).hide()

	show_paged_results = (active_page = 1) =>
		hide_all()	
		start_item = (active_page-1)*opts.items_per_page
		end_item = (active_page*opts.items_per_page)-1
		this_page_items = this.children(opts.page_items)[start_item..end_item]
		for x in this_page_items
			$(x).show()
		build_nav(active_page)
	
	build_nav = ( active_page = 1 ) =>	
		page_count = 1
		page_html = ''
		while page_count < pages + 1
			if parseInt(active_page) == page_count
				page_html += '<li class="paginate-active-page">' + page_count + '</li>'
			else
				page_html += '<li><a href="#paginate-anchor" class="paginate-click">' + page_count + '</a></li>'
			page_count++
		if active_page > 1
			page_html = '<li><a href="#paginate-anchor" class="prev-click">&laquo; prev</a></li>' + page_html
		if pages - active_page >= 1
			page_html += '<li><a href="#paginate-anchor" class="next-click">next &raquo;</a></li>'
		nav_html = '<ul>' + page_html + '</ul>'
		$(opts.nav_container).html nav_html
		$('.paginate-click').click -> 
			build_nav $(this).html()
			show_paged_results $(this).html()
		$('.next-click').click -> 
			show_paged_results parseInt($('.paginate-active-page').html()) + 1
		$('.prev-click').click -> 
			show_paged_results parseInt($('.paginate-active-page').html()) - 1
			
	if pages > 1
		# add anchor 
		$(this).prepend '<a name="paginate-anchor"></a>'
		show_paged_results()