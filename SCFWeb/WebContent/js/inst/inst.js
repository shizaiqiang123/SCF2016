function ajaxBox(){
	var brTp = [{"id":'0',"text":"总行"},{"id":'1',"text":"分行"},{"id":'2',"text":"支行"},{"id":'3',"text":"办事处"}];
	$("#brTp").combobox('loadData',brTp);
	
	//初始化上层节点信息
	var parentBr = $('#parentBr').val();
	var opt={
			url:SCFUtils.AJAXURL,
			data: {
				queryId:'Q_P_00002010',
				sysRefNo:parentBr
			},
			callBackFun:function(data){
				if(data.success){
					$('#parentBr').combobox('loadData', data.rows);					
    			}
			}
	};	
	SCFUtils.ajax(opt);
	
	//初始化国家
	var opt1={
			url:SCFUtils.AJAXURL,
			data: {
				queryId:'Q_P_000328',
				sysRefNo:'CHN'
			},
			callBackFun:function(data){
				if(data.success){
					$('#brOwnerCtry').combobox('loadData', data.rows);					
    			}
			}
	};	
	SCFUtils.ajax(opt1);
	
}

function pageOnLoad(data){
	
	SCFUtils.loadForm('instForm',data);
	
	if(!SCFUtils.isEmpty(SCFUtils.OPTSTATUS)&&SCFUtils.OPTSTATUS=='ADD'){
		var options = {};
		options.data = {
				refName : 'InstNo',
				refField :'sysRefNo'
		};
		SCFUtils.getRefNo(options);
	}
	
	ajaxBox();
}

//删除网点前验证
function checkDel(){
	var result = true;
	var sysRefNo = $('#sysRefNo').val();
	var ops = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_00002020',
				sysRefNo : sysRefNo
			},
			callBackFun : function(data) {
				if(!SCFUtils.isEmpty(data.rows[0])){
					result = false;
				}
			}
		};
	SCFUtils.ajax(ops);
	
	return result;
}


function onNextBtnClick(){
	if(SCFUtils.OPTSTATUS == 'DELETE' && !checkDel()){
		SCFUtils.alert('该网点下还有未删除的下属网点！');
		return;
	}
	
	return SCFUtils.convertArray('instForm');
}

function pageOnInt(data){
	SCFUtils.setTextReadonly('sysRefNo', true);
	if(SCFUtils.OPTSTATUS == 'EDIT'){
		SCFUtils.setComboReadonly('parentBr', true);
		SCFUtils.setComboReadonly('brTp', true);
	}
}

//根据网点类型查询上层节点信息
function changeBrTp(){
	var brTp = $('#brTp').combobox('getValue');
	var sysRefNo = $('#sysRefNo').val();
	if(!SCFUtils.isEmpty(brTp)){
		if(brTp=='0'){
			SCFUtils.setDateboxReadonly('parentBr', true);
		}else{
			$('#parentBr').combobox('setValue','');
			SCFUtils.setDateboxReadonly('parentBr', false);
			//分行
			if(brTp == '1'){
				brTp = '0';
			//支行
			}else if(brTp == '2'){
				brTp = '1';
			}else{
				brTp = '';
			}
		}
		
		//初始化所有上层节点信息
		var opt={
				url:SCFUtils.AJAXURL,
				data: {
					queryId:'Q_P_000020',
					sysRefNo:sysRefNo,
					brTp:brTp
				},
				callBackFun:function(data){
					if(data.success){
						$('#parentBr').combobox('loadData', data.rows);					
	    			}
				}
		};	
		SCFUtils.ajax(opt);
	}

}