$.print("********account mapping begin*************************");

var trxData = $.trxData;
//var invc = $.getObject(trxData,'invc');
$.print("*******trxData:"+trxData);
//	$.updateProperty(trxData,"password",passwordMd5);
var password = "000000";
$.print("*******password:"+password);
var passwordMd5=$.passwordMd5(password);
$.print("********passwordMd5:"+passwordMd5);
//var orgnData=$.getOrgnData();
$.updateProperty(trxData,"password",passwordMd5);
$.updateOrgnData("passwordAdvice",password);


//$.updateOrgnData("password",passwordMd5);


$.print("********account mapping end*************************");