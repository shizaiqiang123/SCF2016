$.print("********reg user pwd mapping begin*************************");

var trxData = $.trxData;
//var invc = $.getObject(trxData,'invc');
var password = $.getRandomCode("3","6");
$.print("*******password:"+password);
//$.appendRule('R_TEST_00004');
var passwordMd5=$.passwordMd5(password);
$.print("********passwordMd5:"+passwordMd5);
//var orgnData=$.getOrgnData();
$.updateProperty(trxData,"password",passwordMd5);
//$.updateOrgnData("password",passwordMd5);
$.updateOrgnData("passwordAdvice",password);

$.print("********reg user pwd mapping end*************************");