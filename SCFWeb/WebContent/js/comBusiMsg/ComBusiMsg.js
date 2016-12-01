/**
 * 机构js
 * @author yhy
 */
/**
 * 初始化流水号
 */
//$(function() {
//	var options = {};
//	options.data = {
//		refName : 'InstNo',
//		refField : 'sysRefNo'
//	};
//	SCFUtils.getRefNo(options);
//});

function pageOnLoad(data) {
	
	var options = {};
	options.data = {
		refName : 'ComFunNo',
		refField : 'sysRefNo'
	};
	SCFUtils.getRefNo(options);
	SCFUtils.loadForm('comBusiMsgForm', data);
	SCFUtils.setTextReadonly('funId', true);
	SCFUtils.setTextReadonly("funUrl",true);
	SCFUtils.setTextReadonly("funPath", true);
	if(!(SCFUtils.FUNCTYPE =='MM' && SCFUtils.OPTSTATUS =='ADD'))
		{
			$('#funNmBox').combotree('setValue',data.obj.funId);
//			$('#funLevel').combobox('setValue',data.obj.funLevel);
//			$('#funStyle').combobox('setValue',data.obj.funStyle);
		}
	
}
function pageOnInt(){
	ajaxBox();
}
function ajaxBox() {
	var data=[{"id":'0',"text":"系统级"},{"id":'2',"text":""},{"id":'5',"text":"供应商级"},{"id":'7',"text":"游客级"},{"id":'9',"text":"默认级"}];
	$('#funLevel').combobox('loadData',data);
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000177',
			roleType:$('#userTp').val()
		},
		callBackFun : function(data) {
			if (data.success) {				
				$('#funNmBox').combotree('loadData',data.rows);	
		
			}	
		}
	};
	  SCFUtils.ajax(options);
}
function funIdBox()
{
	var funId=$("#funNmBox").combotree('getValue');
	$('#funId').val(funId);
	$('#funUrl').val(funId);
	funNmBox(funId);
	var funPath="";
	funPathBox(funId,funPath);
}
function funPathBox(funId,funPath){
	if(funId==null){
		return;
	}
	var options = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000217',
				menuId:funId
			},
			callBackFun : function(data) {
				if (data.success&&!SCFUtils.isEmpty(data.rows)) {
					if(funPath!=""){
						funPath=data.rows[0].menuName+">"+funPath;
					}else{
						funPath=data.rows[0].menuName;
					}
					if(data.rows[0].menuParentid!=null&&data.rows[0].menuParentid!=data.rows[0].menuId){
						funPathBox(data.rows[0].menuParentid,funPath);
					}else{
						$('#funPath').val(funPath);
					}
					
				}	
			}
		};
		  SCFUtils.ajax(options);
		  
}
function funNmBox(funId){
	if(funId !=null&&funId!="")
		{
		var options = {
				url : SCFUtils.AJAXURL,
				data : {
					queryId : 'Q_P_000207',
					menuId:funId
				},
				callBackFun : function(data) {
					if (data.success) {				
						$('#funNm').val(data.rows[0].menuName);	
						$('#funType').val(data.rows[0].menuTp);
					}	
				}
			};
			  SCFUtils.ajax(options);
		}
	
}
function pageOnResultLoad(data)
{
	SCFUtils.loadForm('comBusiMsgForm', data);
	funIdBox();
}
function onNextBtnClick(){
	return SCFUtils.convertArray('comBusiMsgForm');
}

