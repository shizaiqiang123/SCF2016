<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>流水号管理</title>
<script type="text/javascript" src="js/sys/ReferenceNo.js"></script>
</head>
<body>
	<div id="mainDiv" class="easyui-panel" style="width: 100%; height: 200px"
			title="流水号管理" data-options="collapsible:true" align="center">
		<form id="mainForm">
			<table align="center" border=0 width=85% height=60%>
				<tr >
					<td>系统编号:</td>
					<td><input type="text" class="easyui-validatebox combo" name="sysRefNo"
						id="sysRefNo" required="true"  data-options="validType:'maxLength[35]'"></input></td>
					<td type="hidden" width="1"></td>
					<td>规则名称：</td>
					<td><input class="easyui-validatebox combo" name="refName"
						id="refName"  required="true"  data-options="validType:'maxLength[35]'"></input></td>
				</tr>
				
				<tr>
					<td>模组：</td>
					<td><input type="text" class="easyui-validatebox combo" name="module" id="module" data-options="validType:'maxLength[35]'"
						></input></td>
					<td type="hidden" width="1"></td>
					<td>重置频率：</td>
					<!-- <td>
						<select id="resetFrequency" name="resetFrequency" style="width:160px;" class ="easyui-select">  
							<option value="N">不重置</option>  
							<option value="Y">每年重置</option> 
							<option value="S">每季度重置</option>
							<option value="M">每月重置</option> 
							<option value="D">每天重置</option> 
						</select> 
						</td> -->
						<td>
							<input class="easyui-combobox" id="resetFrequency"
							name="resetFrequency" required="true"
							data-options="valueField:'id',textField:'text',panelHeight: 'auto'" editable="false"></input>
							</td>
				</tr>
				<tr>
					<td>初始值：</td>
					<!-- style="width:160px;" -->
					<td><input id="initNumber" name ="initNumber" min="0"  required="true"  class ="easyui-numberspinner">
						</td>
					<td type="hidden" width="1"></td>
					<td>规则总长度：</td>
					<!-- style="width:160px;" -->
					<td> <input id="refLength" name ="refLength" min="1" max="30" required="true"  class ="easyui-numberspinner">
					 </td>
				</tr>
				<tr>
					<td>增长值：</td>
					<!-- style="width:160px;" -->
					<td><input id="refInterval" name ="refInterval" min="1"  required="true" class ="easyui-numberspinner"></td>
				</tr>
				</table>
		</form>
	</div>
</body>
</html>