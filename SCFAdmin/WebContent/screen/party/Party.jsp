<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>新增合作方页面</title>
<script type="text/javascript" src="script/party/Party.js"></script>
</head>
<body>
<div id="userAdd" class="div_ul">
	<form id="partyForm">
	<!-- <input type="reset" id ="addReset"> -->
			<div id="partyDiv"
				style="width: 100%; height: auto; min-height: 380px"
				class="easyui-panel" title="合作方信息" data-options="collapsible:true">
				<table class="utTab">
					<tr>
						<td><input type="hidden" name="sysRefNo" id="sysRefNo"></input>
						</td>
					</tr>
					<tr>
						<td>合作方名称：</td>
						<td><input type="text" class="easyui-validatebox combo"
							name="patnerNm" id="patnerNm" required="true"
							data-options="validType:'maxLength[70]'"></input></td>
						<td>合作方类型：</td>
						<td><input id="patnerTp" class="easyui-combobox"
							data-options="onSelect:doCust,valueField:'id',textField:'text',panelHeight: 'auto'"
							editable="false" name="patnerTp"></input></td>
					</tr>
					<tr>
						<td>所属国家：</td>
						<td><input type="text" name="patnerCtry" id="patnerCtry"
							class="easyui-validatebox combo" required="true"
							data-options="validType:'maxLength[35]'"></input></td>
						<td>城市：</td>
						<td><input type="text" name="patnerCity" id="patnerCity"
							class="easyui-validatebox combo" required="true"
							data-options="validType:'maxLength[35]'"></input></td>
					</tr>
					<tr>
						<td>地址：</td>
						<td><input name="patnerAdr" id="patnerAdr"
							class="easyui-validatebox combo" required="true"
							data-options="validType:'maxLength[140]'"></input></td>
						<td>电话：</td>
						<td><input type="text" name="patnerTel" id="patnerTel"
							class="easyui-validatebox"
							data-options="validType:['telphone','maxLength[30]']"
							required="true"></input></td>
					</tr>
					<tr>
						<td>电子邮箱：</td>
						<td><input type="text" name="patnerEmail" id="patnerEmail"
							class="easyui-validatebox"
							data-options="validType:['email','maxLength[40]']"
							required="true"></input></td>
						<td>传真：</td>
						<td><input type="text" name="patnerFax" id="patnerFax"
							class="easyui-validatebox"
							data-options="validType:['telphone','maxLength[30]']"
							required="true"></input></td>
					</tr>
					<tr>
						<td>是否FCI：</td>
						<td><input id="isFci" class="easyui-combobox"
							data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
							editable="false" name="isFci"></input></td>
						<td>FCI编号：</td>
						<td><input type="text" name="fciNo" id="fciNo"
							data-options="validType:['noChinese','mastLength[7]']"></input></td>
					</tr>
					<tr>
						<td>合作起始日：</td>
						<td><input name="agmValueDt" id="agmValueDt"
							class="easyui-datebox" editable="false"></input></td>
						<td>合作到期日：</td>
						<td><input name="agmDueDt" id="agmDueDt"
							class="easyui-datebox" editable="false"></input></td>
					</tr>
					<tr>
						<td>承保额度币别：</td>
						<td><input class="easyui-combobox" id="lmtCcy" name="lmtCcy"
							editable="false"
							data-options="valueField: 'sysRefNo',textField: 'sysRefNo',panelHeight: 'auto'" />
						</td>
						<td>承保额度金额：</td>
						<td><input name="lmtAmt" id="lmtAmt" class="easyui-numberbox"
							data-options="groupSeparator:',', min:0,precision:2" value="0"></input></td>
					</tr>	
				</table>
			</div>
		</form>
</div>
</body>
</html>