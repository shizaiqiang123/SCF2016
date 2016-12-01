/**
 * 机构js
 * @author yhy
 */
/**
 * 初始化流水号
 */
function beforeLoad(){
//	var sysRefNo=SCFUtils.SYSUSERREF;
	var sysRefNo=$('#sysRefNo').val();
	var data = {};
	data.data={sysRefNo:sysRefNo}
	return data;
}
function onCancelBtnClick(){
	var sysRefNo=$('#sysRefNo').val();
	return {sysRefNo:sysRefNo};
}

 function pageOnInt(){
	 ajaxBox();
 }
function ajaxBox() {
	SCFUtils.setTreeReadonly('blgOrgNm', true);
	 var sysBusiUnit = $('#sysBusiUnit').val();
		var option = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_S_INSTINFO_0001',
				sysBusiUnit : sysBusiUnit
			},
			callBackFun : function(data) {
				if (data.success) {	
						$('#blgOrgNm').tree({data:data.rows});
					}
			}
		};
		  SCFUtils.ajax(option);
		 
}
function onNextBtnClick() {
	return SCFUtils.convertArray('InstForm');
}
function onSubmitBtnClick(){
	return SCFUtils.convertArray('InstForm');
}

function onDelBtnClick() {
	return SCFUtils.convertArray('InstForm');
}
