//function ThreadTimes(){
//	window.setInterval("queryAdvice()",10000);
//}
//window.onload=ThreadTimes;
var sdata;
$(function() {
	comFunAdd();
	layer.config({
		extend: 'extend/layer.ext.js' //注意，目录是相对layer.js根目录。如果加载多个，则 [a.js, b.js, …]
		//shift: 1, //默认动画风格
		//skin: 'layui-layer-molv' //默认皮肤
	});
	
	/*if(/MSIE ([678])/.test( navigator.userAgent)){//IE 6789
		SCFUtils.loadJs('js/plugin/jquery/IE9.js',function(){
		});		
	}*/
	
	//加载上一步下一步按钮
	$.showGo();
	initNotices();
	eventAdd();
	// 禁止退格键 作用于Firefox、Opera
	document.onkeypress = banBackSpace;
	// 禁止退格键 作用于IE、Chrome
	document.onkeydown = banBackSpace;
	
	if (!SCFUtils.DEBUG) {
		$(window).bind('beforeunload', function() {
			return "确定退出系统？";
		});
		$.event.add(window, "unload", function() {
			var options = {
				url : SCFUtils.ROOTURL + "/scflogout",
				async : false
			};
			SCFUtils.ajax(options);
		});
	}	
	SCFUtils.goHome();
	//加载通知数量
	var options = {
//			async:true,
			title:'通知查询',
//			reqid:'I_S_000002',
//			data:{cacheType:'non',queryType:'queryCount',queryCon:'onpassageitem'},
			reqid:'I_S_000003',
			data:{cacheType:'non',queryType:'queryCount',byFunc : 'n'},
			onSuccess:loadAdviceItem
		};
	SCFUtils.getData(options);
	blueOnclick();
//	$('#leftMenu').hide();
});

function initNotice(){
var userId=$('#userId').val();
var notice = querylastLoginTime(userId);
return notice;
}

function initNotices(){
	if (typeof initNotice !== "undefined" && $.isFunction(initNotice)) {		
		var blockAreaFooter = $('#blockAreaFooter',parent.document);
		var blockAreaNotice = $('<div class="blockAreaNotices" id="blockAreaNotice" style="overflow:hidden;height:128px"></div>');		
		var noticeTxt = initNotice();
		if(!SCFUtils.isEmpty(noticeTxt)){
			
			$('<div style="float:left"><img src="images/style/menu/admin.png" style="display:block;padding-top: 25px;flaot:left"></div>').appendTo(blockAreaNotice);
			var divw = $('<div style="height:100px;float:left;padding:36px 0px 0px 30px;"></div>').appendTo(blockAreaNotice);
			var huan = $('<div style="margin-top:3px;color:#014295;font-size:14px;font-weight:600"></div>').appendTo(divw);
			huan.html('欢迎进入供应链金融系统');
			var admin = $('<div style="margin-top:15px;color:#014295;font-size:14px;font-weight:600"></div>').appendTo(divw);
			admin.html($('#userInfo').html().trim()+',您好!');
			//$('<p class="blockAreaNoticeTxts" id="blockAreaNoticeTxt"></p>').appendTo(blockAreaNotice);
			var blockAreaNoticeTxt = $('<p class="blockAreaNoticeTxts" style="display:block;padding:32px 0px 0px 30px;float:right;margin-right:6%;" id="blockAreaNoticeTxt"></p>').appendTo(blockAreaNotice);
			blockAreaNoticeTxt.html(noticeTxt);	
			blockAreaFooter.addClass("noticeB");
			blockAreaNotice.prependTo(blockAreaFooter);	
			blockAreaNotice.appendTo($('#blockAreaFooterDiv'));
//			//增加一个关闭按钮，用来关闭友情提示
//			$('<div class="cancelNotice"></div>').appendTo(blockAreaNotice).unbind().bind('click', function() {
//				$('#blockAreaNotice').css("display","none");
//				$('.blockAreaFooterDiv').css("display","none");
//			});
		}
	}
}
//function iFrameHeights() {	
//	var ifm= $("#iframepage",parent.document);
//	var subWeb = ifm[0].contentDocument;   
//	if(ifm != null && subWeb != null && subWeb.body != null ) {
//		ifm[0].height =subWeb.body.scrollHeight;
//	}	
//}


function querylastLoginTime(userId){
	var notice="";
	var option={
			url:SCFUtils.AJAXURL,
			data: {
				queryId:'Q_P_000332',
				userId:userId,
				byFunc : 'n',
				page:'1',
				rows:'2'
			},
			callBackFun:function(data){
				if (data.success && data.rows.length ==2) {
					if(data.rows[1].userLoginTime!=undefined){
						notice="&nbsp;上次的登录时间为"+formatTime(data.rows[1].userLoginTime);
					}else{
						notice="&nbsp;欢迎您首次登录。这里是首页，可以点击各个通知查看相应的信息。"; 
					}
					
				}else{
					notice="欢迎您首次登录。这里是首页，可以点击各个通知查看相应的信息。";
				}
			}
	};
	SCFUtils.ajax(option);
	return notice;
}

function formatTime(date){
	return SCFUtils.dateFormat(date,"yyyy年MM月dd日   HH:mm:ss");
}

function blueOnclick(){
	var userInfo=$("#userInfo");
	userInfo.unbind().bind('click',function(){
//		initMenu();
//		var i={"id":'F_P_000117','path':'我的信息 > 完善我的信息'};
		improper("MENU001148","F_P_000117");
	});	
	$(".userLogo").unbind().bind('click',function(){
//		initMenu();
//		var i={"id":'F_P_000117','path':'我的信息 > 完善我的信息'};
		improper("MENU001148","F_P_000117");
	});	
}
function improper(parentId,id){
	var o="";
	var k="";
	$.each(sdata.rows, function(j, t) {
		if(parentId==t.id){
			o=t;
		}
	});
	$.each(o.children, function(i, h) {
		if(id==h.id){
			k=h;
		}
	});
	formatLeftMenu(o);
	formatMenuBody(o,k.id,sdata.rows);
	SCFUtils.entry(k.id,k.path);
}
//function initMenu() {
//	
//	var options = {
//		url : SCFUtils.AJAXURL,
//		async : true,
//		data : {
//			queryId : 'Q_S_MENU_0001'
//		},
//		callBackFun : function(data) {
//			if (data.success&&!SCFUtils.isEmpty(data.rows)) {
////				addNav(data.rows);
//				formatMenuDate(data.rows);
//				InitLeftMenu();				
//			}
//		}
//	};
//	SCFUtils.ajax(options);
//}
//function initMenu() {
//	
//	var options = {
//		url : SCFUtils.AJAXURL,
//		async : true,
//		data : {
//			queryId : 'Q_S_MENU_0001'
//		},
//		callBackFun : function(data) {
//			if (data.success&&!SCFUtils.isEmpty(data.rows)) {
////				addNav(data.rows);
//				formatMenuDate(data.rows);
//				InitLeftMenu();				
//			}
//		}
//	};
//	SCFUtils.ajax(options);
//}

function clickComFun(option){
	var link_right=$(".link_right");
	var link=$('<div class="link">');
	var ul=$('<ul>');
	var li=$('<li>');
	var href=$('<a href="javascript:void(0)">'+option.funTitle+'</a>');
	var funUrl=option.funUrl;
	var funPath=option.funPath;
	href.appendTo(li).bind('click',function(){
		SCFUtils.entry(funUrl,funPath);
//		return false;
	});	
	ul.appendTo(link).append(li);
	link_right.append(link);
}
function addcomFunBtn(){
	//var i =1;
//	$('<a class="dsB eventAdd fR"></a>').appendTo($('.link_right'))
//	   .unbind().bind('click',function(){
//		   SCFUtils.entry('F_P_000117','我的信息 > 完善我的信息');
//			return false;
//	   });
	var link_right=$(".link_right");
	var link=$('<div class="linkadd">');
	var ul=$('<ul style="height:37px">');
	var li=$('<li>');
	var href=$('<a href="javascript:void(0)">'+"+"+'</a>');
	href.appendTo(li).bind('click',function(){
		SCFUtils.entry('F_P_000117','我的信息 > 完善我的信息');
//		return false;
	});	
	ul.appendTo(link).append(li);
	link_right.append(link);
}
function comFunAdd(){
	var userId=$("#userId").val();
	var option={
			url:SCFUtils.AJAXURL,
			data: {
				queryId:'Q_P_000210',
				userId:userId
			},
			callBackFun:function(data){
				if(data.success){					
//					createUl("userInner");
//					$('.link_right').css('height',(data.total*12)+'%');
					if(data.total>=1){
						$('.homeBody').css('min-height',300+47*(data.total-1));
					}
					for(var i =0;i<data.total;i++){
						clickComFun(data.rows[i]);
					}
					if(data.total<6){
						addcomFunBtn();
					}
				}
			}
	};	
	SCFUtils.ajax(option);
}

/**
* 加载iframe时自适应内容。
*/
//function iFrameHeight() {	
//	var ifm= document.getElementById("iframepage");   
//	if(document.frames){
//		resizable(ifm,document.frames["iframepage"].document);
//	}else{
//		resizable(ifm,ifm.contentDocument);
//	}
//	setTimeout("iFrameHeight()", 5);	
//}

function iFrameHeight() {	
	var ifm= document.getElementById("iframepage");   
	if(document.frames){
		if(document.frames["iframepage"]){
			resizable(ifm,document.frames["iframepage"].document);
		}else{
			resizable(ifm,document.frames.document);
		}
	}else{
		resizable(ifm,ifm.contentDocument);
	}
	setTimeout("iFrameHeight()", 5);	
}

function loadAdviceItem(data){
//	var header=$('.header');
//	var li=$('<li class="i">');
//	var em=$('<em class="siteInfoAdvice"></em>');
//	if(data==0){
//		var span=$('<span  id="adviceSpanIndex" class="dsIB cP" onclick="advice()">我的通知</span>');
//	}else{
//		var span=$('<span id="adviceSpanIndex" class="dsIB cP" onclick="advice()">我的通知('+data+')</span>');
//	}
//	li.append(em);
//	span.appendTo(li).unbind().bind('click',function(){
//		SCFUtils.entry("F_P_000112","通知管理 > 我的通知信息");
//		return false;
//	});
//	li.appendTo(header);
	
}

//function ThreadTimes(){
//window.setInterval("queryAdviceEdit()",5000);
//}
//window.onload=ThreadTimes;

function queryAdviceEdit(){
	var options = {
//			async:true,
			title:'通知查询',
			
//			reqid:'I_S_000002',
//			data:{cacheType:'non',queryType:'queryCount',queryCon:'onpassageitem'},
			reqid:'I_S_000003',
			data:{cacheType:'non',queryType:'queryCount',byFunc:'n'},
			onSuccess:editAdvice
		};
	SCFUtils.getData(options);
}
function editAdvice(data){
	if(data==0){
		$('#adviceSpanIndex').html("我的通知");
	}else{
		$('#adviceSpanIndex').html("我的通知("+data+")");
	}
}
//function resizable(ifm,subWeb){
//	if(ifm != null && subWeb != null && subWeb.body != null ) {		
//		if(/MSIE ([678])/.test( navigator.userAgent)){ //IE 678
//			ifm.height = subWeb.body.scrollHeight;
//		}else{
//			ifm.height =subWeb.body.offsetHeight;			
//		}
//	}
//}

function resizable(ifm,subWeb){
	if (ifm != null && subWeb != null && subWeb.body != null) {
		if (parseInt(SCFUtils.getBrowserVersion())<9) { // IE 678
			ifm.height = subWeb.body.scrollHeight;
		} else {
			ifm.height =subWeb.body.offsetHeight;	
		}
	}
}

function advice(){
	SCFUtils.entry('F_P_000112','通知管理 > 我的通知信息');
}

function logout(){
	SCFUtils.onLogoutClick();
}

// 处理键盘事件禁止后退键（Backspace）密码或单行、多行文本框除外
function banBackSpace(e) {

	var ev = e || window.event;// 获取event对象
	var obj = ev.target || ev.srcElement;// 获取事件源
	var t = obj.type || obj.getAttribute('type');// 获取事件源类型

	// 获取作为判断条件的事件类型
	var vReadOnly = obj.readOnly;
	var vDisabled = obj.disabled;

	// 处理undefined值情况
	vReadOnly = (vReadOnly == undefined) ? false : vReadOnly;
	vDisabled = (vDisabled == undefined) ? true : vDisabled;

	// 当敲Backspace键时，事件源类型为密码或单行、多行文本的，
	// 并且readOnly属性为true或disabled属性为true的，则退格键失效
	var flag1 = ev.keyCode == 8
			&& (t == "password" || t == "text" || t == "textarea")
			&& (vReadOnly == true || vDisabled == true);

	// 当敲Backspace键时，事件源类型非密码或单行、多行文本的，则退格键失效
	var flag2 = ev.keyCode == 8 && t != "password" && t != "text"
			&& t != "textarea";

	// 判断
	if (flag2 || flag1) {
		return false;
	}
}
function eventAdd(){
	var option ={
			url:SCFUtils.AJAXURL,
			data: {
				queryId:'Q_P_000301',
				userId:$('#userId').val()
			},
			callBackFun:function(data){
				if(data.success){	
//					if(data.success&&!SCFUtils.isEmpty(data.rows)){	
//					$('.homeBody').css('min-height','500px');
					var inner1=$('#client_financing1');
					var inner2=$('#client_financing2');
						inner1.append(iframeContent("screen/reg/comMsgLeft.jsp")).appendTo();
						inner2.append(iframeContent("screen/reg/comMsgRight.jsp")).appendTo();
//						iFrameHeights();
				}
//				}else{
////					$('#client_financing1').css('display', 'none');
////					$('#client_financing2').css('display', 'none');
//					$('.eventBlock').css('height','11%');
//				}
			}
	};
	SCFUtils.ajax(option);
}
function iframeContent(url){
	var iframe = $('<iframe name="home" src="'+url+'?_dc='+$.now()+
			'" width="100%" height="100%" scrolling="no"'+
			' marginheight="0" frameborder="0" marginwidth="0"></iframe>');
	return iframe;
}