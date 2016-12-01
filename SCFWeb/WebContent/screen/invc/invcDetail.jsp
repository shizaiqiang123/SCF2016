<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>应收账款历程信息</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/invc/invcDetail.js"></script>
</head>
<body class="UTSCF">
	<form id="invcForm">
		<div class="easyui-panel" title="协议信息" data-options="collapsible:true"
			style="width: 98%">
			<div id="cntrctDiv">
				<table class="utTab">
					<tr>
						<td>协议流水号：</td>
						<td><input type="text" name="cntrctNo" id="cntrctNo"
							></td>
						<td>业务类别：</td>
						<td><input id="busiTp" name="busiTp" class="easyui-combobox"
							data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
							editable="false"></input></td>
					</tr>
					<tr>
						<td>间接客户id：</td>
						<td><input type="text" name="buyerId" id="buyerId"
							 ></td>
						<td>间接客户姓名：</td>
						<td><input type="text" name="buyerNm" id="buyerNm"
							></td>
					</tr>
					<tr>
						<td>授信客户id：</td>
						<td><input type="text" name="selId" id="selId"
							></td>
						<td>授信客户姓名：</td>
						<td><input type="text" name="selNm" id="selNm"
							></td>
					</tr>
				</table>
			</div>
		</div>
		<div class="easyui-panel" title="应收账款信息" data-options="collapsible:true"
			style="width: 98%">
			<div id="invcDiv">
				<table class="utTab">
					<tr>
						<td>应收账款流水号：</td>
						<td><input type="text" name="sysRefNo" id="sysRefNo"
							 ></td>
						<td>应收账款编号：</td>
						<td><input type="text" name="invNo" id="invNo"
							 ></td>
					</tr>
					<tr>
						<td>应收账款日期：</td>
						<td><input type="text" name="invDt" id="invDt"
							class="easyui-datebox" editable="false" 
							></input></td>
						<td>订单编号：</td>
						<td><input type="text" name="orderNo" id="orderNo"
							 ></td>
					</tr>

					<tr>
						<td>交易起始日：</td>
						<td><input type="text" name="invValDt" id="invValDt"
							class="easyui-datebox" editable="false" 
							></input></td>
						<td>交易到期日：</td>
						<td><input type="text" name="invDueDt" id="invDueDt"
							class="easyui-datebox" editable="false" 
							></input></td>
					</tr>
					<tr>
						<td>应收账款状态：</td>
						<td><input id="invSts" name="invSts" class="easyui-combobox"
								data-options="valueField:'id',textField:'text',panelHeight: 'auto'" 
								 ></input></td>
						<td>应收账款币别：</td>
						<td><input class="easyui-combobox" id="invCcy" name="invCcy"
							editable="false"
							data-options="valueField: 'sysRefNo',textField: 'sysRefNo',panelHeight: 'auto'" />
						</td>
					</tr>
					<tr>
						<td id='invAmtTd'>应收账款金额：</td>
						<td><input name="invAmt" id="invAmt" class="easyui-numberbox"
							data-options="groupSeparator:',', min:0,precision:2" value="0"></input></td>
						<td id='invBalTd'>应收账款余额：</td>
						<td><input name="invBal" id="invBal" class="easyui-numberbox"
							data-options="groupSeparator:',', min:0,precision:2" value="0"></input></td>
					</tr>
					<tr id='crnAmtTr'>
						<td>贷项清单金额：</td>
						<td><input name="crnAmt" id="crnAmt" class="easyui-numberbox"
							data-options="groupSeparator:',', min:0,precision:2" value="0"></input></td>
					</tr>
<!-- 					<tr> -->
<!-- 						<td>应收账款融资金额：</td> -->
<!-- 						<td><input name="invLoanBal" id="invLoanBal" -->
<!-- 							class="easyui-numberbox" -->
<!-- 							data-options="groupSeparator:',', min:0,precision:2" value="0"></input></td> -->
<!-- 						<td>可融资金额：</td> -->
<!-- 						<td><input name="invLoanAval" id="invLoanAval" -->
<!-- 							class="easyui-numberbox" -->
<!-- 							data-options="groupSeparator:',', min:0,precision:2" value="0"></input></td> -->
<!-- 					</tr> -->
				<tr>
				<td>
					<input type="hidden" id="sysEventTimes" name="sysEventTimes"/>				
				</td></tr>
				</table>
			</div>
		</div>
			<div id="loanDiv">
		<div class="easyui-panel" title="融资信息" data-options="collapsible:true"
			style="width: 98%">
				<table id="loanTable" cellspacing="0" cellpadding="0" width="100%"
					iconCls="icon-edit">
				</table>
			</div>
		</div>
			<div id="buyerPmtDiv">
		<div class="easyui-panel" title="还款信息" data-options="collapsible:true"
			style="width: 98%">
				<table id="buyerPmtTable" cellspacing="0" cellpadding="0" width="100%"
					iconCls="icon-edit">
				</table>
			</div>
		</div>
			<div id="cbkDiv">
		<div class="easyui-panel" title="反转让信息" data-options="collapsible:true"
			style="width: 98%">
				<table id="cbkTable" cellspacing="0" cellpadding="0" width="100%"
					iconCls="icon-edit">
				</table>
			</div>
		</div>
			<div id="crnDiv">
		<div class="easyui-panel" title="关联贷项清单信息" data-options="collapsible:true"
			style="width: 98%">
				<table id="crnTable" cellspacing="0" cellpadding="0" width="100%"
					iconCls="icon-edit">
				</table>
			</div>
		</div>
	</form>
</body>
</html>