$.print("********process advice begin*************************");

var operator = $.getTrxOperator();
$.print("*************************operator:"+operator);
$.appendReveiver(operator);
$.getParameterEdit();
var trxRef = $.getTrxRef('');
$.print("*************************trxRef:"+trxRef);
$.updateTrxProperty("sysRefNo",trxRef);

$.updateTrxProperty("sendId","U00331");
$.updateTrxProperty("sendNm","super_admin");

$.assignFunc('F_S_000020');

$.print("********process advice end*************************");