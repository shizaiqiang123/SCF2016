	function ignoreToolBar(){
		
	}
	
	function pageLoad(win) {
		var sysRefNo = win.getData("sysRefNo");
		//修改页面进入时，该字段未定义 导致查询数据失败
		if(SCFUtils.isEmpty(sysRefNo)){
			sysRefNo = "";
		}
		$('#sysRefNo').val(sysRefNo);
		var industryNm = win.getData("industryNm");
		if(SCFUtils.isEmpty(industryNm)){
			industryNm = "";
		}
		$('#industryNm').val(industryNm);
		var data = {'sysRefNo':sysRefNo,'industryNm':industryNm};
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
		$('#screenDiv').form('clear');
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
				title : '行业编号',
				width : '50%'
			}, {
				field : 'industryNm',
				title : '行业名称',
				width : '50%'
			}] ]
		});
	}