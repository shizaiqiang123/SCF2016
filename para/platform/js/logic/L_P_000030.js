$.print("********reg user role mapping begin*************************");

var trxData = $.trxData;

var userRoleRef = $.getStringValue(trxData,"userRoleRef");
var userRoleNo = $.getStringValue(trxData,"userRoleNo");
var sysRefNo = $.getStringValue(trxData,"sysRefNo");

$.updateProperty(trxData,"sysRefNo",userRoleRef);
$.updateProperty(trxData,"userId",sysRefNo);
$.updateProperty(trxData,"roleId",userRoleNo);

$.print("********reg user role mapping end*************************");