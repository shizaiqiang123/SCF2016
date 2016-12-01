	function ignoreToolBar(){
	
	}
	function pageLoad(win) {
		var sysRefNo = win.getData("storageId");
		$('#sysRefNo').val(sysRefNo);
		var data = SCFUtils.convertArray('searchForm');
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
				field : 'sysRefNo',
				title : '仓库编号',
				width : 40
			}, {
				field : 'patnerNm',
				title : '仓库名称',
				width : 40
			}, {
				field : 'patnerAdr',
				title : '仓库地址',
				width : 40
			}, {
				field : 'contactNm',
				title : '联系人姓名',
				width : 40
			}] ]
		});
	}