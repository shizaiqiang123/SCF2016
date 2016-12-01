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
@Component("queryMenu")
public class QueryMenuImpl implements IQueryComponent{
	@Resource(name = "daoHelper")
	protected IDaoHelper daoHelper;
	@Resource(name = "queryFactory")
	IQueryFactory queryFactory ;
	
	@Override
	public FuncDataObj queryData(FuncDataObj logicObj) {
		
		QueryNode node  = new QueryNode();
		JSONObject userinfo = JsonHelper.getUserObject(logicObj.getReqData());
		Object userId =userinfo.get("sysUserRef");
		String sql ="";
		if(userId==null){
			node.setParams("ROLE000058");
			sql = "select m from StdMenuInfo m where m.menuId in"
					+ " ( select  rm.menuId from StdRoleMenu rm where rm.roleId=?) order by m.menuNum, m.menuId";
		}else{
			String strUserId = userId.toString();
			if(StringUtil.isNull(strUserId)){
				node.setParams("ROLE000058");
				sql = "select m from StdMenuInfo m where m.menuId in"
						+ " ( select  rm.menuId from StdRoleMenu rm where rm.roleId=?) order by m.menuNum, m.menuId";
			}else{
				node.setParams(userId.toString());
				sql = "select m from StdMenuInfo m where m.menuId in"
						+ " ( select  rm.menuId from StdRoleMenu rm where rm.roleId in"
						+ " ( select  ur.roleId from UserRoleInfo ur where ur.userId =?)) order by m.menuNum, m.menuId";
			}
		}
//		String sql =" select m from StdMenuInfo m ,"
//			+ " StdPermissionMenu pm ,StdPermissionInfo p,"
//			+ " StdRolePermission rp, StdRoleInfo r,UserInfoM u "
//			+ " where m.menuId = pm.menuId"
//			+ " and pm.perId = p.sysRefNo"
//			+ " and p.sysRefNo = rp.perId"
//			+ " and rp.roleId = r.sysRefNo"
//			+ " and r.roleId = u.roleId"
//			+ " and u.userId = ? order by m.menuNum, m.menuId";
		
//		String sql = "select m from StdMenuInfo m where m.menuId in"
//				+ " ( select  menuId from StdPermissionMenu where perId in"
//				+ " ( select  rp.perId from StdRolePermission rp,UserInfoM u,StdRoleInfo r"
//				+ "   where r.sysRefNo = rp.roleId and r.roleId = u.roleId "
//				+ "and u.sysRefNo = ? )) order by m.menuNum, m.menuId";
		
		/*sql = "select m from StdMenuInfo m where m.menuId in"
				+ " ( select  rm.menuId from StdRoleMenu rm where rm.roleId in"
				+ " ( select  ur.roleId from UserRoleInfo ur where ur.userId =?)) order by m.menuNum, m.menuId";
*/
		

//SELECT * FROM std_menu_info M where M.MENU_ID in 
//(SELECT RM.MENU_ID from std_role_menu RM WHERE RM.role_id IN(
//SELECT UR.role_id from user_role_info UR WHERE UR.user_id IN(
//select U.SYS_REF_NO FROM user_info_m U where U.user_ID =?)));
		/*if("super_admin".equals(userId)){
			 sql ="select m from StdMenuInfo m order by m.menuId";
			 node.setParams(null);
		}*/		
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
					if(mod.get("menuImage")!=null){
						String menuImage=mod.containsKey("menuImage")?mod.get("menuImage").toString():"";
						item.setMenuImage(menuImage);
					}
					Object menuDisplayNm = mod.get("menuDisplayNm");
					if (menuDisplayNm==null || StringUtil.isNull(menuDisplayNm.toString())) {
						item.setText(mod.get("menuName").toString());
						item.setPath(mod.get("menuName").toString());
					} else {
						item.setText(mod.get("menuDisplayNm").toString());	
						item.setPath(mod.get("menuDisplayNm").toString());
					}
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
