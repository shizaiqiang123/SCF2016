<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>应收账款转让页面</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/invc/buyerPoolInvcM.js"></script>
</head>
<body>
	<form id="invcMForm">
		<div id="cntrctDiv" class="easyui-panel" title="基本信息"
			data-options="collapsible:true" style="width: 100%">
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
					<td><input type="text" name="selNm" id="selNm"
						class="easyui-validatebox combo" required="true"></input><a
						class="easyui-linkbutton" icon="icon-search"
						onclick="selIdLookUp()">查询</a></td>
				</tr>
				<tr>
					<td>业务类别：</td>
					<td><input id="busiTp" name="busiTp" class="easyui-combobox"
						data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
						editable="false"></input></td>
					<td>币种</td>
					<td><input class="easyui-combobox" id="ccy" name="ccy"
						data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
						editable="false" /></input></td>
				</tr>
				<tr>
					<td>是否收取费用：</td>
					<td><input id="isCollect" name="isCollect"
						class="easyui-combobox"
						data-options="valueField:'id',textField:'text',panelHeight: 'auto',onChange:changeIsCollect"
						editable="false"></input></td>
					<!-- <td>手续费：</td>
					<td><input type="text" name="pdgAmt" id="pdgAmt"
						class="easyui-numberbox"
						data-options="min:0,precision:2,groupSeparator:','" value=0></input></td> -->
					<td>应收账款处理费金额：</td>
					<td><input type="text" name="currTransPayCost"
						id="currTransPayCost" class="easyui-numberbox"
						data-options="min:0,precision:2,groupSeparator:','" value=0></input></td>
				</tr>
				<tr>
					<td id="pldNoHD">待转让笔数：</td>
					<td><input type="text" name="regNo" id="regNo"
						class="easyui-numberbox" value=0></input></td>
					<td id="pldAmtHD">待转让金额：</td>
					<td><input type="text" name="regAmt" id="regAmt"
						class="easyui-numberbox"
						data-options="min:0,precision:2,groupSeparator:','" value=0></input></td>
				</tr>
				<tr>
					<td>可融资余额：</td>
					<td><input type="text" name="arAvalLoan" id="arAvalLoan"
						class="easyui-numberbox"
						data-options="min:0,precision:2,groupSeparator:','" value=0></input></td>
					<!--     		     <td id = "bx1">保险公司名称：</td> -->
					<!--     			 <td id = "bx2"><input type="text"  class="easyui-validatebox combo" name="collatCompNm"  id="collatCompNm" ></td> -->
					<td><input type="hidden" name="poolLine" id="poolLine" value=0></input></td>
					<td><input type="hidden" name="poolLineHD" id="poolLineHD"
						value=0></input></td>
					<td><input type="hidden" name="currTransCost"
						id="currTransCost" value=0></input></td>
					<!-- 本次应收处理费，不管收不收取手续费这个字段必要入表 -->
					<td><input type="hidden" name="feeSysRefNo" id="feeSysRefNo"
						value=0></input></td>
					<!-- 插入fee表时候的流水号字段 -->
				</tr>
				<tr>
					<td><input type="hidden" name="cntSysRefNo" id="cntSysRefNo"></td>
					<td><input type="hidden" id="accetpFlag" name="accetpFlag"
						value="false"></td>
					<td><input type="hidden" name="buyerLmtAmt" id="buyerLmtAmt"></td>
					<td style="display: none"><input type="hidden" name="dueDt"
						class="easyui-datebox" id="dueDt" /></td>
					<td style="display: none"><input type="hidden"
						class="easyui-datebox" name="trxDt" id="trxDt"
						value="${sysUserInfo.sysDate}" /></td>
					<td><input type="hidden" name="transChgrt" id="transChgrt"></input></td>
					<td><input type="hidden" name="billAmt" id="billAmt"></input></td>
					<td><input type="hidden" name="selId" id="selId"></input></td>
					<td><input type="hidden" name="buyerId" id="buyerId"></input></td>
					<td><input type="hidden" name="insureNo" id="insureNo"></input></td>
					<td><input type="hidden" name="arBal" id="arBal"></input></td>
					<!-- 应收账款余额字段 -->
					<td><input type="hidden" name="arBalHD" id="arBalHD"></input></td>
					<!-- 应收账款余额字段是临时字段 -->

					<!-- 费用表信息 -->
					<td style="display: none"><input type="hidden" name="sysData"
						class="easyui-datebox" id="sysData" value=${sysUserInfo.sysDate } /></td>
					<td><input type="hidden" name="selAcNo" id="selAcNo"></td>
					<td><input type="hidden" name="selAcNm" id="selAcNm"></td>
					<td><input type="hidden" name="selAcBkNm" id="selAcBkNm"></td>
					<td><input type="hidden" name="lmtBalHD" id="lmtBalHD"></td>
					<td><input type="hidden" name="acctPeriod" id="acctPeriod"></td>
					<td><input id="trxId" name="trxId" type="hidden"></td>
					<td><input id="sbrId" name="sbrId" type="hidden"></td>
					<td><input type="hidden" name="loanPerc" id="loanPerc"></td>
					<td><input type="hidden" name="lmtBal" id="lmtBal"></td>
					<td><input type="hidden" name="cntrctlmtBal" id="cntrctlmtBal"></td>
					<td><input type="hidden" name="arBalHD" id="arBalHD"></td>
					<td><input type="hidden" name="arAvalLoanHD" id="arAvalLoanHD"></td>
					<td><input type="hidden" name="buyerLmtBat" id="buyerLmtBat"></td>
					<td><input type="hidden" name="lmtAllocate" id="lmtAllocate"></td>
					<td><input type="hidden" name="trfFlg" id="trfFlg"></td>
				</tr>
			</table>
		</div>
		<!--modify by shizaiqiang用于应收账款质押功能  -->
		<div id="pldDiv">
			<div style="width: 100%" class="easyui-panel" title="质押信息"
				data-options="collapsible:true">
				<table class="utTab">
					<tr>
						<td>出质人：</td>
						<td><input type="text" name="pldNm" id="pldNm"></input></td>
						<td>质权人：</td>
						<td><input type="text" name="pawNm" id="pawNm"></input></td>
					</tr>
					<tr>
						<td>质押合同号码：</td>
						<td><input type="text" name="pldCnNo" id="pldCnNo"></input></td>
						<td>质押财产描述：</td>
						<td><input type="text" name="pldRem" id="pldRem"></input></td>

					</tr>
					<tr>
						<td>质押起始日：</td>
						<td><input class="easyui-datebox" name="pldValDt"
							id="pldValDt" editable="false" required="true"></input></td>
						<td>质押到期日：</td>
						<td><input class="easyui-datebox" name="pldDueDt"
							id="pldDueDt" editable="false" required="true"></input></td>
					</tr>
					<tr id="lmtValidDtHD">
						<td>协议起始日：</td>
						<td><input class="easyui-datebox" name="lmtValidDt"
							id="lmtValidDt" editable="false"></input></td>
						<td>协议到期日：</td>
						<td><input class="easyui-datebox" name="lmtDueDt"
							id="lmtDueDt" editable="false"></input></td>
					</tr>
					<tr>
						<td>质押财产价值：</td>
						<td><input type="text" name="pldPro" id="pldPro"
							class="easyui-numberbox"
							data-options="min:0,precision:2,groupSeparator:','" value=0></input></td>
					</tr>
				</table>
			</div>
		</div>
		<div id="invcMDiv" class="easyui-panel" title="应收账款列表"
			data-options="collapsible:true" style="width: 100%">
			<table id="invcMTable" cellspacing="0" cellpadding="0" width="100%"
				iconCls="icon-edit">
			</table>
			<div id="toolbar" style="overflow: hidden">
				<a href="javascript:void(0)" class="easyui-linkbutton"
					id="querybutton" iconcls="icon-search" onclick="loadTable()"
					plain="true" style="float: right; margin-right: 14px;">查找</a>
				<!-- <a
			href="javascript:void(0)" class="easyui-linkbutton" id="acceptbutton"
<!-- 			iconcls="icon-save" onclick="accept()" plain="true">接受改变</a>  -->
				<a--> <!-- 			href="javascript:void(0)" class="easyui-linkbutton" -->
				<!-- 			iconcls="icon-remove" onclick="deleteRow()" plain="true">删除</a> <a
			href="javascript:void(0)" class="easyui-linkbutton"
			iconcls="icon-impt" onclick="upload()" plain="true">导入</a> -->
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