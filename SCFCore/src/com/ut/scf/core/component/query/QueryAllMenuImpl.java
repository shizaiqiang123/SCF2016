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
import com.ut.scf.dao.IDaoHelper;
/**
 * @see 根据class 配置，实现自定义的查询
 * @author PanHao
 *
 */
@Component("queryAllMenu")
public class QueryAllMenuImpl implements IQueryComponent{
	@Resource(name = "daoHelper")
	protected IDaoHelper daoHelper;
	@Resource(name = "queryFactory")
	IQueryFactory queryFactory ;
	
	@Override
	public FuncDataObj queryData(FuncDataObj logicObj) {
		
		QueryNode node  = new QueryNode();
     		JSONObject trxInfo = JsonHelper.getTrxObject(logicObj.getReqData());
		String roleTp = trxInfo.containsKey("roleType")?trxInfo.getString("roleType"):"";
		String sql ="";
//		String sql = "select m from StdMenuInfo m where m.menuId in"
//				+ " ( select  menuId from StdPermissionMenu where perId in"
//				+ " ( select  rp.perId from StdRolePermission rp,UserInfoM u,StdRoleInfo r"
//				+ "   where r.sysRefNo = rp.roleId and r.roleId = u.roleId "
//				+ "and u.sysRefNo = ? )) order by m.menuNum, m.menuId";	
		
		if(StringUtil.isTrimEmpty(roleTp)){
			//产品维护功能
			//查询所有产品级菜单
			
			sql = "select a  from  StdMenuInfo  a  where a.menuTp = ?";
			roleTp = "40:typejava.lang.Integer";
			node.setParams(roleTp);
		}else{
			//角色维护功能
			//查询某产品下的菜单
			if(roleTp.equalsIgnoreCase("40")){
				String productId = trxInfo.containsKey("productId")?trxInfo.getString("productId"):"";
				if(StringUtil.isTrimEmpty(productId)){
					sql = "select a  from  StdMenuInfo  a  where a.menuTp = ?";
					String productTp = "40:typejava.lang.Integer";
					node.setParams(productTp);
				}else{
					sql = "select a  from  StdMenuInfo  a  where a.menuId in(select perId from StdProductPromission where productId = ?)";
					node.setParams(productId);
				}
			}else{
				
				sql = "select a  from  StdMenuInfo  a  where menuTp <= ?";
				roleTp+=":typejava.lang.Integer";
				node.setParams(roleTp);
			}
		
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
