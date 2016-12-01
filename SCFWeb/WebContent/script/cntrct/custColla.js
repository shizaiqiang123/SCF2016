function ajaxBox(){
	var collatTp = [{"id":'0',"text":"[0] 其他"},{"id":'1',"text":"[1] 质押"},{"id":'2',"text":"[2] 抵押"},{"id":'3',"text":"[3] 保证"},{"id":'4',"text":"[4] 信用"}];
	$("#collatTp").combobox('loadData',collatTp);
	var optt={
			url:SCFUtils.AJAXURL,
			data: {
				queryId:'Q_P_000006'
			},
			callBackFun:function(data){
				if(data.success){
					$('#collatCcy').combobox('loadData', data.rows);					
    			}
			}
	};	
	SCFUtils.ajax(optt);
}
function ajaxTable() {
	var options = {
			//url : SCFUtils.AJAXURL,
			toolbar : '#toolbar',
			idField :  'sysRefNo',
			rownumbers : true,
			checkOnSelect : true,
			singleSelect : false,// 只选一行
			pagination : true,// 是否分页
			fitColumns : true,// 列自适应表格宽度
			striped : true, // 当true时，单元格显示条纹
			columns : [ [ {
				field : 'ck',
				checkbox : true
			},{
				field : 'sysRefNo',
				title : '流水号',
				width : 150
			},{
				field : 'uploadDesc',
				title : '文件名',
				width : 150
			},{
				field : 'templateUrl',
				title : '文件路径',
				width : 100
			},{
				field : 'trxId',
				title : '担保号',
				width : 100
			}
			] ]
		};
		$('#accessoryTable').datagrid(options);
}

function ignoreToolBar(){
	
}

function pageLoad(win) {
	ajaxBox();
	ajaxTable();
	var row = win.getData("row");
	var options = {};
	options.data = {
		refName : 'CustColla',
		refField : 'sysRefNo',
		cacheType : 'non'
	};
	options.force = true;
	if (row.op === 'add') {
		SCFUtils.getRefNo(options);
		$('#trxId').val(row.trxId);
	} else if (row.op === 'edit') {
		if (row.state === 'query') {
			SCFUtils.setFormReadonly('#custCollaForm', true);
		}
		$('#sysRefNo').val(row.sysRefNo);
		$('#trxId').val(row.trxId);
		$('#collatCorpNm').val(row.collatCorpNm);
		$('#collatNm').val(row.collatNm);
		$('#collatCcy').combobox('setValue',row.collatCcy);
		$('#collatTp').combobox('setValue',row.collatTp);
		$('#collatVal').numberbox('setValue',row.collatVal);
		$('#uploadDesc').val(row.uploadDesc);
		$('#templateUrl').val(row.templateUrl);
		$('#accessoryTable').datagrid('loadData',row.fileupload);
//		SCFUtils.loadGridData('accessoryTable', SCFUtils.parseGridData(row.fileupload), false,true);// 加载数据并保护表格。
	}
}

function doSave(win) {
	var data = SCFUtils.convertArray('custCollaForm');
	var grid = {};
	var custColla = $('#accessoryTable').datagrid('getRows');	
//	grid.fileupload = SCFUtils.json2str(custColla);
	grid.fileupload = custColla;
	$.extend(data,grid);
	if (data) {
		var target = win.getData('callback');
		target(data);
		win.close();
	}
}

/**
 * 导入
 */
function upload(){
	var param ={
			data:{'reqType' : 'fileImportManager'},
			callBackFun:function(data){
				if(data.success&&!SCFUtils.isEmpty(data)){
//					$('#accessoryTable').datagrid('appendRow',{
//						sysRefNo : SCFUtils.uuid('30'),
//						uploadDesc: data.obj.fileName,
//						templateUrl: data.obj.filePath,
//						trxId : $('#sysRefNo').val()//担保的流水号
//					});
					var rows=$('#accessoryTable').datagrid('getRows');
					var count;
					$.each(rows,function(i,n){
						count=i+1;
					});
					$('#accessoryTable').datagrid('insertRow',{
						index:count,
						row:{
							sysRefNo : SCFUtils.uuid('30'),
							uploadDesc: data.obj.fileName,
							templateUrl: data.obj.filePath,
							trxId : $('#sysRefNo').val()//担保的流水号
						}
					});

    			}
			}
	};
	SCFUtils.upload(param);		
	
}
//删除一条数据
function deleteRow() {
	var rows = $('#accessoryTable').datagrid('getSelections');
	var copyRows = [];
	for (var j = 0; j < rows.length; j++) {
		copyRows.push(rows[j]);
	}
	if (rows.length > 0) {
		$.messager.confirm('Confirm', '确定删除选中的数据吗？', function(r) {
			if (r) {
				 for(var i =0;i<copyRows.length;i++){    
			            var index = $('#accessoryTable').datagrid('getAllRowIndex',copyRows[i].sysRefNo);
			            $('#accessoryTable').datagrid('deleteRow',index); 
			        }
			}
		});
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
	
}