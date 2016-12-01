package com.ut.scf.core.doc;

import java.io.FileInputStream;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.xml.XMLParaParseHelper;
import com.ut.comm.xml.mapping.HeadPara;
import com.ut.comm.xml.mapping.MappingPara;
import com.ut.comm.xml.template.MappingField;
import com.ut.comm.xml.template.TemplatePara;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.entity.ApSessionContext;
import com.ut.scf.core.utils.ApSessionUtil;

@Component("excelManager") 
public class ExcelManager implements IDocumentManager{

	private  static Logger logger = LoggerFactory.getLogger(ExcelManager.class);
	
	
	@Override
	public void importDoc(FuncDataObj logicObj) throws Exception {
		try {
			JSONObject trxData = JsonHelper.getTrxObject(logicObj.getReqData());
			TemplatePara  templatePara = (TemplatePara)logicObj.getReqParaObj();
			String tempId = templatePara.getId();
			String fileExtensions = trxData.getString("fileExtensions");//上传文件后缀		
			String path = trxData.getString("filePath");//上传文件路径			
	    	if(!(".xls".equals(fileExtensions)||".xlsx".equals(fileExtensions))){
	    		throw new Exception("上传的文件不是excel文件，与配置文件不一致，请确定后重新上传。");
	    	}
	    	List list = parseExcel(tempId,path);
	    	if(list.size()==0){
	    		throw new Exception("解析excel内容为空，请检查excel模板和配置文件。");
	    	}
	    	logicObj.buildRespose(list);
		}
		catch (Exception e) {
			e.printStackTrace();			
			throw new Exception(e.getMessage());
		}     	
	}

	
	@Override
	public void exportDoc(FuncDataObj logicObj) throws Exception {
		
		
	}	
	
	/**
	 * 
	 * 根据指定的配置文件，读取excel,把每一行转换成一个HashMap对象,通过List返回
	 * @param templateId		excel配置文件ID
	 * @param excelURL			excel路径
	 * @return
	 * @throws Exception
	 * @author hyy   2014-12-29
	 * @see [类、类#方法、类#成员]
	 */	
	public List parseExcel(String templateId,String excelURL) throws Exception{
		InputStream strexc = null;
		List list = new ArrayList();//存放excel中的所有数据
		int sheetIndex = 1, rowOffset = 2, cellOffset = 0,maxRow = 5000,maxColumn = 100 ;  //默认是从第二工作表， 第二行，第一列 开始解析 		
		try {
			//解析excel配置文件
			ApSessionContext context = ApSessionUtil.getContext();
			TemplatePara  templatePara = XMLParaParseHelper.parseFuncTemplatePara(templateId,context.getSysBusiUnit());
			HeadPara headPara = templatePara.getHead();//获取头信息。
			MappingPara mappingPara =templatePara.getMapping();//获取mapping信息。					
			
			int pos=excelURL.lastIndexOf(".");	    	
			
			//解析excel上传文件数据
			strexc = new FileInputStream(excelURL);//创建一个路径为excelURL 的InputStream
			Workbook workbook = null;
			if(".xls".equals(excelURL.substring(pos))){
				workbook = new HSSFWorkbook(strexc); //2003版
			}
			if(".xlsx".equals(excelURL.substring(pos))){			
				workbook = new XSSFWorkbook(strexc); //2007版
			}
			
			List<HashMap> listHead = getHead(headPara, workbook); //获取头excel信息
						
			sheetIndex = workbook.getSheetIndex(mappingPara.getName());			
			Sheet worksheet= workbook.getSheetAt(sheetIndex);//根据sheetIndex 读取工作表										
			
			//获取起始行 起始列
			if(mappingPara.getBeginRow()!=null){
				rowOffset = mappingPara.getBeginRow();
			}	
			if(mappingPara.getBeginColumn()!=null){
				cellOffset = mappingPara.getBeginColumn();					
			}	
			if(mappingPara.getEndRow()!=null){
				maxRow = mappingPara.getEndRow();
			}
			if(mappingPara.getEndColumn()!=null){
				maxColumn = mappingPara.getEndColumn();
			}
			
			int rowNum = worksheet.getLastRowNum();//获取所有行
			for(int j=0; j<=rowNum; j++){
			   if(j >= rowOffset&&j<=maxRow){//从第几行开始读取,设置最大行数不能超过5000
				   Row row =  worksheet.getRow(j);//获取这一行EXCEL对象
				   if (row != null) {
					   Iterator cells = row.cellIterator();//获取这一行所有列的Iterator对象集合
					   int cellIndex = 0;
					   HashMap map = new HashMap();
					   while(cells != null && cells.hasNext()&&cellIndex<=maxColumn){//遍厉列数Iterator 设置最大列数不能超过100
						   cells.next();
						   MappingField  mappingField = mappingPara.getFieldObj(cellIndex);//获取每列的配置
						   Cell cell=row.getCell(cellIndex);//循环读取这一行每一列对象
						   String isnull = mappingField.getIsnull();//判断该单元格是否是空
						   String desc = mappingField.getDesc();//获取表头
						   if(cell != null && cellIndex>=cellOffset){//从第几列开始读取,设置最大列数不能超过100
							   if(listHead!=null){								   
								   Iterator rowsHead = listHead.iterator();
								   int index =0;
								   while(rowsHead != null && rowsHead.hasNext()){
									   rowsHead.next();
									   Map mapHead = listHead.get(index);
									   map.putAll(mapHead);//加入头中的信息
									   index ++;
								   }							   
							   }
							   writeCell(map, mappingField, cell);//写入列值							   
						   } else {
							   //当单元格是空时，提示是哪个单元格为空
			            	   if(StringUtils.equals(isnull, "false")) {
			            		   throw new Exception(desc + "("+ (cellIndex+1) + ")列，第" + (j+1) + "行，不能为空，不符合模板要求，请重新上传模板数据。");
			            	   }
						   }
						   cellIndex++;
					   }
					   
					   if(!map.isEmpty()){
						   list.add(map);
					   }					   				  
				   }
			   }
			}					
			logger.info("excel解析："+list.toString());
		}  catch(Exception e) {			
			throw new Exception(e.getMessage());
		} finally {
			if (strexc != null) {
				strexc.close();
				strexc = null;
			}			
		}
		return list;
	}
	
	/**
	 * 写入列值	
	 * @param map
	 * @param mappingField
	 * @param cell
	 * @see [类、类#方法、类#成员]
	 */
	private void writeCell(HashMap map, MappingField mappingField, Cell cell) {
		setCellTypeByMapping(mappingField, cell);//根据配置文件中的类型设置列类型。	
		switch (cell.getCellType())
		     {
		       case Cell.CELL_TYPE_BOOLEAN:
		    	   map.put(mappingField.getMfield(), cell.getBooleanCellValue());
		    	   break;
		       case Cell.CELL_TYPE_ERROR:
		    	   map.put(mappingField.getMfield(), cell.getErrorCellValue());
		    	   break;
		       case Cell.CELL_TYPE_FORMULA:
		       case Cell.CELL_TYPE_STRING:
		    	   map.put(mappingField.getMfield(), StringUtils.trim(cell.getStringCellValue()));
		    	   break;
		       case Cell.CELL_TYPE_NUMERIC:
		    	   if (DateUtil.isCellDateFormatted(cell))
		    	   {
		    		   Date date = cell.getDateCellValue();
		    		   map.put(mappingField.getMfield(), new SimpleDateFormat("yyyy-MM-dd").format(date));
		    	   }
		    	   else
		    	   {
		    		   map.put(mappingField.getMfield(), cell.getNumericCellValue());
		    	   }
		    	   break;
		       case Cell.CELL_TYPE_BLANK:
		    	   map.put(mappingField.getMfield(), null);
		    	   break;
		       default:
		    	   map.put(mappingField.getMfield(), null);
		     }
	}

	/**
	 * 根据配置文件设置单元格的类型
	 * @param mappingField
	 * @param cell
	 * @see [类、类#方法、类#成员]
	 */
	private void setCellTypeByMapping(MappingField mappingField, Cell cell) {
		String type = mappingField.getType();
		int flag = 1;
		if(("java.lang.String").equals(type)){
			flag =1;
		}
		if(("java.lang.Double").equals(type)||("java.util.Date").equals(type)){
			flag =0;
		}		
		if(("java.lang.Boolean").equals(type)){
			flag = 4;
		}
		cell.setCellType(flag);
	}
	
	/**
	 * 获取头信息	 
	 * @param headPara
	 * @param workbook
	 * @return
	 * @throws Exception 
	 * @see [类、类#方法、类#成员]
	 */
	public List getHead(HeadPara headPara,Workbook workbook) throws Exception{		
		List list = new ArrayList();		
		try {
			int sheetIndex = workbook.getSheetIndex(headPara.getName());
			Sheet worksheet= workbook.getSheetAt(sheetIndex);//根据sheetIndex 读取工作表
			
			List<MappingField> listField = headPara.getSearch();
			if(listField!=null){		
				Iterator rowsField = listField.iterator();//获取头配置信息的集合
				int rowFieldIndex = 0;
				while(rowsField!=null && rowsField.hasNext()){		
					rowsField.next();
					MappingField mappingField = headPara.getFieldObj(rowFieldIndex);
					String isNull = mappingField.getIsnull(); //是否为空
					//获取行列位置
					String key = mappingField.getKey();
					String field = mappingField.getMfield();
					String[] keys = key.split(",");
					
					//Iterator rows = worksheet.rowIterator();//获取此工作表所有行的Iterator对象集合
					int rowIndex=Integer.valueOf(keys[0]);
					int cellIndex=Integer.valueOf(keys[1]);
					Row row =  worksheet.getRow(rowIndex);//获取这一行EXCEL对象
					if(row!=null){
						Cell cell=row.getCell(cellIndex);//循环读取这一行这一列对象
						if(cell!=null){
							HashMap map=new HashMap();
							writeCell(map, mappingField, cell);//写入列值
							list.add(map);
						}
					}else {
						//当单元格是空时，提示是哪个单元格为空
	            	   if(StringUtils.equals(isNull, "false")) {
	            		   throw new Exception("第"+ (cellIndex+1) + "列，第" + (rowIndex+1) + "行，不能为空，不符合模板要求，请重新上传模板数据。");
	            	   }
					}
					rowFieldIndex++;			
				}
				logger.info("head:"+list.toString());
			}
		}
		catch (Exception e) {			
			throw new Exception(e.getMessage());
		}		
		return list;
	}
	
	public static void main(String[] args) throws Exception {
		/*ExcelManger excelManger = new ExcelManger();
		System.setProperty("user.dir", "E:\\SCF2_XIN\\para");
		String templateId ="T0000001";		
		
		String paraPath = "E:\\SCF2_XIN\\SCFCore\\ap\\非标准池入库确认导入.xls";

		Map<String,List<Map>> propertyValue = excelManger.parseExcel(templateId, paraPath);
		*/
	}	
}