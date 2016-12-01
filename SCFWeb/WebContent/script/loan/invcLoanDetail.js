//把发票的信息记录下
var dataInvc = new Array();


/**
 * 申请功能时，Next进入交易页面
 * @param data
 */
var selOrAmt;
var cntrOrAmt;
function pageOnLoad(data){
	
	
	
	SCFUtils.loadForm('loanSubmit', data);
	
	$('#ccy').val(data.obj.ccy);
	
	var  busiTp  = data.obj.busiTp;
	var txt = "";
	if(0 == busiTp)
	{
		txt="国内保理";
	}
	if(1 == busiTp)
	{
		txt="预付款融资";
	}
	if(2 == busiTp)
	{
		txt="动产质押融资";
	}
	var   selId = data.obj.selId;
	var dataBusi = [{"id":busiTp,"text":txt,"selected":true}];
	$("#busiTp").combobox('loadData',dataBusi);
	var sysRefNo = $("#sysRefNo").val();
	
	//先注释起来
	//var sysRefNo = data.obj.sysRefNo;
//	var  selId = data.obj.selId;
//
//	var sysEventTimes = data.obj.sysEventTimes;
	//var sysEventTimes = parseInt($("#sysEventTimes").val());
	//如果有融资的事件
//	ajaxTable();
//	var  str= "<div>"
	//与协议表相串取出其它的融资表信息
	getFirstRZDiv(sysRefNo,selId,busiTp);
	
	//查询担保方信息  CUST_COLLA   getSalerHK
	getCustColla();    
	//取发票信息
	getInvc(sysRefNo);
	//取还款记录
	getPmtRecord();
}


function forEach(data){
//	var invPmtRef=$('#sysRefNo').val();
	var date=getDate(new Date());
	$.each(data,function(i,n){
		//numPmt numBal numLoanBal 是临时栏位，为了计算方便，过度
//		var numPmt=SCFUtils.Math(n.invBal||0, n.pmtAmt||0, 'add');
		$('#invcLoanTable').datagrid('updateRow',{
			index : i,
			row:{
				sysRefNo:n[0],
				invNo:n[1],
				arType:n[2],
				buyerNm:n[3],
				invDt:n[4],
				invValDt:n[5],
				invDueDt:n[6],
				invCcy:n[7],
				invAmt:n[8],
				invSts:n[9],
				invLoanAmt:n[10]
			}
		});
	});
}


//取还款记录
function getPmtRecord()
{
	if(0 < dataInvc.length)
	{
		var totalTableArray = new Array();
//		for(var i in dataInvc)
		$.each(dataInvc,function(i,item){
//			var txt = item;
			var opt = {
					url : SCFUtils.AJAXURL,
					data : {
						queryId : 'Q_P_000162',
						sysRefNo : item
					},
					callBackFun : function(data) {
						if (data.success && !SCFUtils.isEmpty(data.rows) ) {
							//把data.row放到totalTableArray中
//							Array.prototype.splice.apply(totalTableArray, data.rows); 
//							$.each(data.rows,function(i,item){
//								totalTableArray.push(item);
//							});
//							for(var j in data.rows){
//								var item = data.rows[j];
//								totalTableArray.push(item);
//							}
							
							totalTableArray = totalTableArray.concat(data.rows);
						}
					}
			};
			SCFUtils.ajax(opt);
		});
		if(0 < totalTableArray.length)
		SCFUtils.loadGridData('pmtRecordTable',totalTableArray,false,true);
	}	
}


//取发票信息
function getInvc(sysRefNo)
{
	var sysRefNo = $("#sysRefNo").val();
	var opt = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000161',
				sysRefNo : sysRefNo
			},
			callBackFun : function(data) {
				if (data.success && !SCFUtils.isEmpty(data.rows)) {
					//把发票表的流水号收集起来
					$.each(data.rows,function(i,item)
					{
						dataInvc.push(item[0]);
//						if(i == 0)
//						dataInvc+=""+item[0]+"',";
//						else if(i <=data.rows-2)
//						{
//							dataInvc+="'"+item[0]+"',";
//						}	
//						else
//							dataInvc+="'"+item[0]+"";	
					}
					);
					
					
//				var  dataOrac = dataInvc.substring(0, dataInvc.length-1);
//					dataInvc = dataOrac + "";
					
					//开始拼装
					//SCFUtils.loadGridData('invcLoanTable',data.rows,false,true)
					appendRow(data.rows);
				}
			}
	};
	SCFUtils.ajax(opt);
}


function appendRow(data){
	$.each(data,function(i,n){
		
		$('#invcLoanTable').datagrid('appendRow',{
			sysRefNo : n[0],
			invNo : n[1],
			arType : n[2],
			buyerNm : n[3],
			invDt : n[4],
			invValDt : n[5],
			invDueDt : n[6],
			invCcy : n[7],
			invAmt : n[8],
			invSts : n[9],
			invLoanAmt : n[10]
		});
	});
}

function getCustColla(sysRefNo,selId,busiTp)
{
	var contract = $("#cntrctNO").val();
	var opt = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000164',
				trxId : contract
			},
			callBackFun : function(data) {
				if (data.success && !SCFUtils.isEmpty(data.rows)) {
					//开始拼装
					
					SCFUtils.loadGridData('custCollaTable',data.rows,false,true)
				}
			}
		};
	SCFUtils.ajax(opt);
}


//取第一个融资选向
function getFirstRZDiv(sysRefNo,selId,busiTp)
{
	
	var opt = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000160',
				selId : selId,
				busiTp : busiTp
			},
			callBackFun : function(data) {
				if (data.success && !SCFUtils.isEmpty(data.rows) && 0 < data.rows.length) {
					//开始封装其它的融资信息
//					SCFUtils.loadGridData('invcLoanTable',data,false,true)
					var period = data.rows[0].acctPeriod;
					$('#acctPeriod').numberbox('setValue',period);
					$("#lmtBal").numberspinner('setValue',data.rows[0].lmtBal);
					
					
					var  payIntTp  = data.rows[0].payIntTp;
					var payIntTpText = "";
					if(1 == payIntTp)
					{
						payIntTpText="预收息";
					}
					if(2 == payIntTp)
					{
						payIntTpText="利随本清";
					}
					if(3 == payIntTp)
					{
						payIntTpText="利随本清+周期付息 ";
					}
//					var dataPayIntTp = [{"id":payIntTp,"text":payIntTpText}];
//					$("#payIntTp").combobox('loadData',dataPayIntTp);
					
					$("#payIntTp").val(payIntTpText);//扣息方式
//					$("#payIntTp").val(data.rows[0].payIntTp);//扣息方式
					$("#penaRt").numberbox('setValue',data.rows[0].penaRt);//扣息利率
					$("#finChgrt").numberbox('setValue',data.rows[0].finChgrt);//费率
					$("#cntrctNO").val(data.rows[0].sysRefNo);
				}
			}
		};
		SCFUtils.ajax(opt);

}



/**
 * 所有进入交易页面 公共的方法
 * @param data
 */
function pageOnInt() {
//	SCFUtils.setComboReadonly('busiTp', true);
//	SCFUtils.setComboReadonly('serviceReq', true);
//	SCFUtils.setDateboxReadonly('trxDt', true);
//	SCFUtils.setDateboxReadonly('selLmtDueDt', true);
//	SCFUtils.setTextReadonly('ccy', true);
//	SCFUtils.setNumberspinnerReadonly('loanPct', true);
//	ajaxBox();
	ajaxTable();
}


function ajaxTable() {
		var options = {
				//url : SCFUtils.AJAXURL,
				toolbar : '#toolbar',
				idField :  'sysRefNo',
				rownumbers : true,
//				checkOnSelect : true,
//				singleSelect : false,// 只选一行
				pagination : true,// 是否分页
				fitColumns : true,// 列自适应表格宽度
				striped : true, // 当true时，单元格显示条纹
				columns : [ [ 
				{
					field : 'sysRefNo',
					title : '交易流水号',
					hidden:true,
					width : 100
				}, 
				{
					field : 'invNo',
					title : '应收账款编号',
					width : 100
				},
				{
					field : 'arType',
					title : '类型',
					width : 100
				},
				{
					field : 'buyerNm',
					title : '间接客户',
					width : 100
				}, {
					field : 'invDt',
					title : '应收账款日期',
					width : 110,
					formatter: dateFormater
				},
				 {
					field : 'invValDt',
					title : '应收账款起算日',
					width : 110,
					formatter: dateFormater
				},
				 {
					field : 'invDueDt',
					title : '应收账款到期日',
					width : 110,
					formatter: dateFormater
				},
				 {
					field : 'invCcy',
					title : '应收账款币别',
					width : 80
				},
				{
					field : 'invAmt',
					title : '应收账款净额',
					width : 100,
					formatter:ccyFormater
,				},
				 
				 {
					field : 'invSts',
					title : '当前状态',
					width : 100,
					formatter:invStsFormater
				 },
				 {
						field : 'invLoanAmt',
						title : '融资金额',
						width : 100,
						formatter:ccyFormater
					}
				
				] ]
			};
			$('#invcLoanTable').datagrid(options);
			//已有担保信息CUST_COLLA
			var optionsDanBao = {
					//url : SCFUtils.AJAXURL,
					toolbar : '#toolbar',
					idField :  'sysRefNo',
					rownumbers : true,
					checkOnSelect : true,
					singleSelect : false,// 只选一行
					pagination : true,// 是否分页
					fitColumns : true,// 列自适应表格宽度
					striped : true, // 当true时，单元格显示条纹
					columns : [ [
//					{
//						field : 'ck',
//						checkbox : true
//					},
					{
						field : 'sysRefNo',
						title : '担保表流水号 ',
						hidden:true,
						width : 300
					}, {
						field : 'collatTp',
						title : '担保方式',
						width : 200
					}, {
						field : 'collatCcy',
						title : '币种',
						width : 200
					},
					 {
						field : 'collatVal',
						title : '担保价值',
						width : 200
						
					 }	
					] ]
				};
				$('#custCollaTable').datagrid(optionsDanBao);
			
				//还款记录  //从  Pmt_m 表中抓
				var options = {
						//url : SCFUtils.AJAXURL,
						toolbar : '#toolbar',
						idField :  'sysRefNo',
						rownumbers : true,
//						checkOnSelect : true,
//						singleSelect : false,// 只选一行
						pagination : true,// 是否分页
						fitColumns : true,// 列自适应表格宽度
						striped : true, // 当true时，单元格显示条纹
						columns : [ [ 
						 {
							field : 'sysRefNo',
							title : '还款流水号',
							hidden:true,
							width : 300
						}, {
							field : 'sysOpTm',
							title : '还款日期',
							width : 220,
							formatter: dateFormater
						},
						{
							field : 'invRef',
							title : '应收账款流水号',
							width : 130
						}, 
						{
							field : 'invPmtRef',
							title : '还款流水号',
							width : 130
						}, 
						{
							field : 'payIntAmt',
							title : '还息金额',
							width : 110,
							formatter : ccyFormater
						},
						 {
							field : 'payPrinAmt',
							title : '还本金金额',
							width : 110,
							formatter : ccyFormater
						},
						 {
							field : 'pmtAmt',
							title : '还款总额',
							width : 110,
							formatter : ccyFormater
						},
						{
							field : 'invAmt',
							title : '应收账款金额',
							width : 110,
							formatter : ccyFormater
						}
						] ]
					};
					$('#pmtRecordTable').datagrid(options);
				
}

