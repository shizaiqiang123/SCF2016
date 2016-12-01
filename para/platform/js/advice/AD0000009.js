$.print("********process advice begin*************************");
var trxDom = $.getTrxDom();

var funcNm = $.getFuncNm();

$.print("********process advice funcNm = "+funcNm);

$.updateProperty(trxDom,'sysFuncNm',funcNm);

$.getParameterEdit(trxDom);


$.print("********process advice end*************************");