package com.ut.scf.core;

import org.springframework.stereotype.Service;

import com.ut.scf.core.component.ComponentConst;
import com.ut.scf.core.component.IMainComponent;
import com.ut.scf.core.utils.ApSessionUtil;

@Service("aPDownloadProcessor") 
public class APDownloadProcessor extends AbsAPProcessor{

	@Override
	protected Object doProcess(IMainComponent instance, Object dataDom) throws Exception {
		return null;
	}
	
	@Override
	protected void customizeContext() {
		ApSessionUtil.getContext().setStrTrxType(ComponentConst.COMP_TRX_TYPE_QUERY);
	}

}
