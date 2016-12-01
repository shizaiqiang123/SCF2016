<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>买方保理-融资申请页面</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/loan/buyerInvcLoan.js"></script>
</head>
<body class="UTSCF">
	<form id="loanSubmit">
		<div id="loanDiv" style="width: 100%" class="easyui-panel"
			title="融资信息" data-options="collapsible:true">
			<table class="utTab">
				<tr>
					<td>交易流水号：</td>
					<td><input type="text" name="sysRefNo" id="sysRefNo" required="true"></td>
					<td>组织机构代码：</td>
					<td><input type="text" name="sellerInstCd" id="sellerInstCd" required="true"></td>
				</tr>
				<tr>
					<td>业务类别：</td>
					<!-- <td><input id="busiTp" name="busiTp" type="text" class="easyui-combobox"
						data-options="valueField:'id',textField:'text',panelHeight: 'auto',onChange:changeLoanTp"
						editable="false"></td> -->
					<td><input id="busiTp" name="busiTp" type="text" class="easyui-combobox"
						data-options="valueField:'id',textField:'text',panelHeight: 'auto'," editable="false"></td>
					<td>供应商名称：</td>
					<td><input type="text" name="selNm" id="selNm" required="true"></input></input><a
							class="easyui-linkbutton" icon="icon-search" id="querySellerInfobutton" 
							onclick="querySellerInfo()">查询</a></td>
				</tr>
				<tr>
					<td>放款账号：</td>
					<td><input class="easyui-combobox"  id="selAcNo" name="selAcNo"
				 			data-options="valueField: 'acNo',textField: 'acNo',panelHeight: 'auto',onChange:changeSelAcNo" 
				 			editable="false" /></td>
				    <td>开户行：</td>
					<td><input type="text"  id="selAcBkNm" name="selAcBkNm" required="true" /></td>
				</tr>
				<tr>
					<td>币别：</td>
					<td><input type="text" name="ccy" id="ccy"/></td>
					<td>融资金额：</td>
					<td><input  name="ttlLoanAmt"
						id="ttlLoanAmt" class="easyui-numberbox"  value="0" 
						data-options="min:0,precision:2,groupSeparator:',',onChange:changeInvcAval,validType:'maxLength[18]'"></input></td>
				</tr>
				<tr>
					<td>可融资金额：</td>
					<td><input  value="0" name="loanAble" required="true"
						id="loanAble" class="easyui-numberspinner"
						data-options="min:0,precision:2,groupSeparator:',',onChange:changeTtlLoanAmt"></input></td>
					<td>融资日期：</td>
					<td><input type="text" name="loanValDt" id="loanValDt" required="true"
						class="easyui-datebox" editable="false" data-options="onChange:reloadInvcLoanTable"></input></td>
				<tr>
					<td>正常利率值：</td>
					<td><input name="loanRt" id="loanRt"
						class="easyui-numberspinner" 
						data-options="min:0,precision:2,max:100,onChange:changeLoanRt,suffix:'%'" required="true" ></td>
					<td>融资到期日：</td>
					<td><input type="text" name="loanDueDt" id="loanDueDt" required="true"
						class="easyui-datebox" editable="false" data-options="onChange:getDueDt"></input></td>
				</tr>
				<tr>
					<td>是否收取费用：</td>
					<td><input id="isCollect" name="isCollect"
						class="easyui-combobox"
						data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
						editable="false"></input></td>
					<td>手续费：</td>
					<td><input type="text" name="pdgAmt" id="pdgAmt"
						class="easyui-numberbox"
						data-options="min:0,precision:2,groupSeparator:','" value=0></input></td>
				</tr>
				<tr>
					<td>扣息方式：</td>
				 		<td><input class="easyui-combobox"  id="payIntTp" name="payIntTp" 
				 		data-options="onSelect:changePayIntTp,valueField:'id',textField:'text',panelHeight: 'auto'"
				 		editable="false" required="true" /></td>
				 	<td id="Tr1">利息总金额：</td>
					<td id="Tr2"><input type="text" name="intAmt" id="intAmt"
						class="easyui-numberbox"
						data-options="min:0,precision:2,groupSeparator:','" value=0></input></td>
				</tr>
				<tr>
					
					<td>贷款资金用途：</td>
					<td><input class="easyui-textbox" 
					data-options="missingMessage:'输入项为必输项',multiline:true,validType:'maxLength[50]'"
					style="width:180px; height: 50px" name="loanApplicat"
							id="loanApplicat"></td>
				</tr>
				<tr>
					<td><input type="hidden"  name="lmtBal" id="lmtBal"></input></td>
					<td><input type="hidden"  name="lmtAmt" id="lmtAmt"></input></td>
					<td><input type="hidden"  name="lmtAmtHd" id="lmtAmtHd"></input></td>
					<td><input type="hidden"  name="lmtBalHd" id="lmtBalHd"></input></td>
				    <!-- 协议编号 -->
				    <td><input type="hidden" name="cntrctNo" id="cntrctNo"></input></td>
				    <!-- 融资余额 -->
				    <td><input type = "hidden" name="ttlLoanBal" id="ttlLoanBal" ></td>
				    
				    <!-- 系统交易日期 -->
				    <td><input type="hidden" name="trxDt" id="trxDt" value="${sysUserInfo.sysDate }"></td>
				    
				    <!-- 买方额度余额 -->
					<td><input type="hidden" name="buyerLmtBal" id="buyerLmtBal"></input></td>
					<td><input type="hidden" name="buyerLmtBalHd" id="buyerLmtBalHd"></input></td>
				    <!-- 买方已占用额度 -->
				    <td><input type="hidden" name="buyerTtlAllocate" id="buyerTtlAllocate" ></td>
					<td><input type="hidden" name="buyerTtlAllocateHd" id="buyerTtlAllocateHd" ></td>
					<!-- 供应商额度余额 -->
					<td><input type="hidden" name="sellerLmtBal" id="sellerLmtBal"></input></td>
					<td><input type="hidden" name="sellerLmtBalHd" id="sellerLmtBalHd"></input></td>
					<!-- 供应商已占用额度 -->
					<td><input type="hidden" name="sellerTtlAllocate" id="sellerTtlAllocate" ></td>
					<td><input type="hidden" name="sellerTtlAllocateHd" id="sellerTtlAllocateHd" ></td>
					<!--  -->
					<td><input type="hidden" name="dueDt" id="dueDt"></td>
					<!-- 买方额度表流水号 -->
					<td><input type="hidden" name="buyerLmtSysRefNo" id="buyerLmtSysRefNo"></td>
					<!-- 卖方额度表流水号 -->
					<td><input type="hidden" name="sellerLmtSysRefNo" id="sellerLmtSysRefNo"></td>
					<td><input type="hidden"  name="currFinPayCost" id="currFinPayCost" value=0 ></input></td>
					<!-- 本次应收处理费，不管收不收取手续费这个字段必要入表 -->
					<td><input type="hidden"  name="currFinCost" id="currFinCost" value=0 ></input></td>
					<!-- 插入fee表时候的流水号字段 -->
    				<td><input type="hidden"  name="feeSysRefNo" id="feeSysRefNo" ></input></td>
    				<!-- 插入int表时候的流水号字段 -->
    				<td><input type="hidden"  name="feeSysRefNo" id="intSysRefNo"  ></input></td>
    				<!-- 本次应收利息 -->
    				<td><input type="hidden" name="currInt" id="currInt" ></td>
    				<!-- 本次实收利息 -->
    				<td><input type="hidden" name="currPayInt" id="currPayInt" ></td>
    				<!-- 本次利息应收日期 -->
    				<td><input type="hidden" name="currIntDt" id="currIntDt" ></td>
    				<!-- 本次利息实收日期 -->
    				<td><input type="hidden" name="currIntPayDt" id="currIntPayDt" ></td>
    				<!-- 转让费率 -->
    				<td><input type="hidden" name="transChgrt" id="transChgrt"></td>
    				<!-- 最大可融资金额 -->
    				<td><input type="hidden" name="totalLoan" id="totalLoan"></td>
    				<!-- 最大可融资金额 -->
    				<td><input type="hidden" name="selId" id="selId"></td>
				</tr>
				
			</table>
		</div>
		<div id="invcMDiv" style="width: 100%; height: auto"
			class="easyui-panel" title="应收账款信息" data-options="collapsible:true">
			<table class="easyui-datagrid" id="invcLoanTable" cellspacing="0"
				cellpadding="0" style="width: 100%; height: auto"
				iconCls="icon-edit">
			</table>
			<div id="toolbar" style="overflow:hidden">
				<a href="javascript:void(0)" class="easyui-linkbutton"
					id="querybutton" iconcls="icon-search" onclick="loadTable()"
					plain="true" style="float:right;margin-right:14px;">应收账款查询</a>
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