$.print("---------begin L_P_0000038.js------------");

var trxData = $.trxData;
$.print("---------trxData------------" + trxData);

var funcType = $.getFuncType();
$.print("------funcType--------" + funcType);
var loanId = $.getStringValue(trxData, "loanId");
$.print("---------loanId------------" + loanId);
if ("RE" != funcType) {
	var marginCompen = $.getAmtValue(trxData, 'marginCompen');
	$.print("---------marginCompen------------" + marginCompen);
	var marginBal = $.getAmtValue(trxData, 'marginBal');
	$.print("---------marginBal------------" + marginBal);
	$.updateProperty(trxData, "sysRefNo", loanId);
	$.updateProperty(trxData, "marginBal", marginBal);
	$.updateProperty(trxData, "marginCompen", marginCompen);
	//new
	var trxJsonData = $.orgnAllData;//四层数据结构所有记录
	var trxDomData = $.getTrxDomData();//所有交易数据
	var sysRefNo = $.getStringValue(trxDomData,"sysRefNo");
	$.updateProperty(trxData,"sysLockBy",sysRefNo);//一般来说，都是用该功能的主表流水号作为FP时删除的条件
	$.updateProperty(trxData,"sysLockFlag","T");
} else {
	$.updateProperty(trxData, "sysRefNo", loanId);
}

$.print("---------end L_P_0000038.js------------");