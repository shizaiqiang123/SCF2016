$.print("---------begin service------------");
$.print("---------S_P_OOO56.JS------------");
$.print("---------订单登记复核------------");
var userData = $.getUserData();
$.print("userData----------" + userData);

var trxData = $.trxData;
$.print("trxData----------" + trxData);
var trxDomData = $.getTrxDom(trxData);

var isAgree = $.getStringValue(trxDomData, "isAgree");
$.print("isAgree----------" + isAgree);

if (isAgree == "N") {
	$.appendRule('Adv000132');
} else {
	$.appendRule('Adv000133');
}

$.print("---------end service------------");