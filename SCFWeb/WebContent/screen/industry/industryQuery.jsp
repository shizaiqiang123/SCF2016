<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>查询行业信息页面</title>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="script/industry/industryQuery.js"></script>
</head>
<body class="UTSCF" style="width: 100%; margin: 0 auto">
	<form id="userAddForm">
		<div id="userDiv" style="width: 100%" class="easyui-panel"
			title="信息" data-options="collapsible:true">
			<div class="item">
				<span class="label">第一大类行业：</span>
				<div class="fl item-ifo">
					<input class="easyui-combobox" id="sysRefNoOne" name="sysRefNoOne" nextId="sysRefNoTwo"
						data-options="onChange:changeValue,valueField:'sysRefNo',textField:'industryNm',panelHeight: 'auto',width:'253px',height:'32px'" editable="false" />
				</div>
			</div>
			
			<div class="item">
				<span class="label">第二大类行业：</span>
				<div class="fl item-ifo">
					<input class="easyui-combobox" id="sysRefNoTwo" name="sysRefNoTwo" nextId="sysRefNoThree"
						data-options="onChange:changeValue,valueField:'sysRefNo',textField:'industryNm',panelHeight: 'auto',width:'253px',height:'32px'" editable="false" />
				</div>
			</div>
			
			<div class="item">
				<span class="label">第三大类行业：</span>
				<div class="fl item-ifo">
					<input class="easyui-combobox" id="sysRefNoThree" name="sysRefNoThree" nextId="sysRefNoFour"
						data-options="onChange:changeValue,valueField:'sysRefNo',textField:'industryNm',panelHeight: 'auto',width:'253px',height:'32px'" editable="false" />
				</div>
			</div>
			
			<div class="item">
				<span class="label">第四大类行业：</span>
				<div class="fl item-ifo">
					<input class="easyui-combobox" id="sysRefNoFour" name="sysRefNoFour"  nextId=""
						data-options="onChange:changeValue,valueField:'sysRefNo',textField:'industryNm',panelHeight: 'auto',width:'253px',height:'32px'" editable="false" />
				</div>
			</div>
			
			
			<div class="item">
			</div>
		</div>

		
	</form>
</body>
</html>