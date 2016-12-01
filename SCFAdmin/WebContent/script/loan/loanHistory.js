function pageOnLoad(data){
	ajaxTable(data);
}
function pageOnPreLoad(data) {
	ajaxTable(data);
}
function pageOnResultLoad(data) {
	
}
function onNextBtnClick(){
	var grid = {};
	var griddata ;
	var mainData = SCFUtils.convertArray('ScreenUserForm');
	griddata=SCFUtils.getSelectedGridData('ScreenHistory',false);	
	grid.invc = SCFUtils.json2str(griddata);
	$.extend(mainData,grid);
	return griddata.rows0;
}

function ajaxTable(data){
	var sysRefNo=data.obj.sysRefNo;
	//加载表格
	$('#ScreenHistory').datagrid({
		url: SCFUtils.AJAXURL,
		queryParams: {
			queryId:'Q_P_000226',	
			sysRefNo:sysRefNo,
			cacheType:'non'
		},
		toolbar:'#toolbar',
		checkOnSelect:true,
		singleSelect:true,//只选一行
		pagination:true,//是否分页
		fitColumns:false,//列自适应表格宽度
		striped:true,//当true时，单元格显示条纹
		loadMsg:'数据加载中,请稍后...',
		onLoadError:function(){
			alert('数据加载失败!');
		},
		onLoadSuccess:function(data){
		},
		columns:[[
					{field:'id',checkbox:'true',width:20},
					{field:'sysRefNo',title:'融资编号',width:150},
					{field:'sysEventTimes',title:'批次号',width:150},	
					{field:'sysFuncName',title:'批次摘要',width:150},		
					{field:'sysTrxSts',title:'交易状态',width:150,formatter:trxStsFormater},
					{field:'finaSts',title:'融资状态',width:150,formatter:finaStsFormater}
				]]
	});	 
}