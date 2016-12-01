function initToolBar(){
	return ['prev','cancel'];
}

function beforeLoad(){
	var data = {
		cacheType : 'non'
	};
	return {data:data};
}

function pageOnInt() {
	ajaxbox();
}

function ajaxbox() {
	var incomeFlag = [ {
		"id" : '0',
		"text" : "营业外收入"
	}, {
		"id" : '1',
		"text" : "营业外支出"
	} ];
	$('#incomeFlag').combobox('loadData', incomeFlag);

	var sysGapiSts = [ {
		"id" : '0',
		"text" : "接口成功"
	}, {
		"id" : '1',
		"text" : "接口失败"
	} ];
	$('#sysGapiSts').combobox('loadData', sysGapiSts);
}

function pageOnResultLoad(data) {
	SCFUtils.loadForm('mainForm', data);
}

function pageOnPreLoad(data) {
	SCFUtils.loadForm('mainForm', data);
}

function pageOnLoad(data) {
	SCFUtils.loadForm('mainForm', data);
}
