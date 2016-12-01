<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>放货出库页面</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/dispatchNote/poThrOut.js"></script>
</head>
<body class="UTSCF">
	<form id="dispatchForm">
		<div id="dispatchDiv" style="width: 100%" class="easyui-panel"
			title="放货信息" data-options="collapsible:true">
			<table class="utTab">
				<tr>
					<td>交易流水号：</td>
					<td><input type="text" name="sysRefNo" id="sysRefNo"></td>
					<td>协议编号：</td>
					<td><input type="text" name="cntrctNo" id="cntrctNo"></td>
				</tr>
				<tr>
					<td>业务类别：</td>
					<td><input id="busiTp" name="busiTp" class="easyui-combobox"
						data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
						editable="false"></input></td>
					<td>币种：</td>
					<td><input id="ccy" name="ccy" class="easyui-combobox"
						data-options="valueField:'sysRefNo',textField:'sysRefNo',panelHeight: 'auto'"
						editable="false"></input></td>
				</tr>

				<tr>
					<td>商户编号：</td>
					<td><input type="text" name="selId" id="selId"
						class="easyui-validatebox combo" required="true"></input>
					<td>商户名称：</td>
					<td><input type="text" name="selNm" id="selNm"></input></td>
				</tr>
				<tr id="Tr4">
					<td>初始保证金账号：</td>
					<td><input type="text" name="initBailAcc" id="initBailAcc"
						class="easyui-validatebox combo"></input>
					<td>协议下保证金余额：</td>
					<td><input type="text" name="initBailBal" id="initBailBal"
						class="easyui-numberspinner"
						data-options="groupSeparator:',', min:0,precision:2"></input>
				</tr>
				<tr>
					<td>供货商编号：</td>
					<td><input type="text" class="easyui-validatebox combo"
						name="buyerId" id="buyerId" required="true"></input><a
						class="easyui-linkbutton" icon="icon-search"
						onclick="showLookUpWindow()">查询</a></td>
					<td>供货商名称：</td>
					<td><input class="combo" name="buyerNm" id="buyerNm"
						required="required" /></td>
				</tr>
				<tr>
					<td>订单编号：</td>
					<td><input type="text" class="easyui-validatebox combo"
						name="poNo" id="poNo" required="true"
						data-options="validType:'maxLength[35]'" /><a
						class="easyui-linkbutton" icon="icon-search" id="poButton"
						onclick="onSearchLoanClick()">查询</a></td>
					<td>订单金额：</td>
					<td><input class="easyui-numberbox" name="poAmt" id="poAmt"
						required="required"
						data-options="min:0,precision:2,groupSeparator:','" value=0 /></td>
				</tr>
				<tr>
					<td>融资编号：</td>
					<td><input type="text" class="easyui-validatebox combo"
						name="loanId" id="loanId"></input></td>
					<td>融资金额：</td>
					<td><input class="easyui-numberbox" name="ttlLoanAmt"
						id="ttlLoanAmt" required="required"
						data-options="min:0,precision:2,groupSeparator:','" value=0 /></td>
				</tr>
				<tr>
					<td>本次可发货价值：</td>
					<td><input type="text" name="ttlOutAmt" id="ttlOutAmt"
						class="easyui-numberspinner"
						data-options="groupSeparator:',', min:0,precision:2" value=0></input></td>
					<td>融资余额：</td>
					<td><input class="easyui-numberbox" name="ttlLoanBal"
						id="ttlLoanBal" required="required"
						data-options="min:0,precision:2,groupSeparator:','" value=0 /></td>
				</tr>
				<tr>
					<td>本次实发货价值：</td>
					<td><input type="text" name="ttlOutSureAmt" id="ttlOutSureAmt"
						class="easyui-numberspinner"
						data-options="groupSeparator:',', min:0,precision:2" value=0></input></td>
				</tr>
				<tr id="Tr5">
					<td>监管机构编号：</td>
					<td><input type="text" class="easyui-validatebox combo"
						name=regId id="regId"></input></td>
					<td>监管机构名称：</td>
					<td><input type="text" class="easyui-validatebox combo"
						name="regNm" id="regNm"></input></td>
				</tr>
				<tr id="Tr6">
					<td>最低价值：</td>
					<td><input type="text" name="ttlLowPayNum" id="ttlLowPayNum"
						class="easyui-numberspinner"
						data-options="groupSeparator:',', min:0,precision:2"></input></td>
					<td>可放货价值：</td>
					<td><input type="text" name="ttlYPayAmt" id="ttlYPayAmt"
						class="easyui-numberspinner"
						data-options="groupSeparator:',', min:0,precision:2"></input></td>
				</tr>
				<tr id="Tr7">
					<td>本次提货总价值：</td>
					<td><input type="text" name="ttlPayAmt" id="ttlPayAmt"
						class="easyui-numberspinner"
						data-options="groupSeparator:',', min:0,precision:2"></input></td>
					<td>协议下融资余额：</td>
					<td><input type="text" name="loanBal" id="loanBal"
						class="easyui-numberspinner"
						data-options="groupSeparator:',', min:0,precision:2"></input></td>
				</tr>
				<tr>
					<td><input type="hidden" name="inoutDate" id="inoutDate" /></td>
					<td><input type="hidden" name="initThFlg" id="initThFlg"></input></td>
					<td><input type="hidden" name="marginAmt" id="marginAmt"></input></td>
					<td><input type="hidden" name="initMarginPct"
						id="initMarginPct"></input></td>
					<td><input type="hidden" name="loanAmt" id="loanAmt"></input></td>
					<!-- <td><input type="hidden"  name="loanBal" id="loanBal" ></input></td> -->
					<td><input type="hidden" name="pldPerc" id="pldPerc"></input></td>
					<td><input type="hidden" name="wareId" id="wareId"></input></td>
					<td><input type="hidden" name="wareNm" id="wareNm"></input></td>
				</tr>

			</table>
		</div>
		<div id="collatDiv" style="width: 100%;" class="easyui-panel"
			title="货物信息" data-options="collapsible:true">
			<table class="easyui-datagrid" id="inOutDetailsTable" cellspacing="0"
				cellpadding="0" style="width: 100%; height: auto"
				iconCls="icon-edit">
			</table>
			<div id="toolbar" style="overflow: hidden">
				<!-- <a href="javascript:void(0)" class="easyui-linkbutton"
					data-options="iconCls:'icon-save',plain:true" onclick="accept()"
					style="float: right; margin-right: 14px;">接受改变</a> --> <a
					href="javascript:void(0)" class="easyui-linkbutton"
					iconcls="icon-edit" onclick="editRow()" plain="true"
					style="float: right">修改</a><a href="javascript:void(0)"
					class="easyui-linkbutton" id="huowu" name="huowu" id="querybutton"
					iconcls="icon-search" onclick="loadTable()" plain="true"
					style="float: right; margin-right: 14px;">货物查询</a>
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