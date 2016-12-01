<%@ page language="java" contentType="text/html; charset=UTF-8"
	import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>成员企业注册</title>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
<script src="script/cust/addCompany.js" type="text/javascript"></script>
</head>
<body class="UTSCF" style="width: 100%; margin: 0 auto">
	<form id="mainForm">
		<div id="userDiv" style="width: 100%" class="easyui-panel"
			title="成员企业信息" data-options="collapsible:true">
			<div class="item">
				<span class="label">成员企业编号：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo"
					data-options="validType:'maxLength[35]'"
					name="sysRefNo" id="sysRefNo"/>
				</div>
			</div>
			<div class="item">
					<span class="label">公司名称：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo"
						name="custNm" id="custNm" required="true"
						data-options="validType:'maxLength[32]'"/>
					</div>
			</div>
			<div class="item">
				<span class="label">地址：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo"
					name="regAddr" id="regAddr" required="true"
					data-options="validType:'maxLength[200]'"/>
				</div>
			</div>
			<div class="item">
				<span class="label">法定代表人：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo"
					data-options="validType:'maxLength[35]'"
					name="legalRepNm" id="legalRepNm"/>
				</div>
			</div>
			<div class="item">
				<span class="label">法人电话：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo"
						data-options="validType:'mobile'"
						name="legalMobPhone" id="legalMobPhone"/>
				</div>
			</div>
			<div class="item">
				<span class="label">联系人：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo"
					data-options="validType:'maxLength[50]'"
					name="contactPerson" id="contactPerson"/>
				</div>
			</div>
			<div class="item">
				<span class="label">联系人电话：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo"
						data-options="validType:'mobile'"
						name="mobPhone" id="mobPhone"/>
				</div>
			</div>
			<div class="item">
				<span class="label">备注：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo"
						name="remark" id="remark"
						data-options="validType:'maxLength[300]'"/>
					<input type="hidden" id="custTp" name="custTp" value="1" />
					<input type="hidden" id="busiUnit" name="busiUnit" value="${sysUserInfo.sysBusiUnit}">
				</div>
			</div>
		</div>
		<div class="easyui-panel" title="账号信息" data-options="collapsible:true"
			style="width: 100%">
			<div id="accountDiv">
				<div id="toolbar" style="overflow:hidden;">
					<a href="javascript:void(0)" class="easyui-linkbutton"
						iconcls="icon-add" onclick="addInfo()" plain="true" style="float:right;margin-right:14px;">添加</a> <a
						href="javascript:void(0)" class="easyui-linkbutton"
						iconcls="icon-edit" onclick="editInfo()" plain="true" style="float:right;">修改</a> <a
						href="javascript:void(0)" class="easyui-linkbutton"
						iconcls="icon-remove" onclick="deleteInfo()" plain="true" style="float:right;">删除</a>
				</div>
				<table class="easyui-datagrid" id="accountDg" cellspacing="0"
					cellpadding="0" style="width: 100%; height: auto"
					iconCls="icon-edit">
				</table>
			</div>
		</div>
	</form>
</body>
</html>