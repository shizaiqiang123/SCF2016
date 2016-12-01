<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML1.0 Transitional//EN""http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<title>Struts 2 File Upload</title>
<script type="text/javascript">
	   function initToolBar(){
		   return ['impt','save','cancel','home','logout'];
	   }		
	   
	   function onSaveBtnClick(){
	   		return SCFUtils.convertArray('uploadForm');
	   }
	   function onImptBtnClick(){		  
		   return SCFUtils.convertArray("uploadForm");;
	   }
	   
	   
	   	      
   </script>
</head>
<body>
	<form id="uploadForm">
		<input type="hidden" name="sysFuncId" value="F_S_00000001" />
		<h2>数据表格复选框选择模型</h2>
		<div class="demo-info">
			<div class="demo-tip icon-tip"></div>
			<div>点击顶部复选框全选或者全不选.</div>
		</div>
		<div style="margin: 10px 0;"></div>
		<table id="dg" class="easyui-datagrid" title="数据表格复选框选择模型"
			style="width: 505px; height: 250px"
			data-options="rownumbers:true,singleSelect:true">
			<thead>
				<tr>
					<th data-options="field:'ck',checkbox:true"></th>
					<th data-options="field:'itemid',width:80">编号</th>
					<th data-options="field:'productid',width:100">产品编号</th>
					<th data-options="field:'listprice',width:80,align:'right'">市场价</th>
					<th data-options="field:'unitcost',width:80,align:'right'">成本价</th>
					<th data-options="field:'attr1',width:250">描述</th>
					<th data-options="field:'status',width:60,align:'center'">状态</th>
				</tr>
			</thead>
		</table>
		<div style="margin: 10px 0;">
			<span>选择模型: </span> <select
				onchange="$('#dg').datagrid({singleSelect:(this.value==0)})">
				<option value="0">单选</option>
				<option value="1">多选</option>
			</select><br /> 选择联动复选框: <input type="checkbox" checked
				onchange="$('#dg').datagrid({selectOnCheck:$(this).is(':checked')})"><br />
			复选框联动选择: <input type="checkbox" checked
				onchange="$('#dg').datagrid({checkOnSelect:$(this).is(':checked')})">
		</div>



	</form>
</body>
</html>