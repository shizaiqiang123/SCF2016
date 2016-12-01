/**
 * 
 */
package com.ut.scf.core.component;

import com.ut.scf.core.data.FuncDataObj;

/**
 * @author PanHao
 * @see 新逻辑流接口
 */
public interface ILogicComp {
	public FuncDataObj postPendingData(FuncDataObj logicObj) throws Exception;
	
	public FuncDataObj postReleaseData(FuncDataObj logicObj) throws Exception;
	
	public FuncDataObj postMasterData(FuncDataObj logicObj) throws Exception;
	
	public FuncDataObj postDeletePendingData(FuncDataObj logicObj) throws Exception;
}
