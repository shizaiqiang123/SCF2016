(function($){	
	function initCtrl(es,options){
		var nodeNames = options.nodeNames;
		var currentStatus = options.currentStatus;
		
		var el = $(es);
		var size = nodeNames.length;
		var left= -1* ((2*size - 2)*80)/2;
		el.css("left",left);
		var text_top_px = -10;
		
		if (navigator.userAgent.search('MSIE 7.0')>0) {
			text_top_px = 0;
		}
		if (navigator.userAgent.search('MSIE 6.0')>0) {
			text_top_px = 0;
		}

		for(var j = 0; j < size; j++){
			var i=j+1;
			var nodeName = nodeNames[j];
			//进度文字描述
			var underCircleContent = $('<div class="schedule_style_underCircle" style = "left:' + ((options.startPointX + 3) + (i-1)*116) + 'px; top:' + (options.startPointY + 26)+ 'px;"><div><p style="text-align:center;"><span class="schedule_style_underContent">'+
					(nodeName ) + '</span></p></div></div>').appendTo(el);
			//0 已完成状态
			if (i < currentStatus) {
				if (i != 1) {
					//节点前段进度条
				
				    var middleDirect1 = $('<div class="schedule_style_direct" style = "left:' + ((options.startPointX - 6) + (i-1)*116) + 'px; top:' + options.startPointY + 'px;"><div class="schedule_style_directing detectCanvas" style = "left:-3px; top:-3px;"></div></div>').appendTo(el);
				}
				if (i != size) {
					//节点后段进度条
					var middleDirect2 = $('<div class="schedule_style_direct" style = "left:' + ((options.startPointX + 63) + (i-1)*116) + 'px; top:' + options.startPointY + 'px;"><div class="schedule_style_directing detectCanvas" style = "left:-3px; top:-3px;"></div></div>').appendTo(el);
				}
				
				//节点
				var middleCircle = $('<div class="schedule_style_Circle" style = "left:' + ((options.startPointX + 43) + (i-1)*116) + 'px; top:' + (options.startPointY - 8)+ 'px;"><div class="schedule_style_backgroundImgCircle" style = "left:-3px; top:-3px;"></div>'+
						'<div class="schedule_style_circleContent" style = "left:2px; top:' + text_top_px + 'px;"><div>'+
						'<p style="text-align:center;"><span id="firstContentCondition" class="schedule_style_inCircle">√</span></p>'+
						'</div></div></div>').appendTo(el);
				//节点的下三角指向（正在进行状态时显示）
				var processingDirecting = $('<div class="schedule_style_processingDirecting_disappear" style = "left:' + ((options.startPointX + 50) + (i-1)*116) + 'px; top:' + (options.startPointY + 12)+ 'px;"><div class="schedule_style_processingDirectingImg_disappear detectCanvas" style = "left:-3px; top:-3px;"></div></div>').appendTo(el);
				
			//1 正在进行状态 
			}else if(i == currentStatus){
				
				if (i != 1) {
					
					var middleDirect1 = $('<div class="schedule_style_direct" style = "left:' + ((options.startPointX - 6) + (i-1)*116) + 'px; top:' + options.startPointY + 'px;"><div class="schedule_style_directing detectCanvas" style = "left:-3px; top:-3px;"></div> </div>').appendTo(el);
				}
				if (i != size) {
					var middleDirect2 = $('<div class="schedule_style_direct" style = "left:' + ((options.startPointX + 63) + (i-1)*116) + 'px; top:' + options.startPointY + 'px;"><div class="schedule_style_directing detectCanvas" style = "left:-3px; top:-3px;"></div></div>').appendTo(el);
				}
				
				var middleCircle = $('<div class="schedule_style_Circle" style = "left:' + ((options.startPointX + 43) + (i-1)*116) + 'px; top:' + (options.startPointY - 8)+ 'px;"><div class="schedule_style_backgroundImgCircle" style = "left:-3px; top:-3px;"></div>'+
						'<div class="schedule_style_circleContent" style = "left:2px; top:' + text_top_px + 'px;"><div>'+
						'<p style="text-align:center;"><span id="firstContentCondition" class="schedule_style_inCircle">' + i + '</span></p>'+
						'</div></div></div>').appendTo(el);
					
				var processingDirecting = $('<div class="schedule_style_processingDirecting" style = "left:' + ((options.startPointX + 50) + (i-1)*116) + 'px; top:' + (options.startPointY + 12)+ 'px;"><div class="schedule_style_processingDirectingImg detectCanvas" style = "left:-3px; top:-3px;"></div></div>').appendTo(el);
				
			//2 待完成状态
			}else  {
				if (i != 1) {
					var middleDirect1 = $('<div class="schedule_style_direct" style = "left:' + ((options.startPointX - 6) + (i-1)*116) + 'px; top:' + options.startPointY + 'px;"><div class="schedule_style_directing_black detectCanvas" style = "left:-3px; top:-3px;"></div></div>').appendTo(el);
				}
				if (i != size) {
					var middleDirect2 = $('<div class="schedule_style_direct" style = "left:' + ((options.startPointX + 63) + (i-1)*116) + 'px; top:' + options.startPointY + 'px;"><div class="schedule_style_directing_black detectCanvas" style = "left:-3px; top:-3px;"></div></div>').appendTo(el);
				}
				var middleCircle = $('<div class="schedule_style_Circle" style = "left:' + ((options.startPointX + 43) + (i-1)*116) + 'px; top:' + (options.startPointY - 8)+ 'px;"><div class="schedule_style_backgroundImgCircle_black" style = "left:-3px; top:-3px;"></div>'+
						'<div class="schedule_style_circleContent" style = "left:2px; top:' + text_top_px + 'px;"><div>'+
						'<p style="text-align:center;"><span id="firstContentCondition" class="schedule_style_inCircle_black">' + i + '</span></p>'+
						'</div></div></div>').appendTo(el);
				var processingDirecting = $('<div class="schedule_style_processingDirecting_disappear" style = "left:' + ((options.startPointX + 50) + (i-1)*116) + 'px; top:' + (options.startPointY + 12)+ 'px;"><div class="schedule_style_processingDirectingImg_disappear detectCanvas" style = "left:-3px; top:-3px;"></div></div>').appendTo(el);
			}
			
		}
		return {};
	}
	
	$.fn.process = function(options, param){
		if(typeof options=="string"){
			return $.fn.process.methods[options](this,param);
		}
		options=options||{};
		
		return this.each(function(){
			var data=$.data(this,"process");
			if(data){
				$.extend(data.options,options);
			}else{
				options = $.extend({}, $.fn.process.defaults, $.fn.process.parseOptions(this), options);
			
				var r=initCtrl(this,options);				
				data=$.data(this,"process",{options: options,process:r,previousValue:null});	
				var t = $.data(this,"process");
			}
		});
		
	};	
	
	$.fn.process.methods = {
		options: function(jq){
			return $.data(jq[0], 'process').options;
		}
	};
	
	$.fn.process.parseOptions = function(target){
		var t = $(target);
		return $.extend({}, $.parser.parseOptions(target,[
			'nodeNames','currentStatus', 'startPointX', 'startPointY'
		]));
	};
	
	$.fn.process.defaults = $.extend({}, {
		nodeNames: ['基本要素选择','录入应收账款','风险限额选择','转让确认','提交等等审核'],
		currentStatus: 3,
		startPointX: 200,
		startPointY: 100
	});
})(jQuery);
