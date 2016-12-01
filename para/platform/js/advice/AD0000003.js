$.print("********process advice begin*************************");

//var operator = $.getTrxOperator();
//$.print("*************************operator:"+operator);
var trxDom = $.getTrxDom();
$.print("*************************trxDom:"+trxDom);
var userRefNo = $.getStringValue(trxDom,"sysRefNo");
$.appendReveiver(userRefNo);
var selId = "selId = "+userRefNo;
var loanM=$.queryTable("TRX.LOAN_M",selId,"trxDt");
$.getParameterEdit(loanM);

var trxRef = $.getTrxRef('');
$.print("*************************trxRef:"+trxRef);
$.updateTrxProperty("sysRefNo",trxRef);

$.updateTrxProperty("sendId","U00331");
$.updateTrxProperty("sendNm","super_admin");

$.assignFunc('F_S_000020');

$.print("********process advice end*************************");