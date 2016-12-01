package com.ut.scf.core.services;

import com.ut.comm.tool.string.StringUtil;
import com.ut.scf.core.esb.IESBServiceEntity;
import com.ut.scf.core.utils.ClassLoadHelper;

public class PostAdapterFactory implements IAdatperFactory{

	@Override
	public IServiceAdatper createFormattor(IESBServiceEntity entity) throws Exception {
		String adapterName = entity.getServicePostAdapter();
		return ClassLoadHelper.getComponentClass(adapterName);
	}

	@Override
	public boolean needFormattor(IESBServiceEntity entity) throws Exception {
		return StringUtil.isTrimNotEmpty(entity.getServicePostAdapter());
	}

}
