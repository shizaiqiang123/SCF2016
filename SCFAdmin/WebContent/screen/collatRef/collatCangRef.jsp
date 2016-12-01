<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>质物入库页面</title>
<script type="text/javascript" src="script/collatRef/collatCangRef.js"></script>
</head>
<body class="UTSCF">
	<form id="POForm">
		<div id="PODiv" class="easyui-panel" title="订单信息"
			data-options="collapsible:true" style="width: 100%">
			<table class="utTab">
				<tr>
					<td>交易流水号：</td>
					<td><input type="text" name="sysRefNo" id="sysRefNo"
						class="easyui-validatebox combo"
						data-options="validType:'maxLength[35]'"></td>
					<td>交易日期：</td>
					<td><input type="text" name="trxDt" id="trxDt"
						class="easyui-datebox" data-options="validType:'date'"  value="${sysUserInfo.sysDate }"></input></td>
				</tr>
				<tr>
					<td>授信人编号：</td>
					<td><input type="text" name="selId" id="selId"
						class="easyui-validatebox combo"
						data-options="validType:'maxLength[35]'"></input>
					<td>授信人名称：</td>
					<td><input type="text" name="selNm" id="selNm"
						class="easyui-validatebox combo"
						data-options="validType:'maxLength[35]'"></input></td>
				</tr>
				<tr>
					<td>业务类别：</td>
					<td><input id="busiTp" name="busiTp" class="easyui-combobox"
						data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
						editable="false"></input></td>
					<td>质押率：</td>
					<td><input type="text" name="fundRt" id="fundRt"
						class="easyui-numberspinner"
						data-options="min:0,max:100,suffix:'%'"></input></td>
				</tr>
				<tr>
					<td>授信额度币种：</td>
					<td><input class="easyui-combobox" id="lmtCcy" name="lmtCcy"
						editable="false"
						data-options="valueField: 'sysRefNo',textField: 'sysRefNo',panelHeight: 'auto'" />
					</td>
					<td>授信额度余额：</td>
					<td><input name="lmtBal" id="lmtBal" class="easyui-numberbox"
						data-options="groupSeparator:',', min:0,precision:2"
						editable="false"></input></td>
				</tr>
				<tr>
					<td>监管机构代码：</td>
					<td><input name="regId" id="regId"
						class="easyui-validatebox combo" required="true"
						data-options="validType:'maxLength[35]'"></input><a
						class="easyui-linkbutton" icon="icon-search"
						onclick="showCntrctPatWindow()">查询</a></td>
					<td>监管机构名称：</td>
					<td><input type="text" name="regNm" id="regNm"
						class="easyui-validatebox combo"
						data-options="validType:'maxLength[70]'"></input></td>
				</tr>
				<!-- <tr>
					<td>仓库编号：</td>
					<td><input name="wareId" id="wareId"
						class="easyui-validatebox combo" required="true"
						data-options="validType:'maxLength[35]'"></input><a
						class="easyui-linkbutton" icon="icon-search"
						onclick="showPatner()">查询</a></td>
					<td>仓库名称：</td>
					<td><input type="text" name="wareNm" id="wareNm"
						class="easyui-validatebox combo"
						data-options="validType:'maxLength[70]'"></input></td>
				</tr> -->
				<!-- 				<tr> -->
				<!-- 					<td>仓库地址：</td> -->
				<!-- 					<td><input type="text" name="storageAdr" id="storageAdr" -->
				<!-- 						class="easyui-validatebox combo" -->
				<!-- 						data-options="validType:'maxLength[14]'"></input> -->
				<!-- 					<td>仓库联系人：</td> -->
				<!-- 					<td><input type="text" name="contactNm" id="contactNm" -->
				<!-- 						class="easyui-validatebox combo" -->
				<!-- 						data-options="validType:'maxLength[70]'"></input></td> -->
				<!-- 				</tr> -->
				<tr>
					<td>协议编号：</td>
					<td><input name="cntrctNo" id="cntrctNo"
						class="easyui-validatebox combo"
						data-options="validType:'maxLength[35]'"></input></td>
					<td>仓单价值：</td>
					<td><input type="text" name="ccy" id="ccy"
						data-options="valueField: 'sysRefNo',textField: 'sysRefNo',panelHeight: 'auto'"
						class="easyui-combobox" required="true" style="width: 60px"
						editable="false"></input> <input type="text" name="regAmt"
						id="regAmt" class="easyui-numberspinner" style="width: 115px;"
						data-options="min:0,precision:2,groupSeparator:','"
						required="true" value='0'></input></td>
					<td><input type="hidden" name="sysId" id="sysId"></td>
				</tr>
				<tr>
					<td>仓单价值可覆盖敞口：</td>
					<td><input name="regAmtTemp" id="regAmtTemp"
						class="easyui-numberspinner"
						data-options="groupSeparator:',', min:0,precision:2"
						editable="false"></input></td>
					<td>仓单编号：</td>
					<td><input name="goDownNo" id="goDownNo"
						class="easyui-validatebox combo" required="true"
						data-options="validType:'maxLength[35]'"></input></td>
				</tr>
				<tr>
					<td><input type="hidden" name="ttlRegAmt" id="ttlRegAmt"></input></td>
					<td><input type="hidden" name="numTtlRegAmt" id="numTtlRegAmt" /></td>
					<td><input type="hidden" name="storageAdr" id="storageAdr" /></td>
					<td><input type="hidden" name="contactNm" id="contactNm" /></td>
				</tr>
			</table>
		</div>
		<div class="easyui-panel" title="商品信息" data-options="collapsible:true"
			style="width: 100%">
			<div id="CollateralDiv">
				<table id="CollateralTable" cellspacing="0" cellpadding="0"
					width="100%" iconCls="icon-edit">
				</table>
				<div id="toolbar" style="overflow: hidden">
					<a href="javascript:void(0)" class="easyui-linkbutton"
						iconcls="icon-add" onclick="addRow()" plain="true"
						style="float: right; margin-right: 14px;">添加</a> <a
						href="javascript:void(0)" class="easyui-linkbutton"
						iconcls="icon-edit" onclick="editRow()" plain="true"
						style="float: right">修改</a> <a href="javascript:void(0)"
						class="easyui-linkbutton" iconcls="icon-remove"
						onclick="deleteRow()" plain="true" style="float: right">删除</a> <a
						href="javascript:void(0)" class="easyui-linkbutton"
						iconcls="icon-impt" onclick="upload()" plain="true"
						style="float: right">导入</a>
				</div>
			</div>
		</div>
		<div id="reasonDiv" style="width: 100%" class="easyui-panel form"
			title="处理意见" data-options="collapsible:true">
			<div id="messageListDiv" style="display: block;">
				<div class="item" id="OldMessageDiv" style="display: block;">
					<span id="OldMessageSpan" style="display: block;" class="label">意见说明：</span>
					<div class="fl item-ifo">
						<input class="easyui-textbox" editable="false"
							data-options="multiline:true,validType:'maxLength[1000]'"
							style="width: 500PX; height: 100px" name="OldSysRelReason"
							id="OldSysRelReason" />
					</div>
				</div>
				<div class="item" id="messageDivFa">
					<span id="messageSpanY" style="display: none;" class="label">意见说明：</span>
					<span id="messageSpanN" style="display: block;" class="label"></span>
					<div id="messageDiv" style="display: block;" class="fl item-ifo">
						<input class="easyui-textbox"
							data-options="multiline:true,validType:'maxLength[1000]'"
							style="width: 500px; height: 100px" name="sysRelReason"
							id="sysRelReason" />
					</div>
				</div>
			</div>
		</div>
	</form>
</body>
</html>