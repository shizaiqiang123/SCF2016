function ignoreToolBar(){
	
}

function pageLoad(win) {
		var cntrctNo = win.getData("cntrctNo");
		//修改页面进入时，该字段未定义 导致查询数据失败
		if(SCFUtils.isEmpty(cntrctNo)){
			cntrctNo = "";
		}
		$('#cntrctNo').val(cntrctNo);
		var selNm = win.getData("selNm");
		if(SCFUtils.isEmpty(selNm)){
			selNm = "";
		}
		$('#selNm').val(selNm);
		var data = {'cntrctNo':cntrctNo,'selNm':selNm};
		$.extend(data,{'queryId':win.getData("queryId"),'cacheTpye':'non'});
		ajaxTable(data);
		SCFUtils.repalcePH("");
	}

   //重置
   function onResetBtnClick(){
	   $('#cntrctNo').val("");
	   $('#selNm').val("");
   }
   
   
   function onSearchBtnClick() {
		var data = SCFUtils.convertArray('searchForm');
		var queryParams = $('#dg').datagrid('options').queryParams;
		$('#dg').datagrid('load',$.extend(queryParams,data));
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
				field : 'cntrctNo',
				title : '授信额度编号',
				width : '20%'
			}, {
				field : 'sellerInstCd',
				title : '组织机构代码',
				width : '20%'
			}, {
				field : 'selNm',
				title : '授信客户名称',
				width : '20%'
			},{
				field : 'busiTp',
				title : '业务类别',
				width : '20%',
				formatter:busiTypeFormater
			},{
				field : 'lmtCcy',
				title : '授信额度币种',
				width : '20%'
			},{
				field : 'poolLine',
				title : '池水位',
				hidden : true,
				width : '20%'
			}] ]
		});
	}
	