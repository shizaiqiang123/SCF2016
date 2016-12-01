/**
 * downloadtemplate - jQuery EasyUI
 * 
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2013-2014 Utian [ zhengwei@starutian.com ] 
 * 
 * Dependencies:
 *   file
 * 
 */

(function($){
	 
	function loadRightData(target, data, remainText){
		var opts = $.data(target, 'downloadtemplate').options;	
		var downloadtemplate = $.data(target, 'downloadtemplate').downloadtemplate.rightlist;		
		$.data(target, 'downloadtemplate').rightdata = data;
		
		downloadtemplate.empty();	// clear old data
		 
		for(var i=0; data && i<data.groups.length; i++){
			var groups =data.groups[i];
			var groupsHtml = $("<div><h3>"+groups.text+"</h3></div>").appendTo(downloadtemplate);
			var items = $("<dl></dl>").appendTo(groupsHtml);
			
			for ( var j = 0; j < groups.items.length; j++) {
				var dd = $("<dd></dd>").appendTo(items);
				$("<a target ='_blank' href="+SCFUtils.ROOTURL+groups.items[j].url+"><img src="+SCFUtils.ROOTURL+groups.items[j].iconurl+"><div><h4>"+groups.items[j].title+"</h4><p>"+groups.items[j].desc+"</p></div></a>").appendTo(dd);
				dd.bind("mouseenter.dd",function(){
					if (!opts.disabled){
						$(this).addClass("over");
					}
				})
				.bind("mouseleave.dd",function(){
					$(this).removeClass("over");
				});
			}
		}				
		opts.onLoadSuccess.call(target, data);
		
//		$(downloadtemplate).hover().click(function(){
//
//			});
		 
	}
	
	 
	function initCtrl(el,options){
	  
		var right = $(el);
		   
		return {rightlist:right};
	}
	
	function rightRequest(target, url, param, remainText){
		var opts = $.data(target, 'downloadtemplate').options;
		if (url){
			opts.url = url;
		}
		
		param = param || {};
		
		if (opts.onBeforeLoad.call(target, param) == false) return;

		opts.loader.call(target, param, function(data){
			loadRightData(target, data, remainText); 
		}, function(){
			opts.onLoadError.apply(this, arguments);
		});
	}
	  
	function getData(target){
		var list = $.data(target, 'downloadtemplate').downloadtemplate.rightlist;
		var items = list.find('div.downloadtemplate-item');
		var v = "";
		for(var i=0;i<items.length;i++){
			v = v + "," + $(items[i]).attr("value");
		}
		if (v.length > 0){
			v = v.substring(1, v.length);
		}
		return v;
	}
	
	$.fn.downloadtemplate = function(options, param){
	 
		if(typeof options=="string"){
			return $.fn.downloadtemplate.methods[options](this,param);
		}
		options=options||{};
		return this.each(function(){
			var data=$.data(this,"downloadtemplate");
			if(data){
				$.extend(data.options,options);
			}else{
				var r=initCtrl(this,options);				
				data=$.data(this,"downloadtemplate",{options:$.extend({},$.fn.downloadtemplate.defaults,$.fn.downloadtemplate.parseOptions(this),options),downloadtemplate:r,previousValue:null});	
				
				var t = $.data(this,"downloadtemplate");
			}
			rightRequest(this,options.rightds.url,options.rightds.baseParams);
			if (data.options.rendered){
				data.options.rendered(this,data.options);
			}
		});
		
	};	
	
	$.fn.downloadtemplate.methods = {
			options: function(jq){
				return $.data(jq[0], 'downloadtemplate').options;
			},
			getData: function(jq){
				return getData(jq[0]);
			},
			setValues: function(jq, values){
				return jq.each(function(){
					setValues(this, values);
				});
			},
			setValue: function(jq, value){
				return jq.each(function(){
					setValues(this, [value]);
				});
			},
			loadData: function(jq, data){
				return jq.each(function(){
					loadData(this, data);
				});
			},
			reload: function(jq, url){
				return jq.each(function(){
					request(this, url);
				});
			} 
		};
	
	$.fn.downloadtemplate.parseOptions = function(target){
		var t = $(target);
		return $.extend({}, $.parser.parseOptions(target,[
			'valueField','textField','mode','method','url'
		]));
	};
	
	$.fn.downloadtemplate.defaults = $.extend({}, {
		valueField: 'value',
		textField: 'text',
		mode: 'local',	// or 'remote'
		method: 'post',
		url: null,
		data: null,
		messages:{
			selectrecord:'Please select a record'
		},
		formatter: function(row){
			var opts = $(this).downloadtemplate('options');
			if (opts.filterFields && opts.filterFields.length>0){
				t = "";
				for(var i=0;i<opts.filterFields.length;i++){
					t = t + row[opts.filterFields[i]] + " ";
				}				
				return t;
			}
			else{
				return row[opts.textField];
			}
		},
		loader: function(param, success, error){
			var opts = $(this).downloadtemplate('options');
			$.extend(param,{sid:SCFUtils.SESSION_ID});
			if (!opts.url) return false;
			$.ajax({
				type: opts.method,
				url: opts.url,
				data: param,
				dataType: 'json',
				success: function(data){ 
					success(data);
				},
				error: function(){
					error.apply(this, arguments);
				}
			});
		},
		
		onBeforeLoad: function(param){},
		onLoadSuccess: function(){},
		onLoadError: function(){},
		onSelect: function(record){},
		onUnselect: function(record){}
	});
	
	
})(jQuery);