/**
 * squarebutton - jQuery EasyUI
 * 
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2012 stworthy [ stworthy@gmail.com ] 
 */
(function($){
	
	function createButton(target) {
		var opts = $.data(target, 'squarebutton').options;
		
		$(target).empty();
		var fixname = opts.style+'-' + opts.weight;
		$(target).addClass('style-btn-' + opts.weight);
		$(target).addClass('style-btn-' + opts.style);
		
		if (opts.id){
			$(target).attr('id', opts.id);
		} else {
			$(target).attr('id', '');
		}
		
		if (opts.text){
			var txtcssname = 'style-btn-text';
			$(target).html(opts.text).wrapInner(
					'<div class="style-btn-image">'+
					'<div class="' + txtcssname + '">' +
					'</div></div>'
			);
			if (opts.iconCls){
				$(target).find('.style-btn-image').addClass(opts.iconCls).css('margin-top', '5px');
				$(target).find('.'+txtcssname).css('padding-top', '28px');
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
				
//		$(target).unbind('.squarebutton').bind('focus.squarebutton',function(){
//			if (!opts.disabled){
//				$(this).find('span.l-btn-text').addClass('l-btn-focus');
//			}
//		}).bind('blur.squarebutton',function(){
//			$(this).find('span.l-btn-text').removeClass('l-btn-focus');
//		});
		
		setDisabled(target, opts.disabled,opts);
	}
	
	function setDisabled(target, disabled,opts){
		var state = $.data(target, 'squarebutton');
		if (disabled){
			state.options.disabled = true;
			var href = $(target).attr('href');
			if (href){
				state.href = href;
				$(target).attr('href', 'javascript:void(0)');
			}
			if (target.onclick){
				state.onclick = target.onclick;
				target.onclick = null;
			}
			$(target).removeClass('style-btn-' + opts.style);
			$(target).addClass('style-btn-disabled');
		} else {
			state.options.disabled = false;
			if (state.href) {
				$(target).attr('href', state.href);
			}
			if (state.onclick) {
				target.onclick = state.onclick;
			}
			$(target).removeClass('style-btn-disabled');
			$(target).addClass('style-btn-' + opts.style);
		}
	}
	
	$.fn.squarebutton = function(options, param){
		if (typeof options == 'string'){
			return $.fn.squarebutton.methods[options](this, param);
		}
		
		options = options || {};
		return this.each(function(){
			var state = $.data(this, 'squarebutton');
			if (state){
				$.extend(state.options, options);
			} else {
				$.data(this, 'squarebutton', {
					options: $.extend({}, $.fn.squarebutton.defaults, $.fn.squarebutton.parseOptions(this), options)
				});
				$(this).removeAttr('disabled');
			}
			
			createButton(this);
		});
	};
	
	$.fn.squarebutton.methods = {
		options: function(jq){
			return $.data(jq[0], 'squarebutton').options;
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
	
	$.fn.squarebutton.parseOptions = function(target){
		var t = $(target);
		return $.extend({}, $.parser.parseOptions(target, ['id','iconCls', 'flag',{plain:'boolean'}]), {
			disabled: (t.attr('disabled') ? true : undefined),
			text: $.trim(t.html()),
			iconCls: (t.attr('icon') || t.attr('iconCls'))
		});
	};
	
	$.fn.squarebutton.defaults = {
		id: null,
		disabled: false,
		plain: false,
		text: '',
		iconCls: null,
		//org:橙色，gry:灰色
		style:'gryorg',
		//bloder,blod,normal
		weight:'square'
	};
	
})(jQuery);
