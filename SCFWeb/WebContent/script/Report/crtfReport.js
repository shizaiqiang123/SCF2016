function pageOnInt() {
	ajaxTable();
}

function pageOnLoad(data){
	var sysdate = SCFUtils.getcurrentdate();
	SCFUtils.loadForm('invcMForm',data);
	
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000341',
			custNo : data.obj.custNo,
			instNo : data.obj.instNo,
			startDt : data.obj.startDt,
			endDt : data.obj.endDt
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				SCFUtils.loadGridData('invcMTable', data.rows);
			}
		}
	};
	SCFUtils.ajax(options);
}

function ajaxTable() {
	// 加载表格
	var options = {
		toolbar : '#toolbar',
		rownumbers : true,
		// checkOnSelect : true,
		idField : "sysRefNo",
		// singleSelect : true,// 只选一行
		pagination : true,// 是否分页
		fitColumns : true,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			field : 'custNm',
			title : '经销商名称',
			width : 100
		}, {
			field : 'billNo',
			title : '汇票票号',
			width : 100
		},{
			field : 'billAmt',
			title : '票面金额',
			formatter:ccyFormater
		}, {
			field : 'billValDt',
			title : '开票日期',
			width : 100,
			formatter:dateFormater
		},{
			field : 'billDueDt',
			title : '到期日期',
			width : 100,
			formatter:dateFormater
		},{
			field : 'adviceNo',
			title : '送达通知书编号',
			width : 100
		},{
			field : 'adviceDt',
			title : '送达通知书日',
			width : 100,
			formatter:dateFormater
		}, {
			field : 'crtfNo',
			title : '合格证编号',
			width : 100
		}, {
			field : 'brandNo',
			title : '子品牌',
			width : 100
		},{
			field : 'chassisNo',
			title : '底盘号',
			width : 100
		},{
			field : 'engineNo',
			title : '发动机号',
			width : 100
		},{
			field : 'adviceAmt',
			title : '车辆送达金额',
			width : 100
		},{
			field : 'releaseDt',
			title : '专管员释放日期',
			width : 100,
			formatter:dateFormater
		},{
			field : 'adviceSts',
			title : '是否送达',
			width : 100
		},{
			field : 'releaseSts',
			title : '是否释放',
			width : 100
		}] ]
	};
	$('#invcMTable').datagrid(options);
}

function initToolBar() {
	return [ 'expt', 'prev', 'cancel' ];
}

function onExptBtnClick(){
	var data =SCFUtils.convertArray('invcMForm');	
	return data;
}


