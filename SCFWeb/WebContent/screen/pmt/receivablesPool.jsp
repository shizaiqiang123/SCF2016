<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>应收账款详情页面</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/pmt/receivablesPool.js"></script>
<style type="text/css">
.textbox .textbox-prompt {
	font-size: 14px;
	color: black;
}
</style>
</head>
<body class="UTSCF">
	<div class="div_ul">
		<form id="loanSubmit">
			<div id="loanDiv"
				style="width: 100%; height: auto; min-height: 380px"
				class="easyui-panel" title="应收账款详情页面"
				data-options="collapsible:true">
				<table class="utTab">
					<tr>
						<td>流水号：</td>
						<td><input type="text" name="sysRefNo" id="sysRefNo"></td>
						<td>授信额度编号：</td>
						<td><input type="text" name="cntrctNo" id="cntrctNo"></td>
					</tr>
					<tr>
						<td>组织机构代码：</td>
						<td><input type="text" name="sellerInstCd" id="sellerInstCd"></td>
						<td>授信客户名称：</td>
						<td><input type="text" name="selNm" id="selNm"></td>
					</tr>
					<tr>
						<td>业务类别：</td>
						<td><input id="busiTp" name="busiTp" class="easyui-combobox"
							data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
							editable="false"></input></td>
						<td>币种：</td>
						<td><input class="easyui-combobox" id="ccy" name="ccy"
							data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
							editable="false"></input></td>
					</tr>
					<tr>
						<td>间接客户编号：</td>
						<td><input type="text" name="buyerId" id="buyerId"></td>
						<td>间接客户名称：</td>
						<td><input type="text" name="buyerNm" id="buyerNm"></td>
					</tr>
					<tr>
						<td>应收账款凭证编号：</td>
						<td><input type="text" name="invNo" id="invNo"></td>
						<td>应收账款金额：</td>
						<td><input type="text" name="invAmt" id="invAmt"
							class="easyui-numberbox"
							data-options="min:0,precision:2,groupSeparator:','" value=0></input></td>
					</tr>
					<tr>
						<td>可融资余额：</td>
						<td><input type="text" name="invLoanAval" id="invLoanAval"
							class="easyui-numberbox"
							data-options="min:0,precision:2,groupSeparator:','" value=0></input></td>
						<td>应收账款净额：</td>
						<td><input type="text" name="invBal" id="invBal"
							class="easyui-numberbox"
							data-options="min:0,precision:2,groupSeparator:','" value=0></input></td>
					</tr>
					<!-- <tr>
				<td>单据开立日期：</td>
				<td><input type="text" name="invDt" id="invDt"
					class="easyui-datebox"  data-options="validType:'date'"></input></td>
				<td>单据起算日：</td>
				<td><input type="text" name="invValDt" id="invValDt"
					class="easyui-datebox"  data-options="validType:'date'"></input></td>
			</tr> -->
					<tr>
						<td>账期：</td>
						<td><input type="text" name="acctPeriod" id="acctPeriod"
							class="easyui-numberspinner" data-options="min:0,max:9999"></input></td>
						<td>到期日：</td>
						<td><input type="text" name="invDueDt" id="invDueDt"
							class="easyui-datebox" required="required"
							data-options="validType:'date',onSelect:changeinvDueDt"></input></td>
					</tr>
					<tr>
						<td>融资比例：</td>
						<td><input type="text" value="80" name="loanPerc"
							id="loanPerc" class="easyui-numberspinner"
							data-options="min:0,precision:2,max:100,suffix:'%'"></input></td>
					</tr>
					<tr id = "Tr1">
						<td>预付款金额：</td>
						<td><input type="text" name="acctAmt" id="acctAmt"
							class="easyui-numberbox"
							data-options="min:0,precision:2,groupSeparator:','" value=0></input></td>
					</tr>
					<tr>
						<input type="hidden" name="selId" id="selId" />
						<input type="hidden" name="loanRt" id="loanRt" />
						<input type="hidden" name="lastPayDt" id="lastPayDt" />
						<input type="hidden" name="intAmt" id="intAmt" />
						<input type="hidden" id="licenceNo" name="licenceNo" />
						<input type="hidden" name="acNoSts" id="acNoSts" />
					</tr>
				</table>
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
	</div>
</body>
</html>