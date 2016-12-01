	function ignoreToolBar() {

	}	
	
	//原来的代码
	function pageLoad(win) {
		$('#sysRefNo').val(win.getData("buyerId"));
		$('#buyerNm').val(win.getData("buyerNm"));
		var sysRefNo = $('#sysRefNo').val();
		var buyerNm = $('#buyerNm').val();
		var trxId =win.getData("trxId");
		var sysBusiUnit = SCFUtils.SYSBUSIUNIT;
		var data = {'sysRefNo':sysRefNo,'buyerNm':buyerNm,'sysBusiUnit':sysBusiUnit,'trxId':trxId};
		$.extend(data,{'queryId':win.getData("queryId")});
		ajaxTable(data);
		SCFUtils.repalcePH("");
	}

	function SearchCimCust() {
		var data = SCFUtils.convertArray('searchForm');
		var queryParams = $('#dg').datagrid('options').queryParams;
		$('#dg').datagrid('load',$.extend(queryParams,data));
	}

	function onResetBtnClick() {
		$('#sysRefNo').val("");
		$('#buyerNm').val("");
	}
	
	//能否直接传target
	function doSave(win) {
		var row = $('#dg').datagrid('getSelected');
		var target = win.getData('callback');
		target(row);
		win.close();
	}

	function ajaxTable(data) {
		//加载表格
		$('#dg').datagrid({
			url: SCFUtils.AJAXURL,
			queryParams :data,
			toolbar : '#toolbar',
			checkOnSelect : true,
			singleSelect : true,//只选一行
			pagination : true,//是否分页
			fitColumns : true,//列自适应表格宽度
			striped : true,//当true时，单元格显示条纹
			loadMsg : '数据加载中,请稍后...',
			onLoadError : function() {
				alert('数据加载失败!');
			},
			onLoadSuccess : function(data) {
			},
			columns : [ [ {
				field : 'id',
				checkbox : 'true',
				width : 20
			}, {
				field : 'buyerId',
				title : '间接客户编号',
				width : 60
			}, {
				field : 'buyerNm',
				title : '间接客户名称',
				width : 60
			}] ]
		});
	}