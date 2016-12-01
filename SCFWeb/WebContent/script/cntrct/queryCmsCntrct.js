function ignoreToolBar() {

}
function pageLoad(win) {
	var cmsCustNo = win.getData("cmsCustNo");
	if (SCFUtils.isEmpty(cmsCustNo)) {
		cmsCustNo = "";
	}
	$('#cmsCustNo').val(cmsCustNo);

	ajaxTable();

	//查询
	SearchCimCust(cmsCustNo);

}

function SearchCimCust(cmsCustNo) {
	var data = {};
	var options = {
		url : SCFUtils.AJAXURL,
		async : false,
		data : $.extend({
			getdataId : 'I_P_00007803',
			byFunc : 'N',
			cacheType : 'non',
			cmsCustNo : cmsCustNo,
		}, data),
		callBackFun : function(backData) {
			var griddata = backData.obj.trxDom.invoiceApprvData;
			if (griddata._total_rows > 0) {
				SCFUtils.loadGridData('dg', SCFUtils.parseGridData(griddata));
			}
		}
	};
	SCFUtils.ajax(options);

}

//能否直接传target
function doSave(win) {
	var row = $('#dg').datagrid('getSelected');
	var target = win.getData('callback');
	target(row);
	win.close();
}

function ajaxTable() {
	// 加载表格
	var options = {
		toolbar : '#toolbar',
		rownumbers : true,
		checkOnSelect : true,
		pagination : true,// 是否分页
		fitColumns : true,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹
		idField : 'sysRefNo',//分页勾选

		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			field : 'cmsNo',
			title : '信贷系统编号',
			width : 80
		}, {
			field : 'cmsNm',
			title : '信贷额度名称',
			width : 80
		} ] ]
	};
	$('#dg').datagrid(options);
}