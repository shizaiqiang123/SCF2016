function pageOnInt() {
	 ajaxBox();	
	 ajaxTable();
	 queryProduct();
}
 
function pageOnPreLoad(data) {
	SCFUtils.loadForm('factorForm', data);
	queryCity();
	var productList = data.obj.productId;
	var list = SCFUtils.parseGridData(productList);
	loadProductList(list);
	SCFUtils.loadGridData('acnoTable', SCFUtils.parseGridData(data.obj.doname), false);// 加载数据并保护表格。
}
 
function pageOnLoad(data){
	var options={};
	options.data = {
			refName: 'FacNo',
			refField:'sysRefNo'
				};
	SCFUtils.getRefNo(options);
	var option={};
	option.data = {
			refName: 'sysBusiU',
			refField:'busiUnit'
				};
	SCFUtils.getRefNo(option);
//	var opt={};
//	opt.data={
//			refName: 'InstNo',
//			refField:'instbu'
//				};
//	SCFUtils.getRefNo(opt);
	SCFUtils.loadForm('factorForm', data);
	queryCity();
	queryAcNo('M');
	$('#factorId').val($('#sysRefNo').val());
	queryReproducts(data);
	
	
}
function pageOnResultLoad(data) {
	SCFUtils.loadForm('factorForm', data);
	queryCity();
	var productList = data.obj.productId;
	var list = SCFUtils.parseGridData(productList);
	loadProductList(list);
	/*queryDeleteproducts(data);如果加上这个就会重复*/
	SCFUtils.loadGridData('acnoTable', SCFUtils.parseGridData(data.obj.doname),true);// 加载数据并保护表格。
}

function pageOnReleasePreLoad(data) {
	SCFUtils.loadForm('factorForm', data);
	queryCity();
	var productList = data.obj.productId;
	var list = SCFUtils.parseGridData(productList);
	loadProductList(list);
	SCFUtils.loadGridData('acnoTable', SCFUtils.parseGridData(data.obj.doname), true);// 加载数据并保护表格。
}

function pageOnReleaseResultLoad(data) {
	SCFUtils.loadForm('factorForm', data);
	queryCity();
	var productList = data.obj.productId;
	var list = SCFUtils.parseGridData(productList);
	loadProductList(list);
	SCFUtils.loadGridData('acnoTable', SCFUtils.parseGridData(data.obj.doname), true);// 加载数据并保护表格。
}

function pageOnReleasePageLoad(data) {
	SCFUtils.loadForm('factorForm', data);
	queryReproduct(data);
	queryCity();
	queryAcNo('P');
	if (SCFUtils.FUNCTYPE =='RE' && SCFUtils.OPTSTATUS =='DELETE') {
		
		queryDeleteproducts(data);
	}
	
}

function pageOnFPLoad(data){
	SCFUtils.loadForm('factorForm', data);
	queryCity();
}

function onNextBtnClick(){	
	$('#orgNm').val($('#custNm').val());
	$('#orgTp').val('F');
	$('#custTp').val('3');
	$('#orgOwnerid').val($('#sysRefNo').val());
	var mainData = SCFUtils.convertArray('factorForm');	
	var grid = {};
	var griddata; 
	griddata = SCFUtils.getGridData('acnoTable');
	grid.doname = SCFUtils.json2str(griddata);
	if(SCFUtils.FUNCTYPE!='RE'){
		var productId = resultProduct();
		if(productId._total_rows ==0){
			SCFUtils.alert("请选择产品");
			return;	
		}
		productId=SCFUtils.json2str(productId);
	}else{
		var productId=$('#productHD').val();
	}
//	$.extend($.extend(mainData,grid),{"productId":productId});
	var data={
			sysRefNo:$("#sysRefNo").val(),
			busiUnit:$("#busiUnit").val(),
			sysEventTimes:1,
			orgNm:$("#custNm").val()
				};
	var instInfo=SCFUtils.json2str(data);
//	$.extend($.extend(mainData,grid),{"instInfo":instInfo});
	grid.productId=productId;
	grid.instInfo=instInfo;
	$.extend(mainData,grid);
	return mainData;
}

function onDelBtnClick(){
	var mainData = SCFUtils.convertArray('factorForm');	
	var productId = resultProduct();
	productId=SCFUtils.json2str(productId);
	var grid = {};
	var griddata; 
	griddata = SCFUtils.getGridData('acnoTable');
	grid.doname = SCFUtils.json2str(griddata);
	$.extend($.extend(mainData,grid),{"productId":productId});	
	return mainData;

}


function ajaxBox(){
	var compNature = [{"id":'0',"text":"[0] 国企"},{"id":'1',"text":"[1] 外资企业"},{"id":'2',"text":"[2] 股份有限公司"},{"id":'3',"text":"[3] 有限责任公司"}];
	$("#compNature").combobox('loadData',compNature);
	var legalRepIdtype = [{"id":'0',"text":"身份证"},{"id":'1',"text":"户口簿"},{"id":'2',"text":"护照"},{"id":'3',"text":"军官证"},{"id":'4',"text":"士兵证"},{"id":'5',"text":"港澳居民来往内地通行证"},{"id":'6',"text":"台湾同胞来往内地通行证"},{"id":'7',"text":"临时身份证"},{"id":'8',"text":"外国人居留证"},{"id":'9',"text":"警官证"},{"id":'10',"text":"其他个人证件"},{"id":'11',"text":"文职干部证"},{"id":'12',"text":"澳门身份证"},{"id":'13',"text":"台湾身份证"},{"id":'14',"text":"香港身份证"}];
	$("#legalRepIdtype").combobox('loadData',legalRepIdtype);
	var option={
			url:SCFUtils.AJAXURL,
			data: {
				queryId:'Q_P_000092',
				sysRefNo:'0000'
			},
			callBackFun:function(data){
				if(data.success){
					$('#regionCd').combobox('loadData', data.rows);					
    			}
			}
	};	
	SCFUtils.ajax(option);
	
	var optt = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000006'
			},
			callBackFun : function(data) {
				if (data.success) {

					$.each(data.rows, function(i, n) {
						var textField = n.sysRefNo + '-' + n.ccyNm;
						$.extend(n, {
							textField : textField
						});
					});
					$('#regCcy').combobox('loadData', data.rows);
				}
			}
		};
		SCFUtils.ajax(optt);
	
}

function queryProduct() {
	var product = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000116',
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				var select = document.getElementById('myselect');
				$.each(data.rows, function(i, n) {
					var newItem = new Option(n.productNm, n.productId);
					select.options.add(newItem);
				})
			}
		}

	};
	SCFUtils.ajax(product);
}

function queryReproducts(data){
	var factorId=data.obj.sysRefNo;
	if(!SCFUtils.isEmpty(factorId)){
		 var opt={
					url:SCFUtils.AJAXURL,
					data: {
						queryId:'Q_P_000118',
						factorId: factorId
					},
					callBackFun:function(data){
						if(data.success&&!SCFUtils.isEmpty(data.rows)){
//							$('#productHD').val(SCFUtils.json2str(data.rows));
							parseString(data.rows);
							var obj = document.getElementById("myselect");
							var length=obj.options.length;
							var content;
							$.each(data.rows,function(i,n){
								for(var m=0;m<length;m++){
									if(obj.options[m].value==n.productId){
										content = "<option  value='" + obj.options[m].value + "'>" + obj.options[m].text 
										+ "</option>"; // 填充右侧的值
										$("#productId").append(content);
									}
								}
							});
						}
					}
			};	
			SCFUtils.ajax(opt);
	}
	
}
  

function queryReproduct(data){
	var factorId=data.obj.sysRefNo;
	if(!SCFUtils.isEmpty(factorId)){
		 var opt={
					url:SCFUtils.AJAXURL,
					data: {
						queryId:'Q_P_000117',
						factorId: factorId,
						sysTrxSts: 'P'
					},
					callBackFun:function(data){
						if(data.success&&!SCFUtils.isEmpty(data.rows)){
//							$('#productHD').val(SCFUtils.json2str(data.rows));
							parseString(data.rows);
							var obj = document.getElementById("myselect");
							var length=obj.options.length;
							var content;
							$.each(data.rows,function(i,n){
								for(var m=0;m<length;m++){
									if(obj.options[m].value==n.productId){
										content = "<option  value='" + obj.options[m].value + "'>" + obj.options[m].text 
										+ "</option>"; // 填充右侧的值
										$("#productId").append(content);
									}
								}
							});
						}
					}
			};	
			SCFUtils.ajax(opt);
	}
}


 function queryDeleteproducts(data){
	 var factorId=data.obj.sysRefNo;
		if(!SCFUtils.isEmpty(factorId)){
			 var opt={
						url:SCFUtils.AJAXURL,
						data: {
							queryId:'Q_P_000119',
							factorId: factorId
						},
						callBackFun:function(data){
							if(data.success&&!SCFUtils.isEmpty(data.rows)){
//								$('#productHD').val(SCFUtils.json2str(data.rows));
								parseString(data.rows);
								var obj = document.getElementById("myselect");
								var length=obj.options.length;
								var content;
								$.each(data.rows,function(i,n){
									for(var m=0;m<length;m++){
										if(obj.options[m].value==n.productId){
											content = "<option  value='" + obj.options[m].value + "'>" + obj.options[m].text 
											+ "</option>"; // 填充右侧的值
											$("#productId").append(content);
										}
									}
								});
							}
						}
				};	
				SCFUtils.ajax(opt);
		}
	 
 }



 function parseString(data,isSerialize){
	
	 var p = {};	 
	 var total = 0;
		$.each(data,function(i,obj){
			
			p['rows'+i+''] = isSerialize===true?SCFUtils.json2str(obj):obj;
			total++;
		});
		p._total_rows = total;
		$('#productHD').val(SCFUtils.json2str(p));
 }


function loadProductList(list){
	var select = document.getElementById('productId');
	$.each(list, function(i, n) {
		var newItem = new Option(n.productNm, n.productId);
		select.options.add(newItem);
	})
}

// select 中的 onchange()事件
function selectChange() {
	$("#add").attr("disabled", false); // 首先将添加按钮设为可用
	var selectObject = $("#myselect").val(); // 取得左侧所选取的值
	// var obj=document.getElementById("myselect");
	// var selectText=obj.options[obj.selectedIndex].text;
	// var selectObject=document.getElementById("myselect").value;
	$("#productId").find("option").each(function() { // 以 option 为参数 查询
		// 右侧所有的可选项并逐一遍历
		if ($(this).val() == selectObject) { // 判断左侧中选择的项在右侧中是否已经存在
			$("#add").attr("disabled", true); // 如果上面的判断存在则将添加按钮设为不可用, 禁止重复添加
		}
	});
}
// 左侧增加到右侧
function toAdd() {
	var obj = document.getElementById("myselect");
	var selectText = obj.options[obj.selectedIndex].text;
	var selectObject = $("#myselect").val(); // 取得左侧所选取的值
	if (null == selectObject) {
		alert("请选择要添加的内容!");
		return false;
	}
	var content = "<option  value='" + selectObject + "'>" + selectText
			+ "</option>"; // 填充右侧的值
	$("#productId").append(content);
	// $("#myselect option:selected").remove(); // 删除左侧所选的值
	selectChange(); // 最后调用 selectChange()模拟onChange()事件,
	// 主要是为了能够及时地将禁用的添加按钮重新激活(如果有必要)

}
// 右侧移除
function toRemove() {
	var removeObject = $("#productId option:selected").val(); // 取得右侧要移除的内容,
	// 注意可多选
	if (null == removeObject) {
		alert("请选择要删除的名字!");
		return false;
	}
	$("#productId option:selected").remove();
	selectChange(); // 与toAdd()中调用原理一致
}
    //右侧选中的值
   function resultProduct(){
	   var productList = jQuery("#productId  option");
	   var p = {};	
	   var total = 0;
	   $.each(productList, function(i, n) {
		   var product = {};
		   product.productNm = n.text;
		   product.productId = n.value;
		   product.sysRefNo =  SCFUtils.uuid(8);   
		   product.factorId = $('#sysRefNo').val();
		   p['rows'+i+''] =product;
			total++;
		})
		p._total_rows = total;
		return p;
   }

function queryBusiUnit(){
	var busiUnit=$('#busiUnit').val();
	if(!SCFUtils.isEmpty(busiUnit)){
		var oos ={
				url:SCFUtils.AJAXURL,
				data: {
					queryId : 'Q_P_000098',
					busiUnit   : busiUnit
				},
				callBackFun:function(data){
					if(!SCFUtils.isEmpty(data.rows)){
						SCFUtils.alert('机构号已存在，请重新输入！！');
						$('#busiUnit').val('');
					}
				}			
		};	
		SCFUtils.ajax(oos);	
	}
}

function changeRegion(){
	 $('#cityCd').combobox('setValue','');
	 var str = $('#regionCd').combobox('getValue');
	 str=str.substr(0,2);
	 var option={
				url:SCFUtils.AJAXURL,
				data: {
					queryId:'Q_P_000093',
					sysRefNo:str
				},
				callBackFun:function(data){
					if(data.success){
						$('#cityCd').combobox('loadData', data.rows);					
	    			}
				}
		};	
		SCFUtils.ajax(option);
}

function queryCity(){
	 var sysRefNo = $('#cityCd').combobox('getValue');
	 if(!SCFUtils.isEmpty(sysRefNo)){
		 var option={
					url:SCFUtils.AJAXURL,
					data: {
						queryId:'Q_P_000094',
						sysRefNo:sysRefNo
					},
					callBackFun:function(data){
						if(!SCFUtils.isEmpty(data.rows)){
							$('#cityCd').combobox('loadData', data.rows);					
		    			}
					}
			};	
			SCFUtils.ajax(option);
	 }
}

function queryAcNo(status){
	var acOwnerid=$('#sysRefNo').val();
	if(!SCFUtils.isEmpty(acOwnerid)){
		var option={
				url:SCFUtils.AJAXURL,
				data: {
					queryId:'Q_P_000096',
					acOwnerid:acOwnerid,
					sysTrxSts: status
				},
				callBackFun:function(data){
					if(!SCFUtils.isEmpty(data.rows)){
						SCFUtils.loadGridData('acnoTable',data.rows);	
					}
				}
		};	
		SCFUtils.ajax(option);
	}
}

function ajaxTable() {
	var options = {
			//url : SCFUtils.AJAXURL,
			toolbar : '#toolbar',
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
//				hidden:true,
				width : 100
			}, {
				field : 'acTp',
				title : '账户类型',
				width : 100,
				formatter:custacTpFormater
			}, {
				field : 'ccy',
				title : '币种',
				width : 40
			},{
				field : 'acNo',
				title : '账号',
				width : 100
			},{
				field : 'acBkNm',
				title : '开户银行',
				width : 100
			},
			 {
				field : 'acBkNo',
				title : '开户网点',
				width : 100
			},{
				field : 'acOwnerName',
				title : '关联保理商',
				width : 100
			},{
				field : 'acOwnerid',
				title : '所属客户',
				width : 100
			},{
				field : 'sysBusiUnit',
				title : '机构号',
				width : 100
			}
			] ]
		};
		$('#acnoTable').datagrid(options);
}

//新增一条数据
function addRow() {
	var row={};
	row.acOwnerid = $('#sysRefNo').val();
	row.acOwnerName=$('#custNm').val();
	if(""!=$.trim(row.acOwnerName))
	{
		row.acOwnerType='F';
		row.sysBusiUnit=$('#busiUnit').val();
		row.op='add';
		var options = {
			title:'新增账号信息',
			reqid : 'I_P_000016',
			height : '550',
			data : {'row' : row},
			onSuccess : addSuccess
		};
		SCFUtils.getData(options);
	}
	else
	{
		SCFUtils.alert("您还没有填写公司名称！");
	}
	
}
//修改一条数据
function editRow() {
	var row = $('#acnoTable').datagrid('getSelections');
	if (row.length == 1) {
		row = row[0];
		row.op = 'edit';
		row.acOwnerid = $('#sysRefNo').val();
		row.acOwnerName=$('#custNm').val();
		
		if(""!=$.trim(row.acOwnerName))
		{
			row.acOwnerType='F';
			row.sysBusiUnit=$('#busiUnit').val();
			if ('RE' === SCFUtils.FUNCTYPE) {
				row.state = 'query';
			}
			var options = {
				title:'新增账号信息',
				reqid : 'I_P_000016',
				height : '370',
				data : {
					'row' : row
				},
				onSuccess : editSuccess
			};
			SCFUtils.getData(options);
		}
		else
		{
			SCFUtils.alert("您还没有填写公司名称！");
		}
		
	} else if (row.length > 1) {
		SCFUtils.alert("只能选择一条数据！");
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
}

// 删除一条数据
function deleteRow() {
	var rows = $('#acnoTable').datagrid('getSelections');
	var copyRows = [];
	for (var j = 0; j < rows.length; j++) {
		copyRows.push(rows[j]);
	}
	if (rows.length > 0) {
		 SCFUtils.confirm('确定删除选中的数据吗？',function(){
			 for(var i =0;i<copyRows.length;i++){    
		        var index = $('#acnoTable').datagrid('getAllRowIndex',copyRows[i].sysRefNo);
		        $('#acnoTable').datagrid('deleteRow',index); 
		     }
		 });
		
		/*$.messager.confirm('Confirm', '确定删除选中的数据吗？', function(r) {
			if (r) {
				 for(var i =0;i<copyRows.length;i++){    
			            var index = $('#acnoTable').datagrid('getAllRowIndex',copyRows[i].sysRefNo);
			            $('#acnoTable').datagrid('deleteRow',index); 
			        }
			}
		});*/
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
	
}

function addSuccess(data) {
	$('#acnoTable').datagrid('appendRow', data);

}
function editSuccess(data) {
	var row = $('#acnoTable').datagrid('getSelected');
	var rowIndex = $('#acnoTable').datagrid('getRowIndex', row);
	$('#acnoTable').datagrid('updateRow', {
		index : rowIndex,
		row : data
	});
}