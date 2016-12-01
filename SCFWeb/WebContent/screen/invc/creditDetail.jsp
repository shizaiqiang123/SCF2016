<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>贷项清单详细页面</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/invc/creditDetail.js"></script>
</head>
<body>
	<form id="creditDetailForm">
		<div class="easyui-panel" title="贷项清单信息"
			data-options="collapsible:true" style="width: 98%">
			<table class="utTab" align="center" height="50%">
				<tr>
					<td>交易流水号：</td>
					<td><input type="text" name="sysRefNo" id="sysRefNo"></td>
					<td>编号：</td>
					<td><input type="text"  class="easyui-validatebox combo" name="invNo" id="invNo" required="true" data-options="validType:'maxLength[35]'"></td>
				</tr>
				<tr>
					<td>关联应收账款编号：</td>
					<td><input type="text" name="linkInvNo" id="linkInvNo"
						class="easyui-validatebox combo" ></td>
					<td>关联应收账款流水号：</td>
					<td><input type="text" name="linkInvRef" id="linkInvRef"
						class="easyui-validatebox combo" ></td>
				</tr>
				<tr>
					<td>币别：</td>
					<td><input class="easyui-combobox" id="invCcy" name="invCcy"
						data-options="valueField: 'sysRefNo',textField: 'sysRefNo',panelHeight: 'auto'"
						editable="false" ></td>
					<td>应收账款金额：</td>
					<td><input type="text" name="invAmtHD" id="invAmtHD"
						data-options="min:0,precision:2,groupSeparator:','"
						class="easyui-numberbox"></td>
				</tr>
				<tr>
					<td>应收账款余额：</td>
					<td><input type="text" name="invBalHD" id="invBalHD"
						data-options="min:0,precision:2,groupSeparator:','"
						class="easyui-numberbox"></td>
					<td>融资余额：</td>
					<td><input type="text" name="invLoanBal" id="invLoanBal"
						data-options="min:0,precision:2,groupSeparator:','"
						class="easyui-numberbox"></td>
				</tr>
				<tr>
					<td>贷项清单金额：</td>
					<td><input type="text" name="invAmt" id="invAmt"
						data-options="onChange:changeinvAmt,min:0,precision:2,groupSeparator:',',validType:'maxLength[18]'"
						class="easyui-numberbox" required="true"></td>
					<td>贷项清单余额：</td>
					<td><input type="text" name="invBal" id="invBal"
						data-options="min:0,precision:2,groupSeparator:','"
						class="easyui-numberbox" readonly="readonly"></td>
				</tr>
				<tr>
					<td><input type="hidden" name="invSts" id="invSts"></td>
					<td><input type="hidden" name="cntrctNo" id="cntrctNo"></td>
					<td><input type="hidden" name="buyerId" id="buyerId"></td>
					<td><input type="hidden" name="selId" id="selId"></td>
					<td><input type="hidden" name="batchNo" id="batchNo"></td>
					<td><input type="hidden" name="crnAmt" id="crnAmt"></td>
					<td><input type="hidden" name="crnAmtHD" id="crnAmtHD"></td>
				</tr>
			</table>
		</div>
		<div id="invcMDiv">
			<table id="invcMTable" cellspacing="0" cellpadding="0" width="100%"
				iconCls="icon-edit">
			</table>
		</div>
	</form>
</body>
</html>