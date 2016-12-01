$.print("********process advice begin*************************");

//var operator = $.getTrxOperator();
//$.print("*************************operator:"+operator);
var trxDom = $.getTrxDom();
var advicePara=$.advicePara;
$.print("*************************trxDom:"+trxDom);
//VAR TRXDATA = $.TRXDATA;
//$.PRINT("*************************TRXDATA:"+TRXDATA);
//var trxData=$.100%(trxDom);
var selAcNo = $.getStringValue(trxDom,"selAcNo");
var acNo = "acNo = "+selAcNo;
$.print("*************************acNo:"+acNo);
var custAc=$.queryTable("TRX.CUST_AC",acNo,"");
	$.print("*************************custAc:"+custAc);

	var licenceNo = $.getStringValue(custAc,"licenceNo");
	$.print("*************************licenceNo:"+licenceNo);
	var licence="licenceNo = "+ licenceNo;
	var custM=$.queryTable("TRX.CUST_M",licence,"");
	$.print("*************************custM:"+custM);
	var sysRefNo = $.getStringValue(custM,"sysRefNo");
	$.appendReveiver(sysRefNo);
	//var selId = "selId = "+userRefNo;
	//$.print("*************************selId:"+selId);
	//var loanM=$.queryTable("TRX.LOAN_M",selId,"");
	//$.print("*************************loanM:"+loanM);
	//var data=$.getObject(loanM,"data");
	//$.print("*************************data:"+data);
	$.setTrxData(custAc);
	$.getParameterEdit(trxDom);
	var trxRef = $.getTrxRef('');

	$.print("*************************trxRef:"+trxRef);
	$.updateTrxProperty("sysRefNo",trxRef); 

	$.updateTrxProperty("sendId","U00000");
	$.updateTrxProperty("sendNm","super_admin");
	$.assignFunc('F_S_000020'); 



$.print("********process advice end*************************");