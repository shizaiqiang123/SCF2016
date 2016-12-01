function beforeLoad() {
	var data = {
		cacheType : 'non'
	};
	return {
		data : data
	};
}

function pageOnLoad(data) {
	queryProduct();
}

function pageOnPreLoad(data) {
	SCFUtils.loadForm('productDecForm', data);
}


function pageOnResultLoad(data) {
	SCFUtils.loadForm('productDecForm', data);
}


function onNextBtnClick() {
	var mainData = SCFUtils.convertArray('productDecForm');
	var editorData={};
	var editor = CKEDITOR.instances.description.getData();  
	editorData.description=editor;
	$.extend(mainData,editorData);
	return mainData;
}

function queryProduct() {
	var opt = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000116',
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				$('#sysRefNo').combobox('loadData',data.rows);
			}
		}
	};
	SCFUtils.ajax(opt);
}

/**
 * 导入
 */
function upload() {
	var fileList = {};
	var param = {
		data : {
			'reqType' : 'fileImportManager',
			'fileList' : fileList
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data)) {
				$('#pictureUrlHD').val(data.obj.fileName);
				$('#pictureUrl').val(data.obj.filePath);
			}
		}
	};
	SCFUtils.upload(param);
}

