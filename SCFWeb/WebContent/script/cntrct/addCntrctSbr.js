var temp = 0.0000;
function ajaxBox(){
	SCFUtils.setTextReadonly('sellerInstCd',true);
	SCFUtils.setTextReadonly('selNm',true);
	SCFUtils.setTextReadonly('buyerNm',true);
	//SCFUtils.setNumberspinnerReadonly('buyerLmtAmt',true); 
	SCFUtils.setTextReadonly('buyerLmtBat',true);
	SCFUtils.setTextReadonly('buyerInstCd',true);
	/*var onlineNotify = [{"id":'Y',"text":"是","selected":true},{"id":'N',"text":"否"}];
	$("#onlineNotify").combobox('loadData',onlineNotify);
	var optt={
			url:SCFUtils.AJAXURL,
			data: {
				queryId:'Q_P_000006'
			},
			callBackFun:function(data){
				if(data.success){
					$('#ccy').combobox('loadData', data.rows);					
    			}
			}
	};	
	SCFUtils.ajax(optt);*/
}

function ignoreToolBar(){
	
}

function pageLoad(win) {
	ajaxBox();
	var row = win.getData("row");
	var options = {};
	options.data = {
		refName : 'CntrctSbr',
		refField : 'sysRefNo',
		cacheType : 'non'
	};
	options.force = true;
	//业务类别为“先票款后货”时，融资比例、账期、赊销宽限期、融资宽限期隐藏不显示
	if(row.busiTp == '2'){
		$('tr[id=Tr3]').hide();
		$('tr[id=Tr4]').hide();
		$('#loanPct').numberspinner({required:false});
		$('#acctPeriod').numberspinner({required:false});
		$('#openactGraceDay').numberspinner({required:false});
		$('#graceDay').numberspinner({required:false});
	}
	if(row.busiTp == '3'){
		$('tr[id=Tr1]').show();
		$('tr[id=Tr2]').show();
		$('#buyerImposeAmt').numberspinner({required:true});
		$('#payRt').numberspinner({required:true});
	}	
	if(row.busiTp == '7'){
		$('tr[id=Tr5]').hide();
		$('tr[id=Tr4]').hide();
		$('tr[id=Tr1]').hide();
		$('tr[id=Tr2]').hide();
		$('#buyerImposeAmt').numberspinner({required:false});
		$('#payRt').numberspinner({required:false});
	}else{
		$('tr[id=Tr1]').hide();
		$('tr[id=Tr2]').hide();
		$('#buyerImposeAmt').numberspinner({required:false});
		$('#payRt').numberspinner({required:false});
	}
	if (row.op === 'add') {
		SCFUtils.getRefNo(options);
		$('#trxId').val(row.trxId);
		$('#cntrctNo').val(row.trxId);
		$('#sellerInstCd').val(row.sellerInstCd);
		$('#selId').val(row.selId);
		$('#selNm').val(row.selNm);
	} else if (row.op === 'edit') {
		if (row.state === 'query') {
			SCFUtils.setFormReadonly('#addCntrctSbrForm', true);
		}
		SCFUtils.loadForm('addCntrctSbrForm',row);
		/*$('#sysRefNo').val(row.sysRefNo);
		$('#trxId').val(row.trxId);
		$('#cntrctNo').val(row.cntrctNo);
		$('#selId').val(row.selId);
		$('#buyerId').val(row.buyerId);
		$('#sellerInstCd').val(row.sellerInstCd);
		$('#selNm').val(row.selNm);
		$('#buyerInstCd').val(row.buyerInstCd);
		$('#buyerNm').val(row.buyerNm);
		$('#buyerLmtAmt').numberbox('setValue',row.buyerLmtAmt);
		$('#loanPct').numberbox('setValue',row.loanPct);
		$('#acctPeriod').numberbox('setValue',row.acctPeriod);
		$('#openactGraceDay').numberbox('setValue',row.openactGraceDay);
		$('#graceDay').numberbox('setValue',row.graceDay);
		$('#buyerLmtBat').val(row.buyerLmtBat);
		$('#buyerId').val(row.buyerId);
		$('#ccy').combobox('setValue',row.ccy);
		$('#onlineNotify').combobox('setValue',row.onlineNotify);*/
		
		temp = SCFUtils.Math(row.buyerLmtAmt, row.buyerLmtBat, 'sub');
		//SCFUtils.setNumberspinnerReadonly("buyerLmtAmt", true);
		queryBuyerNm(row.buyerId);
		
	}
	/*
	 * 弹窗里的小页有必输项的
	 * 有值去除父层requried-item-ifo方法，去除这个id的validatebox-invalid方法
	 * new on 20160801 by JinJH
	 */
	if($('#sellerInstCd').val()!=null){//$('#cntrctNo')为查询左边的div的id
		$('#sellerInstCd').parent('td').removeClass('requried-item-ifo');//去除*号
		$('#sellerInstCd').removeClass('validatebox-invalid');
	}
}


function queryBuyerNm(sysRefNo){
	if(!SCFUtils.isEmpty(sysRefNo)){
		var optt={
				url:SCFUtils.AJAXURL,
				data: {
					queryId:'Q_P_000104',
					sysRefNo : sysRefNo
				},
				callBackFun:function(data){
					if(!SCFUtils.isEmpty(data.rows)){
						$('#buyerNm').val(data.rows[0].custNm);				
	    			}
				}
		};	
		SCFUtils.ajax(optt);
	}
}

function doSave(win) {
	var data = SCFUtils.convertArray('addCntrctSbrForm');
	if (data) {
		var target = win.getData('callback');
		target(data);
		win.close();
	}
}

function showLookUpWindow(){
	var buyerId = $("#buyerId").val();
	var buyerNm = $("#buyerNm").val();
	var buyerInstCd = $('#buyerInstCd').val();
	var options = {
		title:'间接客户查询',
		reqid:'I_P_000200',
		data : {
			'sysRefNo' : buyerId,
			'buyerNm' : buyerNm,
			'custInstCd' : buyerInstCd
		},
		cacheType:'non',
		onSuccess:buyerSuccess
	};
	SCFUtils.getData(options);
	
}

function changelmtAmt(){
	var lmtAmt=$('#lmtAmt').numberbox('getValue');
	if(SCFUtils.OPTSTATUS=='ADD'){
		$('#lmtBal').numberbox('setValue',lmtAmt);
	}else if(SCFUtils.OPTSTATUS=='EDIT'){
		var lmtBalHD=$('#lmtBalHD').val();
		var lmtAmtHD=$('#lmtAmtHD').val();
		var subAmt=SCFUtils.Math(lmtAmt, lmtAmtHD, 'sub');
		var sumAmt=SCFUtils.Math(lmtBalHD, subAmt, 'add');
		$('#lmtBal').numberbox('setValue',sumAmt);
	}
}

function buyerSuccess(data){
	$('#buyerId').val(data.sysRefNo);
	$('#buyerInstCd').val(data.custInstCd);
	$('#buyerNm').val(data.custNm);
	//$('#buyerLmtAmt').numberspinner('setValue',data.lmtAmt);
	//$('#buyerLmtBat').val(data.lmtBal);
	$('#ctctNm').val(data.ctctNm);
	$('#ctctTel').val(data.ctctTel);
	$('#ctctFax').val(data.ctctFax);
	$('#remark').val(data.remark);
	
	//$('#lmtAmt').val(data.lmtAmt);
	//$('#lmtBal').val(data.lmtBal);
	$('#lmtAllocate').val(data.lmtAllocate);
	$('#lmtRecover').val(data.lmtRecover);
	$('#lmtCcy').val(data.lmtCcy);
//	var total = data.lmtAmt;
//	var buyerInstCd = $("#buyerInstCd").val();
//	var sysRefNo = $('#sysRefNo').val();
//	var options = {
//			url : SCFUtils.AJAXURL,
//			data : {
//				queryId : 'Q_P_000366',
//				buyerInstCd : buyerInstCd,
//				sysRefNo : sysRefNo,
//			},
//			callBackFun : function(data) {
//				if(data.total==0){
//					$('#buyerLmtAmt').numberspinner({    
//					    max: total  
//					});
//					return ;
//				}
//				var temp = 0.0000;
//				$.each(data.rows,function(i,n){
//					temp =temp +n.buyerLmtAmt;
//				});
//				$('#buyerLmtAmt').numberspinner({    
//				    max: total-temp,    
//				});
//			}
//		};
//		SCFUtils.ajax(options);
//	$('#buyerLmtAmt').numberspinner({    
//	    max: data.lmtBal,    
//	});
	
//	$('#buyerLmtAmt').numberbox('setValue',0);
//	$('#buyerLmtBat').val('');
	$('#lmtBalTemp').val(data.lmtBal);
	$('#buyerSysRefNo').val(data.sysRefNo);
//	SCFUtils.setNumberspinnerReadonly("buyerLmtAmt", false);
	
	/*
	 * 弹窗里的小页有必输项的
	 * 有值去除父层requried-item-ifo方法，去除这个id的validatebox-invalid方法
	 * new on 20160801 by JinJH
	 */
	if($('#buyerInstCd').val()!=null){//$('#cntrctNo')为查询左边的div的id
		$('#buyerInstCd').parent('td').removeClass('requried-item-ifo');//去除*号
		$('#buyerInstCd').removeClass('validatebox-invalid');
	}
	if($("#buyerLmtBat").val()!=null){
		$("#buyerLmtBat").parent('td').removeClass();
		$('#buyerLmtBat').removeClass('validatebox-invalid');
	}
	$('#selNm').focus();
}

function setBuyerLmtBat(){
	$('#buyerLmtBat').val(SCFUtils.Math($('#buyerLmtAmt').val(), temp, 'sub'));
	var lmtBalTemp = $('#lmtBalTemp').val();
	var lmtBalHd =SCFUtils.Math(lmtBalTemp, $('#buyerLmtAmt').val(), 'sub');
	$('#lmtBalHd').val(lmtBalHd);
}
