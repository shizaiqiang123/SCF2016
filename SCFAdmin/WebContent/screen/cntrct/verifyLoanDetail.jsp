<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>审核融资协议申请</title>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="script/cntrct/verifyLoanDetail.js"></script>
</head>
<body class="UTSCF" style="width: 100%; margin: 0 auto">
	<form id="mainForm">
		<div id="applyLoanDiv" style="width: 100%" class="easyui-panel"
			title="协议签约信息" data-options="collapsible:true">
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
						data-options="valueField: 'id',textField: 'text',panelHeight: 'auto',width:'253px',height:'32px'"
						editable="false" />
				</div>
			</div>
			<div class="item">
				<span class="label">融资模式：</span>
				<div class="fl item-ifo">
					<input class="easyui-combobox" id="finaTp" name="finaTp"
						data-options="valueField: 'id',textField: 'text',panelHeight: 'auto',width:'253px',height:'32px'"
						editable="false" />
				</div>
			</div>
			<div class="item">
				<span class="label">公司编号：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo"
						data-options="validType:'maxLength[35]'" name="selId" id="selId" />
				</div>
			</div>
			<div class="item">
				<span class="label">公司名称：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo"
						data-options="validType:'maxLength[35]'" name="selNm" id="selNm" />
				</div>
			</div>
			<!-- <div class="item">
				<span class="label">应收账款总额度：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-numberbox"
						data-options="width:'253px',height:'32px',min:0,precision:2,groupSeparator:',',validType:'maxLength[18]'"
						name="sumArBal" id="sumArBal"/>
				</div>
			</div> -->
			<div class="item">
				<span class="label">币别：</span>
				<div class="fl item-ifo">
					<input class="easyui-combobox" id="lmtCcy" name="lmtCcy"
						data-options="width:'253px',height:'32px',valueField: 'sysRefNo',textField: 'textField',panelHeight: 'auto' "
						editable="false" required="true" />
				</div>
			</div>
			<div class="item">
				<span class="label">应收账款金额：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-numberbox"
						data-options="width:'253px',height:'32px',min:0,precision:2,groupSeparator:',',validType:'maxLength[18]'"
						name="arBal" id="arBal"/>
				</div>
			</div>
			<div class="item">
				<span class="label">融资比例：</span>
				<div class="fl item-ifo">
					<input name="loanPerc" id="loanPerc" class="easyui-numberspinner"
						data-options="min:0,max:100,suffix:'%',width:'253px',height:'32px',precision:2" />
				</div>
			</div>
			<div class="item">
				<span class="label">可融资额度：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-numberbox"
						data-options="width:'253px',height:'32px',min:0,precision:2,groupSeparator:',',validType:'maxLength[18]'"
						name="arAvalLoan" id="arAvalLoan"/>
				</div>
			</div>
			<div class="item">
				<span class="label">扣息方式：</span>
				<div class="fl item-ifo">
					<input id="payIntTp" name="payIntTp" class="easyui-combobox"
						data-options="valueField: 'id',textField: 'text',panelHeight: 'auto',width:'253px',height:'32px'"
						editable="false" />
				</div>
			</div>
			<div class="item">
				<span class="label">扣费方式：</span>
				<div class="fl item-ifo">
					<input class="easyui-combobox" id="payChgTp" name="payChgTp"
						data-options="valueField: 'id',textField: 'text',panelHeight: 'auto',width:'253px',height:'32px'"
						editable="false" />
				</div>
			</div>
			<div class="item">
				<span class="label">户名：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo"
						data-options="validType:'maxLength[70]'" name="acNm" id="acNm" />
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
						id="buyerId" />
				</div>
			</div>
			<div class="item">
				<span class="label">成员企业名称</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo" name="buyerNm"
						id="buyerNm" />
					<input type="hidden" id="licenceNo" name="licenceNo">
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
							name="approvalSts" id="approvalSts" />
					</div>
				</div>
<!-- 				<div class="item"> -->
<!-- 					<span class="label">意见说明：</span> -->
<!-- 					<div class="fl item-ifo"> -->
<!-- 						<input class="easyui-textbox" -->
<!-- 							data-options="missingMessage:'输入项为必输项',multiline:true,validType:'maxLength[500]'" -->
<!-- 							style="width: 253PX; height: 50px" name="sysRelReason" id="sysRelReason" /> -->
<!-- 					</div> -->
<!-- 				</div> -->
		</div>
	</form>
</body>
</html>