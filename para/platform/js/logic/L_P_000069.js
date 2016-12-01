$.print("********account mapping begin*************************");
var trxData = $.trxData;
/*var sysRefNohd = $.getStringValue(trxData,"sysRefNoSbr");
$.updateProperty(trxData,"sysRefNo",sysRefNohd);*/

//if busiTp="应收账款质押"，不执行此逻辑流节点
var busiTp = $.getStringValue(trxData,"busiTp");
if(busiTp.equals("7")){
	$.setLogicNodeEnable("false");
	$.print("应收账款质押，不执行这个逻辑流");
}else{
	var trxId = $.getStringValue(trxData,"trxId");
	var sysRefNo = $.getStringValue(trxData,"sysRefNo");
	$.updateProperty(trxData,"trxId",sysRefNo);
	$.updateProperty(trxData,"sysRefNo",trxId);
	
	var trxJsonData = $.orgnAllData;//四层数据结构所有记录
	var trxDomData = $.getTrxDomData();//所有交易数据
	var sysRefNo = $.getStringValue(trxDomData,"sysRefNo");
	$.updateProperty(trxData,"sysLockBy",sysRefNo);//一般来说，都是用该功能的主表流水号作为FP时删除的条件
	$.updateProperty(trxData,"sysLockFlag","T");
}
$.print("********买方还款account mapping end*************************");