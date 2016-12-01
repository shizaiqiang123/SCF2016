function initNotice() {
	var notice = '您好,您正在创建新货币信息中';
	return notice;
}

function pageOnInt(data) {
	ajaxPageTable();
}

function pageOnLoad(data) {
	if(SCFUtils.OPTSTATUS=="EDIT"){
		SCFUtils.setTextReadonly('sysRefNo', true);
		}
	SCFUtils.loadForm('loanSubmit', data);
	
}

function pageOnResultLoad(data) {
	SCFUtils.loadForm('loanSubmit', data);
}

function pageOnPreLoad(data) {
	SCFUtils.loadForm('loanSubmit', data);
}

function pageOnReleasePageLoad(data) {
	pageOnResultLoad(data);
}

function pageOnReleaseResultLoad(data) {
	SCFUtils.loadForm('loanSubmit', data);
}

function pageOnReleasePreLoad(data) {
	pageOnResultLoad(data);
}

function onNextBtnClick() {
	var data = SCFUtils.convertArray('loanSubmit');
	return data;
}


function ajaxPageTable() {
	var options = {
		toolbar : '#toolbar',
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
			field : 'sysRefNo',
			title : '币别号',
			width : 200
		}, {
			field : 'ccyNm',
			title : '货币名称',
			width : 200
		}, {
			field : 'decFormat',
			title : '描述格式',
			width : 200
		}, {
			field : 'baseDay',
			title : '基本天数',
			width : 200
		}, {
			field : 'ccySymbol',
			title : '货币符号',
			width : 300
		} ] ]
	};
}
