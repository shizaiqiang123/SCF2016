<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>新增用户页面</title>
<script type="text/javascript" src="script/cust/Cust.js"></script>
</head>
<body>
<div id="userAdd" class="div_ul">
	<form id="custForm">
	<input type="reset" id ="addReset">
       <table class="utTab">
			<tr>
				<td>授信客户名称：</td>
				<td>
				<input  class="easyui-validatebox combo" name="custNm" id="custNm" required="true" onChange="queryCust()"></input>
				</td>
				<td>授信客户名称（英文）：</td>
				<td><input  class="easyui-validatebox combo" name="custEnNm" id="custEnNm"  ></input></td>
			</tr>
			<tr>
				<td>客户组织机构代码：</td>
				<td><input  name="custInstCd" id="custInstCd" class="easyui-validatebox combo"></input></td>
				<td>客户FCI网站的交互编号：</td>
				<td><input  name="custEdiId" id="custEdiId" class="easyui-validatebox" data-options="validType:['noChinese','mastLength[7]']" ></input></td>
			</tr>
			<tr>
				<td>客户所属网点：</td>
				<td><input class="easyui-combobox"  id="custBrId" name="custBrId"
				 	data-options="valueField: 'sysRefNo',textField: 'brNm',panelHeight: 'auto'" 
				 	editable="false" required="true"></input></td>
				<td>客户所属客户经理：</td>
				<td>
					<input class="easyui-combobox" id="custMgrId" name="custMgrId"
				 	data-options="valueField: 'userId',textField: 'userNm',panelHeight: 'auto'" 
				 	 editable="false" required="true"></input></td>
			</tr>
			<tr>
				<td>客户所属国家：</td>
				<td><input type="text"  name="custCtry" id="custCtry" class="easyui-validatebox combo"  required="true"  ></input></td>
				<td>客户所属行业类别：</td>
				<td><input type="text"  name="custIndustry" id="custIndustry" class="easyui-validatebox combo"  required="true" ></input></td>
			</tr>
			<tr>
				<td>客户类型：</td>
				<td><input id="custTp"  class="easyui-combobox" 
					data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
				 	editable="false"  name="custTp" ></input></td>
				<td>是否我行客户：</td>
				<td><input id="custFlg"  class="easyui-combobox" 
					data-options="onSelect:doCust,valueField:'id',textField:'text',panelHeight: 'auto'"
				 	editable="false"  name="custFlg" ></input></td>
			</tr>	
			<tr>
				<td>是否核心企业：</td>
				<td><input id="isKeycust"  class="easyui-combobox" 
					data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
				 	editable="false"  name="isKeycust" ></input></td>	
				<td>客户地址：</td>
				<td><input type="text"  name="custAdr" id="custAdr" class="easyui-validatebox" ></input></td>
			</tr>
			<tr>
				<td>客户地址（英文）：</td>
				<td><input type="text"  name="custEnAdr" id="custEnAdr" class="easyui-validatebox combo"  ></input></td>
				<td>客户电话：</td>
				<td><input type="text"  name="custTel" id="custTel" class="easyui-validatebox" data-options="validType:'telphone'"></input></td>
			</tr>
			<tr>
				<td>客户传真：</td>
				<td><input type="text"  name="custFax" id="custFax" class="easyui-validatebox" data-options="validType:'telphone'"></input></td>
				<td>客户电邮：</td>
				<td><input type="text"  name="custEmail" id="custEmail" class="easyui-validatebox" data-options="validType:'email'"></input></td>
			</tr>
			<tr>
				<td>所属部门：</td>
				<td><input class="easyui-combobox"  id="deptId" name="deptId"
				 	data-options="valueField: 'sysRefNo',textField: 'deptDesc',panelHeight: 'auto'" 
				 	 editable="false" required="true"></input></td>
				<td>联系人姓名：</td>
				<td><input type="text"  name="ctctNm" id="ctctNm" class="easyui-validatebox combo" ></input></td>
			</tr>
			<tr>
				<td>联系人姓名（英文）：</td>
				<td><input type="text"  name="ctctEnNm" id="ctctEnNm" class="easyui-validatebox combo"  ></input></td>
				<td>联系人电话：</td>
				<td><input type="text"  name="ctctTel" id="ctctTel" class="easyui-validatebox" data-options="validType:'telphone'" ></input></td>
			</tr>
			<tr>
				<td>联系人传真：</td>
				<td><input type="text"  name="ctctFax" id="ctctFax" class="easyui-validatebox" data-options="validType:'telphone'" ></input></td>
				<td>联系人电邮：</td>
				<td><input type="text"  name="ctctEmail" id="ctctEmail" class="easyui-validatebox" data-options="validType:'email'"></input></td>
			</tr>
			<tr>
				<td>联系人地址：</td>
				<td><input type="text" name="ctctAdr" id="ctctAdr" class="easyui-validatebox combo"  ></input></td>
				<td>联系人身份证号码：</td>
				<td><input type="text"  name="ctctId" id="ctctId" class="easyui-validatebox" "data-options="validType:'cardno'" ></input></td>
				<td>
					<input type="hidden" name="sysRefNo" id="sysRefNo" ></input>
				</td>
			</tr>
			<tr>
				<td>授信额度币别：</td>
				<td><input class="easyui-combobox"  id="ccy" name="ccy" editable="false"
				 	data-options="valueField: 'sysRefNo',textField: 'sysRefNo',panelHeight: 'auto'" />
				</td>
				<td>授信额度金额：</td>
				<td><input  name="lmtAmt" id="lmtAmt"  class="easyui-numberbox" data-options="groupSeparator:',', min:0,precision:2" value="0"></input></td>
			</tr>
			<tr>
				<td>授信额度余额：</td>
				<td><input  name="lmtBal" id="lmtBal"  class="easyui-numberbox" data-options="groupSeparator:',', min:0,precision:2"  value="0" editable="false" ></input></td>
				<td>起始日：</td>
				<td><input type="text"  name="validDt" id="validDt" class="easyui-datebox" editable="false"></input></td>
			</tr>
			<tr>
				<td>到期日：</td>
				<td><input type="text"  name="dueDt" id="dueDt" class="easyui-datebox" editable="false"></input></td>
			</tr>
		</table>
	</form>
</div>
</body>
</html>