<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>动产质押融资</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/loan/collatLoan.js"></script>
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
							class="easyui-datebox" required="true" /></td>
						<td>融资到期日：</td>
						<td><input type="text" name="loanDueDt" id="loanDueDt"
							class="easyui-datebox" required="true"
							data-options="onChange:getDueDt" /></td>
					</tr>
					<tr>
						<td>交易日期：</td>
						<td><input type="text" name="trxDt" id="trxDt"
							class="easyui-datebox" /></td>
						<td>质押率：</td>
						<td><input type="text" value="0" name="pldPerc" id="pldPerc"
							class="easyui-numberspinner"
							data-options="min:0,precision:2,suffix:'%'"></input></td>
					</tr>
					<tr>
						<td>授信人编号：</td>
						<td><input type="text" name="selId" id="selId"></input>
						<td>授信人名称：</td>
						<td><input type="text" name="selNm" id="selNm"></input></td>
					</tr>
					<tr>
						<td>授信额度币种：</td>
						<td><input class="easyui-combobox" id=lmtCcy name="lmtCcy"
							data-options="valueField: 'sysRefNo',textField: 'sysRefNo',panelHeight: 'auto'"
							style="" false" /></td>
						<td>授信额度余额：</td>
						<td><input type="text" value="0" name="numLmtBal"
							id="numLmtBal" class="easyui-numberspinner"
							data-options="min:0,precision:2,groupSeparator:','"></input></td>
					</tr>
					<!-- 				<tr> -->
					<!-- 					<td>监管机构代码：</td> -->
					<!-- 					<td><input type="text" name="patnerId" id="patnerId"></input><a -->
					<!-- 						id="queryPatId" class="easyui-linkbutton" icon="icon-search" -->
					<!-- 						onclick="showCntrctPatWindow()">查询</a></td> -->
					<!-- 					<td>监管机构名称：</td> -->
					<!-- 					<td><input type="text" name="patnerNm" id="patnerNm"></input></td> -->
					<!-- 				</tr> -->
					<!-- 				<tr> -->
					<!-- 					<td>仓库编号：</td> -->
					<!-- 					<td><input type="text" name="storageId" id="storageId"></input><a -->
					<!-- 						id="queryPatnerId" class="easyui-linkbutton" icon="icon-search" -->
					<!-- 						onclick="showPatner()">查询</a></td> -->
					<!-- 					<td>仓库名称：</td> -->
					<!-- 					<td><input type="text" name="storageNm" id="storageNm"></input></td> -->
					<!-- 				</tr> -->
					<!-- 				<tr> -->
					<!-- 					<td>仓库地址：</td> -->
					<!-- 					<td><input type="text" name="storageAdr" id="storageAdr"></input> -->
					<!-- 					<td>仓库联系人：</td> -->
					<!-- 					<td><input type="text" name="contactNm" id="contactNm"></input></td> -->
					<!-- 				</tr> -->
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
						<td>业务类别：</td>
						<td><input id="busiTp" name="busiTp" class="easyui-combobox"
							data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
							editable="false"></input></td>
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
					<!-- 				<tr id="regLoanBalTr"> -->
					<!-- 					<td>已融资敞口：</td> -->
					<!-- 					<td><input type="text" name="regLoanBal" id="regLoanBal" value="0" -->
					<!-- 						class="easyui-numberspinner" data-options="min:0,precision:2,groupSeparator:','"></input> -->
					<!-- 					</td> -->
					<!-- 				</tr> -->
					<tr>
						<td>协议内融资余额：</td>
						<td><input type="text" value="0" name="openLoanAmt"
							id="openLoanAmt" class="easyui-numberspinner"
							data-options="min:0,precision:2,groupSeparator:','"></input></td>
						<td>保证金账号：</td>
						<td><input type="text" name="marginAcNo" id="marginAcNo"
							class="easyui-validatebox combo" required="true"
							data-options="validType:'maxLength[35]'"></input></td>


					</tr>
					<tr>
						<!-- 					<td>监管机构额度余额：</td> -->
						<!-- 					<td><input type="text" name="patnerLmtBal" id="patnerLmtBal" -->
						<!-- 						class="easyui-numberspinner" -->
						<!-- 						data-options="min:0,precision:2,groupSeparator:','"></input> -->
						<td>保证金金额：</td>
						<td><input type="text" value="0" name="marginAmt"
							id="marginAmt" class="easyui-numberspinner"
							data-options="min:0,precision:2,groupSeparator:','"></input></td>
						<td>初始保证金比例：</td>
						<td><input type="text" name="initGartPct" id="initGartPct"
							class="easyui-numberspinner"
							data-options="min:0,precision:2,suffix:'%'"></input></td>

					</tr>
					<tr>
						<td>融资支付方式：</td>
						<td><input class="easyui-combobox" id="loanTp" name="loanTp"
							required="required"
							data-options="onChange:changeLoanTp,valueField:'id',textField:'text',panelHeight: 'auto'"
							editable="false" /></td>
					</tr>
					<tr>
						<!-- 					<td>客户账号：</td> -->
						<!-- 					<td><input type="text" name="custAcNo" id="custAcNo" -->
						<!-- 						class="easyui-validatebox combo" required="true"></input></td> -->
						<td>
							<!-- 协议额度余额 --> <input type="hidden" name='lmtBal' id='lmtBal'></input>
							<input type="hidden" name='numOpenLoanAmt' id='numOpenLoanAmt'></input>
							<input type="hidden" name='selectedAmt' id='selectedAmt' value></input>
							<!-- 监管方额度余额 --> <input type="hidden" name='partyNumLmtBal'
							id='partyNumLmtBal'></input> <input type="hidden"
							name='regLowestVal' id='regLowestVal'></input><input id="trxId"
							name="trxId" type="hidden"> <input id="sbrId"
							name="sbrId" type="hidden"><input type="hidden"
							name='loanOpenBalOld' id='loanOpenBalOld' value></input> <input
							type="hidden" name='marginBal' id='marginBal'></input> <input
							type="hidden" name='numLmtBalHd' id='numLmtBalHd'></input>
						<!-- 原授信额度余额 -->
						</td>
						<!-- 买方额度表流水号 -->
					<td><input type="hidden" name="buyerLmtSysRefNo" id="buyerLmtSysRefNo"></td>
					<!-- 卖方额度表流水号 -->
					<td><input type="hidden" name="sellerLmtSysRefNo" id="sellerLmtSysRefNo"></td>

					</tr>
				</table>
			</div>
		</form>
	</div>
	<div id="collatDiv">
		<div class="easyui-panel" title="押品信息" data-options="collapsible:true"
			style="width: 100%">
			<div>
				<div id="collatToolbar" style="overflow: hidden; display: none">
					<a href="javascript:void(0)" class="easyui-linkbutton"
						iconcls="icon-search" onclick="queryCollatRow()" plain="true"
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