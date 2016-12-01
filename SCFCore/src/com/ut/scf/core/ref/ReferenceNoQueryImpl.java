package com.ut.scf.core.ref;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import net.sf.json.JSONObject;

import com.ut.comm.tool.ErrorUtil;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.xml.ref.RefPara;
import com.ut.scf.core.component.query.IQueryComponent;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.log.APLogUtil;

@Service("trxRefNo")
public class ReferenceNoQueryImpl implements IQueryComponent{

	@Resource(name="refNoManager")  
	IReferenceNo refNoManager;
	
	@Override
	public FuncDataObj queryData(FuncDataObj logicObj) {
		try {
			JSONObject trxDom =JsonHelper.getTrxObject(logicObj.getReqData());
			RefPara p = new RefPara();
			p.setRefname(trxDom.getString("refName"));
			p.setReffield(trxDom.getString("refField"));
			logicObj.setReqParaObj(p);
			return (FuncDataObj) refNoManager.generateNo(logicObj);
		} catch (Exception e) {
			APLogUtil.getUserErrorLogger().error(ErrorUtil.getErrorStackTrace(e));
			return null;
		}
	}

}
