package com.ut.scf.core.component;

import com.ut.scf.core.data.FuncDataObj;

public interface ILogicComponent extends ILogicComp{

	public FuncDataObj postData(FuncDataObj logicObj) throws Exception;
	
	public FuncDataObj inqData(FuncDataObj logicObj) throws Exception;//Query

	public FuncDataObj releaseData(FuncDataObj logicObj) throws Exception;//RE
    
//    public FuncDataObj deleteData(FuncDataObj logicObj) throws Exception;//DP
//
//    public FuncDataObj cancelData(FuncDataObj logicObj) throws Exception;//EC
//    
    public FuncDataObj rollbackData(FuncDataObj logicObj) throws Exception;//回滚交易
}
