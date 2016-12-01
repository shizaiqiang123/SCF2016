<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>保证金变更</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/addMarginPrePay/addMarginPrePay.js"></script>
</head>
<body class="UTSCF">
	<form id="addMargin">
		<div id="addMarginDiv" style="width: 100%" class="easyui-panel"
			title="协议信息" data-options="collapsible:true">
			<table class="utTab">
				<tr>
					<td>协议编号：</td>
					<td><input type="text" name="cntrctNo" id="cntrctNo" class="easyui-validatebox combo" data-options="validType:'maxLength[35]'"></td>
					<td>协议流水号：</td>
					<td><input type="text" name="sysRefNo" id="sysRefNo" class="easyui-validatebox combo" data-options="validType:'maxLength[35]'"></td>
				</tr>
				<tr>
					<td>间接客户编号：</td>
					<td><input type="text" name="selId" id="selId"
						class="easyui-validatebox combo" required="true"
						 data-options="validType:'maxLength[35]'"></input></td>
					<td>间接客户名称：</td>
					<td><input type="text" name="selNm" id="selNm" class="easyui-validatebox combo" data-options="validType:'maxLength[35]'"></input></td>
				</tr>
				<tr>
					<td>授信客户编号：</td>
					<td><input type="text" name="selId" id="selId"
						class="easyui-validatebox combo" required="true"
						data-options="validType:'maxLength[35]'"></input></td>
					<td>授信客户名称：</td>
					<td><input type="text" name="selNm" id="selNm" class="easyui-validatebox combo" data-options="validType:'maxLength[35]'"></input></td>
				</tr>
				<tr>
					<td>业务类别：</td>
					<td><input id="busiTp" name="busiTp" class="easyui-combobox"
						data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
						editable="false" 
						></input></td>
					<td>交易日期：</td>
					<td><input type="text" name="trxDt" id="trxDt"
						class="easyui-datebox" editable="false" 
						></input></td>
				</tr>
				<tr>
					<td>授信额度币别：</td>
					<td><input type="text" id="lmtCcy" name="lmtCcy"/></td>
					<td>授信额度余额：</td>
					<td><input name="lmtBal" id="lmtBal"
						class="easyui-numberbox"
						data-options="groupSeparator:',', min:0,precision:2"
						></input></td>
				</tr>
				<tr>
					<td>监管机构代码：</td>
					<td><input type="text" name="patnerId" id="patnerId" class="easyui-validatebox combo" data-options="validType:'maxLength[35]'"></input></td>
					<td>监管机构名称：</td>
					<td><input type="text" name="patnerNm" id="patnerNm" class="easyui-validatebox combo" data-options="validType:'maxLength[70]'"></input></td>
				</tr>
				<tr>
					<td>仓库编号：</td>
					<td><input type="text" name="storageId" id="storageId" class="easyui-validatebox combo" data-options="validType:'maxLength[35]'"></input></td>
					<td>仓库名称：</td>
					<td><input type="text" name="storageNm" id="storageNm" class="easyui-validatebox combo" data-options="validType:'maxLength[70]'"></input></td>
				</tr>
				<tr>
					<td>仓库地址：</td>
					<td><input type="text" name="storageAdr" id="storageAdr" class="easyui-validatebox combo" data-options="validType:'maxLength[14]'"></input></td>
					<td>仓库联系人：</td>
					<td><input type="text" name="contactNm" id="contactNm" class="easyui-validatebox combo" data-options="validType:'maxLength[70]'"></input></td>
				</tr>
				<tr>
					<td>保证金变更形式：</td>
					<td><input id="marginForm" name="marginForm" class="easyui-combobox"
						data-options="onSelect:changeMarginForm,valueField:'id',textField:'text',panelHeight: 'auto'"
						editable="false" required="true"></input></td>
					<td>保证金类别：</td>
					<td><input id="marginTp" name="marginTp" class="easyui-combobox"
						data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
						editable="false"  required="true"
						></input></td>
				</tr>
				<tr>
					<tr>
					<td>保证金余额：</td>
					<td><input editable="false" value="0" name="marginBal"
						id="marginBal" class="easyui-numberbox" required="true"
						data-options="min:0,precision:2,groupSeparator:','"></input></td>
					<td>监管方额度余额：</td>
					<td><input editable="false" value="0" name="partyBal"
						id="partyBal" class="easyui-numberbox" required="true"
						data-options="min:0,precision:2,groupSeparator:','"></input></td>
				</tr>
				<tr>
					<td>本次补充金额：</td>
					<td><input name="marginCompen" id="marginCompen"
						class="easyui-numberbox" required="true"
						data-options="groupSeparator:',', min:0,precision:2"
						></input></td>
					<td>本次释放金额：</td>
					<td><input type="text" name="marginRele" id="marginRele"
						class="easyui-numberbox" required="true"
						data-options="groupSeparator:',', min:0,precision:2"
						></input></td>
				</tr>
				<tr>
					<td><input type="hidden" name="sysEventTimes" id="sysEventTimes"></input></td>
					<td><input type="hidden" name="validDt" id="validDt"></input></td>
					<td><input type="hidden" name="marginBalHD" id="marginBalHD"></input></td>
				</tr>
			</table>
		</div>
		<div id="loanDiv" style="width: 100%; height: 400px"
			class="easyui-panel" title="放款明细" data-options="collapsible:true">
			<table class="easyui-datagrid" id="loanTable" cellspacing="0"
				cellpadding="0" style="width: 100%; height: auto"
				iconCls="icon-edit">
			</table>
			<div id="toolbar" style="overflow:hidden;">
				<a href="javascript:void(0)" class="easyui-linkbutton"
					id="querybutton" iconcls="icon-search" onclick="loadLoan()"
					plain="true" style="float:right;margin-right:14px;">融资查询</a> 
					<a href="javascript:void(0)"
					class="easyui-linkbutton"
					data-options="iconCls:'icon-save',plain:true" onclick="accept()" style="float:right;">接受改变</a> 
					<a href="javascript:void(0)" class="easyui-linkbutton"
					data-options="iconCls:'icon-undo',plain:true" onclick="reject()" style="float:right;">撤销改变</a> 
			</div>
		</div>
	</form>
</body>
</html>