$.print("********process advice begin*************************");

var trxDom = $.getTrxDom();

$.print("isAgree----------" + "1111");
var advicePara=$.advicePara;
$.getParameterEdit(trxDom);
$.print("*************************trxDom:"+trxDom);

var trxData=$.initTrxData(trxDom);
var userRefNo = $.getStringValue(trxDom,"sysOpId");
$.print("*************************userRefNo:"+userRefNo);
$.appendReveiver(userRefNo);

var trxRef = $.getTrxRef('');

$.print("*************************trxRef:"+trxRef);
$.updateTrxProperty("sysRefNo",trxRef); 

$.updateTrxProperty("sendId","U00000");
$.updateTrxProperty("sendNm","super_admin");


$.assignFunc('F_S_000020');

$.print("********process advice end*************************");