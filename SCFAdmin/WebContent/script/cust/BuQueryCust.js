function pageOnInt() {
	SCFUtils.setFormReadonly('#supplierForm', true);
	ajaxCompanyTable();
	ajaxAcNoTable();
}
function beforeLoad() {
	var data = {
		cacheType : 'non'
	};
	return   {data:data};
}

function ignoreToolBar(){
	
}

function pageOnLoad(data) {
	var row = win.getData("doname");
	SCFUtils.loadForm('supplierForm', data);
	$("#sysBuyerId").val(data.obj.buyerId);
	if (data.obj.regist == 0) {
		SCFUtils.alert("供应商还未注册！");
		//		queryCust();
		// 数据准备和显示
		queryCustBuyer();
		var sysRefNo = $('#sysRefNo').val();
		if (sysRefNo != "" && sysRefNo != null)
			onCompanyCheck();
		else
			$('#acNoDiv').css('display', 'none');

		//		额度赋值
		$("#lmtAmt").val(0);
		$("#arBal").val(0);
		$("#arAvalLoan").val(0);
		$("#arOpen").val(0);
		$("#openLoanAmt").val(0);
		$('#limitDiv').css('display', 'none');
		$('#loanDiv').css('display', 'none');

		return;
	}
	queryCust();
	// 数据准备和显示
	findUserId();
	queryCustBuyer();
	onCompanyCheck();
	lookRefNo();
	// 开始报表
	PieSearchLoan();
	// loadCompanyClick();
	// loadAcNoClick();
}
function pageOnPreLoad(data) {
}
var color = [ "#9E414F", "#374BEA", "#148CD2", "#14D2C4", "#14D237", "#B7B738",
		"#BD6A11", "#D22626", "#E213DB", "#9C1163" ];
/*
 * 融资 查询数据，mapping计算出相应的百分比，显示在页面上
 */
function PieSearchLoan() {
	var sysRefNo = $("#sysRefNo").val();
	var buyerId = $("#sysBuyerId").val();
	var opt = {
		url : SCFUtils.AJAXURL,
		async : false,
		data : {
			cacheType : 'non',
			queryId : 'Q_P_000291',
			selId : sysRefNo,
			buyerId : buyerId
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				var sumLmtAmt = 0; // 信用额度余额
				var sumArBal = 0; // 应收账款总额
				var sumArAvalLoan = 0; // 最大可融资额度
				var sumArOpen = 0; // 当前可融资额度 AR_AVAL_LOAN-OPEN_LOAN_AMT
				var sunOpenLoanAmt = 0; // 融资余额
				var b = [];
				$.each(data.rows, function(i, n) {
					sumLmtAmt = SCFUtils.Math(sumLmtAmt, n[1] == null ? 0
							: n[1], 'add');
					sumArBal = SCFUtils.Math(sumArBal, n[2] == null ? 0 : n[2],
							'add');// 累计所有业务类别下的应收账款的金额
					sumArAvalLoan = SCFUtils.Math(sumArAvalLoan,
							n[3] == null ? 0 : n[3], 'add');
					var arOpen = SCFUtils.Math(n[3] == null ? 0 : n[3],
							n[4] == null ? 0 : n[4], 'sub');
					sumArOpen = SCFUtils.Math(sumArOpen, arOpen, 'add');
					sunOpenLoanAmt = SCFUtils.Math(sunOpenLoanAmt,
							n[4] == null ? 0 : n[4], 'add');
				});
				var sun = sumArAvalLoan;

				// 为融资额度 赋值
				$("#lmtAmt").val(sumLmtAmt);
				$("#arBal").val(sumArBal);
				$("#arAvalLoan").val(sumArAvalLoan);
				$("#arOpen").val(sumArOpen);
				$("#openLoanAmt").val(sunOpenLoanAmt);

				var A1 = {};
				// var uuid = SCFUtils.uuid(2, 10);
				// A1.color = '#99BBFF';
				A1.color = color[1];
				// 计算出已用余额在总和中所占百分比
				if (sunOpenLoanAmt == 0) {
					A1.y = parseFloat(0);
				} else {
					var percentA1 = SCFUtils.Math(sunOpenLoanAmt, sun, 'div');
					percentA1 = SCFUtils.Math(percentA1, 100, 'mul');
					percentA1 = parseFloat(percentA1).toFixed(3);
					A1.y = parseFloat(percentA1);
				}
				A1.value = SCFUtils.ccyFormat(sunOpenLoanAmt, '', 2);
				A1.name = data.rows[0][0] + "--已用额度";
				b.push(A1);

				var A2 = {};
				// var uuid = SCFUtils.uuid(2, 10);
				// A2.color = '#009FCC';
				A2.color = color[2];
				// 计算出未用额度在总和中所占百分比
				if (sumArOpen == 0) {
					A2.y = parseFloat(0);
				} else {
					var percentA2 = SCFUtils.Math(sumArOpen, sun, 'div');
					percentA2 = SCFUtils.Math(percentA2, 100, 'mul');
					percentA2 = parseFloat(percentA2).toFixed(3);
					A2.y = parseFloat(percentA2);
				}
				A2.value = SCFUtils.ccyFormat(sumArOpen, '', 2);
				A2.name = data.rows[0][0] + "--未用额度";
				b.push(A2);

				b.sun = sun;
				showLoan(b);
			} else {
				$("#loan").empty();

				//				额度赋值
				$("#lmtAmt").val(0);
				$("#arBal").val(0);
				$("#arAvalLoan").val(0);
				$("#arOpen").val(0);
				$("#openLoanAmt").val(0);
				$('#limitDiv').css('display', 'none');
				$('#loanDiv').css('display', 'none');

				SCFUtils.alert("没有查到符合要求的融资数据。");
			}
		}
	};
	SCFUtils.ajax(opt);

}
/*
 * 融资 图表展现方法
 */
function showLoan(b) {
	$(function() {
		$('#loan')
				.highcharts(
						{
							chart : {
								type : 'pie',
								options3d : {
									enabled : true,
									alpha : 45,
									beta : 0
								}
							},
							title : {
								// text : '额度查询',
								text : '<div align="center" style="text-align:center;"><span >'
										+ "总额"
										+ '<span/>'
										+ '<br/>'
										+ '<span >'
										+ b.sun
										+ '<span/>'
										+ '<br/><div/>',
								verticalAlign : 'middle',
								y : -18,
								shared : true,
								useHTML : true,
								fontFamily : "微软雅黑"

							},
							tooltip : {
								pointFormat : '所占百分比: <b>{point.y}%</b><br/><b>{point.value}</b>'
							},
							plotOptions : {
								pie : {
									allowPointSelect : true, // 是否允许鼠标选中数据点
									// 当前数据点的监听
									size : '25',
									innerSize : '12', // 饼图中心空圆（‘’为百分比）
									cursor : 'pointer',
									depth : 60,
									showInLegend : true, // 显示图例
									dataLabels : {
										enabled : true,
										format : '<b>{point.value}<b>'
									},
								}
							},
							legend : {
								layout : 'vertical', // 图例布局（水平垂直）
								floating : true, // 是否可以浮动，配合x，y属性。
								align : 'right', // 图例水平对齐
								// verticalAlign : 'foot', // 图例垂直对齐
								labelFormatter : function() {
									return this.name + ' ( ' + this.y + ' % ) ';// 在名称后面追加百分比数据
								}
							},
							series : [ {
								type : 'pie',
								name : 'Browser share',
								data : b
							} ]
						});
	});
}
// 获取ownerId
function findUserId() {
	var sysRefNo = $("#sysRefNo").val();
	var options = {
		url : SCFUtils.AJAXURL,
		async : false,
		data : {
			cacheType : 'non',
			queryId : 'Q_P_000247',
			sysRefNo : sysRefNo
		},
		callBackFun : function(data) {
			if (data.success) {
				// 开始拼装
				if (SCFUtils.isEmpty(data.rows)) {
					SCFUtils.alert("网络错误，请检查网络！");
					// ajaxCustLevel(data.rows);
				} else {
					if ((data.rows).length != 1) {
						SCFUtils.alert("系统错误，请联系管理员！");
					} else {
						$('#userId').val(data.rows[0].userId);
						$('#userOwnerid').val(data.rows[0].userOwnerid);
						$('#busiUnit').val(data.rows[0].busiUnit);
						$('#sysBusiUnit').val(data.rows[0].busiUnit);
						return;
					}

				}
			}
		}
	};
	SCFUtils.ajax(options);
}
// 获取所属成员企业
function queryCustBuyer() {
	var buyerId = $("#buyerId").val();
	var options = {
		url : SCFUtils.AJAXURL,
		async : false,
		data : {
			cacheType : 'non',
			queryId : 'Q_P_000292',
			sysRefNo : buyerId
		},
		callBackFun : function(data) {
			if (data.success) {
				// $("#companyId").val(data.rows[0].buyerId);
				// }
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
					// $("#companyDg").datagrid("selectRow", 0);
				}
			}
		}
	};
	SCFUtils.ajax(options);
}
function queryInvcM(data) {
	var sumInvAmt = 0;
	var licenceNo = $('#licenceNo').val();
	// var buyerId = data.sysRefNo;
	var buyerId = $('#sysBuyerId').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			cacheType : 'non',
			licenceNo : licenceNo,
			buyerId : buyerId,
			queryId : 'Q_P_000294'
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
// 判断签约状态
function judgeStatus(data) {
	var status = 1;
	var sysRefNo = $('#sysRefNo').val();
	var buyerId = $('#sysBuyerId').val();
	// var buyerId = data.sysRefNo;
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			cacheType : 'non',
			selId : sysRefNo,
			buyerId : buyerId,
			queryId : 'Q_P_000293'
		},
		callBackFun : function(data) {
			if (data.success) {
				if (data.rows != null) {
					for (var i = 0; i < (data.rows).length; i++) {
						if (data.rows[i].sysTrxSts == "P"
								|| data.rows[i].sysTrxSts == "S") {
							status = 2;
							break;
						} else if (data.rows[i].sysTrxSts == "M"
								&& data.rows[i].approvalSts == "1") {
							status = 1;
							break;
						} else if (data.rows[i].sysTrxSts == "M"
								&& data.rows[i].approvalSts == "2") {
							status = 0;
						}
					}
				} else {
					status = 0;
				}
			}
		}
	};
	SCFUtils.ajax(options);
	return status;
}
function loadCompanyClick() {
	var options = $('#companyDg').datagrid('options');
	options.onCheck = onCompanyCheck;
}
function loadAcNoClick() {
	var options = $('#acNoDg').datagrid('options');
	options.onCheck = onAcNoCheck;
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
function onCompanyCheck() {
	//	var data = $('#companyDg').datagrid('getChecked');// 获取所有当前加载的数据行
	var data = $('#companyDg').datagrid('getRows');// 获取所有当前加载的数据行
	var buyerId = $('#sysBuyerId').val();
	var sysRefNo = $('#sysRefNo').val();
	$('#buyerId').val('');
	$('#buyerId').val(buyerId);
	if (!SCFUtils.isEmpty(buyerId)) {
		var option = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000290',
				buyerId : buyerId,
				acOwnerid : sysRefNo
			},
			callBackFun : function(data) {
				if (SCFUtils.isEmpty(data.rows)) {
					// 清空datagrid数据
					data.rows = [];
					$('#acNoDiv').css('display', 'none');
					SCFUtils.alert("此供应商还未导入帐号！");
				}
				SCFUtils.loadGridData('acNoDg', data.rows, false, true);
			}
		};
		SCFUtils.ajax(option);
	}
}
// 获取相应licenceno的供应商信息
function queryCust() {
	var licenceNo = $("#licenceNo").val();
	var options = {
		url : SCFUtils.AJAXURL,
		async : false,
		data : {
			cacheType : 'non',
			queryId : 'Q_P_000303',
			licenceNo : licenceNo
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				SCFUtils.loadForm('supplierForm', data.rows[0]);
			}
		}
	};
	SCFUtils.ajax(options);
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
		columns : [ [
		// {
		// field : 'ck',
		// checkbox : true
		// },
		{
			field : 'sysRefNo',
			title : '成员企业编号',
			width : 70
		}, {
			field : 'custNm',
			title : '成员企业名称',
			width : 100
		}, {
			field : 'arAvalLoan',
			title : '应收账款金额',
			width : 100,
			formatter : ccyFormater
		}
		//		, {
		//			field : 'status',
		//			title : '签约状态',
		//			width : 70,
		//			formatter : contractStatusFormater
		//		}
		] ]
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
		columns : [ [
		// {
		// field : 'ck',
		// checkbox : true
		// },
		{
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
		} ] ]
	};
	$('#acNoDg').datagrid(options);
}
function findBU() {
	var sysBusiUnit = SCFUtils.SYSBUSIUNIT;
	if (SCFUtils.isEmpty(sysBusiUnit)) {
		sysBusiUnit = "platform";
	}
	return sysBusiUnit;
}
function lookRefNo() {
	var sysRefNo = $('#sysRefNo').val();
	$('#lsysRefNo').html(sysRefNo);
}