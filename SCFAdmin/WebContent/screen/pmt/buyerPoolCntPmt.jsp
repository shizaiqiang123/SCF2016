<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>间接客户还款页面</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/pmt/buyerPoolCntPmt.js"></script>
</head>
<body>
	<div id="pmtDiv" style="width: 100%" class="easyui-panel" title="还款信息"
		data-options="collapsible:true">
		<form id="pmtForm">
			<table class="utTab">
				<tr>
					<td>交易流水号：</td>
					<td><input type="text" name="sysRefNo" id="sysRefNo" /></td>
					<td>授信客户名称：</td>
					<td><input type="text" name="selNm" id="selNm"
						required="required"></input><a class="easyui-linkbutton"
						icon="icon-search" onclick="selIdLookUp()">查询</a></td>
				</tr>
				<tr>
					<td>间接客户名称：</td>
					<td><input type="text" name="buyerNm" id="buyerNm"
						required="required" /></td>
					<td>业务类别：</td>
					<td><input id="busiTp" name="busiTp" class="easyui-combobox"
						data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
						required="true"></input></td>
				</tr>
				<tr>
					<td>币种：</td>
					<td><input id="lmtCcy" name="lmtCcy" class="easyui-combobox"></input>
					</td>
					<td>扣款账号：</td>
					<td><input editable="false" required="required" id="acNo"
						data-options="valueField:'acNo',textField:'acNo',panelHeight: 'auto'"
						name="acNo" class="easyui-combobox"></input> <!-- <a class="easyui-linkbutton" icon="icon-search" onclick="showDetail()">保理专户明细</a> -->
					</td>
				</tr>
				<tr>
					<td>核销应收账款总额：</td>
					<td><input id="ttlPmtAmt" name="ttlPmtAmt"
						data-options="min:0,precision:2,groupSeparator:',',onChange:changeStruLoanAmt"
						class="easyui-numberbox" required="required"></input></td>
					<td><input id="ttlPmtAmtHd" name="ttlPmtAmtHd" type="hidden"></input></td>
					<!-- 为了将ttlPmtAmt的默认值放入，在onnextClick时作控制 -->
					<!-- 				 	<td>入账金额：</td> -->
					<!--     				<td><input type="text"  name="ttlPmtAmt" id="ttlPmtAmt" class="easyui-numberspinner" data-options="min:0,precision:2,groupSeparator:','"></input></td> -->
				</tr>
				<!--     			<tr> -->
				<!--     				<td>本次还手续费：</td> -->
				<!--     				<td><input type="text"  name="payTranAmt" data-options="min:0,precision:2,groupSeparator:','"  id="payTranAmt" class="easyui-numberbox"></input> -->
				<!--     				<td>本次还处理费：</td> -->
				<!--     				<td><input type="text"  name="payBillAmt" data-options="min:0,precision:2,groupSeparator:','"  id="payBillAmt" class="easyui-numberbox"></input></td> -->
				<!--     			</tr> -->
				<tr>
					<!--     				<td id="collate1">保险公司：</td> -->
					<!-- 					<td id="collate2"><input id="collatCompNm" name="collatCompNm" class="easyui-textbox"></td> -->
					<td><input type="hidden" id="selId" name="selId" /></td>
					<td><input type="hidden" id="buyerId" name="buyerId"></td>
					<td><input type="hidden" id="accetpFlag" name="accetpFlag"
						value="false"></td>
					<td><input type="hidden" name="insureNo" id="insureNo"></td>
					<td><input id="trxId" name="trxId" type="hidden"></td>
					<td><input id="sbrId" name="sbrId" type="hidden"></td>
					<td><input id="pmtDt" name="pmtDt" type="hidden"
						value="${sysUserInfo.sysDate}"></td>
					<!-- 池融资还款日期的隐藏字段，默认等于当前日期 -->
					<td><input id="arAvalLoan" name="arAvalLoan" type="hidden"></td>
					<!-- 池融资可融资金额，协议catalog带过来 -->
					<td><input id="arBal" name="arBal" type="hidden"></td>
					<!-- 池融资应收账款余额，协议catalog带过来 -->
					<td><input id="openLoanAmt" name="openLoanAmt" type="hidden"></td>
					<!-- 池融资已融资敞口，协议catalog带过来 -->
					<td><input id="poolLine" name="poolLine" type="hidden"></td>
					<!-- 池水位，协议catalog带过来 -->
					<td><input id="payIntTp" name="payIntTp" type="hidden"></td>
					<!-- 池融资扣息方式，协议catalog带过来 -->
					<!-- 增加三个金额的临时字段为了保存原值 -->
					<td><input id="arAvalLoanHd" name="arAvalLoanHd" type="hidden"></td>
					<!-- 池融资可融资金额，协议catalog带过来 -->
					<td><input id="arBalHd" name="arBalHd" type="hidden"></td>
					<!-- 池融资应收账款余额，协议catalog带过来 -->
					<td><input id="openLoanAmtHd" name="openLoanAmtHd"
						type="hidden"></td>
					<!-- 池融资已融资敞口，协议catalog带过来 -->
					<td><input id="poolLineHd" name="poolLineHd" type="hidden"></td>
					<!-- 池水位，协议catalog带过来 -->
					<td><input id="intSysRefNo" name="intSysRefNo" type="hidden"></td>
					<!-- 利息信息的流水号，PM时候新增，FP.RE.DP都是查询出来 -->
				</tr>
				<tr id="Tr1">
					<td><input id="pmtTp" name="pmtTp" value="1"></td>
					<td><input id="cntrctNo" name="cntrctNo"></td>
				</tr>
				<tr id="Tr2">
					<td><input id="lmtAmt" name="lmtAmt"
						data-options="min:0,precision:2,groupSeparator:','"
						class="easyui-numberbox"></td>
					<td><input id="lmtBal" name="lmtBal"
						data-options="min:0,precision:2,groupSeparator:','"
						class="easyui-numberbox"></td>
					<td><input id="lmtAmtHd" name="lmtAmtHd"
						data-options="min:0,precision:2,groupSeparator:','"
						class="easyui-numberbox"></td>
					<td><input id="lmtBalHd" name="lmtBalHd"
						data-options="min:0,precision:2,groupSeparator:','"
						class="easyui-numberbox"></td>
				</tr>
				<tr id="Tr3">
					<td><input id="lmtAllocate" name="lmtAllocate"
						data-options="min:0,precision:2,groupSeparator:','"
						class="easyui-numberbox"></td>
					<td><input id="lmtAllocateHd" name="lmtAllocateHd"
						data-options="min:0,precision:2,groupSeparator:','"
						class="easyui-numberbox"></td>
				</tr>
				<tr id="Tr4">
					<td><input id="sysRefNoSbr" name="sysRefNoSbr"></td>
					<td><input id="cntrctSbrBuyerBal" name="cntrctSbrBuyerBal"
						data-options="min:0,precision:2,groupSeparator:','"
						class="easyui-numberbox"></td>
					<td><input id="cntrctSbrBuyerBalHd" name="cntrctSbrBuyerBalHd"
						data-options="min:0,precision:2,groupSeparator:','"
						class="easyui-numberbox"></td>
				</tr>
				<tr id="Tr5">
					<td><input id="buyerlmtBal" name="buyerlmtBal"
						data-options="min:0,precision:2,groupSeparator:','"
						class="easyui-numberbox"></td>
					<td><input id="buyerlmtAvl" name="buyerlmtAvl"
						data-options="min:0,precision:2,groupSeparator:','"
						class="easyui-numberbox"></td>
					<td><input id="buyerlmtBalHd" name="buyerlmtBalHd"
						data-options="min:0,precision:2,groupSeparator:','"
						class="easyui-numberbox"></td>
					<td><input id="buyerlmtAvlHd" name="buyerlmtAvlHd"
						data-options="min:0,precision:2,groupSeparator:','"
						class="easyui-numberbox"></td>
				</tr>
			</table>
		</form>
	</div>
	<div class="easyui-panel" title="应收账款信息"
		data-options="collapsible:true" style="width: 100%;">
		<div id="invcMDiv">
			<table id="invcMTable" cellspacing="0" cellpadding="0" width="100%"
				iconCls="icon-edit">
			</table>
			<div id="toolbar" style="overflow: hidden;">
				<a href="javascript:void(0)" class="easyui-linkbutton"
					id="querybutton" iconcls="icon-search" onclick="loadTable()"
					plain="true" style="float: right; margin-right: 14px;">应收账款查询</a>
				<!-- <a href="javascript:void(0)" class="easyui-linkbutton" id="acceptbutton"
					data-options="iconCls:'icon-save',plain:true" onclick="accept()" style="float:right;">接受改变</a> -->
			</div>
		</div>
	</div>
	<!-- 融资信息表不展示，全部js系统计算字段 -->
	<div class="easyui-panel" title="融资信息" data-options="collapsible:true"
		style="width: 100%;">
		<div id="loanMDiv">
			<table id="loanMTable" cellspacing="0" cellpadding="0" width="100%"
				iconCls="icon-edit">
			</table>
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