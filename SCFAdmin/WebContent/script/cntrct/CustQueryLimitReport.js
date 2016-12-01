function pageOnInt() {
}
function pageOnLoad(data) {
	$("#sysRefNo").val(data.obj.sysRefNo);
	SearchCimCust();
}
function findBU() {
	var sysBusiUnit = SCFUtils.SYSBUSIUNIT;
	if (SCFUtils.isEmpty(sysBusiUnit)) {
		sysBusiUnit = "platform";
	}
	return sysBusiUnit;
}
/*
 * 查询数据，mapping计算出相应的百分比，显示在页面上
 */
function SearchCimCust() {
	 var sysBusiUnit = findBU();
	var sysRefNo = $("#sysRefNo").val();
	var userOwnerid = $("#userOwnerid").val();
	var opt = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000281',
			cacheType : 'non',
			sysRefNo : sysRefNo,
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				var sumImtBal = 0;       //信用额度余额
				var sumArAvalLoan = 0;    //应收账款可融资额度
				var sumOpenLoanAmt  = 0;   //融资余额
				var b = [];
				$.each(data.rows, function(i, n) {
					sumImtBal = SCFUtils.Math(sumImtBal, n[1], 'add');
					sumArAvalLoan = SCFUtils.Math(sumArAvalLoan, n[2], 'add');// 累计所有业务类别下的应收账款的金额
					sumOpenLoanAmt = SCFUtils.Math(sumOpenLoanAmt, n[3], 'add');
				});
				var sun = sumImtBal + sumArAvalLoan;

				var A1 = {};
				var uuid = SCFUtils.uuid(2, 10);
				A1.color = '#99BBFF';
				// 计算出已用余额在总和中所占百分比
				if (sumOpenLoanAmt == 0) {
					A1.y = parseFloat(0);
				} else {
					var percentA1 = SCFUtils.Math(sumOpenLoanAmt, sun, 'div');
					percentA1 = SCFUtils.Math(percentA1, 100, 'mul');
					percentA1 = parseFloat(percentA1).toFixed(3);
					A1.y = parseFloat(percentA1);
				}
				A1.value = SCFUtils.ccyFormat(sumOpenLoanAmt, '', 2);
				A1.name = data.rows[0][0] + "--已用额度";
				b.push(A1);

				var A2 = {};
				var uuid = SCFUtils.uuid(2, 10);
				A2.color = '#009FCC';
				// 计算出未用额度在总和中所占百分比
				var percentA2 = SCFUtils.Math(sun - sumOpenLoanAmt, sun, 'div');
				percentA2 = SCFUtils.Math(percentA2, 100, 'mul');
				percentA2 = parseFloat(percentA2).toFixed(3);
				A2.y = parseFloat(percentA2);
				A2.value = SCFUtils.ccyFormat(sun - sumOpenLoanAmt, '', 2);
				A2.name = data.rows[0][0] + "--未用额度";
				b.push(A2);

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
									size : '25',
									innerSize : '12', // 饼图中心空圆（‘’为百分比）
									cursor : 'pointer',
									depth : 35,
									showInLegend : true, // 显示图例
									dataLabels : {
										enabled : true,
										format : '<b>{point.value}<b>'
									}
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