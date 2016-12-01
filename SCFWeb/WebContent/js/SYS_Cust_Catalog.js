function initToolBar(){
	return ['next','cancel'];
}

function beforeLoad(){
	var data = {
			data:{cataType:'loadPara',cacheType:'non'}
		};
  	return data;
}

function pageOnReleasePageLoad(data){
	pageOnLoad(data);
}

/**
 * 初始化页面数据
 */
function pageOnLoad(data){	
	var screenDiv = $('#screenDiv');	
	var tr =null;
	$.each(data.obj.search,function(i,n){		
		if((i%2)==0){
			tr=$('<tr>').appendTo(screenDiv);			
		}	
		var td = $('<td class="words">').appendTo(tr);
		$('<label>').html(n.title+":").val(n.defaultvalue).appendTo(td);
		td = $('<td align="left">').appendTo(tr);
		$('<input>').attr('name',n.field).val(n.defaultvalue).appendTo(td);
	});	
	ajaxTable(data);
	
	var data = [{"id":'F_P_TEST_0004',"text":"测试AP功能"},{"id":'F_P_TEST_0003',"text":"复合交易"},{"id":'F_P_000022','text':'买方还款'}
	,{"id":'F_P_000020','text':'国内保理融资申请'}];
	$("#functionId").combobox('loadData',data);
	
	data = [{"id":'0',"text":"国内保理"},{"id":'1',"text":"预付类融资"},{"id":'2',"text":"动产质押融资"}];
	$("#consId").combobox('loadData',data);
}

/**
 * 查询
 */
function onSearchBtnClick(){	
	var data = SCFUtils.convertArray('ScreenMenuForm');	
	$("#ScreenMenuTable").datagrid('load',
			$.extend({
				queryId:'Q_S_10000001',
				cacheType:'non'
				},data));
}

/**
 * 下一步
 */
function onNextBtnClick(){
	var data =$("#ScreenMenuTable").datagrid('getSelected');
//	var p = {};
//	p.cust = SCFUtils.json2str(data);
//	var formData = SCFUtils.convertArray('ScreenMenuForm');
//	$.extend(data,{consId:$('#consId').combobox('getValue'),sysFuncId:$('#functionId').combobox('getValue')});
	return data;
}

/**
 * 获取动态列
 */
function getColumns(data){
	var columns = '['+json2str(data)+']';
	return eval(columns);
}

function getRed(value,row,index){
	if(value==="Y"){
		return 'background-color:#ffee00;color:red;';
	}
}

function json2str(o) {
	var arr = [];
	var fmt = function(s) {
		if (typeof s == 'object' && s != null) {

			return json2str(s);
		}
		return /^(string|number)$/.test(typeof s) ? "'" + s + "'" : s;
	};
	if (SCFUtils.isArray(o)) {
		return JsonArrayToStringCfz(o);
	} else {
		for ( var i in o){
			if((i==='formatter'||i==='styler'||i==='sorter')&&!SCFUtils.isEmpty(fmt(o[i]))){
				arr.push("'" + i + "':eval(" + fmt(o[i])+")");
			}else{
				arr.push("'" + i + "':" + fmt(o[i]));
			}
		}
		return '{' + arr.join(',') + '}';
	}
};

function JsonArrayToStringCfz(jsonArray) {
	var JsonArrayString = "[";
	for (var i = 0,max = jsonArray.length; i < max; i++) {
		if (i == (max - 1)) {
			JsonArrayString = JsonArrayString + json2str(jsonArray[i]);
		} else {
			JsonArrayString = JsonArrayString + json2str(jsonArray[i]) + ",";
		}
	}
	JsonArrayString = JsonArrayString + "]";
	return JsonArrayString;
};


/**
 * 加载表格
 */
function ajaxTable(data){
	var columns = getColumns(data.obj.select);
	var dataParams = SCFUtils.convertArray('ScreenMenuForm');
	//加载表格
	var options = {			
			url:SCFUtils.QUERYURL,			
			queryParams: $.extend({cataType:'loadData',cacheType:'non'},dataParams),
			toolbar:'#toolbar',
			checkOnSelect:true,
			singleSelect:true,//只选一行
			pagination:true,//是否分页
			fitColumns:true,//列自适应表格宽度
			striped:true, //当true时，单元格显示条纹	
			columns: columns //动态列
	};
	$('#ScreenMenuTable').datagrid(options);	
}