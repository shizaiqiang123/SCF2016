<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>授信额度调整申请</title>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/cntrct/editLoanAgreement.js"></script>
</head>
<body>
	<div id="editLoanDiv" style="width: 100%" class="easyui-panel"
		title="应收款融资协议签约信息" data-options="collapsible:true">
		<form id="mainForm">
			<div class="item">
				<span class="label">协议编号：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo"
						data-options="validType:'maxLength[35]'" name="sysRefNo"
						id="sysRefNo" />
				</div>
			</div>
			<!-- <div class="item">
				<span class="label">交易日期：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-datebox "
						data-options="width:'253px',height:'32px',panelWidth:253"
						name="trxDt" id="trxDt" editable="false" />
				</div>
			</div> -->
			<div class="item">
				<span class="label">协议文本编号：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo"
						data-options="validType:'maxLength[35]'" name="cntrctNo"
						id="cntrctNo" />
					<!-- <a href="javascript:void(0)" id="queryCntrct" onclick="showCntrct()" class="btn">查看协议文本</a> -->
				</div>
			</div>
			<div class="item">
				<span class="label">协议文本生效期：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-datebox "
						data-options="width:'253px',height:'32px',panelWidth:253"
						name="dueDt" id="dueDt" editable="false" />
				</div>
			</div>
			<div class="item">
				<span class="label">业务类别：</span>
				<div class="fl item-ifo">
					<input class="easyui-combobox" id="busiTp" name="busiTp"
						required="true"
						data-options="valueField: 'id',textField: 'text',
						panelHeight: 'auto',width:'253px',height:'32px',panelWidth:253"
						editable="false" />
				</div>
			</div>
			<div class="item">
				<span class="label">融资模式：</span>
				<div class="fl item-ifo">
					<input class="easyui-combobox" id="finaTp" name="finaTp"
						required="true"
						data-options="valueField: 'id',textField: 'text',
						panelHeight: 'auto',width:'253px',height:'32px',panelWidth:253"
						editable="false" />
				</div>
			</div>
			<div class="item">
				<span class="label">公司编号：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo"
						data-options="validType:'maxLength[35]'" name="selId" id="selId"
						value="${sysUserInfo.userOwnerId }" />
				</div>
			</div>
			<div class="item">
				<span class="label">公司名称：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo"
						data-options="validType:'maxLength[200]'" name="selNm" id="selNm"/>
				</div>
			</div>
			<div class="item">
				<span class="label">成员企业编号</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo" name="buyerId"
					id="buyerId" required="true" /> 
				</div>
			</div>
			<div class="item">
				<span class="label">成员企业名称</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo" name="buyerNm" id="buyerNm" /> 
				</div>
			</div>
			<div class="item">
				<span class="label">币别：</span>
				<div class="fl item-ifo">
					<input class="easyui-combobox" id="lmtCcy" name="lmtCcy"
						data-options="width:'253px',height:'32px',valueField: 'sysRefNo',textField: 'textField',panelHeight: 'auto' "
						editable="false" />
				</div>
			</div>
			<div class="item">
				<span class="label">应收账款可融资额度：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-numberbox"
						data-options="width:'253px',height:'32px',min:0,precision:2,groupSeparator:',',validType:'maxLength[18]'"
						name="arAvalLoan" id="arAvalLoan"/>
				</div>
			</div>
			<div class="item">
				<span class="label">信用额度：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-numberbox"
						data-options="width:'253px',height:'32px',min:0,precision:2,groupSeparator:',',validType:'maxLength[18]'"
						name="lmtAmt" id="lmtAmt"/>
				</div>
			</div>
			<div class="item">
				<span class="label">融资余额：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-numberbox"
						data-options="width:'253px',height:'32px',min:0,precision:2,groupSeparator:',',validType:'maxLength[18]'"
						name="openLoanAmt" id="openLoanAmt"/>
				</div>
			</div>
			<div class="item">
				<span class="label">当前可融资额度：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-numberbox"
						data-options="width:'253px',height:'32px',min:0,precision:2,groupSeparator:',',validType:'maxLength[18]'"
						name="currentLoanAmt" id="currentLoanAmt"/>
				</div>
			</div>
			<div class="item">
				<span class="label">额度增加额：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-numberbox"
						data-options="width:'253px',height:'32px',min:0,precision:2,groupSeparator:',',validType:'maxLength[18]'"
						name="chgLmtAmt" id="chgLmtAmt"/>
					<input type="hidden" id="trxDt" name="trxDt" value="${sysUserInfo.sysDate }">
					<input type="hidden" name="approvalSts" id="approvalSts" />
					<input type="hidden" id="userId" name="userId" value="${sysUserInfo.userOwnerId }">
					<input type="hidden" id="lmtSts" name="lmtSts">
					<input type="hidden" id="chgSts" name="chgSts">
					<input type="hidden" id="payChgTp" name="payChgTp">
					<input type="hidden" id="loanPerc" name="loanPerc">
					<input type="hidden" id="arbal" name="arbal">
					<input type="hidden" id="payIntTp" name="payIntTp">
					<!-- 					用于交换意见 -->
					<input type="hidden" id="userName" name="userName"
				value="${sysUserInfo.userName }" />
				</div>
			</div>
			<div class="item">
					<span class="label">备注：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-textbox"
							data-options="validType:'maxLength[500]',multiline:true"
							name="remark" id="remark" style="width: 253PX; height: 50px"/>
					</div>
			</div>
			
			<!-- <div class="item item-new">
				<span class="label">&nbsp;</span>
				<div class="fl item-ifo">
					<input type="checkbox" class="checkbox" id="readme" /> <label
						for="protocal"> 我已阅读并同意<span class="blue hover"
						id="protocol" onclick="showProtocol();">《应收款融资协议》</span>
					</label> <span class="clr"></span> <label id="protocol_error"
						class="error hide">请接受服务条款</label>
				</div>
			</div> -->
		</form>
	</div>
</body>
</html>