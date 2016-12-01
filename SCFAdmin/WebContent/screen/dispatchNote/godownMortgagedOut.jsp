<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>动产质押-质物出库页面</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/dispatchNote/godownMortgagedOut.js"></script>
</head>
<body class="UTSCF">
	<form id="dispatchForm">
		<div id="dispatchDiv" style="width: 100%" class="easyui-panel"
			title="出库信息" data-options="collapsible:true">
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
					<td>质押率：</td>
					<td><input type="text" name="pldPerc" id="pldPerc"
						class="easyui-numberspinner"
						data-options="min:0,precision:2,max:100,suffix:'%'"></input></td>
				</tr>

				<tr>
					<td>授信客户编号：</td>
					<td><input type="text" name="selId" id="selId"
						class="easyui-validatebox combo" required="true"></input></td>
					<td>授信客户名称：</td>
					<td><input type="text" name="selNm" id="selNm"></input></td>
				</tr>

				<tr>
					<td>授信额度余额：</td>
					<td><input type="text" name="lmtBal" id="lmtBal"
						class="easyui-numberspinner"
						data-options="groupSeparator:',', min:0,precision:2"></input></td>
					<td>币种：</td>
					<td><input id="ccy" name="ccy" class="easyui-combobox"
						data-options="valueField:'sysRefNo',textField:'sysRefNo',panelHeight: 'auto'"
						editable="false"></input></td>
				</tr>

				<tr>
					<td>库存价值总额：</td>
					<td><input type="text" name="ttlRegAmt" id="ttlRegAmt"
						class="easyui-numberspinner"
						data-options="groupSeparator:',',onChange:changeTtlYPayAmt, min:0,precision:2"></input></td>
					<td>协议内融资余额：</td>
					<td><input type="text" name="ttlLoanBal" id="ttlLoanBal"
						class="easyui-numberspinner"
						data-options="groupSeparator:',', min:0,precision:2"></input></td>
				</tr>

				<!--  
				<tr>
					<td>核心企业编号：</td>
					<td><input type="text" class="easyui-validatebox combo"
						name="buyerId" id="buyerId"></input><a class="easyui-linkbutton"
						icon="icon-add" onclick="showLookUpWindow()">查询</a></td>
					<td>核心企业名称：</td>
					<td><input class="combo" name="buyerNm" id="buyerNm"
						required="required" /></td>
				</tr>
				
				<tr>
					<td>监管机构编号：</td>
					<td><input type="text" class="easyui-validatebox combo" name=regId id="regId" ></input></td>
					<td>监管机构名称：</td>
					<td><input type="text" class="easyui-validatebox combo" name="regNm" id="regNm" ></input></td>
				</tr>
				
				<tr>
					<td>仓库编号：</td>
					<td><input type="text" class="easyui-validatebox combo" name="wareId" id="wareId" ></input></td>
					<td>仓库名称：</td>
					<td><input type="text" class="easyui-validatebox combo" name="wareNm" id="wareNm" ></input></td>
				</tr>
				-->
				<tr>
					<td>协议下保证金余额：</td>
					<td><input type="text" name="initBailBal" id="initBailBal"
						class="easyui-numberspinner"
						data-options="groupSeparator:',', min:0,precision:2"></input></td>
					<td>可放货价值：</td>
					<td><input type="text" name="ttlYPayAmt" id="ttlYPayAmt"
						class="easyui-numberspinner"
						data-options="groupSeparator:',', min:0,precision:2"></input></td>
				</tr>

				<tr>
					<td>最低库存价值：</td>
					<td><input type="text" name="ttlLowPayNum" id="ttlLowPayNum"
						class="easyui-numberspinner"
						data-options="groupSeparator:',', min:0,precision:2"></input></td>
					<td>本次提货总价值：</td>
					<td><input type="text" name="ttlPayAmt" id="ttlPayAmt"
						class="easyui-numberspinner"
						data-options="groupSeparator:',', min:0,precision:2"></input></td>
				</tr>

				<tr>
					<td><input type="hidden" name="buyerId" id="buyerId" /></td>
					<td><input type="hidden" name="buyerNm" id="buyerNm" /></td>
					<td><input type="hidden" name="regId" id="regId" /></td>
					<td><input type="hidden" name="regNm" id="regNm" /></td>
					<td><input type="hidden" name="wareId" id="wareId" /></td>
					<td><input type="hidden" name="wareNm" id="wareNm" /></td>

					<td><input type="hidden" name="inoutDate" id="inoutDate" /></td>
					<td><input type="hidden" name="initThFlg" id="initThFlg"></input></td>
					<td><input type="hidden" name="marginAmt" id="marginAmt"></input></td>
					<td><input type="hidden" name="initMarginPct"
						id="initMarginPct"></input></td>
					<td><input type="hidden" name="loanId" id="loanId"></input></td>
					<td><input type="hidden" name="loanAmt" id="loanAmt"></input></td>
					<td><input type="hidden" name="loanBal" id="loanBal"></input></td>
					<td><input type="hidden" name="initBailAcc" id="initBailAcc"></input></td>
					<td><input type="hidden" name="ttlRegAmtCount"
						id="ttlRegAmtCount"></input></td>
					<td><input type="hidden" name="ttlYPayAmtOld"
						id="ttlYPayAmtOld"></input></td>
					<td><input type="hidden" name="ttlYPayAmtHD" id="ttlYPayAmtHD"></input></td>
					<!-- 可放货价值临时字段，记录可放货价值的原值 -->
					<td><input type="hidden" name="ttlRegAmtHD" id="ttlRegAmtHD"></input></td>
					<!-- 库存价值总额临时字段，记录库存价值总额的原值 -->
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
				<a id="queryCollatBut" href="javascript:void(0)"
					class="easyui-linkbutton"
					data-options="iconCls:'icon-search',plain:true"
					onclick="queryCollat()" style="float: right; margin-right: 14px;">查询货物</a>
				<a href="javascript:void(0)" class="easyui-linkbutton"
					data-options="iconCls:'icon-save',plain:true" onclick="accept()"
					style="float: right; margin-right: 14px;">接受改变</a>
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