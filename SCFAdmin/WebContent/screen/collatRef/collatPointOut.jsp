<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>质物置换</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/collatRef/collatPointOut.js"></script>
</head>
<body>
	<form id="collatOutForm">
		<div id="collatOutDiv" style="width: 98%" class="easyui-panel"
			title="协议信息" data-options="collapsible:true">
			<table class="utTab">
				<tr>
					<td>质物置换流水号：</td>
					<td><input type="text" name="sysRefNo" id="sysRefNo"
						class="easyui-validatebox combo"
						data-options="validType:'maxLength[35]'" /></td>
					<td>协议编号：</td>
					<td><input type="text" name="cntrctNo" id="cntrctNo" /></td>
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
					<td>授信客户编号：</td>
					<td><input type="text" name="selId" id="selId"
						class="easyui-validatebox combo"
						data-options="validType:'maxLength[35]'"></input>
					<td>授信客户名称：</td>
					<td><input type="text" name="selNm" id="selNm"
						class="easyui-validatebox combo"
						data-options="validType:'maxLength[35]'"></input></td>
				</tr>
				<tr>
					<td>授信额度余额：</td>
					<td><input type="text" value="0" name="lmtBal" id="lmtBal"
						class="easyui-numberspinner" data-options="min:0,precision:2"></input></td>
					<td>币种：</td>
					<td><input class="easyui-combobox" id=ccy name="ccy"
						data-options="valueField: 'sysRefNo',textField: 'sysRefNo',panelHeight: 'auto'"
						editable="false" /></td>
				</tr>
				<tr>
					<td>监管机构代码：</td>
					<td><input name="regId" id="regId"
						class="easyui-validatebox combo" required="true"
						data-options="validType:'maxLength[35]'"></input><a
						class="easyui-linkbutton" icon="icon-search"
						onclick="showCntrctPatWindow()">查询</a></td>
					<td>监管机构名称：</td>
					<td><input type="text" name="regNm" id="regNm"
						class="easyui-validatebox combo"
						data-options="validType:'maxLength[70]'"></input></td>
				</tr>
				<tr id="Tr1">
					<td>仓库编号：</td>
					<td><input name="wareId" id="wareId"
						class="easyui-validatebox combo"
						data-options="validType:'maxLength[35]'"></input><a
						class="easyui-linkbutton" icon="icon-search"
						onclick="showPatner()">查询</a></td>
					<td>仓库名称：</td>
					<td><input type="text" name="wareNm" id="wareNm"
						class="easyui-validatebox combo"
						data-options="validType:'maxLength[70]'"></input></td>
				</tr>
				<tr id="Tr2">
					<td>仓库地址：</td>
					<td><input type="text" name="wareAdd" id="wareAdd"
						class="easyui-validatebox combo"
						data-options="validType:'maxLength[14]'"></input>
					<td>仓库联系人：</td>
					<td><input type="text" name="wareContact" id="wareContact"
						class="easyui-validatebox combo"
						data-options="validType:'maxLength[70]'"></input></td>
				</tr>
				<tr>
					<td>库存价值总额：</td>
					<td><input type="text" name="ttlRegAmt" id="ttlRegAmt"
						class="easyui-numberspinner"
						data-options="min:0,precision:2,groupSeparator:','"></input>
					<td>最低库存价值：</td>
					<td><input type="text" name="ttlLowPayNum" id="ttlLowPayNum"
						class="easyui-numberspinner"
						data-options="min:0,precision:2,groupSeparator:','"></input>
				</tr>
				<tr>
					<td>换入质物总价值：</td>
					<td><input editable="false" name="ttlInVal" id="ttlInVal"
						class="easyui-numberbox"
						data-options="min:0,precision:2,groupSeparator:','"></input></td>
					<td>换出质物总价值：</td>
					<td><input editable="false" name="ttlOutVal" id="ttlOutVal"
						class="easyui-numberbox"
						data-options="min:0,precision:2,groupSeparator:','"></input></td>
				</tr>
			</table>
		</div>
		<div style="width: 100%" class="easyui-panel" title="换出质物信息"
			data-options="collapsible:true">
			<table class="easyui-datagrid" id="collatOutTable" cellspacing="0"
				cellpadding="0" style="width: 100%; height: auto"
				iconCls="icon-edit">
			</table>
			<div id="toolbarOut" style="overflow: hidden">
				<a href="javascript:void(0)" class="easyui-linkbutton"
					data-options="iconCls:'icon-save',plain:true" onclick="accept()"
					style="float: right; margin-right: 14px;">接受改变</a> <a
					href="javascript:void(0)" class="easyui-linkbutton" id="huowu"
					name="huowu" iconcls="icon-search" onclick="loadTableRe()"
					plain="true" style="float: right; margin-right: 14px;">质物查询</a>
			</div>
		</div>
		<div class="easyui-panel" title="换入质物信息"
			data-options="collapsible:true" style="width: 100%">
			<table id="collatInTable" cellspacing="0" cellpadding="0"
				width="100%" iconCls="icon-edit">
			</table>
			<div id="toolbarIn" style="overflow: hidden">
				<a href="javascript:void(0)" class="easyui-linkbutton"
					iconcls="icon-add" onclick="addRow()" plain="true"
					style="float: right; margin-right: 14px;">添加</a> <a
					href="javascript:void(0)" class="easyui-linkbutton"
					iconcls="icon-edit" onclick="editRow()" plain="true"
					style="float: right">修改</a> <a href="javascript:void(0)"
					class="easyui-linkbutton" iconcls="icon-remove"
					onclick="deleteRow()" plain="true" style="float: right">删除</a>
			</div>
		</div>
		<input type="hidden" id="ttlRegAmtHidden" name="ttlRegAmtHidden" />
		<div id="reasonDiv" style="width: 100%" class="easyui-panel form"
			title="处理意见" data-options="collapsible:true">
			<div id="messageListDiv" style="display: block;">
				<div class="item" id="OldMessageDiv" style="display: block;">
					<span id="OldMessageSpan" style="display: block;" class="label">意见说明：</span>
					<div class="fl item-ifo">
						<input class="easyui-textbox" editable="false"
							data-options="multiline:true,validType:'maxLength[1000]'"
							style="width: 500PX; height: 100px" name="OldSysRelReason"
							id="OldSysRelReason" />
					</div>
				</div>
				<div class="item" id="messageDivFa">
					<span id="messageSpanY" style="display: none;" class="label">意见说明：</span>
					<span id="messageSpanN" style="display: block;" class="label"></span>
					<div id="messageDiv" style="display: block;" class="fl item-ifo">
						<input class="easyui-textbox"
							data-options="multiline:true,validType:'maxLength[1000]'"
							style="width: 500px; height: 100px" name="sysRelReason"
							id="sysRelReason" />
					</div>
				</div>
			</div>
		</div>
	</form>
</body>
</html>