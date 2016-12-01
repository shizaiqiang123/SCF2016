function initNotice(){
	var notice = "这里是End of day，每日交易的结束时间在当前交易中进行。";
	return notice;
}
function pageOnLoad(data){
	SCFUtils.setTextReadonly('sysSts', true);
	$('#sysSts').val('E');
	var opt={
			url:SCFUtils.AJAXURL,
			data: {
				queryId:'Q_S_10000004',
			},
			callBackFun:function(data){
				if(data.success){
//					$('#preBusiDt').val(data.rows[0].preBusiDt);
//					$('#busiDt').val(data.rows[0].busiDt);
					$('#sysRefNo').val(data.rows[0].sysRefNo);
					$('#preBusiDt').datebox('setValue', data.rows[0].preEndBusiDt);
					$('#preStartBusiDt').val(data.rows[0].preStartBusiDt);
					if(data.rows[0].sysSts=='E'){
						SCFUtils.alert("系统当前状态为E，请当系统状态为S时提交！");
						SCFUtils.setDateboxReadonly('busiDt',true);
						var tlbarConfigs  = {
								showButton : ['cancel' ],
								isShowText : true
							};
						var tlbarDefine = [ {
							name : 'cancel',
							text : '取消',
							cls : 'btnRed',
							click : 'onCancelBtnClick'
						}

						];

						SCFUtils.getToolBar(tlbarConfigs, tlbarDefine);
					}
    			}
			}
	};	
	SCFUtils.ajax(opt);
	SCFUtils.setDateboxReadonly('preBusiDt',true);
//	var data=SCFUtils.convertArray('EodForm');
//	return data;
}
//function beforeLoad() {
//	var sysRefNo = $('#sysRefNo').val();
//	// var sysRefNo=SCFUtils.SYSUSERREF;
//	var data = {};
//	data.data = {
//		sysRefNo : sysRefNo
//	};
//	return data;
//}

function pageOnResultLoad(data){
	SCFUtils.loadForm('EodForm', data);
}
function onNextBtnClick(){
	$('#preEndBusiDt').val($('#busiDt').val());
	return SCFUtils.convertArray('EodForm');
//	var isbol = Validator.Validate(document.getElementById('EodForm'),3);
//	if(isbol){		
//	}else{
//		 }
}

