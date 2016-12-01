<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>网点信息</title>
<script type="text/javascript" src="js/inst/inst.js"></script>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
</head>

<body class="UTSCF">
<div id="inst" class="div_ul">
	<form id="instForm">
	<div id="instDiv" style="width: 100%" class="easyui-panel" title="网点信息" data-options="collapsible:true">
		<div class="item">
			<span class="label">网点编号：</span>
			<div class="fl item-ifo"><input type="text" name="sysRefNo" id="sysRefNo" class="easyui-validatebox combo"  required="true" data-options="validType:'maxLength[35]'"></input></div>
		</div>
		<div class="item">	
			<span class="label">网点类型：</span>
			<div class="fl item-ifo"><input type="text"  name="brTp"  id="brTp" class="easyui-combobox" 
					data-options="onSelect:changeBrTp,width:'253px',height:'32px',valueField:'id',textField:'text',panelHeight: 'auto'"
				 	editable="false"></div>
		</div>
		<div class="item">	
			<span class="label">上层网点编号：</span>
			<div class="fl item-ifo"><input class="easyui-combobox"  id="parentBr" name="parentBr"
				 	data-options="width:'253px',height:'32px',valueField: 'sysRefNo',textField: 'brNm',panelHeight: 'auto'" 
				 	 editable="false"/></div>
		</div>
		<div class="item">
			<span class="label">网点名称：</span>
			<div class="fl item-ifo"><input type="text"  name="brNm" id="brNm"  class="easyui-validatebox combo" required="true" data-options="validType:'maxLength[200]'"></div>
		</div>
		<div class="item">
			<span class="label">网点名称(英文)：</span>
			<div class="fl item-ifo"><input type="text"  name="brEnNm" id="brEnNm" class="easyui-validatebox combo" data-options="validType:['noChinese','maxLength[200]']"></div>
		</div>
		<div class="item">
			<span class="label">网点所属国家：</span>
			<div class="fl item-ifo"><input class="easyui-combobox"  id="brOwnerCtry" name="brOwnerCtry"
				 	data-options="width:'253px',height:'32px',valueField: 'sysRefNo',textField: 'ctryNm',panelHeight: 'auto'" 
				 	 editable="false"/></div>
		</div>
		<div class="item">
			<span class="label">网点地址：</span>
			<div class="fl item-ifo"><input type="text"  name="brAddr" id="brAddr" class="easyui-validatebox combo" required="true" data-options="validType:'maxLength[200]'"></div>
		</div>
		<div class="item">
			<span class="label">网点负责人：</span>
			<div class="fl item-ifo"><input type="text"  name="brMgr" id="brMgr" class="easyui-validatebox combo" required="true" data-options="validType:'maxLength[20]'"></div>
		</div>
		<div class="item">
			<span class="label">网点邮编：</span>
			<div class="fl item-ifo"><input type="text"  name="brPostCd" id="brPostCd" class="easyui-validatebox combo" data-options="validType:['number','mastLength[6]']"></div>
		</div>
		<div class="item">
			<span class="label">网点电话：</span>
			<div class="fl item-ifo"><input type="text"  name="brTelNo" id="brTelNo" class="easyui-validatebox combo" data-options="validType:'telphone'"></div>
		</div>
		<div class="item">
			<span class="label">网点传真：</span>
			<div class="fl item-ifo"><input type="text"  name="brFaxNo" id="brFaxNo" class="easyui-validatebox combo" data-options="validType:'telphone'"></div>
		</div>
		<div class="item">
			<span class="label">网点电邮：</span>
			<div class="fl item-ifo"><input type="text"  name="brEmail" id="brEmail" class="easyui-validatebox combo" data-options="validType:'email'"></div>
		</div>
	</div>
	</form>
</div>
</body>

 
