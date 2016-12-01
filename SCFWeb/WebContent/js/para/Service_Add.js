function pageOnInt() {
	ajaxBox();
}

function ajaxBox() {
	var trigger = [ {
		"id" : 'P',
		"text" : "P",
		selected : true
	}, {
		"id" : 'M',
		"text" : "M"
	}, {
		"id" : 'D',
		"text" : "D"
	}, {
		"id" : 'R',
		"text" : "R"
	} ];
	$("#trigger").combobox('loadData', trigger);

	var component = [ {
		"id" : 'TrxAccountingManager',
		"text" : "TrxAccountingManager",
		selected : true
	}, {
		"id" : 'TrxLimitsManager',
		"text" : "TrxLimitsManager"
	} ];
	$("#component").combobox('loadData', component);

	var type = [ {
		"id" : 'Accounting',
		"text" : "Accounting"
	}, {
		"id" : 'Advice',
		"text" : "Advice"
	}, {
		"id" : 'Limits',
		"text" : "Limits"
	}, {
		"id" : 'EDI',
		"text" : "EDI"
	}, {
		"id" : 'Loan',
		"text" : "Loan"
	}, {
		"id" : 'Report',
		"text" : "Report"
	}, {
		"id" : 'Ap',
		"text" : "Ap"
	}, {
		"id" : 'Workflow',
		"text" : "Workflow"
	}, {
		"id" : 'Image',
		"text" : "Image"
	}, {
		"id" : 'Message',
		"text" : "Message"
	}, {
		"id" : 'Verify',
		"text" : "Verify"
	}, {
		"id" : 'Email',
		"text" : "Email"
	} ];
	$("#type").combobox('loadData', type);
}

function pageOnFPLoad(data) {
	SCFUtils.loadForm('mainForm', data);
}
function pageOnResultLoad(data) {
	SCFUtils.loadForm('mainForm', data);
}
function pageOnPreLoad(data) {
	pageOnResultLoad(data);
}
function newId() {
	var options = {};
	options.data = {
		refName : 'ServiceRef',
		refField : 'id'
	};
	options.force = true;
	SCFUtils.getRefNo(options);
	/*
	 * 获取新编号后，去判断#id的div有无值,无值不做处理
	 * 有去除这个id的validatebox-invalid方法，不去除*号了
	 * new on 20160829 by JinJH
	 */
	if($('#id').val()!=null){//$('#cntrctNo')为查询左边的div的id
		$('#id').removeClass('validatebox-invalid');
	}
}
function ajaxSysRefNo() {
	if ('PARAADD' == SCFUtils.OPTSTATUS) {
		var newsysRefNo = SCFUtils.uuid(32);
		$('#sysRefNo').val(newsysRefNo);
	}
}
function onSaveBtnClick() {
	var data = SCFUtils.convertArray('mainForm');
	return data;
}
function onNextBtnClick() {
	return onSaveBtnClick();
}

function pageOnLoad(data) {
	SCFUtils.loadForm('mainForm', data.obj);
	ajaxSysRefNo();
}