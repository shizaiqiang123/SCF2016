function pageOnInt(data) {
	ajaxBox();
	var options = $('#blgOrgid').combotree("options");
	options.onClick = setOrgId;
	// SCFUtils.reasonReadonly();
	if (SCFUtils.OPTSTATUS != "ADD"&&SCFUtils.OPTSTATUS != "EDIT") {
		SCFUtils.setComboReadonly("blgOrgid", true);
	}
}
function pageOnLoad(data) {
	if (SCFUtils.OPTSTATUS == "ADD") {
		loadRef();
	} else {
		data.obj.blgOrgidRel = data.obj.blgOrgid;
		data.obj.orgIdRel = data.obj.orgId;
		data.obj.userOrgId = data.obj.orgId
				.substring(data.obj.orgId.length - 3);
		SCFUtils.loadForm('InstForm', data);
		if(SCFUtils.isEmpty(data.obj.blgOrgid)){
			$('#blgOrgid').combotree({
				required : false
			});
			$('#blgOrgid').combotree({
				readonly : true
			});
		}
//		setOrgId();
		if ("DELETE" == SCFUtils.OPTSTATUS) {
			var flag = queryIsHaveChild(data.obj.orgId);
			if (flag) {
				SCFUtils.alert("请先删除此机构的所有子机构！");
				readonlyButton("next_btn", true);
			}
		}
	}
}
function pageOnResultLoad(data) {
	$('#blgOrgid').combotree('readonly', true);
	SCFUtils.loadForm('InstForm', data);
	// SCFUtils.showReason("reasonDiv",data.obj);
}
function pageOnPreLoad(data) {
	// pageOnLoad(data);
	SCFUtils.loadForm('InstForm', data.obj);
	if(SCFUtils.isEmpty(data.obj.blgOrgid)){
		$('#blgOrgid').combotree({
			required : false
		});
		$('#blgOrgid').combotree({
			readonly : true
		});
	}
}
// 复核用的页面加载
function pageOnReleasePageLoad(data) {
	SCFUtils.loadForm('InstForm', data);
}
function pageOnReleasePreLoad(data) {
	SCFUtils.loadForm('InstForm', data.obj);
}
function pageOnReleaseResultLoad(data) {
	SCFUtils.loadForm('InstForm', data.obj);
}
// 退回处理
function pageOnFPLoad(data) {
	data.obj.blgOrgidRel = data.obj.blgOrgid;
	data.obj.orgIdRel = data.obj.orgId;
	data.obj.userOrgId = data.obj.orgId.substring(data.obj.orgId.length - 3);
	SCFUtils.loadForm('InstForm', data);
	if(SCFUtils.isEmpty(data.obj.blgOrgid)){
		$('#blgOrgid').combotree({
			required : false
		});
		$('#blgOrgid').combotree({
			readonly : true
		});
	}
	setOrgId();
	if ("DELETE" == SCFUtils.OPTSTATUS) {
		var flag = queryIsHaveChild(data.obj.orgId);
		if (flag) {
			SCFUtils.alert("请先删除此机构的所有子机构！");
			readonlyButton("next_btn", true);
		}
	}
}
function onNextBtnClick() {
	var data = SCFUtils.convertArray('InstForm');
	return data;
}

function queryIsHaveChild(orgId) {
	var flag = false;
	var options = {
		url : SCFUtils.AJAXURL,
		async : false,
		data : {
			cacheType : 'non',
			queryId : 'Q_S_000007',
			orgId : orgId
		},
		callBackFun : function(data) {
			if (data.success) {
				// 开始拼装
				if (!SCFUtils.isEmpty(data.rows)) {
					flag = true;
				}
			}
		}
	};
	SCFUtils.ajax(options);
	return flag;
}

function setOrgId(node) {
	var t = $('#blgOrgid').combotree('tree'); // 获取树对象
	var node = t.tree('getSelected'); // 获取选择的节点
	var size = node.children.length;
	if (SCFUtils.isEmpty(node)) {
		return;
	}
	var orgId = "";
	var blgOrgidRel = $("#blgOrgidRel").val();
	var orgIdRel = $("#orgIdRel").val();
	if (orgIdRel == node.id) {
		SCFUtils.alert("请不要将自己设为自己的上层机构！");
		$('#blgOrgid').combotree('setValue', blgOrgidRel);
		return;
	}
	if (blgOrgidRel == node.id && !SCFUtils.isEmpty(blgOrgidRel)) {
		orgId = $("#orgIdRel").val();
	} else {
		var userOrgId = $("#userOrgId").val();
		if(SCFUtils.Math(size, 0, 'sub')>0){
			size=size+1;
			var length = size.toString().length;
			for(var i=length;i<3;i++){	
				orgId+="0";
			}
			orgId+=size;
		}else{
			orgId="001"
		}
		orgId = node.id + orgId;
//		orgId = node.id + userOrgId;
		// var children = node.children;
		// $.each(children, function(i, n) {
		// if (n.id == orgId) {
		// orgId = (parseInt(orgId) + 1).toString();
		// }
		// });
	}
	$("#orgId").val(orgId);
	$("#blgOrgNm").val(node.text);
	var orgLevel = parseInt((orgId.toString().length) / 3);
	$("#orgLevel").val(orgLevel.toString());
}

function loadRef() {
	var options = {};
	options.data = {
		refName : 'InstNo',
		refField : 'sysRefNo'
	};
	SCFUtils.getRefNo(options);

	var options1 = {};
	options1.data = {
		refName : 'orgId',
		refField : 'userOrgId'
	};
	SCFUtils.getRefNo(options1);
}
function ajaxBox() {
	var blgOrgTp = "Y";
	if ("ADD" == SCFUtils.OPTSTATUS)
		blgOrgTp = "N";
	var optt = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_S_INSTINFO_0001',
			cacheType : 'non',
			rowsTp : "M",
			orgId : $("#sysOrgId").val(),
			blgOrgTp : blgOrgTp
		},
		callBackFun : function(data) {
			if (data.success) {
				if (SCFUtils.isEmpty(data.rows)) {
					$('#blgOrgid').combotree({
						required : false
					});
					$("#orgId").val("10001");
					$("#orgLevel").val("0");
				} else {
					$('#blgOrgid').combotree('loadData', data.rows);
				}
			}
		}
	};
	SCFUtils.ajax(optt);
	// SCFUtils.queryInstTree("blgOrgid");
	SCFUtils.setTextReadonly('orgId', true);
}

//控制按钮只读
function readonlyButton(bt_id, flag) {
	if (flag) {
		$('#' + bt_id, parent.document).attr('disabled', true).addClass(
				'cursorD').removeClass('btnRed').addClass('btnGrey');
	} else {
		$('#' + bt_id, parent.document).attr('disabled', false).removeClass(
				'cursorD').addClass('btnRed').removeClass('btnGrey');
	}
}
