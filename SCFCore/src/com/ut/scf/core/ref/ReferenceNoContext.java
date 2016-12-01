package com.ut.scf.core.ref;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.util.Assert;

import com.ut.comm.tool.string.StringUtil;

public class ReferenceNoContext {
//	private static ThreadLocal<ConcurrentHashMap<String,List<String>>> local = new ThreadLocal<ConcurrentHashMap<String,List<String>>>();
	
	private static ConcurrentHashMap<String,ConcurrentHashMap<String,List<String>>> local = new ConcurrentHashMap<String,ConcurrentHashMap<String,List<String>>>();
	public static void addRefNo(RefEntity ref){
		Assert.isTrue(StringUtil.isTrimNotEmpty(ref.get_key()), "Generate reference number key canot be empty.");
		ConcurrentHashMap<String,List<String>> map =local.get(ref.get_key());
		if(map!=null){
			if(map.containsKey(ref.getRefName())){
				map.get(ref.getRefName()).add(ref.getRefNo());
			}else{
				List<String> refList = new ArrayList<String>();
				refList.add(ref.getRefNo());
				map.put(ref.getRefName(), refList);
			}
		}else{
			ConcurrentHashMap<String,List<String>> currentMap = new ConcurrentHashMap<String,List<String>>();
			local.put(ref.get_key(),currentMap);
			addRefNo(ref);
		}
	}
	
	public static void deleteRefNo(RefEntity ref){
		ConcurrentHashMap<String,List<String>> map = local.get(ref.get_key());
		if(map!=null){
			if(StringUtil.isTrimNotEmpty(ref.getRefName())&&map.containsKey(ref.getRefName())){
				map.get(ref.getRefName()).remove(ref.getRefNo());
			}else{
//				Object[] keys = map.keySet().toArray();
//				for (int i = 0; i < keys.length; i++) {
//					String key = keys[i].toString();
//					List<String> refList = map.get(key);
//					RefEntity newRef = new RefEntity(key, "", ref.get_key());
//					for (String string : refList) {
//						newRef.setRefNo(string);
//						deleteRefNo(newRef);
//					}
//				}
			}
		}else{
			
		}
	}
	
	public static Map<String,List<String>> getAllRef(RefEntity ref){
		Assert.isTrue(StringUtil.isTrimNotEmpty(ref.get_key()), "Get reference number key canot be empty.");
		ConcurrentHashMap<String,List<String>> map =local.get(ref.get_key());
		return map;
	}
	
	public static List<String> getRef(RefEntity ref){
		Assert.isTrue(StringUtil.isTrimNotEmpty(ref.get_key()), "Get reference number key canot be empty.");
		ConcurrentHashMap<String,List<String>> map =local.get(ref.get_key());
		if(map!=null&&map.containsKey(ref.getRefName())){
			List<String> retList= new ArrayList<String>();
			for (String string : map.get(ref.getRefName())) {
				retList.add(string);
			}
			return retList;
		}else{
			return new ArrayList<String>();
		}
	}
	
	public static void initlize(){
		local.clear();
	}
	
	public static void disponse(){
		local.clear();
	}
	
}
