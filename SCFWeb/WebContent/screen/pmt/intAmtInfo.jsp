<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>计算利息费用详情页面</title>
<script type="text/javascript" src="script/pmt/intAmtInfo.js"></script>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
</head>
<body>
	<form id="invcMChgForm">
		<div id="invcMChgDiv" style="margin: auto; margin-top: 50px">
			<div class="item">
				<span class="label">借款金额：</span>
				<div class="fl item-ifo">
					<input editable="false" name="ttlLoanAmt" id="ttlLoanAmt"
						class="easyui-numberbox"
						data-options="width:'253px',height:'32px',min:0,precision:2,groupSeparator:','" />
				</div>
			</div>
			<div class="item">
				<span class="label">借款余额：</span>
				<div class="fl item-ifo">
					<input editable="false" name="ttlLoanBal" id="ttlLoanBal"
						class="easyui-numberbox"
						data-options="width:'253px',height:'32px',min:0,precision:2,groupSeparator:','" />
				</div>
			</div>
			<div class="item">
				<span class="label">利率：</span>
				<div class="fl item-ifo">
					<input editable="false" name="loanRt" id="loanRt"
						class="easyui-numberbox"
						data-options="width:'253px',height:'32px',min:0,precision:4,max:100,suffix:'%'" />
				</div>
			</div>
			<div class="item">
				<span class="label">费率：</span>
				<div class="fl item-ifo">
					<input editable="false" name="finChgrt" id="finChgrt"
						class="easyui-numberbox"
						data-options="width:'253px',height:'32px',min:0,precision:4,max:100,suffix:'%'" />
				</div>
			</div>
			<div class="item">
				<span class="label">资金到账日期：</span>
				<div class="fl item-ifo">
					<input type="text" name="pmtDt" id="pmtDt"
						data-options="width:'253px',height:'32px',panelWidth:'253px'" class="easyui-datebox"
						editable="false" ></input>
				</div>
			</div>
			<div class="item">
				<span class="label">融资起始日：</span>
				<div class="fl item-ifo">
					<input type="text" name="loanValDt" id="loanValDt"
						data-options="width:'253px',height:'32px',panelWidth:'253px'" class="easyui-datebox"
						editable="false" ></input>
				</div>
			</div>
			<div class="item">
				<span class="label">上次还款日：</span>
				<div class="fl item-ifo">
					<input type="text" name="lastPayDt" id="lastPayDt"
						data-options="width:'253px',height:'32px',panelWidth:'253px'" class="easyui-datebox"
						editable="false" ></input>
				</div>
			</div>
			<div class="item">
				<span class="label">还款次数：</span>
				<div class="fl item-ifo">
					<input  type="text" name="pmtTimes" id="pmtTimes" class="easyui-validatebox combo"/>
				</div>
			</div>
		</div>
	</form>
</body>
</html>