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
function ajaxBox() {
//	SCFUtils.setDateboxReadonly('EditDt', true);
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000182'
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

function pageOnPreLoad(data) {
	SCFUtils.loadForm('userAddForm', data);
	addRoles(data.obj.roleIds);
	if($("#userGrade").combobox("getValue")==2){
		$("#custInfoTd").show();
		$("#custInfo").show();
		$("#sysOrgIdTr").hide();
	}else if($("#userGrade").combobox("getValue")==3){
		$("#custInfoTd").show();
		$("#custInfo").show();
		$("#sysOrgIdTr").hide();
	}else if($("#userGrade").combobox("getValue")==1){
		$("#custInfoTd").hide();
		$("#custInfo").hide();
		$("#sysOrgIdTr").show();
	}
}
function addRoles(data){
	parseString(data);
	var obj = document.getElementById("myselect");
	var length = obj.options.length;
	var content;
	$.each(data, function(i, n) {
		for (var m = 0; m < length; m++) {
			if (obj.options[m].value == n.roleId) {
				content = "<option  value='"
						+ obj.options[m].value + "'>"
						+ obj.options[m].text + "</option>"; // 填充右侧的值
				$("#roleId").append(content);
			}
		}
	});
}

function pageOnResultLoad(data) {
	SCFUtils.loadForm('userAddForm', data);
	var roleList = data.obj.roleIds;
	var list = SCFUtils.parseGridData(roleList);
	loadRoleList(list);
	if($("#userGrade").combobox("getValue")==2){
		$("#custInfoTd").show();
		$("#custInfo").show();
		$("#sysOrgIdTr").hide();
	}else if($("#userGrade").combobox("getValue")==3){
		$("#custInfoTd").show();
		$("#custInfo").show();
		$("#sysOrgIdTr").hide();
	}else if($("#userGrade").combobox("getValue")==1){
		$("#custInfoTd").hide();
		$("#custInfo").hide();
		$("#sysOrgIdTr").show();
	}
	/*queryDeleteproducts(data);如果加上这个就会重复*/
}
function loadRoleList(list){
	var select = document.getElementById('roleId');
	$.each(list, function(i, n) {
		var newItem = new Option(n.roleNm, n.roleId);
		select.options.add(newItem);
	})
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
					$('#userId').val(null);
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
function pageOnFPLoad(data) {
	if (SCFUtils.OPTSTATUS == 'ADD' && SCFUtils.FUNCTYPE != 'FP') {
		var roleId = document.getElementById('roleId');
		var defaultRole = new Option('默认角色', 'ROLE000017');
		roleId.options.add(defaultRole);
	}else{
		queryReUserRoles(data);
	}
	SCFUtils.loadForm('userAddForm', data);
	ajaxbrNm(data);
}
function pageOnReleasePageLoad(data){
	SCFUtils.loadForm('userAddForm', data);
	queryReUserRole(data);
	if (SCFUtils.FUNCTYPE =='RE' && SCFUtils.OPTSTATUS =='DELETE') {
		queryDeleteUserRole(data);
	}
	ajaxbrNm(data);
	if($("#userGrade").combobox("getValue")==1){
		$("#custInfoTd").hide();
		$("#custInfo").hide();
		$("#sysOrgIdTr").show();
	}else if($("#userGrade").combobox("getValue")==2){
		var custId = $("#custId").val();
		var opt={
				url:SCFUtils.AJAXURL,
				data: {
					queryId:'Q_P_000687',
					sysRefNo: custId
				},
				callBackFun:function(data){
					$("#custNm").val(data.rows[0].custNm);
				}
		}
		SCFUtils.ajax(opt);
		$("#custInfoTd").show();
		$("#custInfo").show();
		$("#sysOrgIdTr").hide();
	}else if($("#userGrade").combobox("getValue")==3){
		var custId = $("#custId").val();
		var opt={
				url:SCFUtils.AJAXURL,
				data: {
					queryId:'Q_P_000689',
					sysRefNo: custId
				},
				callBackFun:function(data){
					$("#custNm").val(data.rows[0].patnerNm);
				}
		}
		SCFUtils.ajax(opt);
		$("#custInfoTd").show();
		$("#custInfo").show();
		$("#sysOrgIdTr").hide();
	}
}
function queryDeleteUserRole(data){
	 var userId=data.obj.sysRefNo;
		if(!SCFUtils.isEmpty(userId)){
			 var opt={
						url:SCFUtils.AJAXURL,
						data: {
							queryId:'Q_P_000186',
							userId: userId
						},
						callBackFun:function(data){
							if(data.success&&!SCFUtils.isEmpty(data.rows)){
//								$('#productHD').val(SCFUtils.json2str(data.rows));
								parseString(data.rows);
								var obj = document.getElementById("myselect");
								var length=obj.options.length;
								var content;
								$.each(data.rows,function(i,n){
									for(var m=0;m<length;m++){
										if(obj.options[m].value==n.roleId){
											content = "<option  value='" + obj.options[m].value + "'>" + obj.options[m].text 
											+ "</option>"; // 填充右侧的值
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

function selectChange() {
	$("#add").attr("disabled", false); // 首先将添加按钮设为可用
	var selectObject = $("#myselect").val(); // 取得左侧所选取的值
	// var obj=document.getElementById("myselect");
	// var selectText=obj.options[obj.selectedIndex].text;
	// var selectObject=document.getElementById("myselect").value;
	$("#roleId").find("option").each(function() { // 以 option 为参数 查询
		// 右侧所有的可选项并逐一遍历
		if ($(this).val() == selectObject) { // 判断左侧中选择的项在右侧中是否已经存在
			$("#add").attr("disabled", true); // 如果上面的判断存在则将添加按钮设为不可用, 禁止重复添加
		}
	});
}
function queryReUserRoles(data){
	var queryId = 'Q_P_000158';
	if(SCFUtils.FUNCTYPE == 'FP')queryId = 'Q_P_000550';
	var userId=data.obj.sysRefNo;
	if(!SCFUtils.isEmpty(userId)){
		 var opt={
					url:SCFUtils.AJAXURL,
					data: {
						queryId:queryId,
						userId: userId
					},
					callBackFun:function(data){
						if(data.success&&!SCFUtils.isEmpty(data.rows)){
							data.rows = distinct(data.rows);
//							$('#productHD').val(SCFUtils.json2str(data.rows));
							parseString(data.rows);
							var obj = document.getElementById("myselect");
							var length=obj.options.length;
							var content;
							$.each(data.rows,function(i,n){
								for(var m=0;m<length;m++){
									if(obj.options[m].value==n.roleId){
										content = "<option  value='" + obj.options[m].value + "'>" + obj.options[m].text 
										+ "</option>"; // 填充右侧的值
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

function distinct(data){
	var arr = [];
	for (var i = 0; i < data.length; i++) {
		var b = true;
		for (var j = 0; j < arr.length; j++) {
			if(data[i].roleId==arr[j].roleId){
				b=false;
				break;
			}
		}
		if(arr==[]||b){
			arr.push(data[i]);
		}
	}
	return arr;
}
function onSubmitBtnClick(){
	var mainData = SCFUtils.convertArray('userAddForm');	
	var userIds = resultRole();
	userIds=SCFUtils.json2str(userIds);
	var grid = {};
	var griddata; 
	griddata = SCFUtils.getGridData('roleTable');
	grid.doname = SCFUtils.json2str(griddata);
	$.extend($.extend(mainData,grid),{"userIds":userIds});	
	return mainData;
}

function queryReUserRole(data){
	var userId=data.obj.sysRefNo;
	if(!SCFUtils.isEmpty(userId)){
		 var opt={
					url:SCFUtils.AJAXURL,
					data: {
						queryId:'Q_P_000157',
						userId: userId
					},
					callBackFun:function(data){
						if(data.success&&!SCFUtils.isEmpty(data.rows)){
//							$('#productHD').val(SCFUtils.json2str(data.rows));
							data.rows = distinct(data.rows);
							parseString(data.rows);
							var obj = document.getElementById("myselect");
							var length=obj.options.length;
							var content;
							$.each(data.rows,function(i,n){
								for(var m=0;m<length;m++){
									if(obj.options[m].value==n.roleId){
										content = "<option  value='" + obj.options[m].value + "'>" + obj.options[m].text 
										+ "</option>"; // 填充右侧的值
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

function parseString(data,isSerialize){
	
	 var p = {};	 
	 var total = 0;
		$.each(data,function(i,obj){
			
			p['rows'+i+''] = isSerialize===true?SCFUtils.json2str(obj):obj;
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
		alert("请选择要添加的内容!");
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
	var removeObject = $("#roleId option:selected").val(); // 取得右侧要移除的内容,
	// 注意可多选
	if (null == removeObject) {
		alert("请选择要删除的名字!");
		return false;
	}
	$("#roleId option:selected").remove();
	selectChange(); // 与toAdd()中调用原理一致
}

function resultRole(){
	   var roleList = jQuery("#roleId  option");
	   var p = {};	
	   var total = 0;
	   $.each(roleList, function(i, n) {
		   var role = {};
		   role.roleNm = n.text;
		   role.roleId = n.value;
		   role.sysRefNo =  SCFUtils.uuid(8);   
		   role.userId = $('#sysRefNo').val();
		   p['rows'+i+''] =role;
		   total++;
		})
		p._total_rows = total;
		return p;
}
function pageOnInt(){
	//ajaxBox();
	ajaxBoxtwo();
	$("#custInfoTd").hide();
	$("#custInfo").hide();
}
function pageOnLoad(data) {
	//SCFUtils.setTextReadonly("userId", true);
	if ('PM'===SCFUtils.FUNCTYPE&&SCFUtils.OPTSTATUS == 'ADD') {
		var roleId = document.getElementById('roleId');
		var defaultRole = new Option('默认角色', 'ROLE000017');
		roleId.options.add(defaultRole);
		var options = {};
		options.data = {
			refName : 'UserRef',
			refField : 'sysRefNo'
		};
		SCFUtils.getRefNo(options);
	}
	SCFUtils.loadForm('userAddForm', data);
	$('#userStatus').val("1");
	queryReUserRoles(data);
	ajaxbrNm(data)
	if($("#userGrade").combobox("getValue")==1){
		$("#custInfoTd").hide();
		$("#custInfo").hide();
		$("#sysOrgIdTr").show();
	}else if($("#userGrade").combobox("getValue")==2){
		var custId = $("#custId").val();
		var opt={
				url:SCFUtils.AJAXURL,
				data: {
					queryId:'Q_P_000687',
					sysRefNo: custId
				},
				callBackFun:function(data){
					$("#custNm").val(data.rows[0].custNm);
				}
		}
		SCFUtils.ajax(opt);
		$("#custInfoTd").show();
		$("#custInfo").show();
		$("#sysOrgIdTr").hide();
	}else if($("#userGrade").combobox("getValue")==3){
		var custId = $("#custId").val();
		var opt={
				url:SCFUtils.AJAXURL,
				data: {
					queryId:'Q_P_000689',
					sysRefNo: custId
				},
				callBackFun:function(data){
					$("#custNm").val(data.rows[0].patnerNm);
				}
		}
		SCFUtils.ajax(opt);
		$("#custInfoTd").show();
		$("#custInfo").show();
		$("#sysOrgIdTr").hide();
	}
}

function ajaxbrNm(data) {

	// 添加网点信息，部门信息
	if (!SCFUtils.isEmpty(data.obj.ownerBrId)) {
		var options1 = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000323',
				ownerBrId : data.obj.ownerBrId
			},
			callBackFun : function(data) {
				if (data.success && !SCFUtils.isEmpty(data.rows[0])) {
					$('#ownerBrNm').val(data.rows[0].brNm);
				}
			}
		};
		SCFUtils.ajax(options1);
	}
}


function onNextBtnClick() {
	if(SCFUtils.FUNCTYPE!='RE'){
		$('#userStatus').val("0");
	}
	var mainData = SCFUtils.convertArray('userAddForm');	
	var grid = {};
	if(SCFUtils.FUNCTYPE=='PM'){
		var roleId = resultRole();
		roleId=SCFUtils.json2str(roleId);
	}else{
		var roleId=$('#roleHD').val();
	}
	$.extend($.extend(mainData,grid),{"roleIds":roleId});
	return mainData;
}

function onDelBtnClick() {
	return SCFUtils.convertArray('userAddForm');
}
//查询网点信息
function showLookUpWindow() {
	var options = {
		title : '网点信息查询',
		reqid : 'I_P_000106',
		onSuccess : netAddressSuccess
	};
	SCFUtils.getData(options);
}

function netAddressSuccess(data) {
	$('#ownerBrId').val(data.sysRefNo);
	$('#ownerBrNm').val(data.brNm);
	/*
	 * 查询按钮加载数据成功，去判断ownerBrNm的td有无值,无值不做处理
	 * 有值去除父层requried-item-ifo方法，去除这个id的validatebox-invalid方法
	 * new on 20160728 by XuX
	 */
	if($('#ownerBrNm').val()!=null){//$('#ownerBrNm')为查询左边的td的id
		$('#ownerBrNm').parent('td').removeClass('requried-item-ifo');//去除*号
		$('#ownerBrNm').removeClass('validatebox-invalid');
	}

}
function ajaxBoxtwo() {
	// SCFUtils.setDateboxReadonly('EditDt', true);
	
	var blgOrgTp = "N";
	var optt = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_S_INSTINFO_0001',
				cacheType : 'non',
				rowsTp : "M",
//				orgId : $("#userOrgId").val(),
//				blgOrgTp : blgOrgTp
			},
			callBackFun : function(data) {
				if (data.success) {
					if( !SCFUtils.isEmpty(data.rows)){
						$('#sysOrgId').combotree('loadData', data.rows);
					}
				}
			}
		};
	SCFUtils.ajax(optt);
	
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000182'
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

//	var options2 = {
//		url : SCFUtils.AJAXURL,
//		data : {
//			queryId : 'Q_P_000324'
//		},
//		callBackFun : function(data) {
//			if (data.success) {
//				$('#ownerDep').combobox('loadData', data.rows);
//			}
//		}
//	};
//	SCFUtils.ajax(options2);
	var userGradeLevel = [ {
		"id" : '1',
		"text" : "银行级"
	}, {
		"id" : '2',
		"text" : "企业级"
	}, {
		"id" : '3',
		"text" : "合作方"
	} ];
	$("#userGrade").combobox('loadData', userGradeLevel);
}

/**
 * 改变用户级别
 */
function changeOwnerDep(){
	//增加之前删除所有option
	document.getElementById("myselect").options.length = 0; 
	var roleLevel = $("#userGrade").combobox("getValue");
	var options = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000683',
				roleLevel : roleLevel,
				cacheType : 'non'
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
		//是否显示客户信息查询框
		if(roleLevel==1){//银行
			$("#custInfoTd").hide();
			$("#custInfo").hide();
			$("#sysOrgIdTr").show();
			$('#sysOrgId').combotree({
				required : true
			});
			$('#custNm').validatebox({
				required : false
			});
			$('#custNm').parent('td').removeClass('requried-item-ifo');//去除*号
		}
		if(roleLevel==3){//合作方
			$("#custInfoTd").html("合作方名称：");
			$("#custInfoTd").show();
			$("#custInfo").show();
			$("#sysOrgIdTr").hide();
			$('#sysOrgId').combotree({
				required : false
			});
			$('#custNm').validatebox({
				required : true
			});
			$('#custNm').parent('td').addClass('requried-item-ifo');//去除*号
		}
		if(roleLevel==2){//企业
			$("#custInfoTd").html("客户名称：");
			$("#custInfoTd").show();
			$("#custInfo").show();
			$("#sysOrgIdTr").hide();
			$('#sysOrgId').combotree({
				required : false
			});
			$('#custNm').validatebox({
				required : true
			});
			$('#custNm').parent('td').addClass('requried-item-ifo');//去除*号
		}
		
}

function showLookUpCust(){
	//查询客户信息   合作方查询合作方
	if($("#userGrade").combobox("getValue")==2){
		var options = {
				title:'客户信息查询',
				reqid:'I_P_000218',
				onSuccess:custerSuccess
		};
		SCFUtils.getData(options);
	}else if($("#userGrade").combobox("getValue")==3){
		var options = {
				title : '查询监管方信息',
				reqid : 'I_P_000219',
				onSuccess : getPatnerPatSuccess
			};
			SCFUtils.getData(options);
	}
}

function custerSuccess(data){
	$('#custId').val(data.sysRefNo);
	$('#custNm').val(data.custNm);
	/*
	 * 查询按钮加载数据成功，去判断cntrctNo的div有无值,无值不做处理
	 * 有值去除父层requried-item-ifo方法，去除这个id的validatebox-invalid方法
	 * new on 20160728 by XuX
	 */
	if($('#custNm').val()!=null){//$('#cntrctNo')为查询左边的div的id
		$('#custNm').parent('td').removeClass('requried-item-ifo');//去除*号
		$('#custNm').removeClass('validatebox-invalid');
	}
}

//查询监管方信息(动产质押的时候用，值添加到关联监管方表)
function getPatnerPatSuccess(data) {
	$('#custId').val(data.sysRefNo);
	$('#custNm').val(data.patnerNm);
	if($('#custNm').val()!=null){//$('#cntrctNo')为查询左边的div的id
		$('#custNm').parent('td').removeClass('requried-item-ifo');//去除*号
		$('#custNm').removeClass('validatebox-invalid');
	}
}