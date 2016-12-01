function pageOnInt() {
	ajaxbox();
}
function pageOnPreLoad(data){
	SCFUtils.loadForm('noticeForm',data);
}

function ajaxbox(){
	var data = [ {
		"id" : 'usedMemory',
		"text" : "被用的内存",
		"selected" : true
	}, {
		"id" : 'cpu',
		"text" : "%cpu"
	}, {
		"id" : 'httpSessions',
		"text" : "Http Sessions"
	}, {
		"id" : 'activeConnections',
		"text" : "活跃的jdbc连接数"
	}, {
		"id" : 'usedConnections',
		"text" : "被使用的jdbc连接数"
	}, {
		"id" : 'httpHitsRate',
		"text" : "http 每分钟hits"
	}, {
		"id" : 'httpMeanTimes',
		"text" : "http 平均时间（ms）"
	}, {
		"id" : 'httpSystemErrors',
		"text" : "%http 错误"
	}, {
		"id" : 'sqlHitsRate',
		"text" : "sql 使用每分钟"
	}, {
		"id" : 'sqlMeanTimes',
		"text" : "sql 平均时间（ms）"
	}, {
		"id" : 'sqlSystemErrors',
		"text" : "%sql 错误"
	}, {
		"id" : 'springHitsRate',
		"text" : "spring 使用每分钟"
	}, {
		"id" : 'threadCount',
		"text" : "现场统计"
	}, {
		"id" : 'loadedClassesCount',
		"text" : "加载类的数目"
	}, {
		"id" : 'usedNonHeapMemory',
		"text" : "被用过的堆得内存"
	}, {
		"id" : 'usedPhysicalMemorySize',
		"text" : "被用过的物理内存"
	}, {
		 "id" : 'httpSessionsMeanAge',
		"text" : "平均http时间（min）"
	}, {
		"id" : 'transactionsRate',
		"text" : "transactions per minute"
	}, {
		"id" : 'Free_disk_space',
		"text" : "剩余的硬盘空间"
	}, {
		"id" : 'tomcatBusyThreads',
		"text" : "tomcat忙的线程"
	}, {
		"id" : 'tomcatBytesReceived',
		"text" : "Bytes每分钟收到"
	}, {
		"id" : 'tomcatBytesSent',
		"text" : "Bytes发送每分钟"
	} ];
	$("#MonitorBox").combobox('loadData', data);
	var data =[{"id":'jour',"text":"当天","selected" : true},{"id":'semaine',"text":"本周"},{"id":'mois',"text":"当月"},{"id":'annee',"text":"本年度"},{"id":'tout',"text":"所有"}];
	$("#MonitorTimeBox").combobox('loadData', data);
}


function onNextBtnClick() {
	return SCFUtils.convertArray('noticeForm');
}

//function onCancelBtnClick() {
//	var sysRefNo = $('#sysRefNo').val();
//	return {
//		sysRefNo : sysRefNo
//	};
//}
//function onDelBtnClick() {
//	return SCFUtils.convertArray('noticeForm');
//}
