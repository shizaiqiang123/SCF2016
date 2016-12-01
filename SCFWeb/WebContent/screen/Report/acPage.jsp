<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>交易首页</title>
<script type="text/javascript" src="script/Report/acPage.js"></script>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
</head>
<body class="UTSCF">
<div id="notice" class="div_ul">
	<div id="cntrcHome">
		<form id="cntrcHomeForm">
				<div id="noticeDiv" style="width: 100%;height:355px;" class="easyui-panel"
			         title="基本信息" data-options="collapsible:true">
			<div class="item">
				<span class="label">网点：</span>
				<div class="fl item-ifo"><input type="text" class="easyui-validatebox combo" name="instName" id="instName" required="true"  ></input><a class="easyui-linkbutton" icon="icon-search" onclick="showLookUpWindowInst()">查询</a></div>
			</div>
	       </div>
	       <div class="item">
				<div class="fl item-ifo">
				    <input type="hidden" id="instNo" name="instNo"/>	
	       			<input type="hidden" id="custNo" name="custNo"/>	
					<input type="hidden"  name="sysRefNo" id="sysRefNo"/>
				</div>
		   </div>
			 
	    
		</form>
	</div>
 </div>
</body>
</html>