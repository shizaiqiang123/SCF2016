$.print("********process advice begin*************************");

//var operator = $.getTrxOperator();
//$.print("*************************operator:"+operator);
var trxDom = $.getTrxDom();
$.getParameterEdit();
$.print("*************************trxDom:"+trxDom);
var userRefNo = $.getStringValue(trxDom,"sysRefNo");
$.print("*************************userRefNo:"+userRefNo);
$.appendReveiver(userRefNo);

var trxRef = $.getTrxRef('');
$.print("*************************trxRef:"+trxRef);
$.updateTrxProperty("sysRefNo",trxRef);

$.updateTrxProperty("sendId","U00000");
$.updateTrxProperty("sendNm","super_admin");

$.assignFunc('F_S_000020');

$.print("********process advice end*************************");