function pageOnInt() {
	ajaxTable();
	ajaxBox();
	findOwnerId();
	onSearchBtnClick();
}
function findBU() {
	var sysBusiUnit = SCFUtils.SYSBUSIUNIT;
	if (SCFUtils.isEmpty(sysBusiUnit)) {
		sysBusiUnit = "platform";
	}
	return sysBusiUnit;
}

function ajaxBox() {
	var busiTp = [ {
		"id" : "0",
		"text" : "应收款融资"
	}];
	
	$("#busiTp").combobox('loadData', busiTp).combobox({
		editable : false
	});
}
function onNextBtnClick() {
	var rowSysRefNo=$("#rowSysRefNo").val();
	var data={
			sysRefNo:rowSysRefNo
	};
	SCFUtils.json2str(data);
	
//	if (data == null) {
//		SCFUtils.alert("请选择一条数据！");
//	}
	return data;
}
 function initToolBar() {
 var showButton = [ 'cancel' ];

 return showButton;
 }
/*
 * 查询数据，mapping计算出相应的百分比，显示在页面上
 */
function SearchCimCust() {
	var sysBusiUnit = findBU();
	var userOwnerid = $("#userOwnerid").val();
	var busiTp = $('#busiTp').combobox('getValue');
	if(busiTp=="")
		busiTp="0";
	var color=["#DCEC0A","#5024E2","#0A93A5","#14DA73","#0ABEF1","#0AF18A","#79F10A","#F1E80A"];
	var opt = {
		url : SCFUtils.AJAXURL,
		async : false,
		data : {
			cacheType : 'non',
			queryId : 'Q_P_000285',
			userOwnerid : userOwnerid,
			sysBusiUnit : sysBusiUnit,
			busiTp : busiTp
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				var sumImtBal = 0;
				var sumArAvalLoan = 0;   // 应收账款可融资额度
				var sun = 0;
				var b = [];
				$.each(data.rows, function(i, n) {
					sumImtBal = SCFUtils.Math(sumImtBal, n[2], 'add');
					sumArAvalLoan = SCFUtils.Math(sumArAvalLoan, n[3], 'add');// 累计所有业务类别下的应收账款的金额
				});
				sun =  sumArAvalLoan;
				$.each(data.rows, function(i, n) {
					var a = {};
					// format业务类别
					// if (n[0] == '0') {
					// n[0] = '应收账款可融资余额';
					// }
//					Highcharts.getOptions().colors=Highcharts.map(Highcharts.getOptions().colors,function(color){
//						return {
//							radialGradient:{cx:0.5,cy:0.3,r:0.7},
//							stops:[
//								[0,color],
//								[1,Highcharts.Color(color).brighten(-0.3).get('rgb')]
//							]
//						};
//					});
//					var uuid = SCFUtils.uuid(3,10);
//					a.color = "#"+uuid+"BDF";
					a.color = color[i];

					// 计算出每一个业务类别下的应收账款金额在总和中所占百分比
					var percent = SCFUtils.Math(n[2] + n[3], sun, 'div');
					percent = SCFUtils.Math(percent, 100, 'mul');
					percent = parseFloat(percent).toFixed(3);
					a.value = SCFUtils.ccyFormat(n[2] + n[3], '', 2);
					a.y = parseFloat(percent);
					a.name = n[1];
					a.sysRefNo = n[4];
					b.push(a);
				});
				b.sun=sun;
				showImg(b);
			} else {
				$("#container").empty();
				SCFUtils.alert("没有查到符合要求的数据。");
			}
		}
	};
	SCFUtils.ajax(opt);

}
/*
 * 图表展现方法
 */
function showImg(b) {
	$(function() {
		$('#container')
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
//								text : '额度查询',
								text:'<div align="center" style="text-align:center;"><span >'+"总额"+'<span/>'+'<br/>'+
								'<span >'+b.sun+'<span/>'+'<br/><div/>',
								verticalAlign:'middle',
								y:-18,
								shared:true,
								useHTML:true,
								fontFamily:"微软雅黑"
									
							},
							tooltip : {
								pointFormat : '所占百分比: <b>{point.y}%</b><br/><b>{point.value}</b>'
							},
							plotOptions : {
								pie : {
									allowPointSelect : true, // 是否允许鼠标选中数据点
									// 当前数据点的监听
									point : {
										events : {
											select : function(event) {
												var data = {
													sysRefNo : this.sysRefNo
												};
												console.log(data);//打印data数据到前段控制台
												SCFUtils.json2str(data);
												$("#rowSysRefNo").val(this.sysRefNo);
												onNextBtnClick();
												SCFUtils.onNextBtnClick();
											}
										}
									},
									size : '25',
									innerSize : '12', // 饼图中心空圆（‘’为百分比）
									cursor : 'pointer',
									depth : 60,
									showInLegend : true, // 显示图例
									dataLabels : {
										enabled : true,
										format : '{point.name}: <b>{point.value}<b>;({point.y}%)</b>'
									},
								}
							},
							legend : {
								layout : 'vertical', // 图例布局（水平垂直）
								floating : true, // 是否可以浮动，配合x，y属性。
								align : 'right', // 图例水平对齐
								// verticalAlign : 'foot', // 图例垂直对齐
								labelFormatter : function() {
									return this.name + ' ( ' + this.y
											+ ' % ) ';// 在名称后面追加百分比数据
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
// 获取额度信息
function findRow(busiTp) {
	 var sysBusiUnit = findBU();
//	var sysBusiUnit = "SYSBU00223";
	var userOwnerid = $("#userOwnerid").val();
	var options = {
		url : SCFUtils.AJAXURL,
		async : false,
		data : {
			cacheType : 'non',
			queryId : 'Q_P_000280',
			sysBusiUnit : sysBusiUnit,
			userOwnerid : userOwnerid,
			busiTp : busiTp
		// 融资类型
		},
		callBackFun : function(data) {
			if (data.success) {
				// 开始拼装
				if (SCFUtils.isEmpty(data.rows)) {
					SCFUtils
							.loadGridData('searchTable', data.rows, false, true);
					SCFUtils.alert("没有相应的额度信息!");
				} else {
					SCFUtils
							.loadGridData('searchTable', data.rows, false, true);
				}
			}
		}
	};
	SCFUtils.ajax(options);
}
// 获取ownerId
function findOwnerId() {
	var sysRefNo = $("#sysRefNo").val();
	var options = {
		url : SCFUtils.AJAXURL,
		async : false,
		data : {
			cacheType : 'non',
			queryId : 'Q_P_000284',
			sysRefNo : sysRefNo
		},
		callBackFun : function(data) {
			if (data.success) {
				$("#userOwnerid").val(data.rows[0].userOwnerid);
			}
		}
	};
	SCFUtils.ajax(options);
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
		fitColumns : true,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹
		loadMsg : '数据加载中,请稍后...',
		onLoadError : function() {
			SCFUtils.alert('数据加载失败!');
		},
		columns : getColumns(),
	// onLoadSuccess : onLoadSuccess
	};
	$('#searchTable').datagrid(options);
}

function getColumns() { // 初始化表头
	return [ [
	// {
	// field : 'ck',
	// checkbox : true
	// },
	{
		field : 'selNm',
		title : '授信客户名称',
		width : 200
	// ,
	// formatter : busiTpFormter
	}, {
		field : 'buyerNm',
		title : '企业名称',
		width : 200
	}, {
		field : 'lmtAmt',
		title : '信用额度',
		width : 120
	 ,
	 formatter : ccyFormater
	},{
		field : 'arAvalLoan',
		title : '应收账款可融资余额 ',
		width : 180,
		 formatter : ccyFormater
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
	// 获取表单内容以查询
	var busiTp = $('#busiTp').combobox('getValue');
	findRow(busiTp);
	SearchCimCust();
}
