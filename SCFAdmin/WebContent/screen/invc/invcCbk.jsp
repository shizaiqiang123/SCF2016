<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>应收账款反转让页面</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/invc/invcCbk.js"></script>
</head>
<body>
	<form id="cbkRegForm">
		<div class="easyui-panel" title="授信额度信息"
			data-options="collapsible:true" style="width: 100%">
			<div id="cbkRegDiv">
				<table class="utTab">
					<tr>
						<td>流水号：</td>
						<td><input type="text" name="sysRefNo" id="sysRefNo"></td>
						<td>授信额度编号：</td>
						<td><input type="text" name="cntrctNo" id="cntrctNo"
							readonly="readonly"></td>
					</tr>
					<tr>
						<td>授信客户名称：</td>
						<td><input type="text" name="selNm" id="selNm"></input></td>
						<td>业务类别：</td>
						<td><input id="busiTp" name="busiTp" class="easyui-combobox"
							data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
							editable="false"></input></td>
						<!-- <td>间接客户名称：</td>
						<td><input type="text" name="buyerNm" id="buyerNm"  class="easyui-validatebox" id="buyerId" 
							></input><a class="easyui-linkbutton" icon="icon-search" onclick="showLookUpWindow()">查询</a></td> -->
					</tr>
					<tr>
						<td>币种：</td>
						<td><input class="easyui-combobox" id="ccy" name="ccy"
							required="true"
							data-options="valueField: 'sysRefNo',textField: 'sysRefNo',panelHeight: 'auto'"
							editable="false" /></td>
						<td>反转让金额：</td>
						<td><input type="text" name="ttlRevTrfAmt" value=0
							id="ttlRevTrfAmt" class="easyui-numberbox"
							data-options="mmin:0,precision:2,groupSeparator:','"></input></td>
					</tr>
					<tr>
						<td>待反转让笔数：</td>
						<td><input type="text" name="regNo" id="regNo"
							class="easyui-numberbox" value=0></input></td>
					</tr>
					<tr>
						<td id="bx1">保险公司名称：</td>
						<td id="bx2"><input type="text"
							class="easyui-validatebox combo" name="collatCompNm"
							id="collatCompNm"></td>
					</tr>
					<tr>
						<td><input type="hidden" name="cbkTp" id="cbkTp" value="CBK"></td>
						<!-- <td><input type="hidden" name="cntrctNo" id="cntrctNo" ></td> -->
						<td><input type="hidden" name="cbkRefNo" id="cbkRefNo"></td>
						<td><input type="hidden" name="cnAmt" id="cnAmt" value="0"></td>
						<td><input type="hidden" name="selId" id="selId"></td>
						<td><input type="hidden" name="buyerId" id="buyerId"></td>
						<td><input type="hidden" name="buyerNm" id="buyerNm"></td>
						<td style="display: none"><input type="hidden" name="cbkDt"
							class="easyui-datebox" id="cbkDt" value="${sysUserInfo.sysDate}" /></td>
						<td><input type="hidden" name="sysEventTimes"
							id="sysEventTimes" value="1" /></td>
						<td><input type="hidden" name="insureNo" id="insureNo"></input></td>
						<!-- 间接客户余额 -->
						<td><input id="trxId" name="trxId" type="hidden"></td>
						<td><input id="sbrId" name="sbrId" type="hidden"></td>
						<td><input type="hidden" name="lmtBal" id="lmtBal"></td>
						<td><input type="hidden" name="lmtAllocate" id="lmtAllocate"></td>
						<td><input type="hidden" name="trfFlg" id="trfFlg"></td>
						<td><input type="hidden" name="arAvalLoan" id="arAvalLoan"></td>
						<td><input type="hidden" name="arBal" id="arBal"></td>
						<!-- 买方额度表流水号 -->
						<td><input type="hidden" name="buyerLmtSysRefNo" id="buyerLmtSysRefNo"></td>
						<!-- 卖方额度表流水号 -->
						<td><input type="hidden" name="sellerLmtSysRefNo" id="sellerLmtSysRefNo"></td>
					
					</tr>
				</table>
			</div>
		</div>
		<div class="easyui-panel" title="应收账款列表"
			data-options="collapsible:true" style="width: 100%">
			<div id="invcCbkDiv">
				<table id="invcCbkTable" cellspacing="0" cellpadding="0"
					width="100%" iconCls="icon-edit">
				</table>
				<div id="toolbar" style="overflow: hidden">
					<a href="javascript:void(0)" class="easyui-linkbutton" id="huowu"
						name="huowu" id="querybutton" iconcls="icon-search"
						onclick="queryInvcrRe()" plain="true"
						style="float: right; margin-right: 14px;">应收账款查询</a>
				</div>
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