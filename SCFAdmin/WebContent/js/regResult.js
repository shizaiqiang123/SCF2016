$(function(){
	$('#centerDiv',parent.document).css({
		'width':'80%',
		'padding-bottom':'80px'
	});
});

function beforeLoad(){
	var data = {
			cacheType : 'non'
		};
	return {data:data};
}

function pageOnLoad(data) {
	SCFUtils.loadForm('regForm', data);
	SCFUtils.setFormReadonly('#regForm',true);
	$('#lsysRefNo').html($('#sysRefNo').val());
}

function ignoreToolBar(){
	
}

function printBtnClick(){
	window.print();
}

function prevBtnClick(){
	var data=SCFUtils.convertArray("regForm");
//	$.extend(data, {
//		identifyingcode : ""
//	});
//	var data = {};
	var options = {
		url : SCFUtils.CANCEL,
		data :$.extend(data,{reqPageType:'pre',reqLoginType:"noLogin"}),
		async : true,
		callBackFun : function(data){
			SCFUtils.requestUrl(data,'noLogin');
			}
	};
	SCFUtils.ajax(options);
}


function showProtocol(){	
	$.showWindow({		
		title:'用户注册协议',		
		useiframe:true,
		modal:true, 
		width:'70%',
		height:'80%',
		minimizable:false,
		maximizable:false,
		collapsible:false,
		content:'url:jsp/protocol.html',
		data:{'reqLoginType':'noLogin'}	
	});	
}


function cancelBtnClick(){
	var options = {
			url : SCFUtils.CANCEL,
			data :{reqLoginType:"noLogin"},
			callBackFun : goLogin
		};
		SCFUtils.ajax(options);
}

function goLogin(){
	parent.window.location =  SCFUtils.ROOTURL + "/main.jsp";	
}

function submitBtnClick(){
	var data = SCFUtils.convertArray('regForm');
	var sysRefNo = $('#sysRefNo').val();
	var trxDt = SCFUtils.getcurrentdate();
	var userRoleRef = SCFUtils.uuid(10);
	//var userLogRef = SCFUtils.uuid(32);
	var userRoleNo = "ROLE000060";
	var options = {
		url : SCFUtils.SUBMITURL,
		data : $.extend({
			reqPageType : 'finish',
			reqLoginType:"noLogin",
			trxDt:trxDt,
			regDt:trxDt,
			pwdDueDt:trxDt,
			userRoleRef:userRoleRef,
			userRoleNo:userRoleNo,
			//userLogRef:userLogRef,
			userOwnerid:sysRefNo,
			acOwnerid:sysRefNo,
			roleNm:'未注册供应商',
			sysLockFlag:"F",
			custTp:'0',// 供应商
			signSts:'0', //待审核
			userStatus:'0'
		}, data),
		async : true,
		showMask:true,
		callBackFun : function(data){
			if(data.success){
				SCFUtils.alert('签约申请成功，请按时寄送材料！',function(){
					goLogin();
				});
			}								
		}
	};
	SCFUtils.ajax(options);	
}