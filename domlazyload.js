/**
 * jQuery DomLazyLoad
 * A very lightweight jQuery plugin to lazy load doms
 * 
 * Licensed under the MIT license.
 * Copyright 2014 Pang Feng
 * 
 */

/**
 *  example: $("#container").domLazyLoad();
 * 	The doms need lazyload in container should be added class "lazy",
 * 	image's true src should be given to "data-src".
 */

;(function($) {
	$("<style></style>").text(".lazy{display:none;}").appendTo($("head"));
	$.fn.domLazyLoad = function(){
		var tempSrcAttr = "data-src", groupNum = 4,self = this;		
		var anchor = $("div.lazy_load_anchor");
		if(!anchor.length){
			anchor = $("<div class='lazy_load_anchor' style='margin-top:2px;height:20px;line-height:15px;text-align:center;color:#888;font-size:12px;'>加载中……</div>").appendTo($(document.body));
		};
		
		anchor.css({'visibility':'visible'});		

		function loadMore(){
			// var items = self.find(".lazy:hidden:lt("+groupNum+")");
			var hiddenItems = self.find(".lazy:hidden");
			var items = hiddenItems.slice(0, groupNum);
			if(hiddenItems.length<=groupNum){
				anchor.css({'visibility':'hidden'});	
			}
			if(items.length>0){
				items.each(function(){
					var $this = $(this), img = $this.find("img[data-src]");
					img.attr("src",img.attr("data-src"));
					$(this).removeClass('lazy');
				});
				//If not enough to fill screen, go on.
				$(window).scroll();
			}
		}
		
		if(!self.bindedLazyLoad){
			self.bindedLazyLoad = true;
			//anchorOffset之所以不是0是因为在note2的浏览器里有时anchor露出来了，计算出的这个值也是负数
			var anchorOffset = -100;
			$(window).scroll(function(){
				var lastPageScrollTop = $(window).scrollTop();
				var timeout = setTimeout(function () {
					clearTimeout(timeout);
					// if(lastPageScrollTop === $(window).scrollTop()){
					// 	console.info($(window).scrollTop(),$(window).height(),anchor.offset().top,lastPageScrollTop + $(window).height()-anchor.offset().top);
					// }
					//每400ms判断一次，减少性能消耗
					//先判断scroll动作是否已停止，lastPageScrollTop === $(window).scrollTop()
					//最后判断放在底部的anchor是否从窗口底部露出来。
					if (lastPageScrollTop === $(window).scrollTop() && lastPageScrollTop + $(window).height()-anchor.offset().top>anchorOffset) {
						loadMore();
					}
				}, 400);
			});
		}

		
		loadMore();
		
		return this;
	}
})(window.jQuery || window.Zepto);
