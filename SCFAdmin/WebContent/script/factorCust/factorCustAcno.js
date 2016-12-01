function ignoreToolBar(){
	
}
function pageLoad(win) {
	
//	SCFUtils.setComboReadonly("ccy", true);
//	SCFUtils.setTextReadonly("acNm", true);
//	SCFUtils.setTextReadonly("acBkNm", true);
//	SCFUtils.setTextReadonly("acBkName", true);
	ajaxBox();
	
	var row = win.getData("row");
	if (row.op === 'add') {
		var options = {};
		options.data = {
			refName : 'AcNo',
			refField : 'sysRefNo',
			cacheType : 'non'
		};
		options.force = true;
		SCFUtils.getRefNo(options);
		
		$('#acOwnerid').val(row.acOwnerid);
		$('#acOwnerName').val(row.acOwnerName);
		$('#acOwnerType').val(row.acOwnerType);
	} else if (row.op === 'edit') {
		if (row.state === 'query') {
			SCFUtils.setFormReadonly('#factorAcnoForm', true);
		}
		$('#acOwnerid').val(row.acOwnerid);
		$('#acOwnerName').val(row.acOwnerName);
		$('#acOwnerType').val(row.acOwnerType);
		$('#sysRefNo').val(row.sysRefNo);
		$('#acTp').combobox('setValue',row.acTp);
		$('#ccy').combobox('setValue',row.ccy);
		$('#relavOwnerid').val(row.relavOwnerid);
		$('#acNo').numberbox('setValue',row.acNo);
		$('#acNm').val(row.acNm);
		$('#acBkNm').val(row.acBkNm);
		$('#acBkNo').val(row.acBkNo);
		$('#acBkName').val(row.acBkName);
		$('#isAutoVerif').combobox('setValue',row.isAutoVerif);
		$('#verifSeq').combobox('setValue',row.verifSeq);
		$('#oldAcNo').val(row.acNo);
		//检查去除红字必输
		SCFUtils.eachElement('factorAcnoForm');
	}
	//queryAcNo();
}

function doSave(win) {
	var data = SCFUtils.convertArray('factorAcnoForm');
	var oldAcNo = $('#oldAcNo').val();
	var acNo = $('#acNo').numberbox('getValue');
	if(oldAcNo != acNo && checkAcNoorTp()){
		return;
	}
	
	if (data) {
		var target = win.getData('callback');
		target(data);
		win.close();
	}
}

function ajaxBox() {
	var acTp = [{"id":'1',"text":"保理专户"},{"id":'2',"text":"一般账户"},{"id":'3',"text":"银行内部户"},{"id":'6',"text":"保证金账户"}];
	$("#acTp").combobox('loadData',acTp);
	//var acFlag = [{"id":'R',"text":"实体账号"},{"id":'V',"text":"虚拟账户"}];
	//$("#acFlag").combobox('loadData',acFlag);
	//var isAutoVerif = [{"id":'Y',"text":"是"},{"id":'N',"text":"否"}];
	//$("#isAutoVerif").combobox('loadData',isAutoVerif);
	//var verifSeq = [{"id":'1',"text":"按应收账款到期日期顺序"},{"id":'2',"text":"按融资到期日顺序"}];
	//$("#verifSeq").combobox('loadData',verifSeq);
	var optt={
			url:SCFUtils.AJAXURL,
			data: {
				queryId:'Q_P_000006'
			},
			callBackFun:function(data){
				if(data.success){
					$('#ccy').combobox('loadData', data.rows);
					//给币种设置默认值
					$('#ccy').combobox('setValue', 'CNY');
					
    			}
			}
	};	
	SCFUtils.ajax(optt);
}

/*function queryAcNo(){
	var sysBusiUnit=$('#sysBusiUnit').val();
	if(!SCFUtils.isEmpty(sysBusiUnit)){
		var option={
				url:SCFUtils.AJAXURL,
				data: {
					queryId:'Q_P_000097',
					sysBusiUnit:sysBusiUnit,
					acTp: '4'
				},
				callBackFun:function(data){
					if(!SCFUtils.isEmpty(data.rows)){
						$('#relavOwnerid').combobox('loadData', data.rows);	
					}
				}
		};	
		SCFUtils.ajax(option);
	}
}*/

function checkAcNo(){
	var acTp=$('#acTp').combobox('getValue');
	if(acTp=='1'){
		var sysBusiUnit=$('#sysBusiUnit').val();
//		var acOwnerid =$('#acOwnerid').val()
		if(!SCFUtils.isEmpty(sysBusiUnit)){
			var option={
					url:SCFUtils.AJAXURL,
					data: {
						queryId:'Q_P_000095',
						busiUnit:sysBusiUnit
					},
					callBackFun:function(data){
						if(!SCFUtils.isEmpty(data.rows)){
//							$('#relavOwnerid').val(data.rows[0].busiUnit);	
							acNoBox(data);
						}
					}
			};	
			SCFUtils.ajax(option);
		}
	}else{
		$('#relavOwnerid').val('');	
	}
}
function acNoBox(data)
{
	var sysRefNo =data.rows[0].sysRefNo;
	var option={
			url:SCFUtils.AJAXURL,
			data: {
				queryId:'Q_P_000197',
				acOwnerid:sysRefNo,
				acTp:4
			},
			callBackFun:function(data){
				if(!SCFUtils.isEmpty(data.rows)){
					$('#relavOwnerid').val(data.rows[0].acNo);	
//					acNoBox(data);
				}
			}
	};	
	SCFUtils.ajax(option);
}

//查询网点信息
function showLookUpWindow(){
	var options = {
		title:'网点信息查询',
		reqid:'I_P_000106',
		onSuccess:netAddressSuccess
	};
	SCFUtils.getData(options);
}

function netAddressSuccess(data){
	$('#acBkNo').val(data.sysRefNo);//网点
	$('#acBkName').val(data.brNm);//网点名称
}

//验证账号是否存在数据库中
function checkAcNoorTp(){
	var result = false;
	var acTp = $('#acTp').val();
	var acNo = $('#acNo').numberbox('getValue');
	var option={
			url:SCFUtils.AJAXURL,
			data: {
				queryId:'Q_P_000330',
				acNo:acNo,
			},
			callBackFun:function(data){
				if(!SCFUtils.isEmpty(data.rows)){
					SCFUtils.alert("此账号已被使用，请重新输入！");
					result = true;
				}
			}
	};	
	SCFUtils.ajax(option);
	
	return result;
}

//同步账号
function showLookUpWindowAc(){
	var acNo = $('#acNo').numberbox('getValue');
	var sysRefNo = "Ac0001";
	if(SCFUtils.isEmpty(acNo)){
		SCFUtils.alert("请输入账号！");
		return false;
	}
	/*
	$('#ccy').combobox("setValue","CNY");
	$('#acNm').val("柳州银行保理专户");
	$('#acBkNm').val("开户行-柳州银行");
	$('#acBkNo').val("Inst000014");
	$('#acBkName').val("柳州银行");*/
	
	
	var data = {};
	var options = {
		url : SCFUtils.AJAXURL,
		async : false,
		data : $.extend({
			getdataId : 'I_P_000153',
			byFunc : 'N',
			cacheType : 'non',
			sysRefNo : sysRefNo,
			acNo : acNo
		}, data),
		callBackFun : function(backData) {
			addVerSuccess(backData);
		}
	};
	SCFUtils.ajax(options);
}

function addVerSuccess(data){
	$('#ccy').combobox('setValue',data.obj.trxDom.CNY);
	$('#acNm').val(data.obj.trxDom.acNm);
	$('#acBkNm').val(data.obj.trxDom.acBkNm);
	$('#acBkNo').val(data.obj.trxDom.acBkNo);
	$('#acBkName').val(data.obj.trxDom.acBkName);
}


//修改账号时
function changeAcNo(){
	$('#acNm').val("");
	$('#acBkNm').val("");
	$('#acBkName').val("");
}




