<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>交易首页</title>
<script type="text/javascript" src="script/Report/invcHomePage.js"></script>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
</head>
<body class="UTSCF">
	<form id="cntrcHomeForm">
		<div class="easyui-panel" title="基本信息" data-options="collapsible:true"
			style="width: 98%">
			<div id="cbkRegDiv">
				<table class="utTab">
					<tr>
						<td>卖方名称：</td>
						<td><input type="text" class="easyui-validatebox combo"
							name="selNm" id="selNm"></td>
						<td>买方名称：</td>
						<td><input type="text" class="easyui-validatebox combo"
							name="buyerNm" id="buyerNm"></td>
					</tr>
					<tr>
						<td>协议编号：</td>
						<td><input type="text" class="easyui-validatebox combo"
							name="cntrctNo" id="cntrctNo"></td>
						<td>业务种类：</td>
						<td><input class="easyui-combobox"
							data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
							editable="false" name="busiTp" id="busiTp"></td>

					</tr>
					<tr>
						<td>应收账款最小金额：</td>
						<td><input name="invMinAmt" id="invMinAmt"
							class="easyui-numberbox"
							data-options="min:0,precision:2,groupSeparator:','"></td>
						<td>应收账款最大金额：</td>
						<td><input name="invMaxAmt" id="invMaxAmt"
							class="easyui-numberbox"
							data-options="min:0,precision:2,groupSeparator:','"></td>
					</tr>
					<tr>
						<td>应收账款起始日期：</td>
						<td><input type="text" name="startDt" id="startDt"
							editable="false" class="easyui-datebox"
							data-options="validType:'date'"></td>
						<td>应收账款到期日期：</td>
						<td><input type="text" name="endDt" id="endDt"
							editable="false" class="easyui-datebox"
							data-options="validType:'date'"></td>
					</tr>
					<tr>
						<td>发票状态：</td>
						<td><input class="easyui-combobox"
							data-options="valueField:'id',textField:'text'" editable="false"
							name="invSts" id="invSts"></td>
					</tr>
					<tr>
						<td><input type="hidden" id="instNo" name="instNo" /> <input
							type="hidden" id="custNo" name="custNo" /> <input type="hidden"
							name="sysRefNo" id="sysRefNo" /></td>
					</tr>
				</table>
			</div>
		</div>
	</form>
</body>
</html>