<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>额度查询统计</title>
<script type="text/javascript" src="script/invc/queryLimitReport.js"></script>
<script type="text/javascript" src="js/plugin/highchart/highcharts.js"></script>

</head>
<body class="UTSCF">
<!-- 	<div class="easyui-panel" title="查询条件" data-options="collapsible:true" -->
<!-- 		style="width: 100%;" align="center"> -->
<!-- 		<ul class="condList clearfix"> -->
<!-- 			<li class="condLists fR catlogBtn tR"> -->
<!-- 				<button class="f14 schBtn white" type="button" -->
<!-- 					onclick="SearchCimCust()">查 询</button> -->
<!-- 			</li> -->
<!-- 		</ul> -->
<!-- 	</div> -->
	<div class="easyui-panel" title="报表显示" id="container"
		data-options="collapsible:true"
		style="width: 100%; height: 400px; min-height: 120px;"center"></div>
</body>
</html>