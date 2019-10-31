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
			linkClass: 'totopscroller-lnk',
			marginFromBottom: 50,
			scrollMovementPercentage: 25,
			directTopBottomMovement: false,
			sectionReference: '#section_18'
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
				//let scrollTopValue = scrollMovement('top');
				scrollTopValue = 0;
				$('html, body').animate({scrollTop: scrollTopValue}, 
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
					//lastposition = 0;
					//lastposition = $(document).scrollTop();
					//let scrollBottomValue = scrollMovement('bottom');
					let scrollBottomValue = $(settings.sectionReference).position().top;
					lastposition = $(document).scrollTop()
					if(lastposition >= scrollBottomValue){
						scrollBottomValue = $(document).height();
					}
					$('html, body').animate({scrollTop: scrollBottomValue}, 
					{
						duration: 'slow', 
						complete: function () {
							refresh();
						}
					});
				});
			}
			if (settings.showToPrev)
			{
				b_prev.click(function(e) {
					e.preventDefault();	
					$('html, body').animate({scrollTop:lastposition}, 
					{
						duration: 'slow', 
						complete: function () {
							lastposition = 0;
							refresh();
						}
					});
				});
			}
		}

		/**
		 * Scroll click should move the screen by some percentage of document height.
		 * @param {String} direction 
		 */
		var scrollMovement = function(direction){
			let documentHeight = parseInt($(document).height());
			let lastScrollPercentage = (lastposition * 100) / documentHeight;
			if(direction == 'top'){
				if(settings.directTopBottomMovement) return 0;
				//let scrollTopValue = ((lastScrollPercentage - settings.scrollMovementPercentage) / 100 ) * documentHeight;
				let scrollTopValue = lastposition - window.innerHeight;
				scrollTopValue = scrollTopValue < 0 ? 0 : scrollTopValue;
				return scrollTopValue;
			}else if(direction == 'bottom'){
				if(settings.directTopBottomMovement) return  documentHeight;
				//let scrollBotomValue = ((lastScrollPercentage + settings.scrollMovementPercentage) / 100 ) * documentHeight;
				let scrollBotomValue = lastposition + window.innerHeight;
				scrollBotomValue = scrollBotomValue >= documentHeight ? documentHeight : scrollBotomValue;
				return scrollBotomValue;
			}
		}


		
		var refresh = function () {
			if ($(document).scrollTop() > 0)
			{
				if (!b_top.is(":visible"))
					b_top.fadeIn("slow");
			}
			else if (b_top.is(":visible"))
				b_top.fadeOut("slow");

			var scrollTopValue = parseInt($(window).scrollTop());
			var windowInnerHeight = parseInt(window.innerHeight);
			var documentHeight = parseInt($(document).height()) - settings.marginFromBottom;
			
			if (((scrollTopValue + windowInnerHeight) >= documentHeight)) {
				if (b_bottom.is(":visible"))
					b_bottom.fadeOut("slow");
			}
			else if (!b_bottom.is(":visible"))
					b_bottom.fadeIn("slow");

			// if (lastposition>0)
			// {
			// 	if (!b_prev.is(":visible"))
			// 		b_prev.fadeIn("slow");
			// }
			// else if (b_prev.is(":visible"))
			// 		b_prev.fadeOut("slow");
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
