$.print("********L_P_000151 begin*************************");

var trxData = $.trxData;

var trxJsonData = $.orgnAllData;//四层数据结构所有记录
var trxDomData = $.getTrxDomData();//所有交易数据

var isConfirm = $.getStringValue(trxDomData,"isConfirm");//是否确定
$.print("*******L_P_000151  中的isConfirm值为***************"+isConfirm);
if(isConfirm==1){
	$.setLogicNodeEnable("false");
}
var sysRefNo = $.getStringValue(trxDomData,"sysRefNo");
$.updateProperty(trxData,"sysLockBy",sysRefNo);//一般来说，都是用该功能的主表流水号作为FP时删除的条件
$.updateProperty(trxData,"sysLockFlag","T");


$.print("*******L_P_000151  end *************************");