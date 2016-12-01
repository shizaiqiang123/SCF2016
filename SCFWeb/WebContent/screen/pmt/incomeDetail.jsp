<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>营业外收入账详细信息</title>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="script/pmt/incomeDetail.js"></script>
</head>
<body class="UTSCF" style="width: 100%; margin: 0 auto">
	<form id="mainForm">
		<div id="applyLoanDiv" style="width: 100%" class="easyui-panel"
			title="营业外收入账信息" data-options="collapsible:true">
			<div class="item">
				<span class="label">交易流水号：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo"
						data-options="validType:'maxLength[35]'" name="sysRefNo"
						id="sysRefNo" />
				</div>
			</div>
			<div class="item">
				<span class="label">协议编号：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo"
						data-options="validType:'maxLength[35]'" name="cntrctNo"
						id="cntrctNo" />
				</div>
			</div>
			<div class="item">
				<span class="label">关联编号：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo"
						data-options="validType:'maxLength[35]'" name="theirRef"
						id="theirRef" />
				</div>
			</div>
			<div class="item">
				<span class="label">营业外收益总金额：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo"
						data-options="validType:'maxLength[18]'" name="incomeAmt" id="incomeAmt"/>
				</div>
			</div>
			<div class="item">
				<span class="label">本次营业外收益金额：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-numberbox"
						data-options="width:'253px',height:'32px',min:0,precision:2,groupSeparator:',',validType:'maxLength[18]'"
						name="currIncomeAmt" id="currIncomeAmt"/>
				</div>
			</div>
			<div class="item">
				<span class="label">收益类型：</span>
				<div class="fl item-ifo">
					<input class="easyui-combobox" id="incomeFlag" name="incomeFlag"
						data-options="valueField: 'id',textField: 'text',panelHeight: 'auto',width:'253px',height:'32px'"
						editable="false" />
				</div>
			</div>
			<div class="item">
				<span class="label">户名：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo"
						data-options="validType:'maxLength[70]'" name="selAcNm" id="selAcNm" />
				</div>
			</div>
			<div class="item">
				<span class="label">账号：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo"
						data-options="validType:['maxLength[40]','number','minLength[11]']"
						name="selAcNo" id="selAcNo" />
				</div>
			</div>
			<div class="item">
				<span class="label">开户银行：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo"
						data-options="validType:'maxLength[70]'" name="selAcBkNm" id="selAcBkNm" />
				</div>
			</div>
			<div class="item">
					<span class="label">备注：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo"
							data-options="validType:'maxLength[300]',multiline:true"
							name="remark" id="remark" />
					</div>
			</div>
			<div class="item">
				<span class="label">收益项目：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo"
						data-options="validType:'maxLength[70]'" name="incomItem" id="incomItem" />
				</div>
			</div>
			<div class="item">
				<span class="label">接口状态：</span>
				<div class="fl item-ifo">
					<input class="easyui-combobox" id="sysGapiSts" name="sysGapiSts"
						data-options="valueField: 'id',textField: 'text',panelHeight: 'auto',width:'253px',height:'32px'"
						editable="false" />
				</div>
			</div>
		</div>
	</form>
</body>
</html>