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
var point = $.getObject(trxDom,"point");
$.print("*************************point:"+point);
var rows0=$.getObject(point,"rows0");
$.print("*************************rows0:"+rows0);
var sysRefNo = $.getStringValue(rows0,"sysRefNo");
$.print("*************************sysRefNo:"+sysRefNo);
var refNo = "sysRefNo = "+sysRefNo;
$.print("*************************refNo:"+refNo);
var pmtM=$.queryTable("TRX.PMT_M",refNo,"");
$.print("*************************pmtM:"+pmtM);
var userRefNo = $.getStringValue(pmtM,"sysOpId");
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