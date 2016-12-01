<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>还款手动核销页面</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/pmt/pointPmt.js"></script>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
</head>
<body class="UTSCF">
	<form id="loanPmtSubmit">
		<div id="loanDiv" style="width: 100%" class="easyui-panel"
			title="还款手动点销页面" data-options="collapsible:true">
			<div class="item">
				<span class="label">资金编号：</span>
				<div class="fl item-ifo">
					<input type="text" name="sysRefNo" id="sysRefNo"
						class="easyui-validatebox combo" />
				</div>
			</div>
			<div class="item">
				<span class="label">付款人账号：</span>
				<div class="fl item-ifo">
					<input type="text" name="selAcNo" id="selAcNo"
						class="easyui-validatebox combo" />
				</div>
			</div>
			<div class="item">
				<span class="label">入账账号：</span>
				<div class="fl item-ifo">
					<input type="text" name="payAcNo" id="payAcNo"
						class="easyui-validatebox combo" />
				</div>
			</div>
			<div class="item">
				<span class="label">还款金额：</span>
				<div class="fl item-ifo">
					<input editable="false" name="ttlPmtAmt" id="ttlPmtAmt"
						class="easyui-numberbox"
						data-options="width:'253px',height:'32px',min:0,precision:2,groupSeparator:','" />
				</div>
			</div>
			<div class="item">
				<span class="label">到账日期：</span>
				<div class="fl item-ifo">
					<input type="text" name="pmtDt" id="pmtDt"
						data-options="width:'253px',height:'32px'" class="easyui-datebox"
						editable="false"></input>
				</div>
			</div>
			<div class="item">
				<span class="label">付款人名称：</span>
				<div class="fl item-ifo">
					<input type="text" name="payerNm" id="payerNm"
						class="easyui-validatebox combo" />
				</div>
			</div>
			<div class="item">
				<span class="label">付款银行代码：</span>
				<div class="fl item-ifo">
					<input type="text" name="bkCd" id="bkCd"
						class="easyui-validatebox combo" />
				</div>
			</div>
			<div class="item">
				<span class="label">附言：</span>
				<div class="fl item-ifo">
					<input type="text" name="remark" id="remark"
						class="easyui-validatebox combo" />
				</div>
			</div>
			<div id="reResultDiv" style="display: block;" class="item">
				<span class="label">交易说明：</span>
				<div class="fl item-ifo">
					<input type="text" name="reResult" id="reResult"
						class="easyui-combobox"  editable="false"
							data-options="valueField: 'id',textField: 'text',
							panelHeight: 'auto',height:32,width:253,panelWidth:253"/>
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
				
			<div class="fl item-ifo">
				<input type="hidden" name="ccy" id="ccy" value="CNY"></input>
					
					<input type="hidden" name="trxDt" id="trxDt"/> 
					<input type="hidden" name="trxDtHD" id="trxDtHD" value="${sysUserInfo.sysDate }"/> 
					<!-- 判断是转场下还是点销 -->
					<input
					type="hidden" name="controlSts" id="controlSts"></input>
					<!-- 付款账号对应的供应商ID-->
					<input type="hidden" name="selId" id="selId"></input>
					<!-- 点销状态-->
					<input type="hidden" name="compSts" id="compSts"></input>
					<!-- 收益类型-->
					<input type="hidden" name="incomeFlag" id="incomeFlag"></input>
					<!-- 还款差值-->
					<input type="hidden" name="subAmt" id="subAmt"></input>
					
<!-- 					用于交换意见 -->
					<input type="hidden" id="userName" name="userName"
				value="${sysUserInfo.userName }" />
			</div>
		</div>
		<div class="easyui-panel" title="信息流信息"
			data-options="collapsible:true" style="width: 100%">
			<div id="loanDiv">
				<table class="easyui-datagrid" id="loanDg" cellspacing="0"
					cellpadding="0" style="width: 100%; height: auto"
					iconCls="icon-edit">
				</table>
			</div>
		</div>
	</form>
</body>
</html>