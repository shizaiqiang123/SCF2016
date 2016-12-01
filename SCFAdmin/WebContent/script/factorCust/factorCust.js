//最先初始化的方法
function pageOnInt() {
	ajaxBox();
	ajaxTable();
	loadcountry();
	SCFUtils.setTextReadonly("bchNm", true);
	SCFUtils.setTextReadonly('custMgrNm', true);
}
// 获取客户类型相关信息
function showOrHideANoInfo() {
	var custTp = $('#custTp').combobox('getValue');
	if (custTp == '2') {
		$('#acNoInfoDiv').hide();

	} else {
		$('#acNoInfoDiv').show();

	}
}
// 上一步的页面
function pageOnPreLoad(data) {
	if(SCFUtils.OPTSTATUS != 'FP' || SCFUtils.OPTSTATUS != 'PM' ){
	var legalRepIdtype = data.obj.legalRepIdtype;
	delete data.obj.legalRepIdtype;
	}
	
	SCFUtils.loadForm('factorForm', data);
	queryCity();
	showOrHideANoInfo();
	SCFUtils.loadGridData('acnoTable', SCFUtils.parseGridData(data.obj.doname),
			false);// 加载数据并保护表格。
	checkCustTp(data);
	
	if(undefined == data.obj.legalRepIdtype){
		$("#legalRepIdtype").combobox("setValue",legalRepIdtype);//解决修改客户信息时，未能回显证件类型的问题。20160830
		SCFUtils.setComboReadonly("legalRepIdtype", true);
	}
}
// jsp页面的主要初始化方法(加载完成后初始化)
function pageOnLoad(data) {
	var options = {};
	options.data = {
		refName : 'FacNo',
		refField : 'sysRefNo'
	};
	SCFUtils.getRefNo(options);
	/*
	 * 
	 *  解决证件类型不置灰的问题
	 * （这样改的原因：因为直接loadform会导致其他问题，只能从data里面移除，再手动加载）
	 */
	var legalRepIdtype = data.obj.legalRepIdtype;
	if(SCFUtils.OPTSTATUS == 'VIEW' || SCFUtils.OPTSTATUS == 'DELETE' ){
		delete data.obj.legalRepIdtype;
	}
	SCFUtils.loadForm('factorForm', data);
	checkCustTp(data,true);
	if ($('#custTp').combobox('getValue') != '') {
		changeCustTp();
	}	//客户管理>查询   的时候授信额度金额和限制条款不允许修改
	if(SCFUtils.OPTSTATUS == 'VIEW' || SCFUtils.OPTSTATUS == 'DELETE' ){
		SCFUtils.setNumberboxReadonly('lmtAmt', true);
		SCFUtils.setTextboxReadonly('limiting', true);
	}
	queryCity();
	queryAcNo('M'); // wjh添加
	


	// 添加该判断在修改的时候不允许修改客户类型
	if (SCFUtils.OPTSTATUS == 'EDIT') {
		SCFUtils.setComboReadonly('custTp', true);
		SCFUtils.setTextReadonly('custInstCd', true);
		//edit时候，所属行业和所属国家不能手动修改
		SCFUtils.setTextReadonly('industryNm',true);
		SCFUtils.setComboReadonly('countryId', true);
	}
	if (SCFUtils.OPTSTATUS == 'EDIT' || SCFUtils.OPTSTATUS == 'VIEW'
			|| SCFUtils.OPTSTATUS == 'DELETE') {
		queryCustIndustry(data.obj.custIndustry);
	}
	
	//判断已用额度是否为null
	if(data.obj.lmtAllocate==null)
		$('#lmtAllocate').numberbox('setValue','0');
	ajaxbrNm(data);
	
	// 解决删除和复核和查询页面进来看到的红色必输字
	if(SCFUtils.OPTSTATUS == 'EDIT' || SCFUtils.OPTSTATUS == 'DELETE' ||SCFUtils.OPTSTATUS == 'VIEW'){
		solveRedWord();
	}
	if(undefined == data.obj.legalRepIdtype && 'ADD' != SCFUtils.OPTSTATUS){
		$("#legalRepIdtype").combobox("setValue",legalRepIdtype);//解决修改客户信息时，未能回显证件类型的问题。20160830
		SCFUtils.setComboReadonly("legalRepIdtype", true);
	}
}
// 下一步的结果页面
function pageOnResultLoad(data) {
	
	var legalRepIdtype = data.obj.legalRepIdtype;
		delete data.obj.legalRepIdtype;
	SCFUtils.loadForm('factorForm', data);
	queryCity();
	showOrHideANoInfo();
	SCFUtils.loadGridData('acnoTable', SCFUtils.parseGridData(data.obj.doname),
			true);// 加载数据并保护表格。
	checkCustTp(data);
	if(undefined == data.obj.legalRepIdtype){
		$("#legalRepIdtype").combobox("setValue",legalRepIdtype);//解决修改客户信息时，未能回显证件类型的问题。20160830
		SCFUtils.setComboReadonly("legalRepIdtype", true);
	}
}

// 复核页面初始化
function pageOnReleasePreLoad(data) {
	var legalRepIdtype = data.obj.legalRepIdtype;
	delete data.obj.legalRepIdtype;
	pageOnPreLoad(data);
	if(undefined == data.obj.legalRepIdtype){
		$("#legalRepIdtype").combobox("setValue",legalRepIdtype);//解决修改客户信息时，未能回显证件类型的问题。20160830
		SCFUtils.setComboReadonly("legalRepIdtype", true);
	}
}
// 复核页面下一步结果页面
function pageOnReleaseResultLoad(data) {
	pageOnResultLoad(data);
}
// 复核页面的上一步
function pageOnReleasePageLoad(data) {
	var legalRepIdtype = data.obj.legalRepIdtype;
	delete data.obj.legalRepIdtype;
	
	SCFUtils.loadForm('factorForm', data);
	SCFUtils.eachElement('factorForm');
	queryCity();
	queryAcNo('P');// www
	ajaxbrNm(data);
	checkCustTp(data);
	queryCustIndustry(data.obj.custIndustry);
	if(undefined == data.obj.legalRepIdtype){
		$("#legalRepIdtype").combobox("setValue",legalRepIdtype);//解决修改客户信息时，未能回显证件类型的问题。20160830
		SCFUtils.setComboReadonly("legalRepIdtype", true);
	}
}

function pageOnFPLoad(data) {
	SCFUtils.loadForm('factorForm', data);
	//SCFUtils.eachElement('factorForm');
	queryCity();
	ajaxbrNm(data);
	checkCustTp(data);
	queryAcNo(); 
	
	//查询行业信息   
	queryCustIndustry(data.obj.custIndustry);
	// 解决退回处理页面进来看到的红色必输字  
	solveRedWord();
	SCFUtils.setComboReadonly('custTp', true);
	SCFUtils.setTextReadonly('custInstCd', true);
	//所属行业和所属国家不能手动修改
	SCFUtils.setTextReadonly('industryNm',true);
	SCFUtils.setComboReadonly('countryId', true);
	
}

function onNextBtnClick() {
	// $('#orgNm').val($('#custNm').val());
	// $('#orgTp').val('F');
	// $('#custTp').val('F');
	// $('#orgOwnerid').val($('#sysRefNo').val());
	var mainData = SCFUtils.convertArray('factorForm');
	if (checkCust()) {
		SCFUtils.alert("该客户还有未核销的应收账款,请检查。");
		return;
	}

	// easyui combox渲染多次后 下拉框选项不能选择bug 所以只能在下一步时校验
	var custTp = $('#custTp').combobox('getValue');
	if (custTp == "2") {
		var ccy = $('#ccy').combobox('getValue');
		if (SCFUtils.isEmpty(ccy)) {
			//SCFUtils.alert("该客户还未设置额度金额币种,请检查。");
			//return;
		}

		var lmtAmt = $('#lmtAmt').numberbox('getValue');
		if (lmtAmt <= 0) {
			//SCFUtils.alert("该客户还未设置额度金额,请检查。");
			//return;
		}
	}

	if (SCFUtils.FUNCTYPE != 'RE' && SCFUtils.FUNCTYPE != 'DP') {
		if (checkDataGrid()) {
			return;
		}
	}
	// 判断生效日是否在到期日之前
	if (SCFUtils.OPTSTATUS == 'EDIT' || SCFUtils.OPTSTATUS == 'ADD') {
		if (!checkValidDueDate()) {
			//SCFUtils.alert("到期日在生效日期之前，请检查！");
			//return;
		}
	}
	var grid = {};
	var griddata; // =SCFUtils.getSelectedGridData('invcLoanTable',false);
	griddata = SCFUtils.getGridData('acnoTable');
	$.each(griddata, function(key, n) {
		if (key != '_total_rows') {
			n.acOwnerid = $('#sysRefNo').val();
		}
	});
	grid.doname = SCFUtils.json2str(griddata);
	$.extend(mainData, grid);
	$.extend(mainData, {
		acOwnerid : $('#sysRefNo').val()
	});// 强行向打包数据添加值
	return mainData;
}

function onDelBtnClick() {
	return SCFUtils.convertArray('factorForm');
}

function checkCust() {
	var custTp = $('#custTp').combobox('getValue');
	if (SCFUtils.OPTSTATUS == 'DELETE' && custTp == '1') {
		var flag;
		var selId = $('#sysRefNo').val();
		var option = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_S_00000100',
				selId : selId
			},
			callBackFun : function(data) {
				if (!SCFUtils.isEmpty(data.rows)) {
					$.each(data.rows, function(o, n) {
						if (n.arBal > 0) {
							flag = true;
							return;
						}
					});
				}
			}
		};
		SCFUtils.ajax(option);
		return flag;
	}
}

function changelmtAmt() {
	if (SCFUtils.OPTSTATUS == 'ADD') {
		$('#lmtAllocate').numberbox('setValue', 0);
		$('#lmtBal').numberbox('setValue', $('#lmtAmt').numberbox('getValue'));
	} else if (SCFUtils.OPTSTATUS == 'EDIT' || SCFUtils.OPTSTATUS == 'DELETE' ||SCFUtils.OPTSTATUS == 'VIEW') {
		// 可用额度 = 额度 -已用额度
		$('#lmtBal').numberbox(
				'setValue',
				SCFUtils.Math($('#lmtAmt').numberbox('getValue'), $(
						'#lmtAllocate').numberbox('getValue'), 'sub'));
	}
}

function changeCustTp() {
	var custTp = $('#custTp').combobox('getValue');
	if (custTp == '1') {
		$('tr[id=amtTr]').hide();
		$('tr[id=balTr]').hide();
		$('tr[id=comTr]').hide();
		$('tr[id=dtTr]').hide();
		$('#acNoInfoDiv').show();

		/*
		 * $('#ccy').combobox({ required : false });
		 */
		$('#lmtAmt').numberbox({
			required : false
		});
		/*
		 * $('#lmt_tp').combobox({ required : true });
		 */
		$('#lmtAllocate').numberbox({
			required : false
		});
		$('#lmtBal').numberbox({
			required : false
		});
		$('#validDt').datebox({
			required : false
		});
		$('#dueDt').datebox({
			required : false
		});
		/*
		 * $('#clientNature').combobox({ required : false });
		 */
		
		
		$('#custMgrNm').validatebox({
			required : true
		});
		$('#custAcNo').validatebox({
			required : true
		});
		$('#cmsCustNo').validatebox({
			required : true
		});
		
		// $('#validDt').datebox({
		// required : false
		// });
		// $('#dueDt').datebox({
		// required : false
		// });
		$('#lmtAmt').numberbox('setValue', '');
		$('#validDt').datebox('setValue', '');
		$('#dueDt').datebox('setValue', '');

		$('tr[id=reqTr]').show();// 从信贷同步客户信息
		// SCFUtils.setTextReadonly("cmsCustNo", true);
		if(SCFUtils.OPTSTATUS == 'ADD'){
			$('#custAcNo').val("");
			$('#cmsCustNo').val("");
		}
		$('tr[id=mgrTr]').show();// 从信贷同步客户信息
		// SCFUtils.setTextReadonly("custMgrNm", true);

		// $('#custAcNo').validatebox({
		// required : true
		// });
		// $('#cmsCustNo').validatebox({
		// required : true
		// });
		// $('#custMgrNm').validatebox({
		// required : true
		// });
		showTr(true);
		$('#limiting').textbox({
			required : false
		});
		//$('tr[id=limitTr]').hide();// 隐藏限制条款
		checkCustType(true);
	} else if (custTp == '2') {
		var griddata = SCFUtils.getGridData('acnoTable', false); // 间接客户时清空列表数据
		if (!SCFUtils.isEmpty(griddata)) {
			$.each(griddata, function(i, obj) {
				if (i != '_total_rows') {
					var index = $('#acnoTable').datagrid('getAllRowIndex',
							obj.sysRefNo);
					$('#acnoTable').datagrid('deleteRow', index);
				}
			});
		}
		$('tr[id=amtTr]').hide();
		$('tr[id=balTr]').hide();
		$('tr[id=comTr]').hide();
		$('#acNoInfoDiv').hide();
		$('tr[id=dtTr]').hide();

		/*
		 * $('#ccy').combobox({ required : true });
		 */
		$('#lmtAmt').numberbox({
			required : false
		});
		/*
		 * $('#lmt_tp').combobox({ required : true });
		 */
		$('#lmtAllocate').numberbox({
			required : false
		});
		$('#lmtBal').numberbox({
			required : false
		});
		if(SCFUtils.OPTSTATUS == 'ADD'){
			$('#validDt').datebox({
				required : false
			});
			$('#dueDt').datebox({
				required : false
			});
		}
		$('#custMgrNm').validatebox({
			required : false
		});
		$('#custAcNo').validatebox({
			required : false
		});
		$('#cmsCustNo').validatebox({
			required : false
		});
		
		
		/*
		 * $('#clientNature').combobox({ required : true });
		 */
		

		// $('#lmtAmt').numberbox({required:true});
		// $('#validDt').datebox({
		// required : true
		// });
		// $('#dueDt').datebox({
		// required : true
		// });
		SCFUtils.setComboReadonly("lmtAllocate", true);
		SCFUtils.setComboReadonly("lmtBal", true);

		$('tr[id=mgrTr]').hide();// 客户经理
		$('tr[id=reqTr]').hide();// 信贷客户号
		$('#custAcNo').val("");
		$('#cmsCustNo').val("");

	
		// $('#cmsCustNo').validatebox({
		// required : false
		// });
		// $('#custMgrNm').validatebox({
		// required : false
		// });
		showTr(false);
		$('#limiting').textbox({
			required : true
		});
		//$('tr[id=limitTr]').show();// 限制条款
		//var a = $('#remark').width();
		//$('tr[id=limitTr]').width(a);
		checkCustType(false);
	}
	/*
	 * var options = {}; options.data = { refName : 'AcNoRule', refField :
	 * 'custAcNo' }; SCFUtils.getRefNo(options);
	 */
}
/*
 * 
 1、当客户为间接客户时，法定代表人里的三个栏位，以及联系方式里的五个栏位都设置为选填项。为授信客户，则反之
 	edit 20160829
 */
function checkCustType(bool){
	$('#legalRepNm').validatebox({
		required : bool
	});
	$('#legalRepIdtype').combobox({
		required : bool
	});
	$('#legalRepIdno').validatebox({
		required : bool
	});
	$('#ctctNm').validatebox({
		required : bool
	});
	$('#ctctTel').validatebox({
		required : bool
	});
	$('#mobPhone').validatebox({
		required : bool
	});
	$('#ctctPersonTitle').validatebox({
		required : bool
	});
	$('#ctctEmail').validatebox({
		required : bool
	});
	if(bool==false){
		$('#legalRepNm').parent('td').removeClass('requried-item-ifo');// 去除*号
		$('#legalRepNm').removeClass('validatebox-invalid');
		$('#legalRepIdno').parent('td').removeClass('requried-item-ifo');// 去除*号
		$('#legalRepIdno').removeClass('validatebox-invalid');
		$('#ctctNm').parent('td').removeClass('requried-item-ifo');// 去除*号
		$('#ctctNm').removeClass('validatebox-invalid');
		$('#ctctTel').parent('td').removeClass('requried-item-ifo');// 去除*号
		$('#ctctTel').removeClass('validatebox-invalid');
		$('#mobPhone').parent('td').removeClass('requried-item-ifo');// 去除*号
		$('#mobPhone').removeClass('validatebox-invalid');
		$('#ctctPersonTitle').parent('td').removeClass('requried-item-ifo');// 去除*号
		$('#ctctPersonTitle').removeClass('validatebox-invalid');
		$('#ctctEmail').parent('td').removeClass('requried-item-ifo');// 去除*号
		$('#ctctEmail').removeClass('validatebox-invalid');
	}
}
function checkCustTp(data,flag) {
	var custTp = data.obj.custTp;
	if (custTp == '2') {
		$('tr[id=amtTr]').hide();
		$('tr[id=balTr]').hide();
		$('tr[id=comTr]').hide();
		$('#acNoInfoDiv').hide();
		$('tr[id=dtTr]').hide();
		// $('#lmtAmt').numberbox({required:true});

		// add by dongll start
		$('tr[id=reqTr]').hide();
		$('tr[id=mgrTr]').hide();
		 $('#custAcNo').validatebox({
		 required : false
		 });
		 $('#cmsCustNo').validatebox({
		 required : false
		 });
		 $('#custMgrNm').validatebox({
		 required : false
		 });
		SCFUtils.setComboReadonly("lmtAllocate", true);
		SCFUtils.setComboReadonly("lmtBal", true);
		showTr(true);
		//$('tr[id=limitTr]').show();// 显示限制条款
		checkCustType(false);
	} else {
		$('tr[id=amtTr]').hide();
		$('tr[id=balTr]').hide();
		$('tr[id=comTr]').hide();
		$('#acNoInfoDiv').show();
		$('tr[id=dtTr]').hide();
		// $('#lmtAmt').numberbox({required:false});
		$('#lmtAmt').numberbox('setValue', '');
		$('#lmtBal').numberbox('setValue', '');

		// add by dongll start
		$('tr[id=reqTr]').show();
		$('tr[id=mgrTr]').show();
		// $('#custAcNo').validatebox({
		// required : true
		// });
		// $('#cmsCustNo').validatebox({
		// required : true
		// });
		// $('#custMgrNm').validatebox({
		// required : true
		// });
		showTr(true);
			//$('tr[id=limitTr]').hide();// 隐藏限制条款
		checkCustType(true);

	}
	if(null!=data.obj.legalRepIdtype&&undefined!=data.obj.legalRepIdtype){
		$("#legalRepIdtype").combobox("setValue",data.obj.legalRepIdtype);//解决修改客户信息时，未能回显证件类型的问题。20160830
	}
}
var tr = {};
/**
 * 解决IE中show()显示不正常
 * @param flag
 */
function showTr(flag){
	if(SCFUtils.OPTSTATUS != 'ADD'){
		if(flag){
			$('tr[id=limitTr]').hide();
			return;
		}else{
			$('tr[id=limitTr]').show();
			return;
		}
	}
	if(flag){
		tr = $('tr[id=limitTr]').children().clone();
		$('tr[id=limitTr]').empty();
	}else{
		var td1 = "<td>限制条款：</td>";
		var td2 = '<td colspan="5"><input name="limiting" id="limiting"';
			td2 += 'class="easyui-textbox"';
			td2 += 'data-options="missingMessage:'+"'输入项为必输项',multiline:true,validType:'maxLength[200]'"+'"';
			td2 += 'style="width: 50%; height: 80px"></td>';
		$('tr[id=limitTr]').append($(td1));
		$('tr[id=limitTr]').append($(td2));
		/*for(var i = 0;i<tr!={}&&i<tr.length;i++){
			$('tr[id=limitTr]').append(tr[i]);
		}*/
	}
}
// 初始化页面相关值
function ajaxBox() {
	SCFUtils.setComboReadonly('lmt_tp', true);
	var compNature = [ {
		"id" : '110',
		"text" : "[110] 国有企业"
	}, {
		"id" : '120',
		"text" : "[120] 集体企业"
	}, {
		"id" : '130',
		"text" : "[130] 股份合作企业"
	}, {
		"id" : '141',
		"text" : "[141] 联营企业-国有联营企业"
	}, {
		"id" : '142',
		"text" : "[142] 联营企业-集体联营企业"
	}, {
		"id" : '143',
		"text" : "[143] 联营企业-国有与集体联营企业"
	}, {
		"id" : '149',
		"text" : "[149] 联营企业-其他联营企业"
	}, {
		"id" : '151',
		"text" : "[151] 有限责任公司-国有独资公司"
	}, {
		"id" : '159',
		"text" : "[159] 有限责任公司-其他有限责任公司"
	}, {
		"id" : '160',
		"text" : "[160] 股份责任公司"
	}, {
		"id" : '171',
		"text" : "[171] 私营企业-私营独资企业"
	}, {
		"id" : '172',
		"text" : "[172] 私营企业-私营合伙企业"
	}, {
		"id" : '173',
		"text" : "[173] 私营企业-私营有限责任公司"
	}, {
		"id" : '174',
		"text" : "[174] 私营企业-私营股份有限公司"
	}, {
		"id" : '210',
		"text" : "[210] 港澳台商投资企业-合资经营企业（港或澳、台资）"
	}, {
		"id" : '220',
		"text" : "[220] 港澳台商投资企业-合作经营企业（港或澳、台资）"
	}, {
		"id" : '230',
		"text" : "[230] 港澳台商投资企业-港、澳、台商独资经营企业"
	}, {
		"id" : '240',
		"text" : "[240] 港澳台商投资企业-港、澳、台商投资股份有限公司"
	}, {
		"id" : '310',
		"text" : "[310] 外商投资企业-中外合资经营企业"
	}, {
		"id" : '320',
		"text" : "[320] 外商投资企业-中外合作经营企业"
	}, {
		"id" : '330',
		"text" : "[330] 外商投资企业-外资企业"
	}, {
		"id" : '340',
		"text" : "[340] 外商投资企业-外商投资股份有限公司"
	} ];
	$("#compNature").combobox('loadData', compNature);
	var legalRepIdtype = [ {
		"id" : '10',
		"text" : "身份证"
//	}, {
//		"id" : '11',
//		"text" : "户口簿"
//	}, {
//		"id" : '12',
//		"text" : "护照"
//	}, {
//		"id" : '13',
//		"text" : "军官证"
//	}, {
//		"id" : '14',
//		"text" : "士兵证"
	}, {
		"id" : '15',
		"text" : "香港居民来往内地通行证"
	}, {
		"id" : '16',
		"text" : "台湾同胞来往内地通行证"
	}, {
		"id" : '17',
		"text" : "临时身份证"
//	}, {
//		"id" : '18',
//		"text" : "外国人居留证"
//	}, {
//		"id" : '19',
//		"text" : "警官证"
	}, {
		"id" : '1M',
		"text" : "澳门居民来往内地通行证"
//	}, {
//		"id" : '1X',
//		"text" : "对私其他证件"
//	}, {
//		"id" : '20',
//		"text" : "组织机构代码"
//	}, {
//		"id" : '22',
//		"text" : "营业执照"
//	}, {
//		"id" : '23',
//		"text" : "事业法人证"
//	}, {
//		"id" : '25',
//		"text" : "工商核准号"
//	}, {
//		"id" : '26',
//		"text" : "金融许可证"
//	}, {
//		"id" : '27',
//		"text" : "审批件"
//	}, {
//		"id" : '2X',
//		"text" : "对公其他证件"
	} ];
	$("#legalRepIdtype").combobox('loadData', legalRepIdtype);
	var custTp = [ {
		"id" : '1',
		"text" : "授信客户"
	}, {
		"id" : '2',
		"text" : "间接客户"
	} ];
	$("#custTp").combobox('loadData', custTp);
	var clientNature = [ {
		"id" : '1',
		"text" : "公开型"
	}, {
		"id" : '2',
		"text" : "隐藏型",
		"selected" : true
	} ];
	$("#clientNature").combobox('loadData', clientNature);
	var lmt_tp = [ {
		"id" : '0',
		"text" : "循环",
		"selected" : true
	}, {
		"id" : '1',
		"text" : "单笔"
	} ];
	$("#lmt_tp").combobox('loadData', lmt_tp);
	var option = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000092',
			sysRefNo : '0000'
		},
		callBackFun : function(data) {
			if (data.success) {
				$('#regionCd').combobox('loadData', data.rows);
			}
		}
	};
	SCFUtils.ajax(option);

	var optt = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000006'
		},
		callBackFun : function(data) {
			if (data.success) {
				$('#ccy').combobox('loadData', data.rows);
				$('#regCcy').combobox('loadData', data.rows);
			}
		}
	};
	SCFUtils.ajax(optt);

	// 查询所有行业
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000343'
		},
		callBackFun : function(data) {
			if (data.success) {
				// $('#custIndustry').combotree('loadData', data.rows);
			}
		}
	};
	SCFUtils.ajax(options);

}
function changeRegion() {
	$('#cityCd').combobox('setValue', '');
	var str = $('#regionCd').combobox('getValue');
	str = str.substr(0, 2);
	var option = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000093',
			sysRefNo : str
		},
		callBackFun : function(data) {
			if (data.success) {
				$('#cityCd').combobox('loadData', data.rows);
			}
		}
	};
	SCFUtils.ajax(option);
}

function queryCity() {
	var sysRefNo = $('#cityCd').combobox('getValue');
	if (!SCFUtils.isEmpty(sysRefNo)) {
		var option = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000094',
				sysRefNo : sysRefNo
			},
			callBackFun : function(data) {
				if (!SCFUtils.isEmpty(data.rows)) {
					$('#cityCd').combobox('loadData', data.rows);
				}
			}
		};
		SCFUtils.ajax(option);
	}
}

function queryAcNo(status) {
	var acOwnerid = $('#sysRefNo').val();
	if (!SCFUtils.isEmpty(acOwnerid)) {
		var option = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000096',
				acOwnerid : acOwnerid,
				sysTrxSts : status
			},
			callBackFun : function(data) {
				if (!SCFUtils.isEmpty(data.rows)) {
					SCFUtils.loadGridData('acnoTable', data.rows);
				}
			}
		};
		SCFUtils.ajax(option);
	}
}

// 验证是否录入了账户
function checkDataGrid() {
	var flag = false;
	var data = $('#acnoTable').datagrid('getData');
	var custTp = $('#custTp').combobox('getValue');
	if (custTp == 1) {
		//modify by shizaiqiang  用于判断当客户类型为授信客户时 需要添加两个账户一个保理一个一般账户
		var arrayObj = [];
		if (data.total == 0) {
			SCFUtils.alert('请添加账户信息！');
			flag = true;
		} else {
			$.each(data.rows, function(i, n) {
				arrayObj.push(n.acTp);
			});
			if ($.inArray("2", arrayObj) == -1) {
				SCFUtils.alert('请添加一个一般账户！');
				flag = true;
			}
			if ($.inArray("1", arrayObj) == -1) {
				SCFUtils.alert('请添加一个保理账户！');
				flag = true;
			}
//			if ($.inArray("6", arrayObj) == -1) {
//				SCFUtils.alert('请添加一个保证金账户！');
//				flag = true;
//			}
		}

	}

	return flag;
}

function ajaxTable() {
	var options = {
		// url : SCFUtils.AJAXURL,
		toolbar : '#toolbar',
		idField : 'sysRefNo',
		rownumbers : true,
		checkOnSelect : true,
		singleSelect : false,// 只选一行
		pagination : true,// 是否分页
		fitColumns : false,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			field : 'sysRefNo',
			title : '交易流水号',
			// hidden:true,
			width : '14.28%'
		}, {
			field : 'acTp',
			title : '账户类型',
			width : '14.28%',
			formatter : custacTpFormater
		}, {
			field : 'acBkNm',
			title : '开户银行',
			width : '14.28%'
		}, {
			field : 'ccy',
			title : '币别',
			width : '14.28%'
		}, {
			field : 'acNo',
			title : '账号',
			width : '14.28%'
		}, {
			field : 'acNm',
			title : '户名',
			width : '14.28%'
		}, {
			field : 'acBkNo',
			title : '开户网点',
			width : '14.28%'
		}, {
			field : 'acBkName',
			title : '网点名称',
			width : 150,
			hidden : true
		}, {
			field : 'acFlag',
			title : '实体账户标志',
			width : 110,
			hidden : true
		} ] ]
	};
	$('#acnoTable').datagrid(options);
}

// 新增一条数据
function addRow() {
	var mainData = SCFUtils.convertArray('factorForm');
	if (mainData) {
		var row = {};
		row.acOwnerid = $('#sysRefNo').val();
		row.acOwnerName = $('#custNm').val();
		row.acOwnerType = $('#custTp').combobox('getValue');
		row.op = 'add';
		var options = {
			title : '新增账号信息',
			reqid : 'I_P_000017',
			height : '370',
			data : {
				'row' : row
			},
			onSuccess : addSuccess
		};
		SCFUtils.getData(options);
	}
}
// 修改一条数据
function editRow() {
	var row = $('#acnoTable').datagrid('getSelections');
	if (row.length == 1) {
		row = row[0];
		row.op = 'edit';
		row.acOwnerid = $('#sysRefNo').val();
		row.acOwnerName = $('#custNm').val();
		row.acOwnerType = $('#custTp').combobox('getValue');
		// row.sysBusiUnit = $('#sysBusiUnit').val();
		if ('RE' === SCFUtils.FUNCTYPE) {
			row.state = 'query';
		}
		var options = {
			title : '修改账号信息',
			reqid : 'I_P_000017',
			height : '370',
			data : {
				'row' : row
			},
			onSuccess : editSuccess
		};
		SCFUtils.getData(options);
	} else if (row.length > 1) {
		SCFUtils.alert("只能选择一条数据！");
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
}

// 删除一条数据
function deleteRow() {
	var rows = $('#acnoTable').datagrid('getSelections');
	var copyRows = [];
	for (var j = 0; j < rows.length; j++) {
		copyRows.push(rows[j]);
	}
	if (rows.length > 0) {
		$.messager.confirm('Confirm', '确定删除选中的数据吗？', function(r) {
			if (r) {
				for (var i = 0; i < copyRows.length; i++) {
					var index = $('#acnoTable').datagrid('getAllRowIndex',
							copyRows[i].sysRefNo);
					$('#acnoTable').datagrid('deleteRow', index);
				}
			}
		});
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
}

function addSuccess(data) {
	var acTp = data.acTp;
	if (acTp == '1') {
		if (checkAcTp(data.sysRefNo) && !checkAcNoRepeat(data)) {
			$('#acnoTable').datagrid('appendRow', data);
		} else {
			if (!checkAcTp(data.sysRefNo)) {
				SCFUtils.alert("同一客户只用有一个保理专户账号，请检查。");
			}
			if (checkAcNoRepeat(data)) {
				SCFUtils.alert("账号已存在，请检查。");
			}
		}
	}else if (acTp == '6') {
		if (checkAcTpBao(data.sysRefNo) && !checkAcNoRepeat(data)) {
			$('#acnoTable').datagrid('appendRow', data);
		} else {
			if (!checkAcTpBao(data.sysRefNo)) {
				SCFUtils.alert("同一客户只用有一个保证金账号，请检查。");
			}
			if (checkAcNoRepeat(data)) {
				SCFUtils.alert("账号已存在，请检查。");
			}
		}
	} else {
		// 判断账号重复
		if (!checkAcNoRepeat(data)) {
			$('#acnoTable').datagrid('appendRow', data);
		} else {
			SCFUtils.alert("账号已存在，请检查。");
		}
	}
	$('#custNm').focus();
}
// 判断账号是否存在
function checkAcNoRepeat(data) {
	var flag = false;
	var griddata = $('#acnoTable').datagrid('getRows');
	if (griddata.length > 0) {
		$.each(griddata, function(i, n) {
			if (n.acNo == data.acNo && n.sysRefNo != data.sysRefNo) {
				return flag = true;
			} else {
				flag = false;
			}
		});
	}
	return flag;
}

// 校验保理专户只能有一个
function checkAcTpBao(data) {
	var flag = true;
	var flagAc = true;
	var griddata = $('#acnoTable').datagrid('getRows');
	if (griddata.length > 0) {
		$.each(griddata, function(i, n) {
			if (n.acTp == '6') {
				flagAc = checkSysRefNo(n.sysRefNo, data);
			} else {
				flag = true;
			}
		});
		return flagAc && flag;
	} else {
		flag = true;
		return flag;
	}
}
//校验保证金账户只能有一个
function checkAcTp(data) {
	var flag = true;
	var flagAc = true;
	var griddata = $('#acnoTable').datagrid('getRows');
	if (griddata.length > 0) {
		$.each(griddata, function(i, n) {
			if (n.acTp == '4') {
				flagAc = checkSysRefNo(n.sysRefNo, data);
			} else {
				flag = true;
			}
		});
		return flagAc && flag;
	} else {
		flag = true;
		return flag;
	}
}
// 判断流水号，确保修改的时候不会提醒 同一客户只用有一个保理专户账号
function checkSysRefNo(data, sysRefNo) {
	if (data == sysRefNo) {
		return true;
	}
	return false;
}

function editSuccess(data) {
	var row = $('#acnoTable').datagrid('getSelected');
	var rowIndex = $('#acnoTable').datagrid('getRowIndex', row);
	if (data.acTp == '1') {
		if (checkAcTp(data.sysRefNo) && !checkAcNoRepeat(data)) {
			$('#acnoTable').datagrid('updateRow', {
				index : rowIndex,
				row : data
			});
		}
		if (!checkAcTp(data.sysRefNo)) {
			SCFUtils.alert("同一客户只用有一个保理专户账号，请检查。");
		}
		if (checkAcNoRepeat(data)) {
			SCFUtils.alert("该账号已配置，请检查。");
		}
	}else if (data.acTp == '6') {
		if (checkAcTpBao(data.sysRefNo) && !checkAcNoRepeat(data)) {
			$('#acnoTable').datagrid('updateRow', {
				index : rowIndex,
				row : data
			});
		} else {
			if (!checkAcTpBao(data.sysRefNo)) {
				SCFUtils.alert("同一客户只用有一个保证金账号，请检查。");
			}
			if (checkAcNoRepeat(data)) {
				SCFUtils.alert("账号已存在，请检查。");
			}
		}
	} else {
		// 判断账号重复
		if (!checkAcNoRepeat(data)) {
			$('#acnoTable').datagrid('updateRow', {
				index : rowIndex,
				row : data
			});
		} else {
			SCFUtils.alert("该账号已配置，请检查。");
		}
	}
	$('#custNm').focus();
}

// 限定生效日期在到期日之前
function checkValidDueDate() {
	var validDt = $("#validDt").datebox('getValue');
	var dueDt = $("#dueDt").datebox('getValue');
	var judge = true;
	// 计算到期日与生效日的差值
	var cha = SCFUtils.DateDiff(dueDt, validDt);
	if (cha < 0) {
		judge = false;
	}
	return judge;
}

// 客户性质
function changClientN() {
	var custTp = $('#custTp').combobox('getValue');
	var clientNature = $('#clientNature').combobox('getValue');
	if (custTp == '2' && clientNature == '1') {
		// $('#legalRepNm').validatebox({
		// required : true
		// });
		// $('#legalRepIdtype').combobox({
		// required : true
		// });
		// $('#legalRepIdno').validatebox({
		// required : true
		// });
		//
		// $('#ctctNm').validatebox({
		// required : true
		// });
		// $('#ctctTel').validatebox({
		// required : true
		// });
		// $('#mobPhone').validatebox({
		// required : true
		// });
		// $('#ctctPersonTitle').validatebox({
		// required : true
		// });
		// $('#ctctFax').validatebox({
		// required : true
		// });
		// $('#ctctEmail').validatebox({
		// required : true
		// });
		// $('#officeAddr').validatebox({
		// required : true
		// });
	} else {
		// $('#legalRepNm').validatebox({
		// required : false
		// });
		// $('#legalRepIdtype').combobox({
		// required : false
		// });
		// $('#legalRepIdno').validatebox({
		// required : false
		// });
		//
		// $('#ctctNm').validatebox({
		// required : false
		// });
		// $('#ctctTel').validatebox({
		// required : false
		// });
		// $('#mobPhone').validatebox({
		// required : false
		// });
		// $('#ctctPersonTitle').validatebox({
		// required : false
		// });
		// $('#ctctFax').validatebox({
		// required : false
		// });
		// $('#ctctEmail').validatebox({
		// required : false
		// });
		// $('#officeAddr').validatebox({
		// required : false
		// });
	}
}
// 授信网点
function showLookUpWindow() {
	var options = {
		title : '网点信息查询',
		reqid : 'I_P_000106',
		onSuccess : netAddressSuccess
	};
	SCFUtils.getData(options);
}

function netAddressSuccess(data) {
	$('#custBrId').val(data.sysRefNo);
	$('#bchNm').val(data.brNm);
	/*
	 * 弹窗里的小页有必输项的
	 * 有值去除父层requried-item-ifo方法，去除这个id的validatebox-invalid方法
	 * new on 20160801 by JinJH
	 */
	if($('#bchNm').val()!=null){//$('#cntrctNo')为查询左边的div的id
		$('#bchNm').parent('td').removeClass('requried-item-ifo');//去除*号
		$('#bchNm').removeClass('validatebox-invalid');
	}
	$('#custNm').focus();
}

function loadcountry() {
	var option = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000328'
		},
		callBackFun : function(data) {
			if (data.success) {
				$('#countryId').combobox('loadData', data.rows);
				if (SCFUtils.OPTSTATUS == 'ADD')
					$('#countryId').combobox('setValue', 'CHN');
				// SCFUtils.setComboReadonly("countryCd", true);
			}
		}
	};
	SCFUtils.ajax(option);
}

function ajaxbrNm(data) {
	// 添加网点信息，部门信息
	if (!SCFUtils.isEmpty(data.obj.custBrId)) {
		var options1 = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000323',
				ownerBrId : data.obj.custBrId
			},
			callBackFun : function(data) {
				if (data.success && !SCFUtils.isEmpty(data.rows[0])) {
					$('#bchNm').val(data.rows[0].brNm);
				}
			}
		};
		SCFUtils.ajax(options1);
	}

	// 客户经理
	if (!SCFUtils.isEmpty(data.obj.custMgrId)) {
		var options2 = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000339',
				actorNo : data.obj.custMgrId
			},
			callBackFun : function(data) {
				if (data.success && !SCFUtils.isEmpty(data.rows[0])) {
					$('#custMgrNm').val(data.rows[0].actorName);
				}
			}
		};
		SCFUtils.ajax(options2);
	}
}

// 验证组织机构代码重复性
function regCust() {
	var result = false;
	var custInstCd = $('#custInstCd').val();
	if (custInstCd == null || custInstCd == "") {
		SCFUtils.error("请输入组织机构代码");
		return result;
	}
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000329',
			custInstCd : custInstCd
		},
		callBackFun : function(data) {
			if (data.success) {
				if (data.rows.length != 0) {
					SCFUtils.error("该组织机构代码已被注册");
					$('#custInstCd').val(null);
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

// 客户经理
function showLookUpWindowMgr() {
	var options = {
		title : '客户经理查询',
		reqid : 'I_P_000112',
		onSuccess : mgrSuccess
	};
	SCFUtils.getData(options);
}

function mgrSuccess(data) {
	$('#custMgrId').val(data.actorNo);
	$('#custMgrNm').val(data.actorName);
	/*
	 * 弹窗里的小页有必输项的
	 * 有值去除父层requried-item-ifo方法，去除这个id的validatebox-invalid方法
	 * new on 20160801 by JinJH
	 */
	if($('#custMgrNm').val()!=null){//$('#cntrctNo')为查询左边的div的id
		$('#custMgrNm').parent('td').removeClass('requried-item-ifo');//去除*号
		$('#custMgrNm').removeClass('validatebox-invalid');
	}
	$('#custNm').focus();
}
// 调用接口设置信贷客户号
function showLookUpWindowCms() {
	var custAcNo = $("#custAcNo").val();
	if (SCFUtils.isEmpty(custAcNo)) {
		SCFUtils.alert("请填写账号");
		return;
	}

	/*
	 * var option = { url : SCFUtils.AJAXURL, data : { cacheType : 'non', byFunc :
	 * 'N', requestTp : 'post', getdataId : 'I_P_00007801', sysRefNo : custAcNo },
	 */
	/*
	 * var option = { url : SCFUtils.AJAXURL, data : { cacheType : 'non', byFunc :
	 * 'N', requestTp : 'post', getdataId : 'I_P_000136', acNo : custAcNo,
	 * buyerAcNo : custAcNo, amount : 100 }, onSuccess : addVerSuccess };
	 */

	// var option = {
	// url : SCFUtils.AJAXURL,
	// data : {
	// cacheType : 'non',
	// byFunc : 'N',
	// requestTp : 'post',
	// getdataId : 'I_P_00007802',
	// sysRefNo : "111",
	// user_id:"zhangsa",
	// user_pwd:"11111"
	// },
	// onSuccess : addVerSuccess
	//
	// };
	// SCFUtils.getData(option);
	/*
	 * var data = {}; var options = { url : SCFUtils.AJAXURL, async : false,
	 * data : $.extend({ getdataId : 'I_P_00007802', byFunc : 'N', cacheType :
	 * 'non', sysRefNo : "111", user_id : "zhangsa", user_pwd : "11111" },
	 * data), callBackFun : function(backData) { addVerSuccess(backData); } };
	 * SCFUtils.ajax(options);
	 */
	var data = {};
	var sysRefNo = $('#sysRefNo').val();
	var options = {
		url : SCFUtils.AJAXURL,
		async : false,
		data : $.extend({
			getdataId : 'I_P_00007901',
			byFunc : 'N',
			cacheType : 'non',
			sysRefNo : sysRefNo,
			currentdate : SCFUtils.getcurrentdate(),
			user_id : "zhangsa",
			user_pwd : "11111"
		}, data),
		callBackFun : function(backData) {
			var temp = backData.obj.trxDom.coreReturnCode;
			if (backData.obj.trxDom.coreReturnCode == '0000') {
				var token = backData.obj.trxDom.token;
				var data = {};
				var options = {
					url : SCFUtils.AJAXURL,
					async : false,
					data : $.extend({
						getdataId : 'I_P_00007903',
						byFunc : 'N',
						cacheType : 'non',
						sysRefNo : sysRefNo,
						currentdate : SCFUtils.getcurrentdate(),
						token : token,
						custAcNo : custAcNo,
					}, data),
					callBackFun : function(backData) {
						if (backData.obj.trxDom.coreReturnCode == '0000') {
							$('#cmsCustNo').val(backData.obj.trxDom.ACN);
						} else {
							SCFUtils.alert('获取客户号失败！');
						}
					}
				};
				SCFUtils.ajax(options);
			} else {
				SCFUtils.alert('获取客户号失败！');
			}
		}
	};
	SCFUtils.ajax(options);
}

/*
 * function addVerSuccess(data) { $('#cmsCustNo').val(data.obj.trxDom.token); }
 */

// 调用接口设置信贷客户号
function showLookUpWindowCust() {
	var cmsCustNo = $('#cmsCustNo').val();
	var sysRefNo = $('#sysRefNo').val();
	if (SCFUtils.isEmpty(cmsCustNo)) {
		SCFUtils.alert('请同步信贷客户号');
		return;
	}
	var data = {};
	var options = {
		url : SCFUtils.AJAXURL,
		async : false,
		data : $.extend({
			getdataId : 'I_P_00007804',
			byFunc : 'N',
			cacheType : 'non',
			sysRefNo : sysRefNo,
			cmsCustNo : cmsCustNo,
			date : SCFUtils.getcurrentdate(),
		}, data),
		callBackFun : function(backData) {
			if (backData.obj.trxDom.coreReturnCode == '0000') {
				addCustInfo(backData);
			} else {
				SCFUtils.alert('接口查询失败！');
			}
		}
	};
	SCFUtils.ajax(options);
}

function addCustInfo(data) {
	$('#custInstCd').val(data.obj.trxDom.com_ins_code);
	$('#custNm').val(data.obj.trxDom.ZCHNM);
	$('#custIndustry').val(data.obj.trxDom.com_cll_type);
	$('#stateTaxLicno').val(data.obj.trxDom.nat_tax_reg_code);
	$('#localTaxLicno').val(data.obj.trxDom.loc_tax_reg_code);
	$('#countryId').combobox('setValue', data.obj.trxDom.com_country);
	$('#regAddr').val(data.obj.trxDom.reg_addr);
	$('#regCcy').combobox('setValue', data.obj.trxDom.reg_cur_type);
	$('#regCapital').numberbox('setValue', data.obj.trxDom.reg_cap_amt);
	$('#setupDt').datebox('setValue', data.obj.trxDom.com_str_date);
	$('#loanCardno').val(data.obj.trxDom.loan_card_id);
	$('#compNature').combobox('setValue', data.obj.trxDom.reg_type);
	$('#busiScope').val(data.obj.trxDom.com_main_opt_scp);
	$('#bchNm').val(data.obj.trxDom.main_br_id);
	$('#remark').val(data.obj.trxDom.remark);
	$('#legalRepNm').val(data.obj.trxDom.legal_name);
	$('#legalRepIdtype').combobox('setValue', data.obj.trxDom.legal_cert_type);
	$('#legalRepIdno').val(data.obj.trxDom.legal_cert_code);
	$('#ctctNm').val(data.obj.trxDom.fna_mgr);
	$('#ctctTel').val(data.obj.trxDom.phone);
	$('#mobPhone').val(data.obj.trxDom.legal_phone);
	$('#ctctPersonTitle').val(data.obj.trxDom.duty);
	$('#ctctFax').val(data.obj.trxDom.fax_code);
	$('#ctctEmail').val(data.obj.trxDom.email);
	$('#officeAddr').val(data.obj.trxDom.post_addr);
}

function showCustIndustry() {
	var options = {
		title : '所属行业查询',
		reqid : 'I_P_000159',
		width : 800,
		onSuccess : industrySuccess
	};
	SCFUtils.getData(options);
}

function industrySuccess(data) {
	$('#custIndustry').val(data.sysRefNo);
	$('#industryNm').val(data.industryNm);
	/*
	 * 弹窗里的小页有必输项的
	 * 有值去除父层requried-item-ifo方法，去除这个id的validatebox-invalid方法
	 * new on 20160801 by JinJH
	 */
	if($('#industryNm').val()!=null){//$('#cntrctNo')为查询左边的div的id
		$('#industryNm').parent('td').removeClass('requried-item-ifo');//去除*号
		$('#industryNm').removeClass('validatebox-invalid');
	}
	$('#custNm').focus();
}

function queryCustIndustry(sysRefNo) {
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000416',
			sysRefNo : sysRefNo
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				$('#industryNm').val(data.rows[0].industryNm);
			}
		}
	};
	SCFUtils.ajax(options);
}


//解决退回处理、删除和复核和查询页面进来看到的红色必输字
function solveRedWord(){
	if($('#custMgrNm').val()!=null){// $('#cntrctNo')为查询左边的div的id
		$('#custMgrNm').parent('td').removeClass('requried-item-ifo');// 去除*号
		$('#custMgrNm').removeClass('validatebox-invalid');
	}
	if($('#bchNm').val()!=null){// $('#cntrctNo')为查询左边的div的id
		$('#bchNm').parent('td').removeClass('requried-item-ifo');// 去除*号
		$('#bchNm').removeClass('validatebox-invalid');
	}
	if($('#industryNm').val()!=null){// $('#cntrctNo')为查询左边的div的id
		$('#industryNm').parent('td').removeClass('requried-item-ifo');// 去除*号
		$('#industryNm').removeClass('validatebox-invalid');
	}
}

//证件编号失去焦点就判断
function checkLegal(){
	var legalRepIdno = $("#legalRepIdno").val();
	if(/^[a-zA-Z0-9]*$/.test(legalRepIdno)){
		
	}else{
		$("#legalRepIdno").val("");
//		alert("证件编号只能输入字母或者数字");
//		return;
	}
}