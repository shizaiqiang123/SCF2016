$.print("---------begin------------");
var trxData = $.getTrxJsonData();
$.print(trxData);

var records = $.createList('records');
var recordsLoan = $.createList('recordsLoan');

var invcList = $.getObject(trxData,'COLLAT');
var loanList = $.getObject(trxData,'LOAN');

$.print("invcList "+invcList);
$.print("loanList "+loanList);

var invcCount = $.getRecordCount(invcList);

if(invcCount>0){
	for(var i = invcCount-1;i>-1;i--){
		var record = $.getTrxRecord(invcList,i);
		$.appendList(records,record);
		$.print("add record success:"+i);
	}
}

var loanCount = $.getRecordCount(loanList);

if(loanCount>0){
	for(var i = loanCount-1;i>-1;i--){
		var record = $.getTrxRecord(loanList,i);
		$.appendList(recordsLoan,record);
		$.print("add record success:"+i);
	}
}

$.updateProperty(invcList,'records',records);
$.updateProperty(loanList,'records1',recordsLoan);
$.print("---------end------------");