//	function ignoreToolBar(){
//	
//	}
	
	function initToolBar() {
		var showButton = [ 'cancel' ];

		return showButton;
	}

	function pageLoad(win) {
//		var collatId = win.getData("collatId");
//		$('#collatId').val(collatId);
		var regNo = win.getData("regNo");
		$('#regNo').val(regNo);
		var data = SCFUtils.convertArray('searchForm');
		
		$.extend(data,{'queryId':win.getData("queryId")});
		ajaxTable(data);
		SCFUtils.repalcePH("");
	}

	function SearchGoodsInfo() {
		var data = SCFUtils.convertArray('searchForm');
		var queryParams = $('#dg').datagrid('options').queryParams;
		$('#dg').datagrid('load',$.extend(queryParams,data));
	}

	function onResetBtnClick() {
		$('#collatId').val("");
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
				field : 'goodsCata',
				title : '商品大类',
				width : 40,
				hidden : true
			},{
				field : 'subCata',
				title : '商品子类',
				width : 40,
				hidden : true
			},{
				field : 'goodsId',
				title : '商品编号',
				width : 40
			}, {
				field : 'goodsNm',
				title : '商品名称',
				width : 40
			}, {
				field : 'price',
				title : '最新单价',
				width : 40
			},{
				field : 'ccy',
				title : '币别',
				width : 40
			}, {
				field : 'collatAdjDt',
				title : '更新日期',
				width : 40
			}, {
				field : 'producer',
				title : '生产厂家',
				width : 40
			}] ]
		});
	}