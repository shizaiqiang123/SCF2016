function pageOnInt(){
	ajaxbox();
}

function ajaxbox(){
	var productSts = [ {
		"id" : '0',
		"text" : "即将上线"
	}, {
		"id" : '1',
		"text" : "已上线"
	} ];
	$('#productSts').combobox('loadData', productSts);
}

function pageOnLoad(data) {
	var options = {};
	options.data = {
		refName : 'ProductNo',
		refField : 'sysRefNo'
	};
	SCFUtils.getRefNo(options);
	$('#productId').val($('#sysRefNo').val());
	getPerTree();
	SCFUtils.setTextReadonly('productId', true);
	if (!SCFUtils.isEmpty(data) && !SCFUtils.isEmpty(data.success)
			&& data.success == true) {
		SCFUtils.loadForm('productAddForm', data);

		if ('ADD' !== SCFUtils.OPTSTATUS) {
			// 加载选中的树形菜单，必须在设置form只读后加载。
			loadTree(data.obj.sysRefNo);
			SCFUtils.setTextReadonly("busiTp", true);
		}
	}
}

function pageOnPreLoad(data) {
	getPerTree();
	pageOnResultLoad(data);
}


function pageOnResultLoad(data) {
	var checked=data.obj.checked;
	SCFUtils.loadForm('productAddForm', data);
	$('#perInfoDiv').tree({checkbox:true}).tree('loadData',data.obj.tree);
	var selectId;
	$.each(checked,function(i,n){
		selectId=n.id;
		var node = $('#perInfoDiv').tree('find', selectId);
		$('#perInfoDiv').tree('check', node.target);

	});
}


function onNextBtnClick() {
	if(getMenu()){		
		var mainData=SCFUtils.convertArray('productAddForm');
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
				parentId=''
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
//	if (getMenu()) {
//		return SCFUtils.convertArray('productAddForm');
//	} else {
//		SCFUtils.alert('请勾选菜单');
//	}
}

function onDelBtnClick() {
	return SCFUtils.convertArray('productAddForm');
}


function loadTree(sysRefNo){	
	var perInfoDiv = $('#perInfoDiv');	
	var options = {
			url:SCFUtils.AJAXURL,
			data:{queryId:'Q_P_000176',productId:sysRefNo},
			callBackFun:function(data){
				if(data.success){
					var s = '';					
					$(data.rows).each(function(i,obj){
						if(s != ''){
							s += ',';
						}
						s += obj.sysRefNo; 
						var n = perInfoDiv.tree('find',obj.perId);
						if(n&&n.isparent=='N'){
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
	var divModule = $('#perInfoDiv');
   	var options = {
   			url:SCFUtils.AJAXURL,
   			data:{queryId:'Q_P_000177'},
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
			//找其父节点
			var parent = $('#perInfoDiv').tree('getParent',nodes[i].target);
			if(!SCFUtils.isEmpty(parent)){
				s += ','+parent.id;
			}
		//}
	}
	
	if(SCFUtils.isEmpty(s)){
		return false;
	}
	$('#menuTree').val(filterRepeatStr(s));
	return true;
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


