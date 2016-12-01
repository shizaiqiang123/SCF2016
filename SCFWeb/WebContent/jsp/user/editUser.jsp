<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>修改个人信息页面</title>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/user/editUser.js"></script>
<!-- <script type="text/javascript">
	/* $(function(){
	 $('#roleId').roleId({    
	 required:true,    
	 multiple:true,
	 disabled:true  
	 }); 
	 });  */
</script> -->
</head>
<body class="UTSCF" style="width: 100%; margin: 0 auto">
	<form id="userAddForm">
		<div id="userDiv" style="width: 100%" class="easyui-panel"
			title="我的个人信息" data-options="collapsible:true">
			<div class="item">
				<span class="label">我的头像：</span>
				<div class="fl item-ifo">
					<img id="bust" src="images/image/subin-_12.png" width="51" height="51" alt="" />
					<input type="button" id="adjustAmtBtn" 
					style="margin-left:98px;width:100px; height: 32px;border-radius:5px;margin-bottom:40px"
					onclick="uploadBust()" class="dsIB mR10 hover white btnBlue"
					value="上传头像" />
				</div>
			</div>
			<div class="item"  style="margin-top: -26px;">
				<span class="label">登陆ID：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo" name="userId"
						id="userId" required="true" editable="false" />
				</div>
			</div>
			<div class="item">
				<span class="label">用户姓名：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo" name="userNm"
						id="userNm" required="true" />
				</div>
			</div>
			<div class="item">
				<span class="label">电话号码：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo" name="telPhone"
						id="telPhone"
						data-options="validType:'telphone'" />
				</div>
			</div>
			<div class="item">
				<span class="label">分机号：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo" name="extTel"
						id="extTel"
						data-options="validType:'telphone'" />
				</div>
			</div>
			<div class="item">
				<span class="label">电子邮箱：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo" name="email"
						id="email"
						data-options="validType:'email'" />
				</div>
			</div>
			<div class="item">
				<span class="label">移动电话：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo" name="mobPhone"
						id="mobPhone"
						data-options="validType:'mobile'" />
				</div>

			</div>
<!-- 			<div class="item"> -->
<!-- 								<TD>所属机构：</TD> -->
<!-- 								<TD> -->
<!-- 								<INPUT  TYPE="TEXT" CLASS="EASYUI-COMBOBOX"  ID="OWNERBRID" NAME="OWNERBRID" -->
<!-- 								 	DATA-OPTIONS="VALUEFIELD:'ID',TEXTFIELD:'TEXT',PANELHEIGHT: 'AUTO'"  -->
<!-- 								 	STYLE="WIDTH:150PX;" EDITABLE="FALSE" REQUIRED="TRUE"  ></INPUT></TD> -->
<!-- 				<span class="label">职务：</span> -->
<!-- 				<div class="fl item-ifo"> -->
<!-- 					<input type="text" class="easyui-validatebox combo" name="title" -->
<!-- 						id="title" /> -->
<!-- 				</div> -->
<!-- 			</div> -->
			<div class="item">
				<span class="label">用户角色：</span>
				<div class="fl item-ifo">
					<input class="easyui-combobox" id="roleIdBox" name="roleIdBox"
						data-options="valueField:'roleId',textField:'roleNm',panelHeight: 'auto',width:'253px',height:'32px'" editable="false" />
				</div>
			</div>
			<div class="item">
				<input type="hidden" name="sysRefNo" id="sysRefNo"
					value="${sysUserInfo.userRefNo}" /> <input type="hidden"
					name="sysEventTimes" id="sysEventTimes" />
				<!-- 				<td><input type="hidden" name="sysRefNo1" id="sysRefNo1" ></input></td> -->
				<input type="hidden" name="busiUnit" id="busiUnit"
					value="${sysUserInfo.sysBusiUnit}" /> <input type="hidden"
					name="pwdDueDt" id="pwdDueDt" value="${sysUserInfo.sysDate}" /> <input
					type="hidden" name="userRoleType" id="userRoleType"
					value="${sysUserInfo.userRole }" />
					<input type="hidden" name="userTp" id="userTp"/>
			</div>
		</div>

		<div id="comBusiMsgDiv" style="width: 100%; height: 200px"
			class="easyui-panel" title="我的业务数据展示" data-options="collapsible:true">
			<div id="combToolbar" style="overflow: hidden;">
				<a href="javascript:void(0)" class="easyui-linkbutton" id="addComb"
					iconcls="icon-add" onclick="addComb()" plain="true" style="float:right;margin-right:14px;">新增</a> <a
					href="javascript:void(0)" class="easyui-linkbutton" id="editComb"
					iconcls="icon-edit" onclick="editComb()" plain="true" style="float:right;">修改</a> <a
					href="javascript:void(0)" class="easyui-linkbutton" id="deleteComb"
					iconcls="icon-remove" onclick="deleteComb()" plain="true" style="float:right;">删除</a>
			</div>
			<table class="easyui-datagrid" id="combDg" cellspacing="0"
				cellpadding="0" style="width: 100%; height: auto"
				iconCls="icon-edit">
			</table>
		</div>
		<div id="comFunDiv" style="width: 100%; height: 200px"
			class="easyui-panel" title="我的常用功能" data-options="collapsible:true">
			<div id="comfToolbar" style="overflow:hidden;">
				<a href="javascript:void(0)" class="easyui-linkbutton" id="addComf"
					iconcls="icon-add" onclick="addComf()" plain="true" style="float:right;margin-right:14px;">新增</a> <a
					href="javascript:void(0)" class="easyui-linkbutton" id="editComf"
					iconcls="icon-edit" onclick="editComf()" plain="true" style="float:right">修改</a> <a
					href="javascript:void(0)" class="easyui-linkbutton" id="deleteComf"
					iconcls="icon-remove" onclick="deleteComf()" plain="true" style="float:right">删除</a>
			</div>
			<table class="easyui-datagrid" id="comfDg" cellspacing="0"
				cellpadding="0" style="width: 100%; height: auto"
				iconCls="icon-edit">
			</table>
		</div>
	</form>
</body>
</html>