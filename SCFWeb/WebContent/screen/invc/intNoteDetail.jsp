<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>利息查询信息</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/invc/intNoteDetail.js"></script>
</head>
<body class="UTSCF">
	<form id="loanForm">
		<div class="easyui-panel" title="利息明细" data-options="collapsible:true"
			style="width: 98%">
			<div id="cntrctDiv">
				<table class="utTab">
					<tr>
						<td>卖方名称：</td>
						<td><input type="text" name="custNm" id="custNm"></td>
						<td>业务类别：</td>
						<td><input name="busiTp" id="busiTp" class="easyui-combobox"
							data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
							editable="false"></td>
					</tr>
					<tr>
						<td>利息类型：</td>
						<td><input name="intTp" id="intTp" class="easyui-combobox"
							data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
							editable="false"></td>
						<td>收取方式：</td>
						<td><input name="payIntTp" id="payIntTp"
							class="easyui-combobox"
							data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
							editable="false"></td>
					</tr>
					<tr>
						<td>币别：</td>
						<td><input name="intCcy" id="intCcy" class="easyui-combobox"
							data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
							editable="false"></td>
						<td>关联业务交易流水号：</td>
						<td><input type="text" name="theirRef" id="theirRef"></td>
					</tr>
					<tr>
						<td>扣款账号：</td>
						<td><input type="text" name="selAcNo" id="selAcNo"></td>
						<td>利息产生时间：</td>
						<td><input type="text" name="createDt" id="createDt"
							class="easyui-datebox" data-options="validType:'date'"></input></td>
					</tr>
					<tr>
						<td>本次应收利息金额：</td>
						<td><input type="text" name="currInt" id="currInt"
							class="easyui-numberbox"
							data-options="min:0,precision:2,groupSeparator:','"></input></td>
						<td>本次应收利息日期：</td>
						<td><input type="text" name="currIntDt" id="currIntDt"
							class="easyui-datebox" data-options="validType:'date'"
							editable="false"></input></td>
					</tr>
					<tr>
						<td>本次实收利息金额：</td>
						<td><input type="text" name="currPayInt" id="currPayInt"
							class="easyui-numberbox"
							data-options="min:0,precision:2,groupSeparator:','"></input></td>
						<td>本次实收利息日期：</td>
						<td><input type="text" name="currIntPayDt" id="currIntPayDt"
							class="easyui-datebox" data-options="validType:'date'"
							editable="false"></input></td>
						<td><input type="hidden" name="selId" id="selId"></td>
					</tr>
				</table>
			</div>
		</div>
	</form>
</body>
</html>