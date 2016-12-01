<%@ page language="java" contentType="text/html; charset=UTF-8"
	import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<style type="text/css">
#mainDiv {
	text-align: center;
	align: center;
}

#mainDiv div, td {
	text-align: center;
	align: center;
}

input, button {
	border-width: 0;
	outline: 0;
	font-family: 'Microsoft Yahei';
}

div {
	margin: 0 0 0 0;
	padding: 0;
}

html, body, ul {
	margin: 0 auto;
	padding: 0;
}
</style>
<head>
<title>供应商信息查询报表</title>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script\cust\BuQueryCust.js"></script>
<script type="text/javascript" src="js/plugin/highchart/highcharts.js"></script>
</head>
<body class="UTSCF" style="width: 100%; margin: 0 0 0 0">
	<form id="supplierForm">
		<div id="regist">
			<div style="text-align: right; font-size: 16px; font-weight: 700;">
				<span>注册编号：</span><label id="lsysRefNo" name="lsysRefNo"></label>
			</div>
			<div style="width: 100%" class="easyui-panel form" title="供应商信息"
				data-options="collapsible:true">
				<div class="item">
					<span class="label">注册用户名：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo" name="userId"
							id="userId"></input>
					</div>
				</div>
				<div class="item">
					<span class="label">营业执照号码：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo"
							name="licenceNo" id="licenceNo" />
					</div>
				</div>
				<div class="item">
					<span class="label">法定代表人：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo"
							name="legalRepNm" id="legalRepNm" />
					</div>
				</div>
				<div class="item">
					<span class="label">法人手机号码：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo"
							name="legalMobPhone" id="legalMobPhone" />
					</div>
				</div>
				<div class="item">
					<span class="label">公司名称：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo" name="custNm"
							id="custNm" />
					</div>
				</div>
				<div class="item">
					<span class="label">地址：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo" name="regAddr"
							id="regAddr" />
					</div>
				</div>
				<div class="item">
					<span class="label">备注：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo" name="remark"
							id="remark" />
					</div>
				</div>
			</div>

			<div id="personDiv" style="width: 100%" class="easyui-panel form"
				title="管理员联系方式" data-options="collapsible:true">
				<div class="item">
					<span class="label">联系人姓名：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo"
							name="contactPerson" id="contactPerson" />
					</div>
				</div>
				<div class="item">
					<span class="label">手机号码：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo"
							name="mobPhone" id="mobPhone" />
					</div>
				</div>
				<div class="item">
					<span class="label">邮箱：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo" name="email"
							id="email" />
					</div>
				</div>
			</div>

			<div id="limitDiv" style="width: 100%; display: block;"
				class="easyui-panel form" title="额度信息"
				data-options="collapsible:true">
				<div class="item">
					<span class="label">信用额度：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo" name="lmtAmt"
							id="lmtAmt" />
					</div>
				</div>
				<div class="item">
					<span class="label">应收账款总额：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo" name="arBal"
							id="arBal" />
					</div>
				</div>
				<div class="item">
					<span class="label">最大可融资额度：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo"
							name="arAvalLoan" id="arAvalLoan" />
					</div>
				</div>
				<div class="item">
					<span class="label">当前可融资额度：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo" name="arOpen"
							id="arOpen" />
					</div>
				</div>
				<div class="item">
					<span class="label">融资余额：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo"
							name="openLoanAmt" id="openLoanAmt" />
					</div>
				</div>

			</div>

			<div id="loanDiv" class="easyui-panel form" title="额度报表"
				data-options="collapsible:true"
				style="width: 100%; height: 600px; min-height: 150px; display: block;">
				<div id="loan"
					style="width: 98%; height: 99%; min-height: 20%; min-width: 20%; max-width: 120%; min-height: 20%; max-height: 120%;"></div>
			</div>


			<div id="companyDiv" class="easyui-panel" title="成员企业信息"
				data-options="collapsible:true" style="width: 100%">
				<table class="easyui-datagrid" id="companyDg" cellspacing="0"
					cellpadding="0" style="width: 100%; height: auto"
					iconCls="icon-edit">
				</table>
			</div>

			<div id="acNoDiv" class="easyui-panel" title="账号信息"
				data-options="collapsible:true" style="width: 100%;display: block;">
				<table class="easyui-datagrid" id="acNoDg" cellspacing="0"
					cellpadding="0" style="width: 100%; height: auto"
					iconCls="icon-edit">
				</table>
			</div>

			<input type="hidden" id="sysRefNo" name="sysRefNo" /> <input
				type="hidden" id="userOwnerid" name="userOwnerid" /> <input
				type="hidden" id="buyerId" name="buyerId" />
			<!-- 				登陆用户的 -->
			<input type="hidden" id="sysBuyerId" name="sysBuyerId" />
		</div>
	</form>
</body>
</html>