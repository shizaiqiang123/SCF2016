<%@ page language="java" contentType="text/html; charset=UTF-8"
	import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="js_cs.jsp"%>
<html>
<style type="text/css">
#reportDiv td {
	text-align: center
}

input,button {
	border-width: 0;
	outline: 0;
	font-family: 'Microsoft Yahei';
}

html,body,div,ul {
	margin: 0 auto;
	padding: 0;
}
</style>
<head>
<title>报表预览</title>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/View_Report.js"></script>
</head>
<body class="UTSCF">
	<form id="supplierForm">
		<div id="regist">
			<div id="reportDiv" align="center" class="easyui-panel" title="报表列表"
				style="display: block; width: 100%" data-options="collapsible:true">
				<table id="reportTable" cellspacing="0" iconCls="icon-edit"
					 width="100%" align="center">
				</table>
			</div>
		</div>
	</form>
</body>
</html>