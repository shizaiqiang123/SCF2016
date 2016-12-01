<%@ page language="java" contentType="text/html; charset=UTF-8"
	import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
<title>BatchRoot Add Batch</title>
<script type="text/javascript" src="js/para/BatchRoot_Batch_Add.js"></script>
</head>
<body>
	<div>
		<div>
			<form id="searchForm">
				<!-- <label>Batch编号：</label> <input type="text" name="batchId" id="batchId"
					title="用户编号" /> <label>Batch名称：</label> <input type="text"
					name="batchNm" id="batchNm" title="用户名称" /> <a
					class="easyui-linkbutton" icon="icon-search"
					onclick="SearchBatchInfo()">查询</a> -->
		   <ul class="condList clearfix" id="screenDiv">
					<div class="selectDiv" id="selectDiv">
						<div class="remindDiv"></div>
						<li class="condLists fL clearfix"><span class="dsB fL">
								<input class="inputM1 combo" type="text"
								style="border: 1px solid #fff;width:100px" name="batchId" id="batchId"
								placeholder="用户编号" />
						</span></li>
						<li class="condLists fL clearfix">
							<div
								style="float: left; height: 32px; width: 1px; border-right: 1px solid #bcbcbc; margin-right: 6px; margin-left: 6px;"></div>
						</li>
						<li class="condLists fL clearfix"><span class="dsB fL">
								<input class="inputM1 combo" type="text"
								style="border: 1px solid #fff;width:100px" name="batchNm"
								id="batchNm" placeholder="用户名称" />
						</span></li>
					</div>
					<li>
						<div class="sysCatalogQuery sysCatalogBtn" id="querySellerQuery"
						onclick="SearchComfInfo()">
							<img class="sysCatalogImg" src="images/style/catalogQuery.png">
						</div>
						<div class="sysCatalogReset sysCatalogBtn" id="querySellerReset"
						onclick="onResetBtnClick()">
							<img class="sysCatalogImg" src="images/style/catalogReset.png">
						</div>
					</li>
				</ul>
			</form>
			<table id="dg" title="查询信息列表" class="easyui-datagrid" cellspacing="0"
				cellpadding="0" width="100%" iconCls="icon-edit">
			</table>
		</div>
	</div>
</body>
</html>