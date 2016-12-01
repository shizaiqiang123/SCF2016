<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>保险公司页面</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/factorCust/insureCust.js"></script>
</head>
<body class="UTSCF">
	<div id="insure" class="div_ul">
		<form id="insureForm">
			<div id="baseDiv" style="width: 100%;height: auto;min-height: 300px" class="easyui-panel"
				title="保险公司信息" data-options="collapsible:true">
				<table class="utTab">
					<tr>
						<td>组织机构代码：</td>
						<td><input class="easyui-validatebox combo"  onchange="changeCustInstCd()"
							name="custInstCd" id="custInstCd" required="true"  data-options="validType:'maxLength[30]'"></input></td>
						<td>公司名称：</td>
						<td><input class="easyui-validatebox combo"
							name="custNm" id="custNm" required="true" data-options="validType:'maxLength[35]'"></input></td>
					</tr>
					<tr>
					   <td>客户类型：</td>
						<td><input class="easyui-combobox" id="custTp"
							name="custTp" 
							data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
							style="width: 180px;" editable="false"></input></td>
						<td>所属国家：</td>
						<td><input class="easyui-combobox"
							name="countryId" id="countryId" required="true"  data-options="valueField:'sysRefNo',textField:'ctryNm',panelHeight: 'auto',panelMaxHeight :'110px'" style="width: 180px;"></input></td>
						</tr>
					<tr>
					<td>地址：</td>
						<td><input class="easyui-validatebox combo"
							 name="regAddr" id="regAddr" data-options="validType:'maxLength[200]'"></input></td>
						<td>授信额度金额：</td>
						<td><input class="easyui-combobox" id="ccy" name="ccy"  data-options="valueField: 'sysRefNo',textField: 'sysRefNo',panelHeight: 'auto'"
							 style="width: 87px" required="true" editable="false"/>
							<input type="text" class="easyui-numberbox" required="true"
							data-options="onChange:changelmtAmt,groupSeparator:',', min:0,precision:2"
							name="lmtAmt" id="lmtAmt" style="width: 87px"></input> </td>
					</tr>
					<tr id="balTr">
						<td>已用额度：</td>
						<td><input class="easyui-numberbox"
							name="lmtAllocate" id="lmtAllocate"  data-options="groupSeparator:',', min:0,precision:2"></input></td>
						<td>可用额度：</td>
						<td><input class="easyui-numberbox"
							name="lmtBal" id="lmtBal"   data-options="groupSeparator:',', min:0,precision:2"></input></td>
					</tr>
					<tr id="dtTr">
						<td>生效日：</td>
						<td><input class="easyui-datebox" name="validDt"
							id="validDt"  editable="false" required="true"></input></td>
						<td>到期日：</td>
						<td><input class="easyui-datebox" name="dueDt"
							id="dueDt"  editable="false" required="true"></input></td>
					</tr>
					<tr>
						<td>联系人名称：</td>
						<td><input class="easyui-validatebox combo"
							name="ctctNm" required="true" id="ctctNm" data-options="validType:'maxLength[40]'"></input></td>
						<td>联系电话：</td>
						<td><input name="ctctTel" id="ctctTel"
							class="easyui-validatebox combo" data-options="validType:'telphone'"></td>
					</tr>
					<tr>
					<td>邮箱：</td>
						<td><input class="easyui-validatebox combo"
							data-options="validType:'email'" name="ctctEmail" id="ctctEmail"></input></td>
					</tr>
					<tr>
					<td><input type="hidden" name="sysRefNo" id="sysRefNo"></td>
					</tr>
				</table>
			</div>
		</form>
	</div>
</body>
</html>