package com.ut.scf.core.component.query;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Component;

import com.comm.pojo.core.Menu;
import com.comm.pojo.core.MenuItem;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.string.StringUtil;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.entity.ApSessionContext;
import com.ut.scf.core.utils.ApSessionUtil;
import com.ut.comm.xml.logicflow.LogicNode;
import com.ut.comm.xml.query.QueryNode;
import com.ut.scf.dao.IDaoHelper;

@Component("queryProductMenu")
public class QueryProductMenuImpl implements IQueryComponent{
	@Resource(name = "daoHelper")
	protected IDaoHelper daoHelper;
	@Resource(name = "queryFactory")
	IQueryFactory queryFactory ;	
	
	@Override
	public FuncDataObj queryData(FuncDataObj logicObj) {

		QueryNode node = new QueryNode();
		JSONObject dataDom = (JSONObject) logicObj.getReqData();
		JSONObject trxDom = JsonHelper.getTrxObject(dataDom, "trxDom");
		String productId = trxDom.getString("productId");
		String sql = "select b from StdMenuInfo  b , StdProductPromission a  where a.perId = b.menuId and a.productId = ? ";
		node.setParams(productId);
		node.setSql(sql);
		node.setType(LogicNode.LOGIC_TYPE_SQL);
		FuncDataObj dataObj = logicObj.clone();

		FuncDataObj retObj = queryMenu(node, dataObj);
		return retObj;
	}
	
	private FuncDataObj queryMenu(QueryNode node, FuncDataObj dataObj) {
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
					item.setIsparent(mod.get("isparent").toString());
					item.setPath(mod.get("menuName").toString());
					if("Y".equals(mod.get("isparent").toString())){
						item.setState("closed");
					}
					menu.addItem(item);
				}
				List<MenuItem> item  =  menu.getMenu();
				retObj.buildRespose(item);
			}
		}
		return retObj;
	}	
}