$.print("********process advice begin*************************");

//var operator = $.getTrxOperator();
//$.print("*************************operator:"+operator);
var trxDom = $.getTrxDom();
var advicePara=$.advicePara;
$.print("*************************trxDom:"+trxDom);
//VAR TRXDATA = $.TRXDATA;
//$.PRINT("*************************TRXDATA:"+TRXDATA);
//var trxData=$.initTrxData(trxDom);
//$.print("*************************trxData:"+trxData);
var userRefNo = $.getStringValue(trxDom,"sysOpId");
$.print("*************************userRefNo:"+userRefNo);
$.appendReveiver(userRefNo);
//var selId = $.getStringValue(trxDom,"selId");
//var cntrctSelId = "selId = "+selId;
//$.print("*************************selId:"+cntrctSelId);
//var loanM=$.queryTable("TRX.LOAN_M",cntrctSelId,"");
//$.print("*************************loanM:"+loanM);
//$.setTrxData(loanM);
$.getParameterEdit(trxDom);
var trxRef = $.getTrxRef('');

$.print("*************************trxRef:"+trxRef);
$.updateTrxProperty("sysRefNo",trxRef); 

$.updateTrxProperty("sendId","U00000");
$.updateTrxProperty("sendNm","super_admin");
//$。getParameterEdit(trxData);

//$.getParameterEdit(trxRef);
$.print("*************************send:F_S_000020****************");
$.assignFunc('F_S_000020');

$.print("********process advice end*************************");