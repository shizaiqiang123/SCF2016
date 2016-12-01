<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>筛选页面</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="js/SYS_Catalog.js"></script>
<style type="text/css">
input, button {
	border-width: 0;
	outline: 0;
	font-family: 'Microsoft Yahei';
}

html, body, div, ul {
	margin: 0 auto;
	padding: 0;
}
</style>
</head>
<body class="SYS_Catalog">
	<div class="divGrid">
		<form id="ScreenMenuForm">
			<!-- <div class="easyui-panel blockArea" title="查询条件"
				data-options="collapsible:true" style="width: 100%">
				<ul class="condList clearfix" id="screenDiv"></ul>
			</div> -->
			<div class="easyui-panel" title="查询结果"
				data-options="collapsible:true,border:false " style="width: 100%" >
				<table id="ScreenMenuTable" cellspacing="0" cellpadding="0"
					width="100%">
				</table>
			</div>
		</form>
	</div>
</body>
</html>