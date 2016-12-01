<%@ page language="java" contentType="text/html; charset=UTF-8"
	import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
<title>业务利率费率维护小页</title>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="script\para\BuRate_View.js"></script>
</head>
<body class="UTSCF">
	<div id="searchDiv" class="easyui-panel form"
		data-options="collapsible:true" style="width: 100%" align="center">
		<form id="mainForm">

			<div class="item">
				<span class="label">业务类型：</span>
				<div class="fl item-ifo">
					<input class="easyui-combobox" id="busiTp" name="busiTp"
						required="true"
						data-options="valueField: 'id',textField: 'text',panelHeight: 'auto',height:32,width:253,panelWidth:250,onChange:onChangeBusiTp"
						editable="false" />
				</div>
			</div>

			<div class="item">
				<span class="label">融资模式：</span>
				<div class="fl item-ifo">
					<input class="easyui-combobox" id="finaTp" name="finaTp"
						required="true"
						data-options="valueField: 'id',textField: 'text',panelHeight: 'auto',height:32,width:253,panelWidth:250,onChange:onChangeFinaTp"
						editable="false" />
				</div>
			</div>

			<div class="item">
				<span class="label">融资期限描述：</span>
				<div class="fl item-ifo">
					<input class="easyui-validatebox combo" name="acctPeriodDesc"
						id="acctPeriodDesc" required="true"
						data-options="validType:'maxLength[35]'" />
				</div>
			</div>

			<div class="item">
				<span class="label">融资期限(最大期限)：</span>
				<div class="fl item-ifo">
					<input class="easyui-numberbox combo" name="acctPeriod"
						required="true" id="acctPeriod"
						data-options="validType:'maxLength[10]',height:32,width:253,panelWidth:250,onChange:onChangeAcctPeriod" />(单位：天)
				</div>
			</div>

			<div class="item">
				<span class="label">客户等级：</span>
				<div class="fl item-ifo">
					<input class="easyui-combobox" name="custLevel" id="custLevel"
						required="true" editable="false"
						data-options="valueField: 'levelCd',textField: 'levelDesc',panelHeight: 'auto',height:32,width:253,panelWidth:250" />
				</div>
			</div>
			
			<div class="item">
				<span class="label">利率类型：</span>
				<div class="fl item-ifo">
					<input class="easyui-combobox" id="feeOrIntr" name="feeOrIntr"
						data-options="valueField: 'id',textField: 'text',panelHeight: 'auto',height:32,width:253,panelWidth:250,onChange:onChangeFeeOrIntr"
						editable="false" />
				</div>
			</div>

			<div class="item">
				<span class="label">利率取值方式：</span>
				<div class="fl item-ifo">
					<input class="easyui-combobox" id="rateTp" name="rateTp"
						data-options="valueField: 'id',textField: 'text',panelHeight: 'auto',height:32,width:253,panelWidth:250,onChange:onChangeRateTp"
						editable="false" />
				</div>
			</div>

			<div class="item">
				<span class="label">上浮点差：</span>
				<div class="fl item-ifo">
					<input class="easyui-numberbox combo" id="rtSpread" name="rtSpread"
						data-options="min:0,precision:4,suffix:'%',height:32,width:253,panelWidth:250,onChange:onChangeRtSpread" />
				</div>
			</div>

			<div class="item">
				<span class="label">上浮百分率：</span>
				<div class="fl item-ifo">
					<input class="easyui-numberbox combo" id="libor" name="libor"
						data-options="min:0,precision:4,suffix:'%',onChange:finalbaseRt,height:32,width:253,panelWidth:250,onChange:onChangeLibor" />
				</div>
			</div>

			<div class="item">
				<span class="label">基础利率/费率：</span>
				<div class="fl item-ifo">
					<input class="easyui-numberbox combo" id="baseRt" name="baseRt"
						data-options="min:0,precision:4,suffix:'%',height:32,width:253,panelWidth:250,onChange:onChangeRate"
						editable="false" />
				</div>
			</div>

			<div class="item">
				<span class="label">业务利率/费率：</span>
				<div class="fl item-ifo">
					<input class="easyui-numberbox combo" id="rate" name="rate"
						data-options="min:0,precision:4,suffix:'%',height:32,width:253,panelWidth:250"
						 />
				</div>
			</div>

		</form>
	</div>

</body>
</html>