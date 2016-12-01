var editIndex = undefined;

function endEditing(){
	if (editIndex == undefined){return true;}
	if ($('#gridAddArInfo').datagrid('validateRow', editIndex)){
		var ed = $('#gridAddArInfo').datagrid('getEditor', {index:editIndex,field:'adva_amt'});
		var adva_amt = $(ed.target).numberbox('getValue');
		$('#gridAddArInfo').datagrid('getRows')[editIndex]['adva_amt'] = productname;
		$('#gridAddArInfo').datagrid('endEdit', adva_amt);
		editIndex = undefined;
		return true;
	} else {
		return false;
	}
}

function onAvaamtCellClick(index, field, value){
	if (editIndex != index){
		if (endEditing()){
			$('#gridAddArInfo').datagrid('selectRow', index)
					.datagrid('beginEdit', index);
			editIndex = index;
		}
	}
}

function onArBeforeEdit(rowIndex, rowData){
	var ed = $('#gridAddArInfo').datagrid('getEditor', {index:editIndex,field:'adva_amt'});
	var opts = $(ed.target).numberbox('options');
	opts.max = rowData.max_adva_amt;
	opts.precision = CCY[rowData.ar_ccy].precision;
	opts.min = 0;
}