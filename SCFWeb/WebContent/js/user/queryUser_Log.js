/*$(function(){
	ajaxBox();	
	var options={};
	options.data = {
			refName: 'UserRef',
			refField:'sysRefNo'
				};
	SCFUtils.getRefNo(options);
});
 */
//function beforeLoad(){
//	var data = {
//		cacheType : 'non'
//	};
//	return {data:data};
//}
function pageOnInt() {
	ajaxTable();
	var data = [ {
		"id" : 'login',
		"text" : "在线"
	}, {
		"id" : 'logoff',
		"text" : "离线"
	} ];
	$('#logType').combobox('loadData', data);
	data = [ {
		"id" : '0',
		"text" : "系统级"
	}, {
		"id" : '5',
		"text" : "供应商级"
	}, {
		"id" : '7',
		"text" : "游客级"
	}, {
		"id" : '9',
		"text" : "默认级"
	} ];
	$('#userTp').combobox('loadData', data);
	$('#userLoginTime').datebox({
		onSelect : function(date) {
			var userLoginTime = $('#userLoginTime').datebox('getValue');
			var maxUserLoginTime = SCFUtils.FormatDate(userLoginTime, 1);
			$('#maxUserLoginTime').val(maxUserLoginTime);
		}
	});
	$('#userLogoutTime').datebox({
		onSelect : function(date) {
			var userLogoutTime = $('#userLogoutTime').datebox('getValue');
			var maxUserLogoutTime = SCFUtils.FormatDate(userLogoutTime, 1);
			$('#maxUserLogoutTime').val(maxUserLogoutTime);
		}
	});

}

function pageOnLoad(data) {
	queryUser_log_info();
}

function onNextBtnClick() {
	var gridData = {};
	gridData = SCFUtils.getSelectedGridData('dg', false);
	return gridData.rows0;
}

function ajaxTable() {
	var options = {
		// toolbar : '#companyToolbar',
		idField : 'sysRefNo',
		rownumbers : true,
		checkOnSelect : true,
		singleSelect : true,// 只选一行
		pagination : true,// 是否分页
		fitColumns : true,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹
		idField : 'id',
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			field : 'userId',
			title : '用户ID',
			width : '14.28%'
		}, {
			field : 'userName',
			title : '用户名称',
			width : '14.28%'
		}, {
			field : 'userTp',
			title : '用户类型',
			formatter : userType,
			width : '14.28%'
		}, {
			field : 'userLoginTime',
			title : '登录时间',
			width : '14.28%',
			formatter : dateTimeFormater
		}, {
			field : 'userLogoutTime',
			title : '退出时间',
			width : '14.28%',
			formatter : dateTimeFormater
		}, {
			field : 'userIp',
			title : 'IP地址',
			width : '14.28%',
			formatter : ipFormat
		}, {
			field : 'logType',
			title : '状态',
			width : '14.28%',
			formatter : userLoginType
		} ] ]
	};
	$('#dg').datagrid(options);
}

function queryUser_log_info() {
	var userTp = $('#userTp').combobox('getValue');
	var userId = $('#userId').val();
	var userLoginTime = $('#userLoginTime').datebox('getValue');
	var maxUserLoginTime = $('#maxUserLoginTime').val();
	var userLogoutTime = $('#userLogoutTime').datebox('getValue');
	var maxUserLogoutTime = $('#maxUserLogoutTime').val();
	var logType = $('#logType').combobox('getValue');
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000311',
			userTp : userTp,
			userId : userId,
			userLoginTime : userLoginTime,
			maxUserLoginTime : maxUserLoginTime,
			userLogoutTime : userLogoutTime,
			maxUserLogoutTime : maxUserLogoutTime,
			logType : logType
		},
		callBackFun : function(data) {
			if (SCFUtils.isEmpty(data.rows)) {
				data.rows = [];
				SCFUtils.alert("未查询到符合条件的记录！");
			}
			SCFUtils.loadGridData('dg', data.rows, false, true);
			// $.each(data.rows,function(i,n){
			// if(n.productSts=='0'){
			// SCFUtils.setDatagridRowReadonly("dg",i,true,function(){
			// SCFUtils.alert("该产品暂不可签约！");
			// });
			// }
			// });
		}
	};
	SCFUtils.ajax(options);
}

function onSearchBtnClick(){
	queryUser_log_info();
}

//重置
function onResetBtnClick() {
	$('#userTp').combobox('setValue','');
	$('#userId').val("");
	$('#userLoginTime').datebox('setValue','');
	$('#userLogoutTime').datebox('setValue','');
	$('#logType').combobox('setValue','');
}