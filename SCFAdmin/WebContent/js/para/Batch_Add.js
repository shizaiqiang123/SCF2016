function pageOnInt() {
	ajaxScheduleTable();
	ajaxTaskTable();
	ajaxBox();
}

function ajaxSysRefNo(){
	if('PARAADD'===SCFUtils.OPTSTATUS){
		var newsysRefNo=SCFUtils.uuid(32);
		$('#sysRefNo').val(newsysRefNo);
	}
}

function pageOnFPLoad(data){
	SCFUtils.loadForm('mainForm',data);
}

function pageOnResultLoad(data) {
	SCFUtils.loadForm('mainForm', data);
	
	if(data.obj.schedule&&!SCFUtils.isEmpty(data.obj.schedule))
		SCFUtils.loadGridData('scheduleDg',SCFUtils.parseGridData(data.obj.schedule), true);
	if(data.obj.task&&!SCFUtils.isEmpty(data.obj.task))
		SCFUtils.loadGridData('taskDg',SCFUtils.parseGridData(data.obj.task), true);
}

function pageOnPreLoad(data) {
	SCFUtils.loadForm('mainForm', data);
	
	if(data.obj.schedule&&!SCFUtils.isEmpty(data.obj.schedule))
		SCFUtils.loadGridData('scheduleDg',SCFUtils.parseGridData(data.obj.schedule), false);
	if(data.obj.task&&!SCFUtils.isEmpty(data.obj.task))
		SCFUtils.loadGridData('taskDg',SCFUtils.parseGridData(data.obj.task), false);
}

function newId(){
	var options={};
	options.data = {
			refName: 'BatchRef',
			refField:'id'
				};
	options.force=true;
	SCFUtils.getRefNo(options);
	/*
	 * 获取新编号后，去判断#id的div有无值,无值不做处理
	 * 有去除这个id的validatebox-invalid方法，不去除*号了
	 * new on 20160829 by JinJH
	 */
	if($('#id').val()!=null){//$('#cntrctNo')为查询左边的div的id
		$('#id').removeClass('validatebox-invalid');
	}
}

//function onSaveBtnClick() {
//	
//}

function onNextBtnClick() {
	var data = SCFUtils.convertArray('mainForm');
	var scheduleList = SCFUtils.getGridData('scheduleDg');
	var grid={};
	if(scheduleList._total_rows!=0){
		grid.schedule = SCFUtils.json2str(scheduleList);
	}
	var taskList = SCFUtils.getGridData('taskDg');
	if(taskList._total_rows!=0){
		grid.task = SCFUtils.json2str(taskList);
	}
	$.extend(data,grid);
	return data;
}

function pageOnLoad(data){
	SCFUtils.loadForm('mainForm',data.obj);
	ajaxSysRefNo();
	if(data.obj.schedule&&!SCFUtils.isEmpty(data.obj.schedule.express))
//		$('#scheduleDg').datagrid('loadData',data.obj.schedule);
		$('#scheduleDg').datagrid('appendRow',{
			beginfrom:data.obj.schedule.beginfrom,
			checkholiday:data.obj.schedule.checkholiday,
			scheduletype: data.obj.schedule.scheduletype,
			express: data.obj.schedule.express
		});
	if(data.obj.task&&!SCFUtils.isEmpty(data.obj.task.id))
//		$('#taskDg').datagrid('loadData',data.obj.task);
		$('#taskDg').datagrid('appendRow',{
			id:data.obj.task.id,
			name:data.obj.task.name,
			desc:data.obj.task.desc,
			type:data.obj.task.type
		});
}

function ajaxBox(){
	var type = [{"id":'A',"text":"自动"},{"id":'M',"text":"手动"}];
	$('#type').combobox('loadData',type);
	$('#type').combobox({
		onSelect: function(){
			if("A"==($('#type').combobox('getValue'))){
				$('#scheduleDiv').show();
			}else{
				$('#scheduleDiv').hide();
			}
		}
	});
}

function ajaxScheduleTable() {
	var options = {
		toolbar : '#toolbar',
		rownumbers : true,
		checkOnSelect : true,
		singleSelect : true,// 只选一行
		pagination : false,// 是否分页
		fitColumns : true,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹
		idField : 'id',
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, 
		{
			field : 'beginfrom',
			title : 'beginfrom',
			width : 70,
		}, {
			field : 'checkholiday',
			title : 'checkholiday',
			width : 70
		}, {
			field : 'scheduletype',
			title : 'scheduletype',
			width : 70
		}, {
			field : 'express',
			title : 'express',
			width : 70
		},{
			field : 'bu',
			title : 'bu',
			hidden : true
		}, {
			field : 'condition',
			title : 'condition',
			hidden : true
		}, {
			field : 'date',
			title : 'date',
			hidden : true
		}, {
			field : 'hour',
			title : 'hour',
			hidden : true
		}, {
			field : 'initialize',
			title : 'initialize',
			hidden : true
		}, {
			field : 'isbybu',
			title : 'isbybu',
			hidden : true
		}, {
			field : 'minute',
			title : 'minute',
			hidden : true
		}, {
			field : 'month',
			title : 'month',
			hidden : true
		}, {
			field : 'week',
			title : 'week',
			hidden : true
		}, {
			field : 'second',
			title : 'second',
			hidden : true
		}, {
			field : 'terminativedate',
			title : 'terminativedate',
			hidden : true
		}] ]
	};
	$('#scheduleDg').datagrid(options);
}

function ajaxTaskTable() {
	var options = {
		toolbar : '#toolbar',
		rownumbers : true,
		checkOnSelect : true,
		singleSelect : true,// 只选一行
		pagination : false,// 是否分页
		fitColumns : true,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹
		idField : 'id',
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, 
		{
			field : 'id',
			title : 'id',
			width : 70
		}, {
			field : 'name',
			title : 'name',
			width : 70
		}, {
			field : 'desc',
			title : 'desc',
			width : 70
		}, {
			field : 'type',
			title : 'type',
			width : 70
		}, {
			field : 'catalog',
			title : 'catalog',
			hidden : true
		}, {
			field : 'component',
			title : 'component',
			hidden : true
		}, {
			field : 'gapiid',
			title : 'gapiid',
			hidden : true
		}, {
			field : 'js',
			title : 'js',
			hidden : true
		}, {
			field : 'jspfile',
			title : 'jspfile',
			hidden : true
		}, {
			field : 'singlethread',
			title : 'singlethread',
			hidden : true
		}, {
			field : 'sqlcondition',
			title : 'sqlcondition',
			hidden : true
		}] ]
	};
	$('#taskDg').datagrid(options);
}

function addSchedule() {
	if($('#scheduleDg').datagrid('getRows')==""){
		var row = {};
		row.op ='add';
		var options = {
				title:'新增Schedule',
				reqid : 'I_P_000041',
				data : {
					'row' : row,
					cacheType :'non'
				},
				onSuccess : addScheduleSuccess
		};
		SCFUtils.getData(options);
	}else{
		SCFUtils.alert('已添加schedule数据！');
		return;
	}
}

function addScheduleSuccess(data){
	$('#scheduleDg').datagrid('insertRow', {
		index:data.index,
		row : data
	});
	$('#scheduleDg').datagrid('reload');
//	$('#addSchedule').linkbutton('disable');
}

function editSchedule() {
	var selectRow = $('#scheduleDg').datagrid('getSelected');
	var rowIndex = $('#scheduleDg').datagrid('getRowIndex',selectRow);
	if (selectRow) {
		var rows=$('#scheduleDg').datagrid('getRows');//获取所有当前加载的数据行
		var data=rows[rowIndex];
		
		var row = {};
		//row.index = $('#pageDg').datagrid('getRows').length;
		row.op ='edit';
		row.data = data;
		$.extend(row,data);
		var options = {
			title:'修改Schedule',
			reqid : 'I_P_000041',
			data : {
				'row' : row,
				cacheType :'non'
			},
			onSuccess : editScheduleSuccess
		
		};
		SCFUtils.getData(options);
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
}

function editScheduleSuccess(data){
	var row = $('#scheduleDg').datagrid('getSelected');
	var rowIndex = $('#scheduleDg').datagrid('getRowIndex', row);
	$.extend(row,{
		beginfrom : data.beginfrom,
		checkholiday : data.checkholiday,
		scheduletype : data.scheduletype,
		express : data.express,
		bu : data.bu,
		condition : data.condition,
		date : data.date,
		hour : data.hour,
		initialize : data.initialize,
		isbybu : data.isbybu,
		minute : data.minute,
		month : data.month,
		week : data.week,
		second : data.second,
		terminativedate : data.terminativedate,
		express : data.express
	});
	$('#scheduleDg').datagrid('refreshRow',rowIndex);
}

function delSchedule() {
	var row = $('#scheduleDg').datagrid('getSelected');
	if (row) {
		$.messager.confirm('Confirm', '确定删除该行数据吗？', function(r) {
			if (r) {
				var rowIndex = $('#scheduleDg').datagrid('getRowIndex',row);
				$('#scheduleDg').datagrid('deleteRow', rowIndex);
//				$('#addSchedule').linkbutton('enable');
			}
		});
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
}

function addTask() {
	if($('#taskDg').datagrid('getRows')==""){
		var row = {};
		row.op ='add';
		var options = {
			title : '新增Task',
			reqid : 'I_P_000042',
			data : {
				'row' : row,
				cacheType :'non'
			},
			onSuccess : addTaskSuccess
		};
		SCFUtils.getData(options);
	}else{
		SCFUtils.alert('已添加task数据！');
		return;
	}
	
}

function addTaskSuccess(data){
	$('#taskDg').datagrid('insertRow', {
		index:data.index,
		row : data
	});
	$('#taskDg').datagrid('reload');
//	$('#addTask').linkbutton('disable');
}

function editTask() {
	var selectRow = $('#taskDg').datagrid('getSelected');
	var rowIndex = $('#taskDg').datagrid('getRowIndex',selectRow);
	if (selectRow) {
		var rows=$('#taskDg').datagrid('getRows');//获取所有当前加载的数据行
		var data=rows[rowIndex];
		
		var row = {};
		row.op ='edit';
		row.data = data;
		$.extend(row,data);
		var options = {
			title : '修改Task',
			reqid : 'I_P_000042',
			data : {
				'row' : row,
				cacheType :'non'
			},
			onSuccess : editTaskSuccess
		
		};
		SCFUtils.getData(options);
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
}

function editTaskSuccess(data){
	var row = $('#taskDg').datagrid('getSelected');
	var rowIndex = $('#taskDg').datagrid('getRowIndex', row);
	$.extend(row,{
		id : data.id,
		name : data.name,
		desc : data.desc,
		type : data.type,
		catalog : data.catalog,
		component : data.component,
		gapiid : data.gapiid,
		js : data.js,
		jspfile : data.jspfile,
		singlethread : data.singlethread,
		sqlcondition : data.sqlcondition
	});
	$('#taskDg').datagrid('refreshRow',rowIndex);
}

function delTask() {
	var row = $('#taskDg').datagrid('getSelected');
	if (row) {
		$.messager.confirm('Confirm', '确定删除该行数据吗？', function(r) {
			if (r) {
				var rowIndex = $('#taskDg').datagrid('getRowIndex',row);
				$('#taskDg').datagrid('deleteRow', rowIndex);
//				$('#addTask').linkbutton('enable');
			}
		});
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
}
