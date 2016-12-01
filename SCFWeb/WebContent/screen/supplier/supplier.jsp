<%@ page language="java" contentType="text/html; charset=UTF-8"
	import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>审核新用户</title>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
<script src="script/supplier/supplier.js" type="text/javascript"></script>
</head>

<body class="UTSCF">
	<form id="supplierForm">
		<div id="regist">
			<div style="text-align: right; font-size: 16px; font-weight: 700;">
				<span>注册编号：</span><label id="lsysRefNo"></label> <input
					type="hidden" name="sysRefNo" id="sysRefNo" />
			</div>

			<div id="userDiv" style="width: 100%" class="easyui-panel form"
				title="注册信息" data-options="collapsible:true">
				<div class="item">
					<span class="label">注册用户名：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo" name="userId"
							id="userId"></input>
					</div>
				</div>
				<div class="item">
					<span class="label">注册日期：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-datebox" name="regDt" id="regDt"
							data-options="height:32,width:253,panelWidth:253"></input>
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
					<span class="label">客户等级：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-combobox" name="custLevel"
							id="custLevel" required="true" editable="false"
							data-options="valueField: 'levelCd',textField: 'levelDesc',
							panelHeight: 'auto',height:32,width:253,panelWidth:253"></input>
					</div>
				</div>
				<div class="item">
					<span class="label">法定代表人：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo"
							name="legalRepNm" id="legalRepNm" required="true"
							data-options="validType:'maxLength[35]'"></input>
					</div>
				</div>
				<div class="item">
					<span class="label">法人手机号码：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo"
							required="true" data-options="validType:'maxLength[40]'"
							name="legalMobPhone" id="legalMobPhone"></input>
					</div>
				</div>
				<div class="item">
					<span class="label">公司名称：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo" name="custNm"
							id="custNm" required="true"
							data-options="validType:'maxLength[200]'"></input>
					</div>
				</div>

				<div class="item">
					<span class="label">地址：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo" name="regAddr"
							id="regAddr" required="true"
							data-options="validType:'maxLength[200]',multiline:true"></input>
					</div>
				</div>
				<div class="item">
					<span class="label">备注：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo"
							data-options="validType:'maxLength[300]',multiline:true"
							name="remark" id="remark"></input>
					</div>
				</div>
			</div>


			<div id="managerDiv" style="width: 100%" class="easyui-panel form"
				title="管理员联系方式" data-options="collapsible:true">
				<div class="item">
					<span class="label">联系人姓名：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo"
							data-options="validType:'maxLength[100]'" name="contactPerson"
							id="contactPerson" />
					</div>
				</div>
				<div class="item">
					<span class="label">手机号码：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo"
							required="true" data-options="" name="mobPhone" id="mobPhone" />
					</div>
				</div>
				<div class="item">
					<span class="label">邮箱：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo"
							required="true" data-options="" name="email" id="email" />
					</div>
				</div>
			</div>

			<div id="otherDiv" style="width: 100%" class="easyui-panel form"
				title="其他" data-options="collapsible:true">
				<div class="item">
					<span class="label">材料寄送日：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-datebox" name="arrivalDt"
							id="arrivalDt" data-options="height:32,width:253,panelWidth:253" />
					</div>
				</div>
				
				<input type="hidden" id="sysBusiUnit" name="sysBusiUnit" value="${sysUserInfo.sysBusiUnit}"/> 
				
				<input type="hidden" id="busiUnit" name="busiUnit" value="${sysUserInfo.sysBusiUnit}"/> 
					
				<input type="hidden" name="pwdDueDt" id="pwdDueDt" /> 
					
				<input type="hidden" id="custImpRefNo" name="custImpRefNo" /> 
				
				<input type="hidden" id="custTp" name="custTp"  value="0"/> 
					
				<input type="hidden" id="userName" name="userName" value="${sysUserInfo.userName }" />
					
				<input type="hidden" name="trxDt" id="trxDt" value="${sysUserInfo.sysDate }"/> 
				
			</div>

			<div id="reasonDiv" style="width: 100%" class="easyui-panel form"
				title="处理意见" data-options="collapsible:true">
				<div class="item">
					<span class="label">处理意见：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-combobox" required="true"
							editable="false"
							data-options="valueField: 'id',textField: 'text',
						panelHeight: 'auto',height:32,width:253,panelWidth:253"
							name="signSts" id="signSts" />
					</div>
				</div>
				<div id="messageListDiv" style="display: block;">
					<div class="item">
						<span id="OldMessageSpan" style="display: block;" class="label">意见说明：</span>
						<div id="OldMessageDiv" style="display: block;" class="fl item-ifo">
							<input class="easyui-textbox"
								data-options="multiline:true,validType:'maxLength[500]'"
								style="width: 253PX; height: 50px" name="OldSysRelReason"
								id="OldSysRelReason" />
						</div>
						<span id="messageSpan" style="display: block;" class="label"></span>
						<div id="messageDiv" style="display: block;">
							<div  class="fl item-ifo">
								<input class="easyui-textbox"
									style="width: 253PX; height: 50px" name="sysRelReason"
									data-options="multiline:true,validType:'maxLength[500]'"
									id="sysRelReason" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</form>
</body>
</html>