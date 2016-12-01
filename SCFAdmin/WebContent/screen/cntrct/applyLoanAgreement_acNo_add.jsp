<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>融资协议申请</title>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript"
	src="script/cntrct/applyLoanAgreement_acNo_add.js"></script>
</head>
<body>
	<form id="mainForm">
		<div id="applyLoanDiv" style="width: 100%" class="easyui-panel"
			title="应收款融资协议签约信息" data-options="collapsible:true">

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
						data-options="valueField: 'busiTp',textField: 'productNm',
						panelHeight: 'auto',width:'253px',height:'32px',panelWidth:253"
						editable="false" />
				</div>
			</div>
			<div class="item">
				<span class="label">授信客户编号：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo"
						data-options="validType:'maxLength[35]'" name="selId" id="selId"
						value="${sysUserInfo.userOwnerId }" />
				</div>
			</div>
			<div class="item">
				<span class="label">授信客户名称：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo"
						data-options="validType:'maxLength[200]'" name="selNm" id="selNm"
						onclick="showDetails()" />
				</div>
			</div>
			<div class="item">
				<span class="label">成员企业编号</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo" name="buyerId"
						id="buyerId" onblur="releaseText2()" required="true" />
				</div>
			</div>
			<div class="item">
				<span class="label">成员企业名称</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo" name="buyerNm"
						id="buyerNm" /> <input type="text" name="acNm" id="acNm" /> <input
						type="text" name="acNo" id="acNo" /> <input type="text"
						name="acBkNm" id="acBkNm" />
				</div>
			</div>
		</div>
		<div id="companyDiv" class="easyui-panel" title="账号信息"
			data-options="collapsible:true" style="width: 100%">
			<div id="toolbar" style="overflow:hidden;">
				<a href="javascript:void(0)" class="easyui-linkbutton"
					iconcls="icon-add" onclick="addAcNo()" plain="true" style="float:right;margin-right:14px;">添加</a> <a
					href="javascript:void(0)" class="easyui-linkbutton"
					iconcls="icon-remove" onclick="deleteAcNo()" plain="true" style="float:right;">删除</a>
			</div>
			<table class="easyui-datagrid" id="dg" cellspacing="0"
				cellpadding="0" style="width: 100%; height: auto"
				iconCls="icon-edit">
			</table>
		</div>
	</form>
</body>
</html>