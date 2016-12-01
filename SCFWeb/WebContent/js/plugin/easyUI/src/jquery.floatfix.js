(function($){
	function initLocal(target,params){
		var opts = $.data(target,"capacityFixed").options;
		var top = opts.top;
		var scrolls = $(window).scrollTop();
		var element = $(target);
        if (scrolls > top) {
            if (window.XMLHttpRequest) {
                element.css({
                    position: "fixed",
                    top: st,
                    right:right					
                });
            } else {
                element.css({
                    top: scrolls + st,
                    right:right
                });
            }
        }else {
            element.css({
                position: "absolute",
                top: top,
                right:right
            });
        }
        var st = opts.scolltop;
//        var right = ($(window).width()-opts.pageWidth)/2+opts.right;

        var right = opts.right;
        if($(window).width() - right < opts.pageWidth){
        	right=0;
        }
        $(target).css({
            "right":right,
            "top":top
        });
	};
	
    $.fn.capacityFixed = function(options,param) {
    	if (typeof options == 'string'){
			return $.fn.capacityFixed.methods[options](this, param);
		}
        var opts = $.extend({},$.fn.capacityFixed.deflunt,options);
        
        var FixedFun = function(element) {
            var top = opts.top;
            var st = opts.scolltop;
//            var right = ($(window).width()-opts.pageWidth)/2+opts.right;
            var right = opts.right;
            if($(window).width() - right < opts.pageWidth){
            	right=0;
            }
            element.css({
                "right":right,
                "top":top
            });
            $(window).resize(function(){
//                var right = ($(window).width()-opts.pageWidth)/2+opts.right;
                var right = opts.right;
                if($(window).width() - right < opts.pageWidth){
                	right=0;
                }
                var scrolls = $(this).scrollTop();
                if (scrolls > top) {
                    if (window.XMLHttpRequest) {
                        element.css({
                            position: "fixed",
                            top: st,
                            right:right					
                        });
                    } else {
                        element.css({
                            top: scrolls + st,
                            right:right
                        });
                    }
                }else {
                    element.css({
                        position: "absolute",
                        top: top,
                        right:right
                    });
                }
            });
            $(window).scroll(function() {
                var scrolls = $(this).scrollTop();
                if (scrolls > top) {
                    if (window.XMLHttpRequest) {
                        element.css({
                            position: "fixed",
                            top: st							
                        });
                    } else {
                        element.css({
                            top: scrolls + st
                        });
                    }
                }else {
                    element.css({
                        position: "absolute",
                        top: top
                    });
                }
            });
            element.find(".close-ico").click(function(event){
                element.remove();
                event.preventDefault();
            });
        };
        return $(this).each(function() {
        	var data=$.data(this,"capacityFixed");
    		if(data){
    			$.extend(data.options,options);
    		}else{
    			data=$.data(this,"capacityFixed",
    					{options:$.extend({},
    							$.fn.capacityFixed.defaults,options)});
    		}
            FixedFun($(this));
        });
    };
    $.fn.capacityFixed.deflunt={
		right : 5,//相对于页面宽度的右边定位
        top:150,
        pageWidth : 980,
        scolltop:0
	};
    $.fn.capacityFixed.methods={
    		options:function(jq){
    			var _16=$.data(jq[0],"lookup").options;
    			return $.extend(_16,{value:jq.val()});
    		},
    		reset:function(jq){
    			return jq.each(function(){
    				initLocal(this);
    			});
    		}
    	};
})(jQuery);