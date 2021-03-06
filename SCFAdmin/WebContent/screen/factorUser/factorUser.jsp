<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<!-- <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> -->
<title>保理商用户页面</title>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="script/factorUser/factorUser.js"></script>
</head>
<body class="UTSCF" style="width: 100%; margin: 0 auto">
	<form id="userAddForm">
		<div id="userDiv" style="width: 100%" class="easyui-panel"
			title="用户信息" data-options="collapsible:true">
			<div class="item">
				<span class="label">登陆ID：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo"
						onchange="RegVerBox()" name="userId" id="userId" required="true"
						data-options="validType:['maxLength[20]','noChinese','minLength[4]']" />
				</div>
			</div>
			<div class="item">
				<span class="label">用户姓名：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo" name="userNm"
						id="userNm" required="true"
						data-options="validType:'maxLength[35]'" />
				</div>
			</div>
			<div class="item" style="padding: 0px 5px;" id="inputtrUserType">
				<span class="label">用户类型：</span>
				<div class="fl item-ifo" style="margin-top: 10px;">
					供应链金融用户<input type="radio" name="userType" id="userType1" value="1"
						onclick="bailianUser()" checked="checked" /> 成员企业用户<input
						type="radio" name="userType" id="userType2" value="2"
						onclick="companyUser()" />
				</div>
			</div>
			<div class="item">
				<span class="label">所属公司名称：</span>
				<div class="fl item-ifo">
					<input id="userOwnerid" class="easyui-combobox"
						data-options="valueField:'sysRefNo',textField:'custNm',panelHeight: 'auto',width:'253px',height:'32px',onSelect:checkBusiUnit"
						editable="false" name="userOwnerid"  required="true"/>
				</div>
			</div>
			<!-- 				<td>用户角色：</td> -->
			<!-- 				<td><select class="easyui-combobox"  id="roleIdBox" name="roleId" -->
			<!-- 				 	data-options="valueField:'roleId',textField: 'roleName',panelHeight: 'auto'"   -->
			<!-- 				 	style="width:150px;" editable="false" required="true"> -->
			<!-- 				</select></td> -->
			<!-- <div class="item">
				<span class="label">所属机构：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-combotree combo"
						data-options="valueField:'id',textField: 'text',panelHeight: 'auto',width:'253px',height:'32px'"
						name="ownerBrId" id="ownerBrId" required="true" editable="false" />
				</div>
			</div> -->
			<!-- <div class="item" id="inputtrCompany">
				<span class="label">所属成员企业：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-combobox"
						data-options="valueField:'sysRefNo',textField: 'custNm',panelHeight: 'auto',width:'253px',height:'32px',onSelect:setUserOwnerid"
						name="companyOwnerid" id="companyOwnerid" editable="false" />
				</div>
			</div> -->
			<div class="item">
				<span class="label">电子邮箱：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo"
						data-options="validType:'email'" name="email" id="email"
						required="true" />
				</div>
			</div>
			<div class="item">
				<span class="label">移动电话：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo"
						data-options="validType:'mobile'" name="mobPhone" id="mobPhone"
						required="true" />
				</div>
			</div>

			<div class="item">
				<span class="label">电话号码：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo"
						data-options="validType:'telphone'" name="telPhone" id="telPhone" />
				</div>
			</div>
			<div class="item">
				<span class="label">分机号：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo"
						data-options="validType:'telphone'" name="extTel" id="extTel" />
				</div>
			</div>
			<div class="item">
				<span class="label">职务：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo" name="title"
						id="title" data-options="validType:'maxLength[35]'" />
				</div>
			</div>
			<div class="item">
				<div class="fl item-ifo">
					<input type="hidden" name="sysRefNo" id="sysRefNo" /> 
					<input type="hidden" name="sysEventTimes" id="sysEventTimes" value="1" />
					<input type="hidden" id="pwdTp" name="pwdTp" value="0" /> 
					<input type="hidden" id="userTp" name="userTp" value="2" /> 
					<input type="hidden" id="password" name="password" /> 
					<input type="hidden" name="sysBusiUnit" id="sysBusiUnit" value="${sysUserInfo.sysBusiUnit}" /> 
					<input type="hidden" name="busiUnit" id="busiUnit" /> 
					<input type="hidden" name="pwdDueDt" id="pwdDueDt" value="${sysUserInfo.sysDate}" /> 
					<input type="hidden" name="userStatus" id="userStatus" /> 
				</div>
			</div>
		</div>
		<div class="easyui-panel" title="用户角色选择列表"
			data-options="collapsible:true" style="width: 100%; height: 300px">
			<div id="roleDiv">
				<input type="hidden" name="roleHD" id="roleHD">
				<table id="roleTable" align="center" border=0 width=100%
					style="table-layout: fixed">
					<tr>
						<td width=30% align="right">
							<p>系统支持的角色:</p> <select style="width: 200px" id="myselect"
							name="myselect" size="10" multiple onchange="selectChange()">
						</select>
						</td>
						<td width=20% colspan="2" align="center"><input id="add"
							name="add" type="button" value="添加" class="easyui-linkbutton"
							onclick="toAdd()"> <br /> <br /> <input id="del"
							name="del" type="button" value="删除" class="easyui-linkbutton"
							onclick="toRemove()"></td>
						<td width=30% align="left">
							<p>已选择的角色:</p> <select style="width: 200px" size="10" multiple
							onchange="selectedChange()" id="roleId" name="roleId">
						</select>
						</td>
					</tr>
				</table>
			</div>
		</div>
	</form>
</body>
</html>