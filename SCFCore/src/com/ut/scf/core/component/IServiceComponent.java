package com.ut.scf.core.component;

import com.ut.scf.core.data.FuncDataObj;

/**
 * 用来转换业务类型到客户端接口的Mapping
 * @author PanHao
 *
 */
public interface IServiceComponent {

	public void postPendingData(FuncDataObj dataObj) throws Exception;
	
	public void postMasterData(FuncDataObj dataObj) throws Exception;
	
	public void postReleaseData(FuncDataObj dataObj) throws Exception;//RE
    
    public void rollback(FuncDataObj dataObj);
}
