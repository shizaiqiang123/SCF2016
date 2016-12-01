<%@ page language="java" contentType="text/html; charset=UTF-8"
	import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
<title>客户等级维护小页</title>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="script\para\CustLevel_View.js"></script>
</head>
<body class="UTSCF">
		<form id='mainForm' style="padding: 25px;">
			<div class="item">
				<span class="label">客户等级编号：</span>
				<div class="fl item-ifo">
					<input class="easyui-validatebox combo" id="levelCd" name="levelCd"
						required="true" editable="false" />
				</div>
			</div>
			<div class="item">
				<span class="label">客户等级描述：</span>
				<div class="fl item-ifo">
					<input class="easyui-validatebox combo" id="levelDesc"
						name="levelDesc" required="true" editable="false" />
				</div>
			</div>

		</form>
</body>
</html>