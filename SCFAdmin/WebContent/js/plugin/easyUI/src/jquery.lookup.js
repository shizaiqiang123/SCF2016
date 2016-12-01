/**
 * jQuery EasyUI 1.3.1
 * 
 * Licensed under the GPL terms
 * To use it on other terms please contact us
 *
 * Copyright(c) 2009-2012 stworthy [ stworthy@gmail.com ] 
 * 
 */
(function($){
	function initControl(el,options){
		$(el).empty();
		var bo=$("<span class=\"lookup\">"
				+"<span class=\"lookup-btn\">"
				+"<span class=\"lookup-btn-look\"></span>"
				+"<span class=\"lookup-btn-clear\"></span>"+"</span>"+"</span>").insertAfter(el);
		$(el).addClass("lookup-text").prependTo(bo);
		$(el).addClass("lin-textbox");
//		$(el).addClass("l-textbox");
		return bo;
	};
	
	function resize(target,width){//_5,_6
		var opts=$.data(target,"lookup").options; //_7
		var lookup=$.data(target,"lookup").lookup; //_8
		if(width){
			target.width=width;
		}
		var box=$("<div style=\"display:none\"></div>").insertBefore(lookup); //_9
		lookup.appendTo("body");
		if(isNaN(opts.width)){
			opts.width=$(target).outerWidth()+2;
		}
		var arrow=lookup.find(".lookup-btn");
		lookup._outerWidth(opts.width + 2)._outerHeight(opts.height);
		$(target)._outerWidth(lookup.width()-arrow.outerWidth());
//		$(target).css({height:lookup.height()+"px",lineHeight:lookup.height()+"px"});
		arrow._outerHeight(lookup.height());
		arrow.find("span")._outerHeight(arrow.height()/2);
		lookup.insertAfter(box);
		box.remove();
//		lookup._outerWidth(opts.width);
//		var textbox=$(target);
//		var arrow = lookup.find(".lookup-btn");
//		SCFUtils.log(arrow._outerWidth());
//		var aw= arrow._outerWidth();
//		lookup._outerWidth(opts.width)._outerHeight(opts.height);
//		SCFUtils.log(lookup.width());
//		textbox._outerWidth(lookup.width()-aw);
//		textbox.css({height:lookup.height()+"px",lineHeight:lookup.height()+"px"});
//		arrow._outerHeight(lookup.height());
////		$(target)._outerWidth(lookup.width()-lookup.find(".lookup-btn").outerWidth());
//		lookup.insertAfter(box);
//		box.remove();
	};
	
	function openDialog(target,opts){
		var winid = '#' + opts.dialog.dialogid;
		var lookup=$.data(target,"lookup").lookup;		
		$(opts.divid).append('<div id="' + opts.dialog.dialogid + '"></div>');
		var cont = "<div  data-options=\"fit:true,border:false\" class=\"easyui-layout\">"+
					"<div data-options=\"region:'center',border:false\">"+
					"<table id=\"" + opts.dialog.gridid + "\" ></table>" +
					"</div></div>";
		var gridid = "#" + opts.dialog.gridid;
		var divok = $("<div class=\"subdiv_allinlineleft\"></div>");
		var aok = $("<a>确定</a>").appendTo(divok);
		aok.stylebutton({text: '',
			iconCls: null,
			//org:橙色，gry:灰色
			style:'org',
			//bloder,blod,normal
			weight:'normal'});
//		SCFUtils.log(opts.grid.baseParams);
		$(winid).dialog({  
		    title: opts.dialog.title,  
		    width: (opts.dialog.width)?opts.dialog.width:500,  
		    height: (opts.dialog.height)?opts.dialog.height:300,  
		    closed: false,  
		    cache: false,  
		    closable:false,
		    content: cont,
		    onOpen:function(){
		    	$(gridid).datagrid({
					url : opts.grid.url,
					fit : true,
					fitColumns : true,
					nowrap : true,
					pagination : true,
					rownumbers : true,
					striped : true,
					search:true,
					queryParams : opts.grid.baseParams,
					toolbar: [],
					pageSize : SCFUtils.DEFAULTPAGESIZE,
					onDblClickRow : function(rowIndex, rowData){
						clickOkHandler(target,winid,lookup,opts);
					},
					baseParams : opts.grid.baseParams,
					singleSelect : true,
					columns : [ opts.grid.columns  ]
				});
		    },
		    modal: true,
		    buttons: [{
				text:opts.dialogok ,
				weight:'thin',
				handler:function(btn){
					clickOkHandler(target,winid,lookup,opts,btn);
				}			
			},{
				text:opts.dialogcancel,
				style:'gry',
				weight:'thin',
				handler:function(){$(winid).window('destroy');}
			}
			]
		});  
	};
	
	function getText(row,opts){
		var data = row;
		if (row.data){
			data = row.data;
		}
		var ff = opts.lookparam.textField.split('+');
		var txt = "";
		if (ff && ff !== null){
			for(var i=0;i<ff.length;i++){
				txt = txt + data[ff[i]] + " ";
			}
		}
		return txt;
	};
	
	function clickOkHandler(target,winid,lookup,opts,btn){
		var gridid = "#" + opts.dialog.gridid;
		var row=$(gridid).datagrid('getSelected');
		if(!row){
			SCFUtils.mustSelectRecord();
			if(!SCFUtils.isEmpty(btn)){
				$(btn).stylebutton('enable');
			}
		    return ;
		}
		setValueInner(lookup,opts,row[opts.lookparam.valueField]);
		var txt = getText(row,opts);
		$(target).val(txt);
		if(opts.dialog.onDialogSelected){
			opts.dialog.onDialogSelected(row);
		}
		initAddin(target,row,opts);
		if(!SCFUtils.isEmpty(btn)){
			$(btn).stylebutton('enable');
		}
		$(target).validatebox("validate");
		$(winid).window('destroy');
		if (opts.onGetValue){
			opts.onGetValue(row);
		}
	};
	
	function setValueInner(lookup,option,value){
		lookup.find("input.lk-value").remove();
		var hidden=$("<input type=\"hidden\" class=\"lk-value\">").appendTo(lookup);		
		if(option.hname){
			hidden.attr("name",option.hname);
		}
		hidden.val(value); 
	}
	
	function enableBtn(target){
		var option=$.data(target,"lookup").options;
		var lookup=$.data(target,"lookup").lookup;
		lookup.find(".lookup-btn-look,.lookup-btn-clear").unbind(".lookup");
		if(!option.disabled){
			lookup.find(".lookup-btn-look")
				.bind("mouseenter.lookup",function(){
					$(this).addClass("lookup-btn-hover");
				})
				.bind("mouseleave.lookup",function(){
					$(this).removeClass("lookup-btn-hover");
				})
				.bind("click.lookup",function(){	
					openDialog(target,option);
//					lookup.addClass("focusborder");
			});
			lookup.find(".lookup-btn-clear").bind("mouseenter.lookup",function(){
					$(this).addClass("lookup-btn-hover");
				})
				.bind("mouseleave.lookup",function(){
					$(this).removeClass("lookup-btn-hover");
				})
				.bind("click.lookup",function(){	
					clear(target);
//					lookup.removeClass("focusborder");
					$(target).validatebox("validate");
			});
		}
	};
	
	function disabledBox(target,disabled){ //target,disabled
		var option=$.data(target,"lookup").options;
		var lookup=$.data(target,"lookup").lookup;
		if(disabled){
			option.disabled=true;
			lookup.addClass("l-textbox-readonly");
			$(target).addClass("lin-textbox-readonly");
		}else{
			option.disabled=false;
			lookup.removeClass("l-textbox-readonly");
			$(target).removeClass("lin-textbox-readonly");
		}
	};
	
	function getValue(target){
		var lookup=$.data(target,"lookup").lookup;
		var v = lookup.find("input.lk-value").val();
		return v;
	};
	
	function setValue(target,value){
		var option=$.data(target,"lookup").options;
		var lookup=$.data(target,"lookup").lookup;
		lookup.find("input.lk-value").remove();
		var hidden=$("<input type=\"hidden\" class=\"lk-value\">").appendTo(lookup);		
		if(option.hname){
			hidden.attr("name",option.hname);
		}
		hidden.val(value);
		if (value == undefined || value === null || value == ""){
			$(target).val("");
			$(target).validatebox("validate");
			return;
		}
		var param = $.extend({pk:value,sid:SCFUtils.SESSION_ID},option.lookparam );
		$.ajax({
			type: 'POST',
			url: option.lookurl,
			data: param,
			dataType: 'json',
			success: function(resp){
				if (resp){
					var txt = getText(resp,option);
					$(target).val(txt);
					initAddin(target,resp,option);
					if (option.onSetValue){
						option.onSetValue(resp);
					}
				}
				else{
					$(target).val(value);
				}
				$(target).validatebox("validate");
			},
			error: function(){
				$(target).val(value);
				$(target).validatebox("validate");
			}
		});
		
	};
	
	function getAttr(target,attrname){
		return $(target).attr(attrname);
	}
	
	function initAddin(target,row,opts){
		if (opts.lookparam.addinFields){
			var ff = opts.lookparam.addinFields.split('+');
			if (ff && ff !== null){
				for(var i=0;i<ff.length;i++){
					$(target).removeAttr(ff[i]);
					$(target).attr(ff[i],row[ff[i]]);
				}
			}
		}
	};
	
	function clear(target){
		var lookup=$.data(target,"lookup").lookup;
		var opts=$.data(target,"lookup").options;
		var hidden = lookup.find("input.lk-value");
		if (hidden){
			hidden.val("");
		}
		$(target).val("");
		if (opts.onClear){
			opts.onClear(opts);
		}
	};
	

	function setRequired(target,required){
		$(target).validatebox('options').required = required;
		$(target).validatebox('validate');
	};
	
	$.fn.lookup=function(options,param){
		if(typeof options=="string"){
			var method=$.fn.lookup.methods[options];
			if(method){
				return method(this,param);
			}else{
				var op = $.extend({},options,{deltaX:20});
				return this.validatebox(op,param);
			}
		}
		options=options||{};
		return this.each(function(){
			var data=$.data(this,"lookup");
			if(data){
				$.extend(data.options,options);
			}else{
				data=$.data(this,"lookup",
						{options:$.extend({},
								$.fn.lookup.defaults,
								$.fn.lookup.parseOptions(this),options),
								lookup:initControl(this)});
				$(this).removeAttr("disabled");
			}
			$(this).attr("readonly",true);
			disabledBox(this,data.options.disabled);
			$(this).attr("lookupname",data.options.hname);
			resize(this);
			$(this).validatebox($.extend(data.options,{deltaX:20}));
			enableBtn(this);
			if (options.rendered){
				options.rendered(this,options);
			}
		});	
	};
	$.fn.lookup.methods={
		options:function(jq){
			var _16=$.data(jq[0],"lookup").options;
			return $.extend(_16,{value:jq.val()});
		},
		destroy:function(jq){
			return jq.each(function(){
				var box=$.data(this,"lookup").lookup;
				$(this).validatebox("destroy");
				box.remove();
			});
		},
		resize:function(jq,width){
			return jq.each(function(){
				resize(this,width);
			});
		},
		enable:function(jq){
			return jq.each(function(){
				disabledBox(this,false);
				enableBtn(this);
			});
		},
		getAttr:function(jq,attrname){
			return getAttr(jq[0],attrname);
		},
		disable:function(jq){
			return jq.each(function(){
				disabledBox(this,true);
				enableBtn(this);
			});
		},
		getValue:function(jq){
			return getValue(jq[0]);
		},
		setRequire:function(jq,width){
			return jq.each(function(){
				setRequired(this,width);
			});
		},
		setValue:function(jq,value){
			return jq.each(function(){
				setValue(this,value);
			});
		},
		clear:function(jq){
			return jq.each(function(){
				clear(this);
			});
		}
	};
	$.fn.lookup.parseOptions=function(target){
		var t=$(target);
		return $.extend({},
			$.fn.validatebox.parseOptions(target),
			$.parser.parseOptions(target,["width","lookurl","hname","listquery","dialogurl"]),
			{value:(t.val()||undefined),
			disabled:(t.attr("disabled")?true:undefined)}
		);
	};
	$.fn.lookup.defaults=$.extend({},
			$.fn.validatebox.defaults,
			{
				width:"auto",
				value:"",
				min:null,
				max:null,
				increment:1,
				editable:true,
				disabled:false,
				dialogok:'OK',
				dialogcancel:'Cancel',
				rendered:function(target,opts){},
				onDialogSelected:function(row){},
				onSetValue:function(row){},
				onGetValue:function(row){}
	});
})(jQuery);

