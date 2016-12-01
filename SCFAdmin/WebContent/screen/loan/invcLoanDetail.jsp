<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>融资明细查询</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/loan/invcLoanDetail.js"></script>
</head>
<body class="UTSCF">
	<form id="loanSubmit">
	<div style="width: 100%" class="easyui-panel"
			title="融资产品信息" data-options="collapsible:true">
			<table class="utTab">
				<tr>
					<td>产品信息：</td>
					<td><input id="busiTp" name="busiTp" class="easyui-combobox"
						data-options="valueField:'id',textField:'text',panelHeight: 'auto'"></input></td>
					<td></td>
					<td></td>
				</tr>
			</table>
	</div>
		<div id="loanDiv" style="width: 100%" class="easyui-panel"
			title="业务信息" data-options="collapsible:true">	
			<table class="utTab">
				<tr>
					<td>融资编号：</td>
					<td><input type="text" name="sysRefNo" id="sysRefNo"></td>
					<td>币种：</td>
					<td><input type="text" name="ccy" id="ccy" class="easyui-combobox"></td>
				</tr>
				<tr>
					<td>借款金额：</td>
					<td><input id="ttlLoanAmt" name="ttlLoanAmt"  class="easyui-numberbox"
						data-options="min:0,precision:2,groupSeparator:','"></input>
						
					</td>
					<td>期限：</td>  <!-- ADVATERM  没找到 -->
					<td><input type="text" name="acctPeriod" id="acctPeriod"class="easyui-numberbox"></input></td>
				</tr>
				<tr>
					<td>利率：</td>
					<td><input  name="loanRt"
						id="loanRt" class="easyui-numberbox"
						data-options="min:0,precision:2,groupSeparator:','"></input></td>
					<td>可用额度：</td>
					<td><input  name="lmtBal"
						id="lmtBal"   class="easyui-numberspinner" data-options="min:0,precision:2,groupSeparator:','"></input></td>
				</tr>
			<!-- 	<tr>
					<td>扣息方式：</td>
					<td><input  name="arBal"
						id="arBal" class="easyui-numberbox"
						data-options="min:0,precision:2,groupSeparator:','"></input></td>
					<td>融资余额：</td>
					<td><input  name="openLoanAmt"
						id="openLoanAmt" class="easyui-numberbox"
						data-options="min:0,precision:2,groupSeparator:','"></input></td>
				</tr> -->
				<tr>
					<td>融资比例：</td>
					<td><input name="loanPct" id="loanPct"
						class="easyui-numberspinner"
						data-options="min:0,max:100,suffix:'%'"></input></td>
					<td>正常利率：</td>
					<td><input name="loanRt" id="loanRt"
						class="easyui-numberspinner"
						data-options="min:0,precision:2,max:100,suffix:'%'" ></input></td>
				 </tr>
				 <tr>
					<td>扣息方式：</td>
					<td>
					<input  type="text" id="payIntTp" name="payIntTp"  data-options="min:0,precision:2,max:100,suffix:'%'"/> 
					<!-- <input id="payIntTp" name="payIntTp" class="easyui-combobox"
						data-options="valueField:'id',textField:'text',panelHeight: 'auto'"></input> -->
					</td>
					<td>罚息利率：</td>
					<td><input type="text"  name="penaRt" id="penaRt" class="easyui-numberbox" data-options="min:0,precision:2,max:100,suffix:'%'"></input></td>
				</tr>
				<tr>
					<td>费率：</td> <!-- FINCHGRT -->
					<td><input type="text"  name="finChgrt" id="finChgrt" class="easyui-numberbox" data-options="min:0,precision:2,max:100,suffix:'%'"></input></td>
					<td>借款人收款账号：</td>
    				<td><input id="selAcNo"  name="selAcNo"  ></input></td>
				</tr>
				
				<tr>
				
				<!-- 	<td>账户名称：</td>  SELACNM
    				<td><input id="advaPaytype"  name="advaPaytype" 
						data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
				 		 ></input></td>
				 			<td>借款人收款账号：</td>
    				<td><input id="selAcNo"  name="selAcNo" class="easyui-combobox" 
						data-options="valueField:'acNo',textField:'acNo',panelHeight: 'auto'"
				 		 ></input></td>
				</tr>
				
				<tr>
					<td>账户名称：</td>
					<td><input  name="currFinCost"
						id="currFinCost" 
						data-options="min:0,precision:2,groupSeparator:','"></input></td>
					<td>本次已收费用：</td>
					<td><input  name="currFinPayCost"
						id="currFinPayCost" class="easyui-numberbox"
						data-options="min:0,precision:2,groupSeparator:','"></input></td>
				</tr>
				<tr>
					<td>开户银行：</td>
						<td><input id="advaPaytype"  name="advaPaytype" 
						data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
				 		 ></input></td>
				 	<td>放款资金来源：</td>	
				 	<td><input id="advaPaytype"  name="advaPaytype"   class="easyui-combobox" 
						data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
				 		 ></input></td>	
				 		
				</tr> -->
				
						<td>出资方：</td>
						<td><input id="investorName"  name="investorName" 
						data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
				 		 ></input></td>
				</tr>
				<!-- HIDDEN -->
				<tr style="display:none;">
					<td>
					    <input id="selId"  name="selId"  type='hidden'>
					     <input id="cntrctNO"  name="selId"  type='hidden'>
					</td>
				</tr>
			</table>
		</div>
		
		
			<div class="easyui-panel" title="担保信息"
			data-options="collapsible:true" style="width: 100%">
			<div id="custCollaDiv">
				<table id="custCollaTable" cellspacing="0" cellpadding="0"
					width="100%" iconCls="icon-edit">
				</table>
				<div id="toolbar">
				</div>
			</div>
		</div>
		
		<div class="easyui-panel" title="应收账款信息"
			data-options="collapsible:true" style="width: 100%">
			<div id="invcLoanDiv">
				<table id="invcLoanTable" cellspacing="0" cellpadding="0"
					width="100%" iconCls="icon-edit">
				</table>
				<div id="toolbar">

				</div>
				
			</div>
		</div>
		
		<div class="easyui-panel" title="还款记录"
			data-options="collapsible:true" style="width: 100%">
			<div id="pmtRecordDiv">
				<table id="pmtRecordTable" cellspacing="0" cellpadding="0"
					width="100%" iconCls="icon-edit">
				</table>
				<div id="toolbar">

				</div>
				
			</div>
		</div>
		
	<!-- 	<div class="easyui-panel" title="融资余额"
			data-options="collapsible:true" style="width: 98%">
			<div >  INV_LOAN_BAL invLoanBal
			 <input id="invLoanBal"  name="invLoanBal" title='融资余额'  >
			</div>
		</div> -->
	</form>
</body>
</html>