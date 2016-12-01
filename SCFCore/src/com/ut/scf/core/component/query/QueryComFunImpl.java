package com.ut.scf.core.component.query;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Component;

import com.comm.pojo.Page;
import com.comm.pojo.core.Menu;
import com.comm.pojo.core.MenuItem;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.logicflow.LogicNode;
import com.ut.comm.xml.query.QueryNode;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.dao.IDaoHelper;

@Component("queryComf")
public class QueryComFunImpl implements IQueryComponent{
	@Resource(name = "queryFactory")
	IQueryFactory queryFactory ;
	@Resource(name = "daoHelper")
	protected IDaoHelper daoHelper;
	private List<Map> list;
	@Override
	public FuncDataObj queryData(FuncDataObj logicObj) {
		// TODO Auto-generated method stub
		
		QueryNode queryNode =new QueryNode();
		JSONObject reqData=logicObj.getReqData();
		JSONObject userInfo=JsonHelper.getUserObject(reqData);
		JSONObject trxDom=JsonHelper.getTrxObject(reqData);
		String searchId=trxDom.containsKey("searchId")?trxDom.getString("searchId"):"";
		String searchNm=trxDom.containsKey("searchNm")?trxDom.getString("searchNm"):"";
		String userFunType=trxDom.containsKey("userFunType")?trxDom.getString("userFunType"):"";
		Object userId=userInfo.get("sysUserId");
		String sql="";
		if("1".equalsIgnoreCase(userFunType)){
			sql="select cf from ComFun cf where cf.funId in("+
					"select m.menuId from StdMenuInfo m where m.menuId in "
					+ " ( select  rm.menuId from StdRoleMenu rm where rm.roleId in "
					+ " ( select  ur.roleId from UserRoleInfo ur where ur.userId in " +
					" (select ui.sysRefNo from UserInfoM ui where ui.userId=?  )))) ";
		}else if("2".equalsIgnoreCase(userFunType)){
			sql="select cf from ComBusiMsg cf where cf.funId in("+
					"select m.menuId from StdMenuInfo m where m.menuId in "
					+ " ( select  rm.menuId from StdRoleMenu rm where rm.roleId in "
					+ " ( select  ur.roleId from UserRoleInfo ur where ur.userId in " +
					" (select ui.sysRefNo from UserInfoM ui where ui.userId=?  )))) ";
		}
		
		String params=userId.toString();
//		queryallMenu(params,logicObj);
		if(!"".equalsIgnoreCase(searchId)){
			sql+= " and cf.funId like ?";
			params=params+",%"+searchId+"%";
		}
		if(!"".equalsIgnoreCase(searchNm)){
			sql+=" and cf.funTitle like ?";
			params=params+",%"+searchNm+"%";
		}	
		sql += " order by cf.funId";
		queryNode.setSql(sql);
		queryNode.setType(LogicNode.LOGIC_TYPE_SQL);
		queryNode.setParams(params);
		
//		FuncDataObj funcDataObj=new FuncDataObj();
		FuncDataObj dataObj = logicObj.clone();
		FuncDataObj retObj = queryMenu(queryNode, dataObj);	
		return retObj;
	}
//	private void queryallMenu(String parames,FuncDataObj dataObj){
//		QueryNode queryNode =new QueryNode();
//		String sql="select m from StdMenuInfo m where m.menuId in "
//				+ " ( select  rm.menuId from StdRoleMenu rm where rm.roleId in "
//				+ " ( select  ur.roleId from UserRoleInfo ur where ur.userId in " +
//				" (select ui.sysRefNo from UserInfoM ui where ui.userId=?  ))) ";
//		queryNode.setSql(sql);
//		queryNode.setParams(parames);
//		queryNode.setType(LogicNode.LOGIC_TYPE_SQL);
////		FuncDataObj dataObj=new FuncDataObj();
//		IQueryComponent process =queryFactory.getProcessor(queryNode);
//		dataObj.setReqParaObj(queryNode);
//		FuncDataObj processResult=process.queryData(dataObj);
//		daoHelper.execQuery(processResult);
//		FuncDataObj retObj = new FuncDataObj();
//		if(processResult.hasRecord()){
//			list = (List<Map>) processResult.get(processResult.getDoName());
//			}
//	}
	private FuncDataObj queryMenu(QueryNode node, FuncDataObj dataObj) {
		IQueryComponent process =queryFactory.getProcessor(node);
		dataObj.setReqParaObj(node);
		FuncDataObj processResult=process.queryData(dataObj);
		JSONObject jsonObject=dataObj.getReqData();
		JSONObject jsonDom=JsonHelper.getTrxObject(jsonObject);
		daoHelper.execQuery(processResult);
		FuncDataObj retObj = new FuncDataObj();
	//	if(processResult.hasRecord()){
			List<Map> obj =  (List<Map>) processResult.get(processResult.getDoName());
			String strPage = jsonDom.containsKey("page") ? jsonDom
					.getString("page") : "";
			String strRows = jsonDom.containsKey("rows") ? jsonDom
					.getString("rows") : "";
			if (StringUtil.isTrimNotEmpty(strPage)
					&& StringUtil.isTrimNotEmpty(strRows)) {
				int page = Integer.parseInt(strPage);
				int rows = Integer.parseInt(strRows);
				Page p = new Page(page, 0, rows, new ArrayList());
//				node.(p);
			}
//			System.out.println("aaaa");
//			if(!obj.isEmpty()){
//				for(Map mod:obj){
//					MenuItem first = new MenuItem();
//					String string = "";
//					if(mod.get("menuParentid")!=mod.get("userId")){
//						checkMenuParentid
//					}
//					string =checkMenuParentid(string,mod);
//					obj.set("menuPath", )
//					mod.put("menuPath", string);
//				}
//				System.out.println(obj);
//				int times=0;
//				for(int i=0;i<obj.size();i++){
//					
//					obj.remove(i);
//					
//				}
//				System.out.println(obj);
//				for(int i=obj.size()-1;i>=0;i--){
//					Map map = obj.get(i);
//					if(!map.get("menuId").toString().startsWith("F_")){
//						System.out.println(obj.get(i));
//						System.out.println(obj.get(i));
//						obj.remove(i);
//					}
//					times++;
//				}
//				System.out.println(obj);
//				for(Map map:obj){
//					System.out.println(map.get("menuPath"));
//				}
//			}
			retObj.buildRespose(obj);
//			if(!obj.isEmpty()){
//				Menu menu = new Menu();
//				for (Map mod:obj) {
// 					MenuItem first  = new MenuItem();
//					first.setId(mod.get("sysRefNo").toString()+mod.get("custNm").toString());
//					first.setText(mod.get("custNm").toString());
//					first.setIsparent("Y");
//					menu.addItem(first);
//					
//					MenuItem second  = new MenuItem();
//					second.setId(mod.get("rcustId").toString()+mod.get("rcustNm").toString());
//					second.setParentId(first.getId());
//					second.setText(mod.get("rcustNm").toString());
//					second.setIsparent("Y");
//					menu.addItem(second);
//					
//					MenuItem third  = new MenuItem();
//					third.setId(mod.get("sysRefNo").toString()+mod.get("theirRef").toString());
//					third.setParentId(second.getId());
//					third.setText(mod.get("theirRef").toString());
//					third.setIsparent("N");
//					menu.addItem(third);
//				}
//				List<MenuItem> item  =  menu.getMenu();
//				retObj.buildRespose(item);
//			}
	//	}
 		return retObj;
	}
//	private String checkMenuParentid(String string ,Map map){
//			if(!"".equalsIgnoreCase(string)){
//				string=">"+string;
//			}
//			string=map.get("menuName")+string;
//			Map parentidMap=queryParentid(map.get("menuName").toString());
////			string=parentidMap.get("menuName")+string;
//			if(!map.get("menuParentid").toString().equals(map.get("menuId").toString())){
//			string=checkMenuParentid(string,parentidMap);
//			}
//		return string;
//	}
//	private Map queryParentid(String menuId){
//		System.out.println("aaa");
//		for(Map map:list){
//			if(map.get("menuId").toString().equals(menuId)){
//				for(Map mapParent:list){
//					if(mapParent.get("menuId").toString().equalsIgnoreCase(map.get("menuParentid").toString())){
//						return mapParent;
//					}
//				}
//				
//			}
//		}
//		return null;
//	}
}
