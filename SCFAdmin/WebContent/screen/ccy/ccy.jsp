<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>币别信息页面</title>
<!-- <script type="text/javascript" src="js/scfjs/Formater.js"></script> -->
<script type="text/javascript" src="script/ccy/ccy.js"></script>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
</head>
<body>
	<form id="loanSubmit">
		<div id="loanDiv" style="width: 100%" class="easyui-panel"
			title="币别信息" data-options="collapsible:true">
			<div class="item">
				<span class="label">币别号：</span>
				<div class="fl item-ifo">
					<input type="text" name="sysRefNo" id="sysRefNo"
						class="easyui-validatebox combo" required="true"
						data-options="validType:['noChinese','maxLength[20]','minLength[3]'],missingMessage:'3-20位字符，请输入字母或数字。'" />
				</div>
			</div>
			<div class="item">
				<span class="label">币种名称：</span>
				<div class="fl item-ifo">
					<input type="text" name="ccyNm" id="ccyNm"
						class="easyui-validatebox combo" required="true" />
				</div>
			</div>
			<div class="item">
				<span class="label">保留小数位数：</span>
				<div class="fl item-ifo">
					<input id="decFormat" name="decFormat" class="easyui-validatebox combo" 
					data-options="validType:['number','maxLength[3]']"/>
				</div>
			</div>
			<div class="item">
				<span class="label">基础计息日：</span>
				<div class="fl item-ifo">
					<input id="baseDay" name="baseDay" class="easyui-validatebox combo" 
					data-options="validType:['number','maxLength[3]']"/>
				</div>
			</div>
			<div class="item">
				<span class="label">币种符号：</span>
				<div class="fl item-ifo">
					<input type="text" name="ccySymbol" id="ccySymbol"
						class="easyui-validatebox combo" required="true" />
				</div>
			</div>
		</div>	
	</form>
</body>
</html>

