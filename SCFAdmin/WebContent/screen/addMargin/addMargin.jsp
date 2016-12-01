<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>保证金变更</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/addMargin/addMargin.js"></script>
</head>
<body class="UTSCF">
	<form id="addMargin">
		<div id="addMarginDiv" style="width: 100%" class="easyui-panel"
			title="协议信息" data-options="collapsible:true">
			<table class="utTab">
				<tr>
					<td>协议编号：</td>
					<td><input type="text" name="cntrctNo" id="cntrctNo"
						class="easyui-validatebox combo"
						data-options="validType:'maxLength[35]'"></td>
					<td>交易日期：</td>
					<td><input type="text" name="trxDt" id="trxDt"
						class="easyui-datebox" editable="false"></input></td>
				</tr>
				<tr>
					<td>业务类别：</td>
					<td><input id="busiTp" name="busiTp" class="easyui-combobox"
						data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
						editable="false"></input></td>
					<td>授信客户ID：</td>
					<td><input type="text" name="selId" id="selId"
						class="easyui-validatebox combo" required="true"
						data-options="validType:'maxLength[35]'"></input></td>
				</tr>
				<tr>
					<td>授信客户名称：</td>
					<td><input type="text" name="selNm" id="selNm"
						class="easyui-validatebox combo"
						data-options="validType:'maxLength[35]'"></input></td>
					<td>授信额度币别：</td>
					<td><input class="easyui-combobox" id="ccy" name="ccy"
						editable="false"
						data-options="valueField: 'sysRefNo',textField: 'sysRefNo',panelHeight: 'auto'" />
					</td>
				</tr>
				<tr>
					<td>授信额度余额：</td>
					<td><input name="lmtBal" id="lmtBal" class="easyui-numberbox"
						data-options="groupSeparator:',', min:0,precision:2"></input></td>
					<td>质押率：</td>
					<td><input name="pldPerc" id="pldPerc"
						class="easyui-numberspinner"
						data-options="groupSeparator:',', min:0,max:100,precision:2,suffix:'%'"></input>
				</tr>
				<tr>
					<td>融资编号：</td>
					<td><input name="loanId" id="loanId"
						class="easyui-validatebox combo" required="true" />
					<!--  <a
						class="easyui-linkbutton" style="width: 80px; height: 22px"
						id="poButton" onclick="onSearchPoClick();"><label
							class="words">查询</label></a> --> </input><a id="poButton"
						class="easyui-linkbutton" icon="icon-search"
						onclick="onSearchPoClick()">查询</a></td>
					<td>融资金额：</td>
					<td><input type="text" name="ttlLoanAmt" id="ttlLoanAmt"
						class="easyui-numberspinner"
						data-options="groupSeparator:',', min:0,precision:2" />
				</tr>
				<tr>
					<td>融资开始日期：</td>
					<td><input type="text" name="loanValDt" id="loanValDt"
						class="easyui-datebox" required="required"
						data-options="validType:'date'" /></td>
					<td>融资到期日：</td>
					<td><input type="text" name="loanDueDt" id="loanDueDt"
						class="easyui-datebox" required="required"
						data-options="validType:'date'" /></td>
				</tr>
				<tr>
					<td>库存价值总额：</td>
					<td><input type="text" name="ttlRegAmt" id="ttlRegAmt"
						class="easyui-numberbox"
						data-options="groupSeparator:',', min:0,precision:2"></input></td>
					<td>最低库存价值：</td>
					<td><input type="text" name="regLowestVal" id="regLowestVal"
						class="easyui-numberbox"
						data-options="groupSeparator:',', min:0,precision:2"></input></td>
				</tr>
				<tr>
					<td>初始保证金比例：</td>
					<td><input type="text" name="initMarginPct" id="initMarginPct"
						class="easyui-numberspinner"
						data-options="groupSeparator:',', min:0,precision:2,suffix:'%'" />
					<td>保证金余额：</td>
					<td><input editable="false" value="0" name="marginBal"
						id="marginBal" class="easyui-numberbox" required="true"
						data-options="min:0,precision:2,groupSeparator:','"></input></td>
				</tr>
				<tr>
					<td>追加保证金账号：</td>
					<td><input type="text" name="payBailAcno" id="payBailAcno"
						class="easyui-validatebox combo"
						data-options="validType:'maxLength[35]'" />
					<td>本次追加保证金金额：</td>
					<td><input type="text" name="marginCompen" id="marginCompen"
						class="easyui-numberspinner" required="true" value=0
						data-options="groupSeparator:',', min:0,precision:2" />
				</tr>
				<tr>
					<td><input type="hidden" name="sysRefNo" id="sysRefNo"></input></td>
					<td><input id="trxId" name="trxId" type="hidden"></td>
					<td><input id="sbrId" name="sbrId" type="hidden"></td>
					<td><input id="marginBalOrg" name="marginBalOrg" type="hidden"></td>
					<td><input id="regLowestValOld" name="regLowestValOld" type="hidden"></td>
					<!-- 买方额度表流水号 -->
					<td><input type="hidden" name="buyerLmtSysRefNo" id="buyerLmtSysRefNo"></td>
					<!-- 卖方额度表流水号 -->
					<td><input type="hidden" name="sellerLmtSysRefNo" id="sellerLmtSysRefNo"></td>
					
				</tr>
			</table>
		</div>
		<div id="bailBillDiv" style="width: 100%; height: auto"
			class="easyui-panel" title="票据信息" data-options="collapsible:true">
			<table class="easyui-datagrid" id="bailBillDg" cellspacing="0"
				cellpadding="0" style="width: 100%; height: auto"
				iconCls="icon-edit">
			</table>
			<div id="toolbar" style="overflow: hidden">
				<a href="javascript:void(0)" class="easyui-linkbutton"
					data-options="iconCls:'icon-save',plain:true" onclick="accept()"
					style="float: right; margin-right: 14px;">接受改变</a> <a
					href="javascript:void(0)" id="FPquery" class="easyui-linkbutton"
					iconcls="icon-search" onclick="editRow()" plain="true"
					style="display: none;">查询</a>
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