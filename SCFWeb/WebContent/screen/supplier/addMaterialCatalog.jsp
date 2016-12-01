<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>筛选带补充材料</title>
<!-- <script type="text/javascript" src="js/scfjs/Formater.js"></script> -->
<script type="text/javascript"
	src="script/supplier/addMaterialCatalog.js"></script>
<style type="text/css">
#mainDiv td {
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
</head>
<body class="SYS_Catalog">
	<div class="divGrid">
		<form id="ScreenMenuForm">
			<table id="searchTable" title="注册签约历程" cellspacing="0"
				cellpadding="0" width="100%" align="center" iconCls="icon-edit"> 
			</table>
		</form>
		<input type="hidden" value="${sysUserInfo.userRefNo }" id="sysRefNo"
			name="sysRefNo" /> <input type="hidden" id="userId"
			name="userId" value="${sysUserInfo.userId }" />
	</div>
</body>
</html>