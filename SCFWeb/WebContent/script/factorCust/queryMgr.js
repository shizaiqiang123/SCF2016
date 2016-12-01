	function ignoreToolBar(){
		
	}
	
	function pageLoad(win) {
		var actorNo = win.getData("actorNo");
		//修改页面进入时，该字段未定义 导致查询数据失败
		if(SCFUtils.isEmpty(actorNo)){
			actorNo = "";
		}
		$('#actorNo').val(actorNo);
		var actorName = win.getData("actorName");
		if(SCFUtils.isEmpty(actorName)){
			actorName = "";
		}
		$('#actorName').val(actorName);
		var data = {'actorNo':actorNo,'actorName':actorName};
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
		$('#actorNo').val("");
		$('#actorName').val("");
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
				title : '系统编号',
				width : '33.33%'
			}, {
				field : 'actorNo',
				title : '操作号',
				width : '33.33%'
			}, {
				field : 'actorName',
				title : '名称',
				width : '33.33%'
			}] ]
		});
	}