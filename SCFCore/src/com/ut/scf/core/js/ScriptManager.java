package com.ut.scf.core.js;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import org.mozilla.javascript.Context;
import org.mozilla.javascript.ContextAction;
import org.mozilla.javascript.ContextFactory;
import org.mozilla.javascript.ImporterTopLevel;
import org.mozilla.javascript.Script;
import org.mozilla.javascript.Scriptable;


public class ScriptManager
{
	/**
	 * script
	 */
	private Scriptable global = null;
	
	/**
	 * Script Bean Name, just like DV,STP etc.
	 */
	private String beanName;
	
	/**
	 * Initial Script Manager
	 * 
	 * @param beanName
	 * @param beanObject
	 */
	public ScriptManager(final String beanName, final Object beanObject)
	{
		this.beanName = beanName;
		ContextFactory.getGlobal().call(new ContextAction()
		{
			public Object run(Context cx)
			{
				global = new ImporterTopLevel(cx);
				Scriptable wrapped = Context.toObject(beanObject, global);
				global.put(beanName, global, wrapped);
				return null;
			}
		});
	}
	
	/**
	 * Execute script with compiled class
	 * 
	 * @param script
	 */
	public Object exec(final Script script)
	{
		Object o = ContextFactory.getGlobal().call(new ContextAction()
		{
			public Object run(Context cx)
			{
				return script.exec(cx, global);
			}
		});
		return o;
		
	}
	
	/**
	 * Execute script with js content
	 * 
	 * @param scriptStr
	 */
	public Object exec(final String scriptStr)
	{
		Object o = ContextFactory.getGlobal().call(new ContextAction()
		{
			public Object run(Context cx)
			{
				return cx.evaluateString(global, scriptStr, null, 0, null);
			}
		});
		return o;
	}
	
	/**
	 * Execute script with js file
	 * 
	 * @param scriptFile
	 * @throws IOException
	 */
	public void exec(File scriptFile) throws IOException
	{
//		FileReader in = new FileReader(scriptFile);
//		StringBuffer strBuf = new StringBuffer("");
//		char[] buf = new char[2048];
//		int length = -1;
//		while ((length = in.read(buf)) != -1)
//		{
//			strBuf.append(buf, 0, length);
//		}
//		String scriptStr = strBuf.toString();
//		List<String> lines = new ArrayList<String>();
		BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(scriptFile),"UTF-8"));
		StringBuffer scriptStr = new StringBuffer();
		String line = null;
		String lineSeparator = System.getProperty("line.separator", "\n");
		while((line = br.readLine())!=null){
//			lines.add(line);
			scriptStr.append(line);
			scriptStr.append(lineSeparator);
			
		}
		br.close();
//		in.close();
//		in = null;
//		strBuf = null;
//		String scriptStr = lines.toString();
		exec(scriptStr.toString());
	}
	
	/**
	 * Destroy bean
	 */
	public void destroyBean()
	{
		global.delete(this.beanName);
	}
}
