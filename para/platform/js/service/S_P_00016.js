$.print("---------begin service------------");
//$.initTrxData("");
var trxData= $.getTrxData();
$.print("trxData-----"+trxData);
var trxDom =$.getTrxDom(trxData);
$.print("trxDom-----"+trxDom);
var signSts =$.getStringValue(trxDom,"signSts");
$.print('signSts-----'+signSts);
if(signSts=='3'){
	$.appendRule('Adv000065');
	$.appendRule('Adv000086');
}else if(signSts=='2'){
	$.appendRule('Adv000066');
	$.appendRule('Adv000087');
}else if(signSts=='1'){
	$.appendRule('Adv000067');
	$.appendRule('Adv000088');
}
$.print("---------end service------------");