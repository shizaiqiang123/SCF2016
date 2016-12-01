<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>还款登记页面</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/pmt/loanPmtBL.js"></script>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
</head>
<body class="UTSCF">
	<form id="loanSubmit">
		<div id="loanDiv" style="width: 100%" class="easyui-panel"
			title="还款信息" data-options="collapsible:true">
			<div class="item">
				<span class="label">还款编号：</span>
				<div class="fl item-ifo">
					<input type="text" name="sysRefNo" id="sysRefNo"
						class="easyui-validatebox combo">
				</div>
			</div>
			<div class="item">
				<span class="label">融资编号：</span>
				<div class="fl item-ifo">
					<input type="text" name="loanId" id="loanId"
						class="easyui-validatebox combo">
				</div>
			</div>
			<div class="item">
				<span class="label">融资起始日：</span>
				<div class="fl item-ifo">
					<input type="text" name="loanValDt" id="loanValDt"
						class="easyui-datebox" editable="false"
						data-options="width:'253px',height:'32px',panelWidth:'253px'" />
				</div>
			</div>
			<div class="item">
				<span class="label">借款余额：</span>
				<div class="fl item-ifo">
					<input name="ttlLoanBal" id="ttlLoanBal" class="easyui-numberbox"
						required="true"
						data-options="width:'253px',height:'32px',min:0,
						precision:2,groupSeparator:',',validType:'maxLength[18]'" />
					<input type="button" id="queryPmt"
						style="margin-left: 10px; width: 100px; height: 32px"
						onclick="queryPmtMshowWindow()"
						class="dsIB mR10 hover white btnRed" value="查询还款历史" />
				</div>
			</div>
			<div class="item">
				<span class="label">本次还利息金额：</span>
				<div class="fl item-ifo">
					<input editable="false" name="payIntAmt" id="payIntAmt"
						class="easyui-numberbox"
						data-options="onChange:changeTtlPmtAmt,width:'253px',height:'32px',
						min:0,precision:2,groupSeparator:','" />
						<input type="button" id="calcInfo"
						style="margin-left: 10px; width: 100px; height: 32px"
						onclick="calcInfoDetails()"
						class="dsIB mR10 hover white btnRed" value="计算详情" />
				</div>
			</div>
			<div class="item">
				<span class="label">应收费用：</span>
				<div class="fl item-ifo">
					<input editable="false" name="currFinCost" id="currFinCost"
						class="easyui-numberbox"
						data-options="width:'253px',height:'32px',min:0,precision:2,groupSeparator:','" />
					<input type="hidden" name="currFinPayCost" id="currFinPayCost" />
				</div>
			</div>
			<div class="item">
				<span class="label">本次最大还款金额：</span>
				<div class="fl item-ifo">
					<input name="payMaxAmt" id="payMaxAmt" class="easyui-numberbox"
						data-options="width:'253px',height:'32px',
						min:0,precision:2,groupSeparator:','" />
				</div>
			</div>
			<div class="item">
				<span class="label">本次还款金额：</span>
				<div class="fl item-ifo">
					<input editable="false" required="true"
						data-options="onChange:changeTtlPmtAmt,width:'253px',height:'32px',min:0,precision:2,groupSeparator:','"
						class="easyui-numberbox" name="ttlPmtAmt" id="ttlPmtAmt"></input>
				</div>
			</div>
			<div class="item">
				<span class="label">本次还本金金额：</span>
				<div class="fl item-ifo">
					<input name="payPrinAmt" id="payPrinAmt" class="easyui-numberbox"
						data-options="width:'253px',height:'32px',
						min:0,precision:2,groupSeparator:','" />
				</div>
			</div>
			<div class="item">
				<span class="label">资金到账日：</span>
				<div class="fl item-ifo">
					<input type="text" name="pmtDt" id="pmtDt" required="true"
						data-options="width:'253px',height:'32px',panelWidth:'253px'"
						class="easyui-datebox" editable="false"></input>
				</div>
			</div>
			<div class="item">
				<span class="label">币种：</span>
				<div class="fl item-ifo">
					<input class="easyui-combobox" id="ccy" name="ccy"
						data-options="width:'253px',height:'32px',valueField: 'sysRefNo',textField: 'textField',panelHeight: 'auto' "
						editable="false" required="true" />
				</div>
			</div>
			<input type="hidden" name="cntrctNo" id="cntrctNo" /> <input
				type="hidden" id="busiTp" name="busiTp" /> <input type="hidden"
				name="selId" id="selId" /> <input type="hidden" name="selNm"
				id="selNm" /> <input type="hidden" name="ttlLoanAmt" id="ttlLoanAmt" />
			<input type="hidden" name="openLoanAmt" id="openLoanAmt" /> <input
				type="hidden" name="arAvalLoan" id="arAvalLoan" /> <input
				type="hidden" name="loanRt" id="loanRt" /> <input type="hidden"
				id="payIntTp" name="payIntTp" /> <input type="hidden"
				name="pmtTimes" id="pmtTimes" /> <input type="hidden"
				name="lastPayDt" id="lastPayDt" /> <input type="hidden"
				name="intAmt" id="intAmt" /> <input type="hidden" name="finChgrt"
				id="finChgrt" /> <input type="hidden" id="payChgTp" name="payChgTp" />
			<input type="hidden" id="licenceNo" name="licenceNo" />
			<!-- 					还款状态 -->
			<input type="hidden" name="pmtSts" id="pmtSts" /> <input
				type="hidden" name="trxDt" id="trxDt"
				value="${sysUserInfo.sysDate }" />
			<!-- 					开户行 -->
			<input type="hidden" name="selAcBkNo" id="selAcBkNo" />
			<!-- 					成员编号-->
			<input type="hidden" name="buyerId" id="buyerId" />
			<!-- 					手动输入还是自动选择默认账号-->
			<input type="hidden" name="acNoSts" id="acNoSts" />
			<input type="hidden" name=selAcNoBL id="selAcNoBL" />
			<input type="hidden" id="ownerId" name="ownerId" value="${sysUserInfo.userOwnerId }">
		</div>
	</form>
</body>
</html>