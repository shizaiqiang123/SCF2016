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
	function createElement(target, data, remainText){
		var opts = $.data(target, 'filelist').options;	
		var filelist = $.data(target, 'filelist').filelist.filelist;	
		filelist.empty();	// clear old data	
		for(var i=0; data && i<data.length; i++){
			var itemli = $('<li class="filelist-item"></li>').appendTo(filelist);
			var path = data[i][opts.pathField];
			var id =  data[i][opts.pkField];
			var al = $('<a href="javascript:void(0);" apath="' + path +'">' +'</a>').appendTo(itemli);
			$(al).addClass('style-filelist');
			$(al).bind("click.a",function(){
				var t = $(this).attr("apath");
				download(target, t);
		    });
			var txtcssname = 'style-filelist-text';
			var iconcss = 'img';
			if (data[i][opts.iconField].toLowerCase() == "xls" || data[i][opts.iconField].toLowerCase() == "xlsx"){
				iconcss = 'xls';
			}
			else if (data[i][opts.iconField].toLowerCase() == "doc" || data[i][opts.iconField].toLowerCase() == "docx"){
				iconcss = 'doc';
			}
			else if (data[i][opts.iconField].toLowerCase() == "pdf" ){
				iconcss = 'pdf';
			}
			else if (data[i][opts.iconField].toLowerCase() == "html" ){
				iconcss = 'html';
			}
			else if (data[i][opts.iconField].toLowerCase() == "txt" ){
				iconcss = 'txt';
			}
			$(al).html('').wrapInner(
					'<div class="style-filelist-image">'+
					'<div style="width:100%;height:48px;text-align:left;" class="'+ 'l-icon-filelist-' + iconcss  +'">'+
					'<div class="style-filelist-delete" sid="' + id +'" style="display:none;"></div></div><div class="' + txtcssname + '">' +  data[i][opts.textField] +
					'</div></div>'
			);
			$(al).bind("mouseenter.a",function(){
				if (!opts.disabled){
					$(this).find(".style-filelist-delete").show();
				}
			})
			.bind("mouseleave.a",function(){
				$(this).find(".style-filelist-delete").hide();
			});
			$(al).find(".style-filelist-delete").bind("click.div",function(e){
				var t = $(this).attr("sid");
				SCFUtils.confirm($.fn.filelist.defaults.messages.deleteconfirm,function(){deleteItem(target,opts,t);});
				
				e.stopPropagation();
			});
		}				
		opts.onLoadSuccess.call(target, data);

		creatNewItem(target,filelist,opts);	
	}
	
	function deleteItem(target,opts,id){
		SCFUtils.ajax({
			data:
			{
				sid:SCFUtils.SESSION_ID,
				attachment_id : id,
				optstatus : 'DEL',
				syslogicid : opts.deletelogicid
			},
			successCallback : function(json){
				fileListRequest(target,opts);
		    }
		});
		
	}
	  
	
	function showClosebutton(target, al,path){
		$(al).find(".style-filelist-delete").show();
	}
	
	function download(target,path) {
		var opts = $.data(target, 'filelist').options;	
		if(path == "") {
			SCFUtils.alert($.fn.filelist.defaults.messages.fileisnull);
			return false;
		} else {
			$("#downloadPath").val(path);
			var formData = {};
			$.extend(formData, {
				file_path : path,
				sid:SCFUtils.SESSION_ID
			});
			if (SCFUtils.isEmpty(opts.downloadurl)){
				window.open(SCFUtils.ROOTURL + '/downloadFile?sid=' + SCFUtils.SESSION_ID +'&file_path=' + path);
			}
			else{
				if (opts.downloadurl.indexOf("?") >= 0){
					window.open(opts.downloadurl + '&sid=' + SCFUtils.SESSION_ID +'&file_path=' + path);
				}
				else{
					window.open(opts.downloadurl + '?sid=' + SCFUtils.SESSION_ID +'&file_path=' + path);
				}
			}
		}
	}
	
	function creatNewItem(target,filelist,opts){
		if (!opts.disabled){
			var itemli = $('<li class="filelist-item"></li>').appendTo(filelist);
			var al = $('<a href="javascript:void(0);">'+'</a>').appendTo(itemli);
			$(al).addClass('style-filelist-add');
			$(al).bind("click.a",function(){	
				openDialog(target, opts);
		    });
			var txtcssname = 'style-filelist-text';
			$(al).html('').wrapInner(
					'<div class="style-filelist-image">'+
					'<div style="width:100%;height:48px;" class="'+ 'l-icon-filelist-add' +'">'+
					'</div><div class="' + txtcssname + '">' +$.fn.filelist.defaults.messages.add +
					'</div></div>'
			);
		}
	}
	
	function openDialog(target, options){
		$("body").append('<div id="uploadformDialog"></div>');
		SCFUtils.openDialog("#uploadformDialog",{
			url:'pages/param/set/businessmodel/uploadDialog.html',
			title:$.fn.filelist.defaults.messages.dialogtitle,
			height:options.dialog.height?options.dialog.height:400,
			width:options.dialog.width?options.dialog.width:500,
			buttons:[{
				text:$.fn.filelist.defaults.messages.dialogok,
				weight:'thin',
				handler:function (btn){
					var fileName = $('#dialogupload_file').val();
					var filedesc = $("#dialoguploadfiledesc").val();
					var btnn = $(btn);
					if(SCFUtils.isEmpty(fileName)){
						SCFUtils.alert($.fn.filelist.defaults.messages.mustinputfile);
						if(!SCFUtils.isEmpty(btnn)){
							btnn.stylebutton('enable');
				    	}
						return false;
					}
					if(SCFUtils.isEmpty(filedesc)){
						SCFUtils.alert($.fn.filelist.defaults.messages.mustinputdesc);
						if(!SCFUtils.isEmpty(btnn)){
							btnn.stylebutton('enable');
				    	}
						return false;
					}
					var formData = options.dialog.beforeUploadFile ? options.dialog.beforeUploadFile():{};
					formData = $.extend(formData,{
						attachment_desc : filedesc,
						filename : fileName
					});
					newItemUploadFile(formData,target,options,btn);
				}
			},
			{
				text:$.fn.filelist.defaults.messages.dialogcancel,
				weight:'thin',
				style:'gry',
				handler:function (){
					SCFUtils.closeWin('#uploadformDialog');
				}
			}]
		});
	}
	
	function newItemUploadFile(formData,target,options,btn) {
		var formData = $.extend(formData,{sid:SCFUtils.SESSION_ID});
		$.ajaxFileUpload({
			url : '/FCSP/fileUpload',
			secureuri : false,
			fileElementId : 'dialogupload_file',
			dataType : 'json',
			data:formData,
			success : function(data) {
				if(data.success){
					SCFUtils.closeWin('#uploadformDialog');
					fileListRequest(target,options);
					btn.stylebutton('enable');
				} else {
					SCFUtils.alert($.fn.filelist.defaults.messages.failtupload,function(){
						btn.stylebutton('enable');
					});
					SCFUtils.closeWin('#uploadformDialog');
				}
			},
			error : function(){
			   SCFUtils.alert($.fn.filelist.defaults.messages.failtnetwork,function(){
					btn.stylebutton('enable');
			   });
			}
		});
	}
	
	function initCtrl(el,options){
		
		return {filelist:$(el)};
	}
	

	
	function fileListRequest(target, options){
		var opts = $.data(target, 'filelist').options;
			
		
//		if (opts.onBeforeLoad.call(target, opts) == false) return;

		opts.loader.call(target, opts.baseParam, function(data){
			createElement(target, data);
		}, function(){
			opts.onLoadError.apply(this, arguments);
		});
	}
	
	
	$.fn.filelist = function(options, param){
		if(typeof options=="string"){
			return $.fn.filelist.methods[options](this,param);
		}
		options=options||{};
		return this.each(function(){
			var data=$.data(this,"filelist");
			if(data){
				$.extend(data.options,options);
			}else{
				var r=initCtrl(this,options);				
				data=$.data(this,"filelist",{options:$.extend({},$.fn.filelist.defaults,$.fn.filelist.parseOptions(this),options),filelist:r,previousValue:null});	
				
				var t = $.data(this,"filelist");
			}
			fileListRequest(this,options);
			if (data.options.rendered){
				data.options.rendered(this,data.options);
			}
		});
		
	};	
	
	$.fn.filelist.methods = {
		options: function(jq){
			return $.data(jq[0], 'filelist').options;
		},
		getData: function(jq){
			return getData(jq[0]);
		}
	};
	
	$.fn.filelist.parseOptions = function(target){
		var t = $(target);
		return $.extend({}, $.parser.parseOptions(target,[
			'listurl','iconfield','textfield','downloadurl','pathfield','disabled'
		]));
	};
	
	$.fn.filelist.defaults = $.extend({}, {
		iconField: 'value',
		textField: 'text',
		pathField: 'text',
		mode: 'remote',	// or 'remote'
		method: 'post',
		listurl: null,
		downloadurl: null,
		data: null,		
		messages:{
			failtupload:"to upload file failt",
			failtnetwork:'network error',
			dialogtitle:'upload file form',
			dialogok:'Ok',
			dialogcancel:'Cancel',
			mustinputfile:'must select file',
			mustinputdesc:'must input description',
			add:'add',
			fileisnull:'the file is not existed!',
			deleteconfirm:'confirm delete'
		},
		loader: function(param, success, error){
			var opts = $(this).filelist('options');
			$.extend(param,{sid:SCFUtils.SESSION_ID});
			if (!opts.listurl) return false;
			$.ajax({
				type: opts.method,
				url: opts.listurl,
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
		
		onBeforeLoad: function(param){return true;},
		onLoadSuccess: function(){},
		onLoadError: function(){},
		onSelect: function(record){},
		onUnselect: function(record){}
	});
	
	
	
})(jQuery);
