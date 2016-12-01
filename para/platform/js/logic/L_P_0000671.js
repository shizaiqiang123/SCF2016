$.print("********account mapping begin*************************");

var trxData = $.trxData;
//var invc = $.getObject(trxData,'invc');
var linkInv = $.getStringValue(trxData,"linkInvRef");
var invRef = $.getStringValue(trxData,"invId");
$.print("67的"+$.getStringValue(trxData,'sysRefNo'));
$.print(trxData);
$.print("67的"+invRef)
$.updateProperty(trxData,"linkInvRef",linkInv);
$.updateProperty(trxData,"sysRefNo",invRef);

var trxJsonData = $.orgnAllData;//四层数据结构所有记录
var trxDomData = $.getTrxDomData();//所有交易数据
var sysRefNo = $.getStringValue(trxDomData,"sysRefNo");
$.updateProperty(trxData,"sysLockBy",sysRefNo);//一般来说，都是用该功能的主表流水号作为FP时删除的条件
$.updateProperty(trxData,"sysLockFlag","T");

/*var funcType = $.getFuncType();
$.print("------funcType--------" + funcType);
if ("RE" == funcType) {
	var invRef = $.getStringValue(trxData,"invId");
	$.updateProperty(trxData,"linkInvRef",invRef);
}*/

$.print("********account mapping end*************************");