/*$(function(){
	ajaxBox();	
	var options={};
	options.data = {
			refName: 'UserRef',
			refField:'sysRefNo'
				};
	SCFUtils.getRefNo(options);
});
 */
function pageOnInt() {
	ajaxBlOwneridBox();
	queryRoleInfo();
}

function pageOnLoad(data) {
	var options = {};
	options.data = {
		refName : 'UserRef',
		refField : 'sysRefNo'
	};
	SCFUtils.getRefNo(options);
	SCFUtils.loadForm('userAddForm', data);
	queryReUserRoles(data);
	if (!(SCFUtils.FUNCTYPE == 'PM' && SCFUtils.OPTSTATUS == 'ADD')) {
		SCFUtils.setTextReadonly("userId", true);
		
	} else {
		var roleId = document.getElementById('roleId');
		var defaultRole = new Option('默认角色', 'ROLE000017');
		
		roleId.options.add(defaultRole);
	}
}

function pageOnPreLoad(data) {
	if(data.obj.userType=='1'){
		ajaxBlOwneridBox();
	}else{
		ajaxCompanyBox();
	}
	SCFUtils.loadForm('userAddForm', data);
	var roleList = data.obj.roleIds;
	var list = SCFUtils.parseGridData(roleList);
	loadRoleList(list);
}

function pageOnResultLoad(data) {
	$("input[name='userType']").attr('disabled',true);
	if(data.obj.userType=='1'){
		ajaxBlOwneridBox();
	}else{
		ajaxCompanyBox();
	}
	SCFUtils.loadForm('userAddForm', data);
	var roleList = data.obj.roleIds;
	var list = SCFUtils.parseGridData(roleList);
	loadRoleList(list);
}

function pageOnReleasePageLoad(data) {
	$('#inputtrUserType').hide();
	ajaxBox();
	$("input[name='userType']").attr('disabled',true);
	SCFUtils.loadForm('userAddForm', data);
	queryReUserRole(data);
	if (SCFUtils.FUNCTYPE == 'RE' && SCFUtils.OPTSTATUS == 'DELETE') {
		queryDeleteUserRole(data);
	}
	
}

function pageOnReleasePreLoad(data) {
	$('#inputtrUserType').hide();
	ajaxBox();
	$("input[name='userType']").attr('disabled',true);
	SCFUtils.loadForm('userAddForm', data);
	var roleList = data.obj.roleIds;
	var list = SCFUtils.parseGridData(roleList);
	loadRoleList(list);
}

function pageOnReleaseResultLoad(data) {
	$('#inputtrUserType').hide();
	ajaxBox();
	$("input[name='userType']").attr('disabled',true);
	SCFUtils.loadForm('userAddForm', data);
	var roleList = data.obj.roleIds;
	var list = SCFUtils.parseGridData(roleList);
	loadRoleList(list);
}

function onNextBtnClick() {
	if(SCFUtils.FUNCTYPE != 'RE'){
		$('#userStatus').val("0");
	}
	var mainData = SCFUtils.convertArray('userAddForm');
	var grid = {};
	var roleId = "";
	if (SCFUtils.FUNCTYPE != 'RE') {
		roleId = resultRole();
		roleId = SCFUtils.json2str(roleId);
	} else {
		roleId = $('#roleHD').val();
	}
	$.extend($.extend(mainData, grid), {
		"roleIds" : roleId
	});
	return mainData;
}

function onDelBtnClick() {
	return SCFUtils.convertArray('userAddForm');
}

function ajaxBlOwneridBox() {
	var sysBusiUnit = $('#sysBusiUnit').val();
	var option = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000095',
			busiUnit : sysBusiUnit
		},
		callBackFun : function(data) {
			if (data.success) {
				$('#userOwnerid').combobox('loadData', data.rows);
			}
		}
	};
	SCFUtils.ajax(option);
}

function ajaxCompanyBox() {
	var sysBusiUnit = $('#sysBusiUnit').val();
	var option = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000277',
			busiUnit : sysBusiUnit
		},
		callBackFun : function(data) {
			if (data.success) {
				// var allData = {"sysRefNo":"","custNm":"===请选择==="};
				// data.rows.push(allData);
				$('#userOwnerid').combobox('loadData', data.rows);
				// $('#companyOwnerid').combobox('setValue',"");
			}
		}
	};
	SCFUtils.ajax(option);
}

function ajaxBox(){
	var sysBusiUnit = $('#sysBusiUnit').val();
	var option = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000287',
				busiUnit : sysBusiUnit
			},
			callBackFun : function(data) {
				if (data.success) {
					$('#userOwnerid').combobox('loadData', data.rows);
				}
			}
		};
		SCFUtils.ajax(option);
}

function checkBusiUnit() {
	var userOwnerid = $('#userOwnerid').combobox('getValue');
	var option = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000213',
			userOwnerid : userOwnerid
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				$('#busiUnit').val(data.rows[0].busiUnit);
			}
		}
	};
	SCFUtils.ajax(option);
}


function selectChange() {
	$("#add").attr("disabled", false); // 首先将添加按钮设为可用
	var selectObject = $("#myselect").val(); // 取得左侧所选取的值
	$("#roleId").find("option").each(function() { // 以 option 为参数 查询
		// 右侧所有的可选项并逐一遍历
		if ($(this).val() == selectObject) { // 判断左侧中选择的项在右侧中是否已经存在
			$("#add").attr("disabled", true); // 如果上面的判断存在则将添加按钮设为不可用, 禁止重复添加
		}
	});
}

function selectedChange(){
	var flag = true;
	$("#del").attr("disabled", false); // 首先将删除按钮设为可用
	var selectObject = $("#roleId").val(); // 取得右侧所选取的值
	if (null == selectObject){
		SCFUtils.alert("请选择要删除的名字!");
		flag = false;
		return flag;
	}else if(selectObject[0]=="ROLE000017"){
		$("#del").attr("disabled", true); // 如果上面的判断为默认角色删除按钮设为不可用
		flag = false;
		return flag;
	}
	return flag;
}

function queryReUserRole(data) {
	var userId = data.obj.sysRefNo;
	if (!SCFUtils.isEmpty(userId)) {
		var opt = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000157',
				userId : userId
			},
			callBackFun : function(data) {
				if (data.success && !SCFUtils.isEmpty(data.rows)) {
					// $('#productHD').val(SCFUtils.json2str(data.rows));
					parseString(data.rows);
					var obj = document.getElementById("myselect");
					var length = obj.options.length;
					var content;
					$.each(data.rows, function(i, n) {
						for ( var m = 0; m < length; m++) {
							if (obj.options[m].value == n.roleId) {
								content = "<option  value='"
										+ obj.options[m].value + "'>"
										+ obj.options[m].text + "</option>"; // 填充右侧的值
								$("#roleId").append(content);
							}
						}
					});
				}
			}
		};
		SCFUtils.ajax(opt);
	}
}

function queryReUserRoles(data) {
	var userId = data.obj.sysRefNo;
	if (!SCFUtils.isEmpty(userId)) {
		var opt = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000158',
				userId : userId
			},
			callBackFun : function(data) {
				if (data.success && !SCFUtils.isEmpty(data.rows)) {
					// $('#productHD').val(SCFUtils.json2str(data.rows));
					parseString(data.rows);
					var obj = document.getElementById("myselect");
					var length = obj.options.length;
					var content;
					$.each(data.rows, function(i, n) {
						for ( var m = 0; m < length; m++) {
							if (obj.options[m].value == n.roleId) {
								content = "<option  value='"
										+ obj.options[m].value + "'>"
										+ obj.options[m].text + "</option>"; // 填充右侧的值
								$("#roleId").append(content);
							}
						}
					});
				}
			}
		};
		SCFUtils.ajax(opt);
	}
}

function parseString(data, isSerialize) {
	var p = {};
	var total = 0;
	$.each(data, function(i, obj) {
		p['rows' + i + ''] = isSerialize === true ? SCFUtils.json2str(obj)
				: obj;
		total++;
	});
	p._total_rows = total;
	$('#roleHD').val(SCFUtils.json2str(p));
}

function toAdd() {
	var obj = document.getElementById("myselect");
	var selectText = obj.options[obj.selectedIndex].text;
	var selectObject = $("#myselect").val(); // 取得左侧所选取的值
	if (null == selectObject) {
		SCFUtils.alert("请选择要添加的内容!");
		return false;
	}
	var content = "<option  value='" + selectObject + "'>" + selectText
			+ "</option>"; // 填充右侧的值
	$("#roleId").append(content);
	// $("#myselect option:selected").remove(); // 删除左侧所选的值
	selectChange(); // 最后调用 selectChange()模拟onChange()事件,
	// 主要是为了能够及时地将禁用的添加按钮重新激活(如果有必要)

}
function toRemove() {
	if(selectedChange()){
//		var removeObject = $("#roleId option:selected").val(); // 取得右侧要移除的内容,
		// 注意可多选
//		if (null == removeObject) {
//			SCFUtils.alert("请选择要删除的名字!");
//			return false;
//		}
		$("#roleId option:selected").remove();
		selectChange(); // 与toAdd()中调用原理一致
	}
	
}

function resultRole() {
	var roleList = jQuery("#roleId  option");
	var p = {};
	var total = 0;
	$.each(roleList, function(i, n) {
		var role = {};
		role.roleNm = n.text;
		role.roleId = n.value;
		role.sysRefNo = SCFUtils.uuid(8);
		role.userId = $('#sysRefNo').val();
		p['rows' + i + ''] = role;
		total++;
	});
	p._total_rows = total;
	return p;
}

function queryDeleteUserRole(data) {
	var userId = data.obj.sysRefNo;
	if (!SCFUtils.isEmpty(userId)) {
		var opt = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000186',
				userId : userId
			},
			callBackFun : function(data) {
				if (data.success && !SCFUtils.isEmpty(data.rows)) {
					// $('#productHD').val(SCFUtils.json2str(data.rows));
					parseString(data.rows);
					var obj = document.getElementById("myselect");
					var length = obj.options.length;
					var content;
					$.each(data.rows, function(i, n) {
						for ( var m = 0; m < length; m++) {
							if (obj.options[m].value == n.roleId) {
								content = "<option  value='"
										+ obj.options[m].value + "'>"
										+ obj.options[m].text + "</option>"; // 填充右侧的值
								$("#roleId").append(content);
							}
						}
					});
				}
			}
		};
		SCFUtils.ajax(opt);
	}
}

function queryRoleInfo() {
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000181'
		},
		callBackFun : function(data) {
			if (data.success) {
				var select = document.getElementById('myselect');
				$(data.rows).each(function(i, obj) {
					var newItem = new Option(obj.roleName, obj.roleId);
					select.options.add(newItem);
				});

			}
		}
	};
	SCFUtils.ajax(options);
}

function bailianUser() {
	$('#userOwnerid').combobox('setValue',"");
	$('#busiUnit').val("");
	ajaxBlOwneridBox();
}

function companyUser() {
	$('#userOwnerid').combobox('setValue',"");
	$('#busiUnit').val("");
	ajaxCompanyBox();
}

function loadRoleList(list) {
	var select = document.getElementById('roleId');
	$.each(list, function(i, n) {
		var newItem = new Option(n.roleNm, n.roleId);
		select.options.add(newItem);
	});
}

function RegVerBox() {
	var result = false;
	var userId = $('#userId').val();
	if (userId == null || userId == "") {
		SCFUtils.error("请输入用户名");
		return result;
	}
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000129',
			userId : userId
		},
		callBackFun : function(data) {
			if (data.success) {
				if (data.rows.length != 0) {
					SCFUtils.error("该用户ID已被注册");
					$("#userId").val(null);
					return;
				} else {
					result = true;
					return result;
				}
			}
		}

	};
	SCFUtils.ajax(options);
	return result;
}
