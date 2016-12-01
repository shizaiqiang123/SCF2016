$.print("********用户管理——用户角色更新*************************");

var trxData = $.trxData;
var invRef = $.getStringValue(trxData,"invRef");
$.updateProperty(trxData,"sysRefNo",invRef);


$.print("********用户管理——用户角色更新 ending*************************");