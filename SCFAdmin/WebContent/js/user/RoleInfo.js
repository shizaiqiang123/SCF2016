/**
 * 角色js
 * @author hyy
 */
/**
 * 初始化流水号
 */

function ajaxBox(){
//	var roleType = [{"id":'999',"text":"super_admin"},{"id":'0',"text":"默认角色"},{"id":'9',"text":"平台级"},{"id":'3',"text":"产品级"},{"id":'5',"text":"保理商操作员"}];
//	$("#roleType").combobox('loadData',roleType);	
	//var userRole =$('#sysUserType').val();
	var option={
			url:SCFUtils.AJAXURL,
			data:{
				queryId :'Q_P_000190'
			},
		callBackFun : function(data){
			if(data.success){
				$("#roleType").combobox('loadData',data.rows);
			}
		}
	};
	SCFUtils.ajax(option);
	var roleLevel = [{"id":'1',"text":"银行级"},{"id":'2',"text":"企业级"},{"id":'3',"text":"合作方"},{"id":'7',"text":"游客级"},{"id":'9',"text":"默认级"}];
	$("#roleLevel").combobox('loadData',roleLevel);	
}

function pageOnInt() {
	ajaxBox();	
	SCFUtils.setTextReadonly('roleId', true);
	SCFUtils.setTextReadonly('productNm', true);
	SCFUtils.setLinkbuttonReadonly('selectProduct', true);
}

function pageOnLoad(data) {
	
	featchRefNo();
	
	if (!SCFUtils.isEmpty(data) && !SCFUtils.isEmpty(data.success)
			&& data.success == true) {
		
		if ('ADD'== SCFUtils.OPTSTATUS) {
//			if($('#roleType').combobox('setValue', '0')){
//				SCFUtils.setTextReadonly('productNm', true);
//			}
//			else{
//				SCFUtils.setTextReadonly('productNm', false);
//			}
//			getAllPerTree();
		}else {
			SCFUtils.loadForm('roleForm', data);
			//var roleType = data.obj.roleType;
//			if(roleType == '3'){
//				var productId = data.obj.productId;
//				getPerTree();
//			}else{
//				getAllPerTree();
//			}
			getAllPerTree();
			getMenuByRole(data.obj.roleId);
		}
	}
}

//取流水号
function featchRefNo(){
	var options={};
	options.data = {
			refName: 'RoleNo',
			refField:'sysRefNo'
				};
	SCFUtils.getRefNo(options);
	options.data = {
			refName: 'roleId',
			refField:'roleId'
				};
	SCFUtils.getRefNo(options);
}

function getMenuByRole(roleId){
	var perInfoDiv = $('#perInfoDiv');	//菜单div
	var options = {
			url:SCFUtils.AJAXURL,
			data:{queryId:'Q_P_000178',roleId:roleId},
			callBackFun:function(data){
				if(data.success){
					$(data.rows).each(function(i,obj){
						var n = perInfoDiv.tree('find',obj.menuId);
						if(n&&n.isparent=='N'){
							perInfoDiv.tree('check',n.target);
						}
					});
				}
			}
	};     
    SCFUtils.ajax(options);
}


function pageOnPreLoad(data) {
	pageOnLoad(data);
}

function pageOnResultLoad(data) {
	var checked=data.obj.checked;
	SCFUtils.loadForm('roleForm', data);
	$('#perInfoDiv').tree({checkbox:true}).tree('loadData',data.obj.tree);
	var selectId;
	$.each(checked,function(i,n){
		selectId=n.id;
		var node = $('#perInfoDiv').tree('find', selectId);
		$('#perInfoDiv').tree('check', node.target);
	});
}

function onNextBtnClick(){	
	if(getMenu()){		
		var mainData=SCFUtils.convertArray('roleForm');
		var menuTree=$("#perInfoDiv").tree('options').data;
		var mainTree = {};
		var checked=$('#perInfoDiv').tree('getChecked');
		var json = new Array();
		var parentId;
		for(var i=0; i<checked.length; i++){
			var parent = $('#perInfoDiv').tree('getParent',checked[i].target);
			if(!SCFUtils.isEmpty(parent)){
				parentId=parent.id;
			}else{
				parentId='';
			}
			json[i]={id:checked[i].id,parentId:parentId};
		}
		mainTree.tree = SCFUtils.json2str(menuTree);
		mainTree.checked = SCFUtils.json2str(json);
		$.extend(mainData,mainTree);
		return mainData;
	}else{
		SCFUtils.alert('请勾选菜单');
	}	
}
function onDelBtnClick(){	
	return SCFUtils.convertArray('roleForm');	
}

function loadUserTable() {
	var options = {
			url : SCFUtils.AJAXURL,
			queryParams :{queryId:'Q_S_000006',cacheType:'non'},
			toolbar : '#toolbar',
			checkOnSelect:false,
			singleSelect:false,//只选一行
			pagination : true,//是否分页
			fitColumns : true,
			idField : 'sysRefNo',
			columns : [ [{
				field : 'userId',
				title : '用户登录编号',
				width : 30
			}, {
				field : 'userNm',
				title : '用户名称',
				width : 30
			}, {
				field : 'userTp',
				title : '用户类型',
				width : 40
			}, {
				field : 'busiUnit',
				title : '用户机构号',
				width : 40
			}, {
				field : 'sysRefNo',
				hidden:true,
				title : 'sysRefNo',
				width : 40
			}] ]
		};
		$('#userDg').datagrid(options);
}


function showLookUpWindow(){
	var productId = $("#productId").val();
	var options = {
		title:'产品查询',
		reqid:'I_P_000033',
		data:{'productId':productId},
		onSuccess:productSuccess
	};
	SCFUtils.getData(options);
}

function productSuccess(data){
	$('#productId').val(data[0].productId);
	$('#productNm').val(data[0].productNm);
	getPerTree();
}

function loadTree(sysRefNo){
	var perInfoDiv = $('#perInfoDiv');	
	var options = {
			url:SCFUtils.AJAXURL,
			data:{queryId:'Q_P_000178',roleId:sysRefNo},
			callBackFun:function(data){
				if(data.success){
					var s = '';					
					$(data.rows).each(function(i,obj){
						if(s != ''){
							s += ',';
						}
						s += obj.sysRefNo; 
						var n = perInfoDiv.tree('find',obj.menuId);
						if(n.isparent=='N'){
							perInfoDiv.tree('check',n.target);
						}
					});
					$('#menuSysRefNo').val(s);					
				}
			}
	};     
     SCFUtils.ajax(options);
}

/**
 * 初始化完整树形。
 */
function getPerTree(){
	var productId=$('#productId').val();
	var divModule = $('#perInfoDiv');
   	var options = {
   			url:SCFUtils.AJAXURL,
   			data:{queryId:'Q_P_000179',productId:productId,cacheType :'non'},
   			callBackFun:function(data){
   				if(data.success){					
   					divModule.tree({
							data:data.rows,
							//lines:true,//是否显示树控件上的虚线。							
							checkbox:true
   					});					
   				}				
   			}			
   	};
   	SCFUtils.ajax(options);	
}

/**
 * 获取勾选的tree菜单。
 * @returns {Boolean}
 */
function getMenu(){
	var nodes = $('#perInfoDiv').tree('getChecked');
	var s = '';
	for (var i = 0; i < nodes.length; i++) {
		//if ($('#perInfoDiv').tree('isLeaf', nodes[i].target)) {
			if (s != '') {
				s += ',';
			}
			s += nodes[i].id;
			//找其父节点  edit by dongll 遍历所有父节点 
			/*var parent = $('#perInfoDiv').tree('getParent',nodes[i].target);
			if(!SCFUtils.isEmpty(parent)){
				s += ','+parent.id;
			}*/
			var ids = '';
			ids = getParent(nodes[i],ids);
			if(!SCFUtils.isEmpty(ids)){
				s += ',' + ids;
			}
		//}
	}
	if(SCFUtils.isEmpty(s)){
		return false;
	}
	$('#menuTree').val(filterRepeatStr(s));
	return true;
}

//遍历父节点ID
function getParent(nodes,s){
	var parent = $('#perInfoDiv').tree('getParent',nodes.target);
	if(!SCFUtils.isEmpty(parent)){
		 s += ',' + parent.id;
		 s = getParent(parent,s);
	}
	return s;
}

/**
 * 字符串去重
 * @param str
 * @returns
 */
function filterRepeatStr(str) {
	var ar2 = str.split(",");
	var array = new Array();
	var j = 0;
	for (var i = 0; i < ar2.length; i++) {
		if ((array == "" || array.toString().match(new RegExp(ar2[i], "g")) == null)
				&& ar2[i] != "") {
			array[j] = ar2[i];
			array.sort();
			j++;
		}
	}
	return array.toString();
}

function changeRoleType(){
	var roleType = $('#roleType').combobox('getValue');
	var  node= $("#perInfoDiv").tree('getRoots');
	for( var i=node.length-1;i>=0;i-- ){
		 $('#perInfoDiv').tree('remove', node[i].target);
	}
	if(roleType =='40'){
		SCFUtils.setLinkbuttonReadonly('selectProduct', false);
	}else
	{
		SCFUtils.setLinkbuttonReadonly('selectProduct', true);
		$('#productNm').val('');
		getAllPerTree();
	}
}

/**
 * 初始化全部的树形菜单。
 */
function getAllPerTree(){
	var divModule = $('#perInfoDiv');
	var roleType = $('#roleType').combobox('getValue');
	var productId = $("#productId").val();
   	var options = {
   			url:SCFUtils.AJAXURL,
   			data:{
   				queryId:'Q_P_000177',
   				roleType:roleType,
   				productId:productId
   				},
   			callBackFun:function(data){
   				if(data.success){
   					divModule.tree({
							data:data.rows,
							//lines:true,//是否显示树控件上的虚线。							
							checkbox:true
   					});					
   				}				
   			}			
   	};
   	SCFUtils.ajax(options);	
}

