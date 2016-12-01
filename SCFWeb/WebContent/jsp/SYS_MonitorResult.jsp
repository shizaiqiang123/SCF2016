<%@ page language="java" contentType="text/html; charset=UTF-8"
	import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
<title>监控页面</title>
<script type="text/javascript" src="js/sysMonitorResult.js"></script>


</head>
<body>
<form id="sysMonitorForm">
	<div id="dd" align="center">监控界面数据显示</div>
	<div id="sysResult">
<!-- 	<h1>aaa</h1> -->
<!-- 	<a href="javascript:openURL('www.baidu.com')">aaaa</a> -->
<%-- 	<jsp:include page="../monitoring?graph=usedMemory&width=900&height=400&period=jour"/> --%>
<%-- 	<%@ include file="../monitoring?graph=usedMemory&width=900&height=400&period=jour" %> --%>
	</div>
	<div>
		<tr>
			<td><input type="hidden" name="sysRefNo" id="sysRefNo"
				value="${sysUserInfo.userRefNo}"></td>
		</tr>
	</div>
</form>
</body>
</html>