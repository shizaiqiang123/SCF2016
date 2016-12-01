//function ThreadTimes(){
//	window.setInterval("updateGapiMsg()",5000);
//}
//window.onload=ThreadTimes;

function pageOnInt(data){
//	$("#adviceCount").html("0");
	ajaxBox();
}
function ajaxBox(){
//	createGapiMsgUl('inner');
	var options = {
			url : SCFUtils.AJAXURL,
			data : {
				cacheType :'non',
				queryId : 'Q_P_000232'
			},
			callBackFun : function(data) {
				if (data.success&&!SCFUtils.isEmpty(data.rows)) {
//					createUl("userInner");
					$.each(data.rows,function(i,n){
						createGapiMsgLi(n);
					});		
				}
			}
	};
	SCFUtils.ajax(options);
//	updateGapiMsg();
}
function updateGapiMsg(){
	var options = {
			url : SCFUtils.AJAXURL,
			data : {
				cacheType :'non',
				queryId : 'Q_P_000232'
			},
			callBackFun : function(data) {
				if (data.success) {
//					createUl("userInner");
					$.each(data.rows,function(i,n){
//						var val=;
						$("#"+n.gapiId).text(n.count);
					});		
				}
			}
	};
	SCFUtils.ajax(options);
}
//function createGapiMsgUl(id){
//	var notDiv = $('#content');	
////	$('<div class="'+id+'" title></div>').append
//	$('<ul id="'+id+'" class="clearfix eventArea f16 white">').appendTo(notDiv);
//}

function createGapiMsgLi(options){
	var ul=$("#userinner");
	var li = $("<li class='fL portLi'></li>");
	createGapiMsgHead(li,options);
	createGspiMsgBody(li,options);
	li.appendTo(ul);
}
function createGapiMsgHead(li,options){
	var span=$("<span class='portSpan'>"+options.gapiName+"</span>");
	var sendAgain=$("<a class='portA fR f14 blue' href='javascript:void(0)'>重新发送</a>");
	sendAgain.bind('click',function(){
	sendAgainBox(options);
	});
	var detailMsg=$("<a class='fR f14 blue' href='javascript:void(0)'>详细信息</a>");
	detailMsg.bind('click',function(){
		detailMsgBox(options);
	});
	
	li.append(span).append(sendAgain).append($("<span class='fR f14 blue'>&nbsp;|&nbsp;</span>")).append(detailMsg);
}
function createGspiMsgBody(li,options){
	var table=$("<table class='portTable f14' border='1px' frame=above></table>");
	var tr=$("<tr class='portTrLeft'></tr>");
	var count=$("<td class='portTd'>异常数量：</td><td class='portTd2'><span id='"+options.gapiId+"'>"+options.count+"<span></td>");
	var gapiType=$("<tr><td class='portTd'>接口类型：</td><td class='portTd2'>"+options.gapiType+"</td></tr>");
	var gapiName=$("<tr><td class='portTd'>接口名称：</td><td class='portTd2'>"+options.gapiName+"</td><tr>");
	tr.append(count);
	table.append(tr).append(gapiType).append(gapiName).appendTo(li);
	}
function sendAgainBox(opt){
	var options = {
			reqid : 'I_P_000084',
			data : {
				gapiId : opt.gapiId,
				cacheType :'non'
			},
			onSuccess : sendSuccess 
		};
		SCFUtils.getData(options);
}
function detailMsgBox(opt){
	var options={
			title:"接口异常详细信息查询",
			reqid:'I_P_000086',
			data:{
				gapiId : opt.gapiId
				
			},
			buttons : [ {
				text : '发送',
				handler : 'doSave'
			},{
				text : '取消',
				handler : 'cancel'
			}],
			onSuccess : detailSuccess 
	};
	SCFUtils.getData(options);
}
function sendSuccess(){
	
}
function detailSuccess(){
	
}

function onCancelBtnClick(){
	var sysRefNo=$('#sysRefNo').val();
	return {sysRefNo:sysRefNo};
}

	
	
//	var option = {
//			toolbar : '#toolbar',
//			rownumbers : true,
//			checkOnSelect : true,
//			singleSelect : true,// 只选一行
//			pagination : false,// 是否分页
//			fitColumns : true,// 列自适应表格宽度
//			striped : true, // 当true时，单元格显示条纹
//			idField : 'funId',
//			columns : [ [ {
//				field : 'ck',
//				checkbox : true
//			}, 
//
//			{
//				field : 'userId',
//				title : '用户Id',
//				width : 70
//			},
//			{
//				field : 'funId',
//				title : '常用功能编号',
//				width : 70
//			}, {
//				field : 'funNm',
//				title : '常用功能名称',
//				width : 70
//			}, {
//				field : 'funPath',
//				title : '常用功能路径',
//				width : 70
//			} ] ]
//		};
//		$('#DetailPortDg').datagrid(option);
//function portMonitorUl(id){
//	var notDiv = $('#content');	
////	if(notDiv!=null){
////		$('#content').val("");
////	}
//	$('<ul id="'+id+'" class="clearfix eventArea f16 white">').appendTo(notDiv);	
//}
//function portMonitorli(option){
//	var inner = $("#inner");
//	var portType=option.portType;
//	
//			var li =$("<li class='fL portLi'>接口名称："+option.portName+
//					"</br> 异常数量："+option.count+"</br>").appendTo(inner);
//			var sendbutton=$("<button id='sendAgain' class='portButton white'>异常处理</button>").appendTo(li).bind('click',function(){
//				detailDataBox(option.portType);
//			});
//			var querybutton=$("<button id='queryAgain' class='portButton white'>详细信息</button>").appendTo(li).bind('click',function(){
////				detailDataBox(option.portType);
//				queryPortMonitorBox(option.portType);
//			});
//			li.addClass("eventDefault").unbind();
////			onclick='detailDataBox("+portType+")
////				$('#sendAgain').unbind('onclick',function(){
////					detailDataBox(option.portType);
////				});
////			.bind('click',function(){
////				for(var i =0;i<options.rows[i].count;i++){	
////				}
//				//直接调用后台处理
////				queryData(option.portType);
//				//执行详细信息
////				detailDataBox(option.portType);
////				return false;
////			}).hover(function() {
////				$(this).addClass("hover");		
////			}, function() {
////				$(this).removeClass("hover");
////			});
//}
//function queryPortMonitorBox(portType){
//	var options={
//			title:"接口异常详细信息查询",
//			reqid:'I_P_000086',
//			data:{
//				portType : portType,
//				cacheType :'non'
//			},
//			onSuccess : querySuccess 
//	};
//	SCFUtils.getData(options);
//}
//function querySuccess(){
//}
//function detailDataBox(portType){
//	var options = {
//		reqid : 'I_P_000084',
//		data : {
//			portType : portType,
//			cacheType :'non'
//		},
//		onSuccess : detailSuccess 
//	};
//	SCFUtils.getData(options);
//}
//function detailSuccess(){
//}
//function queryData(portType){
//	var result=0;
//	var options = {
//			url : SCFUtils.AJAXURL,
//			data : {
//				cacheType :'non',
//				queryId : 'Q_P_000235',
//				portType:portType
//			},
//			callBackFun : function(data) {
//				if (data.success) {
//					$(data.rows).each(function(i, obj) {
//					result+=sendData(obj);
//					
//				});
//				}
//			}
//	};
//	SCFUtils.ajax(options);
	//SCFUtils.alert("成功"+result+"条");
//}
//
//function sendData(obj){
//	var result=0;
//	var option = {
//			url : SCFUtils.AJAXURL,
//				data:{
//					cacheType :'non',
//					byFunc :'N',
//					getdataId:obj.portRefNo,
//					telphone:obj.portMessage,
//					sysRefNo:obj.sysRefNo
//				},
//				callBackFun : function(data) {
//					if (data.success) {
//						result+=1;
////						callBack(obj);
//					}
//				}
//				
//		};
//	SCFUtils.ajax(option);
//	
//	return result;
//}
//function callBack(obj){
//	var option = {
//			url : SCFUtils.AJAXURL,
//				data:{
//					cacheType :'non',
//					byFunc :'N',
//					getdataId:obj.portRefNo,
//					telphone:obj.portMessage,
//					sysRefNo:obj.sysRefNo
//				},
//				callBackFun : function(data) {
//					if (data.success) {
//						alert("重发成功;");
//						callBack();
//					}
//				}
//				
//		};
//	SCFUtils.ajax(option);
//}
