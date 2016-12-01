<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>还款自动核销页面</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/pmt/reLoanPmt.js"></script>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
</head>
<body class="UTSCF">
	<form id="loanPmtSubmit">
		<div id="loanDiv" style="width: 100%" class="easyui-panel"
			title="还款自动核销信息" data-options="collapsible:true">
			<div class="item">				
					<span class="label">还款编号（信息流）：</span>
					<div class="fl item-ifo">
						<input  type="text" name="pmtId" id="pmtId" class="easyui-validatebox combo"/>
					</div>					
			</div>
			<div class="item">				
					<span class="label">还款编号（资金流）：</span>
					<div class="fl item-ifo">
						<input  type="text" name="sysRefNo" id="sysRefNo" class="easyui-validatebox combo" />
					</div>					
			</div>
			<div class="item">				
					<span class="label">资金到帐日期：</span>
					<div class="fl item-ifo">
						<input type="text" name="pmtDt" id="pmtDt"
					 data-options="width:'253px',height:'32px'"	class="easyui-datebox" editable="false" required="true"></input>
					</div>					
			</div>
			<div class="item">				
					<span class="label">还款账户：</span>
					<div class="fl item-ifo">
						<input  type="text" name="selAcNo" id="selAcNo" class="easyui-validatebox combo" required="true"/>
					</div>					
			</div>
			<div class="item">				
					<span class="label">本次还本金金额：</span>
					<div class="fl item-ifo">
						<input  editable="false" name="payPrinAmt" id="payPrinAmt" class="easyui-numberbox"
						data-options="width:'253px',height:'32px',min:0,precision:2,groupSeparator:','"/>
					</div>					
			</div>
			<div class="item">				
					<span class="label">本次还利息金额：</span>
					<div class="fl item-ifo">
						<input  editable="false" name="payIntAmt" id="payIntAmt" class="easyui-numberbox"
						data-options="width:'253px',height:'32px',min:0,precision:2,groupSeparator:','"/>
					</div>					
			</div>
			<div class="item">				
					<span class="label">是否全额还款：</span>
					<div class="fl item-ifo">
						<input id="clearPmt" name="clearPmt" class="easyui-combobox"
						data-options="width:'253px',height:'32px',valueField:'id',textField:'text',panelHeight: 'auto'"
						editable="false"></input>
					</div>					
			</div>
			<div class="item">				
					<span class="label">合计还款金额：</span>
					<div class="fl item-ifo">
						<input  editable="false" name="ttlPmtAmt" id="ttlPmtAmt" class="easyui-numberbox"
						data-options="width:'253px',height:'32px',min:0,precision:2,groupSeparator:','" required="true"/>
					</div>					
			</div>
			<div class="item">				
					<span class="label">信用额度金额：</span>
					<div class="fl item-ifo">
						<input  editable="false" name="lmtAmt" id="lmtAmt" class="easyui-numberbox"
						data-options="width:'253px',height:'32px',min:0,precision:2,groupSeparator:','" required="true"/>
					</div>					
			</div>
			<div class="item">				
					<span class="label">信用额度余额：</span>
					<div class="fl item-ifo">
						<input  editable="false" name="lmtBal" id="lmtBal" class="easyui-numberbox"
						data-options="width:'253px',height:'32px',min:0,precision:2,groupSeparator:','" required="true"/>
					</div>					
			</div>
			<div class="item">				
					<span class="label">借款余额：</span>
					<div class="fl item-ifo">
						<input  editable="false" name="ttlLoanBal" id="ttlLoanBal" class="easyui-numberbox"
						data-options="width:'253px',height:'32px',min:0,precision:2,groupSeparator:','"/>
					</div>					
			</div>
			<div class="item">				
					<span class="label">融资余额：</span>
					<div class="fl item-ifo">
						<input editable="false" name="openLoanAmt" id="openLoanAmt"
						class="easyui-numberbox"
						data-options="width:'253px',height:'32px',min:0,precision:2,groupSeparator:','"></input>
					</div>					
			</div>
			<div class="item">				
					<span class="label">应收账款可融资额度：</span>
					<div class="fl item-ifo">
						<input editable="false" name="arAvalLoan" id="arAvalLoan"
						class="easyui-numberbox"
						data-options="width:'253px',height:'32px',min:0,precision:2,groupSeparator:','"></input>
					</div>					
			</div>
			<div class="item">				
					<span class="label">应收费用：</span>
					<div class="fl item-ifo">
						<input  editable="false" name="currFinCost" id="currFinCost" class="easyui-numberbox"
						data-options="width:'253px',height:'32px',min:0,precision:2,groupSeparator:','"/>
					</div>					
			</div>
			<div class="item">				
					<span class="label">融资编号：</span>
					<div class="fl item-ifo">
						<input  type="text" name="loanId" id="loanId" class="easyui-validatebox combo"/>
					</div>					
			</div>
			<div class="item">				
					<span class="label">业务类别：</span>
					<div class="fl item-ifo">
						<input id="busiTp" name="busiTp" class="easyui-combobox"
						data-options="width:'253px',height:'32px',valueField:'id',textField:'text',panelHeight: 'auto'"
						editable="false"></input>
					</div>					
			</div>
			<div class="item">				
					<span class="label">授信客户编号：</span>
					<div class="fl item-ifo">
						<input  type="text" name="selId" id="selId" class="easyui-validatebox combo"/>
					</div>					
			</div>
			<div class="item">				
					<span class="label">利率：</span>
					<div class="fl item-ifo">
						<input  editable="false" name="loanRt" id="loanRt" class="easyui-numberbox"
						data-options="width:'253px',height:'32px',min:0,precision:4,groupSeparator:','"/>
					</div>					
			</div>
			<div class="item">				
					<span class="label">扣息方式：</span>
					<div class="fl item-ifo">
						<input id="payIntTp" name="payIntTp" class="easyui-combobox"
						data-options="width:'253px',height:'32px',valueField:'id',textField:'text',panelHeight: 'auto'"
						editable="false"></input>
					</div>					
			</div>
			<div class="item">				
					<span class="label">利息：</span>
					<div class="fl item-ifo">
						<input editable="false" name="intAmt"
						id="intAmt" class="easyui-numberbox"
						data-options="width:'253px',height:'32px',min:0,precision:2,groupSeparator:','"></input>
					</div>					
			</div>
			<div class="item">				
					<span class="label">融资状态：</span>
					<div class="fl item-ifo">
						<input id="finaSts" name="finaSts" class="easyui-combobox"
						data-options="width:'253px',height:'32px',valueField:'id',textField:'text',panelHeight: 'auto'"
						editable="false"></input>
					</div>					
			</div>
			<div class="item">				
					<span class="label">还款状态：</span>
					<div class="fl item-ifo">
						<input id="pmtSts" name="pmtSts" class="easyui-combobox"
						data-options="width:'253px',height:'32px',valueField:'id',textField:'text',panelHeight: 'auto'"
						editable="false"></input>
					</div>					
			</div>
			<div class="item">				
					<span class="label">放款资金来源：</span>
					<div class="fl item-ifo">
						<input id="advaPaytype" name="advaPaytype" class="easyui-combobox"
						data-options="width:'253px',height:'32px',valueField:'id',textField:'text',panelHeight: 'auto'"
						editable="false"></input>
					</div>					
			</div>
			<div class="item">				
					<span class="label">协议编号：</span>
					<div class="fl item-ifo">
						<input  type="text" name="cntrctNo" id="cntrctNo" class="easyui-validatebox combo"/>
					</div>					
			</div>
			<div class="item">				
						<input type="hidden" name="trxDt" id="trxDt"></input>
						<input type="hidden" id="ttlLoanBalHD" name="ttlLoanBalHD"/>
						<input type="hidden" id="ttlLoanAmt" name="ttlLoanAmt"/>
						<input type="hidden" id="finChgrt" name="finChgrt"/>
						<input type="hidden" id="lmtAmtHD" name="lmtAmtHD"/>
						<input type="hidden" id="openLoanAmtHD" name="openLoanAmtHD"/>
						<input type="hidden" id="arAvalLoanHD" name="arAvalLoanHD"/>
						<input type="hidden" id="finaStsHD" name="finaStsHD"/>
						<input type="hidden" name="pmtTimes" id="pmtTimes">
						<input type="hidden" name="theirRef" id="theirRef">
						<!-- 				利息总金额，to+到loanM表 -->
						<input type="hidden" name="ttlIntAmt" id="ttlIntAmt">
			</div>
		</div>
	</form>
</body>
</html>