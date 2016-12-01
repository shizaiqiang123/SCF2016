<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>保理商客户页面</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/factorCust/factorCust.js"></script>
</head>
<body class="UTSCF">
	<div id="factor" class="div_ul">
		<form id="factorForm">
			<div id="baseDiv" style="width: 100%" class="easyui-panel"
				title="客户信息" data-options="collapsible:true">
				<table class="utTab">
					<tr>
						<td>组织机构代码：</td>
						<td><input class="easyui-validatebox combo" required="true"
							onchange="regCust()" name="custInstCd" id="custInstCd"
							data-options="validType:'maxLength[40]'"></input></td>
						<td>公司名称：</td>
						<td><input class="easyui-validatebox combo" name="custNm"
							required="true" id="custNm"
							data-options="validType:'maxLength[200]'"></input></td>
					</tr>
					<tr>
						<td>客户类型：</td>
						<td><input class="easyui-combobox" id="custTp" name="custTp"
							required="true"
							data-options="onSelect:changeCustTp,valueField:'id',textField:'text',panelHeight: 'auto'"
							editable="false"></input></td>
						<td>所属行业：</td>
						<td><input class="easyui-validatebox combo" name="industryNm"
							required="true" id="industryNm"
							data-options="validType:'maxLength[35]'"></input><a
							class="easyui-linkbutton" icon="icon-search"
							onclick="showCustIndustry()">查询</a></td>
						<!-- <td><input type="text" class="easyui-combotree" name="custIndustry" id="custIndustry"
							data-options="valueField: 'id',textField: 'text',state:'closed', panelHeight: 'auto',panelMaxHeight :'280PX'"
							editable="false"  required="false" /></td>	 -->
					</tr>
					<tr>
						<td>税务登记证：</td>
						<td><input class="easyui-validatebox combo"
							name="stateTaxLicno" id="stateTaxLicno" required="true"
							data-options="validType:'maxLength[35]'"></input></td>
						<td>所属国家：</td>
						<td><input class="easyui-combobox" name="countryId"
							id="countryId"
							data-options="valueField:'sysRefNo',textField:'ctryNm',panelHeight: 'auto',panelMaxHeight :'110px'"
							required="true"></input></td>
					</tr>
					<tr>
						<td>注册地址：</td>
						<td><input name="regionCd" id="regionCd" editable="false"
							required="true"
							data-options="onChange:changeRegion,valueField: 'sysRefNo',textField: 'cityNm',panelHeight: 'auto', panelMaxHeight :'110px'"
							class="easyui-combobox" style="width: 180px"></input> <input
							type="text" name="cityCd" id="cityCd" editable="false"
							required="true"
							data-options="valueField: 'sysRefNo',textField: 'cityNm',panelHeight: 'auto', panelMaxHeight :'110px'"
							class="easyui-combobox" style="width: 180px"></input>
						<td>地址：</td>
						<!-- <td><input class="easyui-validatebox combo" name="regAddr"
							required="true" id="regAddr"
							data-options="validType:'maxLength[200]'"></input></td> -->
							<td colspan="3"><input name="regAddr" id="regAddr" required="true"
							class="easyui-textbox"
							data-options="missingMessage:'输入项为必输项',multiline:true,validType:'maxLength[200]'"
							style="width: 180px; height: 58px"></td>
					</tr>
					<tr>
						<td>注册资本币别：</td>
						<td><input class="easyui-combobox" id="regCcy" name="regCcy"
							required="true"
							data-options="valueField: 'sysRefNo',textField: 'sysRefNo',panelHeight: 'auto'"
							editable="false" /></td>
						<td>注册资本：</td>
						<td><input class="easyui-numberbox" required="true"
							data-options="groupSeparator:',', min:0,precision:2,validType:'maxLength[19]'"
							name="regCapital" id="regCapital"></input></td>
					</tr>
					<tr>
						<td>公司成立日期：</td>
						<td><input class="easyui-datebox" name="setupDt" id="setupDt"
							required="true" editable="false"></input></td>
						<td>中征码：</td>
						<td><input class="easyui-validatebox combo" required="true"
							data-options="validType:['number','maxLength[19]']"
							name="loanCardno" id="loanCardno"></input></td>
					</tr>
					<tr>
						<td>企业性质：</td>
						<td><input class="easyui-combobox" id="compNature"
							name="compNature" required="true"
							data-options="valueField:'id',textField:'text',panelHeight: 'auto',panelMaxHeight :'300px'"
							editable="false"></input></td>
						<td>经营范围：</td>
						<td><input class="easyui-validatebox combo" name="busiScope"
							required="true" id="busiScope"
							data-options="validType:'maxLength[80]'"></input></td>
					</tr>
					<tr id="reqTr">
						<td>公司结算户：</td>
						<td><input class="easyui-validatebox combo" name="custAcNo"
							id="custAcNo" data-options="validType:'maxLength[35]'" required="true"></input> <!-- 							<a class="easyui-linkbutton" icon="icon-add" onclick="showLookUpWindowCms()">同步信贷客户号</a> -->
						</td>
						<td>信贷客户号：</td>
						<td><input class="easyui-validatebox combo" name="cmsCustNo"
							id="cmsCustNo" data-options="validType:'maxLength[35]'" required="true"></input>
							<!-- 							<a class="easyui-linkbutton" icon="icon-add" onclick="showLookUpWindowCust()">同步信贷客户信息</a> -->
						</td>
					</tr>

					<tr>
						<td>授信网点：</td>
						<td><input type="text" class="easyui-validatebox combo"
							name="bchNm" id="bchNm" required="true"></input><a
							class="easyui-linkbutton" icon="icon-search"
							onclick="showLookUpWindow()">查询</a></td>
							<td>客户经理：</td>
						<td><input class="easyui-validatebox combo" name="custMgrNm"
							id="custMgrNm" data-options="validType:'maxLength[35]'" required="true"></input><a
							class="easyui-linkbutton" icon="icon-search"
							onclick="showLookUpWindowMgr()">绑定客户经理</a></td>
					</tr>
					<tr id="amtTr">
						<td>授信额度金额：</td>
						<td><input class="easyui-combobox" id="ccy" name="ccy"
							data-options="valueField: 'sysRefNo',textField: 'sysRefNo',panelHeight: 'auto'"
							style="width: 120px" /> <input type="text"
							class="easyui-numberbox"
							data-options="onChange:changelmtAmt,groupSeparator:',', min:0,precision:2"
							name="lmtAmt" id="lmtAmt" style="width: 120px"></input></td>
						<td>循环额度：</td>
						<td><input id="lmt_tp" name="lmt_tp" class="easyui-combobox"
							data-options="valueField:'id',textField:'text',panelHeight: 'auto'"></input></td>
					</tr>
					<tr id="balTr">
						<td>已用额度：</td>
						<td><input class="easyui-numberbox" name="lmtAllocate"
							id="lmtAllocate"
							data-options="groupSeparator:',', min:0,precision:2"></input></td>
						<td>可用额度：</td>
						<td><input class="easyui-numberbox" name="lmtBal" id="lmtBal"
							data-options="groupSeparator:',', min:0,precision:2"></input></td>
					</tr>
					<tr id="dtTr">
						<td>生效日：</td>
						<td><input class="easyui-datebox" name="validDt" id="validDt"
							editable="false"></input></td>
						<td>到期日：</td>
						<td><input class="easyui-datebox" name="dueDt" id="dueDt"
							editable="false"></input></td>
					</tr>
					<tr id="comTr">
						<td>客户性质：</td>
						<td><input class="easyui-combobox" name="clientNature"
							id="clientNature"
							data-options="onChange:changClientN,valueField:'id',textField:'text',panelHeight: 'auto'"></input></td>
						<td></td>
						<td></td>
					</tr>
					<tr id="limitTr">
						<td>限制条款：</td>
						<td colspan="5"><input name="limiting" id="limiting"
							class="easyui-textbox"
							data-options="missingMessage:'输入项为必输项',multiline:true,validType:'maxLength[200]'"
							style="width: 50%; height: 80px"></td>
					</tr>
					<tr>
						<td>备注：</td>
						<td colspan="5"><input name="remark" id="remark"
							class="easyui-textbox"
							data-options="missingMessage:'输入项为必输项',multiline:true,validType:'maxLength[200]'"
							style="width: 50%; height: 80px"></td>
					</tr>
				</table>
			</div>
			<div id="personDiv" style="width: 100%" class="easyui-panel"
				title="法定代表人" data-options="collapsible:true">
				<table class="utTab">
					<tr>
						<td>法定代表人：</td>
						<td><input class="easyui-validatebox combo" name="legalRepNm"
							required="true" id="legalRepNm"
							data-options="validType:'maxLength[200]'"></input></td>
						<td>证件类型：</td>
						<td><input class="easyui-combobox" id="legalRepIdtype"
							name="legalRepIdtype" required="true"
							data-options="valueField:'id',textField:'text',panelHeight: 'auto',panelMaxHeight :'100px'"
							style="width: 180px;" editable="false"></input></td>
					</tr>
					<tr>
						<td>证件编号：</td>
						<td><input class="easyui-validatebox combo"
							name="legalRepIdno" id="legalRepIdno" required="true" onblur="checkLegal()"
							data-options="validType:'maxLength[40]',missingMessage:'请输入字母或数字。'"></input></td>
					</tr>
				</table>
			</div>
			<div id="contactDiv" style="width: 100%" class="easyui-panel"
				title="联系方式" data-options="collapsible:true">
				<table class="utTab">
					<tr>
						<td>联系人名称：</td>
						<td><input class="easyui-validatebox combo" name="ctctNm"
							required="true" id="ctctNm"
							data-options="validType:'maxLength[40]'"></input></td>
						<td>联系电话：</td>
						<td><input name="ctctTel" id="ctctTel"
							class="easyui-validatebox combo" required="true"
							data-options="validType:'telphone'"></td>
					</tr>
					<tr>
						<td>移动电话：</td>
						<td><input name="mobPhone" id="mobPhone"
							class="easyui-validatebox combo" required="true"
							data-options="validType:'mobile'"></td>
						<td>职务：</td>
						<td><input class="easyui-validatebox combo"
							name="ctctPersonTitle" id="ctctPersonTitle" required="true"
							data-options="validType:'maxLength[100]'"></input></td>
					</tr>
					<tr>
						<td>传真：</td>
						<td><input name="ctctFax" id="ctctFax"
							class="easyui-validatebox combo"
							data-options="validType:'telphone'"></td>
						<td>邮箱：</td>
						<td><input class="easyui-validatebox combo" required="true"
							data-options="validType:'email'" name="ctctEmail" id="ctctEmail"></input></td>
					</tr>
					<tr>
						<td>地址：</td>
						<td><input class="easyui-validatebox combo" name="officeAddr"
							id="officeAddr" data-options="validType:'maxLength[200]'"></input></td>
					</tr>
					<tr>
						<td><input type="hidden" name="sysRefNo" id="sysRefNo"></td>
						<td><input type="hidden" name="custIndustry"
							id="custIndustry"></td>
						<td><input type="hidden" name="acFlag" id="acFlag" value="R"></td>
						<td><input type="hidden" name="acOwnerid" id="acOwnerid"></td>
						<td><input type="hidden" name="sysBusiUnit" id="sysBusiUnit"></td>
						<td><input type="hidden" name="custBrId" id="custBrId"></td>
						<td><input type="hidden" name="custMgrId" id="custMgrId"
							value="1"></td>
					</tr>
				</table>
			</div>
			<!-- <div id="aditionDiv" style="width: 100%" class="easyui-panel"
				title="附加信息(国际保理专用)" data-options="collapsible:true">
				<table class="utTab">
					<tr>
						<td>F C I 编号：</td>
						<td><input class="easyui-validatebox combo"
							name="fciNo" id="fciNo" data-options="validType:'maxLength[40]'"></input></td>
						<td>公司英文名称：</td>
						<td><input class="easyui-validatebox combo"
							name="custEnNm" id="custEnNm" data-options="validType:['noChinese','maxLength[70]']" ></input></td>
					</tr>
				</table>
			</div> -->
			<div id="acNoInfoDiv">
				<div class="easyui-panel" title="账号信息"
					data-options="collapsible:true" style="width: 100%">
					<div id="acnoDiv">
						<table id="acnoTable" cellspacing="0" cellpadding="0" width="100%"
							iconCls="icon-edit">
						</table>
						<div id="toolbar" style="overflow:hidden">
							<a href="javascript:void(0)" class="easyui-linkbutton"
								iconcls="icon-add" onclick="addRow()" plain="true" style="float:right;margin-right:14px;">添加</a> <a
								href="javascript:void(0)" class="easyui-linkbutton"
								iconcls="icon-edit" onclick="editRow()" plain="true" style="float:right;">修改</a> <a
								href="javascript:void(0)" class="easyui-linkbutton"
								iconcls="icon-remove" onclick="deleteRow()" plain="true" style="float:right;">删除</a>
						</div>
					</div>
				</div>
			</div>
		</form>
	</div>
</body>
</html>