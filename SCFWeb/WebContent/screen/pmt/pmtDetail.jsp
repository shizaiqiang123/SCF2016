<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>还款进度查询页面</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/pmt/pmtDetail.js"></script>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
</head>
<body class="UTSCF">
	<form id="pmtSubmit">
		<div id="loanDiv" style="width: 100%" class="easyui-panel"
			title="还款信息" data-options="collapsible:true">
			<div class="item">				
					<span class="label">还款编号：</span>
					<div class="fl item-ifo">
						<input  type="text" name="sysRefNo" id="sysRefNo" class="easyui-validatebox combo"/>
					</div>					
			</div>
			<div class="item">				
					<span class="label">资金到帐日期：</span>
					<div class="fl item-ifo">
						<input type="text" name="pmtDt" id="pmtDt"
						class="easyui-datebox" editable="false"
						data-options="width:'253px',height:'32px',panelWidth:'253px'"></input>
					</div>					
			</div>
			<div class="item">				
					<span class="label">还款账户：</span>
					<div class="fl item-ifo">
						<input type="text" id="selAcNo" name="selAcNo" class="easyui-validatebox combo"></input>
					</div>					
			</div>
			<div class="item">
				<span class="label">还款户名：</span>
				<div class="fl item-ifo">
					<input id="selAcNm" name="selAcNm" class="easyui-validatebox combo"
						editable="false"></input>
				</div>
			</div>
			<div class="item">
				<span class="label">还款账号开户行名：</span>
				<div class="fl item-ifo">
					<input id="selAcBkNm" name="selAcBkNm"
						class="easyui-validatebox combo" editable="false"></input>
				</div>
			</div>
			<div class="item">				
					<span class="label">本次还本金金额：</span>
					<div class="fl item-ifo">
						<input name="payPrinAmt" id="payPrinAmt"
						class="easyui-numberbox" required="true"
						data-options="width:'253px',height:'32px',min:0,precision:2,groupSeparator:',',validType:'maxLength[18]'"></input>
					</div>					
			</div>
			<div class="item">				
					<span class="label">本次还利息金额：</span>
					<div class="fl item-ifo">
						<input name="payIntAmt" id="payIntAmt"
						class="easyui-numberbox" required="true"
						data-options="width:'253px',height:'32px',min:0,precision:2,groupSeparator:',',validType:'maxLength[18]'"></input>
					</div>					
			</div>
			<div class="item">				
					<span class="label">应收费用：</span>
					<div class="fl item-ifo">
						<input type="text" editable="false" name="currFinCost"
						id="currFinCost" class="easyui-numberbox"
						data-options="width:'253px',height:'32px',min:0,precision:2,groupSeparator:','"></input>
					</div>					
			</div>
			<div class="item">				
					<span class="label">合计还款金额：</span>
					<div class="fl item-ifo">
						<input name="ttlPmtAmt" id="ttlPmtAmt"
						class="easyui-numberbox" required="true"
						data-options="width:'253px',height:'32px',min:0,precision:2,groupSeparator:',',validType:'maxLength[18]'"></input>
					</div>					
			</div>
			<div class="item" id="inputtrCntrctNo">				
					<span class="label">协议编号：</span>
					<div class="fl item-ifo">
						<input type="hidden" name="cntrctNo" id="cntrctNo" class="easyui-validatebox combo"/>
					</div>					
			</div>
			<div class="item" id="inputtrBusiTp">				
					<span class="label">业务类别：</span>
					<div class="fl item-ifo">
						<input type="hidden" id="busiTp" name="busiTp" class="easyui-combobox"
						data-options="width:'253px',height:'32px',valueField:'id',textField:'text',panelHeight: 'auto'"
						editable="false"></input>
					</div>					
			</div>
			<div class="item" id="inputtrSelId">				
					<span class="label">授信客户编号：</span>
					<div class="fl item-ifo">
						<input type="hidden" name="selId" id="selId"
						class="easyui-validatebox combo" required="true"></input>
					</div>					
			</div>
			<div class="item" id="inputtrSelNm">				
					<span class="label">授信客户名称：</span>
					<div class="fl item-ifo">
						<input type="hidden" name="selNm" id="selNm"
						class="easyui-validatebox combo"></input>
					</div>					
			</div>
			<div class="item">				
					<span class="label">融资编号：</span>
					<div class="fl item-ifo">
						<input type="text" name="loanId" id="loanId" class="easyui-validatebox combo"/>
					</div>					
			</div>
			<div class="item">				
					<span class="label">借款金额：</span>
					<div class="fl item-ifo">
						<input name="ttlLoanAmt" id="ttlLoanAmt"
						class="easyui-numberbox" required="true"
						data-options="width:'253px',height:'32px',min:0,precision:2,groupSeparator:',',validType:'maxLength[18]'"></input>
					</div>					
			</div>
			<div class="item">				
					<span class="label">借款余额：</span>
					<div class="fl item-ifo">
						<input name="ttlLoanBal" id="ttlLoanBal"
						class="easyui-numberbox" required="true"
						data-options="width:'253px',height:'32px',min:0,precision:2,groupSeparator:',',validType:'maxLength[18]'"></input>
					</div>					
			</div>
			<div class="item">				
					<span class="label">融资起始日：</span>
					<div class="fl item-ifo">
						<input type="text" name="loanValDt" id="loanValDt"
						class="easyui-datebox" editable="false"
						data-options="width:'253px',height:'32px'"></input>
					</div>					
			</div>
			<div class="item">				
					<span class="label">融资到期日：</span>
					<div class="fl item-ifo">
						<input type="text" name="loanDueDt" id="loanDueDt"
						class="easyui-datebox" editable="false"
						data-options="width:'253px',height:'32px'"></input>
					</div>					
			</div>
			<div class="item" id="inputtrLmtAmt">				
					<span class="label">信用额度：</span>
					<div class="fl item-ifo">
						<input type="hidden" editable="false" name="lmtAmt"
						id="lmtAmt" class="easyui-numberbox"
						data-options="width:'253px',height:'32px',min:0,precision:2,groupSeparator:','"></input>
					</div>					
			</div>
			<div class="item" id="inputtrLmtBal">				
					<span class="label">信用额度余额：</span>
					<div class="fl item-ifo">
						<input type="hidden" editable="false" name="lmtBal"
						id="lmtBal" class="easyui-numberbox"
						data-options="width:'253px',height:'32px',min:0,precision:2,groupSeparator:','"></input>
					</div>					
			</div>
			<div class="item" id="inputtrArBal">				
					<span class="label">应收账款余额：</span>
					<div class="fl item-ifo">
						<input type="hidden" editable="false" name="arBal"
						id="arBal" class="easyui-numberbox"
						data-options="width:'253px',height:'32px',min:0,precision:2,groupSeparator:','"></input>
					</div>					
			</div>
			<div class="item" id="inputtrOpenLoanAmt">				
					<span class="label">融资余额：</span>
					<div class="fl item-ifo">
						<input type="hidden" editable="false" name="openLoanAmt"
						id="openLoanAmt" class="easyui-numberbox"
						data-options="width:'253px',height:'32px',min:0,precision:2,groupSeparator:','"></input>
					</div>					
			</div>
			<div class="item" id="inputtrArAvalLoan">				
					<span class="label">应收账款可融资额度：</span>
					<div class="fl item-ifo">
						<input type="hidden" editable="false" name="arAvalLoan" id="arAvalLoan"
						class="easyui-numberbox"
						data-options="width:'253px',height:'32px',min:0,precision:2,groupSeparator:','"></input>
					</div>					
			</div>
			<div class="item">				
					<span class="label">利率：</span>
					<div class="fl item-ifo">
						<input name="loanRt" id="loanRt"
						class="easyui-numberspinner"
						data-options="width:'253px',height:'32px',min:0,precision:4,max:100,suffix:'%'"
						required="true"></input>
					</div>					
			</div>
			<div class="item">				
					<span class="label">扣息方式：</span>
					<div class="fl item-ifo">
						<input class="easyui-combobox" id="payIntTp"
						name="payIntTp"
						data-options="width:'253px',height:'32px',valueField: 'id',textField: 'text',panelHeight: 'auto' "
						editable="false" required="true" />
					</div>					
			</div>
			<div class="item">				
					<span class="label">费率：</span>
					<div class="fl item-ifo">
						<input type="text" name="finChgrt" id="finChgrt"
						class="easyui-numberspinner"
						data-options="width:'253px',height:'32px',min:0,precision:4,max:100,suffix:'%'"></input>
					</div>					
			</div>
			<div class="item">				
					<span class="label">扣费方式：</span>
					<div class="fl item-ifo">
						<input class="easyui-combobox" id="payChgTp"
						name="payChgTp"
						data-options="width:'253px',height:'32px',valueField: 'id',textField: 'text',panelHeight: 'auto' "
						editable="false" required="true" />
					</div>					
			</div>
			<div class="item">				
					<span class="label">还款状态：</span>
					<div class="fl item-ifo">
						<input class="easyui-combobox" id="pmtSts" name="pmtSts"
						data-options="width:'253px',height:'32px',valueField: 'id',textField: 'text',panelHeight: 'auto' "
						editable="false" required="true" />
					</div>					
			</div>
			<!-- 					当前系统交易日：用于打印回执单 -->
					<input type="hidden" name="sysData" id="sysData" value="${sysUserInfo.sysDate }"/>
<!-- 					当前打印次数，回执单功能 -->
					<input type="hidden" name="buyerId" id="buyerId"/>
					<input type="hidden" name="buyerNm" id="buyerNm"/>
					<input type="hidden" name="buyerAc" id="buyerAc"/>
					<input type="hidden" name="buyerBkNm" id="buyerBkNm"/>
<!-- 					<input type="hidden" name="selId" id="selId"/> -->
					<input type="hidden" name="printNumber" id="printNumber"/>
<!-- 					<input type="hidden" name="selAc" id="selAc"/> -->
<!-- 					<input type="hidden" name="selNm" id="selNm"/> -->
					<input type="hidden" name="selBkNm" id="selBkNm"/>
		</div>
	</form>
</body>
</html>