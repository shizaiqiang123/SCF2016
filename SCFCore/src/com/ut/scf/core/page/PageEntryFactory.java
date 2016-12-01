package com.ut.scf.core.page;

import java.util.ArrayList;
import java.util.List;

import org.springframework.util.Assert;

import net.sf.json.JSONObject;

import com.ut.scf.core.component.IGetPage;
import com.ut.scf.core.utils.ClassLoadHelper;

public class PageEntryFactory {
	
	private static List<String> registedPageProcessor = new ArrayList<String>();
	static{
		registedPageProcessor.add("workflowEntry");
		registedPageProcessor.add("customerEntry");
		
		//regist other processor here
		
		registedPageProcessor.add("transactionEntry");
		
	}
	
	public static IGetPage getPageProcessor(JSONObject dataDom){
		for (String string : registedPageProcessor) {
			AbsPageEntry entry;
			try {
				entry = ClassLoadHelper.getComponentClass(string);
				if(entry!=null&&entry.checkPageEntry(dataDom)){
					return entry;
				}
			} catch (ClassNotFoundException e) {
				e.printStackTrace();
			}
		}
		Assert.isTrue(false, "No Page Processor match current request.");
		return null;
	}
}
