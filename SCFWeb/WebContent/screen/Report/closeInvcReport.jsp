<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>到期应收账款转让页面</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/Report/closeInvcReport.js"></script>
</head>
<body>
<form id="invcMForm">	
	<div id="invcMDiv" class="easyui-panel" title="应收账款列表" data-options="collapsible:true" style="width:100%">
		<table id="invcMTable" cellspacing="0" cellpadding="0"
					width="100%" iconCls="icon-edit">
		</table>
		<div id="toolbar">
		</div>
	</div>
	
    <input type="hidden" id="startDt" name="startDt"/>	
    <input type="hidden" id="endDt" name="endDt"/>	
	<input type="hidden"  name="sysdate" id="sysdate"/>
	<input type="hidden"  name="custNo" id="custNo"/>
	<input type="hidden"  name="instNo" id="instNo"/>
	
</form>
</body>
</html>