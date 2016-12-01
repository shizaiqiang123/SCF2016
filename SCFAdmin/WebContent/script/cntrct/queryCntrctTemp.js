function pageOnInt() {
	ajaxTable();
	queryLicenceNo();
	queryCntrctTemp();
}

function pageOnLoad() {
}

function pageOnPreLoad() {
}

function onNextBtnClick() {
	var gridData = {};
	gridData = SCFUtils.getSelectedGridData('dg', false);
	if(gridData.rows0.productSts=="0"){
		SCFUtils.alert("该产品还未上线，请选择其他已上线产品。");
		return;
	}
	return gridData.rows0;
}

function ajaxTable() {
	var options = {
		toolbar : '#companyToolbar',
		idField : 'sysRefNo',
		rownumbers : true,
		checkOnSelect : true,
		singleSelect : true,// 只选一行
		pagination : true,// 是否分页
		fitColumns : true,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹
		idField : 'id',
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			field : 'sysRefNo',
			title : '协议编号',
			width : 70
		}, {
			field : 'productNm',
			title : '产品名称',
			width : 70
		}, {
			field : 'editionNo',
			title : '协议文本版本编号',
			width : 70
		}, {
			field : 'dueDt',
			title : '协议文本生效日',
			width : 70,
			formatter : dateFormater
		}, {
			field : 'productSts',
			title : '产品状态',
			width : 70,
			formatter : productStsFormater
		}, {
			field : 'sumArBal',
			title : '应收账款总额',
			width : 70,
			formatter : ccyFormater
		} ] ]
	};
	$('#dg').datagrid(options);
}

function queryCntrctTemp() {
	var sysRefNo = $('#sysRefNo').val();
	var productNm = $('#productNm').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000305',
			sysRefNo : sysRefNo,
			productNm : productNm
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				$.each(data.rows, function(i, n) {
					var productSts = queryStdProuduct(n);
					var sumArBal = querysumArBal(n);
					$.extend(n, {
						productSts : productSts,
						sumArBal : sumArBal
					});
				});
			}else {
				data.rows = [];
				SCFUtils.alert("未查询到符合条件的记录！");
			}
			SCFUtils.loadGridData('dg', data.rows, false, true);
//			$.each(data.rows,function(i,n){
//				if(n.productSts=='0'){
//					SCFUtils.setDatagridRowReadonly("dg",i,true,function(){
//						SCFUtils.alert("该产品暂不可签约！");
//					});
//				}
//			});
		}
	};
	SCFUtils.ajax(options);
}

function queryStdProuduct(data) {
	var productId = data.productId;
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			cacheType : 'non',
			productId : productId,
			queryId : 'Q_P_000306'
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				productSts = data.rows[0].productSts;
			}
		}
	};
	SCFUtils.ajax(options);
	return productSts;
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

function querysumArBal(data){
	if(data.busiTp=='0'){
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
					sumArBal = data.rows[0];
				}else{
					sumArBal = 0;
				}
			}
		};
		SCFUtils.ajax(options);
	}else{
		sumArBal = 0;
	}
	return sumArBal;
}

function onResetBtnClick() {
	$('#sysRefNo').val("");
	$('#productNm').val("");
}

function onSearchBtnClick() {
	queryCntrctTemp();
}