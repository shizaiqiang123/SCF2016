<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>新增关联信息页面</title>
<script type="text/javascript" src="script/cntrct/addCntrctThrSbr.js"></script>
</head>
<body>
	<form id="addCntrctSbrForm">
		<div id="addCntrctSbrDiv">
			<table class="utTab">
				<tr>
					<!-- <td>授信客户编号：</td>
    			<td><input type="text"  name="selId"  id="selId" class="easyui-validatebox combo"  data-options="validType:'maxLength[35]'" required="true"></td> -->
					<td>授信客户组织机构代码：</td>
					<td><input type="text" name="sellerInstCd" id="sellerInstCd"
						class="easyui-validatebox combo"
						data-options="validType:'maxLength[35]'" required="true"></td>
					<td>授信客户名称：</td>
					<td><input type="text" name="selNm" id="selNm"
						class="easyui-validatebox combo"
						data-options="validType:'maxLength[35]'"></td>
				</tr>
				<tr>
					<td>间接客户组织机构代码：</td>
					<td><input type="text" name="buyerInstCd" id="buyerInstCd"
						class="easyui-validatebox combo"
						data-options="validType:'maxLength[35]'" required="true"><a
						class="easyui-linkbutton" icon="icon-search"
						onclick="showLookUpWindow()">查询</a></td>
					<td>间接客户名称：</td>
					<td><input type="text" name="buyerNm" id="buyerNm"
						class="easyui-validatebox combo"
						data-options="validType:'maxLength[35]'"></td>
				</tr>
				<tr id="Tr5">
					<td>关联间接客户额度：</td>
					<td><input type="text" name="buyerLmtAmt" id="buyerLmtAmt"
						class="easyui-numberspinner" required="true"
						data-options="onChange:setBuyerLmtBat,min:0,precision:2"></input></td>
					<td>关联间接客户额度余额：</td>
					<td><input type="text" name="buyerLmtBat" id="buyerLmtBat"
						class="easyui-validatebox combo"
						data-options="min:0,precision:2,groupSeparator:','"></input></td>
				</tr>
				<tr>
					<td>联系人：</td>
					<td><input type="text" name="ctctNm" id="ctctNm"
						class="easyui-validatebox combo"
						data-options="validType:'maxLength[35]'"></input></td>
					<td>联系电话：</td>
					<td><input type="text" name="ctctTel" id="ctctTel"
						class="easyui-validatebox combo"
						data-options="validType:'maxLength[35]'"></input></td>
				</tr>
				<tr>
					<td>传真号码：</td>
					<td><input type="text" name="ctctFax" id="ctctFax"
						class="easyui-validatebox combo"
						data-options="validType:'maxLength[35]'"></input></td>
					<td>备注：</td>
					<td><input type="text" name="remark" id="remark"
						class="easyui-validatebox combo"
						data-options="validType:'maxLength[35]'"></input></td>
				</tr>
				<tr id="Tr3">
					<td>融资比例：</td>
					<td><input type="text" value="70" name="loanPct" id="loanPct"
						class="easyui-numberspinner" required="true"
						data-options="min:0,precision:2,max:100,suffix:'%'"></input></td>
				</tr>
				<tr id="Tr6">
					<td>账期：</td>
					<td><input type="text" name="acctPeriod" id="acctPeriod"
						class="easyui-numberspinner" data-options="min:0,max:9999"></input></td>
				</tr>
				<tr id="Tr4">
					<td>赊销宽限期：</td>
					<td><input type="text" name="openactGraceDay"
						id="openactGraceDay" class="easyui-numberspinner"
						data-options="min:0"></input></td>
					<td>融资宽限期：</td>
					<td><input type="text" name="graceDay" id="graceDay"
						class="easyui-numberspinner" data-options="min:0,max:9999"></input></td>
				</tr>

				<tr id="Tr1">
					<td>间接客户限额：</td>
					<td><input type="text" name="buyerImposeAmt"
						id="buyerImposeAmt" class="easyui-numberspinner"
						data-options="onChange:setBuyerLmtBat,min:0,precision:2"></input></td>
					<td>单笔赔付限额：</td>
					<td><input type="text" name="singleImposeAmt"
						id="singleImposeAmt" class="easyui-numberspinner"
						data-options="min:0,precision:2,groupSeparator:','"></input></td>
				</tr>
				<tr id="Tr2">
					<td>赔付比例：</td>
					<td><input type="text" name="payRt" id="payRt"
						class="easyui-numberspinner"
						data-options="min:0,precision:2,max:100,suffix:'%'"></input></td>
				</tr>
				<tr>
					<td><input type="hidden" name="sysRefNo" id="sysRefNo"></td>
					<td><input type="hidden" name="trxId" id="trxId"></td>
					<td><input type="hidden" name="cntrctNo" id="cntrctNo"></td>
					<td><input type="hidden" name="selId" id="selId"></td>
					<td><input type="hidden" name="buyerId" id="buyerId"></td>
					<td><input type="hidden" name="lmtBalTemp" id="lmtBalTemp"></td>
					<td><input type="hidden" name="lmtBalHd" id="lmtBalHd"></td>
					<td><input type="hidden" name="buyerSysRefNo"
						id="buyerSysRefNo"></td>
					<!-- <td><input type="hidden" name="lmtAmt" id="lmtAmt"></td>
    			<td><input type="hidden" name="lmtBal" id="lmtBal"></td> -->
					<td><input type="hidden" name="lmtAllocate" id="lmtAllocate"></td>
					<td><input type="hidden" name="lmtRecover" id="lmtRecover"></td>
					<td><input type="hidden" name="lmtCcy" id="lmtCcy"></td>
					<!--  
    			<td><input type="hidden" name="acctPeriod" id="acctPeriod"></td>
    			<td><input type="hidden" name="openactGraceDay" id="openactGraceDay"></td>
    			<td><input type="hidden" name="graceDay" id="graceDay"></td>
    			-->

				</tr>
			</table>
		</div>
	</form>
</body>
</html>