<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>保理商页面</title>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/factor/factor.js"></script>
</head>
<body class="UTSCF">
	<div id="factor" class="div_ul">
		<form id="factorForm">
			<div id="baseDiv" style="width: 100%" class="easyui-panel"
				title="保理商信息" data-options="collapsible:true">
				<div class="item">
					<span class="label">机构号：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo"
							name="busiUnit" id="busiUnit" required="true"
							onChange="queryBusiUnit()" />
					</div>
				</div>
				<!-- <div class="item">
					<span class="label">组织机构代码：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo"
							name="custInstCd" id="custInstCd" required="true"
							data-options="validType:['noChinese','maxLength[10]']" />
					</div>
				</div> -->
				<div class="item">
					<span class="label">公司名称：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo" name="custNm"
							id="custNm" required="true"
							data-options="validType:'maxLength[200]'" />
					</div>
				</div>
				<div class="item">
					<span class="label">国税登记证：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo"
							name="stateTaxLicno" id="stateTaxLicno"
							data-options="validType:'maxLength[32]'" />
					</div>
				</div>
				<div class="item">
					<span class="label">地税登记证：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo"
							name="localTaxLicno" id="localTaxLicno"
							data-options="validType:'maxLength[32]'" />
					</div>
				</div>
				<div class="item">
					<span class="label">注册地址：</span>
					<div class="fl item-ifo">
						<input type="text" name="regionCd" id="regionCd" editable="false"
							data-options="onChange:changeRegion,valueField: 'sysRefNo',textField: 'cityNm',panelHeight: 'auto',width:'253px',height:'32px',panelWidth:253"
							class="easyui-combobox" />
					</div>
				</div>
				<div class="item">
					<span class="label"></span>
					<div class="fl item-ifo">
						<input type="text" name="cityCd" id="cityCd" editable="false"
							data-options="valueField: 'sysRefNo',textField: 'cityNm',panelHeight: 'auto',width:'253px',height:'32px',panelWidth:253"
							class="easyui-combobox" />
					</div>
				</div>
				<div class="item">
					<span class="label">地址：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo"
							required="true" name="regAddr" id="regAddr" required="true"
							data-options="validType:'maxLength[200]',multiline:true" />
					</div>
				</div>
				<div class="item">
					<span class="label">注册资本币别：</span>
					<div class="fl item-ifo">
						<input class="easyui-combobox" id="regCcy" name="regCcy"
							data-options="width:'253px',height:'32px',valueField: 'sysRefNo',textField: 'textField',panelHeight: 'auto' "
							editable="false" />
					</div>
				</div>
				<div class="item">
					<span class="label">注册资本：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-numberbox"
							data-options="width:'253px',height:'32px',min:0,precision:2,groupSeparator:',',validType:'maxLength[18]'"
							name="regCapital" id="regCapital" required="true" />
					</div>
				</div>
				<div class="item">
					<span class="label">成立日期：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-datebox" name="setupDt" id="setupDt"
							data-options="width:'253px',height:'32px',panelWidth:253"
							required="true" editable="false" />
					</div>
				</div>
				<div class="item">
					<span class="label">贷款卡号：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo" name="loanCardno"
							id="loanCardno" required="true"
							data-options="validType:['noChinese','maxLength[19]']" />
					</div>
				</div>
				<div class="item">
					<span class="label">企业性质：</span>
					<div class="fl item-ifo">
						<input class="easyui-combobox" id="compNature" name="compNature"
							data-options="width:'253px',height:'32px',valueField:'id',textField:'text',panelHeight: 'auto'"
							editable="false" />
					</div>
				</div>
				<div class="item">
					<span class="label">经营范围：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo"
							name="busiScope" id="busiScope"
							data-options="validType:'maxLength[200]'" />
					</div>
				</div>
				<div class="item">
					<span class="label">备注：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo" name="remark"
							id="remark" data-options="validType:'maxLength[200]'" />
					</div>
				</div>
			</div>
			<div id="personDiv" style="width: 100%" class="easyui-panel"
				title="法定代表人" data-options="collapsible:true">
				<div class="item">
					<span class="label">法定代表人：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo"
							name="legalRepNm" id="legalRepNm"
							data-options="validType:'maxLength[200]'" />
					</div>
				</div>
				<div class="item">
					<span class="label">证件类型：</span>
					<div class="fl item-ifo">
						<input class="easyui-combobox" id="legalRepIdtype"
							name="legalRepIdtype"
							data-options="width:'253px',height:'32px',valueField:'id',textField:'text',panelHeight: 'auto'"
							editable="false" />
					</div>
				</div>
				<div class="item">
					<span class="label">证件编号：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo" name="legalRepIdno"
							id="legalRepIdno"
							data-options="validType:['number','maxLength[40]']" />
					</div>
				</div>
			</div>
			<div id="contactDiv" style="width: 100%" class="easyui-panel"
				title="联系方式" data-options="collapsible:true">
				<div class="item">
					<span class="label">联系人名称：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo" name="ctctNm"
							id="ctctNm" data-options="validType:'maxLength[35]'" />
					</div>
				</div>
				<div class="item">
					<span class="label">联系电话：</span>
					<div class="fl item-ifo">
						<input type="text" name="ctctTel" id="ctctTel"
							class="easyui-validatebox combo" data-options="validType:'telphone'" />
					</div>
				</div>
				<div class="item">
					<span class="label">移动电话：</span>
					<div class="fl item-ifo">
						<input type="text" name="mobPhone" id="mobPhone"
							class="easyui-validatebox combo" data-options="validType:'mobile'" />
					</div>
				</div>
				<div class="item">
					<span class="label">职务：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo" data-options="validType:'maxLength[70]'"
							name="ctctPersonTitle" id="ctctPersonTitle" />
					</div>
				</div>
				<div class="item">
					<span class="label">传真：</span>
					<div class="fl item-ifo">
						<input type="text" name="ctctFax" id="ctctFax"
							class="easyui-validatebox combo" data-options="validType:'telphone'" />
					</div>
				</div>
				<div class="item">
					<span class="label">邮箱：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo"
							data-options="validType:'email'" name="ctctEmail" id="ctctEmail" />
					</div>
				</div>
				<div class="item">
					<span class="label">地址：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo"
							name="officeAddr" id="officeAddr"
							data-options="validType:'maxLength[200]'" />
					</div>
				</div>
			</div>
			<div id="aditionDiv" style="width: 100%" class="easyui-panel"
				title="附加信息(国际保理专用)" data-options="collapsible:true">
				<div class="item">
					<span class="label">F C I 编号：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo" name="fciNo"
							id="fciNo" data-options="validType:'maxLength[40]'" />
					</div>
				</div>
				<div class="item">
					<span class="label">公司英文名称：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo"
							name="custEnNm" id="custEnNm"
							data-options="validType:['noChinese','maxLength[70]']" /> <input
							type="hidden" name="sysRefNo" id="sysRefNo" /> <input
							type="hidden" name="custTp" id="custTp" /> <input type="hidden"
							name="orgNm" id="orgNm" /> <input type="hidden" name="orgTp"
							id="orgTp" /> <input type="hidden" name="orgOwnerid"
							id="orgOwnerid" /> <input type="hidden" name="factorId"
							id="factorId" /> <input type="hidden" name="instInfo"
							id="instInfo" /> <input type="hidden" name="instbu" id="instbu" />
					</div>
				</div>
			</div>
			<div class="easyui-panel" title="账号信息"
				data-options="collapsible:true" style="width: 100%">
				<div id="acnoDiv">
					<table id="acnoTable" cellspacing="0" cellpadding="0" width="100%"
						iconCls="icon-edit">
					</table>
					<div id="toolbar" style="overflow:hidden;">
						<a href="javascript:void(0)" class="easyui-linkbutton"
							iconcls="icon-add" onclick="addRow()" plain="true" style="float:right;margin-right:14px;">添加</a> <a
							href="javascript:void(0)" class="easyui-linkbutton"
							iconcls="icon-edit" onclick="editRow()" plain="true" style="float:right;">修改</a> <a
							href="javascript:void(0)" class="easyui-linkbutton"
							iconcls="icon-remove" onclick="deleteRow()" plain="true" style="float:right;">删除</a>
					</div>
				</div>
			</div>
			<div class="easyui-panel" title="产品名称列表"
				data-options="collapsible:true" style="width: 100%; height: 300px">
				<div id="productDiv">
					<input type="hidden" name="productHD" id="productHD">
					<table id="productTable" align="center" border=0 width=100%
						style="table-layout: fixed">
						<tr>
							<td style="text-align: right;">
								<p style="margin-right: 25%">系统支持的产品:</p> <select style="width: 200px" id="myselect"
								name="myselect" size="10" multiple onchange="selectChange()">
							</select>
							</td>
							<td style="text-align: center;"><input id="add" name="add" type="button" value="添加"
								class="easyui-linkbutton" onclick="toAdd()"><br /> <br />
								<input id="del" name="del" type="button" value="删除"
								class="easyui-linkbutton" onclick="toRemove()"></td>
							<td>
								<p>已选择的产品:</p>
								<select style="width: 200px" size="10" multiple
									id="productId" name="productId"></select>
							</td>
						</tr>
					</table>
				</div>
			</div>
		</form>
	</div>
</body>
</html>