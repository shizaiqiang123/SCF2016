<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>争议发票查询信息</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/invc/dspNoteDetail.js"></script>
</head>
<body class="UTSCF">
	<form id="loanForm">
		<div class="easyui-panel" title="争议发票明细"
			data-options="collapsible:true" style="width: 98%">
			<div id="cntrctDiv">
				<table class="utTab">
					<tr>
						<td>发票号码：</td>
						<td><input type="text" name="invNo" id="invNo"></td>
						<td>卖方名称：</td>
						<td><input type="text" name="selNm" id="selNm"></td>
					</tr>
					<tr>
						<td>买方名称：</td>
						<td><input type="text" name="buyerNm" id="buyerNm"></td>
						<td>发票总金额：</td>
						<td><input id="invAmt" name="invAmt" class="easyui-numberbox"
							data-options="groupSeparator:',', min:0,precision:2" value="0"></input></td>

					</tr>
					<tr>
						<td>发票日期：</td>
						<td><input name="invDt" id="invDt" class="easyui-datebox"
							editable="false"></td>
						<td>争议金额：</td>
						<td><input name="ttlDspInvAmt" id="ttlDspInvAmt"
							class="easyui-numberbox"
							data-options="groupSeparator:',', min:0,precision:2" value="0"></td>

					</tr>
					<tr>
						<td>争议原因：</td>
						<td><input name="dspRsn" id="dspRsn" class="easyui-combobox"
							data-options="valueField:'id',textField:'text',panelHeight: 'auto'"></td>
						<td>争议提出方：</td>
						<td><input type="text" name="notifyBy" id="notifyBy"></td>
					</tr>
				</table>
			</div>
		</div>
	</form>
</body>
</html>