<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>应收账款明细页面</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/Report/invcDetailReport.js"></script>
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
	
    <input type="hidden" id="selNmNew" name="selNmNew"/>	
    <input type="hidden" id="buyerNmNew" name="buyerNmNew"/>	
	<input type="hidden"  name="cntrctNoNew" id="cntrctNoNew"/>
	<input type="hidden"  name="busiTpNew" id="busiTpNew"/>
	<input type="hidden"  name="invStsNew" id="invStsNew"/>
	<input type="hidden"  name="invMinAmt" id="invMinAmt"/>
	<input type="hidden"  name="invMaxAmt" id="invMaxAmt"/>
	<input type="hidden"  name="startDt" id="startDt"/>
	<input type="hidden"  name="endDt" id="endDt"/>
	<input type="hidden"  name="sysRefNo" id="sysRefNo"/>
	<input type="hidden"  name="mainData" id="mainData"/>
	
</form>
</body>
</html>