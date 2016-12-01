<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>买方保理池融资申请页面</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/loan/buyerInvcLoanPool.js"></script>
</head>
<body class="UTSCF">
	<form id="loanSubmit">
		<div id="loanDiv" style="width: 100%" class="easyui-panel"
			title="池融资信息" data-options="collapsible:true">
			<table class="utTab">
				<tr>
					<td>交易流水号：</td>
					<td><input type="text" name="sysRefNo" id="sysRefNo" required="true"></td>
					<td>协议编号：</td>
					<td><input type="text" name="cntrctNo" id="cntrctNo" required="true"></td>
				</tr>
				<tr>
					<td>业务类别：</td>
					<td><input id="busiTp" name="busiTp" type="text" class="easyui-combobox"
						data-options="valueField:'id',textField:'text',panelHeight: 'auto'"	editable="false"></td>
					<td>供应商名称：</td>
					<td><input type="text" name="selNm" id="selNm" required="true"></input>
						<a class="easyui-linkbutton" icon="icon-search" onclick="querySellerInfo()">查询</a>
					</td>
				</tr>
				<tr>
					<td>扣款账号：</td>
					<td><input class="easyui-combobox"  id="selAcNo" name="selAcNo"
				 			data-options="valueField: 'acNo',textField: 'acNo',panelHeight: 'auto',onChange:changeSelAcNo" 
				 			editable="false" required="true"/></td>
				 	<td>开户行：</td>
					<td><input type="text"  id="selAcBkNm" name="selAcBkNm" required="true" /></td>
				</tr>
				<tr>
				 	<td>账号名称：</td>
					<td><input id="selAcNm" name="selAcNm" required="true"/></td>
					<td>应付账款余额：</td>
					<td><input  name="arBal" id="arBal"
						class="easyui-numberbox" editable="false"data-options="min:0,precision:2,groupSeparator:','"></input></td>
				</tr>
				<tr>
					<td>币别：</td>
					<td><input type="text" name="ccy" id="ccy"/></td>
					<td>可融资金额：</td>
					<td><input  value="0" name="loanAble" required="true"
						id="loanAble" class="easyui-numberspinner"
						data-options="min:0,precision:2,groupSeparator:','"></input></td>
				</tr>
				<tr>
					<td>组织机构代码：</td>
					<td><input type="text" name="sellerInstCd" id="sellerInstCd" required="true"></td>
					<td>融资日期：</td>
					<td><input type="text" name="loanValDt" id="loanValDt" required="true"
						class="easyui-datebox" editable="false" data-options="onSelect:countIntAmt"></input></td>
				</tr>
				<tr>
					<td>融资金额：</td>
					<td><input  name="ttlLoanAmt"
						id="ttlLoanAmt" required="true" class="easyui-numberbox"
						data-options="min:0,precision:2,groupSeparator:',',onChange:changeTtlLoanAmt,validType:'maxLength[18]'"></input></td>	
					<td>融资到期日：</td>
					<td><input type="text" name="loanDueDt" id="loanDueDt" required="true"
						class="easyui-datebox" editable="false" data-options="onSelect:countIntAmt"></input></td>
				<tr>
					<td>已融资金额：</td>
					<td><input  name="openLoanAmt"
						id="openLoanAmt" class="easyui-numberbox"
						data-options="min:0,precision:2,groupSeparator:',',validType:'maxLength[18]'"></input></td>
					<td>正常利率值：</td>
					<td><input name="loanRt" id="loanRt"
						class="easyui-numberspinner" required="true"
						data-options="min:0,precision:2,max:100,onChange:changeLoanRt,suffix:'%'" required="true" ></td>
				</tr>
				<tr>
					<td>扣息方式：</td>
					<td><input class="easyui-combobox"  id="payIntTp" name="payIntTp" required="true"
				 		data-options="valueField: 'id',textField: 'text',panelHeight: 'auto',onChange:countIntAmt" 
				 		editable="false" required="true" /></td>
				 	<td>利息总金额：</td>
					<td><input  name="intAmt"
						id="intAmt" class="easyui-numberbox"
						data-options="min:0,precision:2,groupSeparator:',',validType:'maxLength[18]'"></input></td>	
				</tr>
				
				<tr>
					<td>是否收取费用：</td>
					<td><input id="isCollect" name="isCollect"
						class="easyui-combobox"
						data-options="valueField:'id',textField:'text',panelHeight: 'auto',onChange:countPdgAmt"
						editable="false"></input></td>
					 <td>手续费：</td>
					<td><input type="text" name="pdgAmt" id="pdgAmt"
						class="easyui-numberbox"
						data-options="min:0,precision:2,groupSeparator:','" value=0></input></td> 
					
				</tr>
				<tr>
					
				</tr>
				<tr>
					<!-- <td>融资次数：</td> -->
					<td><input type="hidden" name="poolLine" id="poolLine"></input></td>
					<td><input type="hidden" name="lmtBal" id="lmtBal"></input></td>
					<td><input type="hidden" name="lmtAmt" id="lmtAmt"></input></td>
					<td><input type="hidden" name="lmtAmtHd" id="lmtAmtHd"></input></td>
					<td><input type="hidden" name="lmtBalHd" id="lmtBalHd"></input></td>
					<td><input type="hidden" name="trxDt" id="trxDt" value="${sysUserInfo.sysDate }"></td>
					<td><input type="hidden" name="selId" id="selId"></td>
					<td><input type="hidden" name="flag" id="flag" value="false"></td>
					<td><input type="hidden" name="acNOFlag" id="acNOFlag" value="true"></td>
					<td><input type="hidden" name="lmtAllocate" id="lmtAllocate" ></td>
					<td><input type="hidden" name="lmtAllocateHd" id="lmtAllocateHd" ></td>
					<td><input type="hidden" name="sellerLmtLimit" id="sellerLmtLimit" ></td>
					<td><input type="hidden" name="ttlLoanBal" id="ttlLoanBal" ></td>
					<td><input type="hidden"  name="currFinPayCost" id="currFinPayCost" value=0 ></input></td>
					<td><input type="hidden"  name="currFinCost" id="currFinCost" value=0 ></input></td><!-- 本次应收处理费，不管收不收取手续费这个字段必要入表 -->
    				<td><input type="hidden"  name="feeSysRefNo" id="feeSysRefNo" ></input></td><!-- 插入fee表时候的流水号字段 -->
    				<td><input type="hidden"  name="feeSysRefNo" id="intSysRefNo"  ></input></td><!-- 插入int表时候的流水号字段 -->
    				<td><input type="hidden" name="currInt" id="currInt" ></td><!-- 本次应收利息 -->
    				<td><input type="hidden" name="currPayInt" id="currPayInt" ></td><!-- 本次实收利息 -->
    				<td><input type="hidden" name="currIntDt" id="currIntDt" ></td><!-- 本次利息应收日期 -->
    				<td><input type="hidden" name="currIntPayDt" id="currIntPayDt" ></td><!-- 本次利息实收日期 -->
    				<td><input type="hidden" name=" ttlLoanAmtOld" id="ttlLoanAmtOld" ></td>
    				<!-- 买方额度表流水号 -->
					<td><input type="hidden" name="buyerLmtSysRefNo" id="buyerLmtSysRefNo"></td>
					<!-- 卖方额度表流水号 -->
					<td><input type="hidden" name="sellerLmtSysRefNo" id="sellerLmtSysRefNo"></td>
					<!-- 供应商额度余额 -->
					<td><input type="hidden" name="sellerLmtBal" id="sellerLmtBal"></input></td>
					<td><input type="hidden" name="sellerLmtBalHd" id="sellerLmtBalHd"></input></td>
					<!-- 供应商已占用额度 -->
					<td><input type="hidden" name="sellerTtlAllocate" id="sellerTtlAllocate" ></td>
					<td><input type="hidden" name="sellerTtlAllocateHd" id="sellerTtlAllocateHd" ></td>
				</tr>
				<tr>
					<td><input type="hidden" name="loanLay" id="loanLay" value="1"></td>
					<td><input type="hidden" name="priGartLay" id="priGartLay" value="00"></td>
					<td><input type="hidden" name="cmsCustNo" id="cmsCustNo"></td>
					<td><input type="hidden" name="custMgrId" id="custMgrId"></td>
					<td><input type="hidden" name="custBrId" id="custBrId"></td>
					<td><input type="hidden" name="loanDueTime" id="loanDueTime"></td>
					<td><input type="hidden" name="dueDt" id="dueDt"></td>
					<td><input type="hidden" name="loanOverdueDt" id="loanOverdueDt"></td>
					<td><input type="hidden" name="loanTotal" id="loanTotal"></td>
					<td><input type="hidden" name="marginAmtRe" id="marginAmtRe"></td>
					<td><input type="hidden" name="loanApplicat" id="loanApplicat"></td>
					<td><input type="hidden" name="transChgrt" id="transChgrt"></td>
					<td><input type="hidden" name="loanPct" id="loanPct"></td>
					<td><input type="hidden" name="loanAbleOld" id="loanAbleOld"></td>
					<td><input type="hidden" name="openLoanAmtOld" id="openLoanAmtOld"></td>
					<td><input type="hidden" name="loanTp" id="loanTp"></td>
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
</body>
</html>