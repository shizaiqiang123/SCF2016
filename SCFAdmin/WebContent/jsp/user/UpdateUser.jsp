<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>修改用户页面</title>
<script type="text/javascript" src="js/user/UpdateUser.js"></script>
<script type="text/javascript" src="js/scfjs/password.js"></script>
</head>
<body class="UTSCF">
	<div id="userAdd">
		<form id="userAddForm">
			<div id="userDiv" style="width: 100%" class="easyui-panel"
				title="用户信息" data-options="collapsible:true">
				<table align="center" border=0 width=85% class="utTab">
					<tr>
						<td>登陆ID：</td>
						<td><input type="text" class="easyui-validatebox combo"
							name="userId" id="userId" required="true" onchange="RegVerBox()"
							data-options="validType:'maxLength[35]'"></input></td>
						<td>用户姓名：</td>
						<td><input type="text" class="easyui-validatebox combo"
							name="userNm" id="userNm" required="true"
							data-options="validType:'maxLength[35]'"></input></td>
					</tr>

<!-- 					<tr> -->
<!-- 						<td>上次修改密码时间：</td> -->
<!-- 						<td><input type="text" class="easyui-datebox" -->
<!-- 							name="pwdEditDt" id="EditDt" editable="false"></input> -->
<!-- 						<td>下次修改密码的提示时间：</td> -->
<!-- 						<td><input type="text" class="easyui-datebox" required="true" -->
<!-- 							name="pwdDueDt" id="DueDt" editable="false"></input></td> -->
<!-- 					</tr> -->
					<tr>
						<td>电话号码：</td>
						<td><input type="text" class="easyui-validatebox"
							data-options="validType:'telphone'" name="telPhone" id="telPhone"></input></td>
						<td>分机号：</td>
						<td><input type="text" class="easyui-validatebox"
							data-options="validType:'telphone'" name="extTel" id="extTel"></input></td>
					</tr>
					<tr>
						<td>电子邮箱：</td>
						<td><input type="text" class="easyui-validatebox"
							data-options="validType:'email'" name="email" id="email"></input></td>
						<td>移动电话：</td>
						<td><input type="text" class="easyui-validatebox"
							data-options="validType:'mobile'" name="mobPhone" id="mobPhone"></input></td>

						<td><input type="hidden" name="sysRefNo" id="sysRefNo"></input>
							
							<input type="hidden" name="sysEventTimes" id="sysEventTimes"></input>
							<input type="hidden" id="userTp" name="userTp" value="1"></input>
							<input type="hidden" id="pwdDueDt" name="pwdDueDt">
							<input type="hidden" id="userStatus" name="userStatus">
							<input type="hidden" id="pwdTp" name="pwdTp" value="0" /> <input
							type="hidden" name="busiUnit" id="busiUnit"
							value="${sysUserInfo.sysBusiUnit}"></input></td>
					</tr>
					<tr>
						<!-- 				<td>用户角色：</td> -->
						<!-- 				<td><select class="easyui-combobox"  id="roleIdBox" name="roleId" -->
						<!-- 				 	data-options="valueField: 'roleId',textField: 'roleName',panelHeight: 'auto'"   -->
						<!-- 				 	style="width:150px;" editable="false" required="true"> -->
						<!-- 				</select></td> -->
						<td>职务：</td>
						<td><input type="text" class="easyui-validatebox combo"
							name="title" id="title" data-options="validType:'maxLength[35]'"></input></td>
                           <td>网点信息：</td>
						<td><input type="text" class="easyui-validatebox combo" readonly="readonly"
							name="ownerBrNm" id="ownerBrNm" required="true"  ></input><a class="easyui-linkbutton" icon="icon-search" onclick="showLookUpWindow()">查询</a></td>
					</tr>	
					<tr>
						<td>用户级别：</td>
						<td><input type="text" class="easyui-combobox"
							name="userGrade" id="userGrade" required="true"  data-options="onSelect:changeOwnerDep,valueField:'id',textField:'text',panelHeight: 'auto'"></input></td>
						<td id="custInfoTd">客户名称：</td>
						<td id="custInfo"><input type="text" class="easyui-validatebox combo" readonly="readonly"
							name="custNm" id="custNm"></input><a class="easyui-linkbutton" icon="icon-search" onclick="showLookUpCust()">查询</a></td>
					</tr>
					<tr id="sysOrgIdTr">
						<td>所属机构：</td>
						<td><input type="text" class="easyui-combotree combo"
							name="sysOrgId" id="sysOrgId"
							data-options="valueField: 'orgId',textField: 'orgNm',panelHeight: 'auto'"
							editable="false"  /></input></td>
					</tr>
					<tr>
						<td>
							<input type="hidden" id="ownerBrId" name="ownerBrId"/>
							<input type="hidden" id="custId" name="custId"/>
						</td>
					</tr>
				</table>
			</div>
			<div class="easyui-panel" title="用户角色选择列表"
				data-options="collapsible:true" style="width: 100%; height: 300px">
				<div id="roleDiv">
					<input type="hidden" name="roleHD" id="roleHD">
					<table id="roleTable" align="left" border=0 width=100%
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
								id="roleId" name="roleId">
							</select>
							</td>

						</tr>
					</table>
				</div>
			</div>
		</form>
	</div>
</body>
</html>