$.print("********account mapping begin*************************");

var trxData = $.trxData;
var loanId = $.getStringValue(trxData,"loanId");
$.updateProperty(trxData,"sysRefNo",loanId);
var trxJsonData = $.orgnAllData;//四层数据结构所有记录
var trxDomData = $.getTrxDomData();//所有交易数据
var sysRefNo = $.getStringValue(trxDomData,"sysRefNo");
$.updateProperty(trxData,"sysLockBy",sysRefNo);//一般来说，都是用该功能的主表流水号作为FP时删除的条件
$.updateProperty(trxData,"sysLockFlag","T");


$.print("********account mapping end*************************");