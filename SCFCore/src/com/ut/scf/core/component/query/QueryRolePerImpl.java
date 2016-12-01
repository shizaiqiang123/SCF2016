package com.ut.scf.core.component.query;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.comm.pojo.core.Menu;
import com.comm.pojo.core.MenuItem;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.logicflow.LogicNode;
import com.ut.comm.xml.query.QueryNode;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.entity.ApSessionContext;
import com.ut.scf.core.utils.ApSessionUtil;
import com.ut.scf.dao.IDaoHelper;
import com.ut.scf.orm.std.StdPermissionInfo;
/**
 * @see 根据class 配置，实现自定义的查询
 * @author PanHao
 *
 */
@Component("queryRolePer")
public class QueryRolePerImpl implements IQueryComponent{
	@Resource(name = "daoHelper")
	protected IDaoHelper daoHelper;
	@Resource(name = "queryFactory")
	IQueryFactory queryFactory ;
	
	@Override
	public FuncDataObj queryData(FuncDataObj logicObj) {		
		String sql = "from StdPermissionInfo";
//		ApSessionContext context = ApSessionUtil.getContext();
//		String unitCode = context.getSysBusiUnit();
//		if(StringUtil.isNull(unitCode)){
//			sql = "from StdPermissionInfo";
//		}
		QueryNode node  = new QueryNode();
//		node.setParams(unitCode);
		node.setSql(sql);
		node.setType(LogicNode.LOGIC_TYPE_SQL);
		node.setBybu("true");
		IQueryComponent process =queryFactory.getProcessor(node);
		FuncDataObj dataObj = logicObj.clone();
		dataObj.setReqParaObj(node);
		FuncDataObj processResult=process.queryData(dataObj);
		
		daoHelper.execQuery(processResult);
		FuncDataObj retObj = new FuncDataObj();
		if(processResult.hasRecord()){
			List<Map> obj =  (List<Map>) processResult.get(processResult.getDoName());
//			List<StdPermissionInfo> obj =  (List<StdPermissionInfo>) daoHelper.execQuery(sql,unitCode);

			if(!obj.isEmpty()){			
				Menu menu = new Menu();
				for (Map per:obj) {
					MenuItem item  = new MenuItem();
					item.setId(per.get("sysRefNo").toString());				
					item.setText(per.get("perName").toString());				
					menu.addItem(item);
				}
				List<MenuItem> item  =  menu.getMenu();
				retObj.buildRespose(item);
			}
		}else{
			retObj.buildRespose();
		}
		return retObj;
//		List<StdPermissionInfo> obj =  (List<StdPermissionInfo>) daoHelper.execQuery(sql,unitCode);
//		FuncDataObj retObj = new FuncDataObj();
//		if(!obj.isEmpty()){			
//			Menu menu = new Menu();
//			for (StdPermissionInfo per:obj) {
//				MenuItem item  = new MenuItem();
//				item.setId(per.getSysRefNo());				
//				item.setText(per.getPerName());				
//				menu.addItem(item);
//			}
//			List<MenuItem> item  =  menu.getMenu();
//			retObj.buildRespose(item);
//		}
//		return retObj;
	}

}
