package com.ut.scf.core.conf;

import java.io.File;
import java.io.IOException;

import org.w3c.dom.Document;
import org.xml.sax.SAXException;

import com.ut.comm.tool.consts.ASPathConst;
import com.ut.comm.tool.xml.XMLManager;

public abstract class AbsConfigBean implements IConfig{
	public final String input_dir = ASPathConst.getUserDirPath();
	
	public final String output_dir = ASPathConst.getUserOutputPath();
	
	public abstract String getConfigFileName();
	
	public Document parseConfigFile() throws SAXException, IOException{
		File f = new File(getConfigFileName());
		if(!f.exists()){
			return null;
		}
		return XMLManager.xmlFileToDom(getConfigFileName());
	}
}
