<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>融资申请页面</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/loan/invcPoolLoan.js"></script>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
</head>
<body class="UTSCF">
	<form id="loanSubmit">
		<div id="loanDiv" style="width: 100%" class="easyui-panel"
			title="融资信息" data-options="collapsible:true">
			<div class="item">
				<span class="label">融资编号：</span>
				<div class="fl item-ifo">
					<input type="text" name="sysRefNo" id="sysRefNo"
						class="easyui-validatebox combo" />
				</div>
			</div>
			<div class="item">
				<span class="label">协议编号：</span>
				<div class="fl item-ifo">
					<input type="text" name="cntrctNo" id="cntrctNo"
						class="easyui-validatebox combo" /> 
					<!-- <a class="btn" href="javascript:void(0)" id="protocol" onclick="showCntrct();">查看协议</a> -->
					<input type="button" id="protocol" 
					style="margin-left: 10px;width:100px; height: 32px"
					onclick="showCntrct()" class="dsIB mR10 hover white btnRed"
					value="查看协议" />
				</div>
			</div>
			<div class="item">
				<span class="label">业务类别：</span>
				<div class="fl item-ifo">
					<input id="busiTp" name="busiTp" class="easyui-combobox"
						data-options="width:'253px',height:'32px',valueField:'id',
					textField:'text',panelHeight: 'auto'"
						editable="false" />
				</div>
			</div>
			<div class="item">
				<span class="label">币种：</span>
				<div class="fl item-ifo">
					<input class="easyui-combobox" id=ccy name="ccy"
						data-options="width:'253px',height:'32px',
					valueField: 'sysRefNo',textField: 'textField',panelHeight: 'auto' "
						editable="false" required="true" />
				</div>
			</div>
			<div class="item">
				<span class="label">账号：</span>
				<div class="fl item-ifo">
					<input id="selAcNoHD" name="selAcNoHD" class="easyui-validatebox combo"
						editable="false" />
				</div>
			</div>
			<div class="item">
				<span class="label">账号名：</span>
				<div class="fl item-ifo">
					<input id="selAcNmHD" name="selAcNmHD" class="easyui-validatebox combo"
						editable="false" />
				</div>
			</div>
			<div class="item">
				<span class="label">账号开户行名：</span>
				<div class="fl item-ifo">
					<input id="selAcBkNmHD" name="selAcBkNmHD"
						class="easyui-validatebox combo" editable="false" />
				</div>
			</div>
			<div class="item">
				<span class="label">融资额度：</span>
				<div class="fl item-ifo">
					<input editable="false" name="arAvalLoan" id="arAvalLoan"
						class="easyui-numberbox"
						data-options="width:'253px',height:'32px',min:0,
					precision:2,groupSeparator:','" /> 
					<!-- <a class="btn" href="javascript:void(0)" id="adjustAmtBtn" onclick="adjustAmt();">额度不够?</a> -->
					<input type="button" id="adjustAmtBtn" 
					style="margin-left: 10px;width:100px; height: 32px"
					onclick="adjustAmt()" class="dsIB mR10 hover white btnRed"
					value="额度不够?" />
				</div>
			</div>
			<div class="item">
				<span class="label">融资余额：</span>
				<div class="fl item-ifo">
					<input editable="false" name="openLoanAmt" id="openLoanAmt"
						class="easyui-numberbox"
						data-options="width:'253px',height:'32px',min:0,
					precision:2,groupSeparator:','" />
				</div>
			</div>
			<div class="item">
				<span class="label">可融资额度：</span>
				<div class="fl item-ifo">
					<input editable="false" name="canLoan" id="canLoan"
						class="easyui-numberbox"
						data-options="width:'253px',height:'32px',min:0,
					precision:2,groupSeparator:','" />
				</div>
			</div>
			<div class="item">
				<span class="label">扣息方式：</span>
				<div class="fl item-ifo">
					<input class="easyui-combobox" id="payIntTp" name="payIntTp"
						data-options="width:'253px',height:'32px',
					valueField: 'id',textField: 'text',panelHeight: 'auto' "
						editable="false" required="true" />
				</div>
			</div>
			<div class="item">
				<span class="label">扣费方式：</span>
				<div class="fl item-ifo">
					<input class="easyui-combobox" id="payChgTp" name="payChgTp"
						data-options="width:'253px',height:'32px',
						valueField: 'id',textField: 'text',panelHeight: 'auto' "
						editable="false" required="true" />
				</div>
			</div>
			<div class="item">
				<span class="label">借款金额：</span>
				<div class="fl item-ifo">
					<input name="ttlLoanAmt" id="ttlLoanAmt" class="easyui-numberbox"
						required="true"
						data-options="width:'253px',height:'32px',
						min:0,precision:2,groupSeparator:',',validType:'maxLength[18]'" />
				</div>
			</div>
			<div class="item">
				<span class="label">融资起始日：</span>
				<div class="fl item-ifo">
					<input type="text" name="loanValDt" id="loanValDt"
						class="easyui-datebox" editable="false" required="true"
						data-options="width:'253px',height:'32px',panelWidth:'253px'" /> 
						<!-- <a class="btn" href="javascript:void(0)" id="calcBtn" onclick="showAccrualWindow();">利息计算器</a> -->
						<input type="button" id="calcBtn" 
						style="margin-left: 10px;width:100px; height: 32px"
						onclick="showAccrualWindow()" class="dsIB mR10 hover white btnRed"
						value="利息计算器" />
				</div>
			</div>
			<div class="item">
				<span class="label">融资到期日：</span>
				<div class="fl item-ifo">
					<input type="text" name="loanDueDt" id="loanDueDt"
						data-options="width:'253px',height:'32px',panelWidth:'253px'"
						class="easyui-datebox" editable="false" required="true" />
				</div>
			</div>
			<div class="item" id="accrualTr">
				<span class="label">利率：</span>
				<div class="fl item-ifo">
					<input name="loanRt" id="loanRt" class="easyui-numberspinner"
						data-options="width:'253px',height:'32px',min:0,
						precision:4,max:100,suffix:'%'"
						/>
				</div>
			</div>
			<div class="item" id="costTr">
				<span class="label">费率：</span>
				<div class="fl item-ifo">
					<input type="text" name="finChgrt" id="finChgrt"
						class="easyui-numberspinner"
						data-options="width:'253px',height:'32px',min:0,
					precision:4,max:100,suffix:'%'" />
				</div>
			</div>
			<div class="item">
				<span class="label">利息：</span>
				<div class="fl item-ifo">
					<input editable="false" name="accrualText" id="accrualText"
						class="easyui-numberbox"
						data-options="width:'253px',height:'32px',min:0,precision:2,
					groupSeparator:','" />
				</div>
			</div>
			<div class="item">
				<span class="label">费用：</span>
				<div class="fl item-ifo">
					<input editable="false" name="costText" id="costText"
						class="easyui-numberbox"
						data-options="width:'253px',height:'32px',min:0,
					precision:2,groupSeparator:','" />
				</div>
			</div>
			<div id="messageListDiv" style="display: block;">
					<div class="item">
						<span id="OldMessageSpan" style="display: block;" class="label">意见说明：</span>
						<div id="OldMessageDiv" style="display: block;" class="fl item-ifo">
							<input class="easyui-textbox"
								data-options="multiline:true,validType:'maxLength[500]'"
								style="width: 253PX; height: 50px" name="OldSysRelReason"
								id="OldSysRelReason" />
						</div>
						<span id="messageSpan" style="display: block;" class="label"></span>
						<div id="messageDiv" style="display: block;">
							<div  class="fl item-ifo">
								<input class="easyui-textbox"
									data-options="multiline:true,validType:'maxLength[500]'"
									style="width: 253PX; height: 50px" name="sysRelReason"
									id="sysRelReason" />
							</div>
						</div>
					</div>
				</div>
			<input type="hidden" name="trxDt" id="trxDt" value="${sysUserInfo.sysDate }"/> 
			<!-- 					借款余额 -->
			<input type="hidden" name="ttlLoanBal" id="ttlLoanBal" />
			<!-- 					融资比例 -->
			<input type="hidden" name="loanPerc" id="loanPerc" />
			<!-- 					融资状态 -->
			<input type="hidden" name="finaSts" id="finaSts" />
			<!-- 					客户编号 -->
			<input type="hidden" name="selId" id="selId" />
			<!-- 					授信客户名称-->
			<input type="hidden" name="selNm" id="selNm" />
			<!-- 					客户等级 -->
			<input type="hidden" name="custLevel" id="custLevel" />
			<!-- 					融资类型 -->
			<input type="hidden" name="finaTp" id="finaTp" />
<!-- 			<!-- 					开户行 --> 
<!-- 			<input type="hidden" name="selAcBkNoHD" id="selAcBkNoHD" /> -->
			<!-- 					账期，用于页面计算用 -->
			<input type="hidden" name="acctPeriod" id="acctPeriod" />
			<!-- 					用于格式化意见 -->
			<input type="hidden" id="userName" name="userName" value="${sysUserInfo.userName }" />
		</div>
	</form>
</body>
</html>