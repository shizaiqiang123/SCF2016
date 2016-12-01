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
import com.ut.comm.xml.logicflow.LogicNode;
import com.ut.comm.xml.query.QueryNode;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.entity.ApSessionContext;
import com.ut.scf.core.utils.ApSessionUtil;
import com.ut.scf.dao.IDaoHelper;
/**
 * @see 根据class 配置，实现自定义的查询
 * @author PanHao
 *
 */
@Component("queryPerMenu")
public class QueryPerMenuImpl implements IQueryComponent{
	@Resource(name = "daoHelper")
	protected IDaoHelper daoHelper;
	@Resource(name = "queryFactory")
	IQueryFactory queryFactory ;	
	
	@Override
	public FuncDataObj queryData(FuncDataObj logicObj) {		
		QueryNode node  = new QueryNode();
		ApSessionContext context = ApSessionUtil.getContext();
		String sysBusiUnit= context.getSysBusiUnit();
		String  sql ="select m from StdMenuInfo m order by m.menuNum, m.menuId";
		if(StringUtil.isTrimNotEmpty(sysBusiUnit)){
			sql = "select m from StdMenuInfo m where m.menuId in "
					+ "( select menuId from StdPermissionMenu where perId "
					+ "in ( select  p.sysRefNo from StdPermissionInfo p, UserInfoM u "
					+ "where (p.sysBusiUnit = u.busiUnit or u.busiUnit is null) "
					+ "and u.sysRefNo = ?)) order by m.menuNum, m.menuId";
			JSONObject userinfo = JsonHelper.getUserObject(logicObj.getReqData());
			String userId = (String)userinfo.get("sysUserRef");
			node.setParams(userId);			
		}
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