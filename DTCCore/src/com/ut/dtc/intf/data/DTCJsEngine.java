package com.ut.dtc.intf.data;

import java.io.File;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.ut.comm.tool.string.StringUtil;
import com.ut.scf.core.js.ServerSideJsImpl;

@Service("dtcJs")
@Scope("prototype")
public class DTCJsEngine extends ServerSideJsImpl{
	public DTCJsEngine(){
	   super();    
	}
	
	@Override
	public void executeJsFile(String fileName) throws Exception{
		if (StringUtil.isTrimEmpty(fileName))
			return;
		File scriptFile = new File(getJsFilePath("dtc", fileName));
		super.executeJsFile(scriptFile.getPath());
	}
	
	public void testDTC(){
		System.out.println("dtc js test success...");
	}
}
