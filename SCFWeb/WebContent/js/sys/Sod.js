function initNotice(){
	var notice = "这里是Start of day，每日交易的开始时间在当前交易中进行。";
	return notice;
}
function pageOnLoad(data){
	$('#sysSts').val('S');
	var opt={
			url:SCFUtils.AJAXURL,
			data: {
				queryId:'Q_S_10000004',
			},
			callBackFun:function(data){
				if(data.success){
					$('#preBusiDt').datebox('setValue', data.rows[0].preStartBusiDt);
					$('#sysRefNo').val(data.rows[0].sysRefNo);
					$('#preEndBusiDt').val(data.rows[0].preEndBusiDt);
					if(data.rows[0].sysSts=='S'){
						SCFUtils.alert("系统当前状态为S，请当系统状态为E时提交！");
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
//					$('#busiDt').datebox('setValue', data.rows[0].busiDt);
    			}
			}
	};	
	SCFUtils.ajax(opt);
	SCFUtils.setDateboxReadonly('preBusiDt',true);
	SCFUtils.setTextReadonly ('sysSts',true);	

}
function onNextBtnClick(){
	$('#preStartBusiDt').val($('#busiDt').val());
	return SCFUtils.convertArray('SodForm');
}
function pageOnResultLoad(data){
	SCFUtils.loadForm('SodForm', data);
}

//	var isbol = Validator.Validate(document.getElementById("SodForm"),3);
//	if(isbol){		
//	}else{
//		 }

//function beforeLoad() {
//	var sysRefNo = $('#sysRefNo').val();
//	// var sysRefNo=SCFUtils.SYSUSERREF;
//	var data = {};
//	data.data = {
//		sysRefNo : sysRefNo
//	};
//	return data;
//}
