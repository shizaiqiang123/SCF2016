<%@ page language="java" contentType="text/html; charset=UTF-8"
	import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>新增账号信息</title>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
<script src="script/cust/addCompanyAc.js" type="text/javascript"></script>
</head>
<body>
	<form id='mainForm'>
		<div id="AcNoDiv" style="margin: auto; margin-top: 50px">
			<div class="item">
				<span class="label">账户名：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo"
						name="acNm" id="acNm" required="true"
						data-options="validType:'maxLength[70]'"/>
					<input type="hidden" id="sysRefNo" name="sysRefNo">
					<input type="hidden" id="acOwnerid" name="acOwnerid">
				</div>
			</div>
			<div class="item">
				<span class="label">账号：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo"
						name="acNo" id="acNo" required="true"
						data-options="validType:['maxLength[19]','number','minLength[11]']" />
				</div>
			</div>
			<div class="item">
				<span class="label">开户银行：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo"
						name="acBkNm" id="acBkNm" required="true"
						data-options="validType:'maxLength[70]'"/>
					<input type="hidden" value="3" id="acTp" name="acTp" />
				</div>
			</div>
		</div>
	</form>
</body>
</html>