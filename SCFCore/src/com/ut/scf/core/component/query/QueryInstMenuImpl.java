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
import com.ut.comm.tool.string.StringUtil;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.entity.ApSessionContext;
import com.ut.scf.core.utils.ApSessionUtil;
import com.ut.comm.xml.logicflow.LogicNode;
import com.ut.comm.xml.query.QueryNode;
import com.ut.scf.dao.IDaoHelper;
import com.ut.scf.orm.std.OrgInfoM;
/**
 * 
 *
 */
@Component("queryInstMenu")
public class QueryInstMenuImpl implements IQueryComponent{
	@Resource(name = "daoHelper")
	protected IDaoHelper daoHelper;
	@Resource(name = "queryFactory")
	IQueryFactory queryFactory ;	
	
	@Override
	public FuncDataObj queryData(FuncDataObj logicObj) {	
		QueryNode node  = new QueryNode();
		ApSessionContext context = ApSessionUtil.getContext();
		JSONObject dataDom = logicObj.getReqData();
		JSONObject trxDom = JsonHelper.getTrxObject(dataDom);
		JSONObject userDom=JsonHelper.getUserObject(dataDom);
		String sysOrgId = (String) userDom.get("sysUserOrgId");
		String blgOrgTp = (String) trxDom.get("blgOrgTp");
		String  sql ="";
		if( "all".equals(trxDom.getString("rowsTp").toString())){
			sql = "select m from OrgInfoM m where m.orgId like ?";	
		}else{
			sql = "select m from OrgInfoM m where m.sysLockFlag='F' and m.sysTrxSts='M'";	
//			sql = "select m from OrgInfoM m where m.sysLockFlag='F' and m.sysTrxSts='M' and m.orgId like ?";	
		}
		JSONObject userinfo = JsonHelper.getUserObject(logicObj.getReqData());
		node.setSql(sql);
//		node.setParams(sysOrgId+"%");
		node.setType(LogicNode.LOGIC_TYPE_SQL);
		FuncDataObj dataObj = logicObj.clone();
		
		FuncDataObj retObj = new FuncDataObj();
		if( "all".equals(trxDom.getString("rowsTp").toString())){
			retObj = queryMenu(node, dataObj);		
		}else{
			retObj = queryMenu(node, dataObj,sysOrgId,blgOrgTp);		
		}
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
					item.setId(mod.get("orgId").toString());
					Object blgOrgid = mod.get("blgOrgid");
					if(blgOrgid==null||StringUtil.isNull(blgOrgid.toString())){
						item.setParentId("");
					}else{
						item.setParentId(blgOrgid.toString());
					}
					item.setText(mod.get("orgNm").toString());
					menu.addItem(item);
				}
				List<MenuItem> item  =  menu.getMenu();
				retObj.buildRespose(item);
			}
		}
		return retObj;
	}	
	private FuncDataObj queryMenu(QueryNode node, FuncDataObj dataObj,String sysOrgId,String blgOrgTp) {
		IQueryComponent process =queryFactory.getProcessor(node);
		dataObj.setReqParaObj(node);
		FuncDataObj processResult=process.queryData(dataObj);
		
		daoHelper.execQuery(processResult);
		FuncDataObj retObj = new FuncDataObj();
		if(processResult.hasRecord()){
			List<Map> obj =  (List<Map>) processResult.get(processResult.getDoName());
			
			//查询上层
			if( !"N".equalsIgnoreCase(blgOrgTp)){
				
				String sysBlgOrgid = "";
				for( int i=0,l=obj.size();i<l;i++){
					if( obj.get(i).get("orgId").toString().equals(sysOrgId) ){
						Map objMap = obj.get(i);
						if( objMap.containsKey("blgOrgid") || null!=objMap.get("blgOrgid") || (! objMap.get("blgOrgid").toString().equals(sysOrgId))){
							sysBlgOrgid =  obj.get(i).get("blgOrgid").toString();
						}
						break;
					}
				}
				if( StringUtil.isNotEmpty(sysBlgOrgid)){
					List  blgOrgidList =  queryBlgOrgid(sysBlgOrgid);
					if(blgOrgidList.size() >0){
						List objC = (List) processResult.get(processResult.getDoName());
						objC.add(blgOrgidList.get(0));
						obj = (List<Map>)objC;
					}
				}
			}
			if(!obj.isEmpty()){
				Menu menu = new Menu();
				for (Map mod:obj) {
					MenuItem item  = new MenuItem();
					item.setId(mod.get("orgId").toString());
					Object blgOrgid = mod.get("blgOrgid");
					if(blgOrgid==null||StringUtil.isNull(blgOrgid.toString())){
						item.setParentId("");
					}else{
						item.setParentId(blgOrgid.toString());
					}
					item.setText(mod.get("orgNm").toString());
					menu.addItem(item);
				}
				List<MenuItem> item  =  menu.getMenu();
				retObj.buildRespose(item);
			}
		}
		return retObj;
	}	
	
	private List queryBlgOrgid(String blgOrgid) {
		JSONObject reqData = JsonHelper.createReqJson();
		JSONObject trxData = JsonHelper.getTrxObject(reqData);
		FuncDataObj dataObj = new FuncDataObj();
		QueryNode node = new QueryNode();
		dataObj.setReqData(trxData);
		String sql = "";
		sql = "select  o from  OrgInfoM  o  where  o.orgId=? ";
		node.setParams( blgOrgid+":typejava.lang.String");
		node.setSql(sql);
		node.setType(LogicNode.LOGIC_TYPE_SQL);

		IQueryComponent process = queryFactory.getProcessor(node);
		dataObj.setReqParaObj(node);
		FuncDataObj processResult = process.queryData(dataObj);

		daoHelper.execQuery(processResult);
		List queryList=new ArrayList<>();
		if (processResult.hasRecord()) {
			queryList=(List) processResult.get("data");
		}
		return queryList;
	}
}