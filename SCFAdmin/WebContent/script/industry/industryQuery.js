function initNotice() {
	var notice = '您好,您正在查询信息中';
	return notice;
}

function pageOnInt(data) {
	ajaxBox();
}

function pageOnLoad(data) {

	SCFUtils.loadForm('loanSubmit', data);

}

function pageOnResultLoad(data) {
	SCFUtils.loadForm('loanSubmit', data);
}

function pageOnPreLoad(data) {
	SCFUtils.loadForm('loanSubmit', data);
}

function pageOnReleasePageLoad(data) {
	pageOnResultLoad(data);
}

function pageOnReleaseResultLoad(data) {
	SCFUtils.loadForm('loanSubmit', data);
}

function pageOnReleasePreLoad(data) {
	pageOnResultLoad(data);
}

function onNextBtnClick() {
	var data = SCFUtils.convertArray('loanSubmit');
	return data;
}

/**
 * 加载行业第一大类的数据
 */
function ajaxBox() {
	var opt = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000534',
				cacheType : 'non'
			},
			callBackFun : function(data) {
				if (data.success) {
					$('#sysRefNoOne').combobox('loadData', data.rows);
				}
			}
		};
		SCFUtils.ajax(opt);
}

/**
 * 加载其他类行业
 * @param id 元素ID
 */
function ajaxBoxOther(id) {
	var sysRefNo = $('#'+id).combobox("getValue");
	var nextId = id;
	do{
		nextId = $("#"+nextId).attr("nextId");//nextId是为了方便对下级行业操作自定义的元素属性 其值表示下级行业input的ID
		$("#"+nextId).combobox("clear");//对下级行业元素值清0
	}while($("#"+nextId).attr("nextId"));
	var opt = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000532',
				cacheType : 'non',
				sysRefNo : sysRefNo
			},
			callBackFun : function(data) {
				if (data.success) {
					$('#'+$("#"+id).attr("nextId")).combobox('loadData', data.rows);
				}
			}
		};
		SCFUtils.ajax(opt);
}

/**
 * 这里所有的input全用一个Onchange事件
 * onchange
 */
function changeValue(){
	var id = $(this).attr('id');
	if(!id)return;//当第4大类时结束不再加载数据
	ajaxBoxOther(id);
}