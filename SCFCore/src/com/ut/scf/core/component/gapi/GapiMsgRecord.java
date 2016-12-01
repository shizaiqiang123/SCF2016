package com.ut.scf.core.component.gapi;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.ut.scf.core.component.ILogicComponent;
import com.ut.scf.core.component.gapi.GapiMsgServer;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.dao.IDaoHelper;

@Component("gapiMsgRecord")
public class GapiMsgRecord implements ILogicComponent {
	@Resource(name = "daoHelper")
	protected IDaoHelper daoHelper;

	@Resource(name = "gapiMsgServer")
	GapiMsgServer service;

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.ut.scf.core.component.ILogicComponent#postData(com.ut.scf.core.data
	 * .FuncDataObj)
	 */
	@Override
	public FuncDataObj postData(FuncDataObj logicObj) throws Exception {
		FuncDataObj logicDataObj = service.postData(logicObj);
		service.requestGapiMsg(logicDataObj);
		return null;
	}

	@Override
	public FuncDataObj inqData(FuncDataObj logicObj) throws Exception {
		// TODO Auto-generated method stub
		System.out.println("inqudata");
		return null;
	}

	@Override
	public FuncDataObj releaseData(FuncDataObj logicObj) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public FuncDataObj postPendingData(FuncDataObj logicObj) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public FuncDataObj postReleaseData(FuncDataObj logicObj) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public FuncDataObj postMasterData(FuncDataObj logicObj) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public FuncDataObj postDeletePendingData(FuncDataObj logicObj)
			throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public FuncDataObj rollbackData(FuncDataObj logicObj) throws Exception {
		return null;
	}

}
