$.print("---------begin service------------");
var trxData = $.getTrxData();
$.print("trxData-----" + trxData);
var trxDom = $.getTrxDom(trxData);
$.print("trxDom-----" + trxDom);
var approvalSts = $.getStringValue(trxDom, "approvalSts");
//var sysTrxSts = $.getStringValue(trxDom, "sysTrxSts");
$.print('approvalSts-----' + approvalSts);
if (approvalSts == '2') {
	$.appendRule('Adv000069');
	$.appendRule('Adv000089');
} else if(approvalSts == '1')
{
	$.appendRule('Adv000070');
	$.appendRule('Adv000090');
}

$.print("---------end service------------");