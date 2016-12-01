$.print("********process gapi begin*************************");

var trxData = $.getTrxJsonData();
$.print("----------trxData:"+trxData);
var rspmsg = $.getStringValue(trxData,'coreReturnCode');
$.print("----------rspmsg:"+rspmsg);
$.addVerifyResult(rspmsg=='0000');
$.print("********process gapi end*************************");