<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>审核额度调整申请</title>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
<script type="text/javascript"
	src="script/cntrct/verifyLoanAgreementChg.js"></script>
</head>
<body class="UTSCF" style="width: 100%; margin: 0 auto">
	<form id="mainForm">
		<div id="applyLoanDiv" style="width: 100%" class="easyui-panel"
			title="审核额度调整申请信息" data-options="collapsible:true">
			<div class="item">
				<span class="label">协议编号：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo"
						data-options="validType:'maxLength[35]'" name="sysRefNo"
						id="sysRefNo" />
				</div>
			</div>
			<div class="item">
				<span class="label">协议文本编号：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo"
						data-options="validType:'maxLength[35]'" name="cntrctNo"
						id="cntrctNo" />
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
						data-options="valueField: 'id',textField: 'text',panelHeight: 'auto',width:'253px',height:'32px'"
						editable="false" />
				</div>
			</div>
			<div class="item">
				<span class="label">融资模式：</span>
				<div class="fl item-ifo">
					<input class="easyui-combobox" id="finaTp" name="finaTp"
						required="true"
						data-options="valueField: 'id',textField: 'text',panelHeight: 'auto',width:'253px',height:'32px'"
						editable="false" />
				</div>
			</div>
			<div class="item">
				<span class="label">授信客户编号：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo"
						data-options="validType:'maxLength[35]'" name="selId" id="selId" />
				</div>
			</div>
			<div class="item">
				<span class="label">授信客户名称：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo"
						data-options="validType:'maxLength[35]'" name="selNm" id="selNm" />
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
				<span class="label">融资比例：</span>
				<div class="fl item-ifo">
					<input name="loanPerc" id="loanPerc" class="easyui-numberspinner"
						required="true"
						data-options="min:0,max:100,suffix:'%',width:'253px',height:'32px',precision:2" />
				</div>
			</div>
			<div class="item">
				<span class="label">可融资额度：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-numberbox"
						data-options="width:'253px',height:'32px',min:0,precision:2,groupSeparator:',',validType:'maxLength[18]'"
						name="arAvalLoan" id="arAvalLoan" />
					<!-- <a href="javascript:void(0)" id="calculateArAvalLoan" onclick="calculateArAvalLoan()" class="btn">计算可融资额度</a> -->
				</div>
			</div>
			<div class="item">
				<span class="label">原信用额度：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-numberbox"
						data-options="width:'253px',height:'32px',min:0,precision:2,groupSeparator:',',validType:'maxLength[18]'"
						name="preLmtAmt" id="preLmtAmt"/>
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
				<span class="label">额度增加额：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-numberbox"
						data-options="width:'253px',height:'32px',min:0,precision:2,groupSeparator:',',validType:'maxLength[18]'"
						name="chgLmtAmt" id="chgLmtAmt"/>
				</div>
			</div>
			<div class="item">
				<span class="label">调整后信用额度：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-numberbox"
						data-options="width:'253px',height:'32px',min:0,precision:2,groupSeparator:',',validType:'maxLength[18]'"
						name="lmtAmt" id="lmtAmt"/>
				</div>
			</div>
			<div class="item">
				<span class="label">扣息方式：</span>
				<div class="fl item-ifo">
					<input id="payIntTp" name="payIntTp" class="easyui-combobox"
						required="true"
						data-options="valueField: 'id',textField: 'text',panelHeight: 'auto',width:'253px',height:'32px'"
						editable="false" />
				</div>
			</div>
			<div class="item">
				<span class="label">扣费方式：</span>
				<div class="fl item-ifo">
					<input class="easyui-combobox" id="payChgTp" name="payChgTp"
						required="true"
						data-options="valueField: 'id',textField: 'text',panelHeight: 'auto',width:'253px',height:'32px'"
						editable="false" />
				</div>
			</div>
			<div class="item">
				<span class="label">户名：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo"
						data-options="validType:'maxLength[70]'" name="acNm" id="acNm"
						value="${sysUserInfo.userName }" />
				</div>
			</div>
			<div class="item">
				<span class="label">账号：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo"
						data-options="validType:['maxLength[40]','number','minLength[11]']"
						name="acNo" id="acNo" />
				</div>
			</div>
			<div class="item">
				<span class="label">开户银行：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo"
						data-options="validType:'maxLength[70]'" name="acBkNm" id="acBkNm" />
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
					<input type="text" class="easyui-validatebox combo" name="buyerNm"
						id="buyerNm" />
					<input type="hidden" name="trxDt" id="trxDt">
					<input type="hidden" name="approvalSts" id="approvalSts">
					<input type="hidden" id="userId" name="userId" value="${sysUserInfo.userOwnerId }">
					<input type="hidden" id="chgSts" name="chgSts">
					<input type="hidden" id="arBal" name="arBal">
					<!-- 					用于交换意见 -->
					<input type="hidden" id="userName" name="userName"
				value="${sysUserInfo.userName }" />
				</div>
			</div>
		</div>
		<div id="reasonDiv" style="width: 100%" class="easyui-panel form"
			title="处理意见" data-options="collapsible:true">
			<div class="item">
				<span class="label">处理意见：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-combobox" required="true"
						editable="false"
						data-options="valueField: 'id',textField: 'text',panelHeight: 'auto',height:32,width:253,panelWidth:253"
						name="lmtSts" id="lmtSts" />
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
									style="width: 253PX; height: 50px" name="sysRelReason"
									data-options="multiline:true,validType:'maxLength[500]'"
									id="sysRelReason" />
							</div>
						</div>
					</div>
				</div>
		</div>
	</form>
</body>
</html>