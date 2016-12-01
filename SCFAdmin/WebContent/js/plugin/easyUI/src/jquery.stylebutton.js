/**
 * stylebutton - jQuery EasyUI
 * 
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2012 stworthy [ stworthy@gmail.com ] 
 */
(function($){
	
	function createButton(target) {
		var opts = $.data(target, 'stylebutton').options;
		var state = $.data(target, 'stylebutton');
		state.autodisable = false;
		$(target).empty();
		
		var fixname = opts.style+'-' + opts.weight;
		$(target).addClass('style-btn-' + opts.weight);
		$(target).addClass('style-btn-' + opts.style);
		$(target).css('margin-left', '10px');
		$(target).css('_margin-left', '10px');
		if (opts.id){
			$(target).attr('id', opts.id);
		} else {
			$(target).attr('id', '');
		}
		if(opts.handler){
			state.onclick = opts.handler;
			target.onclick = null;
		}
		else {
			if (target.onclick){
				state.onclick = target.onclick;
				target.onclick = null;
				state.autodisable = true;
			}
		}
		
		if (opts.text){
			var txtcssname = 'style-btn-text';
			$(target).html(opts.text).wrapInner(
					'<span class="' + txtcssname + '">' +
					'</span>'
			);
			if (opts.iconCls){
				$(target).find('.' + txtcssname).addClass(opts.iconCls).css('padding-left', '20px');
			}
		} else {
			$(target).html('&nbsp;').wrapInner(
					'<span class="style-btn-text">' +
					'</span>'
			);
			if (opts.iconCls){
				$(target).find('.style-btn-text').addClass(opts.iconCls);
			}			
		}
		$(target).bind('click.stylebutton',function(){
			if(state.options.disabled){
				return;
			}
			if(state.autodisable == false){
				setDisabled(this,true,state.options);
			}
			if(state.onclick){
				var type = state.onclick(this);
				if(type == false){
					setDisabled(this,false,state.options);
				}
			}
			
		});		
		setDisabled(target, opts.disabled,opts);
	}
	
	function setDisabled(target, disabled,opts){
		if(!opts){
			opts = $.data(target, 'stylebutton').options;
		}
		var state = $.data(target, 'stylebutton');
		$(target).attr('href', 'javascript:void(0)');
		if (disabled){
			state.options.disabled = true;
			var href = $(target).attr('href');
//			if (href){
//				state.href = href;
//			}
//			if (target.onclick){
//				state.onclick = target.onclick;
//				target.onclick = null;
//			}
			$(target).removeClass('style-btn-' + opts.style);
			$(target).addClass('style-btn-disabled');
		} else {
			state.options.disabled = false;
//			if (state.href) {
////				$(target).attr('href', state.href);
//			}
//			if (state.onclick) {
//				target.onclick = state.onclick;
//			}
			$(target).removeClass('style-btn-disabled');
			$(target).addClass('style-btn-' + opts.style);
		}
	}
	
	$.fn.stylebutton = function(options, param){
		if (typeof options == 'string'){
			return $.fn.stylebutton.methods[options](this, param);
		}
		
		options = options || {};
		return this.each(function(){
			var state = $.data(this, 'stylebutton');
			if (state){
				$.extend(state.options, options);
			} else {
				$.data(this, 'stylebutton', {
					options: $.extend({}, $.fn.stylebutton.defaults, $.fn.stylebutton.parseOptions(this), options)
				});
				$(this).removeAttr('disabled');
			}
			
			createButton(this);
		});
	};
	
	$.fn.stylebutton.methods = {
		options: function(jq){
			return $.data(jq[0], 'stylebutton').options;
		},
		enable: function(jq){
			return jq.each(function(){
				setDisabled(this, false);
			});
		},
		disable: function(jq){
			return jq.each(function(){
				setDisabled(this, true);
			});
		}
	};
	
	$.fn.stylebutton.parseOptions = function(target){
		var t = $(target);
		return $.extend({}, $.parser.parseOptions(target, ['id','iconCls', 'flag',{plain:'boolean'}]), {
			disabled: (t.attr('disabled') ? true : undefined),
			text: $.trim(t.html()),
			iconCls: (t.attr('icon') || t.attr('iconCls'))
		});
	};
	
	$.fn.stylebutton.defaults = {
		id: null,
		disabled: false,
		plain: false,
		text: '',
		iconCls: null,
		//org:橙色，gry:灰色
		style:'org',
		//bloder,blod,normal
		weight:'normal'
	};
	
})(jQuery);
