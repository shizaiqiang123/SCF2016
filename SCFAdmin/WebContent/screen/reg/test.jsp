<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>测试首页常用功能</title>
<style type="text/css">
	.item{
		padding:5px 0 5px 0;
	}
	.span{
		margin: 20px;
	}	
</style>
</head>
<body>
	<form id="testForm">
		<div id="testDiv">			
			<div style="width: 100%" class="easyui-panel form" title="融资信息"
				data-options="border:false">
				<div class="item">
					<span class="span">融资金额：</span>
					<label class="label">1000.00</label>
				</div>
				<div class="item">				
					<span class="span">到期日：</span>					
					<label class="label">2015年10月8日</label>								
				</div>
				<div class="item">				
					<span class="span">已用额度：</span>					
					<label class="label">200.00</label>								
				</div>
			</div>
		</div>
	</form>
</body>
</html>