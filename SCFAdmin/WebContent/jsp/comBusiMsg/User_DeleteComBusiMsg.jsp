<%@ page language="java" contentType="text/html; charset=UTF-8"
	import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
<title>个人业务数据删除页面</title>
<script type="text/javascript" src="js/comBusiMsg/User_DeleteComBusiMsg.js"></script>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
</head>
<body>
	<div>
	<form id='mainForm'>
		<div id="searchDiv" class="easyui-panel" title="Page信息"
			data-options="collapsible:true" style="width: 100%" align="center">
			<div class="item">
				<span class="label">功能编号：</span>
				<div class="fl item-ifo">
					<input type="text" name="funId" id="funId" class="easyui-validatebox combo" data-options="validType:'maxLength[35]'"/>
				</div>
			</div>
			<div class="item">
				<span class="label">功能名称：</span>
				<div class="fl item-ifo">
					<input type="text" name="funNm"  id="funNm" class="easyui-validatebox combo" data-options="validType:'maxLength[35]'"/>
				</div>
			</div>
			<div class="item">
				<span class="label">用户编号：</span>
				<div class="fl item-ifo">
					<input type="text" name="userId" id="userId" class="easyui-validatebox combo" data-options="validType:'maxLength[35]'" value="${sysUserInfo.userId }"/>
				</div>
			</div>
			<div class="item">
				<span class="label">功能路径：</span>
				<div class="fl item-ifo">
					<input type="text" name="funPath" id="funPath" class="easyui-validatebox combo" data-options="validType:'maxLength[35]'" value="${sysUserInfo.userId }"/>
				</div>
			</div>
			<div class="item">
				<span class="label">QUERY ID：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo" name="userQueryId" id="userQueryId" data-options="validType:'maxLength[35]'"/>	
				</div>
			</div>
			<div>
<!-- 			<input type="text" name="funPath" id="funPath" /> -->
			<input type="hidden" name="userNm"  id="userNm" class="easyui-validatebox combo" data-options="validType:'maxLength[35]'" />
			</div>
				
					
						<td></td>
					</tr>
					<tr><td></td>
						</tr>
				</table>
			</form>
		</div>
	</div>


</body>
</html>