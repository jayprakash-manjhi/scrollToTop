/*!
 jQuery scrollToTop v1.0 - 2019-10-10
 (c) 2019 Jayprakash Manjhi <jayprakash.manjhi1987@gmail.com>
 license: http://www.opensource.org/licenses/mit-license.php
 */
(function ( $ ) {
	$.fn.totopscroller = function(options) {
		
		var defaults = {
			showToBottom: true,
			showToPrev: false,
			link: false,
			linkTarget: '_self',
			toTopHtml: '<a href="#"></a>',
			toBottomHtml: '<a href="#"></a>',
			toPrevHtml: '<a href="#"></a>',
			linkHtml: '<a href="#"></a>',
			toTopClass: 'totopscroller-top',
			toBottomClass: 'totopscroller-bottom',
			toPrevClass: 'totopscroller-prev',
			linkClass: 'totopscroller-lnk'
        };

		var settings = $.extend({}, defaults, options);

		var lastposition = 0;
		
		var wrapper = this,
            b_top = null,
            b_bottom = null,
            b_prev = null,
			b_link = null,
			b_wrapper = null;
			
		var init = function() {
			b_wrapper = $('<div></div>');
			if (settings.showToBottom)
			{
				b_bottom = $(settings.toBottomHtml);
				b_bottom.hide();
				b_bottom.addClass(settings.toBottomClass);
				b_bottom.appendTo(b_wrapper);
			}
			if (settings.showToPrev)
			{
				b_prev = $(settings.toPrevHtml);
				b_prev.hide();
				b_prev.addClass(settings.toPrevClass);
				b_prev.appendTo(b_wrapper);
			}
			b_top = $(settings.toTopHtml);
			b_top.hide();
			b_top.addClass(settings.toTopClass);
			b_top.appendTo(wrapper);
			if (settings.link)
			{
				b_link = $(settings.linkHtml);
				b_link.attr("target", settings.linkTarget);
				b_link.attr("href", settings.link);
				b_link.addClass(settings.linkClass);
				b_link.appendTo(wrapper);
			}
			b_wrapper.appendTo(wrapper);
			
			b_top.click(function(e) {
				e.preventDefault();
				lastposition = $(document).scrollTop();
				$('html, body').animate({scrollTop:0}, 
				{
					duration: 'slow', 
					complete: function () {
						refresh();
					}
				});
			});
			if (settings.showToBottom)
			{
				b_bottom.click(function(e) {
					e.preventDefault();
					lastposition = 0;
					$('html, body').animate({scrollTop:$(document).height()}, 
					{
						duration: 'slow', 
						complete: function () {
							refresh();
						}
					});
				});
			}
// 			if (settings.showToPrev)
// 			{
// 				b_prev.click(function(e) {
// 					e.preventDefault();	
// 					$('html, body').animate({scrollTop:lastposition}, 
// 					{
// 						duration: 'slow', 
// 						complete: function () {
// 							lastposition = 0;
// 							refresh();
// 						}
// 					});
// 				});
// 			}
		}
		
		var refresh = function () {
			if ($(document).scrollTop() > 0)
			{
				if (!b_top.is(":visible"))
					b_top.fadeIn("slow");
			}
			else if (b_top.is(":visible"))
				b_top.fadeOut("slow");
			var footerPaddedvalue = 50;	
			var scrollTopValue = parseInt($(window).scrollTop());
			var windowInnerHeight = parseInt(window.innerHeight);
			var documentHeight = parseInt($(document).height()) - footerPaddedvalue;
			var windowOuterHeight = window.outerHeight;

			var DallerwindowHeight  = $(window).height();

// 			console.log('-----------------------------------------');
// 			console.log('Scroll Top Value: ', scrollTopValue);
// 			console.log('$ Window Height: ', DallerwindowHeight);
// 			console.log('Window Inner Height: ', windowInnerHeight);
// 			console.log('Document Height: ', documentHeight);
// 			console.log('Window Outer Height: ', windowOuterHeight);

			$('#scrollTopValue').text(scrollTopValue);
			$('#DallerwindowHeight').text(DallerwindowHeight);
			$('#windowInnerHeight').text(windowInnerHeight);
			$('#documentHeight').text(documentHeight);
			$('#windowOuterHeight').text(windowOuterHeight);
			
			
			if (((scrollTopValue + windowInnerHeight) >= documentHeight)) {
				if (b_bottom.is(":visible"))
					b_bottom.fadeOut("slow");
			}
			else if (!b_bottom.is(":visible"))
					b_bottom.fadeIn("slow");

// 			if (lastposition>0)
// 			{
// 				if (!b_prev.is(":visible"))
// 					b_prev.fadeIn("slow");
// 			}
// 			else if (b_prev.is(":visible"))
// 					b_prev.fadeOut("slow");
		}

		$(window).scroll(function() {
			if ($('html, body').is(":animated"))
				return;
			setTimeout(function(){
				refresh();	
			},50)
			

		});

		init();
		refresh();
		return this;
	};
}( jQuery ));
