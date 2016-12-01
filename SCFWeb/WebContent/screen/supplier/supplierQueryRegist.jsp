<%@ page language="java" contentType="text/html; charset=UTF-8"
	import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>注册历程查询</title>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
<script src="script/supplier/supplierQueryRegist.js"
	type="text/javascript"></script>
</head>
<body class="UTSCF" >
	<form id="supplierForm">
		<div id="regist">
			<div style="text-align: right;font-size: 16px;font-weight: 700;">
				<span>注册编号：</span><label id="lsysRefNo" name="lsysRefNo"></label> <input
					type="hidden" name="sysRefNo" id="sysRefNo" />
			</div>
			<div id="userDiv" style="width: 100%" class="easyui-panel form"
				title="注册信息" data-options="collapsible:true">
				<div class="item">
					<span class="label">注册用户名：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo" name="userId"
							id="userId" value="${sysUserInfo.userId }"
							data-options="validType:['noChinese','maxLength[35]']"></input>
					</div>
				</div>
				<div class="item">
					<span class="label">注册日期：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-datebox" name="regDt" id="regDt"
							data-options="height:32,width:250,panelWidth:250"></input>
					</div>
				</div>
				<div class="item">
					<span class="label">营业执照：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo"
							name="licenceNo" id="licenceNo" required="true"
							data-options="validType:['noChinese','maxLength[32]']"></input>
					</div>
				</div>
				<div class="item">
					<span class="label">法定代表人：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo"
							name="legalRepNm" id="legalRepNm"></input>
					</div>
				</div>
				<div class="item">
					<span class="label">法人手机号码：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo"
							name="legalMobPhone" id="legalMobPhone"></input>
					</div>
				</div>
				<div class="item">
					<span class="label">公司名称：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo" name="custNm"
							id="custNm"></input>
					</div>
				</div>
				<div class="item">
					<span class="label">地址：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo" name="regAddr"
							id="regAddr" ></input>
					</div>
				</div>
				<div class="item">
					<span class="label">备注：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo" name="remark"
							id="remark"></input>
					</div>
				</div>
			</div>
			
<!-- 			<div id="accountDiv" style="width: 100%" class="easyui-panel form" -->
<!-- 				title="结算信息" data-options="collapsible:true"> -->
<!-- 				<div class="item"> -->
<!-- 					<span class="label">户名：</span> -->
<!-- 					<div class="fl item-ifo"> -->
<!-- 						<input type="text" class="easyui-validatebox combo" name="acNm" -->
<!-- 							id="acNm" /> -->
<!-- 					</div> -->
<!-- 				</div> -->
<!-- 				<div class="item"> -->
<!-- 					<span class="label">账号：</span> -->
<!-- 					<div class="fl item-ifo"> -->
<!-- 						<input type="text" class="easyui-validatebox combo" name="acNo" -->
<!-- 							id="acNo" /> -->
<!-- 					</div> -->
<!-- 				</div> -->
<!-- 				<div class="item"> -->
<!-- 					<span class="label">开户银行：</span> -->
<!-- 					<div class="fl item-ifo"> -->
<!-- 						<input type="text" class="easyui-validatebox combo" name="acBkNm" -->
<!-- 							id="acBkNm" /> -->
<!-- 					</div> -->
<!-- 				</div> -->
<!-- 			</div> -->

			<div id="managerDiv" style="width: 100%" class="easyui-panel form"
				title="管理员联系方式" data-options="collapsible:true">
				<div class="item">
					<span class="label">联系人姓名：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo"
							name="contactPerson" id="contactPerson" />
					</div>
				</div>
				<div class="item">
					<span class="label">手机号码：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo"
							name="mobPhone" id="mobPhone" />
					</div>
				</div>
				<div class="item">
					<span class="label">邮箱：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo" name="email"
							id="email" />
					</div>
				</div>
			</div>

			<div id="otherDiv" style="width: 100%" class="easyui-panel form"
				title="其他" data-options="collapsible:true">
				<div class="item">
					<span class="label">处理意见：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-combobox" editable="false"
							data-options="valueField: 'id',textField: 'text',height:32,width:250,panelWidth:250"
							name="signSts" id="signSts" />
					</div>
				</div>
				<div class="item">
					<span class="label">材料寄送日：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-datebox" name="arrivalDt"
							id="arrivalDt" data-options="height:32,width:250,panelWidth:250" />
					</div>
				</div>
				<input type="hidden" value="${sysUserInfo.userRefNo }"
					id="userSysRefNo" name="userSysRefNo"/>
			</div>
			
			<div class="blockAreaFooter clearfix mB20">
		<div class="fL blockAreaNotice red">
			<p class="blockAreaNoticeTitle fWb">温馨提示：</p>
			<p class="blockAreaNoticeTxt">
				用户注册后寄送材料列表（供参考，需贸供应链金融最终确认）：<br>
				1、组织机构代码证（副本）及营业执照（副本）的复印件 。<br>
				2、法定代表人或单位负责人有效身份证件的复印件。<br>
				3、平台超级管理员用户有效身份证件的复印件。<br>
				4、如平台超级管理员用户不是法定代表人或单位负责人，
				则需提供单位授权书（授权书中应注明：授权人及被授权人姓名、身份证号码、被授权的权限等，并加盖单位公章、法人或单位负责人签章）。<br><br>				
				注：上述所有复印件材料均需加盖单位公章，并注明“本复印件仅用于申请供应链金融服务平台”。<br>
			</p>
		</div>
	</div>
		</div>
	</form>
</body>
</html>