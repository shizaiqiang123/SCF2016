 /**
 * 所有进入交易页面 公共的方法
 * @param data
 */
function pageOnInt(){
	ajaxTable();
}

/**
 * 申请功能时，进入结果页面
 * @param data
 */
function pageOnResultLoad(data) {

	var orgnJson = SCFUtils.parseGridData(data.obj.accounting);
	
	SCFUtils.loadGridData('subjectsTable',orgnJson, true);
}

function beforeLoad() {	
	var data = {};
	data.data = {cacheType:'non'};
	return data;
}


function pageOnLoad(data) {	
//	$('#subjectsTable').datagrid('loadData',data);
	var array =[];
	$.each(data.rows,function(i,m){
		if(m.amt!=0){
			array.push(m);
		}
	});	
	SCFUtils.loadGridData('subjectsTable',array,true,true);	
}

//function pageOnPreLoad(data) {
//	var orgnJson = SCFUtils.parseGridData(data.obj.accounting);
//	
//	SCFUtils.loadGridData('subjectsTable',orgnJson, true);
//}

function onPrevBtnClick(){
	//return onNextBtnClick();
}

function onNextBtnClick() {
	var data =SCFUtils.getGridData('subjectsTable',false);	
	var retMap = {};
	retMap.accounting = SCFUtils.json2str(data);
	return retMap;
}

function stylerFormatter(value, row, index) {
	if (row.trxTp === 'C') {
		return 'text-align:right;';
	} else {
		return 'text-align:leht;';
	}
}

function ajaxTable() {	
	// 加载表格
	var options = {
		toolbar : '#toolbar',
		//rownumbers : true,
		checkOnSelect : true,
		singleSelect : true,// 只选一行
		pagination : false,// 是否分页
		fitColumns : true,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹
		showFooter: true, //显示行脚。		
		columns : [ [ {
			field : 'trxTp',
			title : '科目类型',
			width : 40,
			halign:'center',
			formatter:function(value,row,index){
				if(value==='C'){
					return '贷:';
				}else{
					return '借:';
				}
			},
			styler:stylerFormatter
		},{
			field : 'accNo',
			title : '会计科目',			
			align : 'center',
			width : 120
		},{
			field : 'ccy',
			title : '币别',
			align : 'center',
			width : 30
		},{
			field:'amt',
			title:'金额',
			halign:'center',			
			width:70,
			formatter:ccyFormater,
			styler:stylerFormatter
		},{
			field : 'exchRate',
			title : '汇率',
			align : 'center',
			width : 30,
			hidden : true
		},{
			field : 'relRefNo',
			title : '申请编号',
			align : 'center',
			width : 30,
			hidden : true
		},{
			field : 'cretTm',
			title : '出账日期',
			width : 120,
			align: 'center',			
			formatter:dateFormater
		} ] ]
	};		
	$('#subjectsTable').datagrid(options); 
}
