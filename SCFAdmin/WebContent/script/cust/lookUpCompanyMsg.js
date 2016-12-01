function pageOnInt() {
	ajaxTable();
	SCFUtils.setFormReadonly('mainForm', true);
}

function pageOnPreLoad(data) {
	
}

function onNextBtnClick() {
}

function pageOnLoad(data){
	queryCompany();
	queryAcNo();
}

function ajaxTable() {
	var options = {
		toolbar : '#toolbar',
		idField :  'sysRefNo',
		rownumbers : true,
		checkOnSelect : true,
		singleSelect : true,// 只选一行
		pagination : false,// 是否分页
		fitColumns : true,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹
		idField : 'id',
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			field : 'acBkNm',
			title : '开户银行',
			width : 70
		}, {
			field : 'acNo',
			title : '账号',
			width : 70
		}, {
			field : 'acNm',
			title : '户名',
			width : 70
		}, {
			field : 'acOwnerid',
			title : 'acOwnerid',
			hidden : true
		}, {
			field : 'sysRefNo',
			title : 'sysRefNo',
			hidden : true
		}] ]
	};
	$('#accountDg').datagrid(options);
}

function queryCompany() {
	var userOwnerid = $('#userOwnerid').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000213',
			userOwnerid : userOwnerid
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				SCFUtils.loadForm('mainForm', data.rows[0]);
			}
		}
	};
	SCFUtils.ajax(options);
	// return companyList;
}

function queryAcNo(){
	var acOwnerid=$('#sysRefNo').val();
	if(!SCFUtils.isEmpty(acOwnerid)){
		var option={
				url:SCFUtils.AJAXURL,
				data: {
					queryId:'Q_P_000228',
					acOwnerid:acOwnerid
				},
				callBackFun:function(data){
					if(!SCFUtils.isEmpty(data.rows)){
						SCFUtils.loadGridData('accountDg', data.rows, false, true);	
					}
				}
		};	
		SCFUtils.ajax(option);
	}
}
