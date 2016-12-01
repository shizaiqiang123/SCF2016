function ignoreToolBar(){
	
}

	function pageLoad(win) {
		$('#buyerId').val(win.getData("buyerId"));
		$('#buyerNm').val(win.getData("buyerNm"));
		var buyerId = $('#buyerId').val();
		var buyerNm = $('#buyerNm').val();
		var selId = win.getData("selId");
//		$('#sysRefNo').val(sysRefNo);
		var trxId = win.getData("trxId");
//		var buyerId=$('#buyerId').val();
		var data = {'selId':selId,'trxId':trxId,'buyerId':buyerId,'buyerNm':buyerNm};
//		var selId =win.getData("selId");
//		var sysBusiUnit = SCFUtils.SYSBUSIUNIT;
//		var data = {'sysRefNo':sysRefNo,'sysBusiUnit':sysBusiUnit,'trxId':trxId,'selId':selId};
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
		$('#buyerId').val("");
		$('#buyerNm').val("");
	}
	
	//能否直接传target
	function doSave(win) {
//		var data = SCFUtils.convertArray('dg');
//		if(data){
//			var target = win.getData('callback');
//			target(data);
//			win.close();
//		}
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
				width : 80
			},{
				field : 'lmtBal',
				title : 'custM额度',
				width : 80,
				hidden : true
			}, {
				field : 'buyerNm',
				title : '间接客户名称',
				width : 40
			}] ]
		});
	}