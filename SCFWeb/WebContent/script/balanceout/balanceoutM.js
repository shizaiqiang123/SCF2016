function pageOnInt() {
	ajaxBox();
	SCFUtils.setTextReadonly('sysRefNo', true);
	SCFUtils.setTextReadonly('cntrctNo', true);
	SCFUtils.setTextReadonly('custNm', true);
	SCFUtils.setComboReadonly('outCcy', true);
	SCFUtils.setNumberboxReadonly('outAccNoAmt', true);
}

function ajaxBox() {
	//币种
	var optt={
			url:SCFUtils.AJAXURL,
			data: {
				queryId:'Q_P_000006'
			},
			callBackFun:function(data){
				if(data.success){
					$('#outCcy').combobox('loadData', data.rows);					
    			}
			}
	};	
	SCFUtils.ajax(optt);
	
}

function pageOnLoad(data) {
	SCFUtils.loadForm('invcMForm',data);
	
	if(SCFUtils.OPTSTATUS == 'ADD'){
		var options = {};
		options.data = {
			refName : 'BalRef',
			refField : 'sysRefNo'
		};
		SCFUtils.getRefNo(options);
		
		
		$('#outCcy').combobox('setValue', data.obj.lmtCcy);	
		$('#custNm').val(data.obj.selNm);
		$('#custNo').val(data.obj.selId);
	}
	
	//查询账号
	var acOwnerid = data.obj.selId;
	if(!SCFUtils.isEmpty(acOwnerid)){
		//保理专户
		var opt = {
				url : SCFUtils.AJAXURL,
				data : {
					queryId : 'Q_P_000105',
					acOwnerid : acOwnerid,
					acTp : '1'
				},
				callBackFun : function(data) {
					if (data.success && !SCFUtils.isEmpty(data.rows)) {
						$('#outAccNo').combobox('loadData', data.rows);	
						//$('#inAccNo').combobox('loadData', data.rows);	
					}
				}
		};
		SCFUtils.ajax(opt);
		
		//一般结算户
		var opt1 = {
				url : SCFUtils.AJAXURL,
				data : {
					queryId : 'Q_P_000105',
					acOwnerid : acOwnerid,
					acTp : '2'
				},
				callBackFun : function(data) {
					if (data.success && !SCFUtils.isEmpty(data.rows)) {
						//$('#outAccNo').combobox('loadData', data.rows);	
						$('#inAccNo').combobox('loadData', data.rows);	
					}
				}
		};
		SCFUtils.ajax(opt1);
	}
	
}
function pageOnResultLoad(data) {
	SCFUtils.loadForm('invcMForm',data);
}

function pageOnPreLoad(data) {
	SCFUtils.loadForm('invcMForm',data);
}

function pageOnReleasePageLoad(data) {
	SCFUtils.loadForm('invcMForm',data);
	
	//调用接口查询账户余额
	var accno = $('#outAccNo').combobox('getValue');	
	$('#outAccNoAmt').numberbox('setValue',getAccNoAmt(accno));
}

function pageOnReleaseResultLoad(data) {
	pageOnResultLoad(data);
}

function pageOnReleasePreLoad(data) {
	pageOnResultLoad(data);
}

function pageOnFPLoad(data){
	pageOnReleasePageLoad(data);
}

function onNextBtnClick() {
	//账号是否相同
	var inAccNo = $('#inAccNo').combobox('getValue');
	var outAccNo = $('#outAccNo').combobox('getValue');
	
	if(inAccNo == outAccNo){
		SCFUtils.alert("转出账号和转入账号不能相同");
		return;
	}
	
	//账户余额是否大于转出金额
	var accamt = $('#outAccNoAmt').numberbox('getValue');
	var outamt = $('#outAmt').val();
	
	var regAmt = SCFUtils.Math(accamt, outamt, 'sub');
	
	if (regAmt < 0) {
		SCFUtils.alert("账户余额不足");
		return;
	}
	
	var data = SCFUtils.convertArray('invcMForm');
	return data;
}

function showLookUpWindow(){
	
	var accno = $('#outAccNo').combobox('getValue');	
	if(SCFUtils.isEmpty(accno)){
		SCFUtils.alert("请选择转出账号");
		return;
	}
	

	//调用接口查询账户余额
	$('#outAccNoAmt').numberbox('setValue',getAccNoAmt(accno));
}

function getAccNoAmt(accno){
	var amt = 0;
	var data = {};
	var sysRefNo = $('#sysRefNo').val();
	var options = {
		url : SCFUtils.AJAXURL,
		async : false,
		data : $.extend({
			getdataId : 'I_P_00007901',
			byFunc : 'N',
			cacheType : 'non',
			sysRefNo : sysRefNo,
			currentdate : SCFUtils.getcurrentdate(),
			user_id : "zhangsa",
			user_pwd : "11111"
		}, data),
		callBackFun : function(backData) {
			var temp = backData.obj.trxDom.coreReturnCode;
			if(backData.obj.trxDom.coreReturnCode=='0000'){
				var token = backData.obj.trxDom.token;
				var data = {};
				var options = {
					url : SCFUtils.AJAXURL,
					async : false,
					data : $.extend({
						getdataId : 'I_P_00007903',
						byFunc : 'N',
						cacheType : 'non',
						sysRefNo : sysRefNo,
						currentdate : SCFUtils.getcurrentdate(),
						token : token,
						custAcNo : accno,
					}, data),
					callBackFun : function(backData) {
						if(backData.obj.trxDom.coreReturnCode=='0000'){
							amt = backData.obj.trxDom.BALAVL;
						}else{
							SCFUtils.alert('获取账号余额失败！');
							return;
						}
					}
				};
				SCFUtils.ajax(options);
			}else{
				SCFUtils.alert('获取账号余额失败！');
				return;
			}
		}
	};
	SCFUtils.ajax(options);
	
	return amt;
}


