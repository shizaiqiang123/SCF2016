$.print("---------begin L_P_00002003.js------------");

var trxData = $.trxData;
$.print("---------trxData------------" + trxData);

var funcType = $.getFuncType();
$.print("------funcType--------" + funcType);
var crtfRefNo = $.getStringValue(trxData, "loanId");
if ("RE" != funcType) {
	var bailPayAmt = $.getAmtValue(trxData, 'bailPayAmt');
	$.print("---------bailPayAmt------------" + bailPayAmt);
	var ttlMarginBal = $.getAmtValue(trxData, 'ttlMarginBal');
	$.print("---------ttlMarginBal------------" + ttlMarginBal);
	//var marginBal = $.addAmt(bailPayAmt, ttlMarginBal);
	$.updateProperty(trxData, "sysRefNo", crtfRefNo);
	$.updateProperty(trxData, "marginBal", marginBal);
	$.updateProperty(trxData, "marginCompen", bailPayAmt);
	
	var trxJsonData = $.orgnAllData;//四层数据结构所有记录
	var trxDomData = $.getTrxDomData();//所有交易数据
	var sysRefNo = $.getStringValue(trxDomData,"sysRefNo");
	$.updateProperty(trxData,"sysLockBy",sysRefNo);//一般来说，都是用该功能的主表流水号作为FP时删除的条件
	$.updateProperty(trxData,"sysLockFlag","T");
} else {
	$.updateProperty(trxData, "sysRefNo", crtfRefNo);
}


$.print("---------end L_P_00002003.js------------");