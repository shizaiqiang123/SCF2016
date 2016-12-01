package com.ut.scf.core.component.query;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Component;

import com.comm.pojo.core.Menu;
import com.comm.pojo.core.MenuItem;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.comm.xml.logicflow.LogicNode;
import com.ut.comm.xml.query.QueryNode;
import com.ut.scf.dao.IDaoHelper;


@Component("queryMenus")
public class QueryMenusImpl implements IQueryComponent{
	@Resource(name = "daoHelper")
	protected IDaoHelper daoHelper;
	@Resource(name = "queryFactory")
	IQueryFactory queryFactory ;	
	
	@Override
	public FuncDataObj queryData(FuncDataObj logicObj) {		
		QueryNode node = new QueryNode();
		JSONObject dataDom = (JSONObject) logicObj.getReqData();
		JSONObject aa = JsonHelper.getTrxObject(dataDom, "trxDom");
		String isparent = aa.getString("isparent");
		// String menuParentid = aa.getString("menuParentid");
		String sql = "";
		sql = "select a  from  StdMenuInfo  a  where a.isparent = ?";
		// where a.isparent = ?
		// node.setParams(isparent+","+menuParentid);
		node.setParams(isparent);
		node.setSql(sql);
		node.setType(LogicNode.LOGIC_TYPE_SQL);
		FuncDataObj dataObj = logicObj.clone();
		FuncDataObj retObj = queryMenus(node, dataObj);
		return retObj;
		
	}
	
	private FuncDataObj queryMenus(QueryNode node, FuncDataObj dataObj) {
		IQueryComponent process =queryFactory.getProcessor(node);
		dataObj.setReqParaObj(node);
		FuncDataObj processResult=process.queryData(dataObj);
		
		daoHelper.execQuery(processResult);
		FuncDataObj retObj = new FuncDataObj();
		if(processResult.hasRecord()){
			List<Map> obj =  (List<Map>) processResult.get(processResult.getDoName());
			if(!obj.isEmpty()){			
				Menu menu = new Menu();
				for (Map mod:obj) {
				
					MenuItem item  = new MenuItem();
					item.setId(mod.get("menuId").toString());
					item.setParentId(mod.get("menuParentid").toString());
					item.setText(mod.get("menuName").toString());	
//					if(!mod.get("menuId").equals(mod.get("menuParentid"))){
//						for(MenuItem menuList:menu.getMenu()){
//							if(menuList.getId().equals(mod.get("menuParentid"))){
//								menuList.setState("closed");
//							}
//						}
//					}
					//item.setIsparent(mod.get("isparent").toString());
					//item.setPath(mod.get("menuName").toString());
					menu.addItem(item);
				}
				List<MenuItem> item  =  menu.getMenu();
				retObj.buildRespose(item);
			}
		}
		return retObj;
	}	
}