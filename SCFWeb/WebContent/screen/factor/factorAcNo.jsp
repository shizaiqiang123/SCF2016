<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>新增账号页面</title>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="script/factor/factorAcNo.js"></script>
</head>
<body>
	<form id="factorAcnoForm">
		<div id="factorAcnoDiv" style="margin: auto; margin-top: 50px">
			<div class="item">
				<span class="label">交易流水号：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo"
						data-options="validType:'maxLength[35]'" name="sysRefNo"
						id="sysRefNo">
				</div>
			</div>
			<div class="item">
				<span class="label">账号类型：</span>
				<div class="fl item-ifo">
					<input class="easyui-combobox" id="acTp" name="acTp"
						data-options="width:'253px',height:'32px',valueField:'id',textField:'text',panelHeight: 'auto'"
						editable="false" />
				</div>
			</div>
			<div class="item">
				<span class="label">币种：</span>
				<div class="fl item-ifo">
					<input class="easyui-combobox" id="ccy" name="ccy" required="true"
						data-options="width:'253px',height:'32px',valueField: 'sysRefNo',textField: 'textField',panelHeight: 'auto'"
						editable="false" />
				</div>
			</div>
			<div class="item">
				<span class="label">账号：</span>
				<div class="fl item-ifo">
					<input type="text" name="acNo" class="easyui-validatebox combo" id="acNo"
						required="true"
						data-options="validType:['number','maxLength[40]']">
				</div>
			</div>
			<div class="item">
				<span class="label">开户银行：</span>
				<div class="fl item-ifo">
					<input type="text" name="acBkNm" id="acBkNm"
						class="easyui-validatebox combo"
						data-options="validType:'maxLength[50]'">
				</div>
			</div>
			<div class="item">
				<span class="label">开户网点：</span>
				<div class="fl item-ifo">
					<input type="text" name="acBkNo" id="acBkNo"
						class="easyui-validatebox combo"
						data-options="validType:'maxLength[40]'">
				</div>
			</div>
			<div class="item">
				<span class="label">关联保理商：</span>
				<div class="fl item-ifo">
					<input type="text" name="acOwnerName" id="acOwnerName"
						class="easyui-validatebox combo"> <input type="hidden"
						name="acOwnerid" id="acOwnerid"> <input type="hidden"
						name="acOwnerType" id="acOwnerType"> <input type="hidden"
						name="sysBusiUnit" id="sysBusiUnit">
				</div>
			</div>
		</div>
	</form>
</body>
</html>