 <%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>新增协议信息页面</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/loan/invcLoanPage.js"></script>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
</head>
<body class="UTSCF">
<div id="notice" class="div_ul">
	<div id="cntrcHome">
		<form id="cntrcHomeForm">
			<div id="noticeDiv" style="width: 100%" class="easyui-panel"
			         title="协议信息" data-options="collapsible:true">
			<div class="item">
				<span class="label">协议流水号：</span>
				<div class="fl item-ifo"><input type="text" class="easyui-validatebox combo" name="cntrctNo" id="cntrctNo" required="true"  ></input><a class="easyui-linkbutton" icon="icon-search" onclick="showLookUpWindow()">查询</a></div>
			</div>
			<div class="item">	
				<span class="label">组织机构代码：</span>
				<div class="fl item-ifo"><input type="text" class="easyui-validatebox combo" name="sellerInstCd" id="sellerInstCd"  data-options="validType:'maxLength[35]'"></input></div>
			</div>
			<div class="item">	
				 <span class="label">授信客户名称：</span>
				<div class="fl item-ifo"><input id="selNm"   name="selNm" class="easyui-validatebox combo" 
					data-options="width:'253px',height:'32px',valueField:'id',textField:'text',panelHeight: 'auto'"
				 	editable="false"  ></input></div>
			</div>
			<div class="item">
				<span class="label">业务类别：</span>
				<div class="fl item-ifo"><input id="busiTp" name="busiTp"  class="easyui-combobox" 
					data-options="width:'253px',height:'32px',valueField:'id',textField:'text',panelHeight: 'auto'"
				 	editable="false"  ></input></div>
			</div>
			<div class="item">	
				<span class="label">币种：</span>
				<div class="fl item-ifo"><input id="lmtCcy"  name="lmtCcy" class="easyui-validatebox combo" 
					data-options="width:'253px',height:'32px',valueField:'id',textField:'text',panelHeight: 'auto'"
				 	editable="false"  ></input></div>
			</div>
			<div>
				<input type="hidden" name="sysRefNo" id="sysRefNo" >
				<input type="hidden" name="selId" id="selId" >
				<input type="hidden" name="lmtBal" id="lmtBal" >
				<input type="hidden" name="serviceReq" id="serviceReq" >
				<input type="hidden" name="loanPct" id="loanPct" >
				<input type="hidden" name="finChgrt" id="finChgrt" >
				<input type="hidden" name="loanRt" id="loanRt" >
				<input type="hidden" name="arAvalLoan" id="arAvalLoan" >
				<input type="hidden" name="payIntTp" id="payIntTp" >
				<input type="hidden" name="lmtAllocate" id="lmtAllocate" >
				<input type="hidden" name="lmtAmt" id="lmtAmt" >
				<input type="hidden" name="sellerLmtLimit" id="sellerLmtLimit" >
				<input type="hidden" name="initMarginPct" id="initMarginPct" >
			</div>
	       </div>
		</form>
	</div>
 </div>
</body>
</html>