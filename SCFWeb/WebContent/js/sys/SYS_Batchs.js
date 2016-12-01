function pageOnInt(){
	ajaxTable();
	$('#mainDiv').hide();
}

function onNextBtnClick() {
	var data =$("#batchTable").datagrid('getSelected');	
//	var data =SCFUtils.serializeGridData('batchTable');	
	return data;
}

function ajaxTable() {
	// 加载表格
	var options = {
		url : SCFUtils.QUERYURL,
		queryParams : {
			reqBatchType:'inq-all',
			cacheType : 'non'
		},
		//toolbar : '#toolbar',
		rownumbers : true,
		checkOnSelect : true,
		singleSelect : true,// 只选一行
		pagination : true,// 是否分页
		fitColumns : true,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹
		loadFilter : pagerFilter,
		columns : getColumns(),
		onLoadSuccess:onLoadSuccess		
	};
	$('#batchTable').datagrid(options);
}

function pagerFilter(data){
    if (typeof data.length == 'number' && typeof data.splice == 'function'){    // 判断数据是否是数组
        data = {
            total: data.length,
            rows: data
        }
    }
    var dg = $(this);
    var opts = dg.datagrid('options');
    var pager = dg.datagrid('getPager');
    pager.pagination({
        onSelectPage:function(pageNum, pageSize){
            opts.pageNumber = pageNum;
            opts.pageSize = pageSize;
            pager.pagination('refresh',{
                pageNumber:pageNum,
                pageSize:pageSize
            });
            dg.datagrid('loadData',data);
        }
    });
    if (!data.originalRows){
        data.originalRows = (data.rows);
    }
    var start = (opts.pageNumber-1)*parseInt(opts.pageSize);
    var end = start + parseInt(opts.pageSize);
    data.rows = (data.originalRows.slice(start, end));
    return data;
}

function getColumns(){
	return [ [ {
		field : 'ck',
		checkbox : true
	}, {
		field : 'batchId',
		title : '批处理编号',
		width : 120
	}, {
		field : 'batchName',
		title : '批处理描述',
		width : 200
	}, {
		field : 'batchType',
		title : '批处理类型',
		width : 100,
		formatter:typeFormatter
	},  {
		field : 'batchStatus',
		title : '批处理状态',
		width : 100
	}, {
		field : 'loanId',
		title : '操作',
		width : 300,
		formatter:optFormater
	} ] ];
}

function typeFormatter(value,row,index){
	if("M"===value){
		return "手动";
	}
	if("A"===value){
		return "自动";
	}
}

function onLoadSuccess(data){
	$('.startBatch').linkbutton({
		text:"开启"
	});
	$('.stopBatch').linkbutton({
		text:"停止"
	});
	$('.runBatch').linkbutton({
		text:"立即执行"
	});
}


function optFormater(value,row,index){	
	var startBatch = '<a href="javascript:void(0)" class="startBatch" onclick="ajaxBatch(\''+row.batchId+'\',\''+row.batchType+'\',\'start\')"></a> ';
	var stopBatch = '<a href="javascript:void(0)" class="stopBatch" onclick="ajaxBatch(\''+row.batchId+'\',\''+row.batchType+'\',\'stop\')"></a> ';	
	var runBatch = '<a href="javascript:void(0)" class="runBatch" onclick="ajaxBatch(\''+row.batchId+'\',\''+row.batchType+'\',\'run\')"></a> ';
	if("M"===row.batchType){
		return runBatch;
	}else{
		if("stopped"===row.batchStatus){		
			return startBatch+runBatch;	
		}else if("started"===row.batchStatus){
			return stopBatch+runBatch;
		}
	}	
};

function ajaxBatch(batchId,batchType,flag){
	var opts = {
		url:SCFUtils.AJAXURL,
		data:{
			batchId:batchId,	
			reqBatchType:flag,			
			batchType:batchType,
			cacheType : 'non'
		},
		callBackFun:changeType
	};
	SCFUtils.ajax(opts);
}

function changeType(data){
	if(data.success){
		SCFUtils.alert("执行成功");
	}
	$('#batchTable').datagrid('reload');	
}

function startAllBatch(){
	optAllBatch("start-all");
}

function stopAllBatch(){
	optAllBatch("stop-all");
}

function optAllBatch(reqBatchType){
	var opts = {
			url:SCFUtils.AJAXURL,
			data:{				
				reqBatchType:reqBatchType,			
				cacheType : 'non'
			},
			callBackFun:changeType
		};
	SCFUtils.ajax(opts);
}