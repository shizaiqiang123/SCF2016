<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>间接客户还款页面</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/pmt/cntPmt.js"></script>
</head>
<body>
<div id="pmtDiv" style="width:98%" class="easyui-panel" title="还款信息" data-options="collapsible:true" >
<form id="pmtForm">
			<table class="utTab">
				<tr>
					<td>还款批次号：</td>
    				<td><input type="text"  name="sysRefNo" id="sysRefNo"  /></td>
					<td>付款金额：</td>
					<td><input type="text" value="0" name="ttlPmtAmt" id="ttlPmtAmt"
						class="easyui-numberspinner" data-options="min:0,precision:2,groupSeparator:','"
						 ></input></td>
				</tr>
				<tr>
					<td>付款日期：</td>
					<td><input type="text"  name="pmtDt" id="pmtDt" class="easyui-datebox" required="required"/></td>
					<td>交易日期：</td>
					<td><input type="text"  name="trxDt" id="trxDt" class="easyui-datebox" required="required"/></td>
				</tr>
				<tr>
    			<td>业务类别：</td>
    			<td><input id="busiTp"  name="busiTp" class="easyui-combobox" 
					data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
				 	editable="false"   ></input></td>
    			<td>授信模式：</td>
    			<td><input id="serviceReq"  name="serviceReq" class="easyui-combobox" 
					data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
				 	editable="false"   ></input></td>
    		</tr>
    		<tr>
    			<td>授信客户编号：</td>
    			<td><input type="text"  name="selId" id="selId" class="easyui-validatebox combo"  required="true"  ></input>
    			<td>授信客户名称：</td>
    			<td><input type="text"  name="selNm" id="selNm"  ></input></td>
    		</tr>
    		<tr>
    			<td>间接客户编号：</td>
    			<td><input type="text"  name="buyerId" id="buyerId" class="easyui-validatebox combo"  required="true"  ></input>
    			<td>间接客户名称：</td>
    			<td><input type="text"  name="buyerNm" id="buyerNm"  ></input></td>
    		</tr>
    		<tr>
    			<td><input type="hidden"  name="returnAmt" id="returnAmt"></input>
    			<td><input type="hidden" value='1' name="pmtTp" id="pmtTp"></input>
    		</tr>
			</table>
		</form>
</div>
<div class="easyui-panel" title="应收账款信息" data-options="collapsible:true" style="width:97%;height:400px">
<div id="invcMDiv">
	<table id="invcMTable" cellspacing="0" cellpadding="0"
				width="100%" iconCls="icon-edit">
	</table>
	<div id="toolbar" style="overflow:hidden;">
<!-- 		 <a href="javascript:void(0)" class="easyui-linkbutton" -->
<!-- 			iconcls="icon-edit" onclick="editRow()" plain="true">修改</a> -->
		<a href="javascript:void(0)" class="easyui-linkbutton" id="querybutton"
				iconcls="icon-search" onclick="loadTable()" plain="true" style="float:right;margin-right:14px;">应收账款查询</a>
<!-- 			 <a -->
<!-- 			href="javascript:void(0)" class="easyui-linkbutton" -->
<!-- 			iconcls="icon-remove" onclick="deleteRow()" plain="true">删除</a>  -->
		</div>
   </div>
</div>
</body>
</html>