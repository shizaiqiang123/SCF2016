package com.ut.scf.core.component.batch;

import java.io.File;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.collections.Predicate;
import org.apache.commons.lang.StringUtils;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.ut.comm.tool.DateTimeUtil;
import com.ut.comm.tool.ErrorUtil;
import com.ut.comm.tool.UUIdGenerator;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.xml.XMLParaParseHelper;
import com.ut.comm.xml.logicflow.LogicNode;
import com.ut.comm.xml.query.QueryNode;
import com.ut.comm.xml.ref.RefPara;
import com.ut.comm.xml.task.TaskPara;
import com.ut.comm.xml.template.TemplatePara;
import com.ut.comm.xml.trx.TrxDataPara;
import com.ut.scf.core.batch.AbsRunableTask;
import com.ut.scf.core.component.ILogicComponent;
import com.ut.scf.core.component.IMainComponent;
import com.ut.scf.core.component.query.IQueryFactory;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.doc.DocumentFactoryImpl;
import com.ut.scf.core.entity.ApSessionContext;
import com.ut.scf.core.log.APLogUtil;
import com.ut.scf.core.ref.IReferenceNo;
import com.ut.scf.core.utils.ApSessionUtil;
import com.ut.scf.core.utils.ClassLoadHelper;


/**
 * 节假日导入
 * @author develop
 *
 */
@Component("batchHolidayExecutor")
@Scope("prototype")
public class BatchHolidayExecutor  extends AbsRunableTask{
	
	protected ApSessionContext context;// 当前交易基本信息
	
	@Resource(name = "documentFactory")
	DocumentFactoryImpl documentFactory ;
	@Resource(name = "refNoManager")
	IReferenceNo refNoManager;
	@Resource(name = "trxCatalogManager")
	IMainComponent catalogProcessor;
	@Resource(name = "queryFactory")
	IQueryFactory queryFactory;
	@Override
	public void execute() {
		this.context = ApSessionUtil.getContext();			
		try {
			processHoliday();
		} catch (Exception e) {
			e.printStackTrace();
			APLogUtil.getUserErrorLogger().error(ErrorUtil.getErrorStackTrace(e));
		}
	}

	/**
	 * 
	 */
	private void processHoliday() throws Exception {
		TaskPara taskPara = (TaskPara) currentTask.getParam();
		TrxDataPara trxDataPara = taskPara.getTrxdatapara();
		String filePath = (String)trxDataPara.getProterties().get("filePath");//获取文件路径
		String fileBakPath =  (String) trxDataPara.getProterties().get("fileBakPath"); //文件备份路径
		final String fileExtensions = (String)trxDataPara.getProterties().get("fileExtensions");//获取文件后缀名
		
		File[] files = new File(filePath).listFiles();
		if(files==null || files.length==0){
			APLogUtil.getUserLogger().info("当前目录"+filePath+"下没有文件。");
			return;
		}
		
		List<File> fileList = Arrays.asList(files);
		
		//过滤文件
		@SuppressWarnings("unchecked")
		List<File> resultList = (List<File>) CollectionUtils.select(fileList,
				new Predicate(){
					public boolean evaluate(Object o) {
						File f =(File) o;
						String[] fileExtension = fileExtensions.split(",");
						for (String fileExt : fileExtension) {
							if(f.getName().endsWith(fileExt)){
								return true;
							}
						}
						return false;
					}			
		});
		
		if(resultList.size() == 0){
			APLogUtil.getUserLogger().info("当前目录"+filePath+"下没有节假日数据文件。");
			return;
		}
		
		
		for(File file:resultList){
			try {
				JSONObject reqData = JsonHelper.createReqJson();
				JSONObject trxData = JsonHelper.getTrxObject(reqData);
				trxData.put("filePath", file.getAbsolutePath());
				int pos=file.getName().lastIndexOf(".");
			    trxData.put("fileExtensions",file.getName().substring(pos));
			    JsonHelper.setTrxObject(reqData, trxData);	    
				FuncDataObj logicObj = new FuncDataObj();
			    logicObj.setReqData(reqData);	    
			    
			    String templateId =  (String) trxDataPara.getProterties().get("templateId");//配置文件id
				TemplatePara  templatePara = XMLParaParseHelper.parseFuncTemplatePara(
						templateId,context.getSysBusiUnit());//配置文件信息	    
			    logicObj.setReqParaObj(templatePara);
			    
			    //处理文件
			    importHolidayFromFile(logicObj);
			 
			    File fileBak = new File(fileBakPath); 
			    if (!fileBak.exists()) {
					fileBak.mkdirs();
				}
			    //备份文件
			    bakHolidayFile(file.getAbsolutePath(), fileBakPath+File.separator+file.getName());			    
			    
				
			} catch (Exception e) {
				e.printStackTrace();
				APLogUtil.getUserLogger().error("BatchHolidayExecutor: 批处理节假日数据导入逻辑流出错。");
				APLogUtil.getUserErrorLogger().error(ErrorUtil.getErrorStackTrace(e));
			}
		}	   
	}

	private void importHolidayFromFile(FuncDataObj logicObj) throws Exception {		
		 //解析上传文件内容,数据写入logicObj中的data中。	   
    	TemplatePara  templatePara = (TemplatePara) logicObj.getReqParaObj();    	
		documentFactory.getProcessor(templatePara).importDoc(logicObj);			
	    reformat(logicObj);	    	
	}
	
	public void reformat(FuncDataObj logicObj) throws Exception {		
			APLogUtil
					.getUserLogger()
					.info("==================BatchHolidayExecutor  start==========================");
			List list = (List) logicObj.getData().get(logicObj.getDoName());
			JSONObject reqData = logicObj.getReqData();
			JSONObject trxData = JsonHelper.getTrxObject(reqData);	
			// 校验数据
//			list = checkData(logicObj, list);

			list = getSysRefNo(logicObj, list);// 获取应收账款流水加入list中。			
			FuncDataObj dataObj = new FuncDataObj();
			String poolSts = ""; //出入池状态
			for (int i = 0; i < list.size(); i++) {
				Map map = (Map) list.get(i);
				String holiday = map.get("holiday").toString();
				String regex="^\\d{4}-\\d{2}-\\d{2}";
				if(holiday.matches(regex)){
					String []date = holiday.split("-");
					String year = date[0];
					String month = date[1];
					String day = date[2];
					map.put("year", year);
					map.put("month", month);
					map.put("day", day);
					dataObj.mergeResponse(saveHolidayInfo(logicObj.getReqData(), map)); //统一事务
				}else{
					APLogUtil.getUserLogger().info("日期格式不正确");
				}
				
			}
			JsonHelper.setTrxObject(reqData, trxData);
			daoHelper.execUpdate(dataObj);
			
			APLogUtil.getUserLogger().info("==================BatchInvcExecutor  end==========================");		
	}

	/**
	 * 获取每张应收账款的流水，并将应收账款余额、协议号和批次号写入list
	 * 
	 * @param logicObj
	 * @param list
	 * @return
	 * @throws Exception
	 * @see [类、类#方法、类#成员]
	 */
	private List getSysRefNo(FuncDataObj logicObj, List list) throws Exception {
		List refList = new ArrayList();
		for (int i = 0; i < list.size(); i++) {
			String sysRefNo = UUIdGenerator.getUUId();
			Map map = (Map) list.get(i);			
			map.put("sysRefNo", sysRefNo);
			refList.add(map);
		}
		APLogUtil.getUserLogger().info(list.toString());
		return refList;
	}
	
	

	public FuncDataObj saveHolidayInfo(JSONObject trxDom, Map map)
			throws Exception {
		FuncDataObj dataObj = new FuncDataObj();
		JSONObject trxData = JsonHelper.getTrxObject(trxDom);
		if (trxData.containsKey("sysBusiUnit")) {
			String sysBusiUnit = trxData.getString("sysBusiUnit");
			trxData.put("sysBusiUnit", sysBusiUnit);
		}
		LogicNode mainLogic = new LogicNode();
		mainLogic.setTablename("STD.STD_HOLIDAY");
		mainLogic.setType("C");	
		mainLogic.setCascadeevent("N");
		dataObj.setReqParaObj(mainLogic);
		trxData.putAll(map);
		trxData.put("busiTp", "0");
		trxData.put("sysEventTimes", 1);
		trxData.put("sysOpTm", DateTimeUtil.getTimestamp());
		dataObj.setReqData(trxData);

		ILogicComponent t = ClassLoadHelper.getBusiComponetProcessor("trxAddRecord");
		dataObj = t.postData(dataObj);
		return dataObj;
	}

	/**
	 * 备份文件
	 * @param oldPath  旧文件完整路径
	 * @param newPath  新文件完整路径
	 */
	private void bakHolidayFile(String oldPath,String newPath) throws Exception{
		APLogUtil.getUserLogger().info("-----开始备份文件--"+oldPath);
		SimpleDateFormat sf = new SimpleDateFormat("yyyyMMddHHmmss");		
		String timeTrail = sf.format(new Date());
		File old = new File(oldPath);
		File newFile = new File(newPath+timeTrail);
		boolean s = old.renameTo(newFile);
		if(s){
			APLogUtil.getUserLogger().info("备份成功："+s+":"+newPath+timeTrail);
		}else{
			APLogUtil.getUserLogger().info("备份失败："+s+":"+newPath+timeTrail);
		}
	}
}
