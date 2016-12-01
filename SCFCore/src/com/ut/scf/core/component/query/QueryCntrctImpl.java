package com.ut.scf.core.component.query;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Component;

import com.comm.pojo.core.Menu;
import com.comm.pojo.core.MenuItem;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.xml.logicflow.LogicNode;
import com.ut.comm.xml.query.QueryNode;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.dao.IDaoHelper;
/**
 * @see 根据class 配置，实现自定义的查询
 * @author PanHao
 *
 */
@Component("queryCntrct")
public class QueryCntrctImpl implements IQueryComponent{
	@Resource(name = "daoHelper")
	protected IDaoHelper daoHelper;
	@Resource(name = "queryFactory")
	IQueryFactory queryFactory ;
	
	@Override
	public FuncDataObj queryData(FuncDataObj logicObj) {
		
		QueryNode node  = new QueryNode();
		JSONObject trxInfo = JsonHelper.getTrxObject(logicObj.getReqData());
		String sysRefNo = trxInfo.getString("sysRefNo");
		node.setParams(sysRefNo);
		String sql = "select e from CntrctE e where e.id.sysRefNo=? and e.theirRef <> '' and sysTrxSts = 'M'";
		
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
 					MenuItem first  = new MenuItem();
					first.setId(mod.get("sysRefNo").toString()+mod.get("selId").toString());
					first.setText(mod.get("selNm").toString());
					first.setIsparent("Y");
					menu.addItem(first);
					
					MenuItem second  = new MenuItem();
					second.setId(mod.get("rcustId").toString()+mod.get("rcustNm").toString());
					second.setParentId(first.getId());
					second.setText(mod.get("rcustNm").toString());
					second.setIsparent("Y");
					menu.addItem(second);
					
					MenuItem third  = new MenuItem();
					third.setId(mod.get("sysRefNo").toString()+mod.get("theirRef").toString());
					third.setParentId(second.getId());
					third.setText(mod.get("theirRef").toString());
					third.setIsparent("N");
					menu.addItem(third);
				}
				List<MenuItem> item  =  menu.getMenu();
				retObj.buildRespose(item);
			}
		}
		return retObj;
	}
}
