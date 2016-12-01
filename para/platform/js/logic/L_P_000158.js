$.print("---------begin round------------");
var funcType = $.getFuncType();
$.print("funcType is:" + funcType);

var trxData = $.trxData;
$.print("***trxData********" + trxData);
var isConfirm = $.getStringValue(trxData,"isConfirm");
var isAgree = $.getStringValue(trxData,"isAgree");

if ("RE" == funcType) {
	if (isConfirm == 1 && isAgree == "Y") {
		$.addReleaseUpdateField("sysFuncId", "F_P_000905");
	}
}
$.print("---------end------------");