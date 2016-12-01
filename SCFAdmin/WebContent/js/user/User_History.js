//$(function(){
//	initToolBar();	
//	ajaxTable();
//});

function pageOnLoad(data){
	initToolBar();
	ajaxTable(data);
}

function initToolBar(){
	var tlbarConfigs = {
			showButton:['home','logout','prev','cancel'],
			isShowText:true
	};
	SCFUtils.getToolBar(tlbarConfigs);	
}

function onNextBtnClick(){
	return $("#ScreenHistory").datagrid('getSelected');
}

function ajaxTable(data){
	//加载表格
	var sysRefNo = data.obj.sysRefNo;
	$('#ScreenHistory').datagrid({
		url: SCFUtils.AJAXURL,
		queryParams: {
			queryId:'Q_S_10000003',
			sysRefNo : sysRefNo
		},
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
					{field:'userId',title:'用户编号',width:100},
					{field:'userNm',title:'用户名称'},
					{field:'sysOpTm',title:'操作时间'},
					{field:'sysTrxSts',title:'交易状态'}
				]]
	});	 
}