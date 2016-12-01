function ignoreToolBar(){
	
}
function pageOnInt(data){
	ajaxTable();
	ajaxAdviceList();
}

function ajaxTable() {
	var options = {
		rownumbers : true,
		checkOnSelect : false,
		singleSelect : true,// 只选一行
		pagination : false,// 是否分页
		fitColumns : true,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹
		onLoadSuccess:onLoadSuccess,
		columns : [ [ {
			field : 'ck',
			checkbox : true
		},{
			field : 'id',
			title : '通知编号',
			hidden:true,
			width : 220
		}, {
			field : 'name',
			title : '通知名称',
			width : 150
		},  {
			field : 'desc',
			title : '描述',
			width : 220
		},{
			field : 'type',
			title : '通知类型',
			width : 120
		}, {
			field : 'status',
			title : '状态',
			width : 120
		} , {
			field : '',
			title : '预览',
			width : 200,
			formatter:optFormater
		} 
		] ]
	};
	$('#adviceTable').datagrid(options);
}

function ajaxAdviceList() {
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			getdataId : 'I_P_000052',
			queryType : 'queryList',
			cacheType : 'non'
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				SCFUtils.loadGridData('adviceTable', data.rows);
			}
		}
	};
	SCFUtils.ajax(options);
}

function viewAdvice(index) {
	var rows=$('#adviceTable').datagrid('getRows');//获取所有当前加载的数据行
	var data=rows[index];///
	$.extend(data,{
		queryType:'preView',
		getdataId : 'I_P_000052',
		cacheType : 'non'
			});
	window.open("report?"+parseUrl(data));
}

function parseUrl(data){
	var url = "";
	 for(var key in data){  
		 url+=key+"="+  data[key]+"&";  
     }
	if(url.charAt(url.length-1)=='&'){
		url= url.substring(0,url.length-1);
	} 
	url = encodeURI(url);
	return url;
}

function optFormater(value,row,index){	
	var viewButton = '<a href="javascript:void(0)" class="startBatch" onclick="viewAdvice('+index+')"></a> ';
	return viewButton;
};

function onLoadSuccess(data){
	$('.startBatch').linkbutton({
		text:"预览通知"
	});
}
