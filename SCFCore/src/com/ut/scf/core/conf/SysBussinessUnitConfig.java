package com.ut.scf.core.conf;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.xml.sax.SAXException;

import com.ut.comm.tool.xml.XMLManager;

@Component("buConfig")
public class SysBussinessUnitConfig extends AbsConfigBean{
	
	private static List<String> buList = new ArrayList<String>();
	
	private static String defaultBu = "";
	
	private final String CONFIG_NAME = "bu";

	@Override
	public void initilize() {
		try {
			Document buConfigFile = super.parseConfigFile();
			if(buConfigFile==null){
				return;
			}
			Element[]  buNoList = XMLManager.getChildElementByTagName(buConfigFile.getDocumentElement(), CONFIG_NAME);
			for (Element element : buNoList) {
				String buName = XMLManager.getNodeValue(element, true);
				if(element.hasAttribute("defalut"))
					defaultBu = buName;
				buList.add(buName);
			}
			
		} catch (SAXException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}

	@Override
	public void destory() {
		buList.clear();
	}

	@Override
	public String getConfigFileName() {
		return super.input_dir+File.separator+"syst"+File.separator+"Bu_Config.xml";
	}

	public static String getDefaultBu() {
		return defaultBu;
	}
	
	public static List<String> getBuList(){
		return buList;
	}

}
