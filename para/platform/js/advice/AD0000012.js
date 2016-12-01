$.print("********process advice begin*************************");

//var operator = $.getTrxOperator();
//$.print("*************************operator:"+operator);
var trxDom = $.getTrxDom();
var advicePara=$.advicePara;
$.getParameterEdit(trxDom);
//$.print("*************************trxDom:"+trxDom);
////VAR TRXDATA = $.TRXDATA;
////$.PRINT("*************************TRXDATA:"+TRXDATA);
//var trxData=$.initTrxData(trxDom);
//var userRefNo = $.getStringValue(trxDom,"sendUserId");
//$.print("*************************userRefNo:"+userRefNo);
//var userRoleInfo=$.queryTable("STD.USER_ROLE_INFO"," roleId = ROLE000049 ","");
//$.print("*************************userRoleInfo:"+userRoleInfo);
var userRole="ROLE000049";
$.appendReveiver(userRole);
//for(var i=0;i<userRoleInfo.size()-1;i++){
//	var row="rows"+i;
//	$.print("*************************row:"+row);
//	var rows=$.getObject(userRoleInfo,row);
//	$.print("*************************rows:"+rows);
//	var userRefNo = $.getStringValue(rows,"userId");
//	$.print("*************************userRefNo:"+userRefNo);
//	$.appendReveiver(userRefNo);
//
	var trxRef = $.getTrxRef('');
//
	$.print("*************************trxRef:"+trxRef);
	$.updateTrxProperty("sysRefNo",trxRef); 
//
	$.updateTrxProperty("sendId","U00000");
	$.updateTrxProperty("sendNm","super_admin");
//	//$。getParameterEdit(trxData);
//
//	//$.getParameterEdit(trxRef);
//
	$.assignFunc('F_S_000020');
//}


$.print("********process advice end*************************");