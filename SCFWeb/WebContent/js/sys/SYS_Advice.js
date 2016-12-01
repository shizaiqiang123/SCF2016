function ajaxBox() {
	var msgStatus = [ {
		"id" : '1',
		"text" : "未读"
	}, {
		"id" : '2',
		"text" : "已读",
		"selected" : true
	}, {
		"id" : '3',
		"text" : "重要"
	}, {
		"id" : '4',
		"text" : "再提醒"
	}, {
		"id" : '5',
		"text" : "删除"
	} ];
	$("#msgStatus").combobox('loadData', msgStatus);
	$("#msgS").combobox('loadData', msgStatus);
}

function pageOnInt() {
	ajaxBox();
	
}

function pageOnLoad(data) {
	SCFUtils.loadForm('noticeForm', data.rows);
	SCFUtils.setComboReadonly('msgS', false);
	var msgS = $("#msgStatus").combobox('getValue');
	$("#msgS").combobox('setValue', msgS);
	$("#msgRemaindDate").datebox('setValue', data.obj.msgRemaindDate);
}

function updateAdvice() {
	var msgS = $("#msgS").combobox('getValue');
	if (msgS == "4") {
		$('#mrdT').show();
		$('#mrdD').show();
		$('#msgRemaindDate').datebox({
			required : true
		});
		SCFUtils.setDateboxReadonly('msgRemaindDate', false);
	} else {
		$('#mrdT').hide();
		$('#mrdD').hide();
		$('#msgRemaindDate').datebox({
			required : false
		});
		$('#msgRemaindDate').datebox("setValue", "");
	}
	$("#msgStatus").combobox('setValue', msgS);
}

function sbumitMark(){
	var msgRemaindDate = $('#msgRemaindDate').datebox("getValue");
	if(SCFUtils.isEmpty(msgRemaindDate)&&$("#msgS").combobox('getValue') == "4"){
		SCFUtils.alert("请输入再提醒时间！");
	}else{
		var options={
				reqid :'I_P_000067',
				data :{
					sysRefNo:$('#sysRefNo').val(),
					msgStatus:$("#msgStatus").combobox('getValue'),
					msgRemaindDate:$('#msgRemaindDate').datebox("getValue"),
					cacheType :'non'
				},
				onSuccess : function(data){
					SCFUtils.alert("标记成功");
				}
		};
		SCFUtils.getData(options);
		
	}
	
	
}


//function compareDate(){
//	var today =  SCFUtils.getcurrentdate();
//	var remindDate = $('#msgRemaindDate').datebox("getValue");
//	var value = SCFUtils.DateDiff(today,remindDate);
//	alert(value);
//}

//function onSubmitBtnClick(){
//	var data = SCFUtils.convertArray('noticeForm');
//	if ($.isFunction(parent.work.onSubmitBtnClick)) {			
//		var options = {
//				url : SCFUtils.SUBMITURL,
//				data : $.extend({
//					reqPageType : 'finish'
//				}, data),
//				async : true,
//				callBackFun : SCFUtils.onSubmitSuccess
//		};
//		SCFUtils.ajax(options);
//	}				
//}