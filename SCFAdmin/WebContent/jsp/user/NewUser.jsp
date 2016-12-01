<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>新增用户页面</title>
<script type="text/javascript" src="js/user/NewUser.js"></script>
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
					<tr>
						<td>电子邮箱：</td>
						<td><input type="text" class="easyui-validatebox"
							data-options="validType:'email'" name="email" id="email" required="true"></input></td>
						<td>移动电话：</td>
						<td><input type="text" class="easyui-validatebox"
							data-options="validType:'mobile'" name="mobPhone" id="mobPhone" required="true"></input></td>
						
					</tr>
					<tr>
						<td>电话号码：</td>
						<td><input type="text" class="easyui-validatebox"
							data-options="validType:'telphone'" name="telPhone" id="telPhone"></input></td>
						<td>分机号：</td>
						<td><input type="text" class="easyui-validatebox"
							data-options="validType:'telphone'" name="extTel" id="extTel"></input></td>
					</tr>
					<tr>
						<td>职务：</td>
						<td><input type="text" class="easyui-validatebox combo"
							name="title" id="title" data-options="validType:'maxLength[35]'"></input></td>
						<td>网点信息：</td>
						<td><input type="text" class="easyui-validatebox combo"
							name="ownerBrNm" id="ownerBrNm" required="true" ></input><a class="easyui-linkbutton" icon="icon-search" onclick="showLookUpWindow()">查询</a></td>
					</tr>
					<tr>
						<td>部门信息：</td>
						<td><input type="text" class="easyui-combobox"
							name="ownerDep" id="ownerDep" data-options="valueField:'sysRefNo',textField:'deptDesc',panelHeight: 'auto'" required="true" ></input></td>
					</tr>
					<tr>
						<td><input type="hidden" name="sysRefNo" id="sysRefNo"/>
							<input type="hidden" name="sysEventTimes" id="sysEventTimes"/>
							<input type="hidden" id="userTp" name="userTp" value="1"></input>
							<input type="hidden" id="pwdTp" name="pwdTp" value="0" /> 
							<input type="hidden" id="password" name="password"/>
							<input type="hidden" id="userStatus" name="userStatus"/>
							<input type="hidden" id="ownerBrId" name="ownerBrId"/>
							<input type="hidden" name="busiUnit" id="busiUnit"value="${sysUserInfo.sysBusiUnit}"/>
							<input type="hidden" name="pwdDueDt" id="pwdDueDt" value="${sysUserInfo.sysDate}"/>
						</td>
					</tr>
				</table>
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