function pageOnInt(){
	ajaxTable();
}

/*不加载按钮 */
function ignoreToolBar(){
	
}

function optFormater(value,row,index){
	var opt = '<a href="javascript:void(0)" class="startBatch" '+
	'onclick="downFile(\''+row+'\')">下载</a> ';	
	return opt;	
}

function downFile(row){
	location.href=SCFUtils.DOWNLOAD+"?filePath="+row.fielPath;
}

function ajaxTable() {	
	// 加载表格
	var options = {
		checkOnSelect : true,
		singleSelect : true,// 只选一行
		pagination : false,// 是否分页
		fitColumns : true,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹
		showFooter: true, //显示行脚。		
		columns : [ [ {
			field : 'ck',
			checkbox : true
		},{
			field : 'fileName',
			title : '文件名',
			width : 120,
			halign:'center'
		},{
			field : 'filePath',
			title : '文件路径',			
			align : 'center',
			width : 120
		},{
			field : 'opts',
			title : '操作',			
			align : 'center',
			width : 40,
			formatter:optFormater
		}]]
	};		
	$('#modelsTable').datagrid(options); 
}