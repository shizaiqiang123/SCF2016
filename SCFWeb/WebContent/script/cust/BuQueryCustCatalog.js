function pageOnInt() {
	ajaxTable();
	queryCustTp("", "", "");
}
function findBU() {
	var sysBusiUnit = SCFUtils.SYSBUSIUNIT;
	if (SCFUtils.isEmpty(sysBusiUnit)) {
		sysBusiUnit = "platform";
	}
	return sysBusiUnit;
}
function onNextBtnClick() {
	var data = $('#searchTable').datagrid('getSelected');
	if (data == null) {
		SCFUtils.alert("请选择一条数据！");
	}
	$.extend(data, {
		'doname' : SCFUtils.json2str(data)
	});
	return data;
}

// 获取当前登陆用户的custTp
function queryCustTp(custNm, cyRefNo, licenceNo) {
	var userOwnerId = $("#userOwnerId").val();
	var options = {
		url : SCFUtils.AJAXURL,
		async : false,
		data : {
			cacheType : 'non',
			queryId : 'Q_P_000299',
			sysRefNo : userOwnerId
		},
		callBackFun : function(data) {
			if (data.success) {
				// 开始拼装
				if (SCFUtils.isEmpty(data.rows)) {
				} else {
					var custTp = data.rows[0].custTp;
					$("#custTp").val(custTp);
					var userOwnerId = $("#userOwnerId").val();
					if (custTp == 1) {
						queryCustBuyer(userOwnerId, custNm, cyRefNo, licenceNo);
					} else if (custTp == 3) {
						queryCustBuyer("", custNm, cyRefNo, licenceNo);
					} else {
						// 无权限
					}
				}
			}
		}
	};
	SCFUtils.ajax(options);
}
function queryCustBuyer(userOwnerId, custNm, cyRefNo, licenceNo) {
	var sysBusiUnit = findBU();
	var options = {
		url : SCFUtils.AJAXURL,
		async : false,
		data : {
			cacheType : 'non',
			queryId : 'Q_P_000302',
			sysBusiUnit : sysBusiUnit,
			buyerId : userOwnerId,
			iLicenceNo : licenceNo,
			iCustNm : custNm,
			bBuyerId : cyRefNo
		},
		callBackFun : function(data) {
			if (data.success) {
				var row = queryCustBuyerNm();
				// 开始拼装
				var rows = [];// 用于装共同条件的记录
				$.each(data.rows, function(i, n) {
					n.buyerId = n.buyerId;
					if (n.sysRefNo == null) {
						n.regist = "0";
					} else {
						n.regist = "1";
					}
					$.each(row, function(j, m) {
						if (n.buyerId == m.sysRefNo) {
							n.buyerNm = m.custNm;
							rows.push(n);
							// $.extend({n},rows);
						}

					});
				});
				// SCFUtils.loadGridData('searchTable', data.rows, false, true);
				SCFUtils.loadGridData('searchTable', rows, false, true);
			}
		}
	};
	SCFUtils.ajax(options);
}
function queryCustBuyerNm() {
	var cyNm = $("#cyNm").val();
	var sysBusiUnit = findBU();
	var row = "";
	var options = {
		url : SCFUtils.AJAXURL,
		async : false,
		data : {
			cacheType : 'non',
			queryId : 'Q_P_000304',
			sysBusiUnit : sysBusiUnit,
			custNm : cyNm
		},
		callBackFun : function(data) {
			if (data.success) {
				// 开始拼装
				// buyerNm=data.rows[0].custNm;
				row = data.rows;
			}
		}
	};
	SCFUtils.ajax(options);
	return row;
}
function ajaxTable() {
	// 加载表格
	var options = {
		// url : SCFUtils.QUERYURL,
		toolbar : '#toolbar',
		rownumbers : true,
		checkOnSelect : true,
		singleSelect : true,// 只选一行
		pagination : true,// 是否分页
		fitColumns : false,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹
		loadMsg : '数据加载中,请稍后...',
		onLoadError : function() {
			SCFUtils.alert('数据加载失败!');
		},
		columns : getColumns()
	// onLoadSuccess : onLoadSuccess
	};
	$('#searchTable').datagrid(options);
}

function getColumns() { // 初始化表头
	return [ [ {
		field : 'ck',
		checkbox : true
	}, {
		field : 'licenceNo',
		title : '营业执照号码',
		width : "15%"
	}, {
		field : 'iCustNm',
		title : '授信客户名称',
		width : "25%"
	}, {
		field : 'buyerId',
		title : '成员企业编号',
		width : "15%"
	}, {
		field : 'buyerNm',
		title : '成员企业名称',
		width : "25%"
	}, {
		field : 'regist',
		title : '注册状态',
		width : "15%",
		formatter : registFormter
	} ] ];
}
// 搜索栏表单重置
function onResetBtnClick() {
	$('#screenForm')[0].reset();
}

/**
 * 表单的查询
 */
function onSearchBtnClick() {
	var custNm = $("#custNm").val();
	var cyRefNo = $("#cyRefNo").val();
	var cyNm = $("#cyNm").val();
	var licenceNo = $("#licenceNo").val();
	queryCustTp(custNm, cyRefNo, licenceNo);
}
