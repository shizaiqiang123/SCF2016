<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>新增授信额度信息页面</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/cntrct/BuyerCntrct.js"></script>
</head>
<body>
	<div class="div_ul">
		<form id="cntrctForm">
			<div id="cntrctDiv"
				style="width: 100%; height: auto; min-height: 380px"
				class="easyui-panel" title="协议信息" data-options="collapsible:true">
				<table class="utTab">
					<tr>
						<td>协议编号：</td>
						<td><input type="text" name="cntrctNo" id="cntrctNo"
							class="easyui-validatebox combo" required="true"
							data-options="validType:'maxLength[35]'"></input></td>
						<td>授信网点：</td>
						<td><input type="text" class="easyui-validatebox combo"
							required="true" name="bchNm" id="bchNm"></input><a
							class="easyui-linkbutton" icon="icon-search"
							onclick="showLookUpWindow()">查询</a></td>

					</tr>
					<tr>
						<td>业务类别：</td>
						<td><input id="busiTp" name="busiTp" class="easyui-combobox"
							data-options="onSelect:changeBusiTp,valueField:'id',textField:'text',panelHeight: 'auto'"
							editable="false" required="true"></input></td>
						<td>买方客户编号：</td>
						<td><input type="text" name="buyerId" id="buyerId"
							class="easyui-validatebox combo" required="true"
							data-options="validType:'maxLength[35]'"></input><a
							class="easyui-linkbutton" icon="icon-search"
							onclick="buyerLookUpWindow()">客户</a></td>
					</tr>
					<tr>
						<td>组织机构号：</td>
						<td><input type="text" name="sellerInstCd" id="sellerInstCd"
							class="easyui-validatebox combo" required="true"
							data-options="validType:'maxLength[35]'"></input></td>
						<td>买方客户名称：</td>
						<td><input type="text" name="buyerNm" id="buyerNm"
							class="easyui-validatebox combo"
							data-options="validType:'maxLength[35]'"></input></td>

					</tr>
					<tr>
						<td>授信额度币种：</td>
						<td><input class="easyui-combobox" id="lmtCcy" name="lmtCcy"
							required="true"
							data-options="valueField: 'sysRefNo',textField: 'sysRefNo',panelHeight: 'auto'"
							editable="false" /></td>
						<td>授信额度金额：</td>
						<td><input type="text" name="lmtAmt" id="lmtAmt"
							class="easyui-numberbox" required="true"
							data-options="onChange:changelmtAmt,min:0,precision:2,groupSeparator:',',validType:'maxLength[18]'"></input></td>

					</tr>
					<tr>
						<td>可用额度：</td>
						<td><input type="text" name="lmtBal" id="lmtBal"
							class="easyui-numberbox" required="true"
							data-options="min:0,precision:2,groupSeparator:','"></input></td>
						<td>已用额度：</td>
						<td><input type="text" name="lmtAllocate" id="lmtAllocate"
							class="easyui-numberbox" required="true"
							data-options="min:0,precision:2,groupSeparator:','"></input></td>

					</tr>
					<tr>
						<td>生效日：</td>
						<td><input type="text" name="lmtValidDt" id="lmtValidDt"
							class="easyui-datebox" required="required"
							data-options="validType:'date'"></input></td>
						<td>到期日：</td>
						<td><input type="text" name="lmtDueDt" id="lmtDueDt"
							class="easyui-datebox" required="required"
							data-options="onChange:getDueDt,validType:'date'"></input></td>

					</tr>
					<tr id="Tr1">
						<td>扣息方式：</td>
						<td><input id="payIntTp" name="payIntTp"
							class="easyui-combobox"
							data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
							editable="false" value="1"></input></td>
						<td id="loanRtTd">正常利率：</td>
						<td><input type="text" name="loanRt" id="loanRt"
							class="easyui-numberspinner" required="true"
							data-options="min:0,precision:2,max:100,suffix:'%'"></input></td>
					</tr>
					<tr id="Tr2">
						<td>罚息利率：</td>
						<td><input type="text" name="penaRt" id="penaRt"
							class="easyui-numberspinner"
							data-options="min:0,precision:2,max:100,suffix:'%'"></input></td>
						<td>应收账款处理费：</td>
						<td><input type="text" name="billAmt" id="billAmt"
							class="easyui-numberspinner"
							data-options="min:0,precision:2,max:1000000000">/张</input></td>
					</tr>
					<tr id="Tr3">
						<td>手续费率：<!-- (原转让费率) --></td>
						<td><input type="text" name="transChgrt" id="transChgrt"
							class="easyui-numberspinner" required="true"
							data-options="min:0,precision:2,max:100,suffix:'%'"></input></td>
						<td id="finaTpTitleTd">融资模式：</td>
						<td id="finaTpTd"><input id="finaTp" name="finaTp"
							class="easyui-combobox"
							data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
							editable="false"></input></td>
					</tr>


					<tr id="Tr11">
						<td>应收账款余额：</td>
						<td><input type="text" name="arBal" id="arBal"
							class="easyui-numberbox" readOnly="readOnly"
							data-options="min:0,precision:2,groupSeparator:','"></input></td>
						<td>可融资余额：</td>
						<td><input type="text" name="arAvalLoan" id="arAvalLoan"
							class="easyui-numberbox" readOnly="readOnly"
							data-options="min:0,precision:2,groupSeparator:','"></input></td>

					</tr>
					<tr id="Tr10">
						<td>手续费率：<!-- (原转让费率) --></td>
						<td><input type="text" name="transChgrtTwo"
							id="transChgrtTwo" class="easyui-numberspinner"
							data-options="min:0,precision:2,max:100,suffix:'%'"></input></td>
						<td>已融资敞口：</td>
						<td><input type="text" name="openLoanAmt" id="openLoanAmt"
							class="easyui-numberbox" readOnly="readOnly"
							data-options="min:0,precision:2,groupSeparator:','"></input></td>
					</tr>
					<tr id="Tr12">

						<td>追索标识：</td>
						<td><input id="recourseTp" name="recourseTp"
							class="easyui-combobox"
							data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
							editable="false" value="1"></input></td>

					</tr>

					<tr id="Tr4">
						<td id="pldPercT">质押率：</td>
						<td id="pldPercD"><input type="text" name="pldPerc"
							id="pldPerc" class="easyui-numberspinner"
							data-options="min:0,precision:2,max:100,suffix:'%'"></input></td>
						<td id="initGartPctT">初始化保证金比例：</td>
						<td id="initGartPctD"><input type="text" name="initGartPct"
							id="initGartPct" class="easyui-numberspinner" required="true"
							data-options="min:0,precision:2,max:100,suffix:'%'"></input></td>
					</tr>
					<tr id="Tr5">
						<td>初始保证金是否允许提货：</td>
						<td><input id="initThFlg" name="initThFlg"
							class="easyui-combobox"
							data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
							editable="false" value="Y"></input></td>
						<td id='crtfWarPrdT'>合格证预警期限：</td>
						<td id='crtfWarPrdD'><input type="text" name="crtfWarPrd"
							id="crtfWarPrd" class="easyui-numberspinner" value='15'
							data-options="min:0,max:9999"></input></td>
					</tr>
					<tr id="Tr6">
						<td>核心企业编号：</td>
						<td><input type="text" class="easyui-validatebox combo"
							name="buyerIdN" id="buyerIdN"></input><a
							class="easyui-linkbutton" icon="icon-search"
							onclick="showBuyerLookUpWindow()">查询</a></td>
						<td>核心企业名称：</td>
						<td><input type="text" class="easyui-validatebox combo"
							name="buyerNmN" id="buyerNmN"></input></td>
					</tr>
					<tr id="Tr9">
						<td>监管机构编号：</td>
						<td><input type="text" class="easyui-validatebox combo"
							name="patnerId" id="patnerId"></input><a
							class="easyui-linkbutton" icon="icon-search"
							onclick="showPatner()">查询</a></td>
						<td>监管机构名称：</td>
						<td><input type="text" class="easyui-validatebox combo"
							name="patnerNm" id="patnerNm"></input></td>
					</tr>

					<tr id="Tr7">
						<td>担保方式：</td>
						<td><input id="insureTp" name="insureTp"
							class="easyui-combobox"
							data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
							editable="false"></input></td>
						<td>是否占用保险公司额度：</td>
						<td><input id="isPossInsure" name="isPossInsure"
							class="easyui-combobox"
							data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
							editable="false"></input></td>
					</tr>
					<tr id="Tr17">
						<td>最大跌幅率：</td>
						<td><input name="maxDroPerc" id="maxDroPerc"
							class="easyui-numberspinner" required="true"
							data-options="min:0,precision:2,suffix:'%'"></input></td>
					</tr>
					<tr id="Tr8">
						<td rowspan="2">保单说明：</td>
						<td colspan="5" rowspan="2"><input class="easyui-textbox"
							data-options="missingMessage:'输入项为必输项',multiline:true,validType:'maxLength[200]'"
							style="width: 30%; height: 55px" name="insureLimit"
							id="insureLimit"></td>
					</tr>
					<tr id="Tr16">
						<td>是否分配供应商额度：</td>
						<td><input id="isSendSelLmt" name="isSendSelLmt"
							class="easyui-combobox" required="true"
							data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
							editable="false"></input></td>
						<!-- <td rowspan="2" id="sellerLmtLimitT">授信客户额度限制条款：</td>
						<td colspan="5" rowspan="2" id="sellerLmtLimitD"><input
							class="easyui-textbox"
							data-options="missingMessage:'输入项为必输项',multiline:true,validType:'maxLength[200]'"
							style="width: 30%; height: 55px" name="sellerLmtLimit"
							id="sellerLmtLimit"></td> -->
					</tr>
					<tr>
						<td><input type="hidden" name="cmsCustNo" id="cmsCustNo"></td>
						<td><input type="hidden" name="lmtSysRefNo" id="lmtSysRefNo"></td>
						<td><input type="hidden" name="cmsCntrctNo" id="cmsCntrctNo"></td>
						<td><input type="hidden" name="custBrId" id="custBrId"></td>
						<td><input type="hidden" name="selId" id="selId"></td>
						<td><input type="hidden" name="sysRefNo" id="sysRefNo"></td>
						<td><input type="hidden" name="lmtBalHD" id="lmtBalHD"></td>
						<td><input type="hidden" name="lmtAmtHD" id="lmtAmtHD"></td>
						<td><input type="hidden" name="lmtAllocateHD"
							id="lmtAllocateHD"></td>
						<td><input type="hidden" name="sysRefNoHD" id="sysRefNoHD"></td>
						<td><input type="hidden" name="insureNo" id="insureNo"></td>
						<td><input type="hidden" name="insureAmt" id="insureAmt"></td>
						<td><input type="hidden" name="paySts" id="paySts"></td>
						<!-- 为了控制买方和卖方不互通，新建协议时默认此字段为0 -->
					</tr>
					<tr>
						<td><input type="hidden" name="openIntAmt" id="openIntAmt"></td>
						<td><input type="hidden" name="lmtRecover" id="lmtRecover"></td>
						<td><input type="hidden" name="ttlRegAmt" id="ttlRegAmt"></td>
						<!-- 为了在修改时保存库存价值 -->
						<td><input type="hidden" name="regLowestVal"
							id="regLowestVal"></td>
						<!-- 为了在修改时保存regLowsetVal，赋值给最低库存价值 -->
					</tr>
				</table>
			</div>
			<div id="collatDiv">
				<div style="width: 100%" class="easyui-panel" title="保单信息"
					data-options="collapsible:true">
					<table class="utTab" id="collat">
						<tr>
							<td>保险公司名称：</td>
							<td><input class="easyui-validatebox combo"
								name="collatCompNm" id="collatCompNm"
								data-options="validType:'maxLength[200]'"></input><a
								class="easyui-linkbutton" icon="icon-search"
								onclick="showCollatWindow()">查询</a></td>
							<td>保单编号：</td>
							<td><input class="easyui-validatebox combo" name="collatNo"
								id="collatNo" data-options="validType:'maxLength[40]'"></input></td>
						</tr>
						<tr>
							<td>保单金额：</td>
							<td><input type="text" name="collatAmt" id="collatAmt"
								class="easyui-numberbox"
								data-options="onChange:changeCollatAmt,min:0,precision:2,groupSeparator:','"></input></td>
							<td>保单生效日期：</td>
							<td><input type="text" name="collatVailDt" id="collatVailDt"
								class="easyui-datebox"
								data-options="onSelect:changeCollatVailDt,validType:'date'"></input></td>
						</tr>
						<tr>
							<td>保单到期日期：</td>
							<td><input type="text" name="collatDueDt" id="collatDueDt"
								class="easyui-datebox"
								data-options="onSelect:changeCollatDueDt,validType:'date'"></input></td>
							<td>总赔付比例：</td>
							<td><input type="text" name="collatCompensateRt"
								id="collatCompensateRt" class="easyui-numberspinner"
								data-options="min:0,precision:2,suffix:'%'"></input></td>
						</tr>
						<tr>
							<td>最高赔付限额：</td>
							<td><input type="text" name="collatMaxCompensateAmt"
								id="collatMaxCompensateAmt" class="easyui-numberbox"
								data-options="min:0,precision:2,groupSeparator:','"></input></td>
						</tr>
						<tr>
							<td><input type='hidden' name="trxDt" id="trxDt"
								value="${sysUserInfo.sysDate }"></td>

						</tr>
					</table>
				</div>
			</div>
			<div id="sbrInfoDiv">
				<div class="easyui-panel" title="关联关系信息"
					data-options="collapsible:true" style="width: 100%">
					<div id="acnoDiv1">
						<table id="sbrTable" cellspacing="0" cellpadding="0" width="100%"
							iconCls="icon-edit">
						</table>
						<div id="toolbar1" style="overflow: hidden">
							<a href="javascript:void(0)" class="easyui-linkbutton"
								iconcls="icon-add" onclick="addSbrRow()" plain="true"
								style="float: right; margin-right: 14px;">添加</a> <a
								href="javascript:void(0)" class="easyui-linkbutton"
								iconcls="icon-edit" onclick="editSbrRow()" plain="true"
								style="float: right">修改</a> <a href="javascript:void(0)"
								class="easyui-linkbutton" iconcls="icon-remove"
								onclick="deleteSbrRow()" plain="true" style="float: right">删除</a>
						</div>
					</div>
				</div>
			</div>
			<div id="collatInfoDiv">
				<div class="easyui-panel" title="货物信息"
					data-options="collapsible:true" style="width: 100%">
					<div id="collatDiv">
						<table id="collatTable" cellspacing="0" cellpadding="0"
							width="100%" iconCls="icon-edit">
						</table>
						<div id="collatToolbar" style="overflow: hidden">
							<a href="javascript:void(0)" class="easyui-linkbutton"
								iconcls="icon-add" onclick="queryCollat()" plain="true"
								style="float: right; margin-right: 14px;">添加</a> <a
								id="collatRemoveId" href="javascript:void(0)"
								class="easyui-linkbutton" iconcls="icon-remove"
								onclick="deleteCollat()" plain="true" style="float: right">删除</a>
						</div>
					</div>
				</div>
			</div>
			<div id="partyInfoDiv">
				<div class="easyui-panel" title="监管方信息"
					data-options="collapsible:true" style="width: 100%">
					<div id="partyDiv">
						<table id="partyTable" cellspacing="0" cellpadding="0"
							width="100%" iconCls="icon-edit">
						</table>
						<div id="partyToolbar" style="overflow: hidden">
							<a href="javascript:void(0)" class="easyui-linkbutton"
								iconcls="icon-add" onclick="showPatnerToPat()" plain="true"
								style="float: right; margin-right: 14px;">添加</a> <a
								id="patnerRemoveId" href="javascript:void(0)"
								class="easyui-linkbutton" iconcls="icon-remove"
								onclick="deleteParty()" plain="true" style="float: right">删除</a>
						</div>
					</div>
				</div>
			</div>
		</form>
	</div>
</body>
</html>