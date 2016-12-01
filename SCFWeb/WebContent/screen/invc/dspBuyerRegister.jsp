<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>争议登记页面</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/invc/dspBuyerRegister.js"></script>
</head>
<body>
	<form id="invcMForm">
		<div id="cntrctDiv" class="easyui-panel" title="基本信息"
			data-options="collapsible:true" style="width: 100%">
			<table class="utTab">
				<tr>
					<td>争议流水号：</td>
					<td><input type="text" name="sysRefNo" id="sysRefNo"></td>
					<td>争议提出方：</td>
					<td><input type="text" class="easyui-validatebox combo"
						name="notifyBy" id="notifyBy" required="true"
						data-options="validType:'maxLength[40]'"></td>
				</tr>
				<tr>
					<td>争议登记日期：</td>
					<td><input type="text" name="trxDt" id="trxDt"></td>
					<td>供应商编号：</td>
					<td><input type="text" name="selId" id="selId"
							class="easyui-validatebox combo" required="true"
							data-options="validType:'maxLength[35]'"></input> <a
							class="easyui-linkbutton" icon="icon-search"
							onclick="selLookUpWindow()">供应商</a></td>
				</tr>
				<tr>
					<td>供应商名称：</td>
					<td><input type="text" name="selNm" id="selNm"></td>
					<td>发票总份数：</td>
					<td><input type="text" name="ttlDspInvNo" id="ttlDspInvNo"
						class="easyui-numberbox" value=0></td>
				</tr>
				<tr>
					<td>发票争议总金额：</td>
					<td><input type="text" id="ttlDspInvAmt" name="ttlDspInvAmt"
						class="easyui-numberbox"
						data-options="min:0,precision:2,groupSeparator:','" value=0></input></td>
				</tr>
				<tr>
					<td>
						<!-- 争议标识：首次申请时默认为1（争议） --> <input type="hidden" name="dspFlag"
						id="dspFlag" value="1">
					</td>
					<td><input type="hidden" name="cntrctNo" id="cntrctNo"></td>
					<td><input type="hidden" name="arAvavLoan" id="arAvavLoan"></td>
					<td><input type="hidden" name="arBal" id="arBal"></td>
					<td><input type="hidden" name="poolLine" id="poolLine"></td>
					<td><input type="hidden" name="arAvavLoanHD" id="arAvavLoanHD"></td>
					<td><input type="hidden" name="arBalHD" id="arBalHD"></td>
					<td><input type="hidden" name="poolLineHD" id="poolLineHD"></td>
				</tr>
				<tr>
					<td><input type="hidden" name="cntSysRefNo" id="cntSysRefNo"></td>
					<td><input type="hidden" name="buyerLmtAmt" id="buyerLmtAmt"></td>
					<td><input type="hidden" name="dueDt" id="dueDt" /></td>
					<td><input type="hidden" name="transChgrt" id="transChgrt"></input></td>
					<td><input type="hidden" name="billAmt" id="billAmt"></input></td>
					<td><input type="hidden" name="buyerId" id="buyerId"></input></td>
					<td><input type="hidden" name="buyerNm" id="buyerNm"></input></td>
					<td><input type="hidden" name="insureNo" id="insureNo"></input></td>
				</tr>
				<tr>
					<td><input type="hidden" name="cntSysRefNo" id="cntSysRefNo"></td>
					<td><input type="hidden" name="buyerLmtAmt" id="buyerLmtAmt"></td>
					<td><input type="hidden" name="dueDt" id="dueDt" /></td>
					<td><input type="hidden" name="transChgrt" id="transChgrt"></input></td>
					<td><input type="hidden" name="billAmt" id="billAmt"></input></td>
					<td><input type="hidden" name="insureNo" id="insureNo"></input></td>

					<!-- 费用表信息 -->
					<td><input type="hidden" name="sysData" id="sysData"
						value=${sysUserInfo.sysDate } /></td>
					<td><input type="hidden" name="selAcNo" id="selAcNo"></td>
					<td><input type="hidden" name="selAcNm" id="selAcNm"></td>
					<td><input type="hidden" name="selAcBkNm" id="selAcBkNm"></td>
					<td><input type="hidden" name="lmtBalHD" id="lmtBalHD"></td>
					<td><input type="hidden" name="acctPeriod" id="acctPeriod"></td>
					<td><input type="hidden" name="trxid" id="trxId"></td>
					<td><input type="hidden" name="loanPerc" id="loanPerc"></td>
					<td><input type="hidden" name="lmtBal" id="lmtBal"></td>
					<td><input type="hidden" name="cntrctlmtBal" id="cntrctlmtBal"></td>
					<td><input type="hidden" name="arBalHD" id="arBalHD"></td>
					<td><input type="hidden" name="arAvalLoanHD" id="arAvalLoanHD"></td>
					<td><input type="hidden" name="busiTp" id="busiTp"></td>
				</tr>
			</table>
		</div>
		<div id="invcMDiv" class="easyui-panel" title="应收账款列表"
			data-options="collapsible:true" style="width: 100%">
			<table id="invcMTable" cellspacing="0" cellpadding="0" width="100%"
				iconCls="icon-edit">
			</table>
			<div id="toolbar" style="overflow: hidden">
				<a href="javascript:void(0)" class="easyui-linkbutton"
					iconcls="icon-add" onclick="addInvcRow()" plain="true"
					style="float: right; margin-right: 14px;">添加</a> 
			    <a href="javascript:void(0)" class="easyui-linkbutton"
					iconcls="icon-edit" onclick="editInvcRow()" plain="true"
					style="float: right">修改</a> 
				<a href="javascript:void(0)" class="easyui-linkbutton" iconcls="icon-remove"
					onclick="deleteInvcRow()" plain="true" style="float: right">删除</a> 
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
