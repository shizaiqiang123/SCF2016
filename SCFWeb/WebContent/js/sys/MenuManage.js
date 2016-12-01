/**------------菜单js---------------------**/

function pageOnInt() {
	ajaxBox();
}

/**
 * 初始化下拉列表
 */
function ajaxBox() {
	var data = [ {
		"id" : 'Y',
		"text" : "是"
	}, {
		"id" : 'N',
		"text" : "否"
	} ];
	$("#IsparentBox").combobox('loadData', data);
	// $('#IsparentBox').onChange = isMenuChange;
	var isParent = data[0].id;
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000175',
			isparent : isParent
			
		},
		callBackFun : function(data) {
			if (data.success) {
				$('#menuParentid').combotree('loadData', data.rows);
			}
		}
	};
	SCFUtils.ajax(options);
	var userRole =$('#sysUserType').val();
	var option={
			url:SCFUtils.AJAXURL,
			data:{
				queryId :'Q_P_000189',
				typeNo:userRole
			},
		callBackFun : function(data){
			if(data.success){
				$('#menuTp').combobox('loadData',data.rows);
			}
		}
	}
	SCFUtils.ajax(option);
}

function isMenuChange(newValue, oldValue) {
	if ('Y' == newValue) {
		$('#menuId').val($('#sysRefNo').val());
	//	$('#menuParentid').combotree('readonly', true);
	} else {
		$('#menuId').val('');
		$('#menuParentid').combotree('readonly', false);
	}
	//new on 20160801 by JinJH
	if($("#menuId").val()!=null){
		$("#menuId").parent('td').removeClass('requried-item-ifo');
		$("#menuId").removeClass('validatebox-invalid');
	}
}

/**
 * 初始化页面 js_cs.jsp 中定义了初始化页面的AJAX请求，
 * 在需要重新加载页面信息的js中重写此方法。
 * @param  data   后台返回的数据。
 */
function pageOnLoad(data) {
	if (!SCFUtils.isEmpty(data) && !SCFUtils.isEmpty(data.success)
			&& data.success == true) {
		// 加载页面信息，删除和查询页面时自动保护FORM。使之不可修改。
		SCFUtils.loadForm('moduleForm', data);
		if ('ADD' === SCFUtils.OPTSTATUS) {
			var options = {};
			options.data = {
				refName : 'menuRef',
				refField : 'sysRefNo'
			};
			SCFUtils.getRefNo(options);

		}
	}
}

/**
 * 保存按钮操作：
 * 返回FORM对象的内容给SCFUtils.onSaveBtnClick()。进行保存数据操作。
 * @returns
 */
function onNextBtnClick() {
	return SCFUtils.convertArray('moduleForm');
}

function newId() {
	var options = {};
	options.data = {
		refName : 'FuncRef',
		refField : 'menuId'
	};
	options.force = true;
	SCFUtils.getRefNo(options);
	//new on 20160801 by JinJH
	if($("#menuId").val()!=null){
		$("#menuId").parent('td').removeClass('requried-item-ifo');
		$("#menuId").removeClass('validatebox-invalid');
	}
}

function pageOnFPLoad(data) {

	SCFUtils.loadForm('moduleForm', data);

}

function pageOnResultLoad(data) {

	SCFUtils.loadForm('moduleForm', data);

}




function onDelBtnClick() {

	var sysRefNo = $('#sysRefNo').val();
	var result = false;
	var option = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000172',
			sysRefNo : sysRefNo
		},
		callBackFun : function(data) {
			if (data.success) {
				if (data.rows.length == 0) {
					result = true;
					return result;
				} else {
					SCFUtils.error("非根节点，不可删除");
					return;
				}

			}
		}
	};
	SCFUtils.ajax(option);
	if (result == true) {
		return SCFUtils.convertArray('moduleForm');
	} else {
		return;
	}

	
}