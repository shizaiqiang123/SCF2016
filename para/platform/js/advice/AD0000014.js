$.print("********process advice begin*************************");

var trxDom = $.getTrxDom();

$.print("isAgree----------" + "AD0000014");
var advicePara=$.advicePara;
$.print("isAgree----------" + "AD0000014");
$.getParameterEdit(trxDom);
$.print("isAgree----------" + "AD0000014");
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