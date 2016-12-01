<%@ page language="java" contentType="text/html; charset=UTF-8"
	import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<html>
<head>
<title>报表预览</title>
<script type="text/javascript" src="script/Pmt_View_Report.js"></script>
</head>
<body class="UTSCF">
	<div id="reportDiv" align="center" style="width: 100%; height: 400px"
		class="easyui-panel" title="" data-options="collapsible:true">
		<table class="easyui-datagrid" id="reportTable" cellspacing="0"
			cellpadding="0" style="width: 100%; height: auto" iconCls="icon-edit">
		</table>
	</div>
</body>
</html>