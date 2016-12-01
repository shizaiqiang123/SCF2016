$.print("---------begin service------------");
$.print("---------S_P_OOO43.JS------------");
$.print("---------融资复核------------");
var userData = $.getUserData();
$.print("userData----------" + userData);

var trxData = $.trxData;
$.print("trxData----------" + trxData);
var trxDomData = $.getTrxDom(trxData);

var isAgree = $.getStringValue(trxDomData, "isAgree");
$.print("isAgree----------" + isAgree);

if (isAgree == "N") {
	$.appendRule('Adv000110');
} else {
	$.appendRule('Adv000111');
}

$.print("---------end service------------");