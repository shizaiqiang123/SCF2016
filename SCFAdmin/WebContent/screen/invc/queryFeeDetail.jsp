<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>费用查询信息</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/invc/queryFeeDetail.js"></script>
</head>
<body class="UTSCF">
	<form id="feeForm">
		<div class="easyui-panel" title="费用查询信息"
			data-options="collapsible:true" style="width: 98%">
			<div id="feeDiv">
				<table class="utTab">
					<tr>
						<td>关联业务流水号：</td>
						<td><input type="text" name="theirRef" id="theirRef"></td>
						<td>卖方名称：</td>
						<td><input type="text" name="selNm" id="selNm"></td>
					</tr>
					<tr>
						<td>业务类别：</td>
						<td><input name="busiTp" id="busiTp"
						    class="easyui-combobox"
						    data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
						    editable="false" ></td>
						<td>费用类型：</td>
						<td><input id="costTp" name="costTp" 
						    class="easyui-combobox"
						    data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
						    editable="false" ></input></td>
					</tr>
					<tr>
						<td>扣款账号：</td>
						<td><input type = "text" name="selAcNo" id="selAcNo"></td>
						<td>费用收取日期：</td>
						<td><input type = "text" id="currFinPayDt" name="currFinPayDt"></input></td>
					</tr>
					<tr>
						<td>币别：</td>
						<td><input type = "text"  name="costCcy" id="costCcy"></td>
						<td>收取处理费金额：</td>
						<td><input name="currFinPayCost" id="currFinPayCost"
							class="easyui-numberbox"
							data-options="groupSeparator:',', min:0,precision:2" value="0"></td>
					</tr>
					<tr>
						<td>收取手续费金额：</td>
						<td><input name="currTransPayCost" id="currTransPayCost"
							class="easyui-numberbox"
							data-options="groupSeparator:',', min:0,precision:2" value="0"></td>
					</tr>
				</table>
			</div>
		</div>
	</form>
</body>
</html>