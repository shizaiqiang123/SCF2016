function pageOnLoad(data){
	ajaxTable(data);
}
function pageOnPreLoad(data) {
	ajaxTable(data);
}
function pageOnResultLoad(data) {
	
}
function onNextBtnClick(){
	var griddata = {} ;
	griddata=SCFUtils.getSelectedGridData('ScreenHistory',false);	
	return griddata.rows0;
}

function ajaxTable(data){
	var sysRefNo=data.obj.sysRefNo;
	//加载表格
	$('#ScreenHistory').datagrid({
		url: SCFUtils.AJAXURL,
		queryParams: {
			queryId:'Q_P_000251',	
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
					{field:'sysRefNo',title:'协议编号',width:100},
					{field:'sysEventTimes',title:'批次号',width:100},	
					{field:'busiTp',title:'业务类别',width:100,formatter:busiTpFormater},	
					{field:'buyerNm',title:'成员企业',width:280},	
					{field:'sysTrxSts',title:'交易状态',width:100,formatter:trxStsFormater},
					{field:'approvalSts',title:'审批状态',width:100,formatter:approvalStsFormater}
				]]
	});	 
}