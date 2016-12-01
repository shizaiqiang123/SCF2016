function pageOnInt() {
	// SearchCimCust();
}

/*
 * 查询数据，mapping计算出相应的百分比，显示在页面上
 */
function SearchCimCust() {
	// 跟Q_P_000211里面的:typejava.util.Date对应，用于sql查询的时候进行日期转换
	var invValDt = $('#invValDt').datebox('getValue');
	var invDueDt = $('#invDueDt').datebox('getValue');
	if (!SCFUtils.isEmpty(invValDt) && !SCFUtils.isEmpty(invDueDt)) {
		invValDt = invValDt + ' 00:00:00';
		invDueDt = invDueDt + ' 00:00:00';
		var opt = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000275',
				cacheType : 'non',
				invValDt : invValDt,
				invDueDt : invDueDt
			},
			callBackFun : function(data) {
				if (data.success && !SCFUtils.isEmpty(data.rows)) {
					var sumInvAmt = 0;
					var b = [];
					$.each(data.rows, function(i, n) {
						sumInvAmt = SCFUtils.Math(sumInvAmt, n[1], 'add');// 累计所有业务类别下的应收账款的金额
					});
					$.each(data.rows, function(i, n) {
						var a = {};
						// format业务类别
						if (n[0] == '0') {
							n[0] = '应收账款融资';
							a.color = '#99BBFF';
						} else if (n[0] == '1') {
							n[0] = '测试融资';
							a.color = '#009FCC';
						} else if (n[0] == '2') {
							n[0] = '报表融资';
							a.color = '#999FCC';
						}
						// 计算出每一个业务类别下的应收账款金额在总和中所占百分比
						var percent = SCFUtils.Math(n[1], sumInvAmt, 'div');
						percent = SCFUtils.Math(percent, 100, 'mul');
						percent = parseFloat(percent).toFixed(3);
						a.value = SCFUtils.ccyFormat(n[1], '', 2);
						a.y = parseFloat(percent);
						a.name = n[0];
						b.push(a);
					});
					showImg(b);
				} else {
					$("#container").empty();
					SCFUtils.alert("没有查到符合要求的数据。");
				}
			}
		};
		SCFUtils.ajax(opt);
	} else {
		$("#container").empty();
		SCFUtils.alert("请先将查询条件填写完整。");
	}

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
								text : '应收账款发生额统计'
							},
							tooltip : {
								pointFormat : '{series.name}: <b>{point.percentage:.3f}%</b><br/><b>{point.value}</b>'
							},
							plotOptions : {
								pie : {
									allowPointSelect : true,
									cursor : 'pointer',
									depth : 35,
									dataLabels : {
										enabled : true,
										format : '{point.name}: <b>{point.value}</b>'
									}
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