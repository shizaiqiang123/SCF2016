$.print("---------begin service------------");
$.print("---------S_P_OOO45.JS------------");
$.print("---------应收账款登记复核------------");
var userData = $.getUserData();
$.print("userData----------" + userData);

var trxData = $.trxData;
$.print("trxData----------" + trxData);
var trxDomData = $.getTrxDom(trxData);

var isAgree = $.getStringValue(trxDomData, "isAgree");
$.print("isAgree----------" + isAgree);

if (isAgree == "N") {
	$.appendRule('Adv000112');
	$.print("isAgree----------" + "NNNN");
} else {
	$.appendRule('Adv000113');
	$.print("isAgree----------" + "YYYY");
}

$.print("---------end service------------");