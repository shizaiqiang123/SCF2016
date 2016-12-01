<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>价格变动页面</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/collatRef/collatPrice.js"></script>
</head>
<body class="UTSCF">
<form id="POForm">
<div id="PODiv"  class="easyui-panel" title="订单信息" data-options="collapsible:true" style="width:100%">
	<table class="utTab">
			<tr>
    			<td>系统流水号：</td>
    			<td><input type="text"  name="sysRefNo"  id="sysRefNo" class="easyui-validatebox combo" data-options="validType:'maxLength[35]'"></td>
    			<td>协议编号：</td>
    			<td><input  name="cntrctNo" id="cntrctNo" class="easyui-validatebox combo"  data-options="validType:'maxLength[35]'"></input>
    		</tr>
    		
    		<tr>
    			<td>业务类别：</td>
    			<td><input   id="busiTp"  name="busiTp" class="easyui-combobox" 
					data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
				 	editable="false" ></input></td>
    			<td>质押率：</td>
				<td><input type="text"  name="fundRt" id="fundRt" class="easyui-numberspinner"  data-options="min:0,precision:2,max:100,suffix:'%'"></input></td>
			</tr>
			
    		<tr>
    			<td>授信客户编号：</td>
    			<td><input type="text"  name="selId" id="selId" class="easyui-validatebox combo" data-options="validType:'maxLength[35]'"></input>
    			<td>授信客户名称：</td>
    			<td><input type="text"  name="selNm" id="selNm" class="easyui-validatebox combo" data-options="validType:'maxLength[35]'"></input></td>
    		</tr>
    		
    		<tr>
    			<td>授信额度余额：</td>
				<td><input  name="lmtBal" id="lmtBal"  class="easyui-numberbox" data-options="groupSeparator:',', min:0,precision:2" editable="false" ></input></td>
    			<td>币种：</td>
    			<td><input class="easyui-combobox"  id="ccy" name="ccy" editable="false" data-options="valueField: 'sysRefNo',textField: 'sysRefNo',panelHeight: 'auto'"/>
				</td>
    		</tr>
    		
    		<tr>
    			<td>库存价值总额：</td>
				<td><input  name="ttlRegAmt" id="ttlRegAmt"  class="easyui-numberspinner" data-options="onChange:coutMargin,groupSeparator:',', min:0,precision:2" editable="false" ></input></td>
				<td>最低库存价值：</td>
					<td><input type="text" name="ttlLowPayNum" id="ttlLowPayNum"
						class="easyui-numberbox"
						data-options="groupSeparator:',', min:0,precision:2"></input></td>
			</tr>
			
			<tr>
				<td>保证金余额：</td>
				<td><input editable="false" value="0" name="initBailBal"
					id="initBailBal" class="easyui-numberbox" 
					data-options="min:0,precision:2,groupSeparator:','"></input></td>
					<td>协议下融资余额：</td>
				<td><input type="text" name="openLoanAmt" id="openLoanAmt"
					class="easyui-numberbox"
					data-options="groupSeparator:',', min:0,precision:2"
					></input></td>
			</tr>
			
			<tr>
				<td>需补充保证金金额：</td>
				<td><input type="text" name="marginApplied" id="marginApplied"
					class="easyui-numberbox"
					data-options="groupSeparator:',', min:0,precision:2"
					></input></td>
			</tr>
			
			<tr>
				<td>
					<input type="hidden" id="patnerId" name="patnerId">
					<input type="hidden" id="patnerNm" name="patnerNm">
					<input type="hidden" id="storageId" name="storageId">
					<input type="hidden" id="storageNm" name="storageNm">
                </td>
		    </tr>
	</table>
</div>
<div class="easyui-panel" title="商品信息" data-options="collapsible:true" style="width:100%">
	<div id="CollateralDiv">
		<table id="CollateralTable" cellspacing="0" cellpadding="0"
					width="100%" iconCls="icon-edit">
		</table>
	   <div id="toolbar" style="overflow:hidden">
					<a href="javascript:void(0)"
						class="easyui-linkbutton"
						data-options="iconCls:'icon-save',plain:true" onclick="accept()" style="float:right;margin-right:14px;">接受改变</a>
		</div>
	</div>
</div>
</form>
</body>
</html>