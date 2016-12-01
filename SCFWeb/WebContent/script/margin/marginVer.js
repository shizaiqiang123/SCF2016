/**
 * 申请功能时，Next进入交易页面
 * @param data
 */
function pageOnLoad(data){
	SCFUtils.loadForm('loanSubmit', data);
	changeLoanTp();
	queryCustAcno(data);
	SCFUtils.setTextboxReadonly("marginAcNo", true);
	SCFUtils.setTextboxReadonly("loanApplicat", true);
}

/**
 * 所有进入交易页面 公共的方法
 * @param data
 */
function pageOnInt() {
	ajaxBox();
	ajaxInvcTable();
	ajaxInvcLoanTable();
}

function ajaxBox(){
	var busiTp = [{"id":'0',"text":"国内有追索权保理"},{"id":'1',"text":"国内无追索权保理"},{"id":'3',"text":"信保项下"}];
	$("#busiTp").combobox('loadData',busiTp);
	SCFUtils.setComboReadonly("busiTp", true);
	var payIntTp = [{"id":'1',"text":"预收息"},{"id":'3',"text":"按月扣息"},{"id":'4',"text":"按季扣息"},{"id":'5',"text":"按年扣息"},{"id":'2',"text":"利随本清"}];
	$("#payIntTp").combobox('loadData',payIntTp);
	var loanTp = [{"id":'1',"text":"保理预付款"},{"id":'2',"text":"保理授信"}];
	$("#loanTp").combobox('loadData',loanTp);
	SCFUtils.setTextReadonly('sysRefNo', true);
	SCFUtils.setTextReadonly("selAcNm", true);
	SCFUtils.setTextReadonly('sellerInstCd', true);
	SCFUtils.setTextReadonly('ccy', true);
	SCFUtils.setTextReadonly("selNm", true);
	SCFUtils.setNumberspinnerReadonly("loanAble", true);
	SCFUtils.setTextReadonly("selAcBkNm", true);
	SCFUtils.setNumberboxReadonly("marginAmt", true);
	SCFUtils.setComboReadonly("loanTp", true);
	SCFUtils.setNumberboxReadonly('initMarginPct', true);
	SCFUtils.setComboReadonly("selAcNo", true);
	SCFUtils.setNumberboxReadonly("ttlLoanAmt", true);
	SCFUtils.setDateboxReadonly("loanValDt", true);
	SCFUtils.setDateboxReadonly("loanDueDt", true);
	SCFUtils.setComboReadonly("payIntTp", true);
	SCFUtils.setNumberboxReadonly("authMarginPct", true);
	SCFUtils.setNumberspinnerReadonly("loanRt", true);
//	$('#hide').hide();
}

function changeLoanTp(){
	var loanTp = $("#loanTp").combobox("getValue");
	if(loanTp=="1"){
		$('tr[id=amtTr]').hide();
		$('tr[id=balTr]').hide();
		$("#AuthMarginPct").numberbox('setValue','');
		$("#marginAcNo").textbox('setValue','');
		$("#AuthMarginPct").numberbox({required:false});
		$("#marginAcNo").textbox({required:false});
		$("#marginAmt").numberbox('setValue','');
		$("#marginAmt").numberbox({required:false});
	}else{
		$('tr[id=amtTr]').show();
		$('tr[id=balTr]').show();
		$("#AuthMarginPct").numberbox({required:true});
		$("#marginAcNo").textbox({required:true});
		$("#marginAmt").numberbox({required:true});
		SCFUtils.setNumberboxReadonly("marginAmt", true);
	}
	var busiTp = $('#busiTp').combobox('getValue');
	if(busiTp=='0' || busiTp=='1' || busiTp =='2'){
		$('tr[id=collat]').hide();
		$('#collatCompNm').textbox('setValue','');
		$('#collatNo').textbox('setValue','');
	}
}

function queryCustAcno(data){
	var acOwnerid=data.obj.selId;
	if(!SCFUtils.isEmpty(acOwnerid)){
		var opt = {
				url : SCFUtils.AJAXURL,
				data : {
					queryId : 'Q_P_000180',
					acOwnerid : acOwnerid,
					acFlag    : 'R',
					acTp    : '2'
				},
				callBackFun : function(data1) {
					if (data1.success && !SCFUtils.isEmpty(data1.rows)) {
						$('#selAcNo').combobox('loadData', data1.rows);	
					}
				}
			};
			SCFUtils.ajax(opt);
	}
}

function changeSelAcNo(){
	var selAcNo = $("#selAcNo").combobox("getValue");
	if(!SCFUtils.isEmpty(selAcNo)){
		var opt = {
				url : SCFUtils.AJAXURL,
				data : {
					queryId : 'Q_P_000365',
					acNo : selAcNo,
				},
				callBackFun : function(data1) {
					if (data1.success && !SCFUtils.isEmpty(data1.rows)) {
						$("#selAcNm").val(data1.rows[0].acNm);
						$("#selAcBkNm").val(data1.rows[0].acBkNm);
						
					}
				}
			};
			SCFUtils.ajax(opt);
	}
}

function checkSelAcNm(){
	if('PM'==SCFUtils.FUNCTYPE){
		var marginAcNo = $("#marginAcNo").val();
		if(!marginAcNo.isEmpty){
			var opt = {
					url : SCFUtils.AJAXURL,
					data : {
						queryId : 'Q_P_000352',
						marginAcNo : marginAcNo
					},
					callBackFun : function(data) {
						$.each(data.rows,function(i,n){
							if(n.marginAcNo==marginAcNo){
								SCFUtils.alert('该账号已经存在！');
								$("#marginAcNo").textbox('setValue','');
								$("#acNOFlag").val('false');
								return;
							}
						});
						$("#acNOFlag").val('true');
					}
				};
				SCFUtils.ajax(opt);
		}
	}
}

function selLookUpWindowMargin(){
	//查询系统余额
	var marginBal = $('#marginBal').val();
	//查询信贷余额
	var marginAcNo = $("#marginAcNo").textbox('getValue');
	if(SCFUtils.isEmpty(marginAcNo)){
		SCFUtils.alert("请选择保证金账号");
		return;
	}
	var data = {};
	var sysRefNo = $('#sysRefNo').val();
	var options = {
		url : SCFUtils.AJAXURL,
		async : false,
		data : $.extend({
			getdataId : 'I_P_00007901',
			byFunc : 'N',
			cacheType : 'non',
			sysRefNo : sysRefNo,
			currentdate : SCFUtils.getcurrentdate(),
			user_id : "zhangsa",
			user_pwd : "11111"
		}, data),
		callBackFun : function(backData) {
			var temp = backData.obj.trxDom.coreReturnCode;
			if(backData.obj.trxDom.coreReturnCode=='0000'){
				var token = backData.obj.trxDom.token;
				var data = {};
				var options = {
					url : SCFUtils.AJAXURL,
					async : false,
					data : $.extend({
						getdataId : 'I_P_00007903',
						byFunc : 'N',
						cacheType : 'non',
						sysRefNo : sysRefNo,
						currentdate : SCFUtils.getcurrentdate(),
						token : token,
						custAcNo : marginAcNo,
					}, data),
					callBackFun : function(backData) {
						if(backData.obj.trxDom.coreReturnCode=='0000'){
							$('#marginAmt').numberbox('setValue',backData.obj.trxDom.BALAVL);
							if(SCFUtils.Math(backData.obj.trxDom.BALAVL, marginBal, 'sub')>0){
								loadInvcTable();
								execute(SCFUtils.Math(backData.obj.trxDom.BALAVL, marginBal, 'sub'));
								var data = SCFUtils.convertArray('loanSubmit');
								var grid = {};
								var griddata1 =SCFUtils.getGridData('invcTable');
								var griddata2 =SCFUtils.getGridData('invcLoanTable');
								grid.invc = SCFUtils.json2str(griddata1);
								grid.invcLoan = SCFUtils.json2str(griddata2);
								$.extend(data,grid);
								var opts = {
										url:SCFUtils.AJAXURL,
										data:$.extend({
											getdataId:'I_P_000163',
											_opTp :'ADD',
											cacheType : 'non',
											reqPageType : 'finish',
											byFunc : 'N',
											funcType : 'MM',
										},data),
										callBackFun:function(data){
											if(data.success){
												submitMessage = '保证金余额同步成功！';
												SCFUtils.result(submitMessage, function() {
													SCFUtils.goHome();
												});
											}else{
//												SCFUtils.alert("保证金余额同步失败！");
												submitMessage = '保证金余额同步失败！！';
												SCFUtils.result(submitMessage, function() {
													SCFUtils.goHome();
												});
											}
										}
									};
									SCFUtils.ajax(opts);
							}
						}else{
							SCFUtils.alert('获取保证金账号金额失败！');
						}
					}
				};
				SCFUtils.ajax(options);
			}else{
				SCFUtils.alert('获取客户号失败！');
			}
		}
	};
	SCFUtils.ajax(options);

}

function ajaxInvcTable(){
	var options = {
			//url : SCFUtils.AJAXURL,
			toolbar : '#toolbar1',
			idField :  'sysRefNo',
			rownumbers : true,
			checkOnSelect : true,
			singleSelect : false,// 只选一行
			pagination : true,// 是否分页
			fitColumns : true,// 列自适应表格宽度
			striped : true, // 当true时，单元格显示条纹
			columns : [ [ {
				field : 'ck',
				checkbox : true
			},
			{
				field : 'invNo',
				title : '应收账款凭证号',
				width : 100
			},{
				field : 'sysRefNo',
				title : '交易流水号',
				width : 300,
//				hidden:true,
			}, 
			 {
				field : 'selId',
				title : '卖方ID',
				width : 110,
			},
			 {
				field : 'invCcy',
				title : '发票币别',
				width : 110,
			}, {
				field : 'invAmt',
				title : '发票金额',
				width : 100,
			},{
				field : 'invBal',
				title : '发票余额',
				width : 80
			},{
				field : 'invBalHd',
				title : '发票余额(临时)',
				width : 80
			},{
				field : 'invLoanBal',
				title : '发票融资余额',
				width : 80,
			},
			{
				field : 'invLoanAval',
				title : '发票可融资余额',
				width : 100,
			}] ]
		};
		$('#invcTable').datagrid(options);

}

function ajaxInvcLoanTable(){
	var options = {
			toolbar : '#toolbar2',
			idField :  'sysRefNo',
			rownumbers : true,
			checkOnSelect : true,
			singleSelect : false,// 只选一行
			pagination : true,// 是否分页
			fitColumns : true,// 列自适应表格宽度
			striped : true, // 当true时，单元格显示条纹
			columns : [ [ {
				field : 'ck',
				checkbox : true
			},{
				field : 'sysRefNo',
				title : '交易流水号',
				width : 300,
			}, 
			 {
				field : 'invRef',
				title : '发票系统编号',
				width : 110,
			},
			 {
				field : 'invCcy',
				title : '发票币别',
				width : 110,
			},{
				field : 'loanAmt',
				title : '本次融资金额',
				width : 100,
			},{
				field : 'loanAmtHd',
				title : '本次融资金额(临时)',
				width : 100,
			},{
				field : 'eventTimes',
				title : '系统次数',
				width : 80
			}] ]
		};
		$('#invcLoanTable').datagrid(options);
}

function loadInvcTable(){
	var selId = $('#selId').val();
	var busiTp = $('#busiTp').combobox('getValue');
	var cntrctNo = $('#cntrctNo').val();
	var data = SCFUtils.convertArray("loanSubmit");
	if(data){
		var options = {
				url : SCFUtils.AJAXURL,
				data : {
					queryId : 'Q_P_000307',
					selId : selId,
					busiTp : busiTp,
					cntrctNo:cntrctNo,
					cacheType:'non'
				},
				callBackFun : function(data) {
					if (!SCFUtils.isEmpty(data.rows)) {
						appendFieldToInvctable(data.rows);
						fullInvcGrid(data.rows,false,true);
					}else{
						SCFUtils.alert("本次融资没有找到符合要求的应收账款!");
						$('#invcTable').datagrid('loadData',{total:0,rows:[]});
					}
				}
		};
		SCFUtils.ajax(options);
	}
}

function fullInvcGrid(data,flag1,flag2){
	$('#invcTable').datagrid('clearChecked');
	SCFUtils.loadGridData('invcTable',data,flag1,flag2);
}

function appendFieldToInvctable(data){
	$.each(data,function(i,n){
		$.extend(n,{
			invNo:n.invNo,
			sysRefNo:n.sysRefNo,
			selId:n.selId,
			invCcy  : n.invCcy,
			invAmt : n.invAmt,
			invBal : n.invBal,
			invBalHd :n.invBal,
			invLoanBal : n.invLoanBal,
			invLoanAval : n.invLoanAval,
		});
	})
}


function loadInvcLoanTable(invcId,money){
	if(SCFUtils.Math(money, 0.0000, 'sub')>0){
		var invcLoanId = $('#sysRefNo').val();
		var data = SCFUtils.convertArray("loanSubmit");
		if(data){
			var options = {
					url : SCFUtils.AJAXURL,
					data : {
						queryId : 'Q_P_000308',
						invcLoanId : invcLoanId,
						invcId : invcId,
						cacheType:'non'
					},
					callBackFun : function(data) {
						if (!SCFUtils.isEmpty(data.rows)) {
							appendFieldToInvcLoantable(data.rows,money);
							fullInvcLoanGrid(data.rows,true,false);
						}else{
							SCFUtils.alert("本次融资没有符合要求的融资信息!");
							$('#invcLoanTable').datagrid('loadData',{total:0,rows:[]});
						}
					}
			};
			SCFUtils.ajax(options);
		}
	}
}

function appendFieldToInvcLoantable(data,money){
	$.each(data,function(i,n){
		if(SCFUtils.Math(money, n.loanAmt, 'sub')>0){
			$.extend(n,{
				invRef:n.invRef,
				sysRefNo:n.sysRefNo,
				invCcy  : n.invCcy,
				loanAmt : 0.00,
				loanAmtHd : n.loanAmt,
				eventTimes : n.eventTimes,
			});
			money = SCFUtils.Math(money,n.loanAmt,'sub');
		}else{
			$.extend(n,{
				invRef:n.invRef,
				sysRefNo:n.sysRefNo,
				invCcy  : n.invCcy,
				loanAmt : SCFUtils.Math(n.loanAmt,money,'sub'),
				loanAmtHd : n.loanAmt,
				eventTimes : n.eventTimes,
			});
			money = 0.0000;
		}
	})
}

function fullInvcLoanGrid(data,flag1,flag2){
	SCFUtils.loadGridData('invcLoanTable',data,flag1,flag2);
}

function execute(data){
	var gridInvcData =SCFUtils.getGridData('invcTable');
	$.each(gridInvcData,function(i,n){
		var rowIndex = $('#invcTable').datagrid('getRowIndex',n);
		if(SCFUtils.Math(data, 0.00, 'sub')>0){
			if(SCFUtils.Math(data, n.invBal, 'sub')>0){
				$('#invcTable').datagrid('updateRow', {
					index : rowIndex,
					row : {
						invBal : 0,
					} 	
				});
				loadInvcLoanTable(n.sysRefNo,100);
//				loadInvcLoanTable(n.sysRefNo,n.invBal);
//				data = SCFUtils.Math(data,n.invBalHd,'sub');
				data = 0.00;
			}else{
				$('#invcTable').datagrid('updateRow', {
					index : rowIndex,
					row : {
						invBal :SCFUtils.Math(n.invBalHd, data,'sub'),
					} 	
				});
				loadInvcLoanTable(n.sysRefNo,data);
				data = 0.0000;
			}
		}
	});
}

