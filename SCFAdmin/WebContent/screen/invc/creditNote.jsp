<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>贷项清单页面</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/invc/creditNote.js"></script>
</head>
<body>
	<form id="creditNoteForm">
		<div class="easyui-panel" title="协议信息" data-options="collapsible:true"
			style="width: 98%">
			<div id="creditNoteDiv">
				<table class="utTab">
					<tr>
						<td>流水号：</td>
						<td><input type="text" name="sysRefNo" id="sysRefNo"
							></td>
						<td>协议编号：</td>
						<td><input type="text" name="cntrctNo" id="cntrctNo"
							></td>
					</tr>
					<tr>
						<td>业务类别：</td>
						<td><input id="busiTp" name="busiTp" class="easyui-combobox"
							data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
							editable="false" ></input></td>
						<td>交易日期：</td>
						<td><input type="text" name="trxDt" id="trxDt"
							class="easyui-datebox" required="required" ></input></td>
					</tr>
					<tr>
						<td>授信客户编号：</td>
						<td><input type="text" name="selId" id="selId"
							></input></td>
						<td>授信客户名称：</td>
						<td><input type="text" name="selNm" id="selNm"
							></input></td>
					</tr>
					<tr>
						<td>间接客户编号：</td>
						<!-- <td><input type="text" name="buyerId" id="buyerId"
							class="easyui-validatebox combo" required="true"
							readonly="readonly"></input></td> -->
						<td><input class="easyui-combobox" id="buyerId"
							name="buyerId" required="true"
							data-options="onSelect:queryBuyerNm,valueField: 'buyerId',textField: 'buyerId',panelHeight: 'auto'"
							editable="false" /></td>
						<td>间接客户名称：</td>
						<td><input type="text" name="buyerNm" id="buyerNm"
							></input></td>
					</tr>
					<tr>
						<td>贷项清单金额：</td>
						<td><input class="easyui-combobox" id=ccy name="ccy"
							data-options="valueField: 'sysRefNo',textField: 'sysRefNo',panelHeight: 'auto' "
							style="width: 60px" editable="false" required="true" /><input
							type="text" name="ttlCrnAmt" id="ttlCrnAmt"
							class="easyui-numberbox"
							data-options="mmin:0,precision:2,groupSeparator:','" ></input></td>
						<td>备注：</td>
						<td><input type="text" name="remark" id="remark" data-options="validType:'maxLength[200]'"></input></td>
					</tr>
					<tr>
						<td><input type="hidden" name="lmtBalHD" id="lmtBalHD"></td>
						<td><input type="hidden" name="lmtBal" id="lmtBal"></td>
					</tr>
				</table>
			</div>
		</div>
		<div class="easyui-panel" title="贷项清单信息" data-options="collapsible:true"
			style="width: 98%">
			<div id="invcMDiv">
				<table id="invcMTable" cellspacing="0" cellpadding="0" width="100%"
					iconCls="icon-edit">
				</table>
				<div id="toolbar" style="overflow:hidden;">
					<a href="javascript:void(0)" class="easyui-linkbutton"
						iconcls="icon-add" onclick="addRow()" plain="true" style="float:right;margin-right:14px;">添加</a> <a
						href="javascript:void(0)" class="easyui-linkbutton"
						iconcls="icon-edit" onclick="editRow()" plain="true" style="float:right;">修改</a> <a
						href="javascript:void(0)" class="easyui-linkbutton"
						iconcls="icon-remove" onclick="deleteRow()" plain="true" style="float:right;">删除</a>
				</div>
			</div>
		</div>
	</form>
</body>
</html>