/**
 * combobox - jQuery EasyUI
 * 
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2012 stworthy [ stworthy@gmail.com ] 
 * 
 * Dependencies:
 *   combo
 * 
 */
(function($){
	
	
	/**
	 * load data, the old list items will be removed.
	 */
	function loadRightData(target, data, remainText){
		var opts = $.data(target, 'listbox').options;	
		var listbox = $.data(target, 'listbox').listbox.rightlist;		
		$.data(target, 'listbox').rightdata = data;
		listbox.empty();	// clear old data
		for(var i=0; data && i<data.length; i++){
			var v = data[i][opts.valueField];
			var s = data[i][opts.textField];
			var item = $('<div class="listbox-item"></div>').appendTo(listbox);
			item.attr('value', v);
			if (opts.formatter){
				item.html(opts.formatter.call(target, data[i]));
			} else {
				item.html(s);
			}
		}				
		opts.onLoadSuccess.call(target, data);

		$('.listbox-item', listbox).hover(
				function(){$(this).addClass('listbox-item-hover');},
				function(){$(this).removeClass('listbox-item-hover');}
			).click(function(){
				var item = $(this);
				var oitem = $.data(target, 'listbox')['rselected'];
				if (oitem != null){
					oitem.removeClass('listbox-item-selected');
				}
				item.addClass('listbox-item-selected');
				$.data(target, 'listbox')['rselected'] = item;
			});
	}
	
	function addItem(target,tlist,item,opts,tname,sname,slist){
		var v = item.attr("value");
		var t = item.html();
		var newitem = $('<div class="listbox-item"></div>').appendTo(tlist);
		newitem.attr('value', v);
		if (opts.formatter){
			newitem.html(t);
		} else {
			newitem.html(t);
		}
		newitem.hover(
				function(){$(this).addClass('listbox-item-hover');},
				function(){$(this).removeClass('listbox-item-hover');}
			).click(function(){
				var citem = $(this);
				var oitem = $.data(target, 'listbox')[tname];
				if (oitem != null){
					oitem.removeClass('listbox-item-selected');
				}
				citem.addClass('listbox-item-selected');
				$.data(target, 'listbox')[tname] = citem;
			});
		item.remove();
		$.data(target, 'listbox')[sname] = null;
	}
	
	function loadLeftData(target, data, remainText){
		var opts = $.data(target, 'listbox').options;	
		var listbox = $.data(target, 'listbox').listbox.leftlist;	
		var rightdata = $.data(target, 'listbox').rightdata;
		var dat = [];
		listbox.empty();	// clear old data
		for(var i=0; data && i<data.length; i++){
			var v = data[i][opts.valueField];
			if (!isInright(rightdata,v,opts.valueField)){
				var s = data[i][opts.textField];
				var item = $('<div class="listbox-item"></div>').appendTo(listbox);
				item.attr('value', v);
				if (opts.formatter){
					item.html(opts.formatter.call(target, data[i]));
				} else {
					item.html(s);
				}
				dat.push(data[i]);
			}
			
		}					
		$.data(target, 'listbox').leftdata = dat;
		opts.onLoadSuccess.call(target, data);

		$('.listbox-item', listbox).hover(
				function(){$(this).addClass('listbox-item-hover');},
				function(){$(this).removeClass('listbox-item-hover');}
			).click(function(){
				var item = $(this);
				var oitem = $.data(target, 'listbox')['lselected'];
				if (oitem != null){
					oitem.removeClass('listbox-item-selected');
				}
				item.addClass('listbox-item-selected');
				$.data(target, 'listbox')['lselected'] = item;
			});
	}
	
	function isInright(rightdata,v,vf){
		for(var i=0; rightdata && i<rightdata.length; i++){
			var vr = rightdata[i][vf];
			if (vr == v){
				return true;
			}
		}
		return false;
	}
	
	function initCtrl(el,options){
		var table = $('<table style="width:' + (2* options.width+52) +'px;height:100%"></table>').appendTo(el);
		$('<tr  style="width:100%"><td class="listbox-td-title">'+ options.leftds.title + '</td><td></td><td  class="listbox-td-title">'+ options.rightds.title + '</td></tr>').appendTo(table);
		var tr = $('<tr  style="width:100%;height:100%"></tr>').appendTo(table);
		var lefttd =  $('<td></td>').appendTo(tr);
		 var left = $('<div class=\"listbox-panel\" style="width:' + options.width + 'px;height:' + options.height + 'px"></div>').appendTo(lefttd);
		var midtd =  $('<td style=" align:center"></td>').appendTo(tr);
		var ira = $('<input type="button" value="&gt;&gt;" id="btnRightAll'+  options.id +  '" style="width: 50px;" />').appendTo(midtd);
		 $('<br />').appendTo(midtd);
		 var ir = $('<input type="button" value="&gt;" id="btnRight'+  options.id +  '" style="width: 50px;" />').appendTo(midtd);
		 $('<br />').appendTo(midtd);
		 var il = $('<input type="button" value="&lt;" id="btnLeft'+  options.id +  '" style="width: 50px;" />').appendTo(midtd);
		 $('<br />').appendTo(midtd);
		 var ila = $('<input type="button" value="&lt;&lt;" id="btnLeftAll'+  options.id +  '" style="width: 50px;" />').appendTo(midtd);
		 var righttd =  $('<td></td>').appendTo(tr);
		 var right = $('<div class=\"listbox-panel\" style="width:' + options.width + 'px;height:' + options.height + 'px"></div>').appendTo(righttd);
		 ira.click(function () {
			 toMoveAll(el,options,left,right,'lselected','rselected');
         });
		 ir.click(function () {
			 toMove(el,options,right,'lselected','rselected',left);
         });
		 il.click(function () {
			 toMove(el,options,left,'rselected','lselected',right);
         });
		 ila.click(function () {
			 toMoveAll(el,options,right,left,'rselected','lselected');
         });
		 if (options.disabled){
			 ila.attr('disabled',true); 
			 il.attr('disabled',true); 
			 ir.attr('disabled',true); 
			 ira.attr('disabled',true); 
		 }
		return {leftlist:left,rightlist:right,btnlefta:ila,btnleft:il,btnright:ir,btnrighta:ira};
	}
	
	function toMoveAll(target,options,slist,tlist,sname,tname){
		var items = slist.find('div.listbox-item');
		for(var i=0;i<items.length;i++){
			addItem(target,tlist,$(items[i]),options,tname,sname,slist);
		}
	}
	
	function disable(target,disabled){
		var listbox = $.data(target, 'listbox').listbox
		if (disabled){
			btnlefta.attr('disabled',true); 
			btnleft.attr('disabled',true); 
			btnright.attr('disabled',true); 
			btnrighta.attr('disabled',true); 
		}
		else{
			btnlefta.attr('disabled',false); 
			btnleft.attr('disabled',false); 
			btnright.attr('disabled',false); 
			btnrighta.attr('disabled',false); 
		}
	}

	function toMove(target,options,list,sname,tname,slist){
		var item = $.data(target, 'listbox')[sname];
		if (item == null){
			alert($.fn.listbox.defaults.messages.selectrecord);
			return;
		}
		addItem(target,list,item,options,tname,sname,slist);
	}
	
	function rightRequest(target, url, param, remainText){
		var opts = $.data(target, 'listbox').options;
		if (url){
			opts.url = url;
		}
		
		param = param || {};
		
		if (opts.onBeforeLoad.call(target, param) == false) return;

		opts.loader.call(target, param, function(data){
			loadRightData(target, data, remainText);
			leftRequest(target,opts.leftds.url,opts.leftds.baseParams);
		}, function(){
			opts.onLoadError.apply(this, arguments);
		});
	}
	
	function leftRequest(target, url, param, remainText){
		var opts = $.data(target, 'listbox').options;
		if (url){
			opts.url = url;
		}
		
		param = param || {};
		
		if (opts.onBeforeLoad.call(target, param) == false) return;

		opts.loader.call(target, param, function(data){
			loadLeftData(target, data, remainText);
		}, function(){
			opts.onLoadError.apply(this, arguments);
		});
	}
	
	function getData(target){
		var list = $.data(target, 'listbox').listbox.rightlist;
		var items = list.find('div.listbox-item');
		var v = "";
		for(var i=0;i<items.length;i++){
			v = v + "," + $(items[i]).attr("value");
		}
		if (v.length > 0){
			v = v.substring(1, v.length);
		}
		return v;
	}
	
	$.fn.listbox = function(options, param){
		if(typeof options=="string"){
			return $.fn.listbox.methods[options](this,param);
		}
		options=options||{};
		return this.each(function(){
			var data=$.data(this,"listbox");
			if(data){
				$.extend(data.options,options);
			}else{
				var r=initCtrl(this,options);				
				data=$.data(this,"listbox",{options:$.extend({},$.fn.listbox.defaults,$.fn.listbox.parseOptions(this),options),listbox:r,previousValue:null});	
				
				var t = $.data(this,"listbox");
			}
			rightRequest(this,options.rightds.url,options.rightds.baseParams);
			if (data.options.rendered){
				data.options.rendered(this,data.options);
			}
		});
		
	};	
	
	$.fn.listbox.methods = {
		options: function(jq){
			return $.data(jq[0], 'listbox').options;
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
		disable: function(jq, value){
			return jq.each(function(){
				disable(this, value);
			});
		},
		clear: function(jq){
			return jq.each(function(){
				$(this).listbox('clear');
				var panel = $(this).listbox('panel');
				panel.find('div.listbox-item-selected').removeClass('listbox-item-selected');
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
		},
		select: function(jq, value){
			return jq.each(function(){
				select(this, value);
			});
		},
		unselect: function(jq, value){
			return jq.each(function(){
				unselect(this, value);
			});
		}
	};
	
	$.fn.listbox.parseOptions = function(target){
		var t = $(target);
		return $.extend({}, $.parser.parseOptions(target,[
			'valueField','textField','mode','method','url'
		]));
	};
	
	$.fn.listbox.defaults = $.extend({}, {
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
			var opts = $(this).listbox('options');
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
			var opts = $(this).listbox('options');
			$.extend(param,{sid:SCFUtils.SESSION_ID});
			if (!opts.url) return false;
			$.ajax({
				type: opts.method,
				url: opts.url,
				data: param,
				dataType: 'json',
				success: function(data){					
					success(data.rows);
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
