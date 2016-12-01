
//function pageOnInt(){
//	createDom();//创建DOM
//	initFullPage();//初始化fullpage
//}

$(function() {
	layer.config({
		extend: 'extend/layer.ext.js' //注意，目录是相对layer.js根目录。如果加载多个，则 [a.js, b.js, …]
		//shift: 1, //默认动画风格
		//skin: 'layui-layer-molv' //默认皮肤
	});
	
	/*if(/MSIE ([678])/.test( navigator.userAgent)){//IE 678
		SCFUtils.loadJs('js/plugin/jquery/IE9.js',function(){			
		});		
	}*/
	resize();//调整页面高度	
	createDom();//创建DOM
	initFullPage();//初始化fullpage
});

function resize(){
	if(/MSIE ([678])/.test( navigator.userAgent)){		
		$('#iframepage',parent.document).height(540);
	}else{
		$('#iframepage',parent.document).height($(window,parent.document)[0].outerHeight-200);
	}
	$('#centerDiv',parent.document).css({
		'width':'100%',
		'padding-bottom':'0px'
	});
}


function createDom(){
	var fullpage = $('#fullpage');
	createPage(fullpage);	
}

function createPage(jq){
	var data = queryProduct();
	$.each(data, function(i, n) {
		var content = createContent("content"+i);
		var section = createSection("section"+i);
		content.css("background-image","url("+n.pictureUrl+")").appendTo(section.appendTo(jq));
		$('<h1><a id ="'+n.sysRefNo+'" onclick="clickText(this)">'+n.pictureText+'</a></h1><p>集团</p>').appendTo($('#content'+i));	
	});
}

function clickText(obj){
	$('#sysRefNo').val(obj.id);
	nextBtnClick();
}

function nextBtnClick(){
	var data = {'sysRefNo':$('#sysRefNo').val()};
	var options = {
			url : SCFUtils.SUBMITURL,
			data : $.extend({
				reqPageType : 'next',
				reqLoginType : "noLogin"
			}, data),
			async : true,
			callBackFun : function(data) {
				SCFUtils.requestUrl(data, "noLogin");
			}
		};
		SCFUtils.ajax(options);
}

function createSection(id,content){
	return $('<div class="section "></div>').attr('id',id).append(content);	
}

function createContent(id){
	return $('<div class="content "></div>').attr('id',id);
}

function initFullPage(){
	$('#fullpage').fullpage({
		anchors: ['firstPage', 'secondPage', '3rdPage', '4thpage', 'lastPage'],
		menu: '#menu',
		navigation:true,//加导航
		continuousVertical:false,//循环滚动
		css3:true
	});
//	自动滚动
	setInterval(function(){
		$.fn.fullpage.moveSectionDown();
	},3000);
}

function queryProduct() {
	var products = null;
	var opt = {
		url : SCFUtils.AJAXURL,
		data : {
			reqLoginType : "noLogin",
			queryId : 'Q_P_000116',
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				products = data.rows;
			}
		}
	};
	SCFUtils.ajax(opt);
	return products;
}
