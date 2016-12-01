$.print("---------begin round------------");
var funcType = $.getFuncType();
$.print("funcType is:" + funcType);

var trxData = $.trxData;
$.print("***trxData********" + trxData);
var isConfirm = $.getStringValue(trxData,"isConfirm");
var isAgree = $.getStringValue(trxData,"isAgree");
var pmtTp = $.getStringValue(trxData,"pmtTp");

if ("RE" == funcType) {
	if (isConfirm == 1 && isAgree == "Y") {
		if(pmtTp == 0){
			$.addReleaseUpdateField("sysFuncId", "F_P_000934");
		}else if(pmtTp == 1){
			$.addReleaseUpdateField("sysFuncId", "F_P_001009");
		}
	}
}
$.print("---------end------------");