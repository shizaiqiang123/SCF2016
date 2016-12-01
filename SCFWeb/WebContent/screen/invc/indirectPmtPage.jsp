<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<script type="text/javascript" src="script/invc/indirectPmtPage.js"></script>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
</head>
<body>
 	<div id="notice" class="div_ul">
	<div id="indirectPmtPage">
		<form id="indirectPmtPageForm">
			<div id="noticeDiv" style="width: 100%" class="easyui-panel"
			         title="授信额度信息" data-options="collapsible:true">
			<div class="item">
				<span class="label">协议流水号：</span>
				<div class="fl item-ifo"><input type="text" class="easyui-validatebox combo" name="cntrctNo" id="cntrctNo" required="true"></input><a class="easyui-linkbutton" icon="icon-search" onclick="showLookUpWindow()">查询</a></div>
			</div>
			<div class="item">
				<span class="label">授信客户名称：</span>
				<div class="fl item-ifo"><input id="selNm"   name="selNm" class="easyui-validatebox combo" 
					data-options="width:'253px',height:'32px',valueField:'id',textField:'text',panelHeight: 'auto'"
				 	editable="false"  ></input></div>
			</div>
			<div class="item">
				<span class="label">间接客户名称：</span>
				<div class="fl item-ifo"><input id="buyerId"   name="buyerId" class="easyui-combobox" 
					data-options="width:'253px',height:'32px',valueField:'buyerId',textField:'buyerNm',panelHeight: 'auto',onSelect:changeBuyerNm"
				 	editable="false"  required="true"></input></div>
			</div>
			<div  class="item">
				<span class="label">业务类别：</span>
				<div class="fl item-ifo"><input id="busiTp" name="busiTp"  class="easyui-combobox" required="true"
					data-options="width:'253px',height:'32px',valueField:'id',textField:'text',panelHeight: 'auto'"
				 	editable="false"  ></input></div>
			</div>
			<div  class="item">
				<span class="label">币种 ：</span>
				<div class="fl item-ifo"><input id="lmtCcy" name="lmtCcy"  class="easyui-combobox" 
					data-options="width:'253px',height:'32px',valueField:'id',textField:'text',panelHeight: 'auto'"
				 	editable="false"  ></input></div>
			</div>
			<div>
				<input type="hidden" id="selId" name="selId"/>
				<input type="hidden" id="buyerNm" name="buyerNm"/>
				<input type="hidden" id="sysRefNo" name="sysRefNo"/>
				<input type="hidden" id="lmtAmt" name="lmtAmt"/>
				<input type="hidden" id="lmtBal" name="lmtBal"/>
				<input type="hidden" id="lmtAvl" name="lmtAvl"/>
			</div>
			</div>
		</form>
	</div>
 </div>
</body>
</html>