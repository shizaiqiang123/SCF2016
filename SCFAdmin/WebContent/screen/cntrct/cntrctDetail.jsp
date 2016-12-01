<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>授信客户额度历程信息</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/cntrct/cntrctDetail.js"></script>
</head>
<body class="UTSCF">
	<div class="easyui-layout"
		style="width: 100%; height: 100%; min-height: 300px">

		<div data-options="region:'west',split:true" title="卖方关系树"
			style="width: 20%;">
			<div style="margin: 10px 0;"></div>
			<ul id="perInfoDiv" class="easyui-tree"></ul>
		</div>

		<div class="easyui-panel"
			data-options="collapsible:true,region:'center',title:'授信客户额度明细信息'">
			<form id="custForm">
				<table class="utTab">
					<tr>
						<td>协议流水号：</td>
						<td><input type="text" name="sysRefNo" id="sysRefNo"
							class="easyui-validatebox combo"
							data-options="validType:'maxLength[35]'"></td>
						<td>协议编号：</td>
						<td><input type="text" name="cntrctNo" id="cntrctNo"
							class="easyui-validatebox combo"
							data-options="validType:'maxLength[35]'"></td>
					</tr>
					<tr>
						<td>授信客户编号：</td>
						<td><input type="text" name="selId" id="selId"
							class="easyui-validatebox combo"
							data-options="validType:'maxLength[35]'"></td>
						<td>授信客户名称：</td>
						<td><input type="text" name="selNm" id="selNm"
							class="easyui-validatebox combo"
							data-options="validType:'maxLength[35]'"></td>
					</tr>
					<tr>
						<td>授信额度金额：</td>
						<td><input type="text" name="lmtAmt" id="lmtAmt"
							class="easyui-numberbox"
							data-options="mmin:0,precision:2,groupSeparator:','"></td>
						<td>授信额度余额：</td>
						<td><input type="text" name="lmtBal" id="lmtBal"
							class="easyui-numberbox"
							data-options="mmin:0,precision:2,groupSeparator:','"></td>
					</tr>
					<tr>
						<td>生效日：</td>
						<td><input type="text" name="lmtValidDt" id="lmtValidDt"
							class="easyui-datebox" editable="false"
							data-options="validType:'date'"></input></td>
						<td>到期日：</td>
						<td><input type="text" name="lmtDueDt" id="lmtDueDt"
							class="easyui-datebox" editable="false"
							data-options="validType:'date'"></input></td>
					</tr>
					<tr id="tr1">
						<td>领用金额：</td>
						<td><input type="text" name="lmtAllocate" id="lmtAllocate"
							class="easyui-numberbox"
							data-options="mmin:0,precision:2,groupSeparator:','"></td>
						<td>归还金额：</td>
						<td><input type="text" name="lmtRecover" id="lmtRecover"
							class="easyui-numberbox"
							data-options="mmin:0,precision:2,groupSeparator:','"></td>
					</tr>
					<tr id="tr2">
						<td>授信额度使用标点：</td>
						<td><input id="lmtFlg" name="lmtFlg" class="easyui-combobox"
							data-options="valueField:'id',textField:'text',panelHeight: 'auto'"></input></td>
						<td>授信额度交易日期：</td>
						<td><input type="text" name="lmtDt" id="lmtDt"
							class="easyui-datebox" data-options="validType:'date'"></input></td>
					</tr>
					<tr id="tr3">
						<td>授信额度币别：</td>
						<td><input class="easyui-combobox" id="lmtCcy" name="lmtCcy"
							data-options="valueField: 'sysRefNo',textField: 'sysRefNo',panelHeight: 'auto' " /></td>
						<td>theirRef：</td>
						<td><input type="text" name="theirRef" id="theirRef"
							class="easyui-validatebox combo"
							data-options="validType:'maxLength[35]'"></td>
					</tr>
				</table>
			</form>
		</div>
	</div>
</body>
</html>