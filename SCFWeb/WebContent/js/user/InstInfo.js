/**
 * 机构js
 * @author yhy
 */
/**
 * 初始化流水号
 */
$(function() {
	var options = {};
	options.data = {
		refName : 'InstNo',
		refField : 'sysRefNo'
	};
	SCFUtils.getRefNo(options);
});

function pageOnLoad(data) {
	SCFUtils.loadForm('InstForm', data);
	SCFUtils.setTextReadonly('sysRefNo', true);
	SCFUtils.setTextReadonly('sysBusiUnit', true);
	 $('#blgOrgNm').combotree('setValue',blgOrgid);
}

function ajaxBox() {
	var sysBusiUnit = $('#sysBusiUnit').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_S_INSTINFO_0001',
			busiUnit:sysBusiUnit
		},
		callBackFun : function(data) {
			if (data.success) {				
				$('#blgOrgNm').combotree('loadData',data.rows);
				
			}	
		}
	};
	  SCFUtils.ajax(options);
}
function pageOnInt(data){
	ajaxBox();
}

function pageOnFPLoad(data){
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
};
function pageOnResultLoad(data)
{
	$('#blgOrgNm').combotree('readonly',true);
	SCFUtils.loadForm('InstForm', data);
}
function onNextBtnClick() {
	var t = $('#blgOrgNm').combotree('tree');	// 获取树对象
	var node = t.tree('getSelected');		// 获取选择的节点
	$('#blgOrgid').val(node.id);
	return SCFUtils.convertArray('InstForm');
}

//function onDelBtnClick() {
//	return SCFUtils.convertArray('InstForm');
//}
