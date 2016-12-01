$.print("---------begin------------");
var trxData = $.getTrxJsonData();
var userTp = $.getStringValue(trxData,'userTp');
$.print(userTp);
var sysTrxSts = $.getStringValue(trxData,'sysTrxSts');
$.print(sysTrxSts);
var sysRefNo = $.getStringValue(trxData,'sysRefNo');
$.print(sysRefNo);

var records = $.createList('records');

var invcList = $.getObject(trxData,'findUser');

var invcCount = $.getRecordCount(invcList);

if(invcCount>0){
	for(var i = invcCount-1;i>-1;i--){
		var record = $.getTrxRecord(invcList,i);
		$.appendList(records,record);
		$.print("add record success:"+i);
	}
}

$.updateProperty(invcList,'records',records);
$.print("---------end------------");