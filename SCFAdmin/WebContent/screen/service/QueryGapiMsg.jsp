<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>接口监控页面</title>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/service/QueryGapiMsg.js"></script>
<!-- <meta http-equiv="refresh" content="5"> -->
</head>
<body class="UTSCF" style="width: 100%; margin: 0 auto">
	<div>
		<form id="searchForm">
			<ul class="condList clearfix" id="screenDiv">
				<div class="selectDiv" id="selectDiv">
					<div class="remindDiv"></div>
					<li class="condLists fL clearfix"><span
						class="dsB fL height34"> <input
							class="inputM1 combo queryInputStyleOne" type="text"
							name="resendTimesSearch" id="resendTimesSearch"
							placeholder="重发次数" />
					</span></li>
				</div>
				<li>
					<div class="sysCatalogQuery sysCatalogBtn" id="querySellerQuery"
						onclick="SearchPortMonitor()">
						<img class="sysCatalogImg" src="images/style/catalogQuery.png">
					</div> <a href="javascript:void(0)" onclick="javascript:aBtnEvent();">
						<div class="moreQuery">更多筛选条件</div>
				</a>
				</li>
				<div
					style="display: none; float: left; width: 1000px; margin-left: -32px; margin-bottom: 10px;"
					id="moreSearchDiv">
					<ul class="condList clearfix" id="moreSearchUl">
						<li class="condLists fL clearfix"><label
							class="dsB fL tR labelStyle">异常信息:</label> <span class="dsB fL">
								<input class="inputM1 combo queryInputStyleTwo" type="text"
								name="errorMsgSearch" id="errorMsgSearch" />
						</span></li>
						<li class="condLists fL clearfix"><label
							class="dsB fL tR labelStyle">接口类型:</label> <span class="dsB fL">
								<input class="inputM1 combo queryInputStyleTwo" type="text"
								name="gapiTypeSearch" id="gapiTypeSearch" />
						</span></li>
					</ul>
				</div>
			</ul>
		</form>
	</div>
	<table id="dg" title="查询信息列表" class="easyui-datagrid" cellspacing="0"
		cellpadding="0" width="100%" iconCls="icon-edit">
	</table>
	</div>
	<form id='mainForm'>
		<div id="userDiv" style="width: 100%" class="easyui-panel"
			title="接口异常信息" data-options="collapsible:true">
			<div class="item">
				<span class="label">接口编号：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo" name="gapiId"
						id="gapiId" data-options="validType:'maxLength[35]'" />
				</div>
			</div>
			<div class="item">
				<span class="label">接口类型：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo" name="gapiType"
						id="gapiType" data-options="validType:'maxLength[35]'" />
				</div>
			</div>
			<div class="item">
				<span class="label">重发次数：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo"
						name="resendTimes" id="resendTimes"
						data-options="validType:'maxLength[35]'" />
				</div>
			</div>
			<div class="item">
				<span class="label">异常信息：</span>
				<div class="fl item-ifo">
					<input class="easyui-textbox"
						data-options="multiline:true,validType:'maxLength[500]'"
						style="width: 253PX; height: 50px" name="errorMsg" id="errorMsg" />
				</div>
			</div>
			<div class="item">
				<span class="label">发送内容：</span>
				<div class="fl item-ifo">
					<input class="easyui-textbox"
						data-options="multiline:true,validType:'maxLength[500]'"
						style="width: 253PX; height: 50px" name="sendMessage"
						id="sendMessage" />
				</div>
			</div>
			<div class="item">
				<span class="label">回复内容：</span>
				<div class="fl item-ifo">
					<input class="easyui-textbox"
						data-options="multiline:true,validType:'maxLength[500]'"
						style="width: 253PX; height: 50px" name="receiveMessage"
						id="receiveMessage" />
				</div>
			</div>
	</form>
</body>
</html>