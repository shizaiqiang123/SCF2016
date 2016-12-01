$.print("---------begin------------");
var trxData = $.getTrxJsonData();
var refNo = $.getStringValue(trxData,'sysRefNo');
$.print(refNo);

var records = $.createList('records');

var invcList = $.getObject(trxData,'doname');

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