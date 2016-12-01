function ignoreToolBar(){
	
}

function pageLoad(win) {
		var data = SCFUtils.convertArray('searchForm');
		$.extend(data,{'queryId':win.getData("queryId"),cacheType : 'non'});
		ajaxTable(data);
	}

	function SearchUserInfo() {
		var data = SCFUtils.convertArray('searchForm');
		var queryParams = $('#dg').datagrid('options').queryParams;
		$('#dg').datagrid('load',$.extend(queryParams,data));
	}

function onResetBtnClick() {
	$('#userId').val("");
	$('#userNm').val("");
}		
		
	//能否直接传target
	function doSave(win) {
		var selects = SCFUtils.getSelectedGridData('dg',false);
		var data =$('#dg').datagrid('getChecked');	
		var target = win.getData('callback');
		target(data);
		win.close();
	}
	
	function ajaxTable(data) {
		//加载表格
		$('#dg').datagrid({
			url: SCFUtils.AJAXURL,
			queryParams :data,
			toolbar : '#toolbar',
			checkOnSelect : true,
			singleSelect : false,//只选一行
			pagination : true,//是否分页
			fitColumns : true,//列自适应表格宽度
			striped : true,//当true时，单元格显示条纹
			loadMsg : '数据加载中,请稍后...',
			idField : 'userId',
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
				field : 'userId',
				title : '用户编号',
				width : 40
			}, {
				field : 'userNm',
				title : '用户名称',
				width : 40
			}
//			, {
//				field : 'userTp',
//				title : '用户类型',
//				width : 40
//			}, {
//				field : 'roleId',
//				title : '用户角色',
//				width : 40
//			}, {
//				field : 'busiUnit',
//				title : '业务机构',
//				width : 40
//			}
			] ]
		});
	}