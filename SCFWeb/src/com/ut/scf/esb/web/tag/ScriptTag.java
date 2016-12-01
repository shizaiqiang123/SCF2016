package com.ut.scf.esb.web.tag;

import java.io.File;
import java.io.IOException;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspTagException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.TagSupport;

/**
 * 
 * 动态加载script文件夹下的js文件  
 * @author  hyy
 * @version  [V1.00, 2014年12月22日]
 * @see  [相关类/方法]
 * @since V1.00
 */
public class ScriptTag extends TagSupport {
	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = -5981889420245203872L;
	static Logger logger = Logger.getLogger(ScriptTag.class.getName());
	private String webPath ="";	//web地址栏路径
	private String filePath = "";//文件绝对路径
	public int doEndTag() throws JspTagException {				
		//logger.info(pageContext.getServletContext().getRealPath(""));
		JspWriter out = pageContext.getOut();// 用pageContext获取out，他还能获取session等，基本上jsp的内置对象都能获取
		HttpServletRequest request = (HttpServletRequest)pageContext.getRequest();
		
		//目前只取script文件夹下，例：http://localhost:8088/SCFWeb/script
		String webPath =  request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath()+"/script"; 		
		this.webPath = webPath;
		
		//文件绝对路径，例："E:\\SCF2_XIN\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp1\\wtpwebapps\\SCFWeb\\script";
		this.filePath = pageContext.getServletContext().getRealPath("")+"/script";
		//logger.info(filePath);
		try {
			out.println(getFile(filePath+"/plugin","/plugin"));
			out.println(getFile(filePath+"/sys","/sys"));
		}
		catch (IOException e) {
			e.printStackTrace();
		}		     
		 return EVAL_PAGE;// 标签执行完后，继续执行后面的		
	}	
	
	/**
	 * 遍历文件，如是.js结尾的文件，则拼成script.
	 * @param filePath   文件绝对路径
	 * @param rootPath	  子文件夹名，第一次为空。
	 * @return
	 * @see [类、类#方法、类#成员]
	 */
	private StringBuffer getFile(String filePath,String rootPath){
		//logger.info(filePath);
		File root = new File(filePath);
		File[] files = root.listFiles();
		StringBuffer buff = new StringBuffer();
		if(files!=null){
			for(File file:files){
				if(file.isDirectory()){				
					buff.append(getFile(file.getAbsolutePath(),file.getName()));
				}else if(file.isFile()&&file.getName().endsWith(".js")){//以.js结尾的文件。
					logger.info("<script src=\""+webPath+rootPath+"/"+file.getName()+"\"></script>\n");
					buff.append("<script src=\""+webPath+rootPath+"/"+file.getName()+"\"></script>\n");
				}
			}
		}
		return buff;
	}
	/*public static void main(String[] args) {
		ScriptTag tag = new ScriptTag();
		StringBuffer buff = tag.getFile("E:\\SCF2_XIN\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp1\\wtpwebapps\\SCFWeb\\script","");
		
		logger.debug(buff);
	}
	*/	
}