/**
 * 机构js
 * @author yhy
 */
/**
 * 初始化流水号
 */

 function pageOnLoad(data){
	 
	 var options = {};
	 options.data = {
	 refName : 'InstNo',
	 refField : 'sysRefNo'
	 };
	 SCFUtils.getRefNo(options);
	 if (!SCFUtils.isEmpty(data) && !SCFUtils.isEmpty(data.success)
				&& data.success == true) {
		 SCFUtils.loadForm('InstForm', data);
	 }
	 var blgOrgid = $('#blgOrgid').val();
	  $('#blgOrgNm').combotree('setValue',blgOrgid);
	
	 
 }
 function pageOnResultLoad(data)
 {
	 $('#blgOrgNm').combotree('readonly',true);
	 SCFUtils.loadForm('InstForm', data);
 }
 function pageOnInt(){
	 ajaxBox();
 }
function ajaxBox() {
	SCFUtils.setTextReadonly('sysRefNo', true);
	SCFUtils.setTextReadonly('sysBusiUnit', true);
	
	 var sysBusiUnit = $('#sysBusiUnit').val();
		var option = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_S_INSTINFO_0001',
				sysBusiUnit : sysBusiUnit
			},
			callBackFun : function(data) {
				if (data.success) {	
					
					$('#blgOrgNm').combotree('loadData',data.rows);
				}	
			}
		};
		  SCFUtils.ajax(option);
		 
}
function onNextBtnClick() {
	var blgOrgid=$('#blgOrgid').val();
	var sysRefNo=$('#sysRefNo').val();
	if(blgOrgid!=sysRefNo && !SCFUtils.isEmpty(blgOrgid)){
	var t = $('#blgOrgNm').combotree('tree');	// 获取树对象
	var node = t.tree('getSelected');		// 获取选择的节点
	$('#blgOrgid').val(node.id);
		return SCFUtils.convertArray('InstForm');
	}
	else
		{
		SCFUtils.error("总公司不支持该操作");
		return;
		}
}
function onSubmitBtnClick(){
	return SCFUtils.convertArray('InstForm');
}

function onDelBtnClick() {
	return SCFUtils.convertArray('InstForm');
}
