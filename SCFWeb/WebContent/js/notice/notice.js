
function ajaxBox(){
	var msgStatue = [{"id":'1',"text":"未生效"},{"id":'2',"text":"有效","selected":true},{"id":'3',"text":"失效"},{"id":'4',"text":"删除"},{"id":'5',"text":"草稿"}];
	$("#msgStatue").combobox('loadData',msgStatue);
//	var msgRemindTp = [{"id":'1',"text":"通知","selected":true},{"id":'2',"text":"提醒"},{"id":'3',"text":"紧急通知"},{"id":'4',"text":"重要通知"},{"id":'5',"text":"警告"}];
	var msgRemindTp = [{"id":'1',"text":"通知","selected":true},{"id":'2',"text":"重要通知"},{"id":'3',"text":"警告"}];
	$("#msgRemindTp").combobox('loadData',msgRemindTp);
	var msgGroupTp = [{"id":'1',"text":"点消息","selected":true},{"id":'2',"text":"组消息"}];
	$("#msgGroupTp").combobox('loadData',msgGroupTp);
	var msgSendTp = [{"id":'0',"text":"站内信","selected":true},{"id":'1',"text":"Mail"},{"id":'2',"text":"短信"},{"id":'3',"text":"APP推送"}];
	$("#msgSendTp").combobox('loadData',msgSendTp);
	ajaxTable();
}

function pageOnInt() {
	ajaxBox();
	SCFUtils.setTextReadonly('msgTextId', true);
	SCFUtils.setTextReadonly('sendNm', true);
	SCFUtils.setComboReadonly('msgStatue', true);
	
}

function pageOnPreLoad(data) {
	SCFUtils.loadForm('noticeForm', data);
	SCFUtils.loadGridData('dg',SCFUtils.parseGridData(data.obj.recipients), false);
}

function pageOnLoad(data){
	SCFUtils.loadForm('noticeForm', data);
	if(!SCFUtils.isEmpty(SCFUtils.OPTSTATUS)&&SCFUtils.OPTSTATUS=='ADD'){
		var options={};
		options.data = {
				refName: 'NoticeRef',
				refField:'sysRefNo'
					};
		SCFUtils.getRefNo(options);
		$('#msgTextId').val($('#sysRefNo').val());
	}else{
		if(SCFUtils.OPTSTATUS=='DELETE'){
			SCFUtils.setLinkbuttonReadonly('queryRevice', true);
		}
		queryRevice();
	}
	
}

function pageOnResultLoad(data) {
	SCFUtils.loadForm('noticeForm', data);
	SCFUtils.loadGridData('dg',SCFUtils.parseGridData(data.obj.recipients), true);// 加载数据并保护表格。
}

function checkDataGrid(){
	var flag=false;
	var data = $('#dg').datagrid('getData');
	if(data.total==0){
		SCFUtils.alert('请添加接受者！');
		flag=true;
	}
	return flag;
}

function checkDate(){
	var flag = false;
	var msgSendDate = $('#msgSendDate').datebox('getValue');
	var msgInvalidDate = $('#msgInvalidDate').datebox('getValue');
	if(SCFUtils.DateDiff(msgSendDate,SCFUtils.getcurrentdate())<0){
		SCFUtils.alert("发送时间不能小于当前时间");
		flag = true;
	}
	if(SCFUtils.DateDiff(msgInvalidDate,msgSendDate)<=0){
		SCFUtils.alert("失效时间必须大于发送时间");
		flag = true;
	}
	return flag;
}

function onNextBtnClick(){
	if(checkDate()){
		return;
	}
	if(checkDataGrid()){
		return;
	}
	var mainData = SCFUtils.convertArray('noticeForm');
	var editorData={};
	var editor = CKEDITOR.instances.msgText.getData();  
	editorData.msgText=editor;
	$.extend(mainData,editorData);
	var grid = {};
	var griddata = SCFUtils.getGridData('dg', false);
	grid.recipients = SCFUtils.json2str(griddata);
	$.extend(mainData, grid);
	return mainData;
}

function onDelBtnClick(){
	var mainData = SCFUtils.convertArray('noticeForm');
	var editorData={};
	var editor = CKEDITOR.instances.msgText.getData();  
	editorData.msgText=editor;
	$.extend(mainData,editorData);
	var grid = {};
	var griddata = SCFUtils.getGridData('dg', false);
	grid.recipients = SCFUtils.json2str(griddata);
	$.extend(mainData, grid);
	return mainData;	
}

function clearDategrid(){
//	$('#dg').datagrid('loadData', {total: 0, rows: []});
//	SCFUtils.loadGridData('dg',{total: 0, rows: []});
}

function lookUpUser(){
	var msgGroupTp =$('#msgGroupTp').combobox('getValue');
	
	if(msgGroupTp ==1){
		lookUpSingleUser();
	}else if(msgGroupTp ==2){
		lookUpUsers();
	}else{
		SCFUtils.error("请选择【消息分组类别】");
	}
}

function lookUpSingleUser(){
	var options = {
			title : '用户查询',
			reqid : 'I_S_000005',
			onSuccess : userLoadSuccess
		};
	SCFUtils.getData(options);
}

function lookUpUsers(){
	var options = {
			title : '角色查询',
			reqid : 'I_S_000006',
			onSuccess : roleLoadSuccess
		};
	SCFUtils.getData(options);
}

function userLoadSuccess(data){
	var datagrid={};
	var count = 0;
	var rows = new Array();
	$.each(data,function(i,obj){
		var record = {};
		record.msgRecId = obj.sysRefNo;
		record.msgRecNm = obj.userNm;
		record.sysRefNo = SCFUtils.uuid(16);
		record.msgRecTp = $('#msgGroupTp').combobox('getValue');
		record.msgId = $('#sysRefNo').val();
		rows.push(record);
		count++;
	});
	datagrid.rows = rows;
	datagrid.total = count;
	loadTable(datagrid);
}
function roleLoadSuccess(data){
	var datagrid={};
	var count = 0;
	var rows = new Array();
	$.each(data,function(i,obj){
		var record = {};
		record.msgRecId = obj.roleId;
		record.msgRecNm = obj.roleName;
		record.sysRefNo = SCFUtils.uuid(16);
		record.msgRecTp = $('#msgGroupTp').combobox('getValue');
		record.msgId = $('#sysRefNo').val();
		rows.push(record);
		count++;
	});
	datagrid.rows = rows;
	datagrid.total = count;
	loadTable(datagrid);
}

function loadTable(data) {
//	$('#dg').datagrid('loadData',data);
	SCFUtils.loadGridData('dg',data.rows,true,true);
}

function queryRevice(){
	var msgId=$('#msgTextId').val();
	var options = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000114',
				msgId : msgId
			},
			callBackFun : function(data) {
				if(data.success&&!SCFUtils.isEmpty(data.rows)){
					SCFUtils.loadGridData('dg',data.rows,true,true);
				}
			}
		};
		SCFUtils.ajax(options);
}



function ajaxTable() {
	var options = {
			toolbar : '#toolbar',
			//rownumbers : true,
			checkOnSelect:false,
			singleSelect:false,//只选一行
			pagination : false,//是否分页
			fitColumns : true,
			idField : 'sysRefNo',
			columns : [ [{
				field : 'msgRecId',
				title : '接收者编号',
				width : '50%'
			}, {
				field : 'msgRecNm',
				title : '接收者名称',
				width : '50%'
			}, {
				field : 'sysRefNo',
				hidden:true,
				title : '编号',
				width : '40%'
			}, {
				field : 'msgRecTp',
				hidden:true,
				title : '接收类型',
				width : 40
			}, {
				field : 'msgId',
				hidden:true,
				title : '消息编号',
				width : 40
			}] ]

		};
		$('#dg').datagrid(options);
}

