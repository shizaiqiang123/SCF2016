/**
 * @author: huyy
 * 说明：
 *    1、上一步下一步按钮定位在最顶层的window。
 *    2、创建结构为：
 *      <div class="go">
 *			<a title="返回顶部" class="top">
 *				<span class="w-txt">返回<br>顶部</span>
 *			</a>
 *			<a title="返回底部 " class="bottom">
 *				<span class="w-txt">返回<br>底部</span>
 *			</a>
 *		</div>  
 *    3、样式在css/zybl/boccop.css中的.go等。   
 */
(function($){

    function getTop(w, options){
        var _doc;
        try{
            _doc = w['top'].document;
            _doc.getElementsByTagName;
        }catch(e){
            return w;
        }

        if(options.locate=='document' || _doc.getElementsByTagName('frameset').length >0){
            return w;
        }

        if(options.locate=='document.parent' || _doc.getElementsByTagName('frameset').length >0){
            return w.parent;
        }

        return w['top'];
    }
    
    /**
     * 返回顶部，返回底部操作。
     */
    function initButton(){	
    	$(window).scroll(function() {
    		visibleOrHiddenBtn();
    	});	
    	$(".top").click(function() {
    		$('html,body').animate({
    			scrollTop : 0
    		}, 400);
    	}).hover(function() {
    		$(this).addClass("hover");
    	}, function() {
    		$(this).removeClass("hover");
    	});
    	$(".bottom").click(function() {
    		$('html,body').animate({
    			scrollTop : $(document).height()-$(window).height()
    		}, 400);
    	}).hover(function() {
    		$(this).addClass("hover");
    	}, function() {
    		$(this).removeClass("hover");
    	});	
    }

    /**
     * 判断是否展示“返回顶部”、“返回底部”按钮
     */
    function visibleOrHiddenBtn(){
    	if ($(window).scrollTop() > 200 && $(window).scrollTop()<$(document).height()-$(window).height()) {
    		$(".go,.top,.bottom").css({			
    			'display': 'block'
    		});
    	}
    	if($(window).scrollTop()>=$(document).height()-$(window).height()){
    		$(".bottom").css({			
    			'display': 'none'
    		});
    	}
    	if($(window).scrollTop()<200){
    		$(".top").css({
    			'display': 'none'
    		});
    	}
    	if($(window).scrollTop()>=$(document).height()-$(window).height() && $(window).scrollTop()<200){
    		$(".go").css({
    			'display': 'none'
    		});
    	}
    }
    function createGo(winOpts){
    	var _top = getTop(window, winOpts);
    	var go = $('<div>').addClass('go').appendTo(_top.document.body);
    	var aTop = $('<a>').addClass('top').attr('title','返回顶部').appendTo(go);
    	$('<span>').addClass('w-txt').html('返回<br>顶部').appendTo(aTop);
    	var aBottom = $('<a>').addClass('bottom').attr('title','返回底部').appendTo(go);
    	$('<span>').addClass('w-txt').html('返回<br>底部').appendTo(aBottom);
    }
    
    $.extend({        
        showGo: function(options){
        	options = options || {};
            var winOpts = $.extend({},{                
                locate: 'top'                
            }, options);            
            createGo(winOpts);
        	initButton();
        }
    });
})(jQuery);