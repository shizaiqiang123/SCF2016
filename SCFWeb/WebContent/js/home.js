window.onload = function(){   
	var ifra=document.getElementsByTagName("iframe");       
	for(var i=0,l=ifra.length;i<l;i++) {          
		ifra[i].setAttribute("allowTransparency","true");      
	}    
}



function initNotice(){
	var userId=$('#userId').val();
//	var notice = querylastLoginTime(userId);
	return null;
}
function querylastLoginTime(userId){
	var notice="";
	var option={
			url:SCFUtils.AJAXURL,
			data: {
				queryId:'Q_P_000332',
				userId:userId,
				page:'1',
				rows:'2'
			},
			callBackFun:function(data){
				if (data.success && data.rows.length ==2) {
					if(data.rows[1].userLoginTime!=undefined){
						notice="&nbsp;您好，您上次的登录时间为"+formatTime(data.rows[1].userLoginTime)+"。";
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

function initToolBar(){
	return [];
}
function pageOnInt(){
	createUl("inner");
	var options = {
//			async:true,
			title:'待办任务',
			reqid:'I_S_000002',
			data:{cacheType:'non',queryType:'queryCount',queryCon:'workitem',byFunc : 'N'},
			onSuccess:loadWorkItem
		};
	SCFUtils.getData(options);
	var options = {
//			async:true,
			title:'查询在途',
			reqid:'I_S_000002',
			data:{cacheType:'non',queryType:'queryCount',queryCon:'onpassageitem',byFunc : 'N'},
			onSuccess:loadOnPassageItem
		};
	SCFUtils.getData(options);
	
	var options = {
//			async:true,
			title:'通知查询',
//			reqid:'I_S_000002',
//			data:{cacheType:'non',queryType:'queryCount',queryCon:'onpassageitem'},
			reqid:'I_S_000003',
			data:{cacheType:'non',queryType:'queryCount',byFunc : 'N'},
			onSuccess:loadAdviceItem
		};
	SCFUtils.getData(options);
	
	var options = {
//			async:true,
			title:'预警通知',
//			reqid:'I_S_000002',
//			data:{cacheType:'non',queryType:'queryCount',queryCon:'onpassageitem'},
			reqid:'I_S_000003',
			data:{cacheType:'non',queryType:'queryCount',msgRemindTp:'warning',byFunc : 'N'},
			onSuccess:loadAdviceWarnItem
		};
	SCFUtils.getData(options);
	
//	var data ={title:'预警信息',url:"screen\/cntrct\/Cntrct.jsp",number:"0",style:"total_fans"};
//	createLi(data);	
	
	
	
	
//	data = {title:'预警信息',url:"jsp\/sys\/SYS_AdvMsg.jsp",number:"0",style:"eventNotice lst"};
//	createLi(data);
	
	companyQuery();
	eventAdd();
//	comFunAdd();
	queryIcon();
	
	/*获取通知
	 * 
	 */
//	addadvert();
}
function queryIcon(){
	var option={
			url:SCFUtils.AJAXURL,
			data: {
				queryId:'Q_P_000129',
				userId:$('#userId').val()
			},
			callBackFun:function(data){
				if(data.success){		
					if(data.rows[0].imgUrl!=null){
						$('#imgUrl').attr('src',data.rows[0].imgUrl);						
					}
				}
			}
	};	
	SCFUtils.ajax(option);
}
function editAdvert(){
	setInterval(function(){
		$('#advert').panel('collapse',true);
	},10000);
}

//function addadvert(){
//	var advert=$('#advert');
//	var img=$('<img src="images/image/advert1.png" width="100%"  alt="" onclick=""/>');
//	advert.append(img);
//	setInterval(function(){
//		$('#advert').panel('collapse',true);
//	},10000);
//}
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
/*						$('.homeBody').css('min-height',300+47*(data.total-1));*/
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
function blueOnclick(){
	SCFUtils.entry('F_P_000117','我的信息 > 完善我的信息');
}
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

function companyQuery(){
	var userOwnerId=$('#userOwnerId').val();
	if(userOwnerId==""){
		return ;
	}
	var option={
			url:SCFUtils.AJAXURL,
			data: {
				queryId:'Q_P_000315',
				sysRefNo:userOwnerId
			},
			callBackFun:function(data){
				if (data.success&&!SCFUtils.isEmpty(data.rows)) {
					var custNm=data.rows[0].custNm;
					var company=$("<div class='company_text'>"+custNm+"</div>");
					company.appendTo($('.right_text_info'));
					var signSts=data.rows[0].signSts;
					if(data.rows[0].custTp =='0'){
						var attest_credit=$('<div class="attest_credit">');
						if(signSts=='1'){
							var attest=$("<div class='attest'>已认证</div>");
							attest.appendTo(attest_credit);
						}else{
							var attest=$("<div class='attest'>未认证</div>");
							attest.appendTo(attest_credit);
						}
						attest_credit.appendTo($('.right_text_info'));
					}
				}
			}
		};
		SCFUtils.ajax(option);
}

function loadWorkItem(data){
	var record = {
		title : '待办任务',
		url : 'F_S_000700',
		number : data,
		style : "eventUndo",
		path : '我的信息> 查询我的任务'
	};	
	createLi(record);	
}

function loadOnPassageItem(data){
	var record = {
		title : '查询在途',
		url : "F_S_000701",
		number : data,
		style : "eventDoing",
		path : '我的信息 > 查询在途'
	};
	createLi(record);
}

function loadAdviceItem(data){
	var record = {
		title : '未读通知',
		url : 'F_P_000112',
		number : data,
		style : "eventUnread",
		path : '通知管理 > 我的通知信息'
	};
	createLi(record);
}

function loadAdviceWarnItem(data){
	var record = {
		title : '预警通知',
		url : 'F_P_000724',
		number : data,
		style : "eventNotice",
		path : '预警管理 > 我的预警信息'
	};
	createLi(record);
}

function createUl(id){
	var notDiv = $('#content');		
	$('<ul id="'+id+'" class="clearfix  f14  homeUlWhite">').appendTo(notDiv);			
}

function createLi(options){
	var inner = $("#inner");
	var li =$("<li class='eventBlock fL tC'></a>").appendTo(inner);
	var div=$('<div>').addClass(options.style);
//	var shadow=$("<div class='shadow'>").addClass("shadow"+options.style);
	var a=$("<a class='eventA'>"+options.title+
			" "+options.number+"</a>").addClass("eventA"+options.style);
	li.append(div).append(a).unbind().bind('click',function(){
		var reqData = {'msgRemindTp':options.msgRemindTp};
		SCFUtils.entry(options.url,options.path,'',reqData);
		return false;
	}).hover(function() {
//		$(this).addClass("hover");
		//$(".shadow"+options.style).removeClass(options.style);
		div.addClass(options.style+"Hover");
		/*$(".shadow"+options.style).addClass("shadowhover");*/
		$(".eventA"+options.style).addClass("eventAHover");
	}, function() {
//		$(this).removeClass("hover");
		div.removeClass(options.style+"Hover");
		//$(".shadow"+options.style).addClass(options.style);
		/*$(".shadow"+options.style).removeClass("shadowhover");*/
		$(".eventA"+options.style).removeClass("eventAHover");
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

function createUserLi(options){
	var inner = $("#client_financing");
	inner.append(iframeContent("screen/reg/comMsgLeft.jsp"));
}

function iframeContent(url){
	var iframe = $('<iframe name="home" src="'+url+'?_dc='+$.now()+
			'" width="100%" height="100%" scrolling="no"'+
			' marginheight="0" frameborder="0" marginwidth="0"></iframe>');
	return iframe;
}


function iFrameHeight() {	
	var ifm= $("#iframepage",parent.document);
	var subWeb = ifm[0].contentDocument;   
	if(ifm != null && subWeb != null && subWeb.body != null ) {
		ifm[0].height =subWeb.body.scrollHeight;
	}	
}

function eventAdd(){
//	var option ={
//			url:SCFUtils.AJAXURL,
//			data: {
//				queryId:'Q_P_000301',
//				userId:$('#userId').val()
//			},
//			callBackFun:function(data){
//				if(data.success){	
////					if(data.success&&!SCFUtils.isEmpty(data.rows)){	
////					$('.homeBody').css('min-height','500px');
//					var inner1=$('#client_financing1');
//					var inner2=$('#client_financing2');
//						inner1.append(iframeContent("screen/reg/comMsgLeft.jsp"));
//						inner2.append(iframeContent("screen/reg/comMsgRight.jsp"));
//						iFrameHeight();
//				}
////				}else{
//////					$('#client_financing1').css('display', 'none');
//////					$('#client_financing2').css('display', 'none');
////					$('.eventBlock').css('height','11%');
////				}
//			}
//	};
//	SCFUtils.ajax(option);
	

}
//function loadComfItem(){
//	//var i =1;
//	$('<a class="dsB eventAdd fR"></a>').appendTo($('#content'))
//	   .unbind().bind('click',function(){
//		   SCFUtils.entry('F_P_000117','我的信息 > 完善我的信息');
//			return false;
//	   });
//}