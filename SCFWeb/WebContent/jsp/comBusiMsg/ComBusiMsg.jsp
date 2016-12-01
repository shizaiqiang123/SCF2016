<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>业务数据展示页面</title>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/comBusiMsg/ComBusiMsg.js"></script>
</head>
<body class="UTSCF">
	<div id="comBusiMsg" class="div_ul">
		<form id="comBusiMsgForm">
			<div id="funDiv" style="width: 100%" class="easyui-panel"
				title="业务数据展示信息" data-options="collapsible:true">
				<div class="item">
					<span class="label">Function name：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-combotree combo"
							data-options="valuefield:'id',textfield:'text',panelheight: 'auto',height:'32px',onChange:funIdBox"
							name="funNmBox" id="funNmBox" required="true" />
					</div>
				</div>
				<div class="item">
					<span class="label">功能标题：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo"
							name="funTitle" id="funTitle" required="true" editable="false"
							data-options="validType:'maxLength[35]'"></input>
					</div>
				</div>
				<div class="item">
					<span class="label">功能级别：</span>
					<div class="fl item-ifo">
						<input name="funLevel" id="funLevel" 
						class="easyui-combobox"
						 data-options="width:'253px',height:'32px',valueField:'id',textField:'text',panelheight: 'auto'"
							  editable="false" required="true"/>
					</div>
				</div>
				<div class="item">
					<span class="label">按钮名称：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo"
							name="btnNm" id="btnNm" editable="false"
							data-options="validType:'maxLength[35]'"></input>
					</div>
				</div>
				<div class="item">
					<span class="label">QUERY ID：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo"
							name="userQueryId" id="userQueryId" required="true" editable="false"
							data-options="validType:'maxLength[35]'"></input>
					</div>
				</div>
				
				<div class="item">
					<span class="label">Function ID：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo" name="funId"
							id="funId" required="true"
							data-options="validType:'maxLength[35]'" editable="false" />
					</div>
				</div>
				
				<div class="item">
					<span class="label">功能URL：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo" name="funUrl"
							id="funUrl" required="true" editable="false"
							data-options="validType:'maxLength[35]'"></input>
					</div>
				</div>
				<div class="item">
					<span class="label">功能路径：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo" name="funPath"
							id="funPath" required="true" editable="false"
							data-options="validType:'maxLength[35]'" style="width: 253px"></input>
					</div>
				</div>
				
				<div>
					<input type="hidden" name="sysRefNo" id="sysRefNo"></input> <input
						type="hidden" name="sysEventTimes" id="sysEventTimes"></input> <input
						type="hidden" name="funNm" id="funNm" />
					 <input type="hidden" name="userTp" id="userTp"
						value="${sysUserInfo.userRole }" /> <input type="hidden"
						name="funType" id="funType" />
					<!-- 			<input type="text" name="funType" id="funType"/> -->
				</div>
			</div>
		</form>
	</div>
</body>
</html>