<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>应付账款登记页面</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/invc/buyerInvcReg.js"></script>
</head>
<body>
	<form id="invcMForm">
		<div id="cntrctDiv" class="easyui-panel" title="基本信息"
			data-options="collapsible:true" style="width: 100%">
			<table class="utTab">
				<tr>
					<td>登记流水号：</td>
					<td><input type="text" name="sysRefNo" id="sysRefNo"></td>
					<td>核心企业编号：</td>
					<td><input type="text" name="buyerId" id="buyerId"></td>
				</tr>
				<tr>
					<td>核心企业名称：</td>
					<td><input type="text" name="buyerNm" id="buyerNm"></td>
					<td>币种：</td>
					<td><input type="text" class="easyui-combobox" id="ccy"
						name="ccy"
						data-options="valueField: 'id',textField: 'text',panelHeight: 'auto' "
						editable="false" /></td>
				</tr>
				<tr>
					<td>登记笔数：</td>
					<td><input type="text" name="regNo" id="regNo"
						class="easyui-numberbox" value=0></input></td>
					<td>登记金额：</td>
					<td><input type="text" name="regAmt" id="regAmt"
						class="easyui-numberbox"
						data-options="min:0,precision:2,groupSeparator:','" value=0></input></td>
				</tr>
				<tr>
					<td><input type="hidden" name="custInstCd" id="custInstCd" /></td>
					<td><input type="hidden" name="custNm" id="custNm" /></td>
				</tr>
				<tr>
					<td>
						<!-- 					为了在release页面显示 --> <input type="hidden" name="sysOpId"
						id="sysOpId" /> <input type="hidden" name="sysOpTm" id="sysOpTm" />
						<input type="hidden" name="sysRelId" id="sysRelId" /> <input
						type="hidden" name="sysRelTm" id="sysRelTm" /> 
					</td>
				</tr>
			</table>
		</div>
		<div id="invcMDiv" class="easyui-panel" title="应付账款列表"
			data-options="collapsible:true" style="width: 100%">
			<table id="invcMTable" cellspacing="0" cellpadding="0" width="100%"
				iconCls="icon-edit">
			</table>
			<div id="toolbar" style="overflow: hidden;">
				<a href="javascript:void(0)" class="easyui-linkbutton"
					iconcls="icon-add" onclick="addRow()" plain="true"
					style="float: right; margin-right: 14px;">添加</a> <a
					href="javascript:void(0)" class="easyui-linkbutton"
					iconcls="icon-edit" onclick="editRow()" plain="true"
					style="float: right">修改</a> <a href="javascript:void(0)"
					class="easyui-linkbutton" iconcls="icon-remove"
					onclick="deleteRow()" plain="true" style="float: right">删除</a> <a
					href="javascript:void(0)" class="easyui-linkbutton"
					iconcls="icon-batch-upload" onclick="upload()" plain="true"
					style="float: right">上传</a>
			</div>
		</div>
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