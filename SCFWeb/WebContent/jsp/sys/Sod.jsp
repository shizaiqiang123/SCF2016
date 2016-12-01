<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/sys/Sod.js"></script>
<title>往来银行信息</title>
</head>
<body class="UTSCF" style="width: 100%; margin: 0 auto">
<form id="SodForm">
<div id="SodDiv">
<div id="userDiv" style="width: 100%;height:300px" class="easyui-panel"
			title="Start of day" data-options="collapsible:true">
			<div class="item">
				<span class="label">当前日期:</span>
				<div class="fl item-ifo">
					<input type="text"  name="busiDt"  id="busiDt" class="easyui-datebox" required="required" value="${sysUserInfo.sysDate }"
					data-options="height:32,width:253,panelWidth:253"/>
					</div>
			</div>
			<div class="item">
				<span class="label">前一次截止日期:</span>
				<div class="fl item-ifo">
					<input type="text"  name="preBusiDt"  id="preBusiDt" class="easyui-datebox"
					data-options="height:32,width:253,panelWidth:253"/>
					</div>
			</div>
			<div class="item">
				<span class="label">系统状态:</span>
				<div class="fl item-ifo">
					<input type="text"  class="easyui-validatebox combo" name="sysSts" id="sysSts" />
					<input type="hidden"  name="sysRefNo" id="sysRefNo"/>
					<input type="hidden"  name="preEndBusiDt" id="preEndBusiDt"/>
					<input type="hidden"  name="preStartBusiDt" id="preStartBusiDt"/>
					</div>
			</div>
</div>
</form>
</body>
</html>