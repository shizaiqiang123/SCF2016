<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>交易首页</title>
<script type="text/javascript" src="script/cntrct/custHomePage.js"></script>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
</head>
<body class="UTSCF">
	<div id="notice" class="div_ul">
		<div id="cntrcHome">
			<form id="cntrcHomeForm">
				<div id="noticeDiv" style="width: 100%" class="easyui-panel"
					title="卖方信息" data-options="collapsible:true">
					<div class="item">
						<span class="label">授信客户编号：</span>
						<div class="fl item-ifo">
							<input type="text" class="easyui-validatebox combo"
								name="sysRefNo" id="sysRefNo"
								data-options="validType:'maxLength[35]'"></input> <a
								class="easyui-linkbutton" icon="icon-search"
								onclick="showLookUpWindow()">查询</a>
						</div>
					</div>
					<div class="item">
						<span class="label">授信客户名称：</span>
						<div class="fl item-ifo">
							<input id="selNm" name="selNm" class="easyui-validatebox combo"
								data-options="width:'253px',height:'32px',valueField:'id',textField:'text',panelHeight: 'auto'"
								editable="false"></input>
						</div>
					</div>
					<div class="item">
						<div class="fl item-ifo">
						    <input type="hidden" name="ccy" id="ccy" value="CNY"></input>
						    <input type="hidden" name="selId" id="selId"></input>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</body>
</html>