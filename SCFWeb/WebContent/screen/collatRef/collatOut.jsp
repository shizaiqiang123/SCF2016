<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>质物置换</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/collatRef/collatOut.js"></script>
</head>
<body>
	<form id="collatOutForm">
		<div id="collatOutDiv" style="width: 98%" class="easyui-panel"
			title="协议信息" data-options="collapsible:true">
			<table class="utTab">
				<tr>
					<td>交易流水号：</td>
					<td><input type="text" name="sysRefNo" id="sysRefNo" class="easyui-validatebox combo" data-options="validType:'maxLength[35]'"/></td>
				<!-- 	<td>协议编号：</td>
					<td><input type="text" name="cntrctNo" id="cntrctNo" /></td> -->
				</tr>
				<tr>
					<td>交易日期：</td>
					<td><input type="text" name="trxDt" id="trxDt"
						class="easyui-datebox" data-options="validType:'date'"/></td>
					<td>协议生效日：</td>
					<td><input type="text" name="validDt" id="validDt"
						class="easyui-datebox" data-options="validType:'date'"/></td>
				</tr>
				<tr>
					<td>收信人编号：</td>
					<td><input type="text" name="selId" id="selId" class="easyui-validatebox combo" data-options="validType:'maxLength[35]'"></input>
					<td>收信人名称：</td>
					<td><input type="text" name="selNm" id="selNm" class="easyui-validatebox combo" data-options="validType:'maxLength[35]'"></input></td>
				</tr>
				<tr>
					<td>授信额度币种：</td>
					<td><input class="easyui-combobox" id=lmtCcy name="lmtCcy"
						data-options="valueField: 'sysRefNo',textField: 'sysRefNo',panelHeight: 'auto'"
						style="" false" /></td>
					<td>授信额度余额：</td>
					<td><input type="text" value="0" name="lmtBal" id="lmtBal"
						class="easyui-numberspinner" data-options="min:0,precision:2"></input></td>
				</tr>
				<tr>
					<td>业务类别：</td>
					<td><input id="busiTp" name="busiTp" class="easyui-combobox"
						data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
						editable="false"></input></td>
					<td>质押率：</td>
					<td><input name="fundRt" id="fundRt"
						class="easyui-numberspinner"
						data-options="min:0,max:100,suffix:'%',precision:2"></input>
				</tr>
				<tr>
					<td>委托仓储监管机构代码：</td>
					<td><input type="text" name="patnerId" id="patnerId" class="easyui-validatebox combo" data-options="validType:'maxLength[35]'"></input></td>
					<td>委托仓储监管机构名称：</td>
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
					<td><input type="text" name="storageAdr" id="storageAdr" class="easyui-validatebox combo" data-options="validType:'maxLength[14]'"></input>
					<td>仓库联系人：</td>
					<td><input type="text" name="contactNm" id="contactNm" class="easyui-validatebox combo" data-options="validType:'maxLength[70]'"></input></td>
				</tr>
				<tr>
					<td>库存价值：</td>
					<td><input type="text" name="ttlRegAmt" id="ttlRegAmt"
						class="easyui-numberspinner" data-options="min:0,precision:2"></input>
					<td>最低库存价值：</td>
					<td><input type="text" name="regLowestVal" id="regLowestVal"
						class="easyui-numberspinner" data-options="min:0,precision:2"></input>
				</tr>
				<tr>
					<td>保证金余额：</td>
					<td><input editable="false" name="marginBal" id="marginBal"
						class="easyui-numberbox" required="true"
						data-options="min:0,precision:2,groupSeparator:','"></input></td>
					<td>已放款敞口：</td>
					<td><input editable="false" name="openLoanAmt"
						id="openLoanAmt" class="easyui-numberbox" required="true"
						data-options="min:0,precision:2,groupSeparator:','"></input></td>
				</tr>
				<tr>
					<td>换出货物总价值：</td>
					<td><input editable="false" name="ttlOutVal" id="ttlOutVal"
						class="easyui-numberbox"
						data-options="min:0,precision:2,groupSeparator:','"></input></td>
				</tr>
				<tr>
					<td><input type="hidden" name="cntrctNo" id="cntrctNo" /></td>
				</tr>
			</table>
		</div>
		<div id="collatDiv" style="width: 98%; height: 400px"
			class="easyui-panel" title="出库质物 信息" data-options="collapsible:true">
			<table class="easyui-datagrid" id="collatOutTable" cellspacing="0"
				cellpadding="0" style="width: 100%; height: auto"
				iconCls="icon-edit">
			</table>
			<div id="toolbar" style="overflow:hidden;">
				<a href="javascript:void(0)" class="easyui-linkbutton"
					id="querybutton" iconcls="icon-search" onclick="loadTable()"
					plain="true" style="float:right;margin-right:14px;">押品查询</a> <a href="javascript:void(0)"
					class="easyui-linkbutton"
					data-options="iconCls:'icon-save',plain:true" onclick="accept()" style="float:right;">接受改变</a>
				<a href="javascript:void(0)" class="easyui-linkbutton"
					data-options="iconCls:'icon-undo',plain:true" onclick="reject()" style="float:right;">撤销改变</a>
			</div>
		</div>
	</form>
</body>
</html>