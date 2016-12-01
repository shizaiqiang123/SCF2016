
function doSave(win) {
	removeAccounting(win);
	win.close();
}

function pageOnInt(){
	ajaxBox();
	SCFUtils.setTextReadonly('id', true);
	SCFUtils.setTextReadonly('name', true);
	SCFUtils.setTextReadonly('desc', true);
	SCFUtils.setTextReadonly('servicejs', true);
	SCFUtils.setTextReadonly('type', true);
}
function ajaxBox(){
	var isenable= [{"id":'Y',"text":"是",selected:true},{"id":'N',"text":"否"}];
	$("#isenable").combobox('loadData',isenable);
}

function ignoreToolBar(){
	
}

function pageLoad(win){
	var row = win.getData("row");
	var paraId=row.paraId;
	
	//修改
	var data = {
			'paraId':paraId,
			cacheType:'non',
			'ServiceType':'report',
			strBu:SCFUtils.SYSBUSIUNIT
	};
	$.extend(data,{'queryId':win.getData("queryId")});
	findAccounting(data);
}

function findAccounting(data)
{
	var options={
			url:SCFUtils.AJAXURL,
			data:data,
			async:false,
			callBackFun : function(data) {
				if (data.success) 
				{
					if(null== (data.obj))
					{
						SCFUtils.setComboReadonly('isenable', true);
						$('#isenable').combobox('setValue', 'N');
					}
					else
					{
						$('#isenable').combobox('setValue', 'Y');
						$('#id').val(data.obj.id);
						$('#name').val(data.obj.name);
						$('#desc').val("report");//后台可优化传值
//						$('#maincomp').val(data.obj.maincomp);
						$('#servicejs').val(data.obj.servicejs);
						$('#type').val(data.obj.type);
					}
				}
			}
	};
	SCFUtils.ajax(options);
}


function removeAccounting(win) {
	var rows = win.getData("row");
	var row={};
	var options = {
		async:false,
		reqid : 'I_P_000056',
		data : {
			'row' : row,
			cacheType :'non',
			requestType:'save',
			resultType:$('#isenable').combobox('getValue'),
			functionId:rows.paraId,
			resetType:'report',
			ServiceType:'report'
		},
		onSuccess:function(){
		}
	};
	SCFUtils.getData(options);
}
