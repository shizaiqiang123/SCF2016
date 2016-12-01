<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/user/InstInfo.js"></script>
<title>机构管理</title>
</head>
<body class="UTSCF">
	<div id="Inst" class="div_ul">
		<div id="instdiv">
			<form id="InstForm">
				<div id="userFormDiv" style="width: 100%" class="easyui-panel"
					title="机构信息" data-options="collapsible:true">

					<div class="item">
						<span class="label">机构编号：</span>
						<div class="fl item-ifo">
							<input type="text" class="easyui-validatebox combo" name="orgId"
								id="orgId"></input>
						</div>
					</div>

					<div class="item">
						<span class="label">机构名称：</span>
						<div class="fl item-ifo">
							<input type="text" class="easyui-validatebox combo"
								required="true" name="orgNm" id="orgNm"></input>
						</div>
					</div>

					<div class="item">
						<span class="label">机构号：</span>
						<div class="fl item-ifo">
							<input type="text" class="easyui-validatebox combo"
								required="true" name="bankOrgId" id="bankOrgId"></input>
						</div>
					</div>

					<div class="item">
						<span class="label">上层机构：</span>
						<div class="fl item-ifo">
							<input type="text" class="easyui-combotree combo" name="blgOrgid"
								id="blgOrgid" required="true"
								data-options="valueField: 'id',textField: 'text',panelHeight: 'auto',height:32,width:253,panelWidth:253"
								editable="false" /></input>
						</div>
					</div>

					<div class="item">
						<span class="label">住所地：</span>
						<div class="fl item-ifo">
							<input type="text" class="easyui-validatebox combo"
								required="true" name="orgAddr" id="orgAddr"></input>
						</div>
					</div>
					<div class="item">
						<span class="label">邮编：</span>
						<div class="fl item-ifo">
							<input type="text" name="postcode" id="postcode"
								class="easyui-validatebox combo" required="true"
								data-options="missingMessage:'请输入正确的6位邮编。',validType:'postcode' " />
						</div>
					</div>
				<div>
					<input type="hidden" id="blgOrgidRel" name="blgOrgidRel" /> 
					<input	type="hidden" id="orgIdRel" name="orgIdRel" /> 
					<input type="hidden" id="sysRefNo" name="sysRefNo" /> 
					<input type="hidden" id="blgOrgNm" name="blgOrgNm" /> 
				 	<input type="hidden" id="orgLevel" name="orgLevel" /> 
					<input type="hidden" id="acRef" name="acRef" /> 
					<input type="hidden" id="userOrgId" name="userOrgId" /> 
					<input type="hidden" id="sysOrgId" name="sysOrgId" />
					<%-- <input type="text" id="sysOrgId" name="sysOrgId" value="${sysUserInfo.userOrgId }"/> --%>
				</div>

				</div>
			</form>
		</div>
	</div>
</body>
</html>