function pageOnInt() {
	SCFUtils.setTextReadonly("sysRefNo", true);
	SCFUtils.setTextReadonly("cntrctNo", true);
	SCFUtils.setNumberboxReadonly("sumArBal", true);
	SCFUtils.setTextReadonly("selId", true);
	SCFUtils.setTextReadonly("selNm", true);
	SCFUtils.setTextReadonly("trxDt", true);
	SCFUtils.setComboReadonly("busiTp", true);
	SCFUtils.setComboReadonly("lmtCcy", true);
	SCFUtils.setDateboxReadonly("dueDt", true);
	ajaxCompanyTable();
	ajaxAcNoTable();
	ajaxbox();
}

function ajaxbox() {
	var option = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000265',
			},
			callBackFun : function(data) {
				if (data.success) {
					$('#busiTp').combobox('loadData', data.rows);
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

					$.each(data.rows, function(i, n) {
						var textField = n.sysRefNo + '-' + n.ccyNm;
						$.extend(n, {
							textField : textField
						});
					});
					$('#lmtCcy').combobox('loadData', data.rows);
				}
			}
		};
		SCFUtils.ajax(optt);
}

function ajaxCompanyTable() {
	var options = {
		toolbar : '#companyToolbar',
		idField : 'sysRefNo',
		rownumbers : true,
		checkOnSelect : true,
		singleSelect : true,// 只选一行
		pagination : false,// 是否分页
		fitColumns : true,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹
		idField : 'id',
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			field : 'sysRefNo',
			title : '成员企业编号',
			width : 70
		}, {
			field : 'custNm',
			title : '成员企业名称',
			width : 70
		}, {
			field : 'arAvalLoan',
			title : '应收账款金额',
			width : 70,
			formatter : ccyFormater
		}, {
			field : 'status',
			title : '签约状态',
			width : 70,
			formatter : contractStatusFormater
		} ] ]
	};
	$('#companyDg').datagrid(options);
}

function ajaxAcNoTable() {
	var options = {
		toolbar : '#acNoToolbar',
		idField : 'sysRefNo',
		rownumbers : true,
		checkOnSelect : true,
		singleSelect : true,// 只选一行
		pagination : false,// 是否分页
		fitColumns : true,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹
		idField : 'id',
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			field : 'acNm',
			title : '户名',
			width : 70
		}, {
			field : 'acNo',
			title : '账号',
			width : 70
		}, {
			field : 'acBkNm',
			title : '开户银行',
			width : 70
		}, {
			field : 'acTp',
			title : '开户银行',
			width : 70,
			hidden : true
		}] ]
	};
	$('#acNoDg').datagrid(options);
}

function queryCust() {
	var sysRefNo = $('#selId').val();
	if (!SCFUtils.isEmpty(sysRefNo)) {
		var option = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000229',
				sysRefNo : sysRefNo
			},
			callBackFun : function(data) {
				if (!SCFUtils.isEmpty(data.rows)) {
					$('#selNm').val(data.rows[0].custNm);
				}
			}
		};
		SCFUtils.ajax(option);
	}
}

function queryLicenceNo() {
	var sysRefNo = $('#selId').val();
	if (!SCFUtils.isEmpty(sysRefNo)) {
		var option = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000268',
				sysRefNo : sysRefNo
			},
			callBackFun : function(data) {
				if (!SCFUtils.isEmpty(data.rows)) {
					$('#licenceNo').val(data.rows[0].licenceNo);
				}
			}
		};
		SCFUtils.ajax(option);
	}
}

function queryCompany() {
	var licenceNo = $('#licenceNo').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000241',
			licenceNo : licenceNo
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				$.each(data.rows, function(i, n) {
					var arAvalLoan = queryInvcM(n);
					var status = judgeStatus(n);
					$.extend(n, {
						arAvalLoan : arAvalLoan,
						status : status
					});
				});
				SCFUtils.loadGridData('companyDg', data.rows, false, true);	
				//将指定datagrid的设置为不可选中
				$.each(data.rows,function(i,n){
					if(n.status=="1"){
						SCFUtils.setDatagridRowReadonly("companyDg",i,true,function(){
							SCFUtils.alert("您已与该成员企业签署过协议，请确认！");
						});
					}else if(n.status=="2"){
						SCFUtils.setDatagridRowReadonly("companyDg",i,true,function(){
							SCFUtils.alert("您已申请与该成员企业签署协议，请等待平台审核！");
						});
					}
				});
			}
		}
	};
	SCFUtils.ajax(options);
	// return companyList;
}

function queryInvcM(data) {
	var sumInvAmt = 0;
	var licenceNo = $('#licenceNo').val();
	var buyerId = data.sysRefNo;
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			cacheType : 'non',
			licenceNo : licenceNo,
			buyerId : buyerId,
			queryId : 'Q_P_000271'
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				sumInvAmt = data.rows[0];
			}
		}
	};
	SCFUtils.ajax(options);
	return sumInvAmt;
}

function querySumInvcM() {
	var licenceNo = $('#licenceNo').val();
	var options = {
		url : SCFUtils.AJAXURL,
		// async : false,
		data : {
			cacheType : 'non',
			licenceNo : licenceNo,
			queryId : 'Q_P_000274'
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				$('#sumArBal').numberbox('setValue', data.rows[0]);
			}else{
				$('#sumArBal').numberbox('setValue', 0);
			}
		}
	};
	SCFUtils.ajax(options);
}

//判断签约状态
function judgeStatus(data) {
	var status = "0";
	var selId = $('#selId').val();
	var buyerId = data.sysRefNo;
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			cacheType : 'non',
			selId : selId,
			buyerId : buyerId,
			queryId : 'Q_P_000260'
		},
		callBackFun : function(data) {
			if (data.success){
				if(data.rows != null){
					for(var i=0;i<(data.rows).length;i++){
						if(data.rows[i].sysTrxSts=="P"||data.rows[i].sysTrxSts=="S"){
							status = "2";
							break;
						}else if(data.rows[i].sysTrxSts=="M"&&data.rows[i].approvalSts=="1"){
							status = "1";
							break;
						}else if(data.rows[i].sysTrxSts=="M"&&data.rows[i].approvalSts=="2"){
							status = "0";
						}
					}
				}else{
					status = "0";
				}
			}
		}
	};
	SCFUtils.ajax(options);
	return status;
}

function showCntrct() {
	$.showWindow({
		title : '应收款融资协议',
		useiframe : true,
		modal : true,
		width : '70%',
		height : '80%',
		minimizable : false,
		maximizable : false,
		collapsible : false,
		content : 'url:screen/loan/loanCntrct.html',
		data : {
			'callback' : onCntrctSuccess
		}
	// buttons:[{
	// text:'同意并继续',
	// handler:'protocolReg'
	// },{
	// text:'下载',
	// handler:'downProtocol'
	// }]
	});
}
function onCntrctSuccess() {

}

function findBU() {
	var sysBusiUnit = SCFUtils.SYSBUSIUNIT;
	if (SCFUtils.isEmpty(sysBusiUnit)) {
		sysBusiUnit = "platform";
	}
	return sysBusiUnit;
}

function onNextBtnClick() {
	if ($('#buyerId').val() == "") {
		SCFUtils.alert('请选择成员企业信息！');
		return;
	} else if ($('#acNo').val() == "") {
		SCFUtils.alert('请选择账号信息！');
		return;
	}
	if($("#readme")[0].checked == false){		
		SCFUtils.alert('请阅读《应收款融资协议》');
		return;
	}	
	var data = SCFUtils.convertArray('mainForm');
	var acNm = $("#acNm").val();
	var acNo = $("#acNo").val();
	var acBkNm = $("#acBkNm").val();
	var sysRefNo = $("#sysRefNo").val();
	var userId = $("#userId").val();
	var buyerId = $("#buyerId").val();
	var acTp = $("#acTp").val();
	var sysBusiUnit = findBU();
	var accountList = {
		sysRefNo : sysRefNo,
		sysEventTimes : 0,
		acNm : acNm,
		acOwnerid : userId,
		acNo : acNo,
		acBkNm : acBkNm,
		cntrctNo : sysRefNo,
		buyerId : buyerId,
		acTp : acTp,
		sysBusiUnit : sysBusiUnit
	};
	var grid = {};
	grid.accountList = SCFUtils.json2str(accountList);
	$.extend(data, grid,{submitMessage:'协议签约申请已提交，您可查询协议明细查看平台审批进度！'});
	return data;
}

function pageOnLoad(data) {
	SCFUtils.loadForm('mainForm', data.obj);
	$('#cntrctNo').val(data.obj.sysRefNo);
	$('#lmtCcy').combobox('setValue', 'CNY');
	var options = {};
	options.data = {
		refName : 'CntrctRef',
		refField : 'sysRefNo'
	};
	SCFUtils.getRefNo(options);
	queryCust();
	queryLicenceNo();
	querySumInvcM();
	queryCompany();
	loadCompanyClick();
	loadAcNoClick();
}

function pageOnResultLoad(data) {
	SCFUtils.loadForm('mainForm', data.obj);
	$("#readme")[0].disabled = true;
	$("#readme")[0].checked = true;
	$("#queryCntrct").remove();
	loadDg(data);
}

function pageOnPreLoad(data) {
	SCFUtils.loadForm('mainForm', data);
	$('#acNo').val("");
	$('#acNm').val("");
	$('#acBkNm').val("");
	queryCompany();
	loadCompanyClick();
	loadAcNoClick();
}

function loadDg(data){
	if(data.obj.acNo&&data.obj.buyerId){
		$('#acNoDg').datagrid('appendRow',{
			acNm: data.obj.acNm,
			acNo: data.obj.acNo,
			acBkNm: data.obj.acBkNm
		});
		$('#companyDg').datagrid('appendRow',{
			sysRefNo: data.obj.buyerId,
			custNm: data.obj.buyerNm,
			arAvalLoan: data.obj.arBal,
			status: data.obj.status
		});
	}
}

function pageOnReleaseResultLoad(data) {
	SCFUtils.loadForm('mainForm', data);
}

function pageOnReleasePageLoad(data) {
	SCFUtils.loadForm('mainForm', data);
	$('#acNoDg').datagrid('appendRow',{
		acNm: data.acNm,
		acNo: data.acNo,
		acBkNm: data.acBkNm
	});
}

function loadCompanyClick() {
	var options = $('#companyDg').datagrid('options');
	options.onCheck = onCompanyCheck;
}

function loadAcNoClick() {
	var options = $('#acNoDg').datagrid('options');
	options.onCheck = onAcNoCheck;
}

function onCompanyCheck() {
	var data = $('#companyDg').datagrid('getChecked');// 获取所有当前加载的数据行
	var buyerId = data[0].sysRefNo;
	var licenceNo = $('#licenceNo').val();
	$('#acNo').val('');
	$('#acNm').val('');
	$('#acBkNm').val('');
	$('#buyerId').val('');
	$('#buyerNm').val('');
	$('#arBal').val('');
	$('#buyerId').val(data[0].sysRefNo);
	$('#buyerNm').val(data[0].custNm);
	$('#arBal').val(data[0].arAvalLoan);
	$('#status').val(data[0].status);
	if (!SCFUtils.isEmpty(buyerId)) {
		var option = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000269',
				buyerId : buyerId,
				licenceNo : licenceNo
			},
			callBackFun : function(data) {
				if (SCFUtils.isEmpty(data.rows)) {
//					清空datagrid数据
					data.rows = [];
				}
				SCFUtils.loadGridData('acNoDg', data.rows, false, true);

			}
		};
		SCFUtils.ajax(option);
	}
}

function onAcNoCheck() {
	var data = $('#acNoDg').datagrid('getChecked');
	$('#acNo').val('');
	$('#acNm').val('');
	$('#acBkNm').val('');
	$('#acNo').val(data[0].acNo);
	$('#acNm').val(data[0].acNm);
	$('#acBkNm').val(data[0].acBkNm);
}

function showProtocol() {
	$.showWindow({
		title : '应收款融资协议',
		useiframe : true,
		modal : true,
		width : '70%',
		height : '80%',
		minimizable : false,
		maximizable : false,
		collapsible : false,
		content : 'url:jsp/1441856796094text.txt.txt',
		data : {
			'reqLoginType' : 'noLogin',
			'callback' : onproSuccess
		},
		buttons : [ {
			text : '同意并继续',
			handler : 'protocolReg'
		}, {
			text : '下载',
			handler : 'downProtocol'
		} ]
	});
}

function onproSuccess() {
	$("#readme")[0].checked = true;
}