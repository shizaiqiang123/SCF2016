<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>新增协议信息页面</title>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/cntrct/addCntrctModel.js"></script>
</head>
<body class="UTSCF">
	<form id="mainForm">
		<div id="cntrctModelDiv" style="width: 100%" class="easyui-panel"
			title="协议文本信息" data-options="collapsible:true">
			<div class="item">
				<span class="label">文本编号：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo"
						data-options="validType:'maxLength[35]'" name="sysRefNo"
						id="sysRefNo" />
				</div>
			</div>
			<div class="item">
				<span class="label">产品名称：</span>
				<div class="fl item-ifo">
					<input class="easyui-validatebox combo" id="productNm" name="productNm"
						required="true" data-options="validType:'maxLength[50]'"/>
					
				</div>
				<!-- <a class="btn" id="addProduct" href="javascript:void(0);">
					<span>查询</span>
				</a> -->
				<input type="button" id="addProduct" 
						style="margin-left: 10px;width:100px; height: 32px"
						class="dsIB mR10 hover white btnRed"
						value="查询" />
			</div>
			<div class="item">
				<span class="label">协议文本名称：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo" name="cntrctNm"
						id="cntrctNm" required="true"
						data-options="validType:'maxLength[100]'"  />
				</div>
				<!-- <a class="btn" id="submit" href="javascript:void(0);" onclick="upload();">
					<span>上传</span>
				</a> -->
				<input type="button" id="submit" 
						style="margin-left: 10px;width:100px; height: 32px"
						onclick="upload()" class="dsIB mR10 hover white btnRed"
						value="上传" />
			</div>
			<div class="item">
				<span class="label">协议文本版本编号：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo" name="editionNo"
						id="editionNo" required="true"
						data-options="validType:'maxLength[35]'" />
				</div>
			</div>
			<div class="item">
				<span class="label">协议有效期：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-datebox "
						data-options="width:'253px',height:'32px',panelWidth:253"
						name="dueDt" id="dueDt" editable="false" /> 
					<input type="hidden" name="cntrctURL" id="cntrctURL" />
					<input type="hidden" name="productId" id="productId" />
					<input type="hidden" name="busiTp" id="busiTp" />
					<input type="hidden" name="editionNoCopy" id="editionNoCopy" />
				</div>
			</div>
			<div class="item">
				<span class="label">扣息方式：</span>
				<div class="fl item-ifo">
					<input id="payIntTp" name="payIntTp" class="easyui-combobox"
						required="true"
						data-options="valueField: 'id',textField: 'text',panelHeight: 'auto',width:'253px',height:'32px'"
						editable="false" />
				</div>
			</div>
			<div class="item">
				<span class="label">扣费方式：</span>
				<div class="fl item-ifo">
					<input class="easyui-combobox" id="payChgTp" name="payChgTp"
						required="true"
						data-options="valueField: 'id',textField: 'text',panelHeight: 'auto',width:'253px',height:'32px'"
						editable="false" />
				</div>
			</div>
			<div class="item">
				<span class="label">核销差额比例：</span>
				<div class="fl item-ifo">
					<input name="verifPerc" id="verifPerc" class="easyui-numberspinner"
						data-options="min:0,max:100,suffix:'%',width:'253px',height:'32px',precision:2" />
				</div>
			</div>
			<div class="item">
				<span class="label">核销最大差额：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-numberbox" 
						data-options="width:'253px',height:'32px',min:0,precision:2,groupSeparator:',',validType:'maxLength[18]'"
						name="verifLimit" id="verifLimit" />
				</div>
			</div>
		</div>
	</form>
</body>
</html>