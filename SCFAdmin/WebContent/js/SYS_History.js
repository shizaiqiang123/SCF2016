$(function() {
	// var url = ${sysFuncInfo.sysRefNo};
	ajaxTable();
	var options = {};
	options.url = "query";
	options.data = {cataType:'loadPara'};
	options.callBackFun = pageOnLoad;
	//SCFUtils.ajax(options);
});



function onNextBtnClick(){
	return $("#ScreenHistory").datagrid('getSelected');
}

function ajaxTable(){
	//加载表格
	$('#ScreenHistory').datagrid({
		//url: SCFUtils.AJAXURL,
		url:SCFUtils.QUERYURL,			
		queryParams: $.extend({cataType:'loadData'},dataParams),
		//queryParams: {
//			queryId:url	
		//},
		toolbar:'#toolbar',
		checkOnSelect:true,
		singleSelect:true,//只选一行
		pagination:true,//是否分页
		fitColumns:true,//列自适应表格宽度
		striped:true,//当true时，单元格显示条纹
		loadMsg:'数据加载中,请稍后...',
		onLoadError:function(){
			alert('数据加载失败!');
		},
		onLoadSuccess:function(data){
		},
		columns:[[
					{field:'id',checkbox:'true',width:20},
					{field:'sysRefNo',title:'系统编号',width:100},
					{field:'sysEventTimes',title:'批次号',width:100},					
					{field:'buyerId',title:'买方编号',width:100},
					{field:'selId',title:'卖方编号'},
					{field:'sysOpTm',title:'操作时间'},
					{field:'sysTrxSts',title:'交易状态'}
				]]
	});	 
}

function pageOnLoad(data){
	$('#ScreenHistory').datagrid('reload',data);
}