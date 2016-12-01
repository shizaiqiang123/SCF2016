<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>授信额度查询统计</title>
<script type="text/javascript"
	src="script/cntrct/CustQueryLimitReport.js"></script>
<script type="text/javascript" src="js/plugin/highchart/highcharts.js"></script>

</head>
<body class="UTSCF" >
<!-- 		<div class="easyui-panel" title="查询条件" data-options="collapsible:true" -->
<!-- 			style="width: 100%;" align="center"> -->
<!-- 			<ul class="condList clearfix"> -->
<!-- 				<li class="condLists fR catlogBtn tR"> -->
<!-- 					<button class="f14 schBtn white" type="button" -->
<!-- 						onclick="SearchCimCust()">查 询</button> -->
<!-- 				</li> -->
<!-- 			</ul> -->
<!-- 		</div> -->
		<input type="hidden"  id="sysRefNo" name="sysRefNo" />
		<input type="hidden" id="userOwnerid" name="userOwnerid" />
		<div id="mainDiv" class="easyui-panel form" title="授信额度使用报表"
				data-options="collapsible:true"
				style="width: 100%; height: 600px; min-height: 150px;">
				<div id="container" style="width: 98%; height: 99%; min-height: 20%; min-width: 20%; max-width: 120%; min-height: 20%; max-height: 120%; "></div>
			</div>
</body>
</html>