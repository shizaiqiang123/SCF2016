<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>筛选页面</title>
<script type="text/javascript" src="js/SYS_History.js"></script>
</head>
<body>
	<div class="divGrid">
		<form id="ScreenMenuForm">
			<div id="screenDiv"
				style="height: 50px; border: 0px solid; text-align: left; padding-top: 20px;">
				<label>系统编号：</label> <input type="text" class="combo"
					name="sysRefNo" id="sysRefNo" value="${sysFuncInfo.sysRefNo}"></input>
			</div>

			<table id="ScreenHistory" title="菜单信息列表" cellspacing="0"
				cellpadding="0" width="100%" iconCls="icon-edit">
			</table>
		</form>
	</div>
</body>
</html>