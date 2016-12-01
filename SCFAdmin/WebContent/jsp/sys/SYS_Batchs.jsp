<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Batch管理</title>
<script type="text/javascript" src="js/sys/SYS_Batchs.js"></script>
</head>
<body>
	<form id="mainForm">
		<div id="mainDiv">
			<div class="easyui-panel" id="stsDiv"
				style="width: 100%; height: auto" title="批处理"
				data-options="collapsible:true" align="center">
				<label>批处理操作：</label> <a href="javascript:void(0)"
					class="easyui-linkbutton" icon="icon-ok" id="startAllBtn"
					onclick="startAllBatch()">启动所有</a> <a href="javascript:void(0)"
					class="easyui-linkbutton" icon="icon-cancel" id="stopAllBtn"
					onclick="stopAllBatch()">关闭所有</a>
			</div>
		</div>
		<div class="easyui-panel" id="mainDiv"
			style="width: 100%; height: auto" title="批处理信息"
			data-options="collapsible:true">
			<table id="batchTable" cellspacing="0" cellpadding="0" width="100%"
				height="400" iconCls="icon-edit">
			</table>
			<!-- <div id="toolbar">
				<a href="javascript:void(0)" class="easyui-linkbutton"
					id="querybutton" onclick="optAllBatch()">启动</a>
			</div> -->
		</div>
	</form>
</body>
</html>