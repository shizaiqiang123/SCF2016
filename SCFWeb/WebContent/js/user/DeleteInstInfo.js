/**
 * 机构js
 * @author yhy
 */
/**
 * 初始化流水号
 */

function pageOnLoad(data) {
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
	$('#blgOrgNm').combotree('setValue', blgOrgid);

}
function pageOnResultLoad(data) {
	$('#blgOrgNm').combotree('readonly', true);
	SCFUtils.loadForm('InstForm', data);
}
function pageOnInt() {
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
				$('#blgOrgNm').combotree('loadData', data.rows);
			}
		}
	};
	SCFUtils.ajax(option);

}

function onNextBtnClick() {
	return SCFUtils.convertArray('InstForm');
}
function onSubmitBtnClick() {
	return SCFUtils.convertArray('InstForm');
}
function onDelBtnClick() {
	var sysRefNo = $('#sysRefNo').val();
	var result=false;
	var option = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000124',
			sysRefNo : sysRefNo
		},
		callBackFun : function(data) {
			if (data.success) {
				if (data.rows.length == 0) {
					result=true;
					return result;
				} else {
					SCFUtils.error("非根节点，不可删除");
					return;
				}

			}
		}
	};
	SCFUtils.ajax(option);
	if(result==true)
		{
		return SCFUtils.convertArray('InstForm');
		}else
			{
			return;
			}
}
