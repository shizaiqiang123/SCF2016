function pageOnInt() {
	ajaxTable();
}

function pageOnLoad(data){
	querySupplierMsg();
}

function ajaxTable() {
	var options = {
		toolbar : '#toolbar',
		idField :  'sysRefNo',
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
			field : 'sysRefNo',
			title : '供应商编号',
			width : 70
		}, {
			field : 'custNm',
			title : '供应商名称',
			width : 70
		}] ]
	};
	$('#dg').datagrid(options);
}

function querySupplierMsg() {
	var userOwnerid = $('#userOwnerid').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000282',
			userOwnerid : userOwnerid
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				SCFUtils.loadGridData('dg', data.rows, false, true);	
			}
		}
	};
	SCFUtils.ajax(options);
	// return companyList;
}
