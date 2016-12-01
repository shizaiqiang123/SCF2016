<%@ page language="java" contentType="text/html; charset=UTF-8"
	import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
<title>基础利率维护小页</title>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="script\para\BasalRate_View.js"></script>
</head>
<body class="UTSCF">
		<form id='mainForm' style="padding: 30px;">
			<div class="item">
				<span class="label">业务类型：</span>
				<div class="fl item-ifo">
					<input class="easyui-combobox" id="busiTp" name="busiTp"
						required="true"
						data-options="valueField: 'id',textField: 'text',panelHeight: 'auto',height:32,width:253,panelWidth:250"
						editable="false" />
				</div>
			</div>
			<div class="item">
				<span class="label">融资模式：</span>
				<div class="fl item-ifo">
					<input class="easyui-combobox" id="finaTp" name="finaTp"
						required="true"
						data-options="valueField: 'id',textField: 'text',panelHeight: 'auto',height:32,width:253,panelWidth:250"
						editable="false" />
				</div>
			</div>
			<div class="item">
				<span class="label">融资期限描述：</span>
				<div class="fl item-ifo">
					<input class="easyui-validatebox combo" name="acctPeriodDesc"
						required="true" id="acctPeriodDesc"
						data-options="validType:'maxLength[35]'" />
				</div>
			</div>
			<div class="item">
				<span class="label">融资期限(最大期限)：</span>
				<div class="fl item-ifo">
					<input class="easyui-numberbox combo" name="acctPeriod"
						required="true" id="acctPeriod"
						data-options="validType:'maxLength[35]',height:32,width:253,panelWidth:250" />(单位：天)
				</div>
			</div>
			<div class="item">
				<span class="label">利率/费率：</span>
				<div class="fl item-ifo">
					<input class="easyui-numberbox" name="baseRt" id="baseRt"
						required="true"
						data-options="min:0,precision:4,suffix:'%',height:32,width:253,panelWidth:250" />
				</div>
				<!-- data-options="validType:'maxLength[38]'"  -->
			</div>
			<div class="item">
				<span class="label">利率类型：</span>
				<div class="fl item-ifo">
					<input class="easyui-combobox" id="feeOrIntr" name="feeOrIntr"
						data-options="valueField: 'id',textField: 'text',panelHeight: 'auto',height:32,width:253,panelWidth:250"
						editable="false" />
				</div>
			</div>
		</form>
</body>
</html>