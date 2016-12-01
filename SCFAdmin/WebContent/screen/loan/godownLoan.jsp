<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>仓单质押融资</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/loan/godownLoan.js"></script>
</head>
<body>
	<div class="div_ul">
		<form id="collatLoanForm">
			<div id="collatLoanDiv"
				style="width: 100%; height: auto; min-height: 380px"
				class="easyui-panel" title="融资信息" data-options="collapsible:true">
				<table class="utTab">
					<tr>
						<td>融资编号：</td>
						<td><input type="text" name="sysRefNo" id="sysRefNo" /></td>
						<td>协议编号：</td>
						<td><input type="text" name="cntrctNo" id="cntrctNo" /></td>
					</tr>
					<tr>
						<td>融资起始日：</td>
						<td><input type="text" name="loanValDt" id="loanValDt"
							class="easyui-datebox" required="true"  value="${sysUserInfo.sysDate}"/></td>
						<td>融资到期日：</td>
						<td><input type="text" name="loanDueDt" id="loanDueDt"
							class="easyui-datebox" required="true"
							data-options="onChange:getDueDt" /></td>
					</tr>
					<tr>
						<td>授信人编号：</td>
						<td><input type="text" name="selId" id="selId"></input>
						<td>授信人名称：</td>
						<td><input type="text" name="selNm" id="selNm"></input></td>
					</tr>
					<tr>
						<td>业务类别：</td>
						<td><input id="busiTp" name="busiTp" class="easyui-combobox"
							data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
							editable="false"></input></td>
						<td>交易日期</td>
						<td><input type="text" name="trxDt" id="trxDt"
							class="easyui-datebox" required="required"
							data-options="validType:'date'" value="${sysUserInfo.sysDate}"></input></td>
					</tr>
					<tr>
						<td>授信额度币种：</td>
						<td><input class="easyui-combobox" id=lmtCcy name="lmtCcy"
							data-options="valueField: 'sysRefNo',textField: 'sysRefNo',panelHeight: 'auto'"
							style="" false" /></td>
						<td>授信额度金额：</td>
						<td><input type="text" value="0" name="LmtAmt"
							id="LmtAmt" class="easyui-numberspinner"
							data-options="min:0,precision:2,groupSeparator:','"></input></td>
					</tr>
					<tr>
						<td>授信额度余额：</td>
						<td><input type="text" value="0" name="numLmtBal"
							id="numLmtBal" class="easyui-numberspinner"
							data-options="min:0,precision:2,groupSeparator:','"></input></td>
						<td>所选仓单可融资额：</td>
						<td><input type="text" value="0" name="maxLoanOpenAmt"
							id="maxLoanOpenAmt" class="easyui-numberspinner"
							data-options="min:0,precision:2,groupSeparator:','"></input></td>
					</tr>
					<tr>
						<td>融资金额：</td>
						<td><input type="text" name="ttlLoanAmt" id="ttlLoanAmt" required="true"
							class="easyui-numberspinner"
							data-options="onChange:changeTtlLoanAmt,min:0,precision:2,groupSeparator:','"></input></td>
						<td>融资支付方式：</td>
						<td><input class="easyui-combobox" id="loanTp" name="loanTp"
							required="required"
							data-options="onChange:changeLoanTp,valueField:'id',textField:'text',panelHeight: 'auto'"
							editable="false" /></td>
					</tr>
					<tr>
						<td>初始保证金比例：</td>
						<td><input type="text" name="initGartPct" id="initGartPct"
							class="easyui-numberspinner"
							data-options="min:0,precision:2,suffix:'%'"></input></td>
						<td>初始保证金金额：</td>
						<td><input type="text" value="0" name="marginAmt"
							id="marginAmt" class="easyui-numberspinner"
							data-options="min:0,precision:2,groupSeparator:','"></input></td>
					</tr>
					<tr>
						<td>手续费费率：</td>
						<td><input type="text" name="finChgrt" id="finChgrt" required="true"
							class="easyui-numberspinner"
							data-options="min:0,precision:2,groupSeparator:','"></input>
						<td>手续费：</td>
						<td><input type="text" name="costAmt" id="costAmt" required="true"
							class="easyui-numberspinner"
							data-options="min:0,precision:2,groupSeparator:','"></input>
					</tr>
					<tr>
						<td>利率：</td>
						<td><input type="text" name="intRt" id="intRt" required="true"
							class="easyui-numberspinner"
							data-options="min:0,precision:2,groupSeparator:','"></input>
						<td>利息：</td>
						<td><input type="text" name="intAmt" id="intAmt" required="true"
							class="easyui-numberspinner"
							data-options="min:0,precision:2,groupSeparator:','"></input>
					</tr>
					<tr>
						<td>质押率：</td>
						<td><input type="text" value="0" name="pldPerc" id="pldPerc"
							class="easyui-numberspinner"
							data-options="min:0,precision:2,suffix:'%'"></input></td>	
						<td>客户结算户：</td>
						<td><input class="easyui-combobox"  id="selAcNo" name="selAcNo"
				 			data-options="valueField: 'acNo',textField: 'acNo',panelHeight: 'auto'" 
				 			editable="false" /></td>
					</tr>
					<tr>
						<td>备注</td>
						<td colspan="5"><input name="remark" id="remark" class="easyui-textbox" data-options="missingMessage:'输入项为必输项',multiline:true,validType:'maxLength[200]'" style="width: 50%; height: 80px"></td>
					</tr>
					
					
					<!-- 
					<tr>
						<td>库存价值：</td>
						<td><input type="text" name="ttlRegAmt" id="ttlRegAmt"
							class="easyui-numberspinner"
							data-options="min:0,precision:2,groupSeparator:','"></input>
						<td>最低库存价值：</td>
						<td><input type="text" name="numRegLowestVal"
							id="numRegLowestVal" class="easyui-numberspinner"
							data-options="min:0,precision:2,groupSeparator:','"></input>
					</tr>
					<tr>
						<td>协议内可融资金额：</td>
						<td><input type="text" name="maxLoanOpenAmt"
							id="maxLoanOpenAmt" class="easyui-numberspinner"
							data-options="min:0,precision:2,groupSeparator:','"></input></td>
					</tr>
					<tr>
						<td>申请融资金额：</td>
						<td><input type="text" name="ttlLoanAmt" id="ttlLoanAmt"
							class="easyui-numberspinner"
							data-options="min:0,precision:2,groupSeparator:','"></input></td>
						<td>融资余额：</td>
						<td><input type="text" value="0" name="ttlLoanBal"
							id="ttlLoanBal" class="easyui-numberspinner"
							data-options="min:0,precision:2,groupSeparator:','"></input></td>
					</tr>
					<tr>
						<td>协议内可融资余额：</td>
						<td><input type="text" value="0" name="loanOpenBal"
							id="loanOpenBal" class="easyui-numberspinner"
							data-options="min:0,precision:2,groupSeparator:','"></input></td>
						<td>融资次数：</td>
						<td><input type="text" value="0" name="loanTimes"
							id="loanTimes"></input></td>
					</tr>
					<tr>
						<td>协议内融资余额：</td>
						<td><input type="text" value="0" name="openLoanAmt"
							id="openLoanAmt" class="easyui-numberspinner"
							data-options="min:0,precision:2,groupSeparator:','"></input></td>
					</tr>
					<tr>
					</tr> -->
					<tr>
						<!-- 					<td>客户账号：</td> -->
						<!-- 					<td><input type="text" name="custAcNo" id="custAcNo" -->
						<!-- 						class="easyui-validatebox combo" required="true"></input></td> -->
						<td>
							<input type="hidden" name='lmtBal' id='lmtBal'></input>
							<input type="hidden" name='numOpenLoanAmt' id='numOpenLoanAmt'></input>
							<input type="hidden" name='selectedAmt' id='selectedAmt' value></input>
							<input type="hidden" name='partyNumLmtBal' id='partyNumLmtBal'></input>
							<input type="hidden" name='regLowestVal' id='regLowestVal'></input>
							<input id="trxId" name="trxId" type="hidden" />
							<input id="sbrId" name="sbrId" type="hidden" />
							<input type="hidden" name='loanOpenBalOld' id='loanOpenBalOld' value></input>
							<input type="hidden" name='marginBal' id='marginBal'></input>
							<input type="hidden" name='numLmtBalHd' id='numLmtBalHd'></input>
							<input type="hidden" name='ttlLoanBal' id='ttlLoanBal'></input>
						<!-- 原授信额度余额 -->
						</td>

					</tr>
				</table>
			</div>
		</form>
	</div>
	<div id="collatDiv">
		<div class="easyui-panel" title="仓单信息" data-options="collapsible:true"
			style="width: 100%">
			<div>
				<div id="collatToolbar" style="overflow: hidden; display: none">
					<a href="javascript:void(0)" class="easyui-linkbutton"
						iconcls="icon-search" onclick="queryCollat()" plain="true"
						style="float: right; margin-right: 14px;">查询</a>
				</div>
				<table id="collatLoanTable" cellspacing="0" cellpadding="0"
					width="100%" iconCls="icon-edit">
				</table>
			</div>
		</div>
	</div>
	<div id="BillInfoDiv">
		<div class="easyui-panel" title="票据信息" data-options="collapsible:true"
			style="width: 100%">
			<div id="acnoDiv1">
				<table id="billTable" cellspacing="0" cellpadding="0" width="100%"
					class="easyui-datagrid" iconCls="icon-edit">
				</table>
				<div id="toolbar1" style="overflow: hidden">
					<a href="javascript:void(0)" class="easyui-linkbutton"
						iconcls="icon-add" onclick="addBillRow()" plain="true" id="addbutton"
						style="float: right; margin-right: 14px;">添加</a> 
					<a href="javascript:void(0)" class="easyui-linkbutton"
						iconcls="icon-edit" onclick="editBillRow()" plain="true" id="updatebutton"
						style="float: right">修改</a> 
					<a href="javascript:void(0)" class="easyui-linkbutton" iconcls="icon-remove" id="delbutton"
						onclick="deleteBillRow()" plain="true" style="float: right">删除</a>
				</div>
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
</body>
</html>