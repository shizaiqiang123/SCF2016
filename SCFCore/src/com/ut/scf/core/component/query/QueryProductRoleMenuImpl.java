package com.ut.scf.core.component.query;

import java.util.HashMap;
import java.util.LinkedList;
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
import com.ut.scf.orm.std.StdOrgInfo;
/**
 * 
 * @author yhy
 *
 */
@Component("queryProductRoleMenu")
public class QueryProductRoleMenuImpl implements IQueryComponent{
	@Resource(name = "daoHelper")
	protected IDaoHelper daoHelper;
	@Resource(name = "queryFactory")
	IQueryFactory queryFactory ;	
	
	@Override
	public FuncDataObj queryData(FuncDataObj queryObj) {		
		QueryNode node  = new QueryNode();
		ApSessionContext context = ApSessionUtil.getContext();
		JSONObject dataDom = queryObj.getReqData();
//		JSONObject trxDom = JsonHelper.getTrxObject(dataDom);
//		String busiUnit= trxDom.getString("busiUnit");
		String sysBusiUnit=context.getSysBusiUnit();
		String  sql ="";
		JSONObject userInfo = JsonHelper.getUserObject(dataDom);
		String userMaxRole = userInfo.getString("sysUserRole");
		userMaxRole+=":typejava.lang.Integer";
//		if(StringUtil.isTrimNotEmpty(sysBusiUnit)){
////			sql = "select m from StdRoleInfo m where  m.roleType =0 or (m.roleType = 3 and m.productId = "
////					+ "(select fp.productId from FactorProduct fp where fp.factorId=? )))";		
//			sql = "select m from StdRoleInfo m where  m.roleType < ?";		
//			node.setParams(userMaxRole);		
//		}
//		else
//		{
//			sql ="select m from StdRoleInfo m where m.roleType < 6";
//		}
		if(userInfo.getString("sysUserTp")!=null){
			sql = "select m from StdRoleInfo m where  m.roleType < ? and m.roleLevel = ? and m.roleLevel<>7";
//			node.setParams(userMaxRole);	
//			node.setParams(userInfo.getString("sysUserTp"));
			node.setParams(userMaxRole+","+userInfo.getString("sysUserTp"));
		}else{
			sql="select  m from StdRoleInfo m where  m.roleType < ? and m.roleLevel<>7";
			node.setParams(userMaxRole);	
		}
		node.setSql(sql);
		node.setType("S");
		IQueryComponent process =queryFactory.getProcessor(node);
		queryObj.setReqParaObj(node);
		FuncDataObj processResult=process.queryData(queryObj);
		daoHelper.execQuery(processResult);
		FuncDataObj retObj = new FuncDataObj();
		List<Map> obj =  (List<Map>) processResult.get(processResult.getDoName());
//		for(int i=0;i<obj.size();i++){
//			String sysRefNo=obj.get(i).containsKey("sysRefNo")?obj.get(i).get("sysRefNo").toString():"";
//			if(!"R00001".equalsIgnoreCase(sysRefNo)){
//				continue;
//			}
//			if(i=obj.size()+1){
				
//			}
//		}
		obj.add(getDefaultRole(queryObj));
		retObj.buildRespose(obj);
		return retObj;
		
	}	
	/*
	 * 在查询保理商角色时，出现两次默认角色，所以删除
	 * 在查询时添加rolelevel=？条件默认角色消失
	 */
	public Map getDefaultRole(FuncDataObj queryObj){
		QueryNode node  = new QueryNode();
		String sql="select m from StdRoleInfo m where m.roleType='0'";
		node.setSql(sql);
		node.setType("S");
		IQueryComponent process =queryFactory.getProcessor(node);
		queryObj.setReqParaObj(node);
		FuncDataObj processResult=process.queryData(queryObj);
		daoHelper.execQuery(processResult);
		FuncDataObj retObj = new FuncDataObj();
		List<Map> obj =  (List<Map>) processResult.get(processResult.getDoName());
		if(obj.size()==1){
			return obj.get(0);
		}
		return null;
	}
	
}