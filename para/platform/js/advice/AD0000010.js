$.print("********process advice begin*************************");

//var operator = $.getTrxOperator();
//$.print("*************************operator:"+operator);
var trxDom = $.getTrxDom();
var advicePara=$.advicePara;
$.getParameterEdit(trxDom);
$.print("*************************trxDom:"+trxDom);
//VAR TRXDATA = $.TRXDATA;
//$.PRINT("*************************TRXDATA:"+TRXDATA);
var trxData=$.initTrxData(trxDom);
var userRefNo = $.getStringValue(trxDom,"sendUserId");
$.print("*************************userRefNo:"+userRefNo);
$.appendReveiver(userRefNo);

var trxRef = $.getTrxRef('');

$.print("*************************trxRef:"+trxRef);
$.updateTrxProperty("sysRefNo",trxRef); 

$.updateTrxProperty("sendId","U00000");
$.updateTrxProperty("sendNm","super_admin");
//$。getParameterEdit(trxData);

//$.getParameterEdit(trxRef);

$.assignFunc('F_S_000020');

$.print("********process advice end*************************");