	function ignoreToolBar(){
	
	}
	
	function pageLoad(win) {
		//生成父页面中的datagrid中的流水号
		$("#ratDtlSysRefNo").val("");
		var optionsDetail = {};
		optionsDetail.data = {
			refName : 'RatDtlRef',
			refField : 'ratDtlSysRefNo',
			cacheType : 'non'
		};
		SCFUtils.getRefNo(optionsDetail);
		var sys = $("#ratDtlSysRefNo").val();
		var sysRefNo = win.getData("sysRefNo");
		//修改页面进入时，该字段未定义 导致查询数据失败
		if(SCFUtils.isEmpty(sysRefNo)){
			sysRefNo = "";
		}
		$('#sysRefNo').val(sysRefNo);
		
		var ratName = win.getData("ratName");
		if(SCFUtils.isEmpty(ratName)){
			ratName = "";
		}
		$('#ratName').val(ratName);
		
		var data = {'sysRefNo':sysRefNo,'ratName':ratName};
		$.extend(data,{'queryId':win.getData("queryId")});
		ajaxTable(data);
		SCFUtils.repalcePH("");
	}

	function onSearchBtnClick() {
		var data = SCFUtils.convertArray('searchForm');
		var queryParams = $('#dg').datagrid('options').queryParams;
		$('#dg').datagrid('load',$.extend(queryParams,data));
	}
	
   //重置
	function onResetBtnClick(){
	   $('#sysRefNo').val("");
	   $('#ratName').val("")
    }

	//能否直接传target
	function doSave(win) {
		var row = $('#dg').datagrid('getSelected');
		var sys = {};
		sys.ratDtlSysRefNo = $("#ratDtlSysRefNo").val();
		$.extend(row,sys);
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
			fitColumns : false,//列自适应表格宽度
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
				title : '评级内容ID',
				width : '33%'
			}, {
				field : 'ratName',
				title : '评级内容名称',
				width : '33%',
			}, {
				field : 'className',
				title : 'java类名称',
				width : '33%',
			}] ]
		});
	}