<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>接口监控页面</title>
<link rel="stylesheet" href="css/zybl/boccop.css" />
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/service/GapiMsg.js"></script>
<!-- <meta http-equiv="refresh" content="5"> -->
<style>
#PortMonitorForm .panel .easyui-fluid {
	
}
</style>
</head>
<body style="min-height: 600px;">
	<form id="GapiMsgForm">
		<div id="GapiMsgDiv" style="width: 100%;" class="easyui-panel"
			title="监控信息" data-options="collapsible:true">
			<div id="content" class="wrapMain home">
<!-- 				<ul id="inner" class="clearfix eventArea f16 white"> -->
<!-- 					<li class='fL portLi'>接口名称：Advice</br> -->
<!-- 					异常数量：<span id="adviceCount"></span></br> -->
<!-- 					<button id='adviceSendAgain' class='portButton white' onclick="detailDataBox('Verify')">异常处理</button> -->
<!-- 					<button id='adviceQueryAgain' class='portButton white' onclick="queryPortMonitorBox('Verify')">详细信息</button> -->
<!-- 					</li> -->
					<ul id="userinner" class="clearfix eventArea f14 ">
					</ul>
			</div>
			<div><input type="hidden" id="sysRefNo" name="sysRefNo" value="${sysUserInfo.userRefNo}"/></div>
		</div>
	</form>
</body>
</html>