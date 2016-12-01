$.print("---------begin---------R_P_00008.js---");
var trxData = $.getTrxJsonData();
var instNo = $.getStringValue(trxData,'instNo');
$.print("---------trxData------------"+trxData);
$.print("---------instNo------------"+instNo);
$.updateParameterValues("ac_bk_no",instNo);
$.print("---------end------------");