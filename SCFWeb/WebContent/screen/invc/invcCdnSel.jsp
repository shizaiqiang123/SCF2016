<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>贷项清单申请页面</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/invc/invcCdnSel.js"></script>
<style type="text/css">
.textbox .textbox-prompt {
	font-size: 14px;
	color: black;
}
</style>
</head>
<body>
	<form id="cdnRegForm">
		<div class="easyui-panel" title="交易信息" data-options="collapsible:true"
			style="width: 98%">
			<div id="cbkRegDiv">
				<table class="utTab">
					<tr>
						<td>交易流水号：</td>
						<td><input type="text" name="sysRefNo" id="sysRefNo"></td>
						<td>协议编号：</td>
						<td><input type="text" name="cntrctNo" id="cntrctNo"></td>
					</tr>
					<tr>
						<td>供应商名称：</td>
						<td><input type="text" name="selNm" id="selNm"
							class="easyui-validatebox combo" required="true"
							data-options="validType:'maxLength[35]'"></input><!--  <a
							class="easyui-linkbutton" icon="icon-search"
							onclick="selLookUpWindow()">供应商</a></td> -->
						<td>币种：</td>
						<td><input class="easyui-combobox" id="ccy" name="ccy"
							required="true"
							data-options="valueField: 'sysRefNo',textField: 'sysRefNo',panelHeight: 'auto'"
							editable="false" /></td>

					</tr>
					<tr>
						<td>贷项清单总额：</td>
						<td><input type="text" name="cnAmt" id="cnAmt"
							class="easyui-numberbox"
							data-options="mmin:0,precision:2,groupSeparator:','" /></td>
						<td>贷项清单编号：</td>
						<td><input type="text" name="cnNo" id="cnNo"
							class="easyui-validatebox combo"
							data-options="validType:'maxLength[40]'"></td>
					</tr>
					<tr>
						<td>业务类别：</td>
						<td><input id="busiTp" name="busiTp" class="easyui-combobox"
							data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
							editable="false" /></td>
					</tr>

					<!-- 间接客户余额 -->
					<tr>
						<td><input type="hidden" name="cbkTp" id="cbkTp" value="CDN" /></td>
						<td><input type="hidden" name="cdnRefNo" id="cdnRefNo"></td>
						<td><input type="hidden" name="cbkRefNo" id="cbkRefNo"></td>
						<td><input type="hidden" name="linkInvRef" id="linkInvRef"></td>
						<td><input type="hidden" name="selId" id="selId" /></td>
						<td><input type="hidden" name="buyerId" id="buyerId" /></td>
						<td style="display: none"><input type="hidden" name="cbkDt"
							class="easyui-datebox" id="cbkDt" value="${sysUserInfo.sysDate}" /></td>
						<td><input type="hidden" name="sysEventTimes"
							id="sysEventTimes" value="1" /></td>
						<td><input type="hidden" name="insureNo" id="insureNo"></input></td>
						<td><input type="hidden" name="lmtBal" id="lmtBal" /></td>
						<td><input type="hidden" name="lmtAllocate" id="lmtAllocate" /></td>
						<td><input type="hidden" name="buyerNm" id="buyerNm" /></td>
						<td><input type="hidden" name="sbrNo" id="sbrNo"></td>
						<td><input type="hidden" name="buyerLmtBat" id="buyerLmtBat"></td>
						<td><input type="hidden" name="inv_No" id="inv_No"></td>
						<td><input type="hidden" name="invNo" id="invNo"></td>
						<td><input id="trxId" name="trxId" type="hidden"></td>
						<td><input id="sbrId" name="sbrId" type="hidden"></td>

					</tr>
				</table>
			</div>
		</div>
		<div id="invcCbkDiv" class="easyui-panel" title="应收账款列表"
			data-options="collapsible:true" style="width: 100%">
			<table id="invcCdnTable" cellspacing="0" cellpadding="0" width="100%"
				iconCls="icon-edit"></table>
			<div id="toolbar" style="overflow: hidden;">

				<a href="javascript:void(0)" class="easyui-linkbutton"
					iconcls="icon-edit" onclick="editRow()" plain="true"
					style="float: right; margin-right: 14px;">修改</a><a
					href="javascript:void(0)" class="easyui-linkbutton" id="invcInfo"
					name="invcInfo" id="querybutton" iconcls="icon-search"
					onclick="queryInvc()" plain="true"
					style="float: right; margin-right: 14px;">发票查询</a>

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